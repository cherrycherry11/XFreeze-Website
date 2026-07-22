/**
 * X Freeze checkout — Paddle Billing (overlay)
 *
 * Pro is granted by Paddle webhooks → server entitlements table.
 * Success page only refreshes /api/me/entitlement.
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
  let paddleInstance = null;
  let paddleInitPromise = null;

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

  function getUser() {
    try {
      if (global.XFreezeAuth && global.XFreezeAuth.getSession) {
        var s = global.XFreezeAuth.getSession();
        return s && s.user ? s.user : null;
      }
    } catch (e) {}
    return null;
  }

  function successUrl() {
    try {
      var base = global.location.origin + global.location.pathname.replace(/[^/]+$/, '');
      return base + 'checkout-success?provider=paddle';
    } catch (e) {
      return 'https://xfreeze.com/checkout-success?provider=paddle';
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
              <p id="xf-checkout-subtitle" class="xf-checkout-subtitle">Secure payment via Paddle</p>
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
              <button type="button" id="xf-pay-paddle-btn" class="xf-checkout-pay-btn">Continue to payment</button>
              <p id="xf-checkout-message" class="xf-checkout-message" aria-live="polite"></p>
              <p class="xf-checkout-message" style="margin-top:0.5rem;opacity:0.75;font-size:0.8rem">
                Card payments are processed securely by Paddle. Tax may be calculated at checkout.
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
    document.getElementById('xf-pay-paddle-btn').addEventListener('click', payWithPaddle);
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
          ? 'Pro · billed yearly via Paddle'
          : 'Pro · billed monthly via Paddle'
        : 'Secure payment via Paddle';

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
      if (!cfg.paddle || !cfg.paddleClientToken) {
        setupEl.hidden = false;
        formWrap.hidden = true;
        setupEl.innerHTML =
          '<strong>Paddle is not configured yet.</strong><br>' +
          'Add <code>PADDLE_CLIENT_TOKEN</code>, price IDs, and webhook secret in Vercel, then redeploy.<br>' +
          'See <code>docs/PADDLE-SETUP.md</code>.';
        return;
      }
      if (!cfg.paddlePrices || !cfg.paddlePrices['pro-monthly']) {
        setupEl.hidden = false;
        formWrap.hidden = true;
        setupEl.innerHTML =
          '<strong>Paddle price IDs missing.</strong><br>' +
          'Set <code>PADDLE_PRICE_PRO_MONTHLY</code> and <code>PADDLE_PRICE_PRO_YEARLY</code> in Vercel.';
        return;
      }

      setupEl.hidden = true;
      formWrap.hidden = false;
    } catch (err) {
      setupEl.hidden = false;
      formWrap.hidden = true;
      setupEl.innerHTML =
        '<strong>Cannot reach payment config.</strong><br>' +
        (err && err.message ? err.message : 'Try again in a moment.');
    }
  }

  function loadPaddleJs() {
    return new Promise(function (resolve, reject) {
      if (global.Paddle) return resolve(global.Paddle);
      var existing = document.getElementById('xf-paddle-js');
      if (existing) {
        existing.addEventListener('load', function () {
          resolve(global.Paddle);
        });
        existing.addEventListener('error', reject);
        return;
      }
      var s = document.createElement('script');
      s.id = 'xf-paddle-js';
      s.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      s.async = true;
      s.onload = function () {
        resolve(global.Paddle);
      };
      s.onerror = function () {
        reject(new Error('Failed to load Paddle.js'));
      };
      document.head.appendChild(s);
    });
  }

  async function ensurePaddle(cfg) {
    if (paddleInstance) return paddleInstance;
    if (paddleInitPromise) return paddleInitPromise;

    paddleInitPromise = loadPaddleJs().then(function (Paddle) {
      if (!Paddle) throw new Error('Paddle.js missing');
      var env = cfg.paddleEnv === 'production' ? 'production' : 'sandbox';
      try {
        Paddle.Environment.set(env);
      } catch (e) {}
      Paddle.Initialize({
        token: cfg.paddleClientToken,
        eventCallback: function (event) {
          try {
            if (event && event.name === 'checkout.completed') {
              setMessage('Payment received — activating Pro…');
              if (global.XFreezeEntitlement && global.XFreezeEntitlement.refresh) {
                global.XFreezeEntitlement.refresh({ force: true });
              }
            }
            if (event && event.name === 'checkout.closed') {
              setMessage('');
            }
            if (event && (event.name === 'checkout.error' || event.name === 'checkout.payment-error')) {
              setMessage('Payment could not be completed. Try again.', 'error');
            }
          } catch (err) {}
        },
      });
      paddleInstance = Paddle;
      return Paddle;
    });

    return paddleInitPromise;
  }

  async function payWithPaddle() {
    const btn = document.getElementById('xf-pay-paddle-btn');
    if (!currentProduct) return;

    btn.disabled = true;
    setMessage('Opening Paddle checkout…');

    try {
      const cfg = await fetchConfig();
      if (!cfg.paddle || !cfg.paddleClientToken) {
        throw new Error('Paddle is not configured on the server');
      }

      if (currentProduct.type !== 'subscription') {
        throw new Error('Only Pro subscriptions are available via Paddle right now');
      }

      const priceId =
        (cfg.paddlePrices && cfg.paddlePrices[currentProduct.id]) || null;
      if (!priceId) {
        throw new Error('No Paddle price configured for ' + currentProduct.id);
      }

      const user = getUser();
      if (!user || !user.id) {
        throw new Error('Sign in required before purchasing');
      }

      const emailEl = document.getElementById('xf-checkout-email');
      const email =
        (emailEl && emailEl.value.trim()) || (user.email || '') || undefined;

      const Paddle = await ensurePaddle(cfg);

      try {
        sessionStorage.setItem('xf_pending_product', JSON.stringify(currentProduct));
      } catch (e) {}

      Paddle.Checkout.open({
        items: [{ priceId: priceId, quantity: 1 }],
        customer: email ? { email: email } : undefined,
        customData: {
          user_id: String(user.id),
          plan_id: String(currentProduct.id),
        },
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          successUrl:
            successUrl() +
            '&plan=' +
            encodeURIComponent(currentProduct.id),
          allowLogout: false,
        },
      });

      setMessage('Complete payment in the Paddle window.');
      btn.disabled = false;
      close();
    } catch (err) {
      setMessage((err && err.message) || 'Could not start Paddle checkout', 'error');
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
    payWithPaddle: payWithPaddle,
    /* legacy alias */
    payWithRazorpay: payWithPaddle,
  };
})(window);
