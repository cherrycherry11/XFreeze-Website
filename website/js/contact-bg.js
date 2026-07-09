/**
 * Contact page - subtle cursor spotlight + parallax on background orbs
 */
(function () {
  'use strict';

  var root = document.querySelector('.contact-bg');
  if (!root) return;

  var spotlight = root.querySelector('.contact-bg__spotlight');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mx = 50;
  var my = 40;
  var targetMx = mx;
  var targetMy = my;
  var raf = null;

  function setVars(x, y) {
    root.style.setProperty('--contact-mx', x + '%');
    root.style.setProperty('--contact-my', y + '%');
  }

  function tick() {
    mx += (targetMx - mx) * 0.08;
    my += (targetMy - my) * 0.08;
    setVars(mx, my);
    if (Math.abs(targetMx - mx) > 0.05 || Math.abs(targetMy - my) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function onMove(e) {
    if (reduced) return;
    var w = window.innerWidth || 1;
    var h = window.innerHeight || 1;
    var x = (e.clientX / w) * 100;
    var y = (e.clientY / h) * 100;
    targetMx = x;
    targetMy = y;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  setVars(mx, my);
  window.addEventListener('pointermove', onMove, { passive: true });

  if (spotlight && reduced) {
    spotlight.style.opacity = '0';
  }
})();