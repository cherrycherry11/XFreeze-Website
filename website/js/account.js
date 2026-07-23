/**
 * Account dashboard — Overview / Favorites / Billing / Usage / Settings
 * Plan source: server entitlements table via /api/me/entitlement (authoritative).
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
   * Load Pro status from server entitlement only (no payment recovery).
   */
  function ensureProFromPayment(user) {
    if (!user) return Promise.resolve(null);
    recovering = false;
    if (window.XFreezeEntitlement && window.XFreezeEntitlement.refresh) {
      return window.XFreezeEntitlement
        .refresh({ force: true })
        .then(function (snap) {
          return (snap && snap.subscription) || null;
        })
        .catch(function () {
          return null;
        });
    }
    return Promise.resolve(null);
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
        ovCta.href = 'account#billing';
        ovCta.onclick = function (e) {
          e.preventDefault();
          showTab('billing');
        };
      } else {
        ovCta.textContent = 'Upgrade to Pro';
        ovCta.href = 'pricing';
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
      bCta.href = 'pricing';
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
    var thumb = '';
    var icon = 'fa-heart';

    if (type === 'templates') {
      title = item.name || item.id;
      meta = [item.cat, item.subcat, item.tier].filter(Boolean).join(' · ');
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
      icon = 'fa-bolt';
    } else {
      title = item.title || item.id;
      meta =
        (item.categoryName || item.categoryId || 'Prompt') +
        (item.shotNum ? ' · ' + item.shotNum : '');
      icon = 'fa-wand-magic-sparkles';
    }

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
      '<button type="button" class="xf-fav-action" data-fav-preview>Preview</button>' +
      '<button type="button" class="xf-fav-action" data-fav-remove title="Remove">Remove</button>' +
      '</div>' +
      '</div>'
    );
  }

  function findFavorite(type, id) {
    if (!window.XFreezeFavorites) return null;
    var list = window.XFreezeFavorites.list(type) || [];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(id)) return list[i];
    }
    return null;
  }

  function closeFavModal() {
    var modal = $('xf-fav-modal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('xf-fav-modal-open');
  }

  function openFavModal(type, item) {
    var modal = $('xf-fav-modal');
    if (!modal || !item) return;

    var typeEl = $('xf-fav-modal-type');
    var titleEl = $('xf-fav-modal-title');
    var metaEl = $('xf-fav-modal-meta');
    var textEl = $('xf-fav-modal-text');
    var mediaEl = $('xf-fav-modal-media');
    var copyBtn = $('xf-fav-modal-copy');
    var linkBtn = $('xf-fav-modal-link');

    var typeLabel =
      type === 'templates' ? 'Template' : type === 'skills' ? 'Skill' : 'Motion prompt';
    var title = '';
    var meta = '';
    var body = '';
    var copyText = '';
    var externalHref = '';
    var externalLabel = 'Open';

    if (type === 'templates') {
      title = item.name || item.id;
      meta = [item.cat, item.subcat, item.tier].filter(Boolean).join(' · ');
      var templateLocked =
        window.XFreezeAccess &&
        !window.XFreezeAccess.canUse('template', item);
      body =
        (item.name || 'Template') +
        (meta ? '\n' + meta : '') +
        (templateLocked
          ? '\n\nThis is a Pro template. Upgrade to open it in Grok Imagine.'
          : '\n\nOpen this template in Grok Imagine to run it.');
      if (templateLocked) {
        externalHref =
          window.XFreezeAccess.pricingUrl({
            reason: 'premium',
            from: 'account-favorites',
            code: item.id || item.code,
          }) || 'pricing';
        externalLabel = 'Upgrade to Pro';
      } else {
        externalHref = item.link || 'templates';
        externalLabel = item.link ? 'Open in Grok' : 'Browse templates';
      }
      if (mediaEl) {
        if (item.img) {
          mediaEl.hidden = false;
          mediaEl.innerHTML =
            '<img src="' +
            escapeHtml(item.img) +
            '" alt="' +
            escapeHtml(title) +
            '">';
        } else {
          mediaEl.hidden = true;
          mediaEl.innerHTML = '';
        }
      }
    } else if (type === 'skills') {
      title = item.slash || item.packName || item.id;
      meta =
        (item.kind === 'pack' ? 'Skill pack' : 'Skill') +
        (item.packName ? ' · ' + item.packName : '');
      body =
        item.description ||
        (item.kind === 'pack'
          ? 'Saved skill pack. Open the pack on Skills to browse and copy prompts.'
          : 'Saved skill. Open the pack to copy the install prompt.');
      copyText = item.description || title;
      externalHref = item.packId
        ? 'skills#skill-pack/' + encodeURIComponent(item.packId)
        : 'skills';
      externalLabel = item.kind === 'pack' ? 'Open pack' : 'View on Skills';
      if (mediaEl) {
        mediaEl.hidden = true;
        mediaEl.innerHTML = '';
      }
    } else {
      title = item.title || item.id;
      meta =
        (item.categoryName || item.categoryId || 'Prompt') +
        (item.shotNum ? ' · ' + item.shotNum : '') +
        (item.bestFor ? ' · ' + item.bestFor : '');
      body = item.text || 'No prompt text saved for this favorite.';
      copyText = item.text || '';
      externalHref = '';
      if (mediaEl) {
        mediaEl.hidden = true;
        mediaEl.innerHTML = '';
      }
    }

    if (typeEl) typeEl.textContent = typeLabel;
    if (titleEl) titleEl.textContent = title;
    if (metaEl) {
      metaEl.textContent = meta;
      metaEl.hidden = !meta;
    }
    if (textEl) textEl.textContent = body;

    var premLocked =
      window.XFreezeAccess &&
      ((type === 'prompts' &&
        item.premium &&
        !window.XFreezeAccess.canUse('prompt', { premium: true })) ||
        (type === 'skills' &&
          (item.premium ||
            (item.packId && String(item.packId).indexOf('premium-') === 0)) &&
          !window.XFreezeAccess.isPro()));

    if (premLocked) {
      if (type === 'prompts' && textEl) {
        textEl.textContent =
          'Premium prompt — upgrade to Pro to view the full text.';
      }
      if (type === 'skills' && textEl) {
        textEl.textContent =
          'Premium skill — upgrade to Pro to open and copy install prompts.';
      }
      externalHref = window.XFreezeAccess.pricingUrl({
        reason: 'premium',
        from: 'account-favorites',
        id: item.id,
      });
      externalLabel = 'Upgrade to Pro';
      copyText = '';
    }

    if (copyBtn) {
      var canCopy = Boolean(
        copyText && (type === 'prompts' || type === 'skills') && !premLocked
      );
      copyBtn.hidden = !canCopy;
      copyBtn.textContent = 'Copy';
      copyBtn._xfCopyPayload = copyText;
    }
    if (linkBtn) {
      if (externalHref) {
        linkBtn.hidden = false;
        linkBtn.href = externalHref;
        linkBtn.textContent = externalLabel;
        if (externalHref.indexOf('http') === 0 && !premLocked) {
          linkBtn.target = '_blank';
          linkBtn.rel = 'noopener noreferrer';
        } else {
          linkBtn.removeAttribute('target');
          linkBtn.removeAttribute('rel');
        }
      } else {
        linkBtn.hidden = true;
        linkBtn.removeAttribute('href');
      }
    }

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('xf-fav-modal-open');
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
        '<a href="templates">templates</a>, ' +
        '<a href="skills">skills</a>, or ' +
        '<a href="prompt-library">prompts</a> to save them here.' +
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
        var previewBtn = e.target.closest('[data-fav-preview]');
        if (previewBtn) {
          e.preventDefault();
          var row = previewBtn.closest('.xf-fav-item');
          if (!row) return;
          var type = row.getAttribute('data-fav-type');
          var id = row.getAttribute('data-fav-id');
          var item = findFavorite(type, id);
          if (item) openFavModal(type, item);
          return;
        }
        var removeBtn = e.target.closest('[data-fav-remove]');
        if (!removeBtn || !window.XFreezeFavorites) return;
        var rowRm = removeBtn.closest('.xf-fav-item');
        if (!rowRm) return;
        var typeRm = rowRm.getAttribute('data-fav-type');
        var idRm = rowRm.getAttribute('data-fav-id');
        window.XFreezeFavorites.remove(typeRm, idRm);
        renderFavoritesSummary();
        renderFavoritesList();
      });
    }

    var modal = $('xf-fav-modal');
    if (modal && !modal._xfBound) {
      modal._xfBound = true;
      modal.querySelectorAll('[data-fav-modal-close]').forEach(function (el) {
        el.addEventListener('click', closeFavModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.hidden) closeFavModal();
      });
      var copyBtn = $('xf-fav-modal-copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var text = copyBtn._xfCopyPayload || '';
          if (!text) return;
          function done() {
            copyBtn.textContent = 'Copied';
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
            }, 1400);
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function () {
              done();
            });
          } else {
            done();
          }
        });
      }
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
