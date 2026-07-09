const BUNDLES = {
  starter: { id: 'starter', name: 'Starter Pack', price: 12, type: 'bundle' },
  filters: { id: 'filters', name: 'Filters Pack', price: 9, type: 'bundle' },
  makeup: { id: 'makeup', name: 'Make-up Collection', price: 18, type: 'bundle' },
  product: { id: 'product', name: 'Product Bundle', price: 29, type: 'bundle' },
  style: { id: 'style', name: 'Style Edit Vault', price: 34, type: 'bundle' },
  'creator-pro': { id: 'creator-pro', name: 'Creator Pro', price: 49, type: 'bundle' },
  ultimate: { id: 'ultimate', name: 'Ultimate Library', price: 79, type: 'bundle' },
};

const TEMPLATE_CATEGORY_PRICES = {
  Product: 2.99,
  'Make-up': 3.49,
  Filters: 1.99,
  'Style Edit': 2.49,
};

function resolveProduct(productType, productId, category) {
  if (productType === 'bundle') {
    const bundle = BUNDLES[productId];
    if (!bundle) return null;
    return { ...bundle, amountCents: Math.round(bundle.price * 100) };
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

module.exports = { BUNDLES, TEMPLATE_CATEGORY_PRICES, resolveProduct };