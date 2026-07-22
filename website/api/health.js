const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole, hasSupabase } = require('./_lib/supabase');
const {
  publicPaddleConfig,
  hasPaddleWebhook,
  hasPaddleServer,
} = require('./_lib/paddle');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  const paddle = publicPaddleConfig();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(
    JSON.stringify({
      ok: true,
      provider: 'paddle',
      configured: Boolean(paddle.paddle && hasServiceRole()),
      paddle: paddle.paddle,
      paddleEnv: paddle.paddleEnv,
      paddlePrices: paddle.pricesReady,
      paddleWebhook: hasPaddleWebhook(),
      paddleServer: hasPaddleServer(),
      entitlements: hasServiceRole(),
      supabase: hasSupabase(),
      razorpay: false,
      stripe: false,
      paypal: false,
      host: 'vercel',
    })
  );
};
