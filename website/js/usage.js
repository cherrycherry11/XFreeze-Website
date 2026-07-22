/**
 * Client-side usage counters + subscription *display* cache.
 *
 * SECURITY: Pro access is decided by the server (XFreezeEntitlement / content APIs).
 * localStorage and user_metadata are NOT trusted for unlocking paid content.
 */
(function (global) {
  'use strict';

  var SUB_KEY = 'xf_subscription';
  var USAGE_KEY = 'xf_usage_v1';
  var META_KEY = 'xf_subscription';

  var FREE_LIMITS = {
    prompts: 50,
    templates: 30,
    skills: 40,
  };

  var PRO_LIMITS = {
    prompts: 99999,
    templates: 99999,
    skills: 99999,
  };

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

  function monthKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  }

  function getUsage() {
    var data = readJson(USAGE_KEY, null);
    var mk = monthKey();
    if (!data || data.month !== mk) {
      data = {
        month: mk,
        prompts: 0,
        templates: 0,
        skills: 0,
        lastActionAt: null,
      };
      writeJson(USAGE_KEY, data);
    }
    return data;
  }

  function bump(kind) {
    var data = getUsage();
    if (data[kind] == null) data[kind] = 0;
    data[kind] += 1;
    data.lastActionAt = new Date().toISOString();
    writeJson(USAGE_KEY, data);
    return data;
  }

  function getSubscription() {
    /* Prefer server-verified snapshot */
    if (global.XFreezeEntitlement && typeof global.XFreezeEntitlement.getSubscription === 'function') {
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

  /**
   * UI-only Pro check. Prefer server cache.
   * Client forgeries cannot unlock /api/content/* endpoints.
   */
  function isPro(sub) {
    if (global.XFreezeEntitlement && typeof global.XFreezeEntitlement.isPro === 'function') {
      if (global.XFreezeEntitlement.isPro()) return true;
      /* If entitlement module says free, ignore forged local sub unless source is server */
      if (sub && sub.source === 'server') {
        /* fall through to date check on server-shaped sub */
      } else if (!sub || sub.source !== 'server') {
        /* Server cache may not be loaded yet — still do not trust raw local Pro */
        var snap =
          global.XFreezeEntitlement.getSnapshot && global.XFreezeEntitlement.getSnapshot();
        if (snap && snap.at) {
          return Boolean(snap.isPro);
        }
        /* No server answer yet: deny Pro (fail closed) */
        return false;
      }
    }

    if (!sub || !sub.status) return false;
    if (sub.status !== 'active') return false;
    /* Only accept server-sourced or explicitly server-mirrored records */
    if (sub.source !== 'server') return false;
    if (sub.expiresAt) {
      try {
        if (new Date(sub.expiresAt).getTime() < Date.now()) return false;
      } catch (e) {}
    }
    return true;
  }

  function getLimits(sub) {
    return isPro(sub) ? PRO_LIMITS : FREE_LIMITS;
  }

  function formatLimit(n) {
    if (n >= 99999) return '∞';
    return String(n);
  }

  /** Build a *display* subscription shape from catalog (not a grant). */
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
    /* Metadata is user-writable — never treat as entitlement grant. Display only. */
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

  /** Disabled: self-grant from a pay_ id is a security hole. */
  function recoverFromLastPayment() {
    return null;
  }

  function resolveSubscription(user) {
    if (global.XFreezeEntitlement && global.XFreezeEntitlement.getSubscription) {
      var s = global.XFreezeEntitlement.getSubscription();
      if (s) return s;
    }
    var local = getSubscription();
    if (local && local.source === 'server') return local;
    return local || fromUserMetadata(user) || null;
  }

  /**
   * Cache a server-granted subscription for UI only.
   * Does NOT write user_metadata as authority.
   */
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

  global.XFreezeUsage = {
    getUsage: getUsage,
    bump: bump,
    trackPrompt: function () {
      return bump('prompts');
    },
    trackTemplate: function () {
      return bump('templates');
    },
    trackSkill: function () {
      return bump('skills');
    },
    getSubscription: getSubscription,
    setSubscription: setSubscription,
    isPro: isPro,
    getLimits: getLimits,
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
