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

  /* ── Payment result overlay (Grok-minimal) ───────────────────── */

  function injectPayResultStyles() {
    if (document.getElementById('xf-pay-result-css')) return;
    var css = document.createElement('style');
    css.id = 'xf-pay-result-css';
    css.textContent =
      /* Backdrop: soft dim, light blur — product stays visible */
      '#xf-pay-result{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;padding:1.25rem;background:rgba(0,0,0,.42);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
      '#xf-pay-result.is-open{display:flex}' +
      /* Card: compact, flat, thin border — Grok-like */
      '#xf-pay-result .xf-pr-card{position:relative;width:100%;max-width:20rem;background:#fafafa;color:#0a0a0a;border-radius:1rem;padding:1.75rem 1.5rem 1.35rem;text-align:center;border:1px solid rgba(0,0,0,.08);box-shadow:0 16px 48px -20px rgba(0,0,0,.35);font-family:var(--font-sans,Inter,system-ui,sans-serif)}' +
      'html.dark #xf-pay-result .xf-pr-card{background:#111;color:#f2f2f2;border-color:rgba(255,255,255,.1);box-shadow:0 20px 56px -16px rgba(0,0,0,.7)}' +
      /* Icon row — small, flat circle, no glow rings */
      '#xf-pay-result .xf-pr-icon{width:3rem;height:3rem;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center}' +
      '#xf-pay-result .xf-pr-badge{width:2.75rem;height:2.75rem;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid transparent}' +
      '#xf-pay-result .xf-pr-badge svg{width:1.15rem;height:1.15rem;stroke-width:2.25;fill:none;stroke-linecap:round;stroke-linejoin:round;display:none}' +
      '#xf-pay-result .xf-pr-badge svg.is-on{display:block}' +
      /* Success: quiet green, no gradient party */
      '#xf-pay-result.is-success .xf-pr-badge{background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.28)}' +
      '#xf-pay-result.is-success .xf-pr-badge svg{stroke:#16a34a}' +
      'html.dark #xf-pay-result.is-success .xf-pr-badge{background:rgba(34,197,94,.14);border-color:rgba(74,222,128,.25)}' +
      'html.dark #xf-pay-result.is-success .xf-pr-badge svg{stroke:#4ade80}' +
      '#xf-pay-result.is-success .xf-pr-label{color:#52525b}' +
      'html.dark #xf-pay-result.is-success .xf-pr-label{color:#a3a3a3}' +
      /* Error: quiet red */
      '#xf-pay-result.is-error .xf-pr-badge{background:rgba(239,68,68,.1);border-color:rgba(239,68,68,.28)}' +
      '#xf-pay-result.is-error .xf-pr-badge svg{stroke:#dc2626}' +
      'html.dark #xf-pay-result.is-error .xf-pr-badge{background:rgba(239,68,68,.12);border-color:rgba(248,113,113,.28)}' +
      'html.dark #xf-pay-result.is-error .xf-pr-badge svg{stroke:#f87171}' +
      '#xf-pay-result.is-error .xf-pr-label{color:#52525b}' +
      'html.dark #xf-pay-result.is-error .xf-pr-label{color:#a3a3a3}' +
      /* Loading */
      '#xf-pay-result.is-loading .xf-pr-badge{background:rgba(0,0,0,.04);border-color:rgba(0,0,0,.1)}' +
      'html.dark #xf-pay-result.is-loading .xf-pr-badge{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}' +
      '#xf-pay-result.is-loading .xf-pr-badge svg{stroke:#737373}' +
      'html.dark #xf-pay-result.is-loading .xf-pr-badge svg{stroke:#a3a3a3}' +
      '#xf-pay-result.is-loading .xf-pr-badge{animation:xf-pr-pulse 1.15s ease-in-out infinite}' +
      /* Type: quiet, tight */
      '#xf-pay-result .xf-pr-label{margin:0 0 .3rem;font-size:.7rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:#737373}' +
      'html.dark #xf-pay-result .xf-pr-label{color:#a3a3a3}' +
      '#xf-pay-result .xf-pr-title{margin:0 0 .4rem;font-size:1.125rem;font-weight:600;letter-spacing:-.025em;line-height:1.3;color:inherit}' +
      '#xf-pay-result .xf-pr-msg{margin:0 auto;max-width:16.5rem;font-size:.8125rem;line-height:1.5;color:#737373;font-weight:400}' +
      'html.dark #xf-pay-result .xf-pr-msg{color:#a3a3a3}' +
      /* Actions: slim pills */
      '#xf-pay-result .xf-pr-actions{display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center;margin-top:1.25rem}' +
      '#xf-pay-result .xf-pr-btn{display:inline-flex;align-items:center;justify-content:center;height:2rem;min-height:2rem;padding:0 .95rem;border-radius:9999px;font-size:.8125rem;font-weight:500;text-decoration:none;border:1px solid transparent;cursor:pointer;font-family:inherit;line-height:1}' +
      '#xf-pay-result .xf-pr-btn--primary{background:#0a0a0a;color:#fff;border:0}' +
      'html.dark #xf-pay-result .xf-pr-btn--primary{background:#f2f2f2;color:#0a0a0a}' +
      '#xf-pay-result .xf-pr-btn--primary:hover{opacity:.9}' +
      '#xf-pay-result .xf-pr-btn--ghost{background:transparent;color:inherit;border-color:rgba(0,0,0,.12)}' +
      'html.dark #xf-pay-result .xf-pr-btn--ghost{border-color:rgba(255,255,255,.14)}' +
      '#xf-pay-result .xf-pr-btn--ghost:hover{background:rgba(0,0,0,.04)}' +
      'html.dark #xf-pay-result .xf-pr-btn--ghost:hover{background:rgba(255,255,255,.06)}' +
      /* Close */
      '#xf-pay-result .xf-pr-close{position:absolute;top:.55rem;right:.55rem;width:1.75rem;height:1.75rem;border:0;border-radius:999px;background:transparent;color:#a3a3a3;font-size:1.05rem;line-height:1;cursor:pointer}' +
      '#xf-pay-result .xf-pr-close:hover{color:#0a0a0a;background:rgba(0,0,0,.05)}' +
      'html.dark #xf-pay-result .xf-pr-close:hover{color:#f2f2f2;background:rgba(255,255,255,.06)}' +
      '@keyframes xf-pr-pulse{0%,100%{opacity:1}50%{opacity:.65}}' +
      '@media (prefers-reduced-motion:reduce){#xf-pay-result.is-loading .xf-pr-badge{animation:none}}';
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
      '<svg id="xf-pr-icon-check" class="xf-pr-ico" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M5 13l4 4L19 7"></path></svg>' +
      '<svg id="xf-pr-icon-spin" class="xf-pr-ico" viewBox="0 0 24 24" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-opacity=".25" stroke-width="2" fill="none"></circle>' +
      '<path d="M12 4a8 8 0 0 1 8 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>' +
      '<svg id="xf-pr-icon-x" class="xf-pr-ico" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"></path></svg>' +
      '</div></div>' +
      '<p class="xf-pr-label" id="xf-pr-label">Please wait</p>' +
      '<h2 class="xf-pr-title" id="xf-pr-title">Confirming payment</h2>' +
      '<p class="xf-pr-msg" id="xf-pr-msg">Activating your plan…</p>' +
      '<div class="xf-pr-actions" id="xf-pr-actions" hidden>' +
      '<a class="xf-pr-btn xf-pr-btn--primary" href="account" id="xf-pr-primary">Open Account</a>' +
      '<button type="button" class="xf-pr-btn xf-pr-btn--ghost" id="xf-pr-secondary">Close</button>' +
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
    if (!check || !spin || !x) return;
    check.classList.toggle('is-on', mode === 'check');
    spin.classList.toggle('is-on', mode === 'spin');
    x.classList.toggle('is-on', mode === 'x');
    check.setAttribute('aria-hidden', mode === 'check' ? 'false' : 'true');
    spin.setAttribute('aria-hidden', mode === 'spin' ? 'false' : 'true');
    x.setAttribute('aria-hidden', mode === 'x' ? 'false' : 'true');
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
      secondary.textContent = actions.secondaryText || 'Close';
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
    if (s.indexOf('studio') !== -1) return "You're on Premium Plus";
    return "You're on Premium";
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
      if (
        st &&
        (st === 'succeeded' ||
          st === 'success' ||
          st === 'active' ||
          st === 'paid' ||
          st === 'failed' ||
          st === 'cancelled' ||
          st === 'canceled')
      ) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function paymentFailedUi(kind, serverMsg) {
    var cancelled = kind === 'cancelled' || kind === 'canceled';
    if (cancelled) {
      return {
        label: 'Cancelled',
        title: 'Checkout cancelled',
        msg: serverMsg || 'No charge was made.',
      };
    }
    return {
      label: 'Failed',
      title: 'Payment failed',
      msg:
        serverMsg ||
        'No successful payment was found. Your plan was not changed.',
    };
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
      'Activating your plan…'
    );

    if (FAIL[status]) {
      var failCopy = paymentFailedUi(status);
      openPayResult('error', failCopy.label, failCopy.title, failCopy.msg, {
        primaryHref: 'pricing',
        primaryText: 'Try again',
        secondaryText: 'Close',
      });
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
          'Sign in',
          'Sign in to finish',
          'Sign in with the same account you used at checkout.',
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
            var code = (data && data.code) || '';
            var kind =
              code === 'payment_failed' || status === 'failed'
                ? 'failed'
                : status === 'cancelled' || status === 'canceled'
                  ? 'cancelled'
                  : 'failed';
            var copy = paymentFailedUi(
              kind,
              (data && data.error) ||
                'No successful payment was found. Your plan was not changed.'
            );
            openPayResult('error', copy.label, copy.title, copy.msg, {
              primaryHref: 'pricing',
              primaryText: 'Try again',
              secondaryText: 'Close',
            });
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
            'Confirmed',
            planWelcomeLabel(resolved),
            planLabel + ' is active.',
            {
              primaryHref: 'account',
              primaryText: 'Open Account',
              secondaryText: 'Close',
            }
          );

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
            'Failed',
            'Payment failed',
            (err && err.message) ||
              'Could not verify this checkout. If you were charged, contact support.',
            {
              primaryHref: 'pricing',
              primaryText: 'Try again',
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
