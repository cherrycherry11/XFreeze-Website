/**
 * X Freeze product catalog - single source of truth for checkout pricing.
 * Used by static pages and validated server-side in payment-server/products.js
 */
(function (global) {
  const BUNDLES = {
    starter: { id: 'starter', name: 'Starter Pack', price: 12, type: 'bundle' },
    filters: { id: 'filters', name: 'Filters Pack', price: 9, type: 'bundle' },
    makeup: { id: 'makeup', name: 'Make-up Collection', price: 18, type: 'bundle' },
    product: { id: 'product', name: 'Product Bundle', price: 29, type: 'bundle' },
    style: { id: 'style', name: 'Style Edit Vault', price: 34, type: 'bundle' },
    'creator-pro': { id: 'creator-pro', name: 'Creator Pro', price: 49, type: 'bundle' },
    ultimate: { id: 'ultimate', name: 'Ultimate Library', price: 79, type: 'bundle' },
  };

  /** Subscription plans — billed in USD via Paddle */
  const SUBSCRIPTIONS = {
    'pro-monthly': {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: 49,
      type: 'subscription',
      interval: 'month',
    },
    'pro-yearly': {
      id: 'pro-yearly',
      name: 'Pro Yearly',
      price: 499,
      type: 'subscription',
      interval: 'year',
    },
  };

  const TEMPLATE_CATEGORY_PRICES = {
    Product: 2.99,
    'Make-up': 3.49,
    Filters: 1.99,
    'Style Edit': 2.49,
  };

  function getBundle(id) {
    return BUNDLES[id] || null;
  }

  function getSubscription(id) {
    return SUBSCRIPTIONS[id] || null;
  }

  function getTemplateProduct(code, category) {
    const price = TEMPLATE_CATEGORY_PRICES[category];
    if (!price || !code) return null;
    return {
      id: code,
      name: 'Template ' + code,
      price: price,
      type: 'template',
      category: category,
    };
  }

  function formatUSD(amount) {
    return '$' + (Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2));
  }

  global.XFreezeProducts = {
    BUNDLES: BUNDLES,
    SUBSCRIPTIONS: SUBSCRIPTIONS,
    TEMPLATE_CATEGORY_PRICES: TEMPLATE_CATEGORY_PRICES,
    getBundle: getBundle,
    getSubscription: getSubscription,
    getTemplateProduct: getTemplateProduct,
    formatUSD: formatUSD,
  };
})(typeof window !== 'undefined' ? window : globalThis);