/**
 * X Freeze checkout — Razorpay only (USD / international)
 *
 * Requires: data/products.js, payment-server on apiBase (default :4242)
 */
(function (global) {
  const DEFAULT_API = 'http://localhost:4242';
  let apiBase = DEFAULT_API;
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
              <input type="email" id="xf-checkout-email" class="xf-checkout-email" placeholder="Email (optional)" autocomplete="email">
              <button type="button" id="xf-pay-razorpay-btn" class="xf-checkout-pay-btn">Pay now</button>
              <p id="xf-checkout-message" class="xf-checkout-message" aria-live="polite"></p>
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
    document.getElementById('xf-pay-razorpay-btn').addEventListener('click', payWithRazorpay);
  }

  function open(product) {
    injectModal();
    currentProduct = product;
    config = null;
    const overlay = getOverlay();
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';

    document.getElementById('xf-checkout-product-name').textContent = product.name;
    document.getElementById('xf-checkout-product-price').textContent = formatPrice(product.price);
    document.getElementById('xf-checkout-subtitle').textContent =
      product.type === 'subscription'
        ? product.interval === 'year'
          ? 'Yearly'
          : 'Monthly'
        : product.type === 'bundle'
          ? 'Bundle'
          : product.type === 'custom'
            ? 'Payment'
            : 'Template';

    setMessage('');
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
      if (!cfg.configured || !cfg.razorpay) {
        setupEl.hidden = false;
        formWrap.hidden = true;
        setupEl.innerHTML =
          '<strong>Razorpay is not configured.</strong><br>' +
          '1. Add <code>RAZORPAY_KEY_ID</code> + <code>RAZORPAY_KEY_SECRET</code> to <code>payment-server/.env</code><br>' +
          '2. Run <code>cd payment-server && npm start</code>';
        return;
      }

      setupEl.hidden = true;
      formWrap.hidden = false;
      document.getElementById('xf-checkout-product-price').textContent = formatPrice(
        currentProduct.price
      );
    } catch (err) {
      setupEl.hidden = false;
      formWrap.hidden = true;
      setupEl.innerHTML =
        '<strong>Cannot reach payment server.</strong><br>' +
        'Start it with <code>cd payment-server && npm start</code><br>' +
        'Expected at <code>' +
        apiBase +
        '</code>';
    }
  }

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) return resolve();
      const s = document.createElement('script');
      if (id) s.id = id;
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function payWithRazorpay() {
    const btn = document.getElementById('xf-pay-razorpay-btn');
    if (!currentProduct) return;

    btn.disabled = true;
    setMessage('Creating order…');

    try {
      const cfg = await fetchConfig();
      if (!cfg.razorpay || !cfg.razorpayKeyId) {
        throw new Error('Razorpay is not configured on the payment server');
      }

      await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'xf-razorpay-js');

      const orderBody =
        currentProduct.type === 'custom' || currentProduct.amountCents
          ? {
              amount: currentProduct.amountCents || Math.round(Number(currentProduct.price) * 100),
              currency: 'USD',
              receipt: String(currentProduct.id || 'custom').slice(0, 40),
            }
          : {
              productType: currentProduct.type,
              productId: currentProduct.id,
              category: currentProduct.category,
              currency: 'USD',
            };

      const res = await fetch(apiBase + '/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderBody),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || 'Could not create order');

      sessionStorage.setItem('xf_pending_product', JSON.stringify(currentProduct));

      const email = document.getElementById('xf-checkout-email')?.value || '';

      const options = {
        key: order.key_id || cfg.razorpayKeyId,
        amount: order.amount,
        currency: order.currency || 'USD',
        name: 'X Freeze',
        description: currentProduct.name,
        order_id: order.order_id,
        prefill: email ? { email: email } : undefined,
        theme: { color: '#0a0a0a' },
        handler: async function (response) {
          setMessage('Verifying payment…');
          try {
            const vRes = await fetch(apiBase + '/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const vData = await vRes.json();
            if (!vRes.ok || !vData.success) {
              setMessage(vData.error || 'Payment verification failed', 'error');
              btn.disabled = false;
              return;
            }
            const base = window.location.pathname.replace(/[^/]+$/, '');
            window.location.href =
              base +
              'checkout-success.html?provider=razorpay&payment_id=' +
              encodeURIComponent(response.razorpay_payment_id) +
              '&order_id=' +
              encodeURIComponent(response.razorpay_order_id);
          } catch (err) {
            setMessage(err.message || 'Verification error', 'error');
            btn.disabled = false;
          }
        },
        modal: {
          ondismiss: function () {
            setMessage('Payment cancelled.', 'error');
            btn.disabled = false;
          },
        },
      };

      const rzp = new global.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        const desc =
          (resp && resp.error && (resp.error.description || resp.error.reason)) ||
          'Payment failed';
        setMessage(desc, 'error');
        btn.disabled = false;
      });
      setMessage('');
      rzp.open();
      btn.disabled = false;
    } catch (err) {
      setMessage(err.message || 'Could not start Razorpay', 'error');
      btn.disabled = false;
    }
  }

  function openBundle(bundleId) {
    const bundle = global.XFreezeProducts?.getBundle(bundleId);
    if (!bundle) return;
    open(bundle);
  }

  function openSubscription(planId) {
    const plan = global.XFreezeProducts?.getSubscription(planId);
    if (!plan) return;
    open(plan);
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

  /** Demo / custom amount — price is USD dollars; converted to cents on the server */
  function openCustom(name, price) {
    const dollars = Number(price) || 1;
    open({
      id: 'custom_' + Date.now(),
      name: name || 'Custom payment',
      price: dollars,
      type: 'custom',
      amountCents: Math.max(100, Math.round(dollars * 100)),
    });
  }

  global.XFreezeCheckout = {
    open: open,
    close: close,
    openBundle: openBundle,
    openSubscription: openSubscription,
    openTemplate: openTemplate,
    openCustom: openCustom,
    setApiBase: setApiBase,
    payWithRazorpay: payWithRazorpay,
  };
})(window);
