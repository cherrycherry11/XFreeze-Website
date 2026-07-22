/**
 * Paddle Billing config helpers (server).
 *
 * Env:
 *   PADDLE_ENV=sandbox|production  (optional — auto-detected from token prefix)
 *   PADDLE_API_KEY=pdl_sdbx_... or pdl_live_...
 *   PADDLE_CLIENT_TOKEN=test_... or live_...
 *   PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_...
 *   PADDLE_PRICE_PRO_MONTHLY=pri_...
 *   PADDLE_PRICE_PRO_YEARLY=pri_...
 *   PADDLE_WEBHOOK_IP_ALLOWLIST=true  (optional — fetch IPs from api.paddle.com/ips)
 */

function paddleClientToken() {
  return (
    process.env.PADDLE_CLIENT_TOKEN ||
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ||
    ''
  );
}

/**
 * Prefer explicit PADDLE_ENV; else infer from client token prefix.
 * live_… → production, test_… → sandbox, default sandbox until configured.
 */
function paddleEnv() {
  const explicit = (process.env.PADDLE_ENV || process.env.NEXT_PUBLIC_PADDLE_ENV || '')
    .toLowerCase()
    .trim();
  if (explicit === 'production' || explicit === 'live') return 'production';
  if (explicit === 'sandbox' || explicit === 'test') return 'sandbox';

  const token = paddleClientToken();
  if (token.indexOf('live_') === 0) return 'production';
  if (token.indexOf('test_') === 0) return 'sandbox';

  const key = process.env.PADDLE_API_KEY || '';
  if (key.indexOf('pdl_live_') === 0) return 'production';
  if (key.indexOf('pdl_sdbx_') === 0) return 'sandbox';

  return 'sandbox';
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
  const env = paddleEnv();
  return {
    paddle: Boolean(clientToken && pricesReady),
    paddleEnv: env,
    /** Client must only call Environment.set('sandbox') when this is true */
    isSandbox: env === 'sandbox',
    paddleClientToken: clientToken || null,
    prices: {
      'pro-monthly': map['pro-monthly'] || null,
      'pro-yearly': map['pro-yearly'] || null,
    },
    pricesReady,
  };
}

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

  const ageMs = Math.abs(Date.now() - Number(ts) * 1000);
  if (!Number.isFinite(ageMs) || ageMs > 60 * 60 * 1000) return false;

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

/**
 * Fetch current Paddle webhook source IPs (never hard-code).
 * Live: https://api.paddle.com/ips
 * Sandbox: https://sandbox-api.paddle.com/ips
 */
async function fetchPaddleWebhookCidrs() {
  const base =
    paddleEnv() === 'production'
      ? 'https://api.paddle.com'
      : 'https://sandbox-api.paddle.com';
  const res = await fetch(`${base}/ips`);
  if (!res.ok) throw new Error('Failed to fetch Paddle IPs: ' + res.status);
  const body = await res.json();
  const cidrs =
    (body && body.data && body.data.ipv4_cidrs) ||
    (body && body.data && body.data.ipv4Cidrs) ||
    [];
  return Array.isArray(cidrs) ? cidrs : [];
}

/**
 * Client IP for Vercel / proxies.
 */
function requestIp(req) {
  const xf = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'] || '';
  if (xf) return String(xf).split(',')[0].trim();
  return (
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    ''
  );
}

/** Simple /32 CIDR match (Paddle returns /32 only today). */
function ipInCidrs(ip, cidrs) {
  if (!ip || !cidrs || !cidrs.length) return false;
  const clean = String(ip).replace(/^::ffff:/, '');
  for (const c of cidrs) {
    const base = String(c).split('/')[0];
    if (base === clean) return true;
  }
  return false;
}

/**
 * When PADDLE_WEBHOOK_IP_ALLOWLIST=true, reject non-Paddle IPs.
 * Off by default so local simulators / dashboard replays still work in sandbox.
 */
async function assertPaddleWebhookIp(req) {
  const flag = String(process.env.PADDLE_WEBHOOK_IP_ALLOWLIST || '').toLowerCase();
  if (flag !== 'true' && flag !== '1' && flag !== 'yes') {
    return { ok: true, skipped: true };
  }
  const cidrs = await fetchPaddleWebhookCidrs();
  const ip = requestIp(req);
  if (!ipInCidrs(ip, cidrs)) {
    return { ok: false, ip, cidrs };
  }
  return { ok: true, ip };
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
  fetchPaddleWebhookCidrs,
  requestIp,
  ipInCidrs,
  assertPaddleWebhookIp,
};
