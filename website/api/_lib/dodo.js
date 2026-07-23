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

/** True unless metadata explicitly disables auto-debit / auto-renew. */
function metaWantsAutoDebit(meta) {
  if (!meta || typeof meta !== 'object') return true;
  const v =
    meta.auto_debit != null
      ? meta.auto_debit
      : meta.autoDebit != null
        ? meta.autoDebit
        : meta.auto_renew != null
          ? meta.auto_renew
          : meta.autoRenew;
  if (v === undefined || v === null || v === '') return true;
  if (v === false || v === 0) return false;
  const s = String(v).toLowerCase().trim();
  if (s === 'false' || s === '0' || s === 'no' || s === 'off') return false;
  return true;
}

/**
 * Schedule subscription cancellation at end of current period (no further charges).
 * Access continues until the paid period ends.
 */
async function cancelSubscriptionAtPeriodEnd(subscriptionId) {
  if (!subscriptionId) return null;
  return dodoFetch(`/subscriptions/${encodeURIComponent(subscriptionId)}`, {
    method: 'PATCH',
    body: { cancel_at_next_billing_date: true },
  });
}

/**
 * If checkout metadata requested no auto-debit, stop renewals after this period.
 * Safe to call more than once; ignores missing subscription ids.
 */
async function applyAutoDebitPreference(meta, subscriptionId) {
  if (!subscriptionId) return { applied: false, reason: 'no_subscription' };
  if (metaWantsAutoDebit(meta)) {
    return { applied: false, reason: 'auto_debit_on' };
  }
  try {
    await cancelSubscriptionAtPeriodEnd(subscriptionId);
    return { applied: true, subscriptionId };
  } catch (err) {
    console.error(
      'cancel_at_next_billing_date failed',
      subscriptionId,
      err && err.message
    );
    return {
      applied: false,
      reason: 'api_error',
      error: (err && err.message) || 'cancel failed',
      subscriptionId,
    };
  }
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
  metaWantsAutoDebit,
  cancelSubscriptionAtPeriodEnd,
  applyAutoDebitPreference,
};
