/**
 * Account dashboard renderer
 */
(function () {
  'use strict';

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

  function pct(used, limit) {
    if (!limit || limit >= 99999) return Math.min(12, used > 0 ? 8 + used * 0.05 : 0);
    return Math.min(100, Math.round((used / limit) * 100));
  }

  function waitForAuth(cb) {
    var tries = 0;
    (function tick() {
      tries += 1;
      if (window.XFreezeAuth && typeof window.XFreezeAuth.getSession === 'function') {
        cb();
        return;
      }
      if (tries > 40) {
        cb();
        return;
      }
      setTimeout(tick, 100);
    })();
  }

  function render() {
    var gate = $('xf-account-gate');
    var dash = $('xf-account-dash');
    if (!gate || !dash) return;

    var session = null;
    try {
      if (window.XFreezeAuth && window.XFreezeAuth.getSession) {
        session = window.XFreezeAuth.getSession();
      }
    } catch (e) {}

    var user = session && session.user;
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

    var sub = (window.XFreezeUsage && window.XFreezeUsage.getSubscription()) || null;
    var pro = window.XFreezeUsage ? window.XFreezeUsage.isPro(sub) : false;
    var usage = window.XFreezeUsage ? window.XFreezeUsage.getUsage() : { prompts: 0, templates: 0, skills: 0 };
    var limits = window.XFreezeUsage ? window.XFreezeUsage.getLimits(sub) : { prompts: 50, templates: 30, skills: 40 };

    var badge = $('xf-plan-badge');
    var planName = $('xf-plan-name');
    var planMeta = $('xf-plan-meta');
    var planPrice = $('xf-plan-price');
    var upgradeBtn = $('xf-plan-upgrade');

    if (badge) {
      badge.textContent = pro ? 'Pro' : 'Free';
      badge.className = 'xf-account-badge ' + (pro ? 'xf-account-badge--pro' : 'xf-account-badge--free');
    }
    if (planName) {
      planName.textContent = pro
        ? sub.name || (sub.interval === 'year' ? 'Pro Yearly' : 'Pro Monthly')
        : 'Free';
    }
    if (planMeta) {
      if (pro) {
        var started = formatDate(sub.startedAt);
        var exp = sub.expiresAt ? formatDate(sub.expiresAt) : '—';
        planMeta.textContent =
          (sub.interval === 'year' ? 'Billed yearly' : 'Billed monthly') +
          ' · Active since ' +
          started +
          (sub.expiresAt ? ' · Renews / ends ' + exp : '');
      } else {
        planMeta.textContent = 'Browse free templates & skills. Upgrade anytime for full library access.';
      }
    }
    if (planPrice) {
      if (pro && sub.price != null) {
        planPrice.innerHTML =
          '$' +
          (Number.isInteger(Number(sub.price)) ? Number(sub.price) : Number(sub.price).toFixed(2)) +
          ' <span>/ ' +
          (sub.interval === 'year' ? 'year' : 'month') +
          '</span>';
      } else {
        planPrice.innerHTML = '$0 <span>/ forever</span>';
      }
    }
    if (upgradeBtn) {
      upgradeBtn.textContent = pro ? 'Manage plan' : 'Upgrade to Pro';
      upgradeBtn.href = 'pricing.html';
    }

    function fillMeter(usedId, limitId, barId, used, limit) {
      var u = $(usedId);
      var l = $(limitId);
      var b = $(barId);
      var limLabel = window.XFreezeUsage ? window.XFreezeUsage.formatLimit(limit) : String(limit);
      if (u) u.textContent = used;
      if (l) l.textContent = limLabel;
      if (b) {
        b.style.width = pct(used, limit) + '%';
        b.classList.toggle('xf-usage-bar__fill--pro', pro);
      }
    }

    fillMeter('xf-use-prompts', 'xf-lim-prompts', 'xf-bar-prompts', usage.prompts || 0, limits.prompts);
    fillMeter('xf-use-templates', 'xf-lim-templates', 'xf-bar-templates', usage.templates || 0, limits.templates);
    fillMeter('xf-use-skills', 'xf-lim-skills', 'xf-bar-skills', usage.skills || 0, limits.skills);

    var s1 = $('xf-stat-prompts');
    var s2 = $('xf-stat-templates');
    var s3 = $('xf-stat-skills');
    var s4 = $('xf-stat-month');
    if (s1) s1.textContent = usage.prompts || 0;
    if (s2) s2.textContent = usage.templates || 0;
    if (s3) s3.textContent = usage.skills || 0;
    if (s4) {
      try {
        s4.textContent = new Date().toLocaleString(undefined, { month: 'short', year: 'numeric' });
      } catch (e) {
        s4.textContent = usage.month || '—';
      }
    }

    var dEmail = $('xf-detail-email');
    var dMember = $('xf-detail-member');
    var dPlan = $('xf-detail-plan');
    var dPay = $('xf-detail-payment');
    if (dEmail) dEmail.textContent = email;
    if (dMember) dMember.textContent = formatDate(user.created_at);
    if (dPlan) dPlan.textContent = pro ? planName.textContent : 'Free';
    if (dPay) dPay.textContent = (sub && sub.paymentId) || '—';
  }

  function init() {
    waitForAuth(function () {
      render();
      /* Re-render when auth finishes loading */
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) render();
      });
      setTimeout(render, 400);
      setTimeout(render, 1200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
