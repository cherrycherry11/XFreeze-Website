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

/** Higher wins when upgrading (monthly → yearly). */
function planRank(planId) {
  if (planId === 'pro-yearly') return 2;
  if (planId === 'pro-monthly') return 1;
  return 0;
}

/**
 * Resolve plan strictly from configured Dodo product IDs (env) and
 * checkout metadata we set ourselves. Never guess from amount or name.
 * Returns null if the product cannot be identified - callers must refuse.
 */
function resolvePlanIdFromPayment(payment, bodyPlanId) {
  const cart = (payment && (payment.product_cart || payment.productCart)) || [];
  const cartProductId =
    (cart[0] && (cart[0].product_id || cart[0].productId)) ||
    (payment && (payment.product_id || payment.productId)) ||
    '';

  const fromProduct = planIdFromProductId(cartProductId);
  if (fromProduct) return fromProduct;

  const meta = (payment && (payment.metadata || payment.meta)) || {};
  const fromMeta = meta.plan_id || meta.planId;
  if (fromMeta === 'pro-monthly' || fromMeta === 'pro-yearly') {
    /* Only trust metadata if product IDs are configured and cart is empty
       (some webhooks omit cart) OR metadata matches the cart product. */
    if (!cartProductId) return fromMeta;
    const expectedId = productIdForPlan(fromMeta);
    if (expectedId && expectedId === cartProductId) return fromMeta;
  }

  /* body plan_id is client-supplied - only accept if it matches cart product */
  if (
    bodyPlanId &&
    (bodyPlanId === 'pro-monthly' || bodyPlanId === 'pro-yearly')
  ) {
    const expectedId = productIdForPlan(bodyPlanId);
    if (expectedId && cartProductId && expectedId === cartProductId) {
      return bodyPlanId;
    }
    if (expectedId && !cartProductId && fromMeta === bodyPlanId) {
      return bodyPlanId;
    }
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

function priceAmount(p) {
  if (p == null) return null;
  if (typeof p === 'number') return p;
  if (typeof p.price === 'number') return p.price;
  if (p.price && typeof p.price.price === 'number') return p.price.price;
  return null;
}

/**
 * Ensure catalog products exist at live prices ($49 / $499).
 * Creates them once if missing; PATCHes amount when wrong.
 * Returns { monthlyId, yearlyId, created, priceFixed }.
 * Prefer setting DODO_PRODUCT_* in Vercel after first create.
 */
async function ensureDefaultProducts() {
  const map = productMap();
  const list = await dodoFetch('/products?page_size=50');
  const items = (list && list.items) || [];

  let monthly = items.find(
    (p) =>
      (map['pro-monthly'] && p.product_id === map['pro-monthly']) ||
      /pro monthly/i.test(p.name || '')
  );
  let yearly = items.find(
    (p) =>
      (map['pro-yearly'] && p.product_id === map['pro-yearly']) ||
      /pro yearly/i.test(p.name || '')
  );

  let created = false;
  let priceFixed = false;

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
    created = true;
  } else if (priceAmount(monthly) !== 4900) {
    await dodoFetch(`/products/${monthly.product_id}`, {
      method: 'PATCH',
      body: {
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
    priceFixed = true;
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
    created = true;
  } else if (priceAmount(yearly) !== 49900) {
    await dodoFetch(`/products/${yearly.product_id}`, {
      method: 'PATCH',
      body: {
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
    priceFixed = true;
  }

  return {
    monthlyId: monthly.product_id || monthly.productId || map['pro-monthly'],
    yearlyId: yearly.product_id || yearly.productId || map['pro-yearly'],
    created,
    priceFixed,
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

  /* Reject stale webhook deliveries (replay window: 5 minutes) */
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum) || tsNum <= 0) return false;
  const ageSec = Math.abs(Date.now() / 1000 - tsNum);
  if (ageSec > 5 * 60) return false;

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
  planRank,
  resolvePlanIdFromPayment,
  productsReady,
  dodoFetch,
  ensureDefaultProducts,
  verifyDodoWebhook,
  publicDodoConfig,
};
