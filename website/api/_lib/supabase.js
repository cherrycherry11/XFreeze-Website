/**
 * Supabase helpers via REST (no SDK dependency).
 * - Anon key: validate user JWT
 * - Service role: write entitlements / payments (bypasses RLS)
 */

function supabaseUrl() {
  return (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).replace(/\/$/, '');
}

function anonKey() {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

function serviceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

function hasSupabase() {
  return Boolean(supabaseUrl() && (anonKey() || serviceRoleKey()));
}

function hasServiceRole() {
  return Boolean(supabaseUrl() && serviceRoleKey());
}

function extractBearer(req) {
  const h = req.headers.authorization || req.headers.Authorization || '';
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : '';
}

/**
 * Validate access token and return the Supabase user, or null.
 */
async function getUserFromRequest(req) {
  const token = extractBearer(req);
  if (!token) return null;
  const url = supabaseUrl();
  const key = anonKey() || serviceRoleKey();
  if (!url || !key) return null;

  const res = await fetch(`${url}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: key,
    },
  });
  if (!res.ok) return null;
  const user = await res.json();
  if (!user || !user.id) return null;
  return user;
}

async function rest(path, { method = 'GET', body, prefer } = {}) {
  const url = supabaseUrl();
  const key = serviceRoleKey();
  if (!url || !key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers.Prefer = prefer;

  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
  }
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error_description || data.error)) ||
      text ||
      res.statusText;
    const err = new Error(String(msg));
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

module.exports = {
  supabaseUrl,
  anonKey,
  serviceRoleKey,
  hasSupabase,
  hasServiceRole,
  extractBearer,
  getUserFromRequest,
  rest,
};
