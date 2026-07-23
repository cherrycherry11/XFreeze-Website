const crypto = require('crypto');
const { getKeys, hasRazorpay, getRazorpay, json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const { grantFromVerifiedPayment, publicEntitlement, getEntitlementForUser } = require('./_lib/entitlements');
const { SUBSCRIPTIONS } = require('./_lib/products');

function safeEqualHex(a, b) {
  const ba = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

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
    if (!safeEqualHex(expected, razorpay_signature)) {
      return json(res, 400, {
        success: false,
        error: 'Signature mismatch — payment not verified',
      });
    }

    const razorpay = getRazorpay();
    const [payment, order] = await Promise.all([
      razorpay.payments.fetch(razorpay_payment_id),
      razorpay.orders.fetch(razorpay_order_id),
    ]);

    if (!payment || !order) {
      return json(res, 400, { success: false, error: 'Could not load payment or order from Razorpay' });
    }

    if (String(payment.order_id) !== String(razorpay_order_id)) {
      return json(res, 400, { success: false, error: 'Payment does not belong to this order' });
    }

    const status = String(payment.status || '').toLowerCase();
    if (status !== 'captured' && status !== 'authorized') {
      return json(res, 400, {
        success: false,
        error: 'Payment is not successful (status: ' + status + ')',
      });
    }

    if (Number(payment.amount) !== Number(order.amount)) {
      return json(res, 400, { success: false, error: 'Payment amount does not match order' });
    }

    const notes = order.notes || payment.notes || {};
    const productType = notes.product_type || notes.productType || '';
    const productId = notes.product_id || notes.productId || '';
    const noteUserId = notes.user_id || notes.userId || '';

    /* Non-subscription purchases: signature OK, no Pro grant */
    if (productType !== 'subscription') {
      return json(res, 200, {
        success: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        productType: productType || null,
        productId: productId || null,
        entitlement: { isPro: false, subscription: null },
        granted: false,
      });
    }

    if (!SUBSCRIPTIONS[productId]) {
      return json(res, 400, { success: false, error: 'Order product is not a known plan' });
    }

    const expectedCents = Math.round(Number(SUBSCRIPTIONS[productId].price) * 100);
    if (Number(order.amount) !== expectedCents) {
      return json(res, 400, {
        success: false,
        error: `Order amount ${order.amount} does not match plan price ${expectedCents}`,
      });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        success: false,
        error: 'Sign in required to activate your plan',
        code: 'auth_required',
      });
    }

    /* Bind payment to the user who created the order when note present */
    if (noteUserId && noteUserId !== user.id) {
      return json(res, 403, {
        success: false,
        error: 'This payment belongs to a different account. Sign in with the purchasing account.',
        code: 'user_mismatch',
      });
    }

    if (!hasServiceRole()) {
      return json(res, 503, {
        success: false,
        error: 'Entitlement store not configured on server',
        code: 'entitlement_store_missing',
      });
    }

    const entitlement = await grantFromVerifiedPayment({
      userId: user.id,
      productId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amountCents: Number(order.amount),
      currency: order.currency || payment.currency || 'USD',
      raw: {
        payment_status: payment.status,
        method: payment.method,
        email: payment.email,
      },
    });

    return json(res, 200, {
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      productType: 'subscription',
      productId,
      entitlement,
      granted: Boolean(entitlement && entitlement.isPro),
    });
  } catch (err) {
    console.error('verify-payment error:', err);
    /* Unique violation = race; return existing entitlement if possible */
    if (err && (err.status === 409 || String(err.message || '').includes('duplicate'))) {
      try {
        const user = await getUserFromRequest(req);
        if (user) {
          const row = await getEntitlementForUser(user.id);
          return json(res, 200, {
            success: true,
            entitlement: publicEntitlement(row),
            granted: true,
            idempotent: true,
          });
        }
      } catch (e2) {}
    }
    return json(res, 500, { success: false, error: err.message || 'Verification failed' });
  }
};
