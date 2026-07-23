require('dotenv').config();

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Stripe = require('stripe');
const Razorpay = require('razorpay');
const { resolveProduct } = require('./products');

const PORT = process.env.PORT || 4242;
const SITE_URL = (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripePublishable = process.env.STRIPE_PUBLISHABLE_KEY || '';
const paypalClientId = process.env.PAYPAL_CLIENT_ID || '';
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
const paypalMode = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;
const razorpay =
  razorpayKeyId && razorpayKeySecret
    ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
    : null;

const paypalBase =
  paypalMode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

function hasRazorpay() {
  return Boolean(razorpay);
}

function isConfigured() {
  return (
    hasRazorpay() ||
    Boolean(stripe) ||
    Boolean(paypalClientId && paypalClientSecret)
  );
}

function configPayload() {
  /* Razorpay only — Stripe/PayPal/Paddle disabled for storefront */
  return {
    configured: hasRazorpay(),
    provider: 'razorpay',
    razorpay: hasRazorpay(),
    razorpayKeyId: hasRazorpay() ? razorpayKeyId : null,
    stripe: false,
    stripePublishableKey: null,
    paypal: false,
    paypalClientId: null,
    paypalMode: null,
    paddle: false,
    paymentApiUrl: `http://localhost:${PORT}`,
  };
}

/**
 * Catalog prices are dollar amounts. Razorpay (and Stripe) use the smallest
 * currency unit: amount in cents = price * 100.
 */
function amountInCents(product) {
  return product.amountCents || Math.round(Number(product.price) * 100);
}

async function getPayPalAccessToken() {
  const creds = Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64');
  const res = await fetch(`${paypalBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

/* ── Health / config ── */

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    configured: isConfigured(),
    razorpay: hasRazorpay(),
    stripe: Boolean(stripe),
    paypal: Boolean(paypalClientId && paypalClientSecret),
  });
});

app.get('/api/config', (_req, res) => {
  res.json(configPayload());
});

/* ── Razorpay: create order ── */

async function createOrderHandler(req, res) {
  try {
    if (!razorpay) {
      return res.status(503).json({
        error:
          'Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to payment-server/.env',
      });
    }

    const body = req.body || {};
    let amount;
    const currency = (body.currency || 'USD').toUpperCase();
    let receipt = body.receipt || '';
    let productMeta = null;

    if (body.productType && body.productId) {
      const product = resolveProduct(body.productType, body.productId, body.category);
      if (!product) {
        return res.status(400).json({ error: 'Unknown product' });
      }
      amount = amountInCents(product);
      receipt = receipt || `xf_${product.type}_${product.id}_${Date.now()}`.slice(0, 40);
      productMeta = {
        product_type: product.type,
        product_id: product.id,
        product_name: product.name,
        category: product.category || '',
      };
    } else if (body.amount != null) {
      amount = Math.round(Number(body.amount));
      receipt = receipt || `xf_custom_${Date.now()}`.slice(0, 40);
    } else {
      return res.status(400).json({
        error: 'Provide productType+productId or amount (cents)',
      });
    }

    if (!Number.isFinite(amount) || amount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 cents ($1.00)' });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes: productMeta || {},
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
      productName: productMeta ? productMeta.product_name : null,
      receipt: order.receipt,
    });
  } catch (err) {
    console.error('Razorpay create-order error:', err);
    const status = err.statusCode === 401 ? 401 : 500;
    res.status(status).json({
      error: err.error?.description || err.message || 'Failed to create order',
    });
  }
}

/* ── Razorpay: verify signature ── */

function verifyPaymentHandler(req, res) {
  try {
    if (!razorpayKeySecret) {
      return res.status(503).json({ success: false, error: 'Razorpay is not configured' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature',
      });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(payload)
      .digest('hex');

    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(razorpay_signature), 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(400).json({
        success: false,
        error: 'Signature mismatch — payment not verified',
      });
    }

    res.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error('Razorpay verify error:', err.message);
    res.status(500).json({ success: false, error: err.message || 'Verification failed' });
  }
}

app.post('/api/create-order', createOrderHandler);
app.post('/api/checkout/razorpay/create-order', createOrderHandler);
app.post('/api/verify-payment', verifyPaymentHandler);
app.post('/api/checkout/razorpay/verify', verifyPaymentHandler);

/* ── Stripe (optional) ── */

app.post('/api/checkout/stripe/create-intent', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: 'Stripe is not configured. Add keys to payment-server/.env' });
    }

    const { productType, productId, category, email } = req.body || {};
    const product = resolveProduct(productType, productId, category);
    if (!product) {
      return res.status(400).json({ error: 'Unknown product' });
    }

    const intent = await stripe.paymentIntents.create({
      amount: product.amountCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        product_type: product.type,
        product_id: product.id,
        product_name: product.name,
        category: product.category || '',
      },
      receipt_email: email || undefined,
      description: `XFreeze - ${product.name}`,
    });

    res.json({
      clientSecret: intent.client_secret,
      amount: product.price,
      productName: product.name,
    });
  } catch (err) {
    console.error('Stripe create-intent error:', err.message);
    res.status(500).json({ error: err.message || 'Payment failed' });
  }
});

/* ── PayPal (optional) ── */

app.post('/api/checkout/paypal/create-order', async (req, res) => {
  try {
    if (!paypalClientId || !paypalClientSecret) {
      return res.status(503).json({ error: 'PayPal is not configured. Add keys to payment-server/.env' });
    }

    const { productType, productId, category } = req.body || {};
    const product = resolveProduct(productType, productId, category);
    if (!product) {
      return res.status(400).json({ error: 'Unknown product' });
    }

    const token = await getPayPalAccessToken();
    const orderRes = await fetch(`${paypalBase}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: `${product.type}_${product.id}`,
            description: `XFreeze - ${product.name}`,
            amount: {
              currency_code: 'USD',
              value: product.price.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'XFreeze',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${SITE_URL}/checkout-success.html?provider=paypal`,
          cancel_url: `${SITE_URL}/checkout-cancel.html`,
        },
      }),
    });

    const order = await orderRes.json();
    if (!orderRes.ok) {
      throw new Error(order.message || JSON.stringify(order));
    }

    const approve = (order.links || []).find((l) => l.rel === 'approve');
    res.json({
      orderId: order.id,
      approvalUrl: approve ? approve.href : null,
      amount: product.price,
      productName: product.name,
    });
  } catch (err) {
    console.error('PayPal create-order error:', err.message);
    res.status(500).json({ error: err.message || 'PayPal order failed' });
  }
});

app.post('/api/checkout/paypal/capture', async (req, res) => {
  try {
    if (!paypalClientId || !paypalClientSecret) {
      return res.status(503).json({ error: 'PayPal is not configured' });
    }

    const { orderId } = req.body || {};
    if (!orderId) {
      return res.status(400).json({ error: 'orderId required' });
    }

    const token = await getPayPalAccessToken();
    const captureRes = await fetch(`${paypalBase}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = await captureRes.json();
    if (!captureRes.ok) {
      throw new Error(capture.message || JSON.stringify(capture));
    }

    res.json({ status: capture.status, capture });
  } catch (err) {
    console.error('PayPal capture error:', err.message);
    res.status(500).json({ error: err.message || 'PayPal capture failed' });
  }
});

app.listen(PORT, () => {
  console.log(`XFreeze payment server → http://localhost:${PORT}`);
  console.log(
    `Razorpay: ${hasRazorpay() ? 'yes' : 'no'} | Stripe: ${stripe ? 'yes' : 'no'} | PayPal: ${
      paypalClientId ? 'yes' : 'no'
    }`
  );
  if (!isConfigured()) {
    console.log('No payment providers configured — copy .env.example to .env');
  }
});
