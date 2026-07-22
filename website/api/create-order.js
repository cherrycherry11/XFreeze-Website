const { json } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');

/**
 * Razorpay order creation retired — X Freeze uses Paddle Checkout.
 * Kept so old clients get a clear error instead of a silent failure.
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  return json(res, 410, {
    error:
      'Razorpay checkout has been retired. Use Paddle Checkout on the pricing page.',
    code: 'provider_paddle',
    provider: 'paddle',
  });
};
