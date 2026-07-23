const { json } = require('../_lib/razorpay-client');
const {
  dodoWebhookKey,
  verifyDodoWebhook,
  planIdFromProductId,
  hasDodo,
  applyAutoDebitPreference,
} = require('../_lib/dodo');
const { hasServiceRole } = require('../_lib/supabase');
const {
  grantFromVerifiedPayment,
  revokeEntitlement,
} = require('../_lib/entitlements');
const { SUBSCRIPTIONS } = require('../_lib/products');

/**
 * Dodo Payments webhooks (Standard Webhooks).
 * Dashboard → Developer → Webhooks
 * URL: https://xfreeze.com/api/webhooks/dodo
 *
 * Events: payment.succeeded, subscription.active, subscription.renewed,
 *         subscription.cancelled / subscription.canceled
 */
function readRawBody(req) {
  if (typeof req.body === 'string') return Promise.resolve(req.body);
  if (Buffer.isBuffer(req.body)) return Promise.resolve(req.body.toString('utf8'));
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) {
    return Promise.resolve(JSON.stringify(req.body));
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function extractMeta(data) {
  return (data && (data.metadata || data.meta)) || {};
}

function extractUserId(data) {
  const m = extractMeta(data);
  return m.user_id || m.userId || '';
}

function extractPlanId(data) {
  const m = extractMeta(data);
  if (m.plan_id || m.planId) return m.plan_id || m.planId;
  const cart = data.product_cart || data.productCart || [];
  if (cart[0]) {
    const pid = cart[0].product_id || cart[0].productId;
    return planIdFromProductId(pid);
  }
  if (data.product_id) return planIdFromProductId(data.product_id);
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!hasServiceRole()) {
    return json(res, 503, { error: 'Entitlement store not configured' });
  }

  try {
    const raw = await readRawBody(req);
    const secret = dodoWebhookKey();

    if (secret) {
      const ok = verifyDodoWebhook(raw, req.headers, secret);
      if (!ok) {
        console.error('Dodo webhook signature failed');
        return json(res, 401, { error: 'Invalid signature' });
      }
    } else {
      console.warn('DODO_PAYMENTS_WEBHOOK_KEY not set — accepting unsigned webhook (test only)');
    }

    const event = JSON.parse(raw || '{}');
    const type = event.type || event.event_type || '';
    const data = event.data || {};

    if (
      type === 'payment.succeeded' ||
      type === 'subscription.active' ||
      type === 'subscription.renewed' ||
      type === 'subscription.updated'
    ) {
      const userId = extractUserId(data);
      let planId = extractPlanId(data);
      const paymentId =
        data.payment_id ||
        data.paymentId ||
        data.subscription_id ||
        data.subscriptionId ||
        data.id ||
        '';

      if (!userId) {
        return json(res, 200, { ok: true, ignored: 'missing_user_id', type });
      }
      if (!planId || !SUBSCRIPTIONS[planId]) {
        planId = planId || 'pro-monthly';
        if (!SUBSCRIPTIONS[planId]) {
          return json(res, 200, { ok: true, ignored: 'unknown_plan', type });
        }
      }

      const subStatus = String(data.status || '').toLowerCase();
      if (subStatus === 'cancelled' || subStatus === 'canceled' || subStatus === 'expired') {
        await revokeEntitlement(userId);
        return json(res, 200, { ok: true, revoked: true });
      }

      const subscriptionId = data.subscription_id || data.subscriptionId || null;
      const meta = extractMeta(data);

      await grantFromVerifiedPayment({
        userId,
        productId: planId,
        paymentId: paymentId || `dodo_${event.timestamp || Date.now()}`,
        orderId: subscriptionId || paymentId,
        amountCents:
          data.total_amount != null
            ? Number(data.total_amount)
            : data.amount != null
              ? Number(data.amount)
              : null,
        currency: (data.currency || 'USD').toUpperCase(),
        skipAmountCheck: true,
        raw: {
          source: 'dodo_webhook',
          type,
          auto_debit: meta.auto_debit != null ? meta.auto_debit : meta.autoDebit,
        },
      });

      /*
       * If the customer opted out of auto-debit at checkout, keep access for
       * the paid period but schedule cancel so Dodo does not renew.
       * Do not revoke here — period end + subscription.cancelled will.
       */
      const cancelPref = await applyAutoDebitPreference(meta, subscriptionId);

      return json(res, 200, {
        ok: true,
        granted: true,
        planId,
        userId,
        autoDebitCancelled: Boolean(cancelPref && cancelPref.applied),
      });
    }

    if (
      type === 'subscription.cancelled' ||
      type === 'subscription.canceled' ||
      type === 'subscription.expired'
    ) {
      const userId = extractUserId(data);
      if (userId) await revokeEntitlement(userId);
      return json(res, 200, { ok: true, revoked: Boolean(userId) });
    }

    return json(res, 200, { ok: true, ignored: type });
  } catch (err) {
    console.error('dodo webhook error:', err);
    return json(res, 500, { error: err.message || 'Webhook failed' });
  }
};
