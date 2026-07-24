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
    return 'pricing?' + params.toString();
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
    if (!t) return 'templates';
    if (canUse('template', t) && t.link) return t.link;
    if (isPremiumTemplate(t)) {
      return pricingUrl({ reason: 'premium', from: 'templates', code: t.code });
    }
    return t.link || 'templates';
  }

  function templateOpensExternally(t) {
    return canUse('template', t) && t && t.link && String(t.link).indexOf('http') === 0;
  }

  function kindFromErr(err) {
    var k =
      (err && err.data && err.data.kind) ||
      (err && err.kind) ||
      '';
    k = String(k).toLowerCase();
    if (k.indexOf('template') !== -1) return 'templates';
    if (k.indexOf('skill') !== -1) return 'skills';
    if (k.indexOf('prompt') !== -1) return 'prompts';
    var msg = String(
      (err && err.data && err.data.error) || (err && err.message) || ''
    ).toLowerCase();
    if (msg.indexOf('template') !== -1) return 'templates';
    if (msg.indexOf('skill') !== -1) return 'skills';
    if (msg.indexOf('prompt') !== -1) return 'prompts';
    return 'templates';
  }

  function kindPhrase(kind) {
    if (kind === 'skills') return 'skills';
    if (kind === 'prompts') return 'prompts';
    return 'templates';
  }

  function ensureLimitModal() {
    var el = document.getElementById('xf-limit-modal');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'xf-limit-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'xf-limit-title');
    el.hidden = true;
    el.innerHTML =
      '<div class="xf-limit-modal__backdrop" data-xf-limit-close></div>' +
      '<div class="xf-limit-modal__card">' +
      '<div class="xf-limit-modal__icon" aria-hidden="true">' +
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none">' +
      '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.75"/>' +
      '<path d="M12 7v6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
      '<circle cx="12" cy="16.5" r="1" fill="currentColor"/>' +
      '</svg></div>' +
      '<h2 class="xf-limit-modal__title" id="xf-limit-title">Daily limit reached</h2>' +
      '<p class="xf-limit-modal__msg" id="xf-limit-msg"></p>' +
      '<div class="xf-limit-modal__actions">' +
      '<button type="button" class="xf-limit-modal__btn xf-limit-modal__btn--primary" data-xf-limit-close>Got it</button>' +
      '<a class="xf-limit-modal__btn xf-limit-modal__btn--ghost" id="xf-limit-usage" href="account#usage">View usage</a>' +
      '</div></div>';
    document.body.appendChild(el);

    if (!document.getElementById('xf-limit-modal-style')) {
      var style = document.createElement('style');
      style.id = 'xf-limit-modal-style';
      style.textContent =
        '#xf-limit-modal{position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:1.25rem;}' +
        '#xf-limit-modal[hidden]{display:none!important;}' +
        '.xf-limit-modal__backdrop{position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}' +
        '.xf-limit-modal__card{position:relative;width:100%;max-width:22rem;border-radius:1.25rem;padding:1.6rem 1.4rem 1.35rem;text-align:center;' +
        'background:#fff;color:#0a0a0a;border:1px solid #e5e7eb;box-shadow:0 24px 64px -16px rgba(0,0,0,.35);font-family:Inter,system-ui,sans-serif;}' +
        'html.dark .xf-limit-modal__card{background:#141816;color:#f2f5f3;border-color:#2a312e;box-shadow:0 24px 64px -12px rgba(0,0,0,.65);}' +
        '.xf-limit-modal__icon{width:3.25rem;height:3.25rem;margin:0 auto .9rem;border-radius:999px;display:flex;align-items:center;justify-content:center;' +
        'background:rgba(245,158,11,.12);color:#d97706;}' +
        'html.dark .xf-limit-modal__icon{background:rgba(251,191,36,.12);color:#fbbf24;}' +
        '.xf-limit-modal__title{margin:0 0 .45rem;font-size:1.15rem;font-weight:600;letter-spacing:-.02em;line-height:1.25;}' +
        '.xf-limit-modal__msg{margin:0 auto;max-width:18rem;font-size:.9375rem;line-height:1.5;color:#6b7280;}' +
        'html.dark .xf-limit-modal__msg{color:#9ca3af;}' +
        '.xf-limit-modal__actions{display:flex;flex-wrap:wrap;gap:.55rem;justify-content:center;margin-top:1.25rem;}' +
        '.xf-limit-modal__btn{display:inline-flex;align-items:center;justify-content:center;min-height:2.5rem;padding:.55rem 1.15rem;border-radius:999px;' +
        'font-size:.875rem;font-weight:600;text-decoration:none;border:1px solid transparent;cursor:pointer;}' +
        '.xf-limit-modal__btn--primary{background:#0a0a0a;color:#fff;border:none;}' +
        'html.dark .xf-limit-modal__btn--primary{background:#f2f5f3;color:#0a0a0a;}' +
        '.xf-limit-modal__btn--ghost{background:transparent;color:inherit;border-color:#e5e7eb;}' +
        'html.dark .xf-limit-modal__btn--ghost{border-color:#2a312e;}';
      document.head.appendChild(style);
    }

    el.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('[data-xf-limit-close]')) {
        hideLimitModal();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el && !el.hidden) hideLimitModal();
    });
    return el;
  }

  function hideLimitModal() {
    var el = document.getElementById('xf-limit-modal');
    if (el) el.hidden = true;
  }

  function showUsageLimit(err) {
    var kind = kindFromErr(err);
    var title = 'Daily limit reached for ' + kindPhrase(kind);
    var msg = 'Try again in the next 24 hours.';
    var el = ensureLimitModal();
    var titleEl = document.getElementById('xf-limit-title');
    var msgEl = document.getElementById('xf-limit-msg');
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = msg;
    el.hidden = false;
  }

  function requireSignedIn() {
    if (getUser()) return true;
    if (global.XFreezeAuth && global.XFreezeAuth.redirectToLogin) {
      global.XFreezeAuth.redirectToLogin();
    } else {
      global.location.href = 'login';
    }
    return false;
  }

  /**
   * Resolve openable template URL.
   * Free: sign-in + server daily quota, then public link.
   * Premium: Pro + server content API (quota + secret link).
   */
  function resolveTemplateLink(t) {
    if (!t) return Promise.resolve(null);

    if (!isPremiumTemplate(t)) {
      if (!requireSignedIn()) return Promise.resolve(null);
      if (!global.XFreezeUsage || !global.XFreezeUsage.consume) {
        return Promise.resolve(t.link || null);
      }
      return global.XFreezeUsage
        .consume('templates', t.code || t.id)
        .then(function (result) {
          if (!result || !result.ok) {
            showUsageLimit({
              kind: 'templates',
              message: (result && result.error) || 'Daily limit reached for templates.',
              data: result,
            });
            return null;
          }
          return t.link || null;
        });
    }

    if (!isPro()) {
      goToPricing({ reason: 'premium', from: 'templates', code: t.code });
      return Promise.resolve(null);
    }
    if (!requireSignedIn()) return Promise.resolve(null);
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
        if (err && (err.code === 'limit_exceeded' || err.status === 429)) {
          showUsageLimit(err);
        } else if (err && (err.code === 'pro_required' || err.status === 403)) {
          goToPricing({ reason: 'premium', from: 'templates', code: t.code });
        } else if (err && (err.code === 'auth_required' || err.status === 401)) {
          requireSignedIn();
        } else {
          showUsageLimit(err);
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
