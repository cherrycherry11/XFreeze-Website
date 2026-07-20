/**
 * Home templates polish — category filter chips for marquee
 */
(function () {
  'use strict';

  function initTempFilters() {
    var bar = document.getElementById('xf-temp-filters');
    if (!bar) return;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-temp-filter]');
      if (!btn) return;
      bar.querySelectorAll('[data-temp-filter]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      var cat = btn.getAttribute('data-temp-filter') || 'all';
      window.dispatchEvent(
        new CustomEvent('xf:template-filter', { detail: { cat: cat } })
      );
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTempFilters);
  } else {
    initTempFilters();
  }
})();
