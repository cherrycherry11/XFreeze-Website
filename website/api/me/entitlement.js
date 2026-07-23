const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('../_lib/supabase');
const {
  getEntitlementForUser,
  publicEntitlement,
} = require('../_lib/entitlements');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        isPro: false,
        subscription: null,
        error: 'Not signed in',
        code: 'auth_required',
      });
    }

    if (!hasServiceRole()) {
      return json(res, 503, {
        isPro: false,
        subscription: null,
        error: 'Entitlement store not configured',
        code: 'entitlement_store_missing',
      });
    }

    const row = await getEntitlementForUser(user.id);
    const out = publicEntitlement(row);
    return json(res, 200, {
      ...out,
      userId: user.id,
      serverTime: new Date().toISOString(),
    });
  } catch (err) {
    console.error('me/entitlement error:', err);
    return json(res, 500, {
      isPro: false,
      subscription: null,
      error: err.message || 'Failed to load entitlement',
    });
  }
};
