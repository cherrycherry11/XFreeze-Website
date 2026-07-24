/**
 * Usage limits — display cache + server-authoritative daily quotas.
 *
 * SECURITY: Only /api/content/* and /api/usage/consume increment counters
 * via service role. localStorage is display-only and cannot unlock content.
 *
 * Free:  3 templates · 5 skills · 5 prompts / UTC day
 * Pro:  20 templates · 30 skills · 30 prompts / UTC day
 */
(function (global) {
  'use strict';

  var SUB_KEY = 'xf_subscription';
  var USAGE_KEY = 'xf_usage_server_v1';
  var META_KEY = 'xf_subscription';

  var FREE_LIMITS = {
    prompts: 5,
    templates: 3,
    skills: 5,
  };

  var PRO_LIMITS = {
    prompts: 30,
    templates: 20,
    skills: 30,
  };

  var serverCache = null;

  function apiBase() {
    try {
      if (global.XFreezeEntitlement && global.XFreezeEntitlement.apiBase) {
        return global.XFreezeEntitlement.apiBase();
      }
      if (global.XFreezeCheckout && global.XFreezeCheckout.getApiBase) {
        return global.XFreezeCheckout.getApiBase();
      }
      var h = (global.location && global.location.hostname) || '';
      if (h && h !== 'localhost' && h !== '127.0.0.1') {
        return global.location.origin;
      }
    } catch (e) {}
    return global.location && global.location.origin
      ? global.location.origin
      : 'http://localhost:4242';
  }

  function getAccessToken() {
    try {
      if (global.XFreezeEntitlement && global.XFreezeEntitlement.getAccessToken) {
        return global.XFreezeEntitlement.getAccessToken() || '';
      }
      if (global.XFreezeAuth && global.XFreezeAuth.getSession) {
        var s = global.XFreezeAuth.getSession();
        return (s && s.access_token) || '';
      }
    } catch (e) {}
    return '';
  }

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function utcDayKey() {
    var d = new Date();
    return (
      d.getUTCFullYear() +
      '-' +
      String(d.getUTCMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getUTCDate()).padStart(2, '0')
    );
  }

  function emptyUsage() {
    return {
      day: utcDayKey(),
      prompts: 0,
      templates: 0,
      skills: 0,
      source: 'local',
      lastActionAt: null,
    };
  }

  function applyServerSnapshot(snap) {
    if (!snap) return getUsage();
    var used = snap.used || {};
    var data = {
      day: snap.day || utcDayKey(),
      prompts: Number(used.prompts) || 0,
      templates: Number(used.templates) || 0,
      skills: Number(used.skills) || 0,
      limits: snap.limits || null,
      isPro: Boolean(snap.isPro),
      remaining: snap.remaining || null,
      source: 'server',
      lastActionAt: new Date().toISOString(),
    };
    serverCache = data;
    writeJson(USAGE_KEY, data);
    try {
      global.dispatchEvent(
        new CustomEvent('xf-usage-change', { detail: data })
      );
    } catch (e) {}
    return data;
  }

  function getUsage() {
    if (serverCache && serverCache.day === utcDayKey()) {
      return serverCache;
    }
    var data = readJson(USAGE_KEY, null);
    if (!data || data.day !== utcDayKey()) {
      data = emptyUsage();
      writeJson(USAGE_KEY, data);
    }
    return data;
  }

  function refreshFromServer() {
    var token = getAccessToken();
    if (!token) {
      serverCache = null;
      return Promise.resolve(getUsage());
    }
    return fetch(apiBase() + '/api/me/usage', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { res: res, data: data };
        });
      })
      .then(function (pair) {
        if (!pair.res.ok) return getUsage();
        return applyServerSnapshot(pair.data);
      })
      .catch(function () {
        return getUsage();
      });
  }

  /**
   * Server consume — required before free template open.
   * Returns Promise<{ok, ...}>.
   */
  function consume(kind) {
    var token = getAccessToken();
    if (!token) {
      return Promise.resolve({
        ok: false,
        code: 'auth_required',
        error: 'Sign in required',
      });
    }
    return fetch(apiBase() + '/api/usage/consume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      },
      body: JSON.stringify({ kind: kind }),
      cache: 'no-store',
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { res: res, data: data };
        });
      })
      .then(function (pair) {
        if (pair.data && pair.data.snapshot) {
          applyServerSnapshot(pair.data.snapshot);
        } else if (pair.data && pair.data.ok) {
          refreshFromServer();
        }
        return pair.data || { ok: false, error: 'Unknown usage response' };
      })
      .catch(function (err) {
        return {
          ok: false,
          code: 'network',
          error: (err && err.message) || 'Usage request failed',
        };
      });
  }

  /* Local bump is display-only mirror; never authority */
  function bump(kind) {
    var data = getUsage();
    if (data[kind] == null) data[kind] = 0;
    data[kind] += 1;
    data.lastActionAt = new Date().toISOString();
    writeJson(USAGE_KEY, data);
    serverCache = data;
    return data;
  }

  function getSubscription() {
    if (
      global.XFreezeEntitlement &&
      typeof global.XFreezeEntitlement.getSubscription === 'function'
    ) {
      var serverSub = global.XFreezeEntitlement.getSubscription();
      if (serverSub) return serverSub;
    }
    return readJson(SUB_KEY, null);
  }

  function setSubscription(sub) {
    if (!sub) {
      try {
        localStorage.removeItem(SUB_KEY);
      } catch (e) {}
      return null;
    }
    writeJson(SUB_KEY, sub);
    return sub;
  }

  function isPro(sub) {
    if (
      global.XFreezeEntitlement &&
      typeof global.XFreezeEntitlement.isPro === 'function'
    ) {
      if (global.XFreezeEntitlement.isPro()) return true;
      if (sub && sub.source === 'server') {
        /* fall through */
      } else if (!sub || sub.source !== 'server') {
        var snap =
          global.XFreezeEntitlement.getSnapshot &&
          global.XFreezeEntitlement.getSnapshot();
        if (snap && snap.at) {
          return Boolean(snap.isPro);
        }
        return false;
      }
    }

    if (!sub || !sub.status) return false;
    if (sub.status !== 'active') return false;
    if (sub.source !== 'server') return false;
    if (sub.expiresAt) {
      try {
        if (new Date(sub.expiresAt).getTime() < Date.now()) return false;
      } catch (e) {}
    }
    return true;
  }

  function getLimits(sub) {
    if (serverCache && serverCache.limits && serverCache.day === utcDayKey()) {
      return serverCache.limits;
    }
    return isPro(sub) ? PRO_LIMITS : FREE_LIMITS;
  }

  function remaining(kind, sub) {
    var limits = getLimits(sub);
    var usage = getUsage();
    var lim = limits[kind] != null ? limits[kind] : 0;
    var used = usage[kind] != null ? usage[kind] : 0;
    return Math.max(lim - used, 0);
  }

  function canConsume(kind, sub) {
    return remaining(kind, sub) > 0;
  }

  function formatLimit(n) {
    if (n >= 99999) return '∞';
    return String(n);
  }

  function buildFromProduct(product, paymentId, orderId) {
    if (!product || product.type !== 'subscription') return null;
    return {
      planId: product.id,
      name: product.name,
      price: product.price,
      interval: product.interval || 'month',
      status: 'pending',
      startedAt: null,
      expiresAt: null,
      paymentId: paymentId || null,
      orderId: orderId || null,
      source: 'client-pending',
    };
  }

  function fromUserMetadata(user) {
    if (!user || !user.user_metadata) return null;
    var meta = user.user_metadata;
    var raw = meta[META_KEY] || meta.subscription || null;
    if (!raw || typeof raw !== 'object') return null;
    return {
      planId: raw.planId || raw.id || null,
      name: raw.name || 'Pro',
      price: raw.price != null ? raw.price : null,
      interval: raw.interval || 'month',
      status: raw.status || 'unknown',
      startedAt: raw.startedAt || null,
      expiresAt: raw.expiresAt || null,
      paymentId: raw.paymentId || null,
      orderId: raw.orderId || null,
      source: 'user_metadata_untrusted',
    };
  }

  function getLastPaymentId() {
    try {
      return localStorage.getItem('xf_last_payment_id') || '';
    } catch (e) {
      return '';
    }
  }

  function recoverFromLastPayment() {
    return null;
  }

  function resolveSubscription(user) {
    if (
      global.XFreezeEntitlement &&
      global.XFreezeEntitlement.getSubscription
    ) {
      var s = global.XFreezeEntitlement.getSubscription();
      if (s) return s;
    }
    var local = getSubscription();
    if (local && local.source === 'server') return local;
    return local || fromUserMetadata(user) || null;
  }

  function activateSubscription(sub) {
    if (!sub) return Promise.resolve(null);
    if (sub.source !== 'server') {
      console.warn('[xf-usage] refusing to activate non-server subscription');
      return Promise.resolve(null);
    }
    setSubscription(sub);
    try {
      if (sub.paymentId) {
        localStorage.setItem('xf_last_payment_id', sub.paymentId);
      }
    } catch (e) {}
    return Promise.resolve(sub);
  }

  /* Boot: hydrate server usage after auth when possible */
  function boot() {
    refreshFromServer();
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'complete') {
      setTimeout(boot, 400);
    } else {
      global.addEventListener('load', function () {
        setTimeout(boot, 400);
      });
    }
  }
  global.addEventListener('xf-entitlement-change', function () {
    refreshFromServer();
  });

  global.XFreezeUsage = {
    getUsage: getUsage,
    bump: bump,
    consume: consume,
    refreshFromServer: refreshFromServer,
    trackPrompt: function () {
      return consume('prompts');
    },
    trackTemplate: function () {
      return consume('templates');
    },
    trackSkill: function () {
      return consume('skills');
    },
    getSubscription: getSubscription,
    setSubscription: setSubscription,
    isPro: isPro,
    getLimits: getLimits,
    remaining: remaining,
    canConsume: canConsume,
    formatLimit: formatLimit,
    buildFromProduct: buildFromProduct,
    fromUserMetadata: fromUserMetadata,
    resolveSubscription: resolveSubscription,
    activateSubscription: activateSubscription,
    recoverFromLastPayment: recoverFromLastPayment,
    getLastPaymentId: getLastPaymentId,
    FREE_LIMITS: FREE_LIMITS,
    PRO_LIMITS: PRO_LIMITS,
    META_KEY: META_KEY,
  };
})(window);
