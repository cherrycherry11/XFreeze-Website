/**
 * X Freeze access control — Free vs Pro for premium library items.
 * UI gate only. Real enforcement is on /api/content/* + entitlements table.
 */
(function (global) {
  'use strict';

  function getUser() {
    try {
      if (global.XFreezeAuth && typeof global.XFreezeAuth.getSession === 'function') {
        var session = global.XFreezeAuth.getSession();
        return session && session.user ? session.user : null;
      }
    } catch (e) {}
    return null;
  }

  function getSubscription() {
    if (global.XFreezeEntitlement && global.XFreezeEntitlement.getSubscription) {
      return global.XFreezeEntitlement.getSubscription();
    }
    if (global.XFreezeUsage && typeof global.XFreezeUsage.resolveSubscription === 'function') {
      return global.XFreezeUsage.resolveSubscription(getUser());
    }
    return null;
  }

  function isPro() {
    if (global.XFreezeEntitlement && typeof global.XFreezeEntitlement.isPro === 'function') {
      return global.XFreezeEntitlement.isPro();
    }
    if (!global.XFreezeUsage || typeof global.XFreezeUsage.isPro !== 'function') {
      return false;
    }
    return global.XFreezeUsage.isPro(getSubscription());
  }

  function refreshEntitlement() {
    if (global.XFreezeEntitlement && global.XFreezeEntitlement.refresh) {
      return global.XFreezeEntitlement.refresh();
    }
    return Promise.resolve({ isPro: isPro() });
  }

  function isPremiumTemplate(t) {
    if (!t) return false;
    if (t.tier === 'free') return false;
    if (t.tier === 'premium') return true;
    return t.tier != null && t.tier !== 'free';
  }

  function isPremiumSkill(meta) {
    if (!meta) return false;
    if (meta.tier === 'premium' || meta.premium === true) return true;
    if (meta.kind === 'pack' && String(meta.id || meta.packId || '').indexOf('premium-') === 0) {
      return true;
    }
    if (String(meta.packId || '').indexOf('premium-') === 0) return true;
    return false;
  }

  function isPremiumPrompt(meta) {
    if (!meta) return false;
    return Boolean(meta.premium || meta.tier === 'premium');
  }

  function isPremiumResource(kind, meta) {
    if (kind === 'template' || kind === 'templates') return isPremiumTemplate(meta);
    if (kind === 'skill' || kind === 'skills') return isPremiumSkill(meta);
    if (kind === 'prompt' || kind === 'prompts') return isPremiumPrompt(meta);
    return false;
  }

  function canUse(kind, meta) {
    if (!isPremiumResource(kind, meta)) return true;
    return isPro();
  }

  function pricingUrl(opts) {
    opts = opts || {};
    var params = new URLSearchParams();
    params.set('reason', opts.reason || 'premium');
    if (opts.from) params.set('from', opts.from);
    if (opts.code) params.set('code', String(opts.code));
    if (opts.id) params.set('id', String(opts.id));
    return 'pricing.html?' + params.toString();
  }

  function goToPricing(opts) {
    var url = pricingUrl(opts);
    try {
      global.location.href = url;
    } catch (e) {
      global.location.assign(url);
    }
    return false;
  }

  function requirePro(opts) {
    if (isPro()) return true;
    goToPricing(opts || { reason: 'premium' });
    return false;
  }

  function guardClick(event, kind, meta, opts) {
    if (canUse(kind, meta)) return true;
    if (event) {
      if (event.preventDefault) event.preventDefault();
      if (event.stopPropagation) event.stopPropagation();
    }
    goToPricing(
      Object.assign(
        {
          reason: 'premium',
          from: kind || 'library',
          code: meta && (meta.code || meta.id),
        },
        opts || {}
      )
    );
    return false;
  }

  function templateOpenHref(t) {
    if (!t) return 'templates.html';
    if (canUse('template', t) && t.link) return t.link;
    if (isPremiumTemplate(t)) {
      return pricingUrl({ reason: 'premium', from: 'templates', code: t.code });
    }
    return t.link || 'templates.html';
  }

  function templateOpensExternally(t) {
    return canUse('template', t) && t && t.link && String(t.link).indexOf('http') === 0;
  }

  /**
   * Resolve openable template URL (async for premium — server gated).
   */
  function resolveTemplateLink(t) {
    if (!t) return Promise.resolve(null);
    if (!isPremiumTemplate(t)) {
      return Promise.resolve(t.link || null);
    }
    if (!isPro()) {
      goToPricing({ reason: 'premium', from: 'templates', code: t.code });
      return Promise.resolve(null);
    }
    if (t.link && String(t.link).indexOf('http') === 0) {
      return Promise.resolve(t.link);
    }
    if (!global.XFreezeEntitlement || !global.XFreezeEntitlement.fetchTemplateLink) {
      goToPricing({ reason: 'premium', from: 'templates', code: t.code });
      return Promise.resolve(null);
    }
    return global.XFreezeEntitlement.fetchTemplateLink(t.code)
      .then(function (data) {
        if (data && data.link) {
          t.link = data.link;
          return data.link;
        }
        return null;
      })
      .catch(function (err) {
        if (err && (err.code === 'pro_required' || err.status === 403)) {
          goToPricing({ reason: 'premium', from: 'templates', code: t.code });
        } else if (err && (err.code === 'auth_required' || err.status === 401)) {
          if (global.XFreezeAuth && global.XFreezeAuth.redirectToLogin) {
            global.XFreezeAuth.redirectToLogin();
          } else {
            global.location.href = 'login.html';
          }
        }
        return null;
      });
  }

  /* Refresh entitlement after auth is ready */
  function bootRefresh() {
    refreshEntitlement().then(function () {
      try {
        global.dispatchEvent(new CustomEvent('xf-access-ready'));
      } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(bootRefresh, 200);
    });
  } else {
    setTimeout(bootRefresh, 200);
  }

  global.addEventListener('xf-entitlement-change', function () {
    try {
      global.dispatchEvent(new CustomEvent('xf-access-ready'));
    } catch (e) {}
  });

  global.XFreezeAccess = {
    isPro: isPro,
    getSubscription: getSubscription,
    refreshEntitlement: refreshEntitlement,
    isPremiumTemplate: isPremiumTemplate,
    isPremiumSkill: isPremiumSkill,
    isPremiumPrompt: isPremiumPrompt,
    isPremiumResource: isPremiumResource,
    canUse: canUse,
    pricingUrl: pricingUrl,
    goToPricing: goToPricing,
    requirePro: requirePro,
    guardClick: guardClick,
    templateOpenHref: templateOpenHref,
    templateOpensExternally: templateOpensExternally,
    resolveTemplateLink: resolveTemplateLink,
  };
})(window);
