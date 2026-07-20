/**
 * Client-side usage + subscription store for Account dashboard.
 * localStorage is the fast cache; Supabase user_metadata is the durable source
 * so Pro sticks across browsers when the user is signed in.
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
    if (!sub || !sub.status) return false;
    if (sub.status !== 'active') return false;
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

  /** Build a subscription record from a catalog product + payment ids. */
  function buildFromProduct(product, paymentId, orderId) {
    if (!product || product.type !== 'subscription') return null;
    var started = new Date();
    var expires = new Date(started);
    if (product.interval === 'year') {
      expires.setFullYear(expires.getFullYear() + 1);
    } else {
      expires.setMonth(expires.getMonth() + 1);
    }
    return {
      planId: product.id,
      name: product.name,
      price: product.price,
      interval: product.interval || 'month',
      status: 'active',
      startedAt: started.toISOString(),
      expiresAt: expires.toISOString(),
      paymentId: paymentId || null,
      orderId: orderId || null,
    };
  }

  /** Read plan from Supabase user_metadata (durable). */
  function fromUserMetadata(user) {
    if (!user || !user.user_metadata) return null;
    var meta = user.user_metadata;
    var raw = meta[META_KEY] || meta.subscription || null;
    if (!raw) {
      /* Flat fallbacks if ever stored that way */
      if (meta.xf_plan_id || meta.plan_id) {
        raw = {
          planId: meta.xf_plan_id || meta.plan_id,
          name: meta.xf_plan_name || meta.plan_name || 'Pro',
          price: meta.xf_plan_price != null ? meta.xf_plan_price : meta.plan_price,
          interval: meta.xf_plan_interval || meta.plan_interval || 'month',
          status: meta.xf_plan_status || meta.plan_status || 'active',
          startedAt: meta.xf_plan_started_at || meta.plan_started_at || null,
          expiresAt: meta.xf_plan_expires_at || meta.plan_expires_at || null,
          paymentId: meta.xf_plan_payment_id || meta.plan_payment_id || null,
        };
      }
    }
    if (!raw || typeof raw !== 'object') return null;
    if (!raw.planId && !raw.status) return null;
    return {
      planId: raw.planId || raw.id || 'pro-monthly',
      name: raw.name || 'Pro',
      price: raw.price != null ? raw.price : null,
      interval: raw.interval || 'month',
      status: raw.status || 'active',
      startedAt: raw.startedAt || null,
      expiresAt: raw.expiresAt || null,
      paymentId: raw.paymentId || null,
      orderId: raw.orderId || null,
    };
  }

  function getLastPaymentId() {
    try {
      return localStorage.getItem('xf_last_payment_id') || '';
    } catch (e) {
      return '';
    }
  }

  function isRazorpayPaymentId(id) {
    return Boolean(id && String(id).indexOf('pay_') === 0);
  }

  /**
   * Rebuild a Pro Monthly sub from a known Razorpay payment id on this device.
   * Used when checkout wrote the payment id but never wrote xf_subscription.
   */
  function recoverFromLastPayment(opts) {
    opts = opts || {};
    var payId = opts.paymentId || getLastPaymentId();
    if (!isRazorpayPaymentId(payId)) return null;

    var planId = opts.planId || 'pro-monthly';
    var catalog =
      global.XFreezeProducts && global.XFreezeProducts.getSubscription
        ? global.XFreezeProducts.getSubscription(planId)
        : null;
    var name = (catalog && catalog.name) || (planId === 'pro-yearly' ? 'Pro Yearly' : 'Pro Monthly');
    var price = catalog && catalog.price != null ? catalog.price : planId === 'pro-yearly' ? 9 : 1;
    var interval = (catalog && catalog.interval) || (planId === 'pro-yearly' ? 'year' : 'month');

    var started = new Date();
    var expires = new Date(started);
    if (interval === 'year') {
      expires.setFullYear(expires.getFullYear() + 1);
    } else {
      expires.setMonth(expires.getMonth() + 1);
    }

    return {
      planId: planId,
      name: name,
      price: price,
      interval: interval,
      status: 'active',
      startedAt: started.toISOString(),
      expiresAt: expires.toISOString(),
      paymentId: payId,
      orderId: opts.orderId || null,
      recovered: true,
    };
  }

  /**
   * Resolve best subscription: metadata > local > recover from last payment id.
   * If a Pro source wins, mirror into localStorage.
   */
  function resolveSubscription(user) {
    var local = getSubscription();
    var remote = fromUserMetadata(user);
    var localPro = isPro(local);
    var remotePro = isPro(remote);

    if (remotePro) {
      setSubscription(remote);
      return remote;
    }
    if (localPro) {
      return local;
    }

    /* Paid on this browser but plan record missing (pre-metadata checkout) */
    var recovered = recoverFromLastPayment({
      planId: (local && local.planId) || 'pro-monthly',
      paymentId: (local && local.paymentId) || getLastPaymentId(),
    });
    if (recovered && isPro(recovered)) {
      setSubscription(recovered);
      return recovered;
    }

    return remote || local || null;
  }

  /**
   * Activate plan locally and (when signed in) push to Supabase user_metadata.
   * Returns a Promise that resolves when remote sync finishes (or immediately if offline).
   */
  function activateSubscription(sub) {
    if (!sub) return Promise.resolve(null);
    setSubscription(sub);
    try {
      if (sub.paymentId) {
        localStorage.setItem('xf_last_payment_id', sub.paymentId);
      }
    } catch (e) {}

    if (
      global.XFreezeAuth &&
      typeof global.XFreezeAuth.syncSubscriptionMetadata === 'function'
    ) {
      return global.XFreezeAuth
        .syncSubscriptionMetadata(sub)
        .then(function () {
          return sub;
        })
        .catch(function () {
          return sub;
        });
    }
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
