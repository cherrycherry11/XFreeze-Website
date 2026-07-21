/**
 * X Freeze access control — Free vs Pro for premium library items.
 * Client-side gate (static site). Pro source: localStorage + Supabase metadata.
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
    var user = getUser();
    if (global.XFreezeUsage && typeof global.XFreezeUsage.resolveSubscription === 'function') {
      return global.XFreezeUsage.resolveSubscription(user);
    }
    if (global.XFreezeUsage && typeof global.XFreezeUsage.getSubscription === 'function') {
      return global.XFreezeUsage.getSubscription();
    }
    return null;
  }

  function isPro() {
    if (!global.XFreezeUsage || typeof global.XFreezeUsage.isPro !== 'function') {
      return false;
    }
    return global.XFreezeUsage.isPro(getSubscription());
  }

  function isPremiumTemplate(t) {
    if (!t) return false;
    if (t.tier === 'free') return false;
    if (t.tier === 'premium') return true;
    /* Default non-free templates to premium when tier missing */
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

  /**
   * @returns {boolean} true if allowed to proceed
   */
  function requirePro(opts) {
    if (isPro()) return true;
    goToPricing(opts || { reason: 'premium' });
    return false;
  }

  /**
   * Call from click handlers. Returns true if the action may continue.
   */
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

  /** Safe open href for templates: Grok URL only when allowed */
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

  global.XFreezeAccess = {
    isPro: isPro,
    getSubscription: getSubscription,
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
  };
})(window);
