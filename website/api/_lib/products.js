/**
 * Server-side product catalog (must match website/data/products.js)
 */
const BUNDLES = {
  starter: { id: 'starter', name: 'Starter Pack', price: 12, type: 'bundle' },
  filters: { id: 'filters', name: 'Filters Pack', price: 9, type: 'bundle' },
  makeup: { id: 'makeup', name: 'Make-up Collection', price: 18, type: 'bundle' },
  product: { id: 'product', name: 'Product Bundle', price: 29, type: 'bundle' },
  style: { id: 'style', name: 'Style Edit Vault', price: 34, type: 'bundle' },
  'creator-pro': { id: 'creator-pro', name: 'Creator Pro', price: 49, type: 'bundle' },
  ultimate: { id: 'ultimate', name: 'Ultimate Library', price: 79, type: 'bundle' },
};

const SUBSCRIPTIONS = {
  'pro-monthly': {
    id: 'pro-monthly',
    name: 'Premium Monthly',
    price: 49,
    type: 'subscription',
    interval: 'month',
    tier: 'pro',
  },
  'pro-yearly': {
    id: 'pro-yearly',
    name: 'Premium Yearly',
    /* $49 × 12 = $588 → $499 (~15% off) */
    price: 499,
    type: 'subscription',
    interval: 'year',
    tier: 'pro',
  },
  'studio-monthly': {
    id: 'studio-monthly',
    name: 'Premium Plus Monthly',
    price: 109,
    type: 'subscription',
    interval: 'month',
    tier: 'studio',
  },
  'studio-yearly': {
    id: 'studio-yearly',
    name: 'Premium Plus Yearly',
    /* $109 × 12 = $1308 → $999 (~24% off) */
    price: 999,
    type: 'subscription',
    interval: 'year',
    tier: 'studio',
  },
};

const TEMPLATE_CATEGORY_PRICES = {
  Product: 2.99,
  'Make-up': 3.49,
  Filters: 1.99,
  'Style Edit': 2.49,
};

function tierFromPlanId(planId) {
  const s = String(planId || '').toLowerCase();
  if (s.includes('studio')) return 'studio';
  if (s.includes('pro')) return 'pro';
  return 'free';
}

function resolveProduct(productType, productId, category) {
  if (productType === 'bundle') {
    const bundle = BUNDLES[productId];
    if (!bundle) return null;
    return { ...bundle, amountCents: Math.round(bundle.price * 100) };
  }

  if (productType === 'subscription') {
    const plan = SUBSCRIPTIONS[productId];
    if (!plan) return null;
    return { ...plan, amountCents: Math.round(plan.price * 100) };
  }

  if (productType === 'template') {
    const price = TEMPLATE_CATEGORY_PRICES[category];
    if (!price || !productId) return null;
    return {
      id: productId,
      name: `Template ${productId}`,
      price,
      type: 'template',
      category,
      amountCents: Math.round(price * 100),
    };
  }

  return null;
}

module.exports = {
  BUNDLES,
  SUBSCRIPTIONS,
  TEMPLATE_CATEGORY_PRICES,
  resolveProduct,
  tierFromPlanId,
};
