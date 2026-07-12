/**
 * X Freeze - slide-in "Support my work" tab after copy / valuable actions.
 */
(function (global) {
  var SUPPORT_URL = 'https://buymeacoffee.com/xfreeze';
  var AUTO_HIDE_MS = 7000;
  var activeToast = null;
  var hideTimer = null;

  function clearTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove('is-visible');
    toast.classList.add('is-leaving');
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
      if (activeToast === toast) activeToast = null;
    }, 320);
  }

  function dismiss() {
    clearTimer();
    if (activeToast) removeToast(activeToast);
  }

  function show(options) {
    options = options || {};
    dismiss();

    var context = options.context || 'copy';
    var subtitle = options.subtitle;
    if (!subtitle) {
      subtitle = context === 'open'
        ? 'Enjoying the templates? A coffee keeps them free.'
        : 'Free skills & templates - tips help me build more.';
    }

    var toast = document.createElement('div');
    toast.className = 'xf-support-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<div class="xf-support-toast-inner">' +
        '<span class="xf-support-toast-icon" aria-hidden="true"><i class="fa-solid fa-mug-hot"></i></span>' +
        '<div class="xf-support-toast-copy">' +
          '<span class="xf-support-toast-title">Support my work</span>' +
          '<span class="xf-support-toast-sub">' + subtitle + '</span>' +
        '</div>' +
        '<a class="xf-support-toast-cta" href="' + SUPPORT_URL + '" target="_blank" rel="noopener noreferrer">' +
          '<i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Coffee' +
        '</a>' +
        '<button type="button" class="xf-support-toast-close" aria-label="Dismiss">&times;</button>' +
      '</div>';

    document.body.appendChild(toast);
    activeToast = toast;

    var closeBtn = toast.querySelector('.xf-support-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        dismiss();
      });
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });
    });

    clearTimer();
    hideTimer = setTimeout(dismiss, options.duration || AUTO_HIDE_MS);
  }

  function afterCopy(opts) {
    show(Object.assign({ context: 'copy' }, opts || {}));
  }

  function afterAction(opts) {
    show(Object.assign({ context: 'open' }, opts || {}));
  }

  function copyWithSupport(text, onSuccess, opts) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      if (typeof onSuccess === 'function') onSuccess(false);
      return Promise.resolve(false);
    }
    return navigator.clipboard.writeText(text).then(function () {
      afterCopy(opts);
      if (typeof onSuccess === 'function') onSuccess(true);
      return true;
    }).catch(function () {
      if (typeof onSuccess === 'function') onSuccess(false);
      return false;
    });
  }

  global.XFreezeSupportToast = {
    show: show,
    dismiss: dismiss,
    afterCopy: afterCopy,
    afterAction: afterAction,
    copyWithSupport: copyWithSupport,
    url: SUPPORT_URL,
  };
})(typeof window !== 'undefined' ? window : globalThis);