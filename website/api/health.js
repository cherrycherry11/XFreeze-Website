const { hasRazorpay } = require('./_lib/razorpay-client');
const { hasServiceRole, hasSupabase } = require('./_lib/supabase');
const { handlePreflight, applyCors } = require('./_lib/cors');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      provider: 'razorpay',
      configured: hasRazorpay(),
      razorpay: hasRazorpay(),
      entitlements: hasServiceRole(),
      supabase: hasSupabase(),
      paddle: false,
      stripe: false,
      paypal: false,
      host: 'vercel',
    })
  );
};
