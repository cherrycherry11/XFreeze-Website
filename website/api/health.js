const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole, hasSupabase } = require('./_lib/supabase');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      payments: false,
      provider: null,
      configured: false,
      entitlements: hasServiceRole(),
      supabase: hasSupabase(),
      host: 'vercel',
      note: 'Payment integration removed — rebuild from a clean slate.',
    })
  );
};
