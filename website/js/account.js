/**
 * Account dashboard — Overview / Favorites / Billing / Usage / Settings
 * Plan source: Supabase user_metadata → localStorage → last payment recovery.
 */
(function () {
  'use strict';

  var TABS = ['overview', 'favorites', 'billing', 'usage', 'settings'];
  var recovering = false;
  var favFilter = 'all';

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
   * Push local Pro into Supabase once signed in so it sticks next login.
   */
  function maybeBackfillMetadata(user, sub) {
    if (!user || !sub || !window.XFreezeUsage || !window.XFreezeUsage.isPro(sub)) {
      return Promise.resolve(false);
    }
    var remote = window.XFreezeUsage.fromUserMetadata
      ? window.XFreezeUsage.fromUserMetadata(user)
      : null;
    if (remote && window.XFreezeUsage.isPro(remote)) {
      return Promise.resolve(false);
    }
    if (
      window.XFreezeAuth &&
      typeof window.XFreezeAuth.syncSubscriptionMetadata === 'function'
    ) {
      return window.XFreezeAuth
        .syncSubscriptionMetadata(sub)
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
    }
    return Promise.resolve(false);
  }

  /**
   * If still free but this browser has a Razorpay payment id, activate Pro
   * and sync to the signed-in user. Runs once per page load.
   */
  function ensureProFromPayment(user) {
    if (!window.XFreezeUsage) return Promise.resolve(null);
    var sub = window.XFreezeUsage.resolveSubscription(user);
    if (window.XFreezeUsage.isPro(sub)) {
      return maybeBackfillMetadata(user, sub).then(function () {
        return sub;
      });
    }

    /* URL recovery: account.html?payment_id=pay_xxx or from success redirect */
    var urlPay = '';
    var urlPlan = 'pro-monthly';
    try {
      var p = new URLSearchParams(window.location.search);
      urlPay = p.get('payment_id') || '';
      if (p.get('plan')) urlPlan = p.get('plan');
    } catch (e) {}

    var recovered = null;
    if (urlPay && String(urlPay).indexOf('pay_') === 0) {
      recovered = window.XFreezeUsage.recoverFromLastPayment({
        paymentId: urlPay,
        planId: urlPlan,
      });
    }
    if (!recovered) {
      recovered = window.XFreezeUsage.recoverFromLastPayment();
    }
    if (!recovered || !window.XFreezeUsage.isPro(recovered)) {
      return Promise.resolve(null);
    }

    recovering = true;
    return window.XFreezeUsage.activateSubscription(recovered).then(function (active) {
      recovering = false;
      return active;
    });
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

    var sub = null;
    if (window.XFreezeUsage && window.XFreezeUsage.resolveSubscription) {
      sub = window.XFreezeUsage.resolveSubscription(user);
    } else if (window.XFreezeUsage) {
      sub = window.XFreezeUsage.getSubscription();
    }

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
      if (sub.recovered && recovering) {
        planMeta = 'Restoring your paid plan…';
      }
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

    renderFavoritesSummary();
    renderFavoritesList();

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
    if (bPay) {
      var payId = (sub && sub.paymentId) || '';
      if (!payId && window.XFreezeUsage && window.XFreezeUsage.getLastPaymentId) {
        payId = window.XFreezeUsage.getLastPaymentId() || '';
      }
      bPay.textContent = payId || '—';
    }

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

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderFavoritesSummary() {
    var counts =
      window.XFreezeFavorites && window.XFreezeFavorites.counts
        ? window.XFreezeFavorites.counts()
        : { templates: 0, skills: 0, prompts: 0, total: 0 };
    var t = $('xf-ov-fav-templates');
    var s = $('xf-ov-fav-skills');
    var p = $('xf-ov-fav-prompts');
    var badge = $('xf-fav-total-badge');
    if (t) t.textContent = counts.templates;
    if (s) s.textContent = counts.skills;
    if (p) p.textContent = counts.prompts;
    if (badge) badge.textContent = String(counts.total);
  }

  function favItemHtml(type, item) {
    var title = '';
    var meta = '';
    var href = '';
    var thumb = '';
    var icon = 'fa-heart';

    if (type === 'templates') {
      title = item.name || item.id;
      meta = [item.cat, item.subcat, item.tier].filter(Boolean).join(' · ');
      href = item.link || 'templates.html';
      icon = 'fa-layer-group';
      if (item.img) {
        thumb =
          '<img src="' +
          escapeHtml(item.img) +
          '" alt="" loading="lazy" onerror="this.remove()">';
      }
    } else if (type === 'skills') {
      title = item.slash || item.packName || item.id;
      meta =
        (item.kind === 'pack' ? 'Skill pack' : 'Skill') +
        (item.packName && item.kind !== 'pack' ? ' · ' + item.packName : '') +
        (item.description ? ' · ' + item.description.slice(0, 60) : '');
      href =
        item.packId
          ? 'skills.html#pack/' + encodeURIComponent(item.packId)
          : 'skills.html';
      icon = 'fa-bolt';
    } else {
      title = item.title || item.id;
      meta =
        (item.categoryName || item.categoryId || 'Prompt') +
        (item.shotNum ? ' · ' + item.shotNum : '');
      href = 'prompt-library.html';
      icon = 'fa-wand-magic-sparkles';
    }

    var openAttr =
      type === 'templates' && href && href.indexOf('http') === 0
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

    return (
      '<div class="xf-fav-item" data-fav-type="' +
      type +
      '" data-fav-id="' +
      escapeHtml(item.id) +
      '">' +
      '<div class="xf-fav-item__thumb">' +
      (thumb || '<i class="fa-solid ' + icon + '" aria-hidden="true"></i>') +
      '</div>' +
      '<div class="xf-fav-item__body">' +
      '<p class="xf-fav-item__title">' +
      escapeHtml(title) +
      '</p>' +
      '<p class="xf-fav-item__meta">' +
      escapeHtml(meta) +
      '</p>' +
      '</div>' +
      '<div class="xf-fav-item__actions">' +
      (href
        ? '<a class="xf-account-btn" href="' +
          escapeHtml(href) +
          '"' +
          openAttr +
          '>Open</a>'
        : '') +
      '<button type="button" class="xf-account-btn" data-fav-remove title="Remove">Remove</button>' +
      '</div>' +
      '</div>'
    );
  }

  function renderFavoritesList() {
    var list = $('xf-fav-list');
    if (!list) return;

    document.querySelectorAll('.xf-fav-filter').forEach(function (btn) {
      btn.classList.toggle(
        'is-active',
        btn.getAttribute('data-fav-filter') === favFilter
      );
    });

    if (!window.XFreezeFavorites) {
      list.innerHTML =
        '<div class="xf-fav-empty">Favorites are unavailable in this browser.</div>';
      return;
    }

    var data = window.XFreezeFavorites.all();
    var sections = [];
    var types =
      favFilter === 'all'
        ? ['templates', 'skills', 'prompts']
        : [favFilter];

    types.forEach(function (type) {
      var items = data[type] || [];
      if (!items.length) return;
      var label =
        type === 'templates'
          ? 'Templates'
          : type === 'skills'
            ? 'Skills'
            : 'Prompts';
      sections.push(
        '<p class="xf-fav-section-label">' +
          label +
          ' (' +
          items.length +
          ')</p>' +
          items.map(function (item) {
            return favItemHtml(type, item);
          }).join('')
      );
    });

    if (!sections.length) {
      list.innerHTML =
        '<div class="xf-fav-empty">' +
        'No favorites yet.<br>' +
        'Tap the <i class="fa-regular fa-heart" aria-hidden="true"></i> on ' +
        '<a href="templates.html">templates</a>, ' +
        '<a href="skills.html">skills</a>, or ' +
        '<a href="prompt-library.html">prompts</a> to save them here.' +
        '</div>';
      return;
    }

    list.innerHTML = sections.join('');
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

  function bindFavoritesUi() {
    document.querySelectorAll('.xf-fav-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        favFilter = btn.getAttribute('data-fav-filter') || 'all';
        renderFavoritesList();
      });
    });

    document.querySelectorAll('[data-goto-tab="favorites"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var f = el.getAttribute('data-fav-filter');
        if (f) favFilter = f;
        showTab('favorites');
        renderFavoritesList();
      });
    });

    var list = $('xf-fav-list');
    if (list && !list._xfFavBound) {
      list._xfFavBound = true;
      list.addEventListener('click', function (e) {
        var removeBtn = e.target.closest('[data-fav-remove]');
        if (!removeBtn || !window.XFreezeFavorites) return;
        var row = removeBtn.closest('.xf-fav-item');
        if (!row) return;
        var type = row.getAttribute('data-fav-type');
        var id = row.getAttribute('data-fav-id');
        window.XFreezeFavorites.remove(type, id);
        renderFavoritesSummary();
        renderFavoritesList();
      });
    }

    if (window.XFreezeFavorites && window.XFreezeFavorites.onChange) {
      window.XFreezeFavorites.onChange(function () {
        renderFavoritesSummary();
        renderFavoritesList();
      });
    }
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

  function bootDashboard() {
    var user = getUser();
    if (!user) {
      render();
      return;
    }
    ensureProFromPayment(user)
      .catch(function () {})
      .then(function () {
        render();
      });
  }

  function init() {
    bindTabs();
    bindFavoritesUi();
    bindSettings();
    showTab(tabFromHash());

    waitForAuth(function () {
      var p =
        window.XFreezeAuth && window.XFreezeAuth.refreshSession
          ? window.XFreezeAuth.refreshSession()
          : Promise.resolve();
      Promise.resolve(p)
        .catch(function () {})
        .then(function () {
          bootDashboard();
          setTimeout(bootDashboard, 600);
          setTimeout(bootDashboard, 1600);
        });

      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) bootDashboard();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
