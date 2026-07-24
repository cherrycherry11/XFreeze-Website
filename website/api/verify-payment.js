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
  getPaymentById,
  publicEntitlement,
  getEntitlementForUser,
} = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

/**
 * Verify Dodo payment + grant / upgrade Pro.
 * POST { payment_id?, planId? }
 *
 * Always considers the latest succeeded payment for this user so monthly → yearly
 * upgrades are applied (does not return early just because already Pro).
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
    let paymentId = body.payment_id || body.paymentId || '';
    let payment = null;

    if (paymentId) {
      payment = await dodoFetch(`/payments/${encodeURIComponent(paymentId)}`);
    } else {
      const list = await dodoFetch('/payments?page_size=50');
      const items = (list && list.items) || [];
      const mine = items.filter((p) => {
        const st = String(p.status || '').toLowerCase();
        if (st !== 'succeeded' && st !== 'paid') return false;
        const meta = p.metadata || {};
        return meta.user_id === user.id || meta.userId === user.id;
      });
      /* Prefer newest payment so yearly upgrade beats older monthly */
      mine.sort(function (a, b) {
        const ta = new Date(a.created_at || a.createdAt || 0).getTime();
        const tb = new Date(b.created_at || b.createdAt || 0).getTime();
        return tb - ta;
      });
      /* Prefer highest plan among recent succeeds (yearly over monthly) */
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
      if (existingPublic.isPro) {
        return json(res, 200, {
          success: true,
          granted: true,
          already: true,
          entitlement: existingPublic,
        });
      }
      return json(res, 404, {
        success: false,
        error: 'No successful Dodo payment found for this account',
        code: 'no_payment',
      });
    }

    const status = String(
      payment.status || payment.payment_status || ''
    ).toLowerCase();
    if (status !== 'succeeded' && status !== 'paid' && status !== 'active') {
      return json(res, 400, {
        success: false,
        error: 'Payment not successful (status: ' + status + ')',
        status,
      });
    }

    const meta = payment.metadata || {};
    const metaUser = meta.user_id || meta.userId || '';
    if (metaUser && metaUser !== user.id) {
      return json(res, 403, {
        success: false,
        error: 'This payment belongs to a different account',
        code: 'user_mismatch',
      });
    }

    let planId = resolvePlanIdFromPayment(payment, body.planId || body.plan_id);
    if (!SUBSCRIPTIONS[planId]) planId = 'pro-monthly';

    const currentPlanId =
      (existingEnt && existingEnt.plan_id) ||
      (existingPublic.subscription && existingPublic.subscription.planId) ||
      '';

    /*
     * Already Pro on the same (or higher) plan for this payment — no-op.
     * If yearly was just paid but row is still monthly, continue and upgrade.
     */
    if (
      existingPublic.isPro &&
      planRank(currentPlanId) >= planRank(planId) &&
      existingEnt &&
      existingEnt.payment_id === paymentId
    ) {
      return json(res, 200, {
        success: true,
        granted: true,
        already: true,
        entitlement: existingPublic,
        planId: currentPlanId,
      });
    }

    if (
      existingPublic.isPro &&
      planRank(currentPlanId) > planRank(planId) &&
      !body.payment_id &&
      !body.paymentId
    ) {
      /* Do not downgrade from yearly to older monthly payment by accident */
      return json(res, 200, {
        success: true,
        granted: true,
        already: true,
        entitlement: existingPublic,
        planId: currentPlanId,
        note: 'kept_higher_plan',
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
      skipAmountCheck: true,
      upgradeFromMonthly,
      raw: {
        source: 'dodo_verify',
        status,
        env: dodoEnv(),
        subscription_id: payment.subscription_id || null,
        upgraded_from: currentPlanId || null,
        year_months: upgradeFromMonthly ? 13 : planId === 'pro-yearly' ? 12 : 1,
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
        currentPlanId && currentPlanId !== planId && entitlement && entitlement.isPro
      ),
      upgradeFromMonthly: Boolean(upgradeFromMonthly),
    });
  } catch (err) {
    console.error('verify-payment error:', err);
    return json(res, err.status || 500, {
      success: false,
      error: err.message || 'Verification failed',
      details: err.data || null,
    });
  }
};
