const { json } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');

/**
 * Razorpay create-order retired — use POST /api/create-checkout (Dodo).
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');
  return json(res, 410, {
    error: 'Razorpay is retired. Use POST /api/create-checkout with Dodo Payments.',
    code: 'provider_dodo',
    provider: 'dodo',
  });
};
