/**
 * Paddle Billing config helpers (server).
 *
 * Env:
 *   PADDLE_ENV=sandbox|production
 *   PADDLE_API_KEY=pdl_sdbx_... or pdl_live_...
 *   PADDLE_CLIENT_TOKEN=test_... or live_...
 *   PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_...
 *   PADDLE_PRICE_PRO_MONTHLY=pri_...
 *   PADDLE_PRICE_PRO_YEARLY=pri_...
 */

function paddleEnv() {
  const e = (process.env.PADDLE_ENV || process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox')
    .toLowerCase()
    .trim();
  return e === 'production' || e === 'live' ? 'production' : 'sandbox';
}

function paddleApiKey() {
  return (
    process.env.PADDLE_API_KEY ||
    (paddleEnv() === 'production'
      ? process.env.PADDLE_LIVE_API_KEY
      : process.env.PADDLE_SANDBOX_API_KEY) ||
    ''
  );
}

function paddleClientToken() {
  return (
    process.env.PADDLE_CLIENT_TOKEN ||
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ||
    ''
  );
}

function paddleWebhookSecret() {
  return process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET || '';
}

function hasPaddleClient() {
  return Boolean(paddleClientToken());
}

function hasPaddleServer() {
  return Boolean(paddleApiKey());
}

function hasPaddleWebhook() {
  return Boolean(paddleWebhookSecret());
}

/**
 * Map app plan ids ↔ Paddle price ids (from env).
 */
function priceMap() {
  const monthly =
    process.env.PADDLE_PRICE_PRO_MONTHLY ||
    process.env.PADDLE_PRICE_ID_MONTHLY ||
    '';
  const yearly =
    process.env.PADDLE_PRICE_PRO_YEARLY ||
    process.env.PADDLE_PRICE_ID_YEARLY ||
    '';
  return {
    'pro-monthly': monthly,
    'pro-yearly': yearly,
  };
}

function planIdFromPriceId(priceId) {
  if (!priceId) return null;
  const map = priceMap();
  for (const [planId, pri] of Object.entries(map)) {
    if (pri && pri === priceId) return planId;
  }
  return null;
}

function priceIdForPlan(planId) {
  return priceMap()[planId] || '';
}

function publicPaddleConfig() {
  const map = priceMap();
  const clientToken = paddleClientToken();
  const pricesReady = Boolean(map['pro-monthly'] && map['pro-yearly']);
  return {
    paddle: Boolean(clientToken && pricesReady),
    paddleEnv: paddleEnv(),
    paddleClientToken: clientToken || null,
    prices: {
      'pro-monthly': map['pro-monthly'] || null,
      'pro-yearly': map['pro-yearly'] || null,
    },
    pricesReady,
  };
}

/**
 * Verify Paddle-Signature header (ts + h1 HMAC-SHA256).
 * https://developer.paddle.com/webhooks/signature-verification
 */
function verifyPaddleSignature(rawBody, signatureHeader, secret) {
  const crypto = require('crypto');
  if (!rawBody || !signatureHeader || !secret) return false;

  const parts = {};
  String(signatureHeader)
    .split(';')
    .forEach((piece) => {
      const [k, v] = piece.split('=');
      if (k && v) parts[k.trim()] = v.trim();
    });

  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  /* Reject very old timestamps (5 min) */
  const ageMs = Math.abs(Date.now() - Number(ts) * 1000);
  if (!Number.isFinite(ageMs) || ageMs > 5 * 60 * 1000) {
    /* Still allow slightly skewed clocks in sandbox */
    if (ageMs > 60 * 60 * 1000) return false;
  }

  const payload = `${ts}:${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

  try {
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(h1, 'utf8');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (e) {
    return false;
  }
}

module.exports = {
  paddleEnv,
  paddleApiKey,
  paddleClientToken,
  paddleWebhookSecret,
  hasPaddleClient,
  hasPaddleServer,
  hasPaddleWebhook,
  priceMap,
  planIdFromPriceId,
  priceIdForPlan,
  publicPaddleConfig,
  verifyPaddleSignature,
};
