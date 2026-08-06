const { json, readBody } = require('./_lib/http');
const { handlePreflight, applyCors } = require('./_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('./_lib/supabase');
const { SUBSCRIPTIONS } = require('./_lib/products');
const {
  hasDodo,
  productIdForPlan,
  dodoFetch,
  dodoEnv,
  ensureDefaultProducts,
} = require('./_lib/dodo');

/**
 * Create a Dodo checkout session.
 * POST { planId: 'pro-monthly' | 'pro-yearly' | 'studio-monthly' | 'studio-yearly', email?, returnUrl? }
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
        error:
          'Dodo test key missing. Set DODO_PAYMENTS_API_KEY or Dodo_test_payments_gateway in Vercel.',
        code: 'dodo_missing',
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
      return json(res, 400, {
        error:
          'Unknown plan. Use pro-monthly, pro-yearly, studio-monthly, or studio-yearly.',
      });
    }

    let productId = productIdForPlan(planId);
    if (!productId) {
      /* Create/patch catalog prices if product IDs are missing from env */
      const ensured = await ensureDefaultProducts();
      productId = (ensured.ids && ensured.ids[planId]) || '';
      if (planId === 'pro-yearly' && !productId) productId = ensured.yearlyId;
      if (planId === 'pro-monthly' && !productId) productId = ensured.monthlyId;
      if (planId === 'studio-yearly' && !productId)
        productId = ensured.studioYearlyId;
      if (planId === 'studio-monthly' && !productId)
        productId = ensured.studioMonthlyId;
    }
    if (!productId) {
      return json(res, 400, {
        error: 'No Dodo product mapped for ' + planId,
        code: 'dodo_product_missing',
      });
    }

    const email =
      (body.email && String(body.email).trim()) || user.email || '';
    if (!email) {
      return json(res, 400, { error: 'Email is required for checkout' });
    }

    const site = (process.env.SITE_URL || 'https://freezestack.com').replace(
      /\/$/,
      ''
    );
    /* Land on a real site page so the success card overlays Freezestack UI */
    const returnUrl =
      body.returnUrl ||
      `${site}/pricing?provider=dodo&xf_pay=1&plan=${encodeURIComponent(planId)}`;

    /* Match Freezestack site theme so checkout is not stuck on Dodo dark default */
    const rawTheme = String(body.theme || body.colorScheme || '')
      .toLowerCase()
      .trim();
    const checkoutTheme =
      rawTheme === 'dark' || rawTheme === 'light' || rawTheme === 'system'
        ? rawTheme
        : 'system';

    /*
     * Default Dodo payment methods/currency - no method allow-list.
     * Theme follows the website (light / dark / system).
     */
    const session = await dodoFetch('/checkouts', {
      method: 'POST',
      body: {
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: {
          email,
          name:
            user.user_metadata?.full_name ||
            user.email ||
            'Freezestack customer',
        },
        customization: {
          theme: checkoutTheme,
        },
        return_url: returnUrl,
        metadata: {
          user_id: user.id,
          plan_id: planId,
          product_type: 'subscription',
          source: 'freezestack',
          site_theme: checkoutTheme,
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
