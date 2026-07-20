/**
 * Client-side usage + subscription store for Account dashboard.
 * Persists in localStorage until server-side billing is wired.
 */
(function (global) {
  'use strict';

  var SUB_KEY = 'xf_subscription';
  var USAGE_KEY = 'xf_usage_v1';

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
    FREE_LIMITS: FREE_LIMITS,
    PRO_LIMITS: PRO_LIMITS,
  };
})(window);
