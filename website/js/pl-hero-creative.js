/**
 * Prompt Library - creative hero + sample shots
 */
(function () {
  'use strict';

  var lib = window.XFreezeMotionPromptLibrary;
  if (!lib) return;

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function pickSamples() {
    var picks = [];
    var want = ['portrait-hero-reveal', 'product-360-showcase', 'golden-hour-transition'];
    lib.categories.forEach(function (cat) {
      cat.prompts.forEach(function (p) {
        if (want.indexOf(p.id) !== -1) picks.push({ prompt: p, category: cat });
      });
    });
    if (picks.length >= 3) return picks.slice(0, 3);

    var flat = [];
    lib.categories.forEach(function (cat) {
      cat.prompts.forEach(function (p) {
        flat.push({ prompt: p, category: cat });
      });
    });
    return flat.slice(0, 3);
  }

  function excerpt(text, max) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '').trim() + '…';
  }

  function renderSamples() {
    var list = $('pl-sample-list');
    if (!list) return;

    var samples = pickSamples();
    list.innerHTML = samples.map(function (row, i) {
      var num = String(i + 1).padStart(2, '0');
      var cat = row.category.shortName || row.category.name;
      return (
        '<article class="pl-sample-card' + (i === 0 ? ' is-active' : '') + '" data-pl-sample="' + i + '">' +
        '<div class="pl-sample-card__head">' +
        '<span class="pl-sample-card__num">' + num + '</span>' +
        '<div class="pl-sample-card__meta">' +
        '<span class="pl-sample-card__cat">' + escapeHtml(cat) + '</span>' +
        '<h3 class="pl-sample-card__title">' + escapeHtml(row.prompt.title) + '</h3>' +
        '</div>' +
        '<button type="button" class="pl-sample-card__copy" data-copy-prompt="' + escapeHtml(row.prompt.text) + '">Copy</button>' +
        '</div>' +
        '<p class="pl-sample-card__text">' + escapeHtml(row.prompt.text) + '</p>' +
        '</article>'
      );
    }).join('');

    bindSampleCards(list, samples);
    rotateSamples(list, samples.length);
  }

  function bindSampleCards(list, samples) {
    if (list._plBound) return;
    list._plBound = true;

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy-prompt]');
      if (!btn) return;
      var text = btn.getAttribute('data-copy-prompt');
      if (!text) return;
      var done = function () {
        var orig = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove('is-copied');
        }, 1600);
      };
      if (window.XFreezeSupportToast && window.XFreezeSupportToast.copyWithSupport) {
        window.XFreezeSupportToast.copyWithSupport(text, function (ok) { if (ok) done(); });
      } else {
        navigator.clipboard.writeText(text).then(done);
      }
    });

    list.querySelectorAll('.pl-sample-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        list.querySelectorAll('.pl-sample-card').forEach(function (c) {
          c.classList.toggle('is-active', c === card);
        });
      });
    });
  }

  function rotateSamples(list, count) {
    if (count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % count;
      list.querySelectorAll('.pl-sample-card').forEach(function (card, i) {
        card.classList.toggle('is-active', i === idx);
      });
    }, 5200);
  }

  function initHeadlineSwap() {
    var el = $('pl-hero-swap');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var words = ['Moving picture.', 'Living scene.', 'Video motion.', 'Cinematic clip.'];
    var i = 1;
    setInterval(function () {
      el.classList.add('is-fading');
      setTimeout(function () {
        el.textContent = words[i % words.length];
        el.classList.remove('is-fading');
        i += 1;
      }, 280);
    }, 3400);
  }

  function initTicker() {
    var track = $('pl-hero-ticker-track');
    if (!track || !lib.categories) return;

    var titles = [];
    lib.categories.forEach(function (cat) {
      cat.prompts.slice(0, 2).forEach(function (p) {
        titles.push(p.title);
      });
    });

    if (!titles.length) return;
    var html = titles.slice(0, 24).map(function (t) {
      return '<span>' + escapeHtml(t) + '</span>';
    }).join('');
    track.innerHTML = html + html;
  }

  function init() {
    renderSamples();
    initHeadlineSwap();
    initTicker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();