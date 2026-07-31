/**
 * Shared mobile nav toggle - all pages with #mobile-menu
 * Also normalizes right-side action order: coffee → menu → auth
 *
 * Breakpoint must match site-nav.css: hamburger + drawer below 1200px,
 * center pill links at 1200px+. (Do not use Tailwind lg/1024 here.)
 */
(function () {
  /* Must match @media (min-width: 1200px) in site-nav.css */
  var NAV_DESKTOP_MIN = 1200;

  function isDesktopNav() {
    return window.innerWidth >= NAV_DESKTOP_MIN;
  }

  function normalizeNavEnd() {
    var end = document.querySelector('#site-nav .site-nav-end');
    if (!end) return;
    var coffee = end.querySelector('.site-nav-coffee');
    var menu = end.querySelector('.site-nav-menu-btn');
    var auth = end.querySelector('.site-nav-auth, #xf-auth-nav');
    /* Re-append in stable order so DOM matches CSS order on every page */
    if (coffee) end.appendChild(coffee);
    if (menu) end.appendChild(menu);
    if (auth) end.appendChild(auth);
    /* Drop obsolete Get started CTA from the bar */
    end.querySelectorAll('.site-nav-cta').forEach(function (el) {
      el.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeNavEnd);
  } else {
    normalizeNavEnd();
  }
  /* After auth injects avatar */
  window.setTimeout(normalizeNavEnd, 0);
  window.setTimeout(normalizeNavEnd, 400);

  function setMenuOpen(isOpen) {
    var menu = document.getElementById('mobile-menu');
    var btn = document.querySelector('.site-nav-menu-btn');
    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (!menu) return;

    /* Never open the drawer once the desktop pill nav is active */
    if (isOpen && isDesktopNav()) {
      isOpen = false;
    }

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

  window.toggleMobileMenu = function (event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    var menu = document.getElementById('mobile-menu');
    if (!menu) return;
    if (isDesktopNav()) {
      setMenuOpen(false);
      return;
    }
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

  var resizeCloseTimer = null;
  function onViewportChange() {
    if (isDesktopNav()) setMenuOpen(false);
  }
  window.addEventListener('resize', function () {
    if (resizeCloseTimer) window.clearTimeout(resizeCloseTimer);
    resizeCloseTimer = window.setTimeout(onViewportChange, 50);
  });
  window.addEventListener('orientationchange', onViewportChange);
  if (window.matchMedia) {
    try {
      var mql = window.matchMedia('(min-width: ' + NAV_DESKTOP_MIN + 'px)');
      if (mql.addEventListener) mql.addEventListener('change', onViewportChange);
      else if (mql.addListener) mql.addListener(onViewportChange);
    } catch (err) { /* ignore */ }
  }

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

  /**
   * Home hero flag - hide Ask bot while the hero fills the screen so it
   * does not cover CTAs / theme controls on mobile.
   */
  function updateOnHeroClass() {
    var hero = document.getElementById('hero-header');
    if (!hero) {
      document.body.classList.remove('xf-on-hero');
      return;
    }
    var rect = hero.getBoundingClientRect();
    var onHero = rect.bottom > Math.min(window.innerHeight * 0.45, 320);
    document.body.classList.toggle('xf-on-hero', onHero);
  }

  function bindHeroWatch() {
    if (!document.getElementById('hero-header')) return;
    document.body.classList.add('xf-on-hero');
    updateOnHeroClass();
    window.addEventListener('scroll', updateOnHeroClass, { passive: true });
    window.addEventListener('resize', updateOnHeroClass);
    window.addEventListener('orientationchange', updateOnHeroClass);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHeroWatch);
  } else {
    bindHeroWatch();
  }

})();
