const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole, hasSupabase } = require('./_lib/supabase');
const { hasDodo, productsReady, dodoEnv } = require('./_lib/dodo');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      provider: 'dodo',
      configured: Boolean(hasDodo() && productsReady() && hasServiceRole()),
      dodo: hasDodo(),
      dodoEnv: dodoEnv(),
      dodoProducts: productsReady(),
      entitlements: hasServiceRole(),
      supabase: hasSupabase(),
      razorpay: false,
      paddle: false,
      stripe: false,
      paypal: false,
      host: 'vercel',
    })
  );
};
