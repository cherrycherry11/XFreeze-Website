const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('../_lib/supabase');
const { getUsageSnapshot, FREE_LIMITS, PRO_LIMITS } = require('../_lib/usage');

/**
 * GET /api/me/usage — server daily usage for signed-in user.
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    if (!hasServiceRole()) {
      return json(res, 503, {
        error: 'Usage store not configured',
        code: 'usage_store_missing',
        limits: { free: FREE_LIMITS, pro: PRO_LIMITS },
      });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        error: 'Sign in required',
        code: 'auth_required',
        limits: { free: FREE_LIMITS, pro: PRO_LIMITS },
      });
    }

    const snap = await getUsageSnapshot(user.id);
    res.setHeader('Cache-Control', 'private, no-store');
    return json(res, 200, {
      ...snap,
      source: 'server',
    });
  } catch (err) {
    console.error('me/usage error:', err);
    return json(res, 500, {
      error: err.message || 'Failed to load usage',
    });
  }
};
