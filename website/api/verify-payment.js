const { json } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');

/**
 * Razorpay verify retired. Pro is granted only via Paddle webhooks
 * (and reflected in GET /api/me/entitlement).
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  return json(res, 410, {
    success: false,
    error:
      'Razorpay verification retired. Pro activates via Paddle webhooks after checkout.',
    code: 'provider_paddle',
    provider: 'paddle',
  });
};
