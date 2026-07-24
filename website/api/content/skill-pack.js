const fs = require('fs');
const path = require('path');
const { json } = require('../_lib/http');
const { handlePreflight, applyCors } = require('../_lib/cors');
const { getUserFromRequest } = require('../_lib/supabase');
const { userIsPro } = require('../_lib/entitlements');
const { consumeUsage } = require('../_lib/usage');

function safeId(id) {
  return String(id || '').replace(/[^a-zA-Z0-9._-]/g, '');
}

function isPremiumPackId(id) {
  return String(id || '').indexOf('premium-') === 0;
}

function packPath(id) {
  return path.join(__dirname, '..', '_private', 'skills-packs', id + '.json');
}

function publicPackPath(id) {
  return path.join(__dirname, '..', '..', 'data', 'skills-packs', id + '.json');
}

function readPack(id) {
  const premium = isPremiumPackId(id);
  const candidates = premium
    ? [packPath(id)]
    : [publicPackPath(id), packPath(id)];

  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch (e) {
      console.error('readPack failed', p, e.message);
    }
  }
  return null;
}

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res, 'GET,OPTIONS')) return;
  applyCors(req, res, 'GET,OPTIONS');

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const id = safeId(url.searchParams.get('id') || '');
    if (!id) {
      return json(res, 400, { error: 'Missing pack id' });
    }

    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return json(res, 401, {
        error: 'Sign in required to open skills',
        code: 'auth_required',
      });
    }

    if (isPremiumPackId(id)) {
      const pro = await userIsPro(user.id);
      if (!pro) {
        return json(res, 403, {
          error: 'Pro plan required',
          code: 'pro_required',
        });
      }
    }

    const pack = readPack(id);
    if (!pack) {
      return json(res, 404, { error: 'Pack not found' });
    }

    const usage = await consumeUsage(user.id, 'skills', id);
    if (!usage.ok) {
      return json(res, usage.code === 'limit_exceeded' ? 429 : 400, {
        error: usage.error || 'Daily limit reached for skills.',
        code: usage.code || 'limit_exceeded',
        kind: 'skills',
        used: usage.used,
        limit: usage.limit,
        remaining: usage.remaining,
        isPro: usage.isPro,
        day: usage.day,
      });
    }

    res.setHeader('Cache-Control', 'private, no-store');
    return json(res, 200, Object.assign({}, pack, { usage }));
  } catch (err) {
    console.error('content/skill-pack error:', err);
    return json(res, 500, { error: err.message || 'Failed to load pack' });
  }
};
