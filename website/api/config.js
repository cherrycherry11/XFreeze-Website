const { json } = require('./_lib/http');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { hasServiceRole } = require('./_lib/supabase');

/**
 * Public client config. Payments intentionally disabled.
 */
module.exports = function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  return json(res, 200, {
    configured: false,
    payments: false,
    provider: null,
    dodo: false,
    razorpay: false,
    paddle: false,
    stripe: false,
    paypal: false,
    entitlements: hasServiceRole(),
    note: 'Checkout is offline while payments are rebuilt.',
  });
};
