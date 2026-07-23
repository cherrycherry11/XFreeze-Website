/**
 * Checkout stub — payment integration removed.
 * Re-implement provider wiring here when starting fresh.
 */
(function (global) {
  function offline() {
    console.warn('[xf-checkout] Payments are offline (clean slate rebuild).');
    if (typeof global.alert === 'function') {
      global.alert(
        'Online checkout is temporarily offline while we rebuild payments. Please check back soon.'
      );
    }
  }

  global.XFreezeCheckout = {
    open: offline,
    close: function () {},
    openBundle: offline,
    openSubscription: offline,
    openTemplate: offline,
    openCustom: offline,
    setApiBase: function () {},
    getApiBase: function () {
      try {
        return global.location && global.location.origin
          ? global.location.origin
          : '';
      } catch (e) {
        return '';
      }
    },
    startDodoCheckout: offline,
    payWithDodo: offline,
    payWithRazorpay: offline,
    offline: true,
  };
})(window);
