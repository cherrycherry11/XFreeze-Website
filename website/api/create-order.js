const { resolveProduct, SUBSCRIPTIONS } = require('./_lib/products');
const { getRazorpay, getKeys, hasRazorpay, json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    if (!hasRazorpay()) {
      return json(res, 503, {
        error:
          'Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel project env.',
      });
    }

    const razorpay = getRazorpay();
    const { key_id } = getKeys();
    const body = await readBody(req);
    let amount;
    const currency = (body.currency || 'USD').toUpperCase();
    let receipt = body.receipt || '';
    let productMeta = null;
    let userId = null;

    if (body.productType && body.productId) {
      const product = resolveProduct(body.productType, body.productId, body.category);
      if (!product) {
        return json(res, 400, { error: 'Unknown product' });
      }
      amount = product.amountCents || Math.round(Number(product.price) * 100);
      receipt = receipt || `xf_${product.type}_${product.id}_${Date.now()}`.slice(0, 40);

      /* Subscriptions must bind to a signed-in user before payment. */
      if (product.type === 'subscription') {
        if (!SUBSCRIPTIONS[product.id]) {
          return json(res, 400, { error: 'Unknown subscription plan' });
        }
        const user = await getUserFromRequest(req);
        if (!user || !user.id) {
          return json(res, 401, {
            error: 'Sign in required before purchasing a plan',
            code: 'auth_required',
          });
        }
        if (!hasServiceRole()) {
          return json(res, 503, {
            error:
              'Entitlement store not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.',
            code: 'entitlement_store_missing',
          });
        }
        userId = user.id;
      }

      productMeta = {
        product_type: product.type,
        product_id: product.id,
        product_name: product.name,
        category: product.category || '',
        interval: product.interval || '',
        user_id: userId || '',
      };
    } else if (body.amount != null) {
      /* Custom tips only — never used to grant Pro. Cap abuse. */
      amount = Math.round(Number(body.amount));
      if (amount > 50000) {
        return json(res, 400, { error: 'Custom amount too large' });
      }
      receipt = receipt || `xf_custom_${Date.now()}`.slice(0, 40);
      productMeta = {
        product_type: 'custom',
        product_id: 'custom',
        product_name: body.description || 'Custom payment',
        category: '',
        user_id: '',
      };
    } else {
      return json(res, 400, {
        error: 'Provide productType+productId or amount (cents)',
      });
    }

    if (!Number.isFinite(amount) || amount < 100) {
      return json(res, 400, { error: 'Amount must be at least 100 cents ($1.00)' });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes: productMeta || {},
    });

    return json(res, 200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id,
      productName: productMeta ? productMeta.product_name : null,
      productType: productMeta ? productMeta.product_type : null,
      productId: productMeta ? productMeta.product_id : null,
      receipt: order.receipt,
    });
  } catch (err) {
    console.error('create-order error:', err);
    const status = err.statusCode === 401 ? 401 : 500;
    return json(res, status, {
      error: err.error?.description || err.message || 'Failed to create order',
    });
  }
};
