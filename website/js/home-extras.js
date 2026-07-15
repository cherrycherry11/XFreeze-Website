/**
 * Homepage sections driven by site-config.js
 */
(function () {
  'use strict';

  var site = window.XFreezeSite;
  if (!site) return;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderStartHere() {
    var el = document.getElementById('xf-start-here-grid');
    if (!el || !site.startHere) return;
    el.innerHTML = site.startHere
      .map(function (step) {
        return (
          '<article class="xf-start-card scroll-reveal-in">' +
          '<span class="xf-start-card__num">' + step.step + '</span>' +
          '<i class="fa-solid ' + esc(step.icon) + ' xf-start-card__icon" aria-hidden="true"></i>' +
          '<h3>' + esc(step.title) + '</h3>' +
          '<p>' + esc(step.desc) + '</p>' +
          '<a href="' + esc(step.href) + '" class="xf-start-card__cta">' + esc(step.cta) + ' <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i></a>' +
          '</article>'
        );
      })
      .join('');
  }

  function skillsPackHref(pack) {
    return 'skills.html#skill-pack/' + encodeURIComponent(pack);
  }

  function renderSkillsSpotlight() {
    var el = document.getElementById('xf-skills-spotlight');
    if (!el || !site.spotlightSkills) return;
    el.innerHTML = site.spotlightSkills
      .map(function (s) {
        var tag = s.instant
          ? '<span class="xf-spot-tag xf-spot-tag--instant">Instant</span>'
          : '<span class="xf-spot-tag xf-spot-tag--connector">Connector</span>';
        return (
          '<a href="' + skillsPackHref(s.pack) + '" class="xf-spot-card">' +
          tag +
          '<h3>' + esc(s.name) + '</h3>' +
          '<code class="xf-spot-slash">' + esc(s.slash) + '</code>' +
          '<span class="xf-spot-link">View pack <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i></span>' +
          '</a>'
        );
      })
      .join('');
    el.classList.add('is-ready');
    /* Let cinematic layer rebind stagger after inject */
    if (window.XFreezeCinematic && typeof window.XFreezeCinematic.refresh === 'function') {
      window.setTimeout(function () {
        window.XFreezeCinematic.refresh();
      }, 40);
    }
  }

  function renderComboCard(combo, tier) {
    var tagClass = tier === 'premium'
      ? 'xf-combo-tag xf-combo-tag--premium'
      : (combo.connector ? 'xf-combo-tag xf-combo-tag--connector' : 'xf-combo-tag xf-combo-tag--instant');
    var tagLabel = tier === 'premium' ? 'Premium' : (combo.connector ? 'Connector' : 'Instant');
    var steps = (combo.steps || []).slice(0, 4).map(function (step, i) {
      return '<li><span class="xf-combo-step-num" aria-hidden="true">' + (i + 1) + '</span>' + esc(step) + '</li>';
    }).join('');
    return (
      '<a href="' + skillsPackHref(combo.pack) + '" class="xf-combo-card">' +
      '<span class="' + tagClass + '">' + tagLabel + '</span>' +
      '<h4>' + esc(combo.name) + '</h4>' +
      '<p class="xf-combo-desc">' + esc(combo.desc || '') + '</p>' +
      (steps ? '<ol class="xf-combo-steps">' + steps + '</ol>' : '') +
      '<code class="xf-combo-slash">' + esc(combo.slash) + '</code>' +
      '<span class="xf-combo-link">Open combo pack <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i></span>' +
      '</a>'
    );
  }

  function renderFeaturedCombos() {
    var combos = site.featuredCombos;
    if (!combos) return;
    var freeEl = document.getElementById('xf-combos-free');
    var premEl = document.getElementById('xf-combos-premium');
    if (freeEl && combos.free) {
      freeEl.innerHTML = combos.free.map(function (c) { return renderComboCard(c, 'free'); }).join('');
      freeEl.classList.add('is-ready');
    }
    if (premEl && combos.premium) {
      premEl.innerHTML = combos.premium.map(function (c) { return renderComboCard(c, 'premium'); }).join('');
      premEl.classList.add('is-ready');
    }
    if (window.XFreezeCinematic && typeof window.XFreezeCinematic.refresh === 'function') {
      window.setTimeout(function () {
        window.XFreezeCinematic.refresh();
      }, 40);
    }
  }


  function copyMotionPrompt(text, btn) {
    function done() {
      if (!btn) return;
      btn.classList.add('is-copied');
      var label = btn.querySelector('.xf-motion-row__copy-label');
      var prev = label ? label.textContent : '';
      if (label) label.textContent = 'Copied';
      setTimeout(function () {
        btn.classList.remove('is-copied');
        if (label) label.textContent = prev || 'Copy';
      }, 1600);
      if (window.XFreezeSupportToast) {
        window.XFreezeSupportToast.show({ context: 'copy', subtitle: 'Paste into Grok Imagine, Runway, Kling, or your image-to-video tool.' });
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
        done();
      });
    } else {
      done();
    }
  }

  function renderMotionPrompts() {
    var el = document.getElementById('xf-motion-featured');
    if (!el || !site.featuredMotionPrompts) return;
    el.innerHTML = site.featuredMotionPrompts
      .map(function (p, i) {
        var num = String(i + 1).padStart(2, '0');
        return (
          '<article class="xf-motion-row">' +
          '<span class="xf-motion-row__num" aria-hidden="true">' + num + '</span>' +
          '<div class="xf-motion-row__body">' +
          '<h3 class="xf-motion-row__title">' + esc(p.title) + '</h3>' +
          '<p class="xf-motion-row__excerpt">' + esc(p.text) + '</p>' +
          '</div>' +
          '<button type="button" class="xf-motion-row__copy" data-motion-copy="' + i + '" aria-label="Copy prompt for ' + esc(p.title) + '">' +
          '<span class="xf-motion-row__copy-label">Copy</span>' +
          '</button>' +
          '</article>'
        );
      })
      .join('');
    el.classList.add('is-ready');
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-motion-copy]');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-motion-copy'), 10);
      var prompt = site.featuredMotionPrompts[idx];
      if (prompt && prompt.text) copyMotionPrompt(prompt.text, btn);
    });
  }

  function init() {
    renderStartHere();
    renderSkillsSpotlight();
    renderFeaturedCombos();
    renderMotionPrompts();
    if (window.XFreezeScrollReveal) window.XFreezeScrollReveal.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
