const { json, readBody } = require('./_lib/http');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const {
  hasDodo,
  dodoFetch,
  dodoEnv,
  resolvePlanIdFromPayment,
  planRank,
} = require('./_lib/dodo');
const {
  grantFromVerifiedPayment,
  publicEntitlement,
  getEntitlementForUser,
} = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

const FAIL_STATUSES = {
  failed: true,
  cancelled: true,
  canceled: true,
  requires_payment_method: true,
  incomplete: true,
  error: true,
  declined: true,
  expired: true,
  on_hold: true,
};

/** Payment object paid statuses only — not subscription "active". */
function isPaidStatus(st) {
  const s = String(st || '').toLowerCase();
  return s === 'succeeded' || s === 'paid' || s === 'captured';
}

/**
 * Verify Dodo payment + grant / upgrade Pro.
 * POST { payment_id?, planId?, checkout_status?, subscription_id? }
 *
 * Never grants on failed checkout status. When payment_id is provided,
 * only that payment can unlock Pro (old payments cannot fake a new success).
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    if (!hasDodo()) {
      return json(res, 503, {
        success: false,
        error: 'Dodo Payments not configured',
      });
    }
    if (!hasServiceRole()) {
      return json(res, 503, {
        success: false,
        error: 'Entitlement store not configured',
        code: 'entitlement_store_missing',
      });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        success: false,
        error: 'Sign in required',
        code: 'auth_required',
      });
    }

    const body = await readBody(req);
    const checkoutStatus = String(
      body.checkout_status || body.status || body.return_status || ''
    ).toLowerCase();

    if (FAIL_STATUSES[checkoutStatus]) {
      return json(res, 400, {
        success: false,
        granted: false,
        error: 'Payment was not completed',
        code: 'payment_failed',
        status: checkoutStatus,
      });
    }

    let paymentId = body.payment_id || body.paymentId || '';
    let payment = null;

    if (paymentId) {
      payment = await dodoFetch(`/payments/${encodeURIComponent(paymentId)}`);
      const st = String(
        (payment && (payment.status || payment.payment_status)) || ''
      ).toLowerCase();
      if (!isPaidStatus(st)) {
        return json(res, 400, {
          success: false,
          granted: false,
          error: 'Payment not successful (status: ' + (st || 'unknown') + ')',
          code: 'payment_not_paid',
          status: st,
        });
      }
    } else {
      /*
       * No payment_id: only accept a very recent paid payment for this user
       * (default 30 minutes). Prevents an older paid order from faking a
       * new checkout success when Dodo omits payment_id on the return URL.
       */
      const maxAgeMs = Math.min(
        Math.max(Number(body.max_age_ms) || 30 * 60 * 1000, 60 * 1000),
        24 * 60 * 60 * 1000
      );
      const startedAt = Number(body.checkout_started_at) || 0;
      const list = await dodoFetch('/payments?page_size=50');
      const items = (list && list.items) || [];
      const now = Date.now();
      const mine = items.filter((p) => {
        const st = String(p.status || '').toLowerCase();
        if (!isPaidStatus(st)) return false;
        const meta = p.metadata || {};
        if (!(meta.user_id === user.id || meta.userId === user.id)) return false;
        if (!resolvePlanIdFromPayment(p, body.planId)) return false;
        const created = new Date(p.created_at || p.createdAt || 0).getTime();
        if (!created || Number.isNaN(created)) return false;
        if (startedAt > 0 && created + 5000 < startedAt) return false;
        if (now - created > maxAgeMs) return false;
        return true;
      });
      mine.sort(function (a, b) {
        const ta = new Date(a.created_at || a.createdAt || 0).getTime();
        const tb = new Date(b.created_at || b.createdAt || 0).getTime();
        return tb - ta;
      });
      payment =
        mine.find(function (p) {
          return (
            planRank(resolvePlanIdFromPayment(p, body.planId)) >=
            planRank('pro-yearly')
          );
        }) ||
        mine[0] ||
        null;
      if (payment) paymentId = payment.payment_id || payment.id || '';
    }

    const existingEnt = await getEntitlementForUser(user.id);
    const existingPublic = publicEntitlement(existingEnt);

    if (!payment || !paymentId) {
      /* Do not treat "already Pro from an old grant" as this checkout succeeding */
      return json(res, 404, {
        success: false,
        granted: false,
        error: 'No successful payment found for this checkout',
        code: 'no_payment',
        alreadyPro: Boolean(existingPublic.isPro),
      });
    }

    const status = String(
      payment.status || payment.payment_status || ''
    ).toLowerCase();
    if (!isPaidStatus(status)) {
      return json(res, 400, {
        success: false,
        granted: false,
        error: 'Payment not successful (status: ' + status + ')',
        code: 'payment_not_paid',
        status,
      });
    }

    const meta = payment.metadata || {};
    const metaUser = meta.user_id || meta.userId || '';
    /* Checkout always stamps user_id server-side. A payment without one cannot
       be proven to belong to the caller, so refuse rather than assume it does. */
    if (!metaUser) {
      return json(res, 403, {
        success: false,
        granted: false,
        error: 'This payment is not linked to an account',
        code: 'user_unverified',
      });
    }
    if (metaUser !== user.id) {
      return json(res, 403, {
        success: false,
        granted: false,
        error: 'This payment belongs to a different account',
        code: 'user_mismatch',
      });
    }

    const planId = resolvePlanIdFromPayment(
      payment,
      body.planId || body.plan_id
    );
    if (!planId || !SUBSCRIPTIONS[planId]) {
      return json(res, 400, {
        success: false,
        granted: false,
        error:
          'Could not identify plan from payment product. Product IDs must be configured.',
        code: 'plan_unresolved',
      });
    }

    const currentPlanId =
      (existingEnt && existingEnt.plan_id) ||
      (existingPublic.subscription && existingPublic.subscription.planId) ||
      '';

    /*
     * Same payment already granted — idempotent success (no re-extend).
     */
    if (
      existingPublic.isPro &&
      existingEnt &&
      existingEnt.payment_id === paymentId
    ) {
      return json(res, 200, {
        success: true,
        granted: true,
        already: true,
        entitlement: existingPublic,
        planId: currentPlanId || planId,
        paymentId,
      });
    }

    if (
      existingPublic.isPro &&
      planRank(currentPlanId) > planRank(planId) &&
      !body.payment_id &&
      !body.paymentId
    ) {
      return json(res, 200, {
        success: true,
        granted: true,
        already: true,
        entitlement: existingPublic,
        planId: currentPlanId,
        note: 'kept_higher_plan',
        paymentId,
      });
    }

    const amountCents =
      payment.total_amount != null
        ? Number(payment.total_amount)
        : payment.settlement_amount != null
          ? Number(payment.settlement_amount)
          : payment.amount != null
            ? Number(payment.amount)
            : null;

    const upgradeFromMonthly =
      planId === 'pro-yearly' &&
      (currentPlanId === 'pro-monthly' ||
        (existingEnt &&
          existingPublic.isPro &&
          String(existingEnt.interval || '').toLowerCase() === 'month'));

    const entitlement = await grantFromVerifiedPayment({
      userId: user.id,
      productId: planId,
      paymentId,
      orderId: payment.subscription_id || payment.subscriptionId || paymentId,
      amountCents,
      currency: (
        payment.currency ||
        payment.settlement_currency ||
        'USD'
      ).toUpperCase(),
      upgradeFromMonthly,
      raw: {
        source: 'dodo_verify',
        status,
        env: dodoEnv(),
        subscription_id: payment.subscription_id || null,
        upgraded_from: currentPlanId || null,
      },
    });

    return json(res, 200, {
      success: true,
      provider: 'dodo',
      paymentId,
      planId,
      entitlement,
      granted: Boolean(entitlement && entitlement.isPro),
      upgraded: Boolean(
        currentPlanId &&
          currentPlanId !== planId &&
          entitlement &&
          entitlement.isPro
      ),
      upgradeFromMonthly: Boolean(upgradeFromMonthly),
    });
  } catch (err) {
    console.error('verify-payment error:', err);
    return json(res, err.status || 500, {
      success: false,
      granted: false,
      error: err.message || 'Verification failed',
      details: err.data || null,
    });
  }
};
