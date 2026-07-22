const { json, readBody } = require('../_lib/razorpay-client');
const {
  verifyPaddleSignature,
  paddleWebhookSecret,
  planIdFromPriceId,
  hasPaddleWebhook,
  assertPaddleWebhookIp,
} = require('../_lib/paddle');
const { hasServiceRole } = require('../_lib/supabase');
const {
  grantFromVerifiedPayment,
  revokeEntitlement,
} = require('../_lib/entitlements');

/**
 * Paddle Billing webhooks.
 * Dashboard → Developer tools → Notifications
 * URL: https://xfreeze.com/api/webhooks/paddle
 *
 * Subscribe at least to:
 *   subscription.created, subscription.updated, subscription.canceled,
 *   transaction.completed
 */
function getCustomData(entity) {
  if (!entity) return {};
  return entity.custom_data || entity.customData || {};
}

function extractPriceId(entity) {
  if (!entity) return '';
  const items = entity.items || [];
  if (items[0]) {
    const price = items[0].price || items[0];
    return price.id || price.price_id || items[0].price_id || '';
  }
  if (entity.details && entity.details.line_items && entity.details.line_items[0]) {
    return entity.details.line_items[0].price_id || '';
  }
  return '';
}

function extractUserId(entity) {
  const cd = getCustomData(entity);
  return cd.user_id || cd.userId || cd.xf_user_id || '';
}

function extractPlanId(entity) {
  const cd = getCustomData(entity);
  if (cd.plan_id || cd.planId) return cd.plan_id || cd.planId;
  const priceId = extractPriceId(entity);
  return planIdFromPriceId(priceId);
}

function periodEnd(entity) {
  const period =
    entity.current_billing_period ||
    entity.currentBillingPeriod ||
    entity.billing_period ||
    null;
  if (period && (period.ends_at || period.endsAt)) {
    return period.ends_at || period.endsAt;
  }
  return null;
}

async function readRawBody(req) {
  if (typeof req.body === 'string') return req.body;
  if (req.rawBody) return req.rawBody;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  /* Vercel may have parsed JSON already — re-stringify is NOT valid for
     signature verification. Prefer unparsed stream. */
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) {
    /* Best-effort: only works if Vercel preserved rawBody — often fails verify.
       Configure bodyParser if needed. */
    return JSON.stringify(req.body);
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!hasPaddleWebhook()) {
    console.error('PADDLE_NOTIFICATION_WEBHOOK_SECRET not set');
    return json(res, 503, { error: 'Paddle webhook not configured' });
  }

  if (!hasServiceRole()) {
    console.error('Entitlement store missing');
    return json(res, 503, { error: 'Entitlement store not configured' });
  }

  try {
    /* Optional IP allowlist (PADDLE_WEBHOOK_IP_ALLOWLIST=true) — IPs from api.paddle.com/ips */
    const ipCheck = await assertPaddleWebhookIp(req);
    if (!ipCheck.ok) {
      console.error('Paddle webhook rejected IP', ipCheck.ip);
      return json(res, 403, { error: 'Forbidden source IP' });
    }

    const rawBody = await readRawBody(req);
    const signature =
      req.headers['paddle-signature'] || req.headers['Paddle-Signature'] || '';
    const secret = paddleWebhookSecret();

    if (!verifyPaddleSignature(rawBody, signature, secret)) {
      console.error('Paddle signature verification failed');
      return json(res, 500, { error: 'Invalid signature' });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type || event.eventType || '';
    const data = event.data || {};

    /* --- Subscription lifecycle --- */
    if (
      eventType === 'subscription.created' ||
      eventType === 'subscription.updated' ||
      eventType === 'subscription.activated'
    ) {
      const status = String(data.status || '').toLowerCase();
      const userId = extractUserId(data);
      const planId = extractPlanId(data);
      const subId = data.id || '';

      if (!userId) {
        console.error('Paddle sub event missing custom_data.user_id', subId);
        return json(res, 200, { ok: true, ignored: 'missing_user_id' });
      }
      if (!planId) {
        console.error('Paddle sub event unknown price/plan', extractPriceId(data));
        return json(res, 200, { ok: true, ignored: 'unknown_plan' });
      }

      if (status === 'canceled' || status === 'paused') {
        await revokeEntitlement(userId, status);
        return json(res, 200, { ok: true, revoked: true, status });
      }

      if (status === 'active' || status === 'trialing' || status === 'past_due') {
        const ctm =
          data.customer_id ||
          data.customerId ||
          (data.customer && (data.customer.id || data.customer_id)) ||
          null;
        await grantFromVerifiedPayment({
          userId,
          productId: planId,
          paymentId: subId || `paddle_sub_${event.event_id || Date.now()}`,
          orderId: subId,
          amountCents: null,
          currency: (data.currency_code || data.currencyCode || 'USD').toUpperCase(),
          skipAmountCheck: true,
          expiresAt: periodEnd(data),
          status: 'active',
          paddleCustomerId: ctm,
          raw: { source: 'paddle', eventType, status, customer_id: ctm },
        });
        return json(res, 200, { ok: true, granted: true, planId, userId });
      }

      return json(res, 200, { ok: true, ignored: 'status_' + status });
    }

    if (eventType === 'subscription.canceled') {
      const userId = extractUserId(data);
      if (userId) {
        await revokeEntitlement(userId, 'canceled');
        return json(res, 200, { ok: true, revoked: true });
      }
      return json(res, 200, { ok: true, ignored: 'cancel_no_user' });
    }

    /* --- One-shot fallback: transaction.completed --- */
    if (eventType === 'transaction.completed') {
      const userId = extractUserId(data);
      const planId = extractPlanId(data);
      const txnId = data.id || '';
      const status = String(data.status || '').toLowerCase();

      if (status && status !== 'completed' && status !== 'paid') {
        return json(res, 200, { ok: true, ignored: 'txn_status_' + status });
      }
      if (!userId || !planId) {
        return json(res, 200, {
          ok: true,
          ignored: 'txn_missing_ids',
          hasUser: Boolean(userId),
          hasPlan: Boolean(planId),
        });
      }

      let amountCents = null;
      try {
        const details = data.details || {};
        const totals = details.totals || data.details?.totals;
        if (totals && totals.grand_total != null) {
          amountCents = Number(totals.grand_total);
        } else if (totals && totals.total != null) {
          amountCents = Number(totals.total);
        }
      } catch (e) {}

      await grantFromVerifiedPayment({
        userId,
        productId: planId,
        paymentId: txnId,
        orderId: data.subscription_id || data.subscriptionId || txnId,
        amountCents,
        currency: (data.currency_code || 'USD').toUpperCase(),
        skipAmountCheck: true,
        raw: { source: 'paddle', eventType: 'transaction.completed' },
      });
      return json(res, 200, { ok: true, granted: true, planId, userId });
    }

    return json(res, 200, { ok: true, ignored: eventType });
  } catch (err) {
    console.error('paddle webhook error:', err);
    return json(res, 500, { error: err.message || 'Webhook failed' });
  }
};
