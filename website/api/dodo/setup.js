const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const {
  hasDodo,
  dodoEnv,
  dodoBaseUrl,
  dodoFetch,
  ensureDefaultProducts,
  dodoApiKey,
} = require('../_lib/dodo');

/**
 * One-time live bootstrap: products + webhook.
 * GET /api/dodo/setup?token=DODO_SETUP_TOKEN
 * Remove DODO_SETUP_TOKEN from Vercel after use.
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token') || '';
    const expected = (process.env.DODO_SETUP_TOKEN || '').trim();
    if (!expected || token !== expected) {
      return json(res, 403, { error: 'Forbidden' });
    }

    if (!hasDodo()) {
      return json(res, 503, {
        error: 'No Dodo API key on this deployment',
        dodoEnv: dodoEnv(),
        keyPresent: false,
      });
    }

    const keyLen = dodoApiKey().length;
    const env = dodoEnv();
    const base = dodoBaseUrl();

    /* Probe API */
    let products = [];
    let probeError = null;
    try {
      const list = await dodoFetch('/products?page_size=50');
      products = (list && list.items) || [];
    } catch (e) {
      probeError = e.message || String(e);
    }

    let catalog = null;
    let catalogError = null;
    try {
      catalog = await ensureDefaultProducts();
    } catch (e) {
      catalogError = e.message || String(e);
    }

    /* Webhook */
    const webhookUrl = 'https://xfreeze.com/api/webhooks/dodo';
    let webhook = null;
    let webhookSecret = null;
    let webhookError = null;
    try {
      const existing = await dodoFetch('/webhooks');
      const hooks = (existing && existing.data) || [];
      webhook = hooks.find((h) => h.url === webhookUrl) || null;
      if (!webhook) {
        webhook = await dodoFetch('/webhooks', {
          method: 'POST',
          body: {
            url: webhookUrl,
            description: 'X Freeze production entitlements',
            filter_types: [
              'payment.succeeded',
              'payment.failed',
              'subscription.active',
              'subscription.renewed',
              'subscription.updated',
              'subscription.cancelled',
              'subscription.expired',
              'subscription.on_hold',
              'subscription.plan_changed',
            ],
          },
        });
      } else if (webhook.id) {
        try {
          await dodoFetch(`/webhooks/${webhook.id}`, {
            method: 'PATCH',
            body: {
              filter_types: [
                'payment.succeeded',
                'payment.failed',
                'subscription.active',
                'subscription.renewed',
                'subscription.updated',
                'subscription.cancelled',
                'subscription.expired',
                'subscription.on_hold',
                'subscription.plan_changed',
              ],
            },
          });
        } catch (e) {
          /* non-fatal */
        }
      }
      if (webhook && webhook.id) {
        try {
          const sec = await dodoFetch(`/webhooks/${webhook.id}/secret`);
          webhookSecret = (sec && sec.secret) || null;
        } catch (e) {
          webhookError = 'Webhook exists but secret could not be read';
        }
      }
    } catch (e) {
      webhookError = e.message || String(e);
    }

    return json(res, 200, {
      ok: !probeError && !catalogError,
      dodoEnv: env,
      baseUrl: base,
      keyPresent: true,
      keyLength: keyLen,
      probeError,
      productsFound: products.map((p) => ({
        id: p.product_id,
        name: p.name,
        price: p.price,
      })),
      catalog,
      catalogError,
      webhook: webhook
        ? { id: webhook.id, url: webhook.url, disabled: webhook.disabled }
        : null,
      webhookSecret,
      webhookError,
      next: {
        setVercel: [
          catalog && catalog.monthlyId
            ? `DODO_PRODUCT_PRO_MONTHLY=${catalog.monthlyId}`
            : null,
          catalog && catalog.yearlyId
            ? `DODO_PRODUCT_PRO_YEARLY=${catalog.yearlyId}`
            : null,
          webhookSecret
            ? `DODO_PAYMENTS_WEBHOOK_KEY=${webhookSecret}`
            : null,
        ].filter(Boolean),
        removeAfter: ['DODO_SETUP_TOKEN'],
        health: 'https://xfreeze.com/api/health',
      },
    });
  } catch (err) {
    console.error('dodo setup error:', err);
    return json(res, 500, { error: err.message || 'Setup failed' });
  }
};
