/**
 * Shared mobile nav toggle - all pages with #mobile-menu
 */
(function () {
  function setMenuOpen(isOpen) {
    var menu = document.getElementById('mobile-menu');
    var btn = document.querySelector('.site-nav-menu-btn');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (!menu) return;

    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('xf-mobile-open', isOpen);
    menu.classList.toggle('xf-mobile-closed', !isOpen);
    menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.classList.toggle('xf-menu-open', isOpen);

    if (isOpen) {
      var subfilters = document.getElementById('visual-subfilters-details');
      if (subfilters) subfilters.open = false;
    }

    if (backdrop) {
      backdrop.classList.toggle('hidden', !isOpen);
      backdrop.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    if (btn) {
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  }

  window.toggleMobileMenu = function () {
    var menu = document.getElementById('mobile-menu');
    if (!menu) return;
    setMenuOpen(menu.classList.contains('hidden'));
  };

  document.addEventListener('click', function (e) {
    var menu = document.getElementById('mobile-menu');
    var btn = document.querySelector('.site-nav-menu-btn');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (!menu || menu.classList.contains('hidden')) return;
    if (menu.contains(e.target) || (btn && btn.contains(e.target))) return;
    if (backdrop && backdrop.contains(e.target)) {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var menu = document.getElementById('mobile-menu');
      if (menu && !menu.classList.contains('hidden')) setMenuOpen(false);
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) setMenuOpen(false);
  });

  var menu = document.getElementById('mobile-menu');
  if (menu && menu.classList.contains('hidden')) {
    menu.classList.add('xf-mobile-closed');
    menu.classList.remove('xf-mobile-open');
  }

  function xfNavEnsureOverlayOrder() {
    var menu = document.getElementById('mobile-menu');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (backdrop) document.body.appendChild(backdrop);
    if (menu) document.body.appendChild(menu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', xfNavEnsureOverlayOrder);
  } else {
    xfNavEnsureOverlayOrder();
  }

})();
