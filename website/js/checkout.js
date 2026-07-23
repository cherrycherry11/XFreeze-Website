/**
 * X Freeze checkout — Dodo Payments (hosted checkout session)
 *
 * Flow: create session on server → redirect to Dodo checkout_url
 * Pro is granted via webhook + optional return_url verify.
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
  let currentProduct = null;
  let config = null;

  function getOverlay() {
    return document.getElementById('xf-checkout-overlay');
  }

  function setMessage(text, type) {
    const el = document.getElementById('xf-checkout-message');
    if (!el) return;
    el.textContent = text || '';
    el.className = 'xf-checkout-message' + (type ? ' is-' + type : '');
  }

  function formatPrice(amount) {
    if (global.XFreezeProducts) return global.XFreezeProducts.formatUSD(amount);
    const n = Number(amount);
    return '$' + (Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2));
  }

  async function fetchConfig() {
    if (config) return config;
    const res = await fetch(apiBase + '/api/config');
    if (!res.ok) throw new Error('Config request failed');
    config = await res.json();
    return config;
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

  function injectModal() {
    if (document.getElementById('xf-checkout-overlay')) return;

    const html = `
      <div id="xf-checkout-overlay" class="xf-checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="xf-checkout-title" hidden>
        <div class="xf-checkout-modal">
          <div class="xf-checkout-header">
            <div>
              <h2 id="xf-checkout-title" class="xf-checkout-title">Checkout</h2>
              <p id="xf-checkout-subtitle" class="xf-checkout-subtitle">Secure payment via Dodo</p>
            </div>
            <button type="button" class="xf-checkout-close" aria-label="Close checkout" data-xf-close>&times;</button>
          </div>
          <div class="xf-checkout-body">
            <div class="xf-checkout-summary">
              <span id="xf-checkout-product-name" class="xf-checkout-summary-name">-</span>
              <span id="xf-checkout-product-price" class="xf-checkout-summary-price">-</span>
            </div>
            <div id="xf-checkout-setup" class="xf-checkout-setup" hidden></div>
            <div id="xf-checkout-form-wrap">
              <input type="email" id="xf-checkout-email" class="xf-checkout-email" placeholder="Email" autocomplete="email">
              <label id="xf-checkout-autodebit-row" class="xf-checkout-autodebit" hidden>
                <input type="checkbox" id="xf-checkout-autodebit" checked>
                <span class="xf-checkout-autodebit__text">
                  <strong>Auto-debit / auto-renew</strong>
                  <span class="xf-checkout-autodebit__hint" id="xf-checkout-autodebit-hint">
                    Charge my card automatically each billing period. Turn off for a one-period plan (no renewal).
                  </span>
                </span>
              </label>
              <button type="button" id="xf-pay-dodo-btn" class="xf-checkout-pay-btn">Continue to payment</button>
              <p id="xf-checkout-message" class="xf-checkout-message" aria-live="polite"></p>
              <p class="xf-checkout-message" style="margin-top:0.5rem;opacity:0.75;font-size:0.8rem">
                You will complete payment on Dodo’s secure checkout page.
              </p>
            </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', html);

    const overlay = getOverlay();
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector('[data-xf-close]').addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
    document.getElementById('xf-pay-dodo-btn').addEventListener('click', payWithDodo);
  }

  function open(product) {
    if (product && product.type === 'subscription') {
      var auth = global.XFreezeAuth;
      if (auth && auth.isConfigured && auth.isConfigured()) {
        if (!auth.isLoggedIn || !auth.isLoggedIn()) {
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
          return;
        }
      }
    }

    injectModal();
    currentProduct = product;
    config = null;
    const overlay = getOverlay();
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';

    document.getElementById('xf-checkout-product-name').textContent = product.name;
    document.getElementById('xf-checkout-product-price').textContent = formatPrice(
      product.price
    );
    document.getElementById('xf-checkout-subtitle').textContent =
      product.type === 'subscription'
        ? product.interval === 'year'
          ? 'Pro · billed yearly via Dodo'
          : 'Pro · billed monthly via Dodo'
        : 'Secure payment via Dodo';

    var autoRow = document.getElementById('xf-checkout-autodebit-row');
    var autoCb = document.getElementById('xf-checkout-autodebit');
    var autoHint = document.getElementById('xf-checkout-autodebit-hint');
    if (autoRow) {
      if (product.type === 'subscription') {
        autoRow.hidden = false;
        if (autoCb) autoCb.checked = true;
        if (autoHint) {
          autoHint.textContent =
            product.interval === 'year'
              ? 'Charge my card automatically each year. Turn off for one year only (no renewal).'
              : 'Charge my card automatically each month. Turn off for one month only (no renewal).';
        }
      } else {
        autoRow.hidden = true;
      }
    }

    setMessage('');
    try {
      var session =
        global.XFreezeAuth && global.XFreezeAuth.getSession
          ? global.XFreezeAuth.getSession()
          : null;
      var emailInput = document.getElementById('xf-checkout-email');
      if (emailInput && session && session.user && session.user.email) {
        emailInput.value = session.user.email;
      }
    } catch (e2) {}
    initCheckout();
  }

  function close() {
    const overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.hidden = true;
    }, 200);
  }

  async function initCheckout() {
    const setupEl = document.getElementById('xf-checkout-setup');
    const formWrap = document.getElementById('xf-checkout-form-wrap');

    try {
      const cfg = await fetchConfig();
      if (!cfg.configured || !cfg.dodo) {
        setupEl.hidden = false;
        formWrap.hidden = true;
        setupEl.innerHTML =
          '<strong>Dodo Payments is not configured yet.</strong><br>' +
          'Add <code>DODO_PAYMENTS_API_KEY</code> and product IDs in Vercel, then redeploy.';
        return;
      }
      setupEl.hidden = true;
      formWrap.hidden = false;
    } catch (err) {
      setupEl.hidden = false;
      formWrap.hidden = true;
      setupEl.innerHTML =
        '<strong>Cannot reach payment config.</strong><br>' +
        (err && err.message ? err.message : 'Try again.');
    }
  }

  async function payWithDodo() {
    const btn = document.getElementById('xf-pay-dodo-btn');
    if (!currentProduct) return;

    btn.disabled = true;
    setMessage('Creating secure checkout…');

    try {
      const cfg = await fetchConfig();
      if (!cfg.dodo) throw new Error('Dodo Payments is not configured');

      if (currentProduct.type !== 'subscription') {
        throw new Error('Only Pro subscriptions are available right now');
      }

      const token = getAccessToken();
      if (!token) throw new Error('Sign in required before purchasing');

      const emailEl = document.getElementById('xf-checkout-email');
      const email = (emailEl && emailEl.value.trim()) || '';
      const autoCb = document.getElementById('xf-checkout-autodebit');
      /* Default ON when checkbox missing or checked */
      const autoDebit = !autoCb || autoCb.checked;

      try {
        sessionStorage.setItem(
          'xf_pending_product',
          JSON.stringify(Object.assign({}, currentProduct, { autoDebit: autoDebit }))
        );
      } catch (e) {}

      const res = await fetch(apiBase + '/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          planId: currentProduct.id,
          email: email || undefined,
          returnUrl: successUrl(currentProduct.id),
          autoDebit: autoDebit,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not create checkout');
      }
      if (!data.checkoutUrl) {
        throw new Error('No checkout URL returned');
      }

      setMessage('Redirecting to Dodo…');
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setMessage((err && err.message) || 'Checkout failed', 'error');
      btn.disabled = false;
    }
  }

  function openBundle(bundleId) {
    const bundle = global.XFreezeProducts && global.XFreezeProducts.getBundle(bundleId);
    if (!bundle) return;
    open(bundle);
  }

  function openSubscription(planId) {
    const plan =
      global.XFreezeProducts && global.XFreezeProducts.getSubscription(planId);
    if (!plan) return;
    open(plan);
  }

  function openTemplate(code, category) {
    const product =
      global.XFreezeProducts &&
      global.XFreezeProducts.getTemplateProduct(code, category);
    if (!product) return;
    open(product);
  }

  function setApiBase(url) {
    apiBase = String(url || '').replace(/\/$/, '');
    config = null;
  }

  function openCustom() {
    setMessage('Custom payments are not available. Choose a Pro plan.', 'error');
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
    payWithDodo: payWithDodo,
    payWithRazorpay: payWithDodo,
  };
})(window);
