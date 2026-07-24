const fs = require('fs');
const path = require('path');
const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest } = require('../_lib/supabase');
const { userIsPro } = require('../_lib/entitlements');
const { consumeUsage } = require('../_lib/usage');

let cache = null;

function loadPrivateTemplates() {
  if (cache) return cache;
  const p = path.join(__dirname, '..', '_private', 'premium-templates.json');
  if (!fs.existsSync(p)) {
    cache = {};
    return cache;
  }
  cache = JSON.parse(fs.readFileSync(p, 'utf8'));
  return cache;
}

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const code = String(
      url.searchParams.get('code') || url.searchParams.get('id') || ''
    ).trim();
    if (!code) {
      return json(res, 400, { error: 'Missing template code' });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        error: 'Sign in required',
        code: 'auth_required',
      });
    }
    if (!(await userIsPro(user.id))) {
      return json(res, 403, {
        error: 'Pro plan required',
        code: 'pro_required',
      });
    }

    const map = loadPrivateTemplates();
    const entry = map[code];
    if (!entry || !entry.link) {
      return json(res, 404, { error: 'Template not found' });
    }

    const usage = await consumeUsage(user.id, 'templates');
    if (!usage.ok) {
      return json(res, usage.code === 'limit_exceeded' ? 429 : 400, {
        error: usage.error || 'Usage limit reached',
        code: usage.code || 'limit_exceeded',
        kind: 'templates',
        used: usage.used,
        limit: usage.limit,
        remaining: usage.remaining,
        isPro: usage.isPro,
        day: usage.day,
      });
    }

    res.setHeader('Cache-Control', 'private, no-store');
    return json(res, 200, {
      code,
      link: entry.link,
      name: entry.name || null,
      usage,
    });
  } catch (err) {
    console.error('content/template error:', err);
    return json(res, 500, { error: err.message || 'Failed to load template' });
  }
};
