/**
 * Motion Prompts homepage - full section walkthrough (self-bootstrapping).
 * Add to home.html before home-extras.js:
 *   <script src="data/motion-prompt-library-data.js"></script>
 *   <script src="js/home-motion-creative.js" defer></script>
 */
(function () {
  'use strict';

  var SECTION_ID = 'xf-motion-prompts';
  var FEATURED_IDS = [
    'product-360-showcase',
    'portrait-hero-reveal',
    'golden-hour-transition'
  ];

  var CATEGORIES = [
    'Camera moves',
    'Lighting shifts',
    'Expressions',
    'Product spins',
    'Drone reveals',
    'Atmosphere',
    'Slow motion'
  ];

  var STEP_SVG = {
    still: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><path d="M4 15l4-3 3 2 5-4 4 3"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M6 16V6a2 2 0 0 1 2-2h10"/></svg>',
    motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polygon points="8,6 18,12 8,18"/></svg>'
  };

  function esc(str) {
    if (typeof window.xfEsc === 'function') return window.xfEsc(str);
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getLib() {
    return window.XFreezeMotionPromptLibrary || null;
  }

  function findById(lib, id) {
    if (!lib || !lib.prompts) return null;
    for (var i = 0; i < lib.prompts.length; i++) {
      if (lib.prompts[i].id === id) return lib.prompts[i];
    }
    return null;
  }

  function promptText(item) {
    return item ? (item.prompt || item.text || '') : '';
  }

  function promptHook(item) {
    if (!item) return '';
    if (item.hook) return item.hook;
    if (item.description) return item.description;
    var t = promptText(item);
    var cut = t.indexOf('. ');
    return cut > 40 && cut < 140 ? t.slice(0, cut + 1) : t.slice(0, 100) + (t.length > 100 ? '…' : '');
  }

  function promptTag(item, index) {
    var tags = item.categories || item.tags || [];
    if (tags.length) return tags[0];
    return ['Product', 'Portrait', 'Atmosphere'][index] || 'Motion';
  }

  function countEl(name, fallback) {
    var el = document.querySelector('[data-xf-motion-' + name + '-count]');
    return el ? el.textContent.trim() : fallback;
  }

  function injectCss() {
    if (document.querySelector('link[data-xf-motion-home]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/home-motion-creative.css';
    link.setAttribute('data-xf-motion-home', '1');
    document.head.appendChild(link);
  }

  function sectionTemplate(promptCount, categoryCount) {
    return (
      '<div class="xf-motion-home__glow" aria-hidden="true"></div>' +
      '<div class="content-container py-16 md:py-24 scroll-reveal-in">' +

        '<div class="xf-motion-home__intro">' +
          '<p class="xf-motion-home__eyebrow">Part of the XFreeze library</p>' +
          '<h2 class="xf-motion-home__title">Turn any still into cinematic video motion.</h2>' +
          '<p class="xf-motion-home__lead">' +
            'The Motion Prompt Library is a curated set of copy-paste directions for image-to-video tools. ' +
            'Each prompt tells the model exactly how to move the camera, shift light, or animate your subject - ' +
            'so you are not guessing what to type after you generate a still.' +
          '</p>' +
          '<div class="xf-motion-home__stats">' +
            '<div class="xf-motion-home__stat"><strong>' + esc(promptCount) + '</strong><span>Motion prompts</span></div>' +
            '<div class="xf-motion-home__stat"><strong>' + esc(categoryCount) + '</strong><span>Shot categories</span></div>' +
            '<div class="xf-motion-home__stat"><strong>3 tools</strong><span>Grok Imagine, Runway, Kling</span></div>' +
          '</div>' +
          '<a href="prompt-library.html" class="xf-motion-home__intro-cta">Explore the library <span aria-hidden="true">→</span></a>' +
        '</div>' +

        '<div class="xf-motion-home__walkthrough scroll-reveal-in" style="transition-delay:80ms">' +
          '<p class="xf-motion-home__walk-title">Quick walkthrough - 30 seconds</p>' +
          '<div class="xf-motion-steps">' +
            '<article class="xf-motion-step">' +
              '<div class="xf-motion-step__visual">' + STEP_SVG.still + '</div>' +
              '<p class="xf-motion-step__num">Step 01</p>' +
              '<h3 class="xf-motion-step__title">Start with a still</h3>' +
              '<p class="xf-motion-step__desc">Generate or upload any image in Grok Imagine, Runway, Kling, or your tool of choice.</p>' +
            '</article>' +
            '<article class="xf-motion-step">' +
              '<div class="xf-motion-step__visual">' + STEP_SVG.copy + '</div>' +
              '<p class="xf-motion-step__num">Step 02</p>' +
              '<h3 class="xf-motion-step__title">Copy a motion prompt</h3>' +
              '<p class="xf-motion-step__desc">Pick a shot type from the library - product spin, portrait reveal, golden hour, and more.</p>' +
            '</article>' +
            '<article class="xf-motion-step xf-motion-step--motion">' +
              '<div class="xf-motion-step__visual">' + STEP_SVG.motion + '</div>' +
              '<p class="xf-motion-step__num">Step 03</p>' +
              '<h3 class="xf-motion-step__title">Paste and render</h3>' +
              '<p class="xf-motion-step__desc">Drop the prompt into image-to-video. The still becomes a directed clip with real camera language.</p>' +
            '</article>' +
          '</div>' +
        '</div>' +

        '<div class="xf-motion-home__categories scroll-reveal-in" style="transition-delay:120ms">' +
          '<p class="xf-motion-home__cat-label">What you can direct in a single line</p>' +
          '<div class="xf-motion-home__cat-row">' +
            CATEGORIES.map(function (c) {
              return '<span class="xf-motion-home__cat">' + esc(c) + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="xf-motion-home__try scroll-reveal-in" style="transition-delay:160ms">' +
          '<div class="xf-motion-home__try-head">' +
            '<h3 class="xf-motion-home__try-title">Try three starter prompts</h3>' +
            '<span class="xf-motion-home__try-note">Copy and paste into your tool</span>' +
          '</div>' +
          '<div class="xf-motion-try-grid" id="xf-motion-try-grid"></div>' +
        '</div>' +

        '<div class="xf-motion-home__bottom-cta scroll-reveal-in" style="transition-delay:200ms">' +
          '<p class="xf-motion-home__bottom-text">' +
            'Hundreds more prompts inside - organized by camera, light, expression, product, and atmosphere. ' +
            'Filter, search, and copy in one click.' +
          '</p>' +
          '<a href="prompt-library.html" class="xf-motion-home__bottom-btn">Browse all prompts <span aria-hidden="true">→</span></a>' +
        '</div>' +

      '</div>'
    );
  }

  function copyText(text, btn) {
    if (!text) return;
    var done = function () {
      if (!btn) return;
      btn.classList.add('is-copied');
      var old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () {
        btn.classList.remove('is-copied');
        btn.textContent = old;
      }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        if (typeof fallbackCopy === 'function') fallbackCopy(text);
        done();
      });
    } else if (typeof fallbackCopy === 'function') {
      fallbackCopy(text);
      done();
    }
  }

  function renderTryCards(items) {
    var grid = document.getElementById('xf-motion-try-grid');
    if (!grid || !items.length) return;

    grid.innerHTML = items.map(function (item, i) {
      var text = promptText(item);
      var title = item.title || item.name || 'Motion prompt';
      var hook = promptHook(item);
      var tag = promptTag(item, i);
      var libUrl = 'prompt-library.html' + (item.id ? '?highlight=' + encodeURIComponent(item.id) : '');

      return (
        '<article class="xf-motion-try-card" data-try-index="' + i + '">' +
          '<span class="xf-motion-try-card__tag">' + esc(tag) + '</span>' +
          '<h4 class="xf-motion-try-card__title">' + esc(title) + '</h4>' +
          '<p class="xf-motion-try-card__hook">' + esc(hook) + '</p>' +
          '<p class="xf-motion-try-card__prompt">' + esc(text) + '</p>' +
          '<div class="xf-motion-try-card__actions">' +
            '<button type="button" class="xf-motion-try-card__copy" data-copy="' + esc(text) + '">Copy prompt</button>' +
            '<a class="xf-motion-try-card__link" href="' + esc(libUrl) + '">In library →</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    var cards = grid.querySelectorAll('.xf-motion-try-card');
    cards.forEach(function (card, i) {
      card.addEventListener('mouseenter', function () {
        cards.forEach(function (c) { c.classList.remove('is-active'); });
        card.classList.add('is-active');
      });
    });
    if (cards[0]) cards[0].classList.add('is-active');

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy]');
      if (!btn) return;
      e.preventDefault();
      copyText(btn.getAttribute('data-copy'), btn);
    });
  }

  function rebuildSection() {
    var section = document.getElementById(SECTION_ID);
    if (!section || section.dataset.xfMotionHome === '1') return false;

    var lib = getLib();
    var items = FEATURED_IDS.map(function (id) { return findById(lib, id); }).filter(Boolean);
    if (!items.length && lib && lib.prompts) items = lib.prompts.slice(0, 3);

    var promptCount = countEl('prompt', '330+');
    var categoryCount = countEl('category', '25+');

    section.className = 'xf-motion-home bg-white border-t border-[#e5e7eb]';
    section.setAttribute('data-scroll-reveal', '');
    section.innerHTML = sectionTemplate(promptCount, categoryCount);
    section.dataset.xfMotionHome = '1';

    renderTryCards(items);
    return true;
  }

  function boot() {
    injectCss();
    if (rebuildSection()) return;
    renderTryCards(
      FEATURED_IDS.map(function (id) { return findById(getLib(), id); }).filter(Boolean)
    );
  }

  function scheduleBoot() {
    boot();
    window.setTimeout(boot, 100);
    window.setTimeout(boot, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleBoot);
  } else {
    scheduleBoot();
  }
})();