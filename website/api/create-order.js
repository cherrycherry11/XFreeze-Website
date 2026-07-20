const { resolveProduct } = require('./_lib/products');
const { getRazorpay, getKeys, hasRazorpay, json, readBody } = require('./_lib/razorpay-client');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
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

    if (body.productType && body.productId) {
      const product = resolveProduct(body.productType, body.productId, body.category);
      if (!product) {
        return json(res, 400, { error: 'Unknown product' });
      }
      amount = product.amountCents || Math.round(Number(product.price) * 100);
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
