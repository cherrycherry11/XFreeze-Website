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

function computeExpiry(interval, fromDate) {
  const started = fromDate ? new Date(fromDate) : new Date();
  const expires = new Date(started);
  if (interval === 'year') {
    /* Yearly Pro includes a free extra month (13 months total access). */
    expires.setMonth(expires.getMonth() + 13);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }
  return { started, expires };
}

/**
 * Grant Pro from a verified catalog subscription payment.
 * Idempotent on payment_id.
 *
 * @param {object} opts
 * @param {boolean} [opts.skipAmountCheck] - Paddle tax/locale may differ; skip strict cents match
 * @param {string} [opts.expiresAt] - ISO end of period from provider
 * @param {string} [opts.status] - entitlement status (default active)
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
  if (
    !skipAmountCheck &&
    amountCents != null &&
    Number(amountCents) !== expectedCents
  ) {
    throw new Error(
      `Amount mismatch: paid ${amountCents}, expected ${expectedCents} for ${productId}`
    );
  }

  /*
   * Idempotency: same payment_id already ledgered.
   * Still allow plan upgrade (e.g. monthly → yearly) if this grant is a better plan.
   */
  const existingPay = await getPaymentById(paymentId);
  if (existingPay) {
    const row = await getEntitlementForUser(existingPay.user_id || userId);
    if (row && row.plan_id === plan.id && isActiveRow(row)) {
      return publicEntitlement(row);
    }
    /* Different plan on same payment id (rare) or stale monthly row — fall through to upsert */
  }

  const { started, expires } = computeExpiry(plan.interval);
  let finalExpires = expires;
  if (expiresAt) {
    try {
      const d = new Date(expiresAt);
      if (!Number.isNaN(d.getTime())) finalExpires = d;
    } catch (e) {}
  }

  /* Ledger first — ignore duplicate payment_id races */
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
        amount_cents: amountCents != null ? Number(amountCents) : expectedCents,
        currency: (currency || 'USD').toUpperCase(),
        status: 'captured',
        raw: raw || null,
      },
    });
  } catch (payErr) {
    const already = await getPaymentById(paymentId);
    if (!already) {
      /* Don't block entitlement if ledger insert fails for schema reasons */
      console.error('payments ledger insert failed', payErr.message || payErr);
    }
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
    amount_cents: amountCents != null ? Number(amountCents) : expectedCents,
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
 * Mark user free / canceled (Paddle subscription.canceled).
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
