/**
 * Server-owned Pro entitlement client.
 * localStorage is a display cache only — never grants access.
 * Premium content APIs re-check entitlement with the user's JWT.
 */
(function (global) {
  'use strict';

  var CACHE_KEY = 'xf_entitlement_server_v1';
  var cache = { isPro: false, subscription: null, at: 0, userId: null };
  var inflight = null;

  function apiBase() {
    try {
      var h = (global.location && global.location.hostname) || '';
      if (h && h !== 'localhost' && h !== '127.0.0.1') {
        return global.location.origin;
      }
    } catch (e) {}
    if (global.XFreezeCheckout && global.XFreezeCheckout.getApiBase) {
      try {
        return global.XFreezeCheckout.getApiBase();
      } catch (e2) {}
    }
    return 'http://localhost:4242';
  }

  function getAccessToken() {
    try {
      if (global.XFreezeAuth && typeof global.XFreezeAuth.getSession === 'function') {
        var s = global.XFreezeAuth.getSession();
        if (s && s.access_token) return s.access_token;
      }
    } catch (e) {}
    return '';
  }

  function readLocalCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function writeLocalCache(data) {
    cache = {
      isPro: Boolean(data && data.isPro),
      subscription: (data && data.subscription) || null,
      at: Date.now(),
      userId: (data && data.userId) || null,
    };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
    /* Mirror into usage cache for Account UI only — marked source:server */
    if (global.XFreezeUsage && global.XFreezeUsage.setSubscription) {
      if (cache.isPro && cache.subscription) {
        global.XFreezeUsage.setSubscription(
          Object.assign({}, cache.subscription, { source: 'server' })
        );
      }
    }
    try {
      global.dispatchEvent(
        new CustomEvent('xf-entitlement-change', { detail: cache })
      );
    } catch (e2) {}
    return cache;
  }

  function clear() {
    cache = { isPro: false, subscription: null, at: 0, userId: null };
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (e) {}
  }

  function hydrateFromLocal() {
    var local = readLocalCache();
    if (local && typeof local === 'object') {
      cache = {
        isPro: Boolean(local.isPro),
        subscription: local.subscription || null,
        at: local.at || 0,
        userId: local.userId || null,
      };
    }
    return cache;
  }

  /**
   * Sync snapshot for UI. Prefer server-verified cache.
   * Forging this does not unlock content APIs.
   */
  function isPro() {
    if (cache.at) return Boolean(cache.isPro);
    hydrateFromLocal();
    return Boolean(cache.isPro);
  }

  function getSubscription() {
    if (!cache.at) hydrateFromLocal();
    return cache.subscription;
  }

  function getSnapshot() {
    if (!cache.at) hydrateFromLocal();
    return {
      isPro: Boolean(cache.isPro),
      subscription: cache.subscription,
      at: cache.at,
      userId: cache.userId,
    };
  }

  /**
   * Fetch authoritative entitlement. Call after login and after payment.
   */
  function refresh(opts) {
    opts = opts || {};
    var token = opts.token || getAccessToken();
    if (!token) {
      clear();
      return Promise.resolve(getSnapshot());
    }

    if (inflight && !opts.force) return inflight;

    inflight = fetch(apiBase() + '/api/me/entitlement', {
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
        inflight = null;
        if (pair.res.status === 401) {
          clear();
          return getSnapshot();
        }
        if (!pair.res.ok) {
          /* Keep last cache on transient server errors */
          if (pair.data && pair.data.code === 'entitlement_store_missing') {
            console.warn('[xf-entitlement] server store not configured');
          }
          return getSnapshot();
        }
        writeLocalCache({
          isPro: Boolean(pair.data.isPro),
          subscription: pair.data.subscription || null,
          userId: pair.data.userId || null,
        });
        return getSnapshot();
      })
      .catch(function (err) {
        inflight = null;
        console.warn('[xf-entitlement] refresh failed', err);
        return getSnapshot();
      });

    return inflight;
  }

  /** Apply a server entitlement payload immediately (e.g. after manual grant) */
  function applyServerEntitlement(entitlement, userId) {
    if (!entitlement) return getSnapshot();
    return writeLocalCache({
      isPro: Boolean(entitlement.isPro),
      subscription: entitlement.subscription || null,
      userId: userId || null,
    });
  }

  /** Authenticated fetch helper for gated content */
  function authFetch(path) {
    var token = getAccessToken();
    var headers = { Accept: 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    return fetch(apiBase() + path, {
      method: 'GET',
      headers: headers,
      cache: 'no-store',
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          var err = new Error((data && data.error) || 'Request failed');
          err.status = res.status;
          err.code = data && data.code;
          err.data = data;
          throw err;
        }
        return data;
      });
    });
  }

  function fetchSkillPack(packId) {
    return authFetch(
      '/api/content/skill-pack?id=' + encodeURIComponent(packId)
    );
  }

  function fetchPromptText(promptId) {
    return authFetch(
      '/api/content/prompt?id=' + encodeURIComponent(promptId)
    );
  }

  function fetchTemplateLink(code) {
    return authFetch(
      '/api/content/template?code=' + encodeURIComponent(code)
    );
  }

  hydrateFromLocal();

  global.XFreezeEntitlement = {
    isPro: isPro,
    getSubscription: getSubscription,
    getSnapshot: getSnapshot,
    refresh: refresh,
    clear: clear,
    applyServerEntitlement: applyServerEntitlement,
    authFetch: authFetch,
    fetchSkillPack: fetchSkillPack,
    fetchPromptText: fetchPromptText,
    fetchTemplateLink: fetchTemplateLink,
    getAccessToken: getAccessToken,
    apiBase: apiBase,
  };
})(window);
