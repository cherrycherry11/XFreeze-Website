/**
 * X Freeze checkout modal - Stripe (card) + PayPal
 * Requires: data/products.js, payment server running on PAYMENT_API_URL
 */
(function (global) {
  const DEFAULT_API = 'http://localhost:4242';
  let apiBase = DEFAULT_API;
  let stripe = null;
  let elements = null;
  let paymentElement = null;
  let currentProduct = null;
  let config = null;
  let paypalLoaded = false;

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
    return '$' + amount.toFixed(2);
  }

  async function fetchConfig() {
    if (config) return config;
    const res = await fetch(apiBase + '/api/config');
    config = await res.json();
    return config;
  }

  function injectModal() {
    if (document.getElementById('xf-checkout-overlay')) return;

    const html = `
      <div id="xf-checkout-overlay" class="xf-checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="xf-checkout-title" hidden>
        <div class="xf-checkout-modal">
          <div class="xf-checkout-header">
            <div>
              <h2 id="xf-checkout-title" class="xf-checkout-title">Checkout</h2>
              <p id="xf-checkout-subtitle" class="xf-checkout-subtitle">Secure payment</p>
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
              <div class="xf-checkout-tabs" role="tablist">
                <button type="button" class="xf-checkout-tab is-active" data-tab="card" role="tab" aria-selected="true">
                  <i class="fa-regular fa-credit-card" aria-hidden="true"></i> Card
                </button>
                <button type="button" class="xf-checkout-tab" data-tab="paypal" role="tab" aria-selected="false">
                  <i class="fa-brands fa-paypal" aria-hidden="true"></i> PayPal
                </button>
              </div>
              <div id="xf-panel-card" class="xf-checkout-panel is-active" role="tabpanel">
                <input type="email" id="xf-checkout-email" class="xf-checkout-email" placeholder="Email for receipt (optional)" autocomplete="email">
                <div id="xf-payment-element"></div>
                <button type="button" id="xf-pay-card-btn" class="xf-checkout-pay-btn">Pay now</button>
              </div>
              <div id="xf-panel-paypal" class="xf-checkout-panel" role="tabpanel" hidden>
                <p style="font-size:0.8125rem;color:var(--text-secondary,#52525b);margin:0 0 1rem;">
                  You will be redirected to PayPal to complete payment, then returned here.
                </p>
                <div id="xf-paypal-button" class="xf-checkout-paypal-wrap"></div>
              </div>
              <p id="xf-checkout-message" class="xf-checkout-message" aria-live="polite"></p>
              <p class="xf-checkout-secure">
                <i class="fa-solid fa-lock" aria-hidden="true"></i>
                Encrypted checkout · Stripe &amp; PayPal
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

    overlay.querySelectorAll('.xf-checkout-tab').forEach((tab) => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    document.getElementById('xf-pay-card-btn').addEventListener('click', payWithCard);
  }

  function switchTab(tab) {
    const overlay = getOverlay();
    overlay.querySelectorAll('.xf-checkout-tab').forEach((t) => {
      const active = t.dataset.tab === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    overlay.querySelectorAll('.xf-checkout-panel').forEach((p) => {
      const active = p.id === 'xf-panel-' + tab;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
    if (tab === 'paypal') initPayPalButton();
  }

  function open(product) {
    injectModal();
    currentProduct = product;
    const overlay = getOverlay();
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';

    document.getElementById('xf-checkout-product-name').textContent = product.name;
    document.getElementById('xf-checkout-product-price').textContent = formatPrice(product.price);
    document.getElementById('xf-checkout-subtitle').textContent =
      product.type === 'bundle' ? 'Bundle purchase' : 'Single template';

    setMessage('');
    initCheckout();
  }

  function close() {
    const overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.hidden = true; }, 200);
    teardownStripe();
  }

  function teardownStripe() {
    if (paymentElement) {
      try { paymentElement.unmount(); } catch (_) {}
      paymentElement = null;
    }
    elements = null;
  }

  async function initCheckout() {
    const setupEl = document.getElementById('xf-checkout-setup');
    const formWrap = document.getElementById('xf-checkout-form-wrap');

    try {
      const cfg = await fetchConfig();
      if (!cfg.configured) {
        setupEl.hidden = false;
        formWrap.hidden = true;
        setupEl.innerHTML =
          '<strong>Payment server needs API keys.</strong><br>' +
          '1. Copy <code>payment-server/.env.example</code> → <code>payment-server/.env</code><br>' +
          '2. Add Stripe + PayPal keys (see <code>docs/PAYMENT-SETUP.md</code>)<br>' +
          '3. Run <code>cd payment-server && npm install && npm start</code>';
        return;
      }

      setupEl.hidden = true;
      formWrap.hidden = false;
      switchTab('card');
      await initStripeElements(cfg);
    } catch (err) {
      setupEl.hidden = false;
      formWrap.hidden = true;
      setupEl.innerHTML =
        '<strong>Cannot reach payment server.</strong><br>' +
        'Start it with <code>cd payment-server && npm start</code><br>' +
        'Expected at <code>' + apiBase + '</code>';
    }
  }

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) return resolve();
      const s = document.createElement('script');
      if (id) s.id = id;
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function initStripeElements(cfg) {
    teardownStripe();
    if (!cfg.stripePublishableKey) return;

    await loadScript('https://js.stripe.com/v3/', 'xf-stripe-js');
    stripe = global.Stripe(cfg.stripePublishableKey);

    const res = await fetch(apiBase + '/api/checkout/stripe/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productType: currentProduct.type,
        productId: currentProduct.id,
        category: currentProduct.category,
        email: document.getElementById('xf-checkout-email')?.value || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not start checkout');

    sessionStorage.setItem('xf_pending_product', JSON.stringify(currentProduct));

    const appearance = {
      theme: document.documentElement.classList.contains('dark') ? 'night' : 'stripe',
      variables: {
        fontFamily: 'Inter, Roboto, Open Sans, system-ui, sans-serif',
        borderRadius: '12px',
      },
    };

    elements = stripe.elements({ clientSecret: data.clientSecret, appearance });
    paymentElement = elements.create('payment');
    paymentElement.mount('#xf-payment-element');
  }

  async function payWithCard() {
    const btn = document.getElementById('xf-pay-card-btn');
    if (!stripe || !elements) return;

    btn.disabled = true;
    setMessage('Processing…');

    const returnUrl =
      window.location.origin +
      window.location.pathname.replace(/[^/]+$/, '') +
      'checkout-success.html?provider=stripe';

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (error) {
      setMessage(error.message, 'error');
      btn.disabled = false;
    }
  }

  async function initPayPalButton() {
    const container = document.getElementById('xf-paypal-button');
    if (!container || container.dataset.ready === '1') return;

    const cfg = await fetchConfig();
    if (!cfg.paypalClientId) return;

    await loadScript(
      'https://www.paypal.com/sdk/js?client-id=' +
        encodeURIComponent(cfg.paypalClientId) +
        '&currency=USD&intent=capture',
      'xf-paypal-sdk'
    );

    container.innerHTML = '';
    container.dataset.ready = '1';

    global.paypal
      .Buttons({
        style: { layout: 'vertical', color: 'black', shape: 'rect', label: 'paypal' },
        createOrder: async () => {
          const res = await fetch(apiBase + '/api/checkout/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productType: currentProduct.type,
              productId: currentProduct.id,
              category: currentProduct.category,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'PayPal order failed');
          sessionStorage.setItem('xf_pending_product', JSON.stringify(currentProduct));
          sessionStorage.setItem('xf_paypal_order', data.orderId);
          return data.orderId;
        },
        onApprove: async (data) => {
          setMessage('Capturing payment…');
          const res = await fetch(apiBase + '/api/checkout/paypal/capture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const capture = await res.json();
          if (!res.ok) {
            setMessage(capture.error || 'Capture failed', 'error');
            return;
          }
          const base = window.location.pathname.replace(/[^/]+$/, '');
          window.location.href =
            base + 'checkout-success.html?provider=paypal&order=' + encodeURIComponent(data.orderID);
        },
        onError: (err) => {
          setMessage(err?.message || 'PayPal error', 'error');
        },
      })
      .render('#xf-paypal-button');

    paypalLoaded = true;
  }

  function openBundle(bundleId) {
    const bundle = global.XFreezeProducts?.getBundle(bundleId);
    if (!bundle) return;
    open(bundle);
  }

  function openTemplate(code, category) {
    const product = global.XFreezeProducts?.getTemplateProduct(code, category);
    if (!product) return;
    open(product);
  }

  function setApiBase(url) {
    apiBase = url.replace(/\/$/, '');
    config = null;
  }

  global.XFreezeCheckout = {
    open: open,
    close: close,
    openBundle: openBundle,
    openTemplate: openTemplate,
    setApiBase: setApiBase,
  };
})(window);