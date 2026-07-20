const { hasRazorpay } = require('./_lib/razorpay-client');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      ok: true,
      configured: hasRazorpay(),
      razorpay: hasRazorpay(),
      stripe: false,
      paypal: false,
      host: 'vercel',
    })
  );
};
