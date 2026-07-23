/**
 * Dodo Payments helpers (test + live).
 *
 * Env:
 *   DODO_PAYMENTS_API_KEY
 *   DODO_PAYMENTS_ENVIRONMENT=test_mode|live_mode
 *   DODO_PRODUCT_PRO_MONTHLY=pdt_...
 *   DODO_PRODUCT_PRO_YEARLY=pdt_...
 *   DODO_PAYMENTS_WEBHOOK_KEY (optional until webhooks configured)
 */

function dodoEnv() {
  const e = (process.env.DODO_PAYMENTS_ENVIRONMENT || process.env.DODO_ENV || 'test_mode')
    .toLowerCase()
    .trim();
  if (e === 'live' || e === 'live_mode' || e === 'production') return 'live_mode';
  return 'test_mode';
}

function dodoApiKey() {
  return process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_API_KEY || '';
}

function dodoWebhookKey() {
  return process.env.DODO_PAYMENTS_WEBHOOK_KEY || process.env.DODO_WEBHOOK_KEY || '';
}

function dodoBaseUrl() {
  return dodoEnv() === 'live_mode'
    ? 'https://live.dodopayments.com'
    : 'https://test.dodopayments.com';
}

function hasDodo() {
  return Boolean(dodoApiKey());
}

function productMap() {
  return {
    'pro-monthly':
      process.env.DODO_PRODUCT_PRO_MONTHLY ||
      process.env.DODO_PRODUCT_ID_MONTHLY ||
      '',
    'pro-yearly':
      process.env.DODO_PRODUCT_PRO_YEARLY ||
      process.env.DODO_PRODUCT_ID_YEARLY ||
      '',
  };
}

function productIdForPlan(planId) {
  return productMap()[planId] || '';
}

function planIdFromProductId(productId) {
  if (!productId) return null;
  const map = productMap();
  for (const [plan, id] of Object.entries(map)) {
    if (id && id === productId) return plan;
  }
  return null;
}

function productsReady() {
  const m = productMap();
  return Boolean(m['pro-monthly'] && m['pro-yearly']);
}

async function dodoFetch(path, { method = 'GET', body } = {}) {
  const key = dodoApiKey();
  if (!key) throw new Error('DODO_PAYMENTS_API_KEY is not set');
  const res = await fetch(`${dodoBaseUrl()}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error || data.detail)) ||
      text ||
      res.statusText;
    const err = new Error(String(msg));
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Standard Webhooks-style verification (Dodo uses this).
 * signed_content = `${webhook-id}.${webhook-timestamp}.${body}`
 * secret may be base64 with whsec_ prefix.
 */
function verifyDodoWebhook(rawBody, headers, secret) {
  const crypto = require('crypto');
  if (!rawBody || !secret) return false;
  const id = headers['webhook-id'] || headers['Webhook-Id'] || '';
  const ts = headers['webhook-timestamp'] || headers['Webhook-Timestamp'] || '';
  const sigHeader =
    headers['webhook-signature'] || headers['Webhook-Signature'] || '';
  if (!id || !ts || !sigHeader) return false;

  let key = secret;
  if (key.startsWith('whsec_')) {
    key = Buffer.from(key.slice(6), 'base64');
  } else {
    try {
      key = Buffer.from(key, 'base64');
    } catch (e) {
      key = Buffer.from(secret, 'utf8');
    }
  }

  const signed = `${id}.${ts}.${rawBody}`;
  const expected = crypto.createHmac('sha256', key).update(signed, 'utf8').digest('base64');

  /* Header format: v1,<sig> or space-separated list */
  const parts = String(sigHeader).split(' ');
  for (const part of parts) {
    const sig = part.includes(',') ? part.split(',')[1] : part.replace(/^v1,/, '');
    try {
      const a = Buffer.from(expected);
      const b = Buffer.from(sig);
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) return true;
    } catch (e) {}
  }
  return false;
}

function publicDodoConfig() {
  return {
    dodo: hasDodo() && productsReady(),
    dodoEnv: dodoEnv(),
    productsReady: productsReady(),
    products: productMap(),
  };
}

module.exports = {
  dodoEnv,
  dodoApiKey,
  dodoWebhookKey,
  dodoBaseUrl,
  hasDodo,
  productMap,
  productIdForPlan,
  planIdFromProductId,
  productsReady,
  dodoFetch,
  verifyDodoWebhook,
  publicDodoConfig,
};
