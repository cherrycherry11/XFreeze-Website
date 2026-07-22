const fs = require('fs');
const path = require('path');
const { json } = require('../_lib/razorpay-client');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest } = require('../_lib/supabase');
const { userIsPro } = require('../_lib/entitlements');

let cache = null;

function loadPrivatePrompts() {
  if (cache) return cache;
  const p = path.join(__dirname, '..', '_private', 'premium-prompts.json');
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
    const id = String(url.searchParams.get('id') || '').trim();
    if (!id) {
      return json(res, 400, { error: 'Missing prompt id' });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, { error: 'Sign in required', code: 'auth_required' });
    }
    if (!(await userIsPro(user.id))) {
      return json(res, 403, { error: 'Pro plan required', code: 'pro_required' });
    }

    const map = loadPrivatePrompts();
    const entry = map[id];
    if (!entry) {
      return json(res, 404, { error: 'Prompt not found' });
    }

    res.setHeader('Cache-Control', 'private, no-store');
    return json(res, 200, { id, text: entry.text, title: entry.title || null });
  } catch (err) {
    console.error('content/prompt error:', err);
    return json(res, 500, { error: err.message || 'Failed to load prompt' });
  }
};
