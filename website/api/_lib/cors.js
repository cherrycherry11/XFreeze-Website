/**
 * Restrict API access to known site origins (no wildcard).
 */
function allowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const defaults = [
    'https://xfreeze.com',
    'https://www.xfreeze.com',
    'http://localhost:8080',
    'http://localhost:8765',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8765',
  ];
  if (process.env.SITE_URL) {
    defaults.push(String(process.env.SITE_URL).replace(/\/$/, ''));
  }
  if (process.env.VERCEL_URL) {
    defaults.push(`https://${process.env.VERCEL_URL}`);
  }
  return Array.from(new Set([...defaults, ...fromEnv]));
}

function resolveOrigin(req) {
  const origin = req.headers.origin || req.headers.Origin || '';
  if (!origin) return null;
  const allowed = allowedOrigins();
  if (allowed.includes(origin)) return origin;
  /* Vercel preview deployments */
  try {
    const u = new URL(origin);
    if (u.hostname.endsWith('.vercel.app')) return origin;
  } catch (e) {}
  return null;
}

function applyCors(req, res, methods) {
  const origin = resolveOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', methods || 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.setHeader('Access-Control-Max-Age', '86400');
  return origin;
}

function handlePreflight(req, res, methods) {
  applyCors(req, res, methods);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

module.exports = { allowedOrigins, resolveOrigin, applyCors, handlePreflight };
