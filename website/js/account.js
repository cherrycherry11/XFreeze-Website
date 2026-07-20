/**
 * Account dashboard — Overview / Billing / Usage / Settings
 * Plan source: Supabase user_metadata first, then localStorage.
 */
(function () {
  'use strict';

  var TABS = ['overview', 'billing', 'usage', 'settings'];

  function $(id) {
    return document.getElementById(id);
  }

  function initialsFromEmail(email) {
    if (!email) return '?';
    var part = email.split('@')[0] || email;
    return part.slice(0, 2).toUpperCase();
  }

  function formatDate(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return '—';
    }
  }

  function formatPrice(price, interval) {
    if (price == null) return '$0';
    var n = Number(price);
    var label = Number.isInteger(n) ? String(n) : n.toFixed(2);
    var unit = interval === 'year' ? 'year' : 'month';
    return '$' + label + ' <span>/ ' + unit + '</span>';
  }

  function pct(used, limit) {
    if (!limit || limit >= 99999) return Math.min(12, used > 0 ? 8 + used * 0.05 : 0);
    return Math.min(100, Math.round((used / limit) * 100));
  }

  function setBadge(el, pro) {
    if (!el) return;
    el.textContent = pro ? 'Pro' : 'Free';
    el.className = 'xf-account-badge ' + (pro ? 'xf-account-badge--pro' : 'xf-account-badge--free');
  }

  function waitForAuth(cb) {
    var tries = 0;
    (function tick() {
      tries += 1;
      if (window.XFreezeAuth && typeof window.XFreezeAuth.getSession === 'function') {
        cb();
        return;
      }
      if (tries > 50) {
        cb();
        return;
      }
      setTimeout(tick, 100);
    })();
  }

  function getUser() {
    try {
      if (window.XFreezeAuth && window.XFreezeAuth.getSession) {
        var session = window.XFreezeAuth.getSession();
        return session && session.user ? session.user : null;
      }
    } catch (e) {}
    return null;
  }

  /**
   * If user paid on this device but metadata never wrote (guest checkout),
   * push local Pro into Supabase once they're signed in.
   */
  function maybeBackfillMetadata(user, sub) {
    if (!user || !sub || !window.XFreezeUsage || !window.XFreezeUsage.isPro(sub)) return;
    var remote = window.XFreezeUsage.fromUserMetadata
      ? window.XFreezeUsage.fromUserMetadata(user)
      : null;
    if (remote && window.XFreezeUsage.isPro(remote)) return;
    if (
      window.XFreezeAuth &&
      typeof window.XFreezeAuth.syncSubscriptionMetadata === 'function'
    ) {
      window.XFreezeAuth.syncSubscriptionMetadata(sub).catch(function () {});
    }
  }

  function showTab(name) {
    if (TABS.indexOf(name) === -1) name = 'overview';
    TABS.forEach(function (tab) {
      var btn = document.querySelector('.xf-account-tab[data-tab="' + tab + '"]');
      var panel = $('panel-' + tab);
      var on = tab === name;
      if (btn) {
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      }
      if (panel) {
        panel.hidden = !on;
        panel.classList.toggle('is-active', on);
      }
    });
    try {
      var url = new URL(window.location.href);
      if (name === 'overview') {
        url.hash = '';
      } else {
        url.hash = name;
      }
      window.history.replaceState({}, '', url.pathname + url.search + (url.hash || ''));
    } catch (e) {}
  }

  function tabFromHash() {
    var h = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    if (h === 'subscription') h = 'billing';
    if (TABS.indexOf(h) !== -1) return h;
    return 'overview';
  }

  function fillMeter(usedId, limitId, barId, used, limit, pro) {
    var u = $(usedId);
    var l = $(limitId);
    var b = $(barId);
    var limLabel = window.XFreezeUsage ? window.XFreezeUsage.formatLimit(limit) : String(limit);
    if (u) u.textContent = used;
    if (l) l.textContent = limLabel;
    if (b) {
      b.style.width = pct(used, limit) + '%';
      b.classList.toggle('xf-usage-bar__fill--pro', !!pro);
    }
  }

  function render() {
    var gate = $('xf-account-gate');
    var dash = $('xf-account-dash');
    if (!gate || !dash) return;

    var user = getUser();
    if (!user) {
      gate.hidden = false;
      dash.hidden = true;
      return;
    }

    gate.hidden = true;
    dash.hidden = false;

    var email = user.email || 'Signed in';
    var name =
      (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) ||
      email.split('@')[0];
    var avatar =
      (user.user_metadata &&
        (user.user_metadata.avatar_url || user.user_metadata.picture)) ||
      '';

    var nameEl = $('xf-account-name');
    var emailEl = $('xf-account-email');
    var av = $('xf-account-avatar');
    if (nameEl) nameEl.textContent = name;
    if (emailEl) emailEl.textContent = email;
    if (av) {
      if (avatar) {
        av.innerHTML = '<img src="' + avatar.replace(/"/g, '') + '" alt="">';
      } else {
        av.textContent = initialsFromEmail(email);
      }
    }

    /* Resolve plan: metadata > localStorage */
    var sub = null;
    if (window.XFreezeUsage && window.XFreezeUsage.resolveSubscription) {
      sub = window.XFreezeUsage.resolveSubscription(user);
    } else if (window.XFreezeUsage) {
      sub = window.XFreezeUsage.getSubscription();
    }

    maybeBackfillMetadata(user, sub);

    var pro = window.XFreezeUsage ? window.XFreezeUsage.isPro(sub) : false;
    var usage = window.XFreezeUsage
      ? window.XFreezeUsage.getUsage()
      : { prompts: 0, templates: 0, skills: 0 };
    var limits = window.XFreezeUsage
      ? window.XFreezeUsage.getLimits(sub)
      : { prompts: 50, templates: 30, skills: 40 };

    var planLabel = pro
      ? (sub && sub.name) || (sub && sub.interval === 'year' ? 'Pro Yearly' : 'Pro Monthly')
      : 'Free';
    var planMeta = '';
    if (pro && sub) {
      planMeta =
        (sub.interval === 'year' ? 'Billed yearly' : 'Billed monthly') +
        ' · Active since ' +
        formatDate(sub.startedAt) +
        (sub.expiresAt ? ' · Renews / ends ' + formatDate(sub.expiresAt) : '');
    } else {
      planMeta = 'Browse free templates & skills. Upgrade anytime for full library access.';
    }
    var priceHtml = pro && sub ? formatPrice(sub.price, sub.interval) : '$0 <span>/ forever</span>';

    setBadge($('xf-header-badge'), pro);
    setBadge($('xf-ov-badge'), pro);
    setBadge($('xf-bill-badge'), pro);

    /* Overview */
    var ovName = $('xf-ov-plan-name');
    var ovMeta = $('xf-ov-plan-meta');
    var ovPrice = $('xf-ov-plan-price');
    var ovCta = $('xf-ov-cta');
    if (ovName) ovName.textContent = planLabel;
    if (ovMeta) ovMeta.textContent = planMeta;
    if (ovPrice) ovPrice.innerHTML = priceHtml;
    if (ovCta) {
      if (pro) {
        ovCta.textContent = 'Manage plan';
        ovCta.href = 'account.html#billing';
        ovCta.onclick = function (e) {
          e.preventDefault();
          showTab('billing');
        };
      } else {
        ovCta.textContent = 'Upgrade to Pro';
        ovCta.href = 'pricing.html';
        ovCta.onclick = null;
      }
    }

    var periodLabel = '—';
    try {
      periodLabel = new Date().toLocaleString(undefined, { month: 'short', year: 'numeric' });
    } catch (e) {
      periodLabel = usage.month || '—';
    }

    var ovP = $('xf-ov-stat-prompts');
    var ovT = $('xf-ov-stat-templates');
    var ovS = $('xf-ov-stat-skills');
    var ovPeriod = $('xf-ov-period');
    if (ovP) ovP.textContent = usage.prompts || 0;
    if (ovT) ovT.textContent = usage.templates || 0;
    if (ovS) ovS.textContent = usage.skills || 0;
    if (ovPeriod) ovPeriod.textContent = 'Period: ' + periodLabel;

    /* Billing */
    var bName = $('xf-bill-plan-name');
    var bMeta = $('xf-bill-plan-meta');
    var bPrice = $('xf-bill-plan-price');
    var bCta = $('xf-bill-cta');
    if (bName) bName.textContent = planLabel;
    if (bMeta) {
      bMeta.textContent = pro
        ? 'Your Pro access is active on this account.'
        : 'No paid plan yet. Upgrade to unlock the full library.';
    }
    if (bPrice) bPrice.innerHTML = priceHtml;
    if (bCta) {
      bCta.textContent = pro ? 'View pricing' : 'Upgrade to Pro';
      bCta.href = 'pricing.html';
    }

    var bStatus = $('xf-bill-status');
    var bCycle = $('xf-bill-cycle');
    var bStarted = $('xf-bill-started');
    var bExpires = $('xf-bill-expires');
    var bPay = $('xf-bill-payment');
    if (bStatus) bStatus.textContent = pro ? 'Active' : 'Free plan';
    if (bCycle) {
      bCycle.textContent = pro
        ? sub.interval === 'year'
          ? 'Yearly'
          : 'Monthly'
        : '—';
    }
    if (bStarted) bStarted.textContent = pro && sub ? formatDate(sub.startedAt) : '—';
    if (bExpires) bExpires.textContent = pro && sub ? formatDate(sub.expiresAt) : '—';
    if (bPay) bPay.textContent = (sub && sub.paymentId) || '—';

    /* Usage */
    fillMeter(
      'xf-use-prompts',
      'xf-lim-prompts',
      'xf-bar-prompts',
      usage.prompts || 0,
      limits.prompts,
      pro
    );
    fillMeter(
      'xf-use-templates',
      'xf-lim-templates',
      'xf-bar-templates',
      usage.templates || 0,
      limits.templates,
      pro
    );
    fillMeter(
      'xf-use-skills',
      'xf-lim-skills',
      'xf-bar-skills',
      usage.skills || 0,
      limits.skills,
      pro
    );

    var s1 = $('xf-stat-prompts');
    var s2 = $('xf-stat-templates');
    var s3 = $('xf-stat-skills');
    var s4 = $('xf-stat-month');
    var useBadge = $('xf-use-period-badge');
    if (s1) s1.textContent = usage.prompts || 0;
    if (s2) s2.textContent = usage.templates || 0;
    if (s3) s3.textContent = usage.skills || 0;
    if (s4) s4.textContent = periodLabel;
    if (useBadge) useBadge.textContent = periodLabel;

    /* Settings */
    var setName = $('xf-set-name');
    var setEmail = $('xf-set-email');
    var setMember = $('xf-set-member');
    var setPlan = $('xf-set-plan');
    if (setName) setName.textContent = name;
    if (setEmail) setEmail.textContent = email;
    if (setMember) setMember.textContent = formatDate(user.created_at);
    if (setPlan) setPlan.textContent = planLabel;
  }

  function bindTabs() {
    document.querySelectorAll('.xf-account-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-tab') || 'overview');
      });
    });
    window.addEventListener('hashchange', function () {
      showTab(tabFromHash());
    });
  }

  function bindSettings() {
    var signOut = $('xf-set-signout');
    if (signOut) {
      signOut.addEventListener('click', function () {
        if (window.XFreezeAuth && window.XFreezeAuth.signOut) {
          window.XFreezeAuth.signOut();
        }
      });
    }
  }

  function init() {
    bindTabs();
    bindSettings();
    showTab(tabFromHash());

    waitForAuth(function () {
      /* Prefer a fresh session so metadata is current after checkout */
      var p =
        window.XFreezeAuth && window.XFreezeAuth.refreshSession
          ? window.XFreezeAuth.refreshSession()
          : Promise.resolve();
      Promise.resolve(p)
        .catch(function () {})
        .then(function () {
          render();
          setTimeout(render, 500);
          setTimeout(render, 1500);
        });

      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) render();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
