const { json } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole } = require('./_lib/supabase');
const { publicDodoConfig, hasDodo } = require('./_lib/dodo');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const dodo = publicDodoConfig();
  const ok = Boolean(dodo.dodo && hasServiceRole());

  return json(res, 200, {
    configured: ok,
    provider: 'dodo',
    dodo: dodo.dodo,
    dodoEnv: dodo.dodoEnv,
    dodoProductsReady: dodo.productsReady,
    entitlements: hasServiceRole(),
    razorpay: false,
    razorpayKeyId: null,
    paddle: false,
    stripe: false,
    paypal: false,
    paymentApiUrl: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.SITE_URL || null,
  });
};
