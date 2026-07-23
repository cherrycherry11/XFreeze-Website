const { json, readBody } = require('./_lib/razorpay-client');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const { SUBSCRIPTIONS } = require('./_lib/products');
const {
  hasDodo,
  productsReady,
  productIdForPlan,
  dodoFetch,
  dodoEnv,
} = require('./_lib/dodo');

/**
 * Create a Dodo Payments checkout session and return checkout_url.
 * POST { planId: 'pro-monthly' | 'pro-yearly', email?: string }
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    if (!hasDodo()) {
      return json(res, 503, {
        error: 'Dodo Payments is not configured. Set DODO_PAYMENTS_API_KEY.',
        code: 'dodo_missing',
      });
    }
    if (!productsReady()) {
      return json(res, 503, {
        error:
          'Dodo product IDs missing. Set DODO_PRODUCT_PRO_MONTHLY and DODO_PRODUCT_PRO_YEARLY.',
        code: 'dodo_products_missing',
      });
    }
    if (!hasServiceRole()) {
      return json(res, 503, {
        error: 'Entitlement store not configured (SUPABASE_SERVICE_ROLE_KEY).',
        code: 'entitlement_store_missing',
      });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        error: 'Sign in required before purchasing a plan',
        code: 'auth_required',
      });
    }

    const body = await readBody(req);
    const planId = body.planId || body.productId || '';
    const plan = SUBSCRIPTIONS[planId];
    if (!plan) {
      return json(res, 400, { error: 'Unknown plan. Use pro-monthly or pro-yearly.' });
    }

    const productId = productIdForPlan(planId);
    if (!productId) {
      return json(res, 400, { error: 'No Dodo product mapped for ' + planId });
    }

    const email =
      (body.email && String(body.email).trim()) ||
      user.email ||
      '';
    if (!email) {
      return json(res, 400, { error: 'Email is required for checkout' });
    }

    const site =
      (process.env.SITE_URL || 'https://xfreeze.com').replace(/\/$/, '');
    const returnUrl =
      body.returnUrl ||
      `${site}/checkout-success?provider=dodo&plan=${encodeURIComponent(planId)}`;

    /*
     * Local + international methods (whatever Dodo has enabled for this merchant
     * and the buyer’s country). Do not force USD-only or cards-only — that hid
     * UPI/wallets/local rails and blocked many domestic cards.
     *
     * - No allowed_payment_method_types → Dodo offers all eligible methods
     * - No fixed billing_currency → adaptive/local currency when available
     * - allow_currency_selection → customer can switch when Dodo supports it
     * - minimal_address → less form friction; tax still uses country (+ zip)
     * - credit/debit still work as the global card baseline
     * Recurring renewals are owned by Dodo subscription products.
     */
    const session = await dodoFetch('/checkouts', {
      method: 'POST',
      body: {
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: {
          email,
          name: user.user_metadata?.full_name || user.email || 'X Freeze customer',
        },
        minimal_address: true,
        show_saved_payment_methods: true,
        feature_flags: {
          allow_customer_editing_country: true,
          allow_customer_editing_street: true,
          allow_customer_editing_city: true,
          allow_customer_editing_state: true,
          allow_customer_editing_zipcode: true,
          allow_customer_editing_name: true,
          allow_customer_editing_email: true,
          allow_currency_selection: true,
          allow_discount_code: true,
          allow_phone_number_collection: true,
        },
        return_url: returnUrl,
        metadata: {
          user_id: user.id,
          plan_id: planId,
          product_type: 'subscription',
          source: 'xfreeze',
          checkout_mode: 'local_and_international',
        },
      },
    });

    return json(res, 200, {
      provider: 'dodo',
      environment: dodoEnv(),
      sessionId: session.session_id,
      checkoutUrl: session.checkout_url,
      planId,
      productId,
    });
  } catch (err) {
    console.error('create-checkout error:', err);
    return json(res, err.status || 500, {
      error: err.message || 'Failed to create Dodo checkout',
      details: err.data || null,
    });
  }
};
