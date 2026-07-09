/**
 * X Freeze scroll reveal - IntersectionObserver-driven section animations
 */
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observed = new WeakSet();

  const revealOptions = {
    threshold: 0.22,
    rootMargin: '-6% 0px -14% 0px',
  };

  const staggerOptions = {
    threshold: 0.18,
    rootMargin: '-4% 0px -12% 0px',
  };

  const sectionOptions = {
    threshold: 0.28,
    rootMargin: '-8% 0px -16% 0px',
  };

  function reveal(el) {
    el.classList.add('is-revealed');
  }

  function revealAll() {
    document.querySelectorAll('[data-scroll-reveal], [data-scroll-stagger], .scroll-reveal-in').forEach(reveal);
  }

  function createObserver(options, onHit) {
    return new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        onHit(entry.target);
        observer.unobserve(entry.target);
      });
    }, options);
  }

  let revealObserver = null;
  let staggerObserver = null;
  let sectionObserver = null;

  function observeElement(el, observer) {
    if (!el || observed.has(el) || el.classList.contains('is-revealed')) return;
    observed.add(el);
    observer.observe(el);
  }

  function observeNew() {
    if (REDUCED) {
      revealAll();
      return;
    }

    if (!revealObserver) {
      revealObserver = createObserver(revealOptions, reveal);
    }
    if (!staggerObserver) {
      staggerObserver = createObserver(staggerOptions, reveal);
    }
    if (!sectionObserver) {
      sectionObserver = createObserver(sectionOptions, reveal);
    }

    document.querySelectorAll('.scroll-reveal-in:not(.is-revealed)').forEach(function (el) {
      observeElement(el, revealObserver);
    });

    document.querySelectorAll('[data-scroll-stagger]:not(.is-revealed)').forEach(function (el) {
      observeElement(el, staggerObserver);
    });

    document.querySelectorAll('[data-scroll-reveal]:not(.is-revealed)').forEach(function (section) {
      if (section.querySelector('.scroll-reveal-in, [data-scroll-stagger]')) return;
      observeElement(section, sectionObserver);
    });
  }

  function init() {
    observeNew();
  }

  function refresh() {
    observeNew();
  }

  window.XFreezeScrollReveal = { init: init, refresh: refresh, revealAll: revealAll, reveal: reveal };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', refresh);
})();