/**
 * X Freeze Motion System - Phase 1
 * Lenis smooth scroll, nav, magnetic CTAs, count-up
 */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  function initLenis() {
    if (reducedMotion || typeof Lenis === 'undefined') return null;
    var lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.XFreezeLenis = lenis;
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return lenis;
  }

  function initMagnetic() {
    if (reducedMotion || !finePointer) return;

    document.querySelectorAll('[data-xf-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-xf-magnetic')) || 0.35;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) * strength;
        var dy = (e.clientY - cy) * strength;
        el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  function initNavCompact() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    var hero = document.getElementById('hero-header');
    var threshold = 48;
    var isScrolled = false;
    var ticking = false;
    var SCROLL_ON = 60;
    var SCROLL_OFF = 100;

    function applyState(scrolled) {
      nav.classList.toggle('is-scrolled', scrolled);
      nav.classList.toggle('xf-nav-compact', scrolled);
      var mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) mobileMenu.classList.toggle('is-scrolled-style', scrolled);
    }

    function measure() {
      ticking = false;
      var scrolled;
      if (hero) {
        var bottom = hero.getBoundingClientRect().bottom;
        if (!isScrolled && bottom <= SCROLL_ON) isScrolled = true;
        else if (isScrolled && bottom > SCROLL_OFF) isScrolled = false;
        scrolled = isScrolled;
      } else {
        scrolled = window.scrollY > threshold;
        isScrolled = scrolled;
      }
      applyState(scrolled);
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    if (window.XFreezeLenis && typeof window.XFreezeLenis.on === 'function') {
      window.XFreezeLenis.on('scroll', requestUpdate);
    }
    measure();
  }

  function initMobileMenu() {
    // Menu open/close handled by js/site-nav.js (backdrop, scroll lock, toggleMobileMenu)
  }

  function animateCount(el, target, duration, prefix, suffix) {
    var start = 0;
    var startTime = null;
    prefix = prefix || '';
    suffix = suffix || '';

    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(start + (target - start) * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function resolveCountTarget(el) {
    var stored = el.getAttribute('data-xf-count-value');
    if (stored) {
      var fromStored = parseInt(stored, 10);
      if (!isNaN(fromStored)) return fromStored;
    }

    var raw = el.getAttribute('data-xf-count') || '';
    var direct = parseInt(raw, 10);
    if (!isNaN(direct)) return direct;

    var site = window.XFreezeSite;
    if (site) {
      if (raw === 'templates' && site.display) return site.display.templates;
      if (raw === 'skills' && site.display) return site.display.skills;
      if (raw === 'motion-prompts' && site.display) return site.display.motionPrompts;
      if (raw === 'templates' && site.templates) return site.templates;
      if (raw === 'skills' && site.skills) return site.skills;
    }

    return null;
  }

  function initCountUp() {
    if (reducedMotion) return;

    var items = document.querySelectorAll('[data-xf-count]');
    if (!items.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.dataset.xfCounted) return;
          el.dataset.xfCounted = '1';
          el.classList.add('is-counting');

          var prefix = el.getAttribute('data-xf-count-prefix') || '';
          var suffix = el.getAttribute('data-xf-count-suffix') || '';
          var target = resolveCountTarget(el);
          if (target === null) return;
          animateCount(el, target, 1400, prefix, suffix);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    initLenis();
    initMagnetic();
    initNavCompact();
    initMobileMenu();
    initCountUp();
    window.addEventListener('load', function () {
      initMagnetic();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.XFreezeMotion = { init: init };
})();