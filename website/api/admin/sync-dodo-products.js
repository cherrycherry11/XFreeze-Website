/**
 * One-shot / ops endpoint: create/update Dodo subscription products
 * at catalog prices (Premium $49/$499, Premium Plus $109/$999).
 *
 * Auth: Authorization: Bearer <DODO_SYNC_SECRET>
 *       or x-dodo-sync-secret: <DODO_SYNC_SECRET>
 *
 * Set DODO_SYNC_SECRET in Vercel, call once, then set returned product
 * IDs as DODO_PRODUCT_* env vars. Optional: remove DODO_SYNC_SECRET after.
 */
const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const {
  hasDodo,
  dodoEnv,
  dodoBaseUrl,
  ensureDefaultProducts,
  productMap,
  PLAN_CATALOG,
  priceAmount,
  dodoFetch,
} = require('../_lib/dodo');

function authorized(req) {
  const secret = (process.env.DODO_SYNC_SECRET || '').trim();
  if (!secret) return false;
  const auth = String(req.headers.authorization || '');
  const bearer = auth.toLowerCase().startsWith('bearer ')
    ? auth.slice(7).trim()
    : '';
  const header = String(
    req.headers['x-dodo-sync-secret'] || req.headers['x-sync-secret'] || ''
  ).trim();
  return bearer === secret || header === secret;
}

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,POST,OPTIONS')) return;
  applyCors(req, res, 'GET,POST,OPTIONS');

  if (req.method !== 'GET' && req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!authorized(req)) {
    return json(res, 401, {
      error: 'Unauthorized. Set DODO_SYNC_SECRET and pass it as Bearer token.',
      code: 'sync_auth_required',
    });
  }

  try {
    if (!hasDodo()) {
      return json(res, 503, {
        error: 'DODO_PAYMENTS_API_KEY not configured',
        code: 'dodo_missing',
      });
    }

    const result = await ensureDefaultProducts();

    /* Re-fetch so amounts reflect PATCH */
    const list = await dodoFetch('/products?page_size=100');
    const items = (list && list.items) || [];
    const byId = Object.fromEntries(
      items.map((p) => [p.product_id || p.productId, p])
    );

    const map = productMap();
    const plans = {};
    const vercelEnv = {};
    for (const planId of Object.keys(PLAN_CATALOG)) {
      const cfg = PLAN_CATALOG[planId];
      const id = result.ids[planId] || '';
      const p = byId[id];
      const amount = priceAmount(p);
      plans[planId] = {
        productId: id,
        name: (p && p.name) || cfg.name,
        amountCents: amount,
        amountUsd: amount != null ? amount / 100 : null,
        targetCents: cfg.amountCents,
        ok: amount === cfg.amountCents,
        envConfigured: Boolean(map[planId]),
        envMatches: Boolean(map[planId] && map[planId] === id),
      };
      const envKey =
        planId === 'pro-monthly'
          ? 'DODO_PRODUCT_PRO_MONTHLY'
          : planId === 'pro-yearly'
            ? 'DODO_PRODUCT_PRO_YEARLY'
            : planId === 'studio-monthly'
              ? 'DODO_PRODUCT_STUDIO_MONTHLY'
              : 'DODO_PRODUCT_STUDIO_YEARLY';
      vercelEnv[envKey] = id;
    }

    return json(res, 200, {
      ok: true,
      environment: dodoEnv(),
      baseUrl: dodoBaseUrl(),
      created: result.created,
      priceFixed: result.priceFixed,
      plans,
      vercelEnv,
      note: 'Set missing DODO_PRODUCT_* values on Vercel from vercelEnv, then redeploy.',
    });
  } catch (err) {
    console.error('sync-dodo-products error:', err);
    return json(res, err.status || 500, {
      error: err.message || 'Dodo sync failed',
      details: err.data || null,
    });
  }
};
