const { json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const { hasDodo, dodoFetch, planIdFromProductId } = require('./_lib/dodo');
const { grantFromVerifiedPayment, getPaymentById, publicEntitlement, getEntitlementForUser } = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

/**
 * After Dodo return_url, optionally re-check payment and grant Pro.
 * POST { payment_id, planId? }
 *
 * Primary grant path is still the webhook; this is a UX backup when
 * the browser returns with payment_id + status=succeeded.
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    if (!hasDodo()) {
      return json(res, 503, { success: false, error: 'Dodo Payments not configured' });
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
    const paymentId = body.payment_id || body.paymentId || '';
    if (!paymentId) {
      return json(res, 400, { success: false, error: 'payment_id required' });
    }

    /* Already granted? */
    const existing = await getPaymentById(paymentId);
    if (existing) {
      const row = await getEntitlementForUser(user.id);
      return json(res, 200, {
        success: true,
        entitlement: publicEntitlement(row),
        granted: true,
        idempotent: true,
      });
    }

    const payment = await dodoFetch(`/payments/${encodeURIComponent(paymentId)}`);
    const status = String(payment.status || payment.payment_status || '').toLowerCase();
    if (status !== 'succeeded' && status !== 'paid' && status !== 'active') {
      return json(res, 400, {
        success: false,
        error: 'Payment not successful (status: ' + status + ')',
        status,
      });
    }

    const meta = payment.metadata || {};
    let planId = body.planId || meta.plan_id || meta.planId || '';
    const metaUser = meta.user_id || meta.userId || '';
    /* If metadata has user_id, it must match the signed-in user.
       If missing (edge case), still allow grant to the signed-in buyer. */
    if (metaUser && metaUser !== user.id) {
      return json(res, 403, {
        success: false,
        error: 'This payment belongs to a different account',
        code: 'user_mismatch',
      });
    }

    if (!planId) {
      const cart = payment.product_cart || payment.productCart || [];
      const pid = cart[0] && (cart[0].product_id || cart[0].productId);
      planId = planIdFromProductId(pid) || 'pro-monthly';
    }
    if (!SUBSCRIPTIONS[planId]) {
      return json(res, 400, { success: false, error: 'Unknown plan for payment: ' + planId });
    }

    const amountCents =
      payment.total_amount != null
        ? Number(payment.total_amount)
        : payment.settlement_amount != null
          ? Number(payment.settlement_amount)
          : payment.amount != null
            ? Number(payment.amount)
            : null;

    let entitlement;
    try {
      entitlement = await grantFromVerifiedPayment({
        userId: user.id,
        productId: planId,
        paymentId,
        orderId: payment.subscription_id || payment.subscriptionId || paymentId,
        amountCents,
        currency: (payment.currency || payment.settlement_currency || 'USD').toUpperCase(),
        skipAmountCheck: true,
        expiresAt: null,
        raw: {
          source: 'dodo',
          status,
          verify: true,
          subscription_id: payment.subscription_id || null,
        },
      });
    } catch (grantErr) {
      console.error('grantFromVerifiedPayment failed', grantErr);
      /* Duplicate payment race — load existing entitlement */
      const row = await getEntitlementForUser(user.id);
      if (row && publicEntitlement(row).isPro) {
        return json(res, 200, {
          success: true,
          provider: 'dodo',
          paymentId,
          planId,
          entitlement: publicEntitlement(row),
          granted: true,
          recovered: true,
        });
      }
      return json(res, 500, {
        success: false,
        error: grantErr.message || 'Failed to activate Pro',
        code: 'grant_failed',
      });
    }

    return json(res, 200, {
      success: true,
      provider: 'dodo',
      paymentId,
      planId,
      entitlement,
      granted: Boolean(entitlement && entitlement.isPro),
    });
  } catch (err) {
    console.error('verify-payment (dodo) error:', err);
    return json(res, err.status || 500, {
      success: false,
      error: err.message || 'Verification failed',
      details: err.data || null,
    });
  }
};
