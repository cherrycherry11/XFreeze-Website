/**
 * X Freeze Motion Prompt Library - browse, search, copy
 */
(function () {
  'use strict';

  var lib = window.XFreezeMotionPromptLibrary;
  if (!lib) return;

  var state = {
    group: 'all',
    categoryId: 'all',
    query: '',
    flat: [],
    filtered: [],
    panelIndex: -1,
  };

  var catById = {};
  lib.categories.forEach(function (c) {
    catById[c.id] = c;
  });

  lib.categories.forEach(function (cat) {
    cat.prompts.forEach(function (p, i) {
      state.flat.push({
        prompt: p,
        category: cat,
        shotNum: String(cat.num).padStart(2, '0') + '.' + String(i + 1).padStart(2, '0'),
      });
    });
  });

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

  function normalize(s) {
    return String(s || '').toLowerCase();
  }

  function applyFilters() {
    var q = normalize(state.query);
    state.filtered = state.flat.filter(function (row) {
      if (state.group !== 'all' && row.category.group !== state.group) return false;
      if (state.categoryId !== 'all' && row.category.id !== state.categoryId) return false;
      if (!q) return true;
      var hay = normalize(row.prompt.title + ' ' + row.prompt.text + ' ' + (row.prompt.builtFrom || '') + ' ' + row.prompt.bestFor + ' ' + row.category.name);
      return hay.indexOf(q) !== -1;
    });
  }

  function displayCounts() {
    var site = window.XFreezeSite;
    var prompts = site && site.display ? site.display.motionPrompts : lib.totalPrompts;
    var categories = site && site.display ? site.display.motionCategories : lib.totalCategories;
    return { prompts: prompts, categories: categories };
  }


  function shortCatLabel(cat) {
    if (cat.shortName) return cat.shortName.replace(/[,;:]$/g, '');
    return cat.name
      .replace(/ Motion Prompts$/i, '')
      .replace(/ Effect Prompts$/i, ' Effects')
      .replace(/Best Combo Recipes/i, 'Recipes')
      .replace(/[,;:]$/g, '');
  }

  function isMobileFilters() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function activeCategoryLabel() {
    if (state.categoryId === 'all') return '';
    var c = catById[state.categoryId];
    return c ? shortCatLabel(c) : '';
  }

  function updateFilterActiveLabel() {
    var el = $('pl-filter-active');
    if (!el) return;
    var catLabel = activeCategoryLabel();
    if (!catLabel) {
      el.hidden = true;
      el.textContent = '';
      return;
    }
    el.hidden = false;
    el.textContent = catLabel;
  }

  function updateSubfiltersWrap(cats) {
    var wrap = $('pl-subfilters-wrap');
    if (!wrap) return;
    // Show subcategory chips whenever the active family has 2+ sections
    // (Camera, Atmosphere, Industry & Scene, Premium, All, etc.)
    var show = cats.length > 1;
    if (show) {
      wrap.hidden = false;
      wrap.removeAttribute('hidden');
      wrap.style.display = '';
      // Keep the chip row open so desktop + mobile always see subcategories
      var details = $('pl-filter-details');
      if (details) details.setAttribute('open', '');
    } else {
      wrap.hidden = true;
      wrap.setAttribute('hidden', '');
      closeFilterPanel();
    }
  }

  function closeFilterPanel() {
    var details = $('pl-filter-details');
    // Only collapse on mobile; desktop always shows the chip row
    if (details && isMobileFilters()) details.removeAttribute('open');
  }

  function syncFilterPanelState() {
    var details = $('pl-filter-details');
    if (!details) return;
    if (!isMobileFilters()) {
      details.setAttribute('open', '');
      return;
    }
    // On mobile, leave open if user opened it or a multi-cat family is active
    var cats = categoriesForActiveGroup();
    if (cats.length > 1) {
      details.setAttribute('open', '');
      return;
    }
    if (!details._xfUserOpened) details.removeAttribute('open');
  }

  function initFilterPanel() {
    var details = $('pl-filter-details');
    if (!details || details._xfPanelBound) return;
    details._xfPanelBound = true;

    syncFilterPanelState();
    window.addEventListener('resize', syncFilterPanelState, { passive: true });

    details.addEventListener('toggle', function () {
      if (isMobileFilters()) details._xfUserOpened = details.open;
    });

    details.addEventListener('click', function (e) {
      if (!isMobileFilters()) return;
      if (e.target.closest('[data-pl-cat]')) {
        setTimeout(closeFilterPanel, 120);
      }
    });
  }

  function renderGroupFilters() {
    var wrap = $('pl-group-filters');
    if (!wrap || !lib.groups) return;
    var order = ['premium', 'combos', 'camera', 'human', 'atmosphere', 'vertical'];
    var html = '<button type="button" class="pl-filter-btn is-active" data-pl-group="all">All</button>';
    order.forEach(function (key) {
      var g = lib.groups[key];
      if (!g) return;
      var cls = '';
      if (key === 'premium') cls = ' pl-filter-btn--premium';
      else if (key === 'combos') cls = ' pl-filter-btn--featured';
      html += '<button type="button" class="pl-filter-btn' + cls + '" data-pl-group="' + key + '">' + escapeHtml(g.name) + '</button>';
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll('[data-pl-group]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-pl-group') === state.group);
    });
    updateFilterActiveLabel();
  }

  function categoriesForActiveGroup() {
    return lib.categories.filter(function (c) {
      if (!c.prompts || !c.prompts.length) return false;
      if (state.group === 'all') return true;
      return c.group === state.group;
    });
  }

  function renderCategoryFilters() {
    var wrap = $('pl-cat-scroll');
    if (!wrap) return;
    var cats = categoriesForActiveGroup();

    if (state.categoryId !== 'all' && !cats.some(function (c) { return c.id === state.categoryId; })) {
      state.categoryId = 'all';
    }

    if (cats.length <= 1) {
      wrap.innerHTML = '';
      wrap.classList.add('is-hidden');
      if (cats.length === 1) state.categoryId = cats[0].id;
      updateSubfiltersWrap(cats);
      updateFilterActiveLabel();
      return;
    }

    wrap.classList.remove('is-hidden');
    updateSubfiltersWrap(cats);
    var allLabel = state.group === 'all' ? 'All categories' : 'All in family';
    var html =
      '<button type="button" class="pl-cat-btn' +
      (state.categoryId === 'all' ? ' is-active' : '') +
      '" data-pl-cat="all">' +
      escapeHtml(allLabel) +
      '</button>';
    cats.forEach(function (c) {
      var label = shortCatLabel(c);
      var active = state.categoryId === c.id ? ' is-active' : '';
      html +=
        '<button type="button" class="pl-cat-btn' +
        active +
        '" data-pl-cat="' +
        escapeHtml(c.id) +
        '" data-pl-hue="' +
        c.hue +
        '" style="--pl-hue:' +
        c.hue +
        '">' +
        escapeHtml(label) +
        '</button>';
    });
    wrap.innerHTML = html;
    updateCatScrollFades();
    updateFilterActiveLabel();
  }

  function updateCatScrollFades() {
    var scroll = $('pl-cat-scroll');
    var wrap = scroll && scroll.closest('.pl-cat-scroll-wrap');
    if (!scroll || !wrap || scroll.classList.contains('is-hidden')) return;

    var max = scroll.scrollWidth - scroll.clientWidth;
    var sl = scroll.scrollLeft;
    wrap.classList.toggle('is-scrollable', max > 4);
    wrap.classList.toggle('is-at-start', sl <= 2);
    wrap.classList.toggle('is-at-end', max <= 2 || sl >= max - 2);
  }

  function bindCatScrollFades() {
    var scroll = $('pl-cat-scroll');
    if (!scroll || scroll._xfFadeBound) return;
    scroll._xfFadeBound = true;
    scroll.addEventListener('scroll', updateCatScrollFades, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(updateCatScrollFades).observe(scroll);
    }
    window.addEventListener('resize', updateCatScrollFades, { passive: true });
    updateCatScrollFades();
  }

  function renderMeta() {
    var el = $('pl-results-meta');
    if (!el) return;
    var n = state.filtered.length;
    var display = displayCounts();
    el.textContent = n === lib.totalPrompts
      ? display.prompts + '+ motion prompts across ' + display.categories + '+ categories'
      : n + ' prompt' + (n === 1 ? '' : 's') + ' matching your filters';
    renderSuitableNote();
  }

  function renderSuitableNote() {
    var wrap = $('pl-suitable');
    var textEl = $('pl-suitable-text');
    if (!wrap || !textEl) return;

    // Only when a specific category is selected (not All / All in family)
    if (state.categoryId === 'all') {
      wrap.hidden = true;
      textEl.textContent = '';
      return;
    }

    var cat = catById[state.categoryId];
    var note = cat && (cat.suitableFor || cat.desc || cat.intro);
    if (!note) {
      wrap.hidden = true;
      textEl.textContent = '';
      return;
    }

    textEl.textContent = note;
    wrap.hidden = false;
  }

  function renderGrid() {
    var grid = $('pl-grid');
    if (!grid) return;

    if (!state.filtered.length) {
      grid.innerHTML =
        '<div class="pl-empty"><p>No prompts match. Try a different search or category.</p></div>';
      return;
    }

    var firstPaint = !grid.classList.contains('is-ready');
    grid.innerHTML = state.filtered
      .map(function (row, idx) {
        var p = row.prompt;
        var c = row.category;
        var catLabel = c.name
          .replace(/ Motion Prompts$/i, '')
          .replace(/ Motion$/i, '')
          .replace(/ Effect Prompts$/i, ' Effects');
        var premiumBadge = (p.premium || c.premium)
          ? '<span class="pl-card__premium"><i class="fa-solid fa-crown" aria-hidden="true"></i> Premium</span>'
          : '';
        return (
          '<article class="pl-card' + (p.premium || c.premium ? ' pl-card--premium' : '') + '" role="button" tabindex="0" data-pl-idx="' +
          idx +
          '" style="--card-hue:' +
          c.hue +
          '">' +
          '<div class="pl-card__head">' +
          '<span class="pl-card__badge">' +
          escapeHtml(catLabel) +
          '</span>' +
          premiumBadge +
          '<span class="pl-card__num">' +
          row.shotNum +
          '</span>' +
          '</div>' +
          '<h3 class="pl-card__title">' +
          escapeHtml(p.title) +
          '</h3>' +
          '<p class="pl-card__preview">' +
          escapeHtml(p.text) +
          '</p>' +
          '<div class="pl-card__foot">' +
          '<span class="pl-card__best">' +
          (p.bestFor ? escapeHtml(p.bestFor) : '') +
          '</span>' +
          '<div class="pl-card__actions">' +
          (window.XFreezeFavorites
            ? window.XFreezeFavorites.heartButtonHtml(
                'prompts',
                c.id + '::' + p.title
              )
            : '') +
          '<button type="button" class="pl-card__copy" data-pl-copy="' +
          idx +
          '" aria-label="Copy prompt"><i class="fa-regular fa-copy"></i></button>' +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    grid.classList.add('is-ready');
    if (firstPaint) {
      grid.classList.add('pl-grid--enter');
      window.setTimeout(function () {
        grid.classList.remove('pl-grid--enter');
      }, 700);
    } else {
      grid.classList.remove('pl-grid--enter');
    }
    if (window.XFreezeScrollReveal && window.XFreezeScrollReveal.reveal) {
      window.XFreezeScrollReveal.reveal(grid);
    }
  }

  function copyablePromptText(row) {
    return row.prompt.text || '';
  }

  function copyText(text, btn) {
    function done() {
      if (btn) {
        btn.classList.add('is-copied');
        var icon = btn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-check';
        setTimeout(function () {
          btn.classList.remove('is-copied');
          if (icon) icon.className = 'fa-regular fa-copy';
        }, 1600);
      }
      if (window.XFreezeSupportToast) {
        window.XFreezeSupportToast.show({ context: 'copy', subtitle: 'Paste into Grok Imagine, Runway, Kling, or your image-to-video tool.' });
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function openPanel(idx) {
    var row = state.filtered[idx];
    if (!row) return;
    state.panelIndex = idx;

    var backdrop = $('pl-panel-backdrop');
    var panel = $('pl-panel');
    if (!backdrop || !panel) return;

    var p = row.prompt;
    var c = row.category;
    var catEl = $('pl-panel-cat');
    var titleEl = $('pl-panel-title');
    var textEl = $('pl-panel-text');
    var shotEl = $('pl-panel-shot');
    var builtWrap = $('pl-panel-built');
    var builtText = $('pl-panel-built-text');
    var bestWrap = $('pl-panel-best');
    var bestText = $('pl-panel-best-text');

    if (catEl) {
      catEl.textContent = c.name;
      catEl.classList.toggle('is-premium', !!(p.premium || c.premium));
    }
    if (titleEl) titleEl.textContent = p.title;
    if (textEl) textEl.textContent = p.text;
    if (shotEl) shotEl.textContent = row.shotNum;
    if (builtWrap && builtText) {
      builtWrap.style.display = p.builtFrom ? 'block' : 'none';
      builtText.textContent = p.builtFrom || '';
    }
    if (bestWrap && bestText) {
      bestWrap.style.display = p.bestFor ? 'block' : 'none';
      bestText.textContent = p.bestFor || '';
    }

    var posEl = $('pl-panel-pos');
    if (posEl) {
      posEl.textContent = (idx + 1) + ' / ' + state.filtered.length;
    }

    panel.style.setProperty('--panel-hue', c.hue);
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pl-panel-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Stop smooth-scroll hijacking so the panel body can scroll
    if (window.XFreezeLenis && typeof window.XFreezeLenis.stop === 'function') {
      window.XFreezeLenis.stop();
    }

    var bodyEl = $('pl-panel-body') || panel.querySelector('.pl-panel__body');
    if (bodyEl) bodyEl.scrollTop = 0;

    panel.focus();
  }

  function closePanel() {
    var backdrop = $('pl-panel-backdrop');
    var panel = $('pl-panel');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    if (panel) {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('pl-panel-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    state.panelIndex = -1;

    if (window.XFreezeLenis && typeof window.XFreezeLenis.start === 'function') {
      window.XFreezeLenis.start();
    }
  }

  function panelNav(delta) {
    if (state.panelIndex < 0) return;
    var next = state.panelIndex + delta;
    if (next < 0 || next >= state.filtered.length) return;
    openPanel(next);
  }

  function refresh() {
    applyFilters();
    renderMeta();
    renderGrid();
    if (state.panelIndex >= 0) {
      if (state.panelIndex >= state.filtered.length) closePanel();
      else openPanel(state.panelIndex);
    }
  }

  function bindFilters() {
    var groupWrap = $('pl-group-filters');
    if (groupWrap) {
      groupWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-pl-group]');
        if (!btn) return;
        state.group = btn.getAttribute('data-pl-group');
        state.categoryId = 'all';
        groupWrap.querySelectorAll('[data-pl-group]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        renderCategoryFilters();
        refresh();
      });
    }

    var catWrap = $('pl-cat-scroll');
    if (catWrap) {
      catWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-pl-cat]');
        if (!btn) return;
        state.categoryId = btn.getAttribute('data-pl-cat');
        var hue = btn.getAttribute('data-pl-hue');
        catWrap.querySelectorAll('[data-pl-cat]').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          if (b === btn && hue) b.style.setProperty('--pl-hue', hue);
        });
        refresh();
      });
    }

    var search = $('pl-search');
    if (search) {
      var timer;
      search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.query = search.value.trim();
          refresh();
        }, 180);
      });
    }
  }

  function bindGrid() {
    var grid = $('pl-grid');
    if (!grid) return;

    grid.addEventListener('click', function (e) {
      var favBtn = e.target.closest('[data-xf-fav-type="prompts"]');
      if (favBtn && window.XFreezeFavorites) {
        e.stopPropagation();
        e.preventDefault();
        var favId = favBtn.getAttribute('data-xf-fav-id') || '';
        var row =
          state.filtered.find(function (r) {
            return r.category.id + '::' + r.prompt.title === favId;
          }) || null;
        if (!row) {
          /* fallback: card index near button */
          var cardEl = favBtn.closest('[data-pl-idx]');
          if (cardEl) {
            row = state.filtered[parseInt(cardEl.getAttribute('data-pl-idx'), 10)];
          }
        }
        if (!row) return;
        window.XFreezeFavorites.toggle('prompts', {
          id: row.category.id + '::' + row.prompt.title,
          title: row.prompt.title,
          text: row.prompt.text || '',
          bestFor: row.prompt.bestFor || '',
          categoryId: row.category.id,
          categoryName: row.category.name || '',
          shotNum: row.shotNum,
          premium: Boolean(row.prompt.premium || row.category.premium),
        });
        window.XFreezeFavorites.syncButton(favBtn);
        return;
      }
      var copyBtn = e.target.closest('[data-pl-copy]');
      if (copyBtn) {
        e.stopPropagation();
        var idx = parseInt(copyBtn.getAttribute('data-pl-copy'), 10);
        var rowCopy = state.filtered[idx];
        if (rowCopy) copyText(copyablePromptText(rowCopy), copyBtn);
        return;
      }
      var card = e.target.closest('[data-pl-idx]');
      if (card) openPanel(parseInt(card.getAttribute('data-pl-idx'), 10));
    });

    grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('[data-pl-idx]');
      if (!card) return;
      e.preventDefault();
      openPanel(parseInt(card.getAttribute('data-pl-idx'), 10));
    });
  }

  function bindPanel() {
    var panel = $('pl-panel');
    var backdrop = $('pl-panel-backdrop');
    if (panel) panel.setAttribute('tabindex', '-1');
    if (backdrop) backdrop.addEventListener('click', closePanel);
    var closeBtn = $('pl-panel-close');
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    var copyBtn = $('pl-panel-copy');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      if (state.panelIndex < 0) return;
      copyText(copyablePromptText(state.filtered[state.panelIndex]), copyBtn);
    });
    var prevBtn = $('pl-panel-prev');
    if (prevBtn) prevBtn.addEventListener('click', function () { panelNav(-1); });
    var nextBtn = $('pl-panel-next');
    if (nextBtn) nextBtn.addEventListener('click', function () { panelNav(1); });
    document.addEventListener('keydown', function (e) {
      var panelEl = $('pl-panel'); if (!panelEl || !panelEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') closePanel();
      if (e.key === 'ArrowLeft') panelNav(-1);
      if (e.key === 'ArrowRight') panelNav(1);
    });
  }

  function buildMarquee() {
    var track = $('pl-marquee-track');
    if (!track) return;
    var titles = state.flat.slice(0, 40).map(function (r) {
      return '<span>' + escapeHtml(r.prompt.title) + '</span>';
    });
    var html = titles.join('');
    track.innerHTML = html + html;
  }

  var HERO_TYPEWRITER_FONTS = [
    'Inter, Roboto, Open Sans, system-ui, sans-serif',
  ];

  function shuffleInPlace(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function heroPromptBody(text, maxSentences) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';

    var sentences = [];
    var re = /[^.!?]+[.!?]+/g;
    var match;
    while ((match = re.exec(text)) !== null) {
      sentences.push(match[0].trim());
      if (sentences.length >= maxSentences) break;
    }

    if (!sentences.length) return text;
    if (sentences.join(' ').length >= text.length - 2) return text;
    return sentences.join(' ');
  }

  function heroBestFor(text) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';
    if (text.length <= 110) return text;
    var cut = text.slice(0, 110).replace(/\s+\S*$/, '').trim();
    return cut + '…';
  }

  function initHeroTypewriter() {
    var panel = $('pl-hero-typewriter-panel');
    var titleEl = $('pl-tw-title');
    var bodyEl = $('pl-tw-body');
    var tagEl = $('pl-tw-tag');
    var metaEl = $('pl-tw-meta');
    var bestEl = $('pl-tw-best');
    if (!panel || !titleEl || !bodyEl || !tagEl) return;
    if (window.matchMedia('(max-width: 1023px)').matches) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pool = shuffleInPlace(state.flat.slice());
    var promptIndex = 0;
    var fontIndex = 0;
    var timers = [];
    var stopped = false;

    function clearTimers() {
      timers.forEach(function (id) { clearTimeout(id); });
      timers = [];
    }

    function delay(ms) {
      return new Promise(function (resolve) {
        timers.push(setTimeout(resolve, ms));
      });
    }

    function typeInto(el, text, speed) {
      el.classList.add('is-typing');
      el.textContent = '';
      if (reduced) {
        el.textContent = text;
        el.classList.remove('is-typing');
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        var i = 0;
        function step() {
          if (stopped) {
            el.classList.remove('is-typing');
            resolve();
            return;
          }
          if (i >= text.length) {
            el.classList.remove('is-typing');
            resolve();
            return;
          }
          el.textContent += text.charAt(i);
          i += 1;
          timers.push(setTimeout(step, speed));
        }
        step();
      });
    }

    function nextRow() {
      var row = pool[promptIndex % pool.length];
      promptIndex += 1;
      if (promptIndex >= pool.length) {
        promptIndex = 0;
        shuffleInPlace(pool);
      }
      return row;
    }

    async function cycle() {
      if (stopped || !document.body.contains(panel)) return;

      var row = nextRow();
      panel.classList.add('is-swapping');
      await delay(300);

      panel.style.fontFamily = HERO_TYPEWRITER_FONTS[fontIndex % HERO_TYPEWRITER_FONTS.length];
      fontIndex += 1;
      tagEl.textContent = shortCatLabel(row.category);
      if (metaEl) {
        var groupName = lib.groups && lib.groups[row.category.group]
          ? lib.groups[row.category.group].name
          : 'Motion prompt';
        metaEl.textContent = row.shotNum + ' · ' + groupName;
      }
      titleEl.textContent = '';
      bodyEl.textContent = '';
      if (bestEl) bestEl.textContent = '';
      panel.classList.remove('is-swapping');

      var bodyText = heroPromptBody(row.prompt.text, 3);
      var bestText = heroBestFor(row.prompt.bestFor);

      await typeInto(titleEl, row.prompt.title, 36);
      await delay(220);
      await typeInto(bodyEl, bodyText, 9);
      if (bestEl && bestText) {
        await delay(180);
        await typeInto(bestEl, bestText, 8);
      }
      await delay(reduced ? 4800 : 3600);
      cycle();
    }

    panel._xfStopTypewriter = function () {
      stopped = true;
      clearTimers();
    };

    cycle();
  }

  function initFromHash() {
    var hash = (location.hash || '').replace('#', '');
    if (!hash) return;
    applyFilters();
    var idx = state.filtered.findIndex(function (r) {
      return r.prompt.id === hash;
    });
    if (idx >= 0) {
      setTimeout(function () {
        openPanel(idx);
      }, 400);
    }
  }

  function init() {
    initFilterPanel();
    renderGroupFilters();
    renderCategoryFilters();
    buildMarquee();
    initHeroTypewriter();
    bindFilters();
    bindCatScrollFades();
    bindGrid();
    bindPanel();
    refresh();
    initFromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();