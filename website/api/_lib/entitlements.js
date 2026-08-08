/**
 * Server-owned Pro entitlement. Users cannot write this table (RLS).
 * Only service role after verified payment / webhook may grant.
 */
const { rest, hasServiceRole } = require('./supabase');
const { SUBSCRIPTIONS } = require('./products');

function isActiveRow(row) {
  if (!row || row.status !== 'active') return false;
  if (row.expires_at) {
    try {
      if (new Date(row.expires_at).getTime() < Date.now()) return false;
    } catch (e) {
      return false;
    }
  }
  return true;
}

function publicEntitlement(row) {
  if (!row) {
    return { isPro: false, subscription: null };
  }
  const active = isActiveRow(row);
  /* Prefer payment ledger time / row update for "Last payment" date in Account UI */
  const lastPaidAt =
    row.last_paid_at ||
    row.paid_at ||
    row.updated_at ||
    row.started_at ||
    null;
  return {
    isPro: active,
    subscription: {
      planId: row.plan_id,
      name: row.plan_name || row.plan_id,
      price: row.price != null ? Number(row.price) : null,
      interval: row.interval || 'month',
      status: active ? 'active' : row.status || 'expired',
      startedAt: row.started_at || null,
      expiresAt: row.expires_at || null,
      lastPaidAt,
      updatedAt: row.updated_at || null,
      paymentId: row.payment_id || null,
      orderId: row.order_id || null,
      paddleCustomerId: row.paddle_customer_id || null,
      source: 'server',
    },
  };
}

async function getEntitlementForUser(userId) {
  if (!hasServiceRole() || !userId) return null;
  const rows = await rest(
    `entitlements?user_id=eq.${encodeURIComponent(userId)}&select=*&limit=1`
  );
  if (!Array.isArray(rows) || !rows.length) return null;
  return rows[0];
}

async function getPaymentById(paymentId) {
  if (!hasServiceRole() || !paymentId) return null;
  const rows = await rest(
    `payments?payment_id=eq.${encodeURIComponent(paymentId)}&select=*&limit=1`
  );
  if (!Array.isArray(rows) || !rows.length) return null;
  return rows[0];
}

/**
 * @param {string} interval - month | year
 * @param {Date} [fromDate]
 * @param {{ yearMonths?: number }} [opts]
 *   yearMonths: 12 (default direct yearly) or 13 (monthly → yearly upgrade bonus)
 */
function computeExpiry(interval, fromDate, opts) {
  const started = fromDate ? new Date(fromDate) : new Date();
  const expires = new Date(started);
  if (interval === 'year') {
    const months =
      opts && opts.yearMonths === 13
        ? 13
        : opts && typeof opts.yearMonths === 'number' && opts.yearMonths > 0
          ? opts.yearMonths
          : 12;
    expires.setMonth(expires.getMonth() + months);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }
  return { started, expires };
}

function isActiveMonthlyEntitlement(row) {
  if (!row || !isActiveRow(row)) return false;
  if (row.plan_id === 'pro-monthly') return true;
  if (String(row.interval || '').toLowerCase() === 'month') return true;
  return false;
}

/**
 * True if this user already has a ledgered yearly payment (blocks 13-mo farming).
 */
async function userHasPriorYearlyPayment(userId, exceptPaymentId) {
  if (!hasServiceRole() || !userId) return false;
  try {
    const rows = await rest(
      `payments?user_id=eq.${encodeURIComponent(userId)}` +
        `&product_id=eq.pro-yearly&status=eq.captured&select=payment_id&limit=5`
    );
    if (!Array.isArray(rows) || !rows.length) return false;
    return rows.some(
      (r) => r.payment_id && r.payment_id !== exceptPaymentId
    );
  } catch (e) {
    return false;
  }
}

/**
 * Grant Pro from a verified catalog subscription payment.
 * Idempotent on payment_id - replaying the same payment never extends access.
 *
 * Monthly → yearly upgrade (first time only): access lasts 13 months.
 * Direct yearly purchase / renewal: 12 months.
 *
 * @param {object} opts
 * @param {boolean} [opts.skipAmountCheck] - allow tax variance; still rejects amounts under 50% list
 * @param {string} [opts.expiresAt] - ISO end of period from provider
 * @param {string} [opts.status] - entitlement status (default active)
 * @param {boolean} [opts.upgradeFromMonthly] - hint from verify-payment
 */
async function grantFromVerifiedPayment({
  userId,
  productId,
  paymentId,
  orderId,
  amountCents,
  currency,
  raw,
  skipAmountCheck,
  expiresAt,
  status,
  paddleCustomerId,
  upgradeFromMonthly,
}) {
  if (!hasServiceRole()) {
    throw new Error('Entitlement store not configured (SUPABASE_SERVICE_ROLE_KEY)');
  }
  if (!userId) throw new Error('userId required');
  if (!paymentId) throw new Error('paymentId required');

  const plan = SUBSCRIPTIONS[productId];
  if (!plan) {
    throw new Error('Unknown subscription product: ' + productId);
  }

  const expectedCents = Math.round(Number(plan.price) * 100);
  /*
   * Dodo may return amounts in major units (e.g. 999 for $999) or minor
   * units / cents (99900). Normalize to cents before the underpay check.
   */
  let paid = amountCents != null ? Number(amountCents) : null;
  if (paid != null && !Number.isNaN(paid) && paid > 0 && expectedCents > 0) {
    /* Pick cents vs major units by whichever is closer to catalog price */
    const asCents = Math.round(paid);
    const asMajor = Math.round(paid * 100);
    paid =
      Math.abs(asMajor - expectedCents) < Math.abs(asCents - expectedCents)
        ? asMajor
        : asCents;
  }
  /*
   * Product ID is source of truth. Still reject obviously underpaid amounts
   * (e.g. $1 test product) unless skipAmountCheck is forced.
   */
  if (
    !skipAmountCheck &&
    paid != null &&
    !Number.isNaN(paid) &&
    paid > 0 &&
    paid < expectedCents * 0.5
  ) {
    throw new Error(
      `Amount too low for plan: paid ${paid}, expected ~${expectedCents} for ${productId}`
    );
  }

  /*
   * Replay protection: same payment_id never re-grants or extends.
   * Return current entitlement only.
   */
  const existingPay = await getPaymentById(paymentId);
  if (existingPay) {
    const row = await getEntitlementForUser(existingPay.user_id || userId);
    return publicEntitlement(row);
  }

  const existingEnt = await getEntitlementForUser(userId);
  const priorYearly = await userHasPriorYearlyPayment(userId, paymentId);
  /*
   * 13-month bonus only once: active monthly → first yearly purchase.
   * Cannot farm by flipping monthly/yearly repeatedly.
   */
  const isMonthlyToYearly =
    plan.interval === 'year' &&
    !priorYearly &&
    isActiveMonthlyEntitlement(existingEnt) &&
    (upgradeFromMonthly === true || upgradeFromMonthly == null);

  const { started, expires } = computeExpiry(plan.interval, null, {
    yearMonths: isMonthlyToYearly ? 13 : 12,
  });
  let finalExpires = expires;
  if (expiresAt) {
    try {
      const d = new Date(expiresAt);
      if (!Number.isNaN(d.getTime())) finalExpires = d;
    } catch (e) {}
  }

  /* Ledger first - unique payment_id */
  try {
    await rest('payments', {
      method: 'POST',
      prefer: 'return=minimal,resolution=ignore-duplicates',
      body: {
        payment_id: paymentId,
        order_id: orderId || null,
        user_id: userId,
        product_type: 'subscription',
        product_id: plan.id,
        amount_cents: paid != null ? paid : expectedCents,
        currency: (currency || 'USD').toUpperCase(),
        status: 'captured',
        raw: Object.assign({}, raw || {}, {
          upgrade_bonus_13mo: Boolean(isMonthlyToYearly),
        }),
      },
    });
  } catch (payErr) {
    const already = await getPaymentById(paymentId);
    if (already) {
      /* Race: another worker ledgered first - do not extend */
      const row = await getEntitlementForUser(userId);
      return publicEntitlement(row);
    }
    console.error('payments ledger insert failed', payErr.message || payErr);
    throw new Error('Could not record payment');
  }

  /* Double-check ledger won the race */
  const ledgered = await getPaymentById(paymentId);
  if (ledgered && ledgered.user_id && ledgered.user_id !== userId) {
    throw new Error('Payment belongs to another account');
  }

  const payload = {
    user_id: userId,
    plan_id: plan.id,
    plan_name: plan.name,
    interval: plan.interval || 'month',
    status: status || 'active',
    price: plan.price,
    started_at: started.toISOString(),
    expires_at: finalExpires.toISOString(),
    payment_id: paymentId,
    order_id: orderId || null,
    amount_cents: paid != null ? paid : expectedCents,
    currency: (currency || 'USD').toUpperCase(),
    updated_at: new Date().toISOString(),
  };
  if (paddleCustomerId) {
    payload.paddle_customer_id = paddleCustomerId;
  }

  /* Upsert entitlement for user (one active plan row per user) */
  try {
    await rest('entitlements?on_conflict=user_id', {
      method: 'POST',
      prefer: 'resolution=merge-duplicates,return=representation',
      body: payload,
    });
  } catch (err) {
    /* Column paddle_customer_id may not exist until optional migration */
    if (payload.paddle_customer_id) {
      delete payload.paddle_customer_id;
      await rest('entitlements?on_conflict=user_id', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates,return=representation',
        body: payload,
      });
    } else {
      throw err;
    }
  }

  const row = await getEntitlementForUser(userId);
  return publicEntitlement(row);
}

/**
 * Mark user free / canceled (Dodo subscription cancelled / expired).
 */
async function revokeEntitlement(userId) {
  if (!hasServiceRole() || !userId) return null;
  const row = await getEntitlementForUser(userId);
  if (!row) return publicEntitlement(null);
  await rest(`entitlements?user_id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: {
      status: 'canceled',
      updated_at: new Date().toISOString(),
    },
  });
  return publicEntitlement(await getEntitlementForUser(userId));
}

async function userIsPro(userId) {
  const row = await getEntitlementForUser(userId);
  return isActiveRow(row);
}

module.exports = {
  isActiveRow,
  publicEntitlement,
  getEntitlementForUser,
  getPaymentById,
  computeExpiry,
  grantFromVerifiedPayment,
  revokeEntitlement,
  userIsPro,
};
