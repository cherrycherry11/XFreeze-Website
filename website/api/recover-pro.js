const { json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const { hasDodo, dodoFetch, dodoEnv } = require('./_lib/dodo');
const {
  grantFromVerifiedPayment,
  publicEntitlement,
  getEntitlementForUser,
  getPaymentById,
} = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

/**
 * Recover Pro after a successful Dodo payment when return_url
 * did not include payment_id or client verify failed.
 *
 * POST { payment_id?: string, planId?: string }
 * - If payment_id provided: verify that payment
 * - Else: scan recent succeeded Dodo payments for metadata.user_id match
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    if (!hasDodo() || !hasServiceRole()) {
      return json(res, 503, {
        success: false,
        error: 'Payments or entitlement store not configured',
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

    /* Already Pro? */
    const existingEnt = await getEntitlementForUser(user.id);
    if (existingEnt && publicEntitlement(existingEnt).isPro) {
      return json(res, 200, {
        success: true,
        granted: true,
        already: true,
        entitlement: publicEntitlement(existingEnt),
      });
    }

    const body = await readBody(req);
    let paymentId = body.payment_id || body.paymentId || '';
    let payment = null;

    if (paymentId) {
      payment = await dodoFetch(`/payments/${encodeURIComponent(paymentId)}`);
    } else {
      /* List recent payments and find one for this user */
      const list = await dodoFetch('/payments?page_size=20');
      const items = (list && list.items) || [];
      payment =
        items.find((p) => {
          const st = String(p.status || '').toLowerCase();
          if (st !== 'succeeded' && st !== 'paid') return false;
          const meta = p.metadata || {};
          return meta.user_id === user.id || meta.userId === user.id;
        }) || null;
      if (payment) paymentId = payment.payment_id || payment.id;
    }

    if (!payment || !paymentId) {
      return json(res, 404, {
        success: false,
        error: 'No successful Dodo payment found for this account',
        code: 'no_payment',
        userId: user.id,
      });
    }

    const status = String(payment.status || '').toLowerCase();
    if (status !== 'succeeded' && status !== 'paid' && status !== 'active') {
      return json(res, 400, {
        success: false,
        error: 'Payment status is ' + status,
        status,
      });
    }

    const meta = payment.metadata || {};
    const metaUser = meta.user_id || meta.userId || '';
    if (metaUser && metaUser !== user.id) {
      return json(res, 403, {
        success: false,
        error: 'Payment belongs to another user',
      });
    }

    let planId = body.planId || meta.plan_id || meta.planId || 'pro-monthly';
    if (!SUBSCRIPTIONS[planId]) planId = 'pro-monthly';

    /* Already ledgered? */
    const existingPay = await getPaymentById(paymentId);
    if (existingPay) {
      const row = await getEntitlementForUser(user.id);
      if (row && publicEntitlement(row).isPro) {
        return json(res, 200, {
          success: true,
          granted: true,
          idempotent: true,
          entitlement: publicEntitlement(row),
        });
      }
    }

    const entitlement = await grantFromVerifiedPayment({
      userId: user.id,
      productId: planId,
      paymentId,
      orderId: payment.subscription_id || paymentId,
      amountCents:
        payment.total_amount != null
          ? Number(payment.total_amount)
          : payment.settlement_amount != null
            ? Number(payment.settlement_amount)
            : null,
      currency: (payment.currency || 'USD').toUpperCase(),
      skipAmountCheck: true,
      raw: {
        source: 'dodo_recover',
        status,
        env: dodoEnv(),
        subscription_id: payment.subscription_id || null,
      },
    });

    return json(res, 200, {
      success: true,
      granted: Boolean(entitlement && entitlement.isPro),
      paymentId,
      planId,
      entitlement,
    });
  } catch (err) {
    console.error('recover-pro error:', err);
    return json(res, err.status || 500, {
      success: false,
      error: err.message || 'Recovery failed',
      details: err.data || null,
    });
  }
};
