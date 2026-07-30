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

function paymentStatusOk(data) {
  const st = String(
    (data && (data.status || data.payment_status || data.paymentStatus)) || ''
  ).toLowerCase();
  return (
    st === 'succeeded' ||
    st === 'paid' ||
    st === 'captured' ||
    st === 'active'
  );
}

function isFailedStatus(data) {
  const st = String(
    (data && (data.status || data.payment_status || data.paymentStatus)) || ''
  ).toLowerCase();
  return (
    st === 'failed' ||
    st === 'cancelled' ||
    st === 'canceled' ||
    st === 'expired' ||
    st === 'requires_payment_method' ||
    st === 'on_hold' ||
    st === 'incomplete' ||
    st === 'declined'
  );
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

    /* Never accept unsigned webhooks - refuse if secret is missing */
    if (!secret) {
      console.error('DODO_PAYMENTS_WEBHOOK_KEY is not set - rejecting webhook');
      return json(res, 503, {
        error: 'Webhook secret not configured',
        code: 'webhook_secret_missing',
      });
    }

    const ok = verifyDodoWebhook(raw, req.headers, secret);
    if (!ok) {
      console.error('Dodo webhook signature failed');
      return json(res, 401, { error: 'Invalid signature' });
    }

    const event = JSON.parse(raw || '{}');
    const type = event.type || event.event_type || '';
    const data = event.data || {};

    if (
      type === 'payment.failed' ||
      (String(type).indexOf('payment') === 0 && isFailedStatus(data))
    ) {
      return json(res, 200, { ok: true, ignored: type || 'payment_failed' });
    }

    /*
     * Only grant Pro after payment.succeeded (or a paid renewal).
     * Never grant on subscription.active/updated alone.
     */
    const canGrant =
      type === 'payment.succeeded' ||
      (type === 'subscription.renewed' && paymentStatusOk(data));

    if (canGrant) {
      if (isFailedStatus(data)) {
        return json(res, 200, {
          ok: true,
          ignored: 'failed_status',
          type,
          status: data.status || null,
        });
      }

      const userId = extractUserId(data);
      const planId = resolvePlanIdFromPayment(data, null);
      const paymentId =
        data.payment_id ||
        data.paymentId ||
        (type === 'payment.succeeded' ? data.id : '') ||
        '';

      if (!userId) {
        return json(res, 200, { ok: true, ignored: 'missing_user_id', type });
      }
      if (!planId || !SUBSCRIPTIONS[planId]) {
        console.error('webhook: unknown product, refusing grant', {
          type,
          product_id: data.product_id,
          cart: data.product_cart || data.productCart,
        });
        return json(res, 200, {
          ok: true,
          ignored: 'unknown_plan',
          type,
          code: 'plan_unresolved',
        });
      }
      if (!paymentId) {
        return json(res, 200, { ok: true, ignored: 'missing_payment_id', type });
      }

      await grantFromVerifiedPayment({
        userId,
        productId: planId,
        paymentId,
        orderId: data.subscription_id || data.subscriptionId || paymentId,
        amountCents:
          data.total_amount != null
            ? Number(data.total_amount)
            : data.amount != null
              ? Number(data.amount)
              : null,
        currency: (data.currency || 'USD').toUpperCase(),
        raw: {
          source: 'dodo_webhook',
          type,
        },
      });
      return json(res, 200, { ok: true, granted: true, planId, userId });
    }

    if (
      type === 'subscription.cancelled' ||
      type === 'subscription.canceled' ||
      type === 'subscription.expired' ||
      type === 'subscription.on_hold'
    ) {
      const userId = extractUserId(data);
      if (userId) await revokeEntitlement(userId);
      return json(res, 200, { ok: true, revoked: Boolean(userId), type });
    }

    if (type === 'subscription.updated') {
      const userId = extractUserId(data);
      const st = String(data.status || '').toLowerCase();
      if (
        userId &&
        (st === 'cancelled' ||
          st === 'canceled' ||
          st === 'expired' ||
          st === 'on_hold' ||
          st === 'failed')
      ) {
        await revokeEntitlement(userId);
        return json(res, 200, { ok: true, revoked: true, type, status: st });
      }
      return json(res, 200, { ok: true, ignored: type, status: st });
    }

    return json(res, 200, { ok: true, ignored: type });
  } catch (err) {
    console.error('dodo webhook error:', err);
    return json(res, 500, { error: err.message || 'Webhook failed' });
  }
};
