const { json } = require('../_lib/http');
const {
  dodoWebhookKey,
  verifyDodoWebhook,
  resolvePlanIdFromPayment,
} = require('../_lib/dodo');
const { hasServiceRole } = require('../_lib/supabase');
const {
  grantFromVerifiedPayment,
  revokeEntitlement,
} = require('../_lib/entitlements');
const { SUBSCRIPTIONS } = require('../_lib/products');

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
  return resolvePlanIdFromPayment(data, null);
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
      console.warn(
        'DODO_PAYMENTS_WEBHOOK_KEY not set — accepting unsigned webhook (test only)'
      );
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
      if (
        subStatus === 'cancelled' ||
        subStatus === 'canceled' ||
        subStatus === 'expired'
      ) {
        await revokeEntitlement(userId);
        return json(res, 200, { ok: true, revoked: true });
      }

      await grantFromVerifiedPayment({
        userId,
        productId: planId,
        paymentId: paymentId || `dodo_${event.timestamp || Date.now()}`,
        orderId: data.subscription_id || data.subscriptionId || paymentId,
        amountCents:
          data.total_amount != null
            ? Number(data.total_amount)
            : data.amount != null
              ? Number(data.amount)
              : null,
        currency: (data.currency || 'USD').toUpperCase(),
        skipAmountCheck: true,
        raw: { source: 'dodo_webhook', type },
      });
      return json(res, 200, { ok: true, granted: true, planId, userId });
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
