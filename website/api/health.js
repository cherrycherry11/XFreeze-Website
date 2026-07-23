const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole, hasSupabase } = require('./_lib/supabase');
const { hasDodo, productsReady, dodoEnv, dodoApiKey } = require('./_lib/dodo');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  const key = dodoApiKey();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      payments: hasDodo(),
      provider: hasDodo() ? 'dodo' : null,
      configured: Boolean(hasDodo() && hasServiceRole()),
      dodo: hasDodo(),
      dodoEnv: dodoEnv(),
      dodoKeyPresent: Boolean(key),
      dodoKeyLength: key ? key.length : 0,
      dodoProducts: productsReady(),
      entitlements: hasServiceRole(),
      supabase: hasSupabase(),
      host: 'vercel',
    })
  );
};
