const crypto = require('crypto');
const { getKeys, hasRazorpay, json, readBody } = require('./_lib/razorpay-client');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    if (!hasRazorpay()) {
      return json(res, 503, { success: false, error: 'Razorpay is not configured' });
    }

    const { key_secret } = getKeys();
    const body = await readBody(req);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json(res, 400, {
        success: false,
        error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature',
      });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac('sha256', key_secret).update(payload).digest('hex');

    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(razorpay_signature), 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return json(res, 400, {
        success: false,
        error: 'Signature mismatch — payment not verified',
      });
    }

    return json(res, 200, {
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error('verify-payment error:', err);
    return json(res, 500, { success: false, error: err.message || 'Verification failed' });
  }
};
