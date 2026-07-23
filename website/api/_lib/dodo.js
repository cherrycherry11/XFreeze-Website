/**
 * Dodo Payments helpers (fresh integration).
 *
 * Env (Production / Preview):
 *   DODO_PAYMENTS_API_KEY          preferred
 *   Dodo_test_payments_gateway     fallback (your Vercel test key name)
 *   DODO_PAYMENTS_ENVIRONMENT      test_mode | live_mode (default test_mode)
 *   DODO_PRODUCT_PRO_MONTHLY       pdt_...
 *   DODO_PRODUCT_PRO_YEARLY        pdt_...
 *   DODO_PAYMENTS_WEBHOOK_KEY      optional signing secret
 */

function dodoEnv() {
  const e = (
    process.env.DODO_PAYMENTS_ENVIRONMENT ||
    process.env.DODO_ENV ||
    'test_mode'
  )
    .toLowerCase()
    .trim();
  if (e === 'live' || e === 'live_mode' || e === 'production') return 'live_mode';
  return 'test_mode';
}

function dodoApiKey() {
  return (
    process.env.DODO_PAYMENTS_API_KEY ||
    process.env.Dodo_test_payments_gateway ||
    process.env.DODO_TEST_PAYMENTS_GATEWAY ||
    process.env.DODO_API_KEY ||
    ''
  ).trim();
}

function dodoWebhookKey() {
  return (
    process.env.DODO_PAYMENTS_WEBHOOK_KEY ||
    process.env.DODO_WEBHOOK_KEY ||
    ''
  ).trim();
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
 * Ensure test catalog products exist. Creates them once if env IDs missing
 * and returns { monthlyId, yearlyId, created }.
 * Prefer setting DODO_PRODUCT_* in Vercel after first create.
 */
async function ensureDefaultProducts() {
  const map = productMap();
  if (map['pro-monthly'] && map['pro-yearly']) {
    return {
      monthlyId: map['pro-monthly'],
      yearlyId: map['pro-yearly'],
      created: false,
    };
  }

  const list = await dodoFetch('/products?page_size=50');
  const items = (list && list.items) || [];
  let monthly = items.find(
    (p) =>
      p.product_id === map['pro-monthly'] ||
      /pro monthly/i.test(p.name || '')
  );
  let yearly = items.find(
    (p) =>
      p.product_id === map['pro-yearly'] ||
      /pro yearly/i.test(p.name || '')
  );

  if (!monthly) {
    monthly = await dodoFetch('/products', {
      method: 'POST',
      body: {
        name: 'X Freeze Pro Monthly',
        description: 'X Freeze Pro plan billed monthly',
        tax_category: 'saas',
        price: {
          type: 'recurring_price',
          price: 4900,
          currency: 'USD',
          discount: 0,
          purchasing_power_parity: false,
          payment_frequency_count: 1,
          payment_frequency_interval: 'Month',
          subscription_period_count: 1,
          subscription_period_interval: 'Month',
        },
      },
    });
  }
  if (!yearly) {
    yearly = await dodoFetch('/products', {
      method: 'POST',
      body: {
        name: 'X Freeze Pro Yearly',
        description: 'X Freeze Pro plan billed yearly',
        tax_category: 'saas',
        price: {
          type: 'recurring_price',
          price: 49900,
          currency: 'USD',
          discount: 0,
          purchasing_power_parity: false,
          payment_frequency_count: 1,
          payment_frequency_interval: 'Year',
          subscription_period_count: 1,
          subscription_period_interval: 'Year',
        },
      },
    });
  }

  return {
    monthlyId: monthly.product_id || monthly.productId,
    yearlyId: yearly.product_id || yearly.productId,
    created: true,
  };
}

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
  const expected = crypto
    .createHmac('sha256', key)
    .update(signed, 'utf8')
    .digest('base64');

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
    dodo: hasDodo(),
    dodoEnv: dodoEnv(),
    productsReady: productsReady(),
    products: {
      'pro-monthly': Boolean(productMap()['pro-monthly']),
      'pro-yearly': Boolean(productMap()['pro-yearly']),
    },
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
  ensureDefaultProducts,
  verifyDodoWebhook,
  publicDodoConfig,
};
