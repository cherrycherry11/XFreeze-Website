/**
 * X Freeze checkout — Dodo Payments (direct redirect)
 *
 * Click plan → create session → jump to Dodo checkout_url.
 * No intermediate website payment UI.
 */
(function (global) {
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

  function ensureRedirectOverlay() {
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
      '<p class="xf-checkout-redirect__title">Taking you to secure payment…</p>' +
      '<p class="xf-checkout-redirect__sub">Dodo Payments · encrypted checkout</p>' +
      '<p class="xf-checkout-redirect__error" id="xf-checkout-redirect-error" hidden></p>' +
      '<button type="button" class="xf-checkout-redirect__retry" id="xf-checkout-redirect-close" hidden>Close</button>' +
      '</div>';
    document.body.appendChild(el);
    var closeBtn = document.getElementById('xf-checkout-redirect-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideRedirectOverlay);
    }
    return el;
  }

  function showRedirectOverlay(msg) {
    var el = ensureRedirectOverlay();
    var err = document.getElementById('xf-checkout-redirect-error');
    var closeBtn = document.getElementById('xf-checkout-redirect-close');
    var title = el.querySelector('.xf-checkout-redirect__title');
    if (title) title.textContent = msg || 'Taking you to secure payment…';
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
    if (closeBtn) closeBtn.hidden = true;
    el.hidden = false;
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function showRedirectError(message) {
    var el = ensureRedirectOverlay();
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
    document.body.style.overflow = 'hidden';
  }

  function hideRedirectOverlay() {
    var el = document.getElementById('xf-checkout-redirect');
    if (!el) return;
    el.classList.remove('is-open');
    el.hidden = true;
    document.body.style.overflow = '';
    inflight = false;
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
      btn.textContent = 'Redirecting…';
    } else {
      btn.disabled = false;
      if (btn.dataset.xfLabel) {
        btn.textContent = btn.dataset.xfLabel;
        delete btn.dataset.xfLabel;
      }
    }
  }

  /**
   * Create Dodo session and hard-redirect. No email form / intermediate UI.
   * @param {object} product
   * @param {HTMLElement} [triggerBtn]
   */
  async function startDodoCheckout(product, triggerBtn) {
    if (!product || product.type !== 'subscription') {
      showRedirectError('Only Pro subscriptions are available right now.');
      return;
    }
    if (inflight) return;
    inflight = true;

    if (requireLoginForCheckout()) {
      inflight = false;
      return;
    }

    setButtonBusy(triggerBtn, true);
    showRedirectOverlay('Taking you to secure payment…');

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

      showRedirectOverlay('Opening Dodo checkout…');
      window.location.href = data.checkoutUrl;
    } catch (err) {
      inflight = false;
      setButtonBusy(triggerBtn, false);
      showRedirectError((err && err.message) || 'Checkout failed');
    }
  }

  function open(product, triggerBtn) {
    if (product && product.type === 'subscription') {
      return startDodoCheckout(product, triggerBtn);
    }
    showRedirectError('Only Pro subscriptions are available right now.');
  }

  function openSubscription(planId, triggerBtn) {
    var plan =
      global.XFreezeProducts && global.XFreezeProducts.getSubscription(planId);
    if (!plan) {
      showRedirectError('Unknown plan. Choose monthly or yearly.');
      return;
    }
    return startDodoCheckout(plan, triggerBtn);
  }

  function openBundle(bundleId) {
    showRedirectError('Bundle checkout is not available. Choose a Pro plan.');
  }

  function openTemplate() {
    showRedirectError('Template checkout is not available. Choose a Pro plan.');
  }

  function openCustom() {
    showRedirectError('Custom payments are not available. Choose a Pro plan.');
  }

  function setApiBase(url) {
    apiBase = String(url || '').replace(/\/$/, '');
    config = null;
  }

  function close() {
    hideRedirectOverlay();
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
    payWithDodo: function () {
      /* legacy no-op — payments go straight to Dodo */
    },
    payWithRazorpay: function () {},
  };
})(window);
