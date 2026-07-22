const { json } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole } = require('./_lib/supabase');
const { publicPaddleConfig, hasPaddleServer, hasPaddleWebhook } = require('./_lib/paddle');

module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const paddle = publicPaddleConfig();
  const ok = Boolean(paddle.paddle && hasServiceRole());

  return json(res, 200, {
    configured: ok,
    /* Payment provider: Paddle (Razorpay retired for checkout) */
    provider: 'paddle',
    paddle: paddle.paddle,
    paddleEnv: paddle.paddleEnv,
    paddleClientToken: paddle.paddleClientToken,
    paddlePrices: paddle.prices,
    entitlements: hasServiceRole(),
    paddleWebhook: hasPaddleWebhook(),
    paddleServer: hasPaddleServer(),
    razorpay: false,
    razorpayKeyId: null,
    stripe: false,
    stripePublishableKey: null,
    paypal: false,
    paypalClientId: null,
    paypalMode: 'sandbox',
    paymentApiUrl: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.SITE_URL || null,
  });
};
