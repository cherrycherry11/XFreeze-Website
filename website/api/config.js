const { hasRazorpay, getKeys, json } = require('./_lib/razorpay-client');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const { key_id } = getKeys();
  const ok = hasRazorpay();
  return json(res, 200, {
    configured: ok,
    razorpay: ok,
    razorpayKeyId: ok ? key_id : null,
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
