const { json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const {
  hasDodo,
  dodoFetch,
  planIdFromProductId,
  dodoEnv,
  applyAutoDebitPreference,
} = require('./_lib/dodo');
const {
  grantFromVerifiedPayment,
  getPaymentById,
  publicEntitlement,
  getEntitlementForUser,
} = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

/**
 * Verify Dodo payment + grant Pro.
 * POST { payment_id?, planId? }
 * - With payment_id: verify that payment
 * - Without: find latest succeeded Dodo payment for this user (recovery)
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
      const list = await dodoFetch('/payments?page_size=20');
      const items = (list && list.items) || [];
      payment =
        items.find((p) => {
          const st = String(p.status || '').toLowerCase();
          if (st !== 'succeeded' && st !== 'paid') return false;
          const meta = p.metadata || {};
          return meta.user_id === user.id || meta.userId === user.id;
        }) || null;
      if (payment) paymentId = payment.payment_id || payment.id || '';
    }

    if (!payment || !paymentId) {
      return json(res, 404, {
        success: false,
        error: 'No successful Dodo payment found for this account',
        code: 'no_payment',
      });
    }

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
    if (!SUBSCRIPTIONS[planId]) planId = 'pro-monthly';

    const existingPay = await getPaymentById(paymentId);
    if (existingPay) {
      const row = await getEntitlementForUser(user.id);
      if (row && publicEntitlement(row).isPro) {
        return json(res, 200, {
          success: true,
          entitlement: publicEntitlement(row),
          granted: true,
          idempotent: true,
          paymentId,
          planId,
        });
      }
    }

    const amountCents =
      payment.total_amount != null
        ? Number(payment.total_amount)
        : payment.settlement_amount != null
          ? Number(payment.settlement_amount)
          : payment.amount != null
            ? Number(payment.amount)
            : null;

    const subscriptionId =
      payment.subscription_id || payment.subscriptionId || null;

    let entitlement;
    try {
      entitlement = await grantFromVerifiedPayment({
        userId: user.id,
        productId: planId,
        paymentId,
        orderId: subscriptionId || paymentId,
        amountCents,
        currency: (payment.currency || payment.settlement_currency || 'USD').toUpperCase(),
        skipAmountCheck: true,
        raw: {
          source: 'dodo_verify',
          status,
          env: dodoEnv(),
          subscription_id: subscriptionId,
          auto_debit: meta.auto_debit != null ? meta.auto_debit : meta.autoDebit,
        },
      });
    } catch (grantErr) {
      console.error('grantFromVerifiedPayment failed', grantErr);
      const row = await getEntitlementForUser(user.id);
      if (row && publicEntitlement(row).isPro) {
        /* Still honor no-auto-debit if Pro already active from this pay */
        const cancelPref = await applyAutoDebitPreference(meta, subscriptionId);
        return json(res, 200, {
          success: true,
          provider: 'dodo',
          paymentId,
          planId,
          entitlement: publicEntitlement(row),
          granted: true,
          recovered: true,
          autoDebitCancelled: Boolean(cancelPref && cancelPref.applied),
        });
      }
      return json(res, 500, {
        success: false,
        error: grantErr.message || 'Failed to activate Pro',
        code: 'grant_failed',
      });
    }

    const cancelPref = await applyAutoDebitPreference(meta, subscriptionId);

    return json(res, 200, {
      success: true,
      provider: 'dodo',
      paymentId,
      planId,
      entitlement,
      granted: Boolean(entitlement && entitlement.isPro),
      autoDebit: !(cancelPref && cancelPref.applied),
      autoDebitCancelled: Boolean(cancelPref && cancelPref.applied),
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
