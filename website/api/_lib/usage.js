/**
 * Server-owned daily usage limits.
 * Never trust client counters — only service-role DB writes count.
 */
const { rest, hasServiceRole } = require('./supabase');
const { userIsPro } = require('./entitlements');

const FREE_LIMITS = {
  templates: 3,
  skills: 5,
  prompts: 5,
};

const PRO_LIMITS = {
  templates: 20,
  skills: 30,
  prompts: 30,
};

function utcDayKey(d) {
  const x = d || new Date();
  const y = x.getUTCFullYear();
  const m = String(x.getUTCMonth() + 1).padStart(2, '0');
  const day = String(x.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function normalizeKind(kind) {
  const k = String(kind || '')
    .toLowerCase()
    .trim();
  if (k === 'template' || k === 'templates') return 'templates';
  if (k === 'skill' || k === 'skills') return 'skills';
  if (k === 'prompt' || k === 'prompts') return 'prompts';
  return null;
}

async function getLimitsForUser(userId) {
  const pro = await userIsPro(userId);
  return {
    isPro: pro,
    limits: pro ? { ...PRO_LIMITS } : { ...FREE_LIMITS },
  };
}

async function getUsageRow(userId, day) {
  if (!hasServiceRole() || !userId) return null;
  const d = day || utcDayKey();
  const rows = await rest(
    `usage_daily?user_id=eq.${encodeURIComponent(userId)}&day=eq.${encodeURIComponent(d)}&select=*&limit=1`
  );
  if (!Array.isArray(rows) || !rows.length) {
    return {
      user_id: userId,
      day: d,
      templates: 0,
      skills: 0,
      prompts: 0,
    };
  }
  return rows[0];
}

async function getUsageSnapshot(userId) {
  const { isPro, limits } = await getLimitsForUser(userId);
  const day = utcDayKey();
  const row = await getUsageRow(userId, day);
  const used = {
    templates: Number(row.templates) || 0,
    skills: Number(row.skills) || 0,
    prompts: Number(row.prompts) || 0,
  };
  return {
    day,
    isPro,
    used,
    limits,
    remaining: {
      templates: Math.max(limits.templates - used.templates, 0),
      skills: Math.max(limits.skills - used.skills, 0),
      prompts: Math.max(limits.prompts - used.prompts, 0),
    },
  };
}

/**
 * Atomically consume 1 unit of kind for user.
 * Prefer Supabase RPC xf_consume_usage; fallback optimistic lock.
 */
async function consumeUsage(userId, kind) {
  if (!hasServiceRole()) {
    return {
      ok: false,
      code: 'usage_store_missing',
      error: 'Usage store not configured',
    };
  }
  if (!userId) {
    return { ok: false, code: 'auth_required', error: 'Sign in required' };
  }

  const k = normalizeKind(kind);
  if (!k) {
    return { ok: false, code: 'invalid_kind', error: 'Invalid usage kind' };
  }

  const { isPro, limits } = await getLimitsForUser(userId);
  const limit = limits[k];

  /* Prefer atomic RPC */
  try {
    const rpc = await rest('rpc/xf_consume_usage', {
      method: 'POST',
      body: {
        p_user_id: userId,
        p_kind: k,
        p_limit: limit,
      },
    });
    if (rpc && typeof rpc === 'object' && rpc.ok === false) {
      return {
        ok: false,
        code: rpc.code || 'limit_exceeded',
        kind: k,
        used: rpc.used != null ? Number(rpc.used) : null,
        limit,
        remaining: 0,
        isPro,
        day: rpc.day || utcDayKey(),
        error:
          rpc.code === 'limit_exceeded'
            ? `Daily ${k} limit reached (${limit}/${limit}). ${
                isPro ? 'Resets at UTC midnight.' : 'Upgrade to Pro for higher limits.'
              }`
            : rpc.error || 'Usage check failed',
      };
    }
    if (rpc && typeof rpc === 'object' && rpc.ok === true) {
      return {
        ok: true,
        kind: k,
        used: Number(rpc.used),
        limit,
        remaining:
          rpc.remaining != null
            ? Number(rpc.remaining)
            : Math.max(limit - Number(rpc.used), 0),
        isPro,
        day: rpc.day || utcDayKey(),
      };
    }
  } catch (rpcErr) {
    /* Function may not exist yet — fall through */
    console.warn(
      'xf_consume_usage RPC failed, using fallback',
      rpcErr && rpcErr.message
    );
  }

  /* Fallback: optimistic lock (weaker under concurrency) */
  const day = utcDayKey();
  let row = await getUsageRow(userId, day);
  const current = Number(row[k]) || 0;
  if (current >= limit) {
    return {
      ok: false,
      code: 'limit_exceeded',
      kind: k,
      used: current,
      limit,
      remaining: 0,
      isPro,
      day,
      error: `Daily ${k} limit reached (${current}/${limit}). ${
        isPro ? 'Resets at UTC midnight.' : 'Upgrade to Pro for higher limits.'
      }`,
    };
  }

  try {
    await rest(
      `usage_daily?on_conflict=user_id,day`,
      {
        method: 'POST',
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: {
          user_id: userId,
          day,
          templates: Number(row.templates) || 0,
          skills: Number(row.skills) || 0,
          prompts: Number(row.prompts) || 0,
          updated_at: new Date().toISOString(),
        },
      }
    );
  } catch (e) {
    /* ignore create race */
  }

  row = await getUsageRow(userId, day);
  const before = Number(row[k]) || 0;
  if (before >= limit) {
    return {
      ok: false,
      code: 'limit_exceeded',
      kind: k,
      used: before,
      limit,
      remaining: 0,
      isPro,
      day,
      error: `Daily ${k} limit reached (${before}/${limit}).`,
    };
  }

  const next = before + 1;
  const patchBody = {
    [k]: next,
    updated_at: new Date().toISOString(),
  };
  /* Optimistic: only update if counter still equals `before` */
  const filter =
    `usage_daily?user_id=eq.${encodeURIComponent(userId)}` +
    `&day=eq.${encodeURIComponent(day)}` +
    `&${k}=eq.${before}`;

  const updated = await rest(filter, {
    method: 'PATCH',
    prefer: 'return=representation',
    body: patchBody,
  });

  if (!Array.isArray(updated) || !updated.length) {
    /* Concurrent bump — re-read */
    const again = await getUsageRow(userId, day);
    const used = Number(again[k]) || 0;
    if (used >= limit) {
      return {
        ok: false,
        code: 'limit_exceeded',
        kind: k,
        used,
        limit,
        remaining: 0,
        isPro,
        day,
        error: `Daily ${k} limit reached (${used}/${limit}).`,
      };
    }
    return {
      ok: false,
      code: 'conflict',
      error: 'Usage update conflict — retry',
      kind: k,
      used,
      limit,
      isPro,
      day,
    };
  }

  return {
    ok: true,
    kind: k,
    used: next,
    limit,
    remaining: Math.max(limit - next, 0),
    isPro,
    day,
  };
}

module.exports = {
  FREE_LIMITS,
  PRO_LIMITS,
  utcDayKey,
  normalizeKind,
  getLimitsForUser,
  getUsageSnapshot,
  consumeUsage,
};
