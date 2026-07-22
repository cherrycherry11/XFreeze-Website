const crypto = require('crypto');
const { json, readBody, getRazorpay, hasRazorpay } = require('../_lib/razorpay-client');
const { hasServiceRole } = require('../_lib/supabase');
const { grantFromVerifiedPayment, getPaymentById } = require('../_lib/entitlements');
const { SUBSCRIPTIONS } = require('../_lib/products');

/**
 * Razorpay webhooks are server-to-server — no CORS.
 * Dashboard → Webhooks → secret → set RAZORPAY_WEBHOOK_SECRET.
 * Subscribe at least to: payment.captured
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  if (!secret) {
    console.error('RAZORPAY_WEBHOOK_SECRET not set');
    return json(res, 503, { error: 'Webhook not configured' });
  }

  try {
    /* Need raw body for signature — Vercel may parse JSON already */
    let raw =
      typeof req.body === 'string'
        ? req.body
        : req.rawBody
          ? req.rawBody
          : null;

    let event;
    if (raw) {
      event = JSON.parse(raw);
    } else {
      event = await readBody(req);
      raw = JSON.stringify(event);
    }

    const signature =
      req.headers['x-razorpay-signature'] || req.headers['X-Razorpay-Signature'] || '';
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(signature), 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return json(res, 400, { error: 'Invalid webhook signature' });
    }

    const eventName = event.event || '';
    if (eventName !== 'payment.captured' && eventName !== 'payment.authorized') {
      return json(res, 200, { ok: true, ignored: eventName });
    }

    const paymentEntity =
      (event.payload && event.payload.payment && event.payload.payment.entity) || null;
    if (!paymentEntity || !paymentEntity.id) {
      return json(res, 200, { ok: true, ignored: 'no_payment_entity' });
    }

    if (!hasServiceRole()) {
      console.error('Webhook: entitlement store missing');
      return json(res, 503, { error: 'Entitlement store not configured' });
    }

    /* Idempotent short-circuit */
    const existing = await getPaymentById(paymentEntity.id);
    if (existing) {
      return json(res, 200, { ok: true, duplicate: true, paymentId: paymentEntity.id });
    }

    if (!hasRazorpay()) {
      return json(res, 503, { error: 'Razorpay not configured' });
    }

    const razorpay = getRazorpay();
    const orderId = paymentEntity.order_id;
    if (!orderId) {
      return json(res, 200, { ok: true, ignored: 'no_order' });
    }

    const order = await razorpay.orders.fetch(orderId);
    const notes = (order && order.notes) || paymentEntity.notes || {};
    const productType = notes.product_type || '';
    const productId = notes.product_id || '';
    const userId = notes.user_id || '';

    if (productType !== 'subscription' || !SUBSCRIPTIONS[productId]) {
      return json(res, 200, { ok: true, ignored: 'not_subscription', productType, productId });
    }
    if (!userId) {
      console.error('Webhook: subscription payment missing user_id note', paymentEntity.id);
      return json(res, 200, { ok: true, ignored: 'missing_user_id' });
    }

    const expectedCents = Math.round(Number(SUBSCRIPTIONS[productId].price) * 100);
    if (Number(order.amount) !== expectedCents) {
      console.error('Webhook amount mismatch', order.amount, expectedCents);
      return json(res, 200, { ok: true, ignored: 'amount_mismatch' });
    }

    await grantFromVerifiedPayment({
      userId,
      productId,
      paymentId: paymentEntity.id,
      orderId,
      amountCents: Number(order.amount),
      currency: order.currency || paymentEntity.currency || 'USD',
      raw: { source: 'webhook', event: eventName },
    });

    return json(res, 200, { ok: true, granted: true, paymentId: paymentEntity.id, userId });
  } catch (err) {
    console.error('razorpay webhook error:', err);
    /* Return 200 for duplicate races so Razorpay does not retry forever incorrectly */
    if (err && (err.status === 409 || String(err.message || '').includes('duplicate'))) {
      return json(res, 200, { ok: true, duplicate: true });
    }
    return json(res, 500, { error: err.message || 'Webhook failed' });
  }
};
