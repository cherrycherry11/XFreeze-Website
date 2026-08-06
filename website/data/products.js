/**
 * Freezestack product catalog (display / plan ids).
 * Keep in sync with website/api/_lib/products.js
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

  /**
   * Subscriptions
   * Free browse + two paid tiers (Pro, Studio), each monthly or yearly.
   */
  const SUBSCRIPTIONS = {
    'pro-monthly': {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: 29,
      type: 'subscription',
      interval: 'month',
      tier: 'pro',
    },
    'pro-yearly': {
      id: 'pro-yearly',
      name: 'Pro Yearly',
      price: 290,
      type: 'subscription',
      interval: 'year',
      tier: 'pro',
    },
    'studio-monthly': {
      id: 'studio-monthly',
      name: 'Studio Monthly',
      price: 79,
      type: 'subscription',
      interval: 'month',
      tier: 'studio',
    },
    'studio-yearly': {
      id: 'studio-yearly',
      name: 'Studio Yearly',
      price: 790,
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

  function tierFromPlanId(planId) {
    var s = String(planId || '').toLowerCase();
    if (s.indexOf('studio') !== -1) return 'studio';
    if (s.indexOf('pro') !== -1) return 'pro';
    return 'free';
  }

  global.XFreezeProducts = {
    BUNDLES: BUNDLES,
    SUBSCRIPTIONS: SUBSCRIPTIONS,
    TEMPLATE_CATEGORY_PRICES: TEMPLATE_CATEGORY_PRICES,
    getBundle: getBundle,
    getSubscription: getSubscription,
    getTemplateProduct: getTemplateProduct,
    formatUSD: formatUSD,
    tierFromPlanId: tierFromPlanId,
  };
})(typeof window !== 'undefined' ? window : globalThis);
