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
    'studio-monthly':
      process.env.DODO_PRODUCT_STUDIO_MONTHLY ||
      process.env.DODO_PRODUCT_ID_STUDIO_MONTHLY ||
      '',
    'studio-yearly':
      process.env.DODO_PRODUCT_STUDIO_YEARLY ||
      process.env.DODO_PRODUCT_ID_STUDIO_YEARLY ||
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

const KNOWN_PLAN_IDS = [
  'pro-monthly',
  'pro-yearly',
  'studio-monthly',
  'studio-yearly',
];

function isKnownPlanId(planId) {
  return KNOWN_PLAN_IDS.indexOf(planId) !== -1;
}

/** Higher wins when upgrading (Pro monthly → Studio yearly). */
function planRank(planId) {
  if (planId === 'studio-yearly') return 4;
  if (planId === 'studio-monthly') return 3;
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
  if (fromMeta && isKnownPlanId(fromMeta)) {
    /* Only trust metadata if product IDs are configured and cart is empty
       (some webhooks omit cart) OR metadata matches the cart product. */
    if (!cartProductId) return fromMeta;
    const expectedId = productIdForPlan(fromMeta);
    if (expectedId && expectedId === cartProductId) return fromMeta;
  }

  /* body plan_id is client-supplied - only accept if it matches cart product */
  if (bodyPlanId && isKnownPlanId(bodyPlanId)) {
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
 * Target catalog for Freezestack subscriptions (cents).
 * Keep in sync with website/data/products.js.
 */
const PLAN_CATALOG = {
  'pro-monthly': {
    planId: 'pro-monthly',
    name: 'Freezestack Premium Monthly',
    description: 'Premium plan billed monthly',
    amountCents: 4900,
    interval: 'Month',
    nameMatch: /premium monthly|pro monthly/i,
  },
  'pro-yearly': {
    planId: 'pro-yearly',
    name: 'Freezestack Premium Yearly',
    description: 'Premium plan billed yearly ($499, ~15% off)',
    amountCents: 49900,
    interval: 'Year',
    nameMatch: /premium yearly|pro yearly/i,
  },
  'studio-monthly': {
    planId: 'studio-monthly',
    name: 'Freezestack Premium Plus Monthly',
    description: 'Premium Plus plan billed monthly',
    amountCents: 10900,
    interval: 'Month',
    nameMatch: /premium plus monthly|studio monthly/i,
  },
  'studio-yearly': {
    planId: 'studio-yearly',
    name: 'Freezestack Premium Plus Yearly',
    description: 'Premium Plus plan billed yearly ($999, ~24% off)',
    amountCents: 99900,
    interval: 'Year',
    nameMatch: /premium plus yearly|studio yearly/i,
  },
};

function recurringPriceBody(amountCents, interval) {
  return {
    type: 'recurring_price',
    price: amountCents,
    currency: 'USD',
    discount: 0,
    purchasing_power_parity: false,
    payment_frequency_count: 1,
    payment_frequency_interval: interval,
    subscription_period_count: 1,
    subscription_period_interval: interval,
  };
}

function findCatalogProduct(items, planId, map) {
  const cfg = PLAN_CATALOG[planId];
  const envId = map[planId];
  if (envId) {
    const byId = items.find(
      (p) => p.product_id === envId || p.productId === envId
    );
    if (byId) return byId;
  }
  return items.find((p) => cfg.nameMatch.test(p.name || '')) || null;
}

/**
 * Ensure all four subscription products exist at catalog prices:
 * Premium $49 / $499, Premium Plus $109 / $999.
 * Creates missing products; PATCHes amount/name when wrong.
 * Returns { products, created, priceFixed, ids }.
 * Prefer setting DODO_PRODUCT_* in Vercel after first create.
 */
async function ensureDefaultProducts() {
  const map = productMap();
  const list = await dodoFetch('/products?page_size=100');
  const items = (list && list.items) || [];

  let created = false;
  let priceFixed = false;
  const products = {};
  const ids = {};

  for (const planId of KNOWN_PLAN_IDS) {
    const cfg = PLAN_CATALOG[planId];
    let product = findCatalogProduct(items, planId, map);

    if (!product) {
      product = await dodoFetch('/products', {
        method: 'POST',
        body: {
          name: cfg.name,
          description: cfg.description,
          tax_category: 'saas',
          price: recurringPriceBody(cfg.amountCents, cfg.interval),
        },
      });
      created = true;
      if (product && (product.product_id || product.productId)) {
        items.push(product);
      }
    } else {
      const pid = product.product_id || product.productId;
      const current = priceAmount(product);
      const needsPrice = current !== cfg.amountCents;
      const needsName = (product.name || '') !== cfg.name;
      if (needsPrice || needsName) {
        const body = {
          name: cfg.name,
          description: cfg.description,
        };
        if (needsPrice) {
          body.price = recurringPriceBody(cfg.amountCents, cfg.interval);
        }
        await dodoFetch(`/products/${pid}`, {
          method: 'PATCH',
          body,
        });
        priceFixed = true;
        product = {
          ...product,
          name: cfg.name,
          price: body.price || product.price,
        };
      }
    }

    const id =
      (product && (product.product_id || product.productId)) || map[planId] || '';
    products[planId] = product;
    ids[planId] = id;
  }

  return {
    monthlyId: ids['pro-monthly'],
    yearlyId: ids['pro-yearly'],
    studioMonthlyId: ids['studio-monthly'],
    studioYearlyId: ids['studio-yearly'],
    products,
    ids,
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
      'studio-monthly': Boolean(productMap()['studio-monthly']),
      'studio-yearly': Boolean(productMap()['studio-yearly']),
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
  isKnownPlanId,
  KNOWN_PLAN_IDS,
  PLAN_CATALOG,
  priceAmount,
  resolvePlanIdFromPayment,
  productsReady,
  dodoFetch,
  ensureDefaultProducts,
  verifyDodoWebhook,
  publicDodoConfig,
};
