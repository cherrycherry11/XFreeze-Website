/**
 * X Freeze checkout — Dodo Payments Overlay
 *
 * Click plan → create session → open Dodo overlay modal on this page
 * (user stays on xfreeze.com; no full-page leave until payment redirect).
 */
(function (global) {
  var SDK_CDN =
    'https://cdn.jsdelivr.net/npm/dodopayments-checkout@latest/dist/index.js';
  var sdkLoadPromise = null;
  var sdkInitialized = false;
  var pendingPlanId = '';

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

  let apiBase = resolveDefaultApiBase();
  let config = null;
  let inflight = false;

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

  function getDodoApi() {
    /* CDN build: DodoPaymentsCheckout.DodoPayments
       ESM/global variants: DodoPayments */
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
      var existing = document.querySelector('script[data-xf-dodo-checkout]');
      if (existing) {
        var wait = 0;
        var t = setInterval(function () {
          wait += 50;
          if (getDodoApi()) {
            clearInterval(t);
            resolve(getDodoApi());
          } else if (wait > 10000) {
            clearInterval(t);
            reject(new Error('Dodo Checkout SDK timed out'));
          }
        }, 50);
        return;
      }

      var s = document.createElement('script');
      s.src = SDK_CDN;
      s.async = true;
      s.setAttribute('data-xf-dodo-checkout', '1');
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

  function handleCheckoutEvent(event) {
    var type = (event && (event.event_type || event.type)) || '';
    switch (type) {
      case 'checkout.opened':
      case 'checkout.form_ready':
        hideStatusOverlay();
        break;
      case 'checkout.closed':
        inflight = false;
        resetBusyButtons();
        hideStatusOverlay();
        break;
      case 'checkout.error':
        inflight = false;
        resetBusyButtons();
        showStatusError(
          (event.data && event.data.message) ||
            'Checkout error. Please try again.'
        );
        break;
      case 'checkout.link_expired':
        inflight = false;
        resetBusyButtons();
        showStatusError('This checkout session expired. Please try again.');
        break;
      case 'checkout.redirect':
        /* Payment complete or forced navigation — leave overlay state clean */
        hideStatusOverlay();
        break;
      default:
        break;
    }
  }

  function ensureSdkInitialized(cfg) {
    return loadDodoSdk().then(function (Dodo) {
      if (!sdkInitialized) {
        Dodo.Initialize({
          mode: dodoModeFromConfig(cfg),
          displayType: 'overlay',
          onEvent: handleCheckoutEvent,
        });
        sdkInitialized = true;
      }
      return Dodo;
    });
  }

  function requireLoginForCheckout() {
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

  function ensureStatusOverlay() {
    var el = document.getElementById('xf-checkout-redirect');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'xf-checkout-redirect';
    el.className = 'xf-checkout-redirect';
    el.hidden = true;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML =
      '<div class="xf-checkout-redirect__card">' +
      '<p class="xf-checkout-redirect__title">Opening secure payment…</p>' +
      '<p class="xf-checkout-redirect__sub">Dodo Payments · stays on this page</p>' +
      '<p class="xf-checkout-redirect__error" id="xf-checkout-redirect-error" hidden></p>' +
      '<button type="button" class="xf-checkout-redirect__retry" id="xf-checkout-redirect-close" hidden>Close</button>' +
      '</div>';
    document.body.appendChild(el);
    var closeBtn = document.getElementById('xf-checkout-redirect-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideStatusOverlay);
    }
    return el;
  }

  function showStatusOverlay(msg) {
    var el = ensureStatusOverlay();
    var err = document.getElementById('xf-checkout-redirect-error');
    var closeBtn = document.getElementById('xf-checkout-redirect-close');
    var title = el.querySelector('.xf-checkout-redirect__title');
    if (title) title.textContent = msg || 'Opening secure payment…';
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
    if (closeBtn) closeBtn.hidden = true;
    el.hidden = false;
    el.classList.add('is-open');
  }

  function showStatusError(message) {
    var el = ensureStatusOverlay();
    var err = document.getElementById('xf-checkout-redirect-error');
    var closeBtn = document.getElementById('xf-checkout-redirect-close');
    var title = el.querySelector('.xf-checkout-redirect__title');
    if (title) title.textContent = 'Could not start checkout';
    if (err) {
      err.hidden = false;
      err.textContent = message || 'Try again in a moment.';
    }
    if (closeBtn) closeBtn.hidden = false;
    el.hidden = false;
    el.classList.add('is-open');
  }

  function hideStatusOverlay() {
    var el = document.getElementById('xf-checkout-redirect');
    if (!el) return;
    el.classList.remove('is-open');
    el.hidden = true;
  }

  function resetBusyButtons() {
    document.querySelectorAll('[data-checkout-plan][disabled]').forEach(function (btn) {
      btn.disabled = false;
      if (btn.dataset.xfLabel) {
        btn.textContent = btn.dataset.xfLabel;
        delete btn.dataset.xfLabel;
      }
    });
  }

  function setButtonBusy(btn, busy) {
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

  function openOverlayCheckout(Dodo, checkoutUrl) {
    return Promise.resolve(
      Dodo.Checkout.open({
        checkoutUrl: checkoutUrl,
        options: {
          showTimer: true,
          showSecurityBadge: true,
        },
      })
    );
  }

  /**
   * Create Dodo session and open overlay modal on this page.
   * Falls back to full-page redirect if the overlay SDK fails.
   */
  async function startDodoCheckout(product, triggerBtn) {
    if (!product || product.type !== 'subscription') {
      showStatusError('Only Pro subscriptions are available right now.');
      return;
    }
    if (inflight) return;
    inflight = true;
    pendingPlanId = product.id || '';

    if (requireLoginForCheckout()) {
      inflight = false;
      return;
    }

    setButtonBusy(triggerBtn, true);
    showStatusOverlay('Opening secure payment…');

    try {
      var cfg = await fetchConfig();
      if (!cfg.dodo) {
        throw new Error(
          'Payments are not configured yet. Please try again later or contact support.'
        );
      }

      var token = getAccessToken();
      if (!token) {
        inflight = false;
        if (requireLoginForCheckout()) return;
        throw new Error('Sign in required before purchasing');
      }

      try {
        sessionStorage.setItem('xf_pending_product', JSON.stringify(product));
      } catch (e) {}

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
        }),
      });
      var data = await res.json().catch(function () {
        return {};
      });
      if (!res.ok) {
        throw new Error(data.error || 'Could not create checkout');
      }
      if (!data.checkoutUrl) {
        throw new Error('No checkout URL returned');
      }

      try {
        var Dodo = await ensureSdkInitialized(cfg);
        await openOverlayCheckout(Dodo, data.checkoutUrl);
        /* Overlay owns the UI; drop our spinner once open event fires.
           Also hide soon in case opened event is delayed. */
        setTimeout(function () {
          hideStatusOverlay();
          setButtonBusy(triggerBtn, false);
        }, 400);
      } catch (overlayErr) {
        console.warn(
          '[xf-checkout] Overlay failed, falling back to hosted page',
          overlayErr
        );
        showStatusOverlay('Opening payment page…');
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      inflight = false;
      setButtonBusy(triggerBtn, false);
      showStatusError((err && err.message) || 'Checkout failed');
    }
  }

  function open(product, triggerBtn) {
    if (product && product.type === 'subscription') {
      return startDodoCheckout(product, triggerBtn);
    }
    showStatusError('Only Pro subscriptions are available right now.');
  }

  function openSubscription(planId, triggerBtn) {
    var plan =
      global.XFreezeProducts && global.XFreezeProducts.getSubscription(planId);
    if (!plan) {
      showStatusError('Unknown plan. Choose monthly or yearly.');
      return;
    }
    return startDodoCheckout(plan, triggerBtn);
  }

  function openBundle() {
    showStatusError('Bundle checkout is not available. Choose a Pro plan.');
  }

  function openTemplate() {
    showStatusError('Template checkout is not available. Choose a Pro plan.');
  }

  function openCustom() {
    showStatusError('Custom payments are not available. Choose a Pro plan.');
  }

  function setApiBase(url) {
    apiBase = String(url || '').replace(/\/$/, '');
    config = null;
  }

  function close() {
    try {
      var Dodo = getDodoApi();
      if (Dodo && Dodo.Checkout && Dodo.Checkout.close) Dodo.Checkout.close();
    } catch (e) {}
    hideStatusOverlay();
    inflight = false;
    resetBusyButtons();
  }

  global.XFreezeCheckout = {
    open: open,
    close: close,
    openBundle: openBundle,
    openSubscription: openSubscription,
    openTemplate: openTemplate,
    openCustom: openCustom,
    setApiBase: setApiBase,
    getApiBase: function () {
      return apiBase;
    },
    startDodoCheckout: startDodoCheckout,
    payWithDodo: function () {},
    payWithRazorpay: function () {},
  };
})(window);
