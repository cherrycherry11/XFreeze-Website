const { json, readBody } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest, hasServiceRole } = require('../_lib/supabase');
const { consumeUsage, getUsageSnapshot } = require('../_lib/usage');

/**
 * POST /api/usage/consume
 * { kind: 'templates'|'skills'|'prompts', resourceId?: string }
 * Atomic server consume. Same resourceId again the same day does not re-count.
 */
module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'POST,OPTIONS')) return;
  applyCors(req, res, 'POST,OPTIONS');

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    if (!hasServiceRole()) {
      return json(res, 503, {
        ok: false,
        code: 'usage_store_missing',
        error: 'Usage store not configured',
      });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        ok: false,
        code: 'auth_required',
        error: 'Sign in required',
      });
    }

    const body = await readBody(req);
    const kind = body.kind || body.type || '';
    const resourceId = body.resourceId || body.resource_id || body.id || body.code || null;
    const result = await consumeUsage(user.id, kind, resourceId);

    if (!result.ok) {
      const status =
        result.code === 'limit_exceeded'
          ? 429
          : result.code === 'auth_required'
            ? 401
            : 400;
      return json(res, status, result);
    }

    const snap = await getUsageSnapshot(user.id);
    res.setHeader('Cache-Control', 'private, no-store');
    return json(res, 200, { ...result, snapshot: snap });
  } catch (err) {
    console.error('usage/consume error:', err);
    return json(res, 500, {
      ok: false,
      error: err.message || 'Failed to record usage',
    });
  }
};
