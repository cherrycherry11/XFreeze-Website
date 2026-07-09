require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { resolveProduct } = require('./products');

const PORT = process.env.PORT || 4242;
const SITE_URL = (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripePublishable = process.env.STRIPE_PUBLISHABLE_KEY || '';
const paypalClientId = process.env.PAYPAL_CLIENT_ID || '';
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
const paypalMode = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox';

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;
const paypalBase =
  paypalMode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

function isConfigured() {
  return Boolean(stripe && paypalClientId && paypalClientSecret);
}

function configPayload() {
  return {
    configured: isConfigured(),
    stripePublishableKey: stripePublishable || null,
    paypalClientId: paypalClientId || null,
    paypalMode,
    paymentApiUrl: `http://localhost:${PORT}`,
  };
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

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, configured: isConfigured() });
});

app.get('/api/config', (_req, res) => {
  res.json(configPayload());
});

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
          return_url: `${SITE_URL}/xfreeze-checkout-success.html?provider=paypal`,
          cancel_url: `${SITE_URL}/xfreeze-checkout-cancel.html`,
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
  console.log(`Configured: ${isConfigured() ? 'yes (Stripe + PayPal)' : 'no - copy .env.example to .env'}`);
});