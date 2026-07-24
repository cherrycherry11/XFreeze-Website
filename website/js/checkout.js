/**
 * X Freeze checkout — Dodo Payments overlay (modal on top of the site).
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

  function successUrl(planId) {
    try {
      var base =
        global.location.origin +
        global.location.pathname.replace(/[^/]+$/, '');
      return (
        base +
        'checkout-success?provider=dodo&plan=' +
        encodeURIComponent(planId || '')
      );
    } catch (e) {
      return (
        'https://xfreeze.com/checkout-success?provider=dodo&plan=' +
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

  /** Match current X Freeze theme for Dodo checkout (light | dark | system). */
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

      try {
        sessionStorage.setItem('xf_pending_product', JSON.stringify(product));
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
          email: getSessionEmail() || undefined,
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', warmSdk);
  } else {
    warmSdk();
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
    offline: false,
  };
})(window);
