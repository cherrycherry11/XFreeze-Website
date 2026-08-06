/**
 * Freezestack checkout - Dodo Payments overlay (modal on top of the site).
 * Full-page redirect is avoided so pricing stays visible under the popup.
 */
(function (global) {
  var SDK_CDN =
    'https://cdn.jsdelivr.net/npm/dodopayments-checkout@1.9.5/dist/index.js';
  var sdkLoadPromise = null;
  var sdkInitialized = false;
  var pendingTriggerBtn = null;

  function resolveDefaultApiBase() {
    try {
      var h = (global.location && global.location.hostname) || '';
      if (h && h !== 'localhost' && h !== '127.0.0.1') {
        return global.location.origin;
      }
    } catch (e) {}
    return global.location && global.location.origin
      ? global.location.origin
      : 'http://localhost:4242';
  }

  var apiBase = resolveDefaultApiBase();
  var config = null;
  var inflight = false;

  function fetchConfig() {
    if (config) return Promise.resolve(config);
    return fetch(apiBase + '/api/config').then(function (res) {
      if (!res.ok) throw new Error('Config request failed');
      return res.json().then(function (data) {
        config = data;
        return config;
      });
    });
  }

  function getAccessToken() {
    try {
      if (global.XFreezeEntitlement && global.XFreezeEntitlement.getAccessToken) {
        return global.XFreezeEntitlement.getAccessToken() || '';
      }
      if (global.XFreezeAuth && global.XFreezeAuth.getSession) {
        var s = global.XFreezeAuth.getSession();
        return (s && s.access_token) || '';
      }
    } catch (e) {}
    return '';
  }

  function getSessionEmail() {
    try {
      if (global.XFreezeAuth && global.XFreezeAuth.getSession) {
        var s = global.XFreezeAuth.getSession();
        if (s && s.user && s.user.email) return String(s.user.email).trim();
      }
    } catch (e) {}
    return '';
  }

  /**
   * After Dodo pay, land back on a real site page (pricing) so the
   * confirmation card can sit on top of Freezestack chrome — not a blank page.
   * Dodo appends payment_id / status query params to this URL.
   */
  function successUrl(planId) {
    try {
      var origin = global.location.origin || 'https://freezestack.com';
      var returnPath = 'pricing';
      try {
        var stored = sessionStorage.getItem('xf_checkout_return');
        if (stored && /^[a-z0-9_./-]+$/i.test(stored) && stored.indexOf('checkout-success') === -1) {
          returnPath = stored.replace(/^\//, '');
        }
      } catch (e0) {}
      /* Prefer current page when checkout was opened from pricing/account */
      try {
        var path = (global.location.pathname || '').replace(/\/$/, '');
        var leaf = path.split('/').pop() || '';
        if (
          leaf &&
          leaf !== 'checkout-success' &&
          leaf !== 'checkout-success.html' &&
          leaf !== 'login' &&
          leaf !== 'signup'
        ) {
          returnPath = leaf.replace(/\.html$/, '');
          try {
            sessionStorage.setItem('xf_checkout_return', returnPath);
          } catch (e1) {}
        }
      } catch (e2) {}
      return (
        origin +
        '/' +
        returnPath +
        '?provider=dodo&xf_pay=1&plan=' +
        encodeURIComponent(planId || '')
      );
    } catch (e) {
      return (
        'https://freezestack.com/pricing?provider=dodo&xf_pay=1&plan=' +
        encodeURIComponent(planId || '')
      );
    }
  }

  function dodoModeFromConfig(cfg) {
    var env = String((cfg && cfg.dodoEnv) || 'test_mode').toLowerCase();
    if (env === 'live' || env === 'live_mode' || env === 'production') {
      return 'live';
    }
    return 'test';
  }

  /** Match current Freezestack theme for Dodo checkout (light | dark | system). */
  function getSiteTheme() {
    try {
      var stored = localStorage.getItem('xfreeze-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    try {
      if (
        document.documentElement &&
        document.documentElement.classList.contains('dark')
      ) {
        return 'dark';
      }
    } catch (e2) {}
    try {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    } catch (e3) {}
    return 'light';
  }

  function getDodoApi() {
    if (global.DodoPaymentsCheckout && global.DodoPaymentsCheckout.DodoPayments) {
      return global.DodoPaymentsCheckout.DodoPayments;
    }
    if (global.DodoPayments) return global.DodoPayments;
    return null;
  }

  function loadDodoSdk() {
    if (getDodoApi()) return Promise.resolve(getDodoApi());
    if (sdkLoadPromise) return sdkLoadPromise;
    sdkLoadPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = SDK_CDN;
      s.async = true;
      s.onload = function () {
        var api = getDodoApi();
        if (api) resolve(api);
        else reject(new Error('Dodo Checkout SDK loaded but API not found'));
      };
      s.onerror = function () {
        sdkLoadPromise = null;
        reject(new Error('Failed to load Dodo Checkout SDK'));
      };
      document.head.appendChild(s);
    });
    return sdkLoadPromise;
  }

  /**
   * Ensure session URL is in overlay form so Dodo opens as a modal iframe
   * on this page (site remains visible underneath), not a full-page leave.
   */
  function toOverlayCheckoutUrl(rawUrl, Dodo) {
    var url = String(rawUrl || '').trim();
    if (!url) return url;
    try {
      if (Dodo && Dodo.Checkout && typeof Dodo.Checkout.buildUrl === 'function') {
        return Dodo.Checkout.buildUrl(url) || url;
      }
    } catch (e) {}
    try {
      var u = new URL(url);
      var parts = u.pathname.split('/').filter(Boolean);
      if (parts[0] === 'overlay' || parts[0] === 'inline') return url;
      /* /session/cks_… → /overlay/session/cks_… */
      if (parts[0] === 'session' && parts[1]) {
        u.pathname = '/overlay/session/' + parts[1];
        return u.toString();
      }
      /* bare session id path variants */
      if (parts.length === 1 && /^cks_/.test(parts[0])) {
        u.pathname = '/overlay/session/' + parts[0];
        return u.toString();
      }
    } catch (e2) {}
    return url;
  }

  function ensureDodoInitialized(Dodo, mode) {
    if (sdkInitialized) return;
    Dodo.Initialize({
      mode: mode || 'live',
      displayType: 'overlay',
      onEvent: function (ev) {
        var t = (ev && (ev.event_type || ev.type)) || '';
        if (
          t === 'checkout.opened' ||
          t === 'checkout.form_ready' ||
          t === 'checkout.payment_page_opened'
        ) {
          hideStatus();
          setBusy(pendingTriggerBtn, false);
        }
        if (t === 'checkout.closed') {
          hideStatus();
          setBusy(pendingTriggerBtn, false);
          inflight = false;
          pendingTriggerBtn = null;
        }
        if (t === 'checkout.error') {
          showStatus(
            'Checkout error',
            (ev.data && ev.data.message) || 'Try again',
            true
          );
          setBusy(pendingTriggerBtn, false);
          inflight = false;
        }
        /* After pay, Dodo may navigate this tab to return_url (success page). */
        if (t === 'checkout.redirect') {
          hideStatus();
        }
      },
    });
    sdkInitialized = true;
  }

  function ensureStatus() {
    var el = document.getElementById('xf-checkout-status');
    var isDark = getSiteTheme() === 'dark';
    if (el) {
      el.setAttribute('data-theme', isDark ? 'dark' : 'light');
      return el;
    }
    el = document.createElement('div');
    el.id = 'xf-checkout-status';
    el.setAttribute('role', 'status');
    el.setAttribute('data-theme', isDark ? 'dark' : 'light');
    el.style.cssText =
      'position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.4);padding:1rem';
    el.innerHTML =
      '<div id="xf-checkout-status-card" style="background:#fff;color:#0a0a0a;border-radius:1rem;padding:1.25rem 1.5rem;max-width:20rem;text-align:center;font:600 0.95rem/1.4 Inter,system-ui,sans-serif;border:1px solid #e5e7eb">' +
      '<p id="xf-checkout-status-title" style="margin:0">Opening checkout…</p>' +
      '<p id="xf-checkout-status-msg" style="margin:.5rem 0 0;font-weight:400;font-size:.8rem;color:#52525b"></p>' +
      '<button type="button" id="xf-checkout-status-close" style="display:none;margin-top:1rem;padding:.5rem 1rem;border-radius:999px;border:1px solid #e5e7eb;background:#f4f4f5;color:#0a0a0a;cursor:pointer">Close</button>' +
      '</div>';
    document.body.appendChild(el);
    document.getElementById('xf-checkout-status-close').onclick = hideStatus;
    return el;
  }

  function paintStatusTheme() {
    var el = document.getElementById('xf-checkout-status');
    var card = document.getElementById('xf-checkout-status-card');
    var msg = document.getElementById('xf-checkout-status-msg');
    var closeBtn = document.getElementById('xf-checkout-status-close');
    if (!el || !card) return;
    var isDark = getSiteTheme() === 'dark';
    el.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      card.style.background = '#141816';
      card.style.color = '#f2f5f3';
      card.style.borderColor = '#2a312e';
      if (msg) msg.style.color = '#9ca3af';
      if (closeBtn) {
        closeBtn.style.background = '#1f2623';
        closeBtn.style.color = '#f2f5f3';
        closeBtn.style.borderColor = '#2a312e';
      }
    } else {
      card.style.background = '#fff';
      card.style.color = '#0a0a0a';
      card.style.borderColor = '#e5e7eb';
      if (msg) msg.style.color = '#52525b';
      if (closeBtn) {
        closeBtn.style.background = '#f4f4f5';
        closeBtn.style.color = '#0a0a0a';
        closeBtn.style.borderColor = '#e5e7eb';
      }
    }
  }

  function showStatus(title, msg, canClose) {
    var el = ensureStatus();
    paintStatusTheme();
    document.getElementById('xf-checkout-status-title').textContent =
      title || 'Opening checkout…';
    var m = document.getElementById('xf-checkout-status-msg');
    m.textContent = msg || '';
    document.getElementById('xf-checkout-status-close').style.display = canClose
      ? 'inline-block'
      : 'none';
    el.style.display = 'flex';
  }

  function hideStatus() {
    var el = document.getElementById('xf-checkout-status');
    if (el) el.style.display = 'none';
    inflight = false;
    document.querySelectorAll('[data-checkout-plan][disabled]').forEach(function (btn) {
      btn.disabled = false;
      if (btn.dataset.xfLabel) {
        btn.textContent = btn.dataset.xfLabel;
        delete btn.dataset.xfLabel;
      }
    });
  }

  function setBusy(btn, busy) {
    if (!btn) return;
    if (busy) {
      if (!btn.dataset.xfLabel) btn.dataset.xfLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Opening…';
    } else {
      btn.disabled = false;
      if (btn.dataset.xfLabel) {
        btn.textContent = btn.dataset.xfLabel;
        delete btn.dataset.xfLabel;
      }
    }
  }

  function requireLogin() {
    var auth = global.XFreezeAuth;
    if (!auth || !auth.isConfigured || !auth.isConfigured()) return false;
    if (auth.isLoggedIn && auth.isLoggedIn()) return false;
    try {
      sessionStorage.setItem(
        'xf-auth-redirect',
        (window.location.pathname.split('/').pop() || 'pricing') +
          window.location.search +
          window.location.hash
      );
    } catch (e) {}
    if (auth.rememberRedirect) auth.rememberRedirect();
    window.location.href = 'login';
    return true;
  }

  async function startCheckout(product, triggerBtn) {
    if (!product || product.type !== 'subscription') {
      showStatus('Unavailable', 'Only Pro subscriptions are available.', true);
      return;
    }
    if (inflight) return;
    inflight = true;
    if (requireLogin()) {
      inflight = false;
      return;
    }

    pendingTriggerBtn = triggerBtn || null;
    setBusy(triggerBtn, true);
    showStatus('Opening checkout…', 'Please wait');

    try {
      var cfg = await fetchConfig();
      if (!cfg.dodo && !cfg.payments) {
        throw new Error(
          'Payments not configured. Add your Dodo live key in Vercel.'
        );
      }

      var token = getAccessToken();
      if (!token) {
        inflight = false;
        if (requireLogin()) return;
        throw new Error('Sign in required before purchasing');
      }

      var email = getSessionEmail();
      if (!email) {
        inflight = false;
        setBusy(triggerBtn, false);
        showStatus(
          'Email required',
          'Your account has no email (common with X login). Add one under Account settings, or sign in with Google / email, then try again.',
          true
        );
        return;
      }

      try {
        sessionStorage.setItem('xf_pending_product', JSON.stringify(product));
        sessionStorage.setItem('xf_checkout_started_at', String(Date.now()));
        var leaf = (global.location.pathname || '')
          .split('/')
          .pop()
          .replace(/\.html$/, '');
        if (leaf && leaf !== 'checkout-success') {
          sessionStorage.setItem('xf_checkout_return', leaf);
        }
      } catch (e) {}

      var siteTheme = getSiteTheme();
      var res = await fetch(apiBase + '/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          planId: product.id,
          email: email,
          returnUrl: successUrl(product.id),
          theme: siteTheme,
        }),
      });
      var data = await res.json().catch(function () {
        return {};
      });
      if (!res.ok) throw new Error(data.error || 'Could not create checkout');
      if (!data.checkoutUrl) throw new Error('No checkout URL returned');

      var Dodo = await loadDodoSdk();
      ensureDodoInitialized(Dodo, dodoModeFromConfig(cfg));

      var overlayUrl = toOverlayCheckoutUrl(data.checkoutUrl, Dodo);
      var openResult = Dodo.Checkout.open({
        checkoutUrl: overlayUrl,
        options: {
          showTimer: true,
          showSecurityBadge: true,
        },
      });
      /* open() may be sync or return a Promise depending on SDK version */
      if (openResult && typeof openResult.then === 'function') {
        await openResult;
      }

      /* Overlay should be on top of pricing; never navigate this tab to Dodo. */
      setTimeout(function () {
        try {
          if (Dodo.Checkout.isOpen && Dodo.Checkout.isOpen()) {
            hideStatus();
            setBusy(triggerBtn, false);
            return;
          }
        } catch (e) {}
        /* Still hide spinner so the site is not stuck under a fake loading sheet */
        hideStatus();
        setBusy(triggerBtn, false);
      }, 1200);
    } catch (err) {
      inflight = false;
      setBusy(triggerBtn, false);
      pendingTriggerBtn = null;
      console.error('[xf-checkout] overlay failed', err);
      showStatus(
        'Could not open checkout',
        (err && err.message) || 'Try again in a moment.',
        true
      );
    }
  }

  function openSubscription(planId, triggerBtn) {
    var plan =
      global.XFreezeProducts && global.XFreezeProducts.getSubscription(planId);
    if (!plan) {
      showStatus('Unknown plan', 'Choose monthly or yearly.', true);
      return;
    }
    return startCheckout(plan, triggerBtn);
  }

  function open(product, triggerBtn) {
    return startCheckout(product, triggerBtn);
  }

  /* ── Payment confirmed overlay (on top of live site) ───────────── */

  function injectPayResultStyles() {
    if (document.getElementById('xf-pay-result-css')) return;
    var css = document.createElement('style');
    css.id = 'xf-pay-result-css';
    css.textContent =
      '#xf-pay-result{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;padding:1.25rem;background:rgba(10,12,14,.48);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}' +
      '#xf-pay-result.is-open{display:flex}' +
      '#xf-pay-result .xf-pr-card{position:relative;width:100%;max-width:22.5rem;background:#fff;color:#0a0a0a;border-radius:1.35rem;padding:2.25rem 1.75rem 1.75rem;text-align:center;box-shadow:0 24px 64px -20px rgba(0,0,0,.22),0 0 0 1px rgba(0,0,0,.04);overflow:hidden;font-family:var(--font-sans,Inter,system-ui,sans-serif)}' +
      'html.dark #xf-pay-result .xf-pr-card{background:#141816;color:#f2f5f3;box-shadow:0 24px 64px -16px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06)}' +
      '#xf-pay-result .xf-pr-icon{position:relative;width:7.5rem;height:7.5rem;margin:.25rem auto 1.35rem;display:flex;align-items:center;justify-content:center}' +
      '#xf-pay-result .xf-pr-badge{position:relative;z-index:1;width:4.5rem;height:4.5rem;border-radius:50%;background:linear-gradient(160deg,#4ade80 0%,#22c55e 45%,#16a34a 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 28px rgba(34,197,94,.18),0 0 0 8px rgba(34,197,94,.18)}' +
      '#xf-pay-result.is-error .xf-pr-badge{background:linear-gradient(160deg,#f87171,#ef4444);box-shadow:0 10px 28px rgba(239,68,68,.2),0 0 0 8px rgba(239,68,68,.12)}' +
      '#xf-pay-result.is-loading .xf-pr-badge{background:linear-gradient(160deg,#a3a3a3,#737373);box-shadow:0 0 0 8px rgba(115,115,115,.12);animation:xf-pr-pulse 1.1s ease-in-out infinite}' +
      '#xf-pay-result .xf-pr-badge svg{width:2.1rem;height:2.1rem;stroke:#fff;stroke-width:2.75;fill:none;stroke-linecap:round;stroke-linejoin:round}' +
      '#xf-pay-result .xf-pr-label{margin:0 0 .35rem;font-size:.8125rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:#6b7280}' +
      'html.dark #xf-pay-result .xf-pr-label{color:#9ca3af}' +
      '#xf-pay-result .xf-pr-title{margin:0 0 .5rem;font-size:1.5rem;font-weight:600;letter-spacing:-.03em;line-height:1.25}' +
      '#xf-pay-result.is-success .xf-pr-title{color:#16a34a}' +
      'html.dark #xf-pay-result.is-success .xf-pr-title{color:#4ade80}' +
      '#xf-pay-result .xf-pr-msg{margin:0 auto;max-width:18rem;font-size:.9375rem;line-height:1.5;color:#6b7280;font-weight:400}' +
      'html.dark #xf-pay-result .xf-pr-msg{color:#9ca3af}' +
      '#xf-pay-result .xf-pr-actions{display:flex;flex-wrap:wrap;gap:.65rem;justify-content:center;margin-top:1.65rem}' +
      '#xf-pay-result .xf-pr-btn{display:inline-flex;align-items:center;justify-content:center;min-height:2.65rem;padding:.6rem 1.25rem;border-radius:9999px;font-size:.875rem;font-weight:600;text-decoration:none;border:1px solid transparent;cursor:pointer}' +
      '#xf-pay-result .xf-pr-btn--primary{background:#0a0a0a;color:#fff;border:0}' +
      'html.dark #xf-pay-result .xf-pr-btn--primary{background:#f2f5f3;color:#0a0a0a}' +
      '#xf-pay-result .xf-pr-btn--ghost{background:transparent;color:inherit;border-color:#e5e7eb}' +
      'html.dark #xf-pay-result .xf-pr-btn--ghost{border-color:#2a312e}' +
      '#xf-pay-result .xf-pr-close{position:absolute;top:.85rem;right:.85rem;width:2rem;height:2rem;border:0;border-radius:999px;background:transparent;color:#9ca3af;font-size:1.25rem;line-height:1;cursor:pointer}' +
      '#xf-pay-result .xf-pr-close:hover{color:#0a0a0a}' +
      'html.dark #xf-pay-result .xf-pr-close:hover{color:#f2f5f3}' +
      '@keyframes xf-pr-pulse{0%,100%{transform:scale(1)}50%{transform:scale(.96)}}';
    document.head.appendChild(css);
  }

  function ensurePayResult() {
    injectPayResultStyles();
    var el = document.getElementById('xf-pay-result');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'xf-pay-result';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'xf-pr-title');
    el.innerHTML =
      '<div class="xf-pr-card" id="xf-pr-card">' +
      '<button type="button" class="xf-pr-close" id="xf-pr-close" aria-label="Close">&times;</button>' +
      '<div class="xf-pr-icon" aria-hidden="true">' +
      '<div class="xf-pr-badge" id="xf-pr-badge">' +
      '<svg id="xf-pr-icon-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>' +
      '<svg id="xf-pr-icon-spin" viewBox="0 0 24 24" hidden><circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,.35)" stroke-width="2.5" fill="none"></circle><path d="M12 4a8 8 0 0 1 8 8" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"></path></svg>' +
      '<svg id="xf-pr-icon-x" viewBox="0 0 24 24" hidden><path d="M7 7l10 10M17 7L7 17"></path></svg>' +
      '</div></div>' +
      '<p class="xf-pr-label" id="xf-pr-label">Please wait</p>' +
      '<h2 class="xf-pr-title" id="xf-pr-title">Confirming payment</h2>' +
      '<p class="xf-pr-msg" id="xf-pr-msg">Activating Premium on your account…</p>' +
      '<div class="xf-pr-actions" id="xf-pr-actions" hidden>' +
      '<a class="xf-pr-btn xf-pr-btn--primary" href="account" id="xf-pr-primary">Open Account</a>' +
      '<button type="button" class="xf-pr-btn xf-pr-btn--ghost" id="xf-pr-secondary">Stay here</button>' +
      '</div></div>';
    document.body.appendChild(el);
    document.getElementById('xf-pr-close').onclick = closePayResult;
    document.getElementById('xf-pr-secondary').onclick = closePayResult;
    el.addEventListener('click', function (e) {
      if (e.target === el) closePayResult();
    });
    return el;
  }

  function setPayResultIcons(mode) {
    var check = document.getElementById('xf-pr-icon-check');
    var spin = document.getElementById('xf-pr-icon-spin');
    var x = document.getElementById('xf-pr-icon-x');
    if (!check) return;
    check.hidden = mode !== 'check';
    spin.hidden = mode !== 'spin';
    x.hidden = mode !== 'x';
  }

  function setPayResultState(state) {
    var el = ensurePayResult();
    el.classList.remove('is-loading', 'is-success', 'is-error');
    if (state === 'loading') {
      el.classList.add('is-loading');
      setPayResultIcons('spin');
    } else if (state === 'success') {
      el.classList.add('is-success');
      setPayResultIcons('check');
    } else {
      el.classList.add('is-error');
      setPayResultIcons('x');
    }
  }

  function openPayResult(state, label, title, msg, actions) {
    var el = ensurePayResult();
    setPayResultState(state || 'loading');
    document.getElementById('xf-pr-label').textContent = label || '';
    document.getElementById('xf-pr-title').textContent = title || '';
    document.getElementById('xf-pr-msg').textContent = msg || '';
    var acts = document.getElementById('xf-pr-actions');
    var primary = document.getElementById('xf-pr-primary');
    var secondary = document.getElementById('xf-pr-secondary');
    if (actions && actions.primaryHref) {
      primary.href = actions.primaryHref;
      primary.textContent = actions.primaryText || 'Open Account';
      primary.hidden = false;
      secondary.textContent = actions.secondaryText || 'Stay here';
      secondary.hidden = false;
      acts.hidden = false;
    } else {
      acts.hidden = true;
    }
    el.classList.add('is-open');
    try {
      document.body.style.overflow = 'hidden';
    } catch (e) {}
  }

  function closePayResult() {
    var el = document.getElementById('xf-pay-result');
    if (el) el.classList.remove('is-open');
    try {
      document.body.style.overflow = '';
    } catch (e) {}
    /* Drop pay-return query so refresh does not re-run verify */
    try {
      var u = new URL(global.location.href);
      var keys = [
        'xf_pay',
        'provider',
        'payment_id',
        'paymentId',
        'pay_id',
        'subscription_id',
        'subscriptionId',
        'status',
        'plan',
      ];
      var dirty = false;
      keys.forEach(function (k) {
        if (u.searchParams.has(k)) {
          u.searchParams.delete(k);
          dirty = true;
        }
      });
      if (dirty) {
        global.history.replaceState({}, '', u.pathname + (u.search || '') + (u.hash || ''));
      }
    } catch (e2) {}
  }

  function planWelcomeLabel(planId) {
    var s = String(planId || '').toLowerCase();
    if (s.indexOf('studio') !== -1) return 'Welcome to Premium Plus';
    return 'Welcome to Premium';
  }

  function planDisplayName(planId) {
    var s = String(planId || '').toLowerCase();
    if (s === 'studio-yearly') return 'Premium Plus Yearly';
    if (s === 'studio-monthly') return 'Premium Plus Monthly';
    if (s === 'pro-yearly') return 'Premium Yearly';
    if (s === 'pro-monthly') return 'Premium Monthly';
    if (s.indexOf('studio') !== -1) return 'Premium Plus';
    return 'Premium';
  }

  function waitAuthToken(tries) {
    tries = tries || 0;
    var t = getAccessToken();
    if (t) return Promise.resolve(t);
    if (tries > 50) return Promise.resolve('');
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (
          tries === 5 &&
          global.XFreezeAuth &&
          typeof global.XFreezeAuth.refreshSession === 'function'
        ) {
          global.XFreezeAuth.refreshSession()
            .then(function () {
              resolve(waitAuthToken(tries + 1));
            })
            .catch(function () {
              resolve(waitAuthToken(tries + 1));
            });
          return;
        }
        resolve(waitAuthToken(tries + 1));
      }, 200);
    });
  }

  function isPaymentReturn() {
    try {
      var p = new URLSearchParams(global.location.search || '');
      if (p.get('xf_pay') === '1') return true;
      if (p.get('provider') === 'dodo' && (p.get('plan') || p.get('payment_id') || p.get('paymentId'))) {
        return true;
      }
      if (p.get('payment_id') || p.get('paymentId') || p.get('subscription_id')) {
        return true;
      }
      var st = (p.get('status') || '').toLowerCase();
      if (st && (st === 'succeeded' || st === 'success' || st === 'active' || st === 'paid' || st === 'failed' || st === 'cancelled' || st === 'canceled')) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function handlePaymentReturn() {
    if (!isPaymentReturn()) return;
    var params = new URLSearchParams(global.location.search || '');
    var planId = params.get('plan') || '';
    var status = (params.get('status') || '').toLowerCase();
    var FAIL = {
      failed: true,
      cancelled: true,
      canceled: true,
      requires_payment_method: true,
      incomplete: true,
      error: true,
      declined: true,
      expired: true,
      on_hold: true,
    };

    openPayResult(
      'loading',
      'Please wait',
      'Confirming payment',
      'Activating Premium on your account…'
    );

    if (FAIL[status]) {
      openPayResult(
        'error',
        'Payment failed',
        'Payment not completed',
        'No charge went through. Premium was not unlocked. Try again when you are ready.',
        {
          primaryHref: 'pricing',
          primaryText: 'Back to Pricing',
          secondaryText: 'Close',
        }
      );
      return;
    }

    waitAuthToken().then(function (t) {
      if (!t) {
        try {
          sessionStorage.setItem(
            'xf-auth-redirect',
            (global.location.pathname.split('/').pop() || 'pricing').replace(
              /\.html$/,
              ''
            ) +
              global.location.search
          );
        } catch (e) {}
        openPayResult(
          'error',
          'Sign in required',
          'Sign in to finish',
          'Sign in with the same account you used at checkout, then we will finish activating Premium if payment succeeded.',
          {
            primaryHref: 'login',
            primaryText: 'Sign in',
            secondaryText: 'Close',
          }
        );
        return;
      }

      var paymentId =
        params.get('payment_id') ||
        params.get('paymentId') ||
        params.get('pay_id') ||
        '';
      var checkoutStarted = 0;
      try {
        checkoutStarted = Number(
          sessionStorage.getItem('xf_checkout_started_at') || 0
        );
      } catch (e2) {}

      return fetch(apiBase + '/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + t,
        },
        body: JSON.stringify({
          planId: planId || undefined,
          payment_id: paymentId || undefined,
          subscription_id:
            params.get('subscription_id') ||
            params.get('subscriptionId') ||
            undefined,
          checkout_status: status || undefined,
          checkout_started_at: checkoutStarted || undefined,
        }),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { r: r, data: data };
          });
        })
        .then(function (pair) {
          var data = pair.data || {};
          var paidOk =
            pair.r.ok &&
            data.success === true &&
            data.granted === true &&
            data.code !== 'payment_failed' &&
            data.code !== 'payment_not_paid' &&
            data.code !== 'no_payment';

          if (!paidOk) {
            openPayResult(
              'error',
              'Payment failed',
              'Payment not completed',
              (data && data.error) ||
                'We could not confirm a successful payment. Premium was not unlocked.',
              {
                primaryHref: 'pricing',
                primaryText: 'Try again',
                secondaryText: 'Close',
              }
            );
            return;
          }

          if (data.entitlement && global.XFreezeEntitlement) {
            try {
              global.XFreezeEntitlement.applyServerEntitlement(data.entitlement);
            } catch (e3) {}
          }

          var resolved = data.planId || planId;
          var planLabel = planDisplayName(resolved);
          openPayResult(
            'success',
            'Payment confirmed',
            planWelcomeLabel(resolved),
            planLabel +
              ' is active. Full templates, skills, and library access are unlocked.',
            {
              primaryHref: 'account',
              primaryText: 'Open Account',
              secondaryText: 'Stay here',
            }
          );

          /* Refresh pricing CTA labels if present */
          try {
            if (typeof global.bootPricingPlanUi === 'function') {
              global.bootPricingPlanUi();
            }
          } catch (e4) {}
          try {
            global.dispatchEvent(new CustomEvent('xf-access-ready'));
          } catch (e5) {}
        })
        .catch(function (err) {
          openPayResult(
            'error',
            'Could not confirm',
            'Could not confirm payment',
            (err && err.message) ||
              'We could not verify this checkout. If you were charged, contact support with your email.',
            {
              primaryHref: 'pricing',
              primaryText: 'Back to Pricing',
              secondaryText: 'Close',
            }
          );
        });
    });
  }

  /* Warm SDK on pricing so the first click opens overlay faster */
  function warmSdk() {
    fetchConfig()
      .then(function (cfg) {
        if (!cfg || (!cfg.dodo && !cfg.payments)) return null;
        return loadDodoSdk().then(function (Dodo) {
          ensureDodoInitialized(Dodo, dodoModeFromConfig(cfg));
          return Dodo;
        });
      })
      .catch(function () {});
  }

  function boot() {
    warmSdk();
    handlePaymentReturn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.XFreezeCheckout = {
    open: open,
    close: hideStatus,
    openSubscription: openSubscription,
    openBundle: function () {
      showStatus('Unavailable', 'Choose a Pro plan.', true);
    },
    openTemplate: function () {
      showStatus('Unavailable', 'Choose a Pro plan.', true);
    },
    openCustom: function () {
      showStatus('Unavailable', 'Choose a Pro plan.', true);
    },
    setApiBase: function (url) {
      apiBase = String(url || '').replace(/\/$/, '');
      config = null;
    },
    getApiBase: function () {
      return apiBase;
    },
    handlePaymentReturn: handlePaymentReturn,
    closePayResult: closePayResult,
    offline: false,
  };
})(window);
