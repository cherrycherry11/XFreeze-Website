/**
 * X Freeze Skills Browser - copy-first, no GitHub required
 */
(function (global) {
  const data = global.XFreezeSkillsBrowseIndex || global.XFreezeSkillsBrowseData || {};
  const BUNDLES = data.BUNDLES || [];
  const MEGA = data.MEGA || [];
  const CONNECTOR = new Set(data.CONNECTOR || []);
  const PACK_BASE = 'data/skills-packs/';
  const HASH_PACK = 'skill-pack/';
  const HASH_CAT = 'skills-cat/';
  const FILTER_INSTANT = 'instant';

  let query = '';
  let activeCategory = 'all';
  let suppressRoute = false;
  let modalSkill = null;
  let currentBundle = null;
  const packCache = new Map();
  const packLoads = new Map();

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Strip redundant "Premium" prefix - tier badge already shows premium packs. */
  function displayBundleName(name) {
    return String(name || '').replace(/^Premium\s+/i, '').trim();
  }

  function countBadge(count, label) {
    const n = Number(count) || 0;
    const unit = label || (n === 1 ? 'skill' : 'skills');
    return (
      '<span class="skills-count-badge">' +
      '<span class="skills-count-num">' + esc(String(n)) + '</span>' +
      '<span class="skills-count-label">' + esc(unit) + '</span>' +
      '</span>'
    );
  }

  const CONNECTOR_SETUP_URL = 'connector-setup.html';

  function connectorSetupPrefix(skill) {
    const apps = (skill.integrations && skill.integrations.length)
      ? skill.integrations.join(', ')
      : (skill.connectors && skill.connectors.length)
        ? skill.connectors.join(', ')
        : 'see skill description';
    return (
      'CONNECTOR SKILL - requires live app access.\n' +
      'Apps: ' + apps + '\n' +
      'Setup guide: ' + CONNECTOR_SETUP_URL + '\n' +
      'Connector names and tool names vary by AI tool. Verify the live tools before calling anything.\n' +
      'Grok: /mcps -> enable apps -> press r to refresh.\n\n' +
      '---\n\n'
    );
  }

  function buildCopyText(skill) {
    const base = skill.aiInstallPrompt || '';
    if (skill.requiresConnectors) {
      return connectorSetupPrefix(skill) + base;
    }
    return base;
  }

  function mergePackIntoBundle(bundle, pack) {
    if (!bundle || !pack || !pack.skills) return bundle;
    const byId = new Map(bundle.skills.map(function (s) { return [s.id, s]; }));
    pack.skills.forEach(function (full) {
      const skill = byId.get(full.id);
      if (!skill) return;
      if (full.aiInstallPrompt) skill.aiInstallPrompt = full.aiInstallPrompt;
      if (full.skillContent) skill.skillContent = full.skillContent;
    });
    return bundle;
  }

  function loadPack(bundleId) {
    if (packCache.has(bundleId)) {
      return Promise.resolve(packCache.get(bundleId));
    }
    if (packLoads.has(bundleId)) {
      return packLoads.get(bundleId);
    }

    const bundle = BUNDLES.find(function (b) { return b.id === bundleId; });
    const hasFullContent = bundle && bundle.skills.every(function (s) {
      return s.aiInstallPrompt || s.skillContent;
    });
    if (hasFullContent) {
      packCache.set(bundleId, bundle);
      return Promise.resolve(bundle);
    }

    const request = fetch(PACK_BASE + encodeURIComponent(bundleId) + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load pack: ' + res.status);
        return res.json();
      })
      .then(function (pack) {
        if (bundle) mergePackIntoBundle(bundle, pack);
        packCache.set(bundleId, bundle || pack);
        return bundle || pack;
      })
      .finally(function () {
        packLoads.delete(bundleId);
      });

    packLoads.set(bundleId, request);
    return request;
  }

  function copyText(text, btn) {
    const orig = btn.textContent;
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = 'Copied';
      btn.classList.add('done');
      if (global.XFreezeSupportToast) {
        global.XFreezeSupportToast.afterCopy();
      }
      setTimeout(function () {
        btn.textContent = orig;
        btn.classList.remove('done');
      }, 2000);
    }).catch(function () {
      window.prompt('Copy:', text);
    });
  }

  function bundlesForCategory(cat) {
    if (cat === FILTER_INSTANT) {
      return BUNDLES.filter(function (b) { return !CONNECTOR.has(b.id); });
    }
    if (cat === 'all') return BUNDLES;
    const pair = MEGA.find(function (p) { return p[0] === cat; });
    if (!pair) return BUNDLES;
    const set = new Set(pair[1]);
    return BUNDLES.filter(function (b) { return set.has(b.id); });
  }

  function filterBundles(list) {
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(function (b) {
      if (b.name.toLowerCase().includes(q) || b.id.includes(q)) return true;
      if (b.desc && b.desc.toLowerCase().includes(q)) return true;
      return b.skills.some(function (s) {
        return s.id.includes(q) || (s.description || '').toLowerCase().includes(q);
      });
    });
  }

  function renderCurrentGrid() {
    renderGrid(filterBundles(bundlesForCategory(activeCategory)));
  }

  function updateCategoryPills() {
    const el = $('xf-skills-filter-pills');
    if (!el) return;
    el.querySelectorAll('.skills-filter-pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === activeCategory);
    });
  }

  function setHash(hash, push) {
    const base = location.pathname + location.search;
    const next = hash ? base + '#' + hash : base;
    suppressRoute = true;
    if (push) history.pushState({ xfSkills: true }, '', next);
    else history.replaceState({ xfSkills: true }, '', next);
    suppressRoute = false;
  }

  function showHomeUI() {
    $('xf-skills-view-home').classList.remove('skills-browse-hidden');
    $('xf-skills-view-detail').classList.add('skills-browse-hidden');
    currentBundle = null;
    renderCurrentGrid();
  }

  function integrationListForBundle(b) {
    const set = new Set();
    b.skills.forEach(function (s) {
      (s.integrations || []).forEach(function (i) { set.add(i); });
      if (!s.integrations || !s.integrations.length) {
        (s.connectors || []).forEach(function (c) { set.add('@' + c); });
      }
    });
    return Array.from(set);
  }

  function renderConnectorBanner(b) {
    const el = $('xf-skills-connector-banner');
    if (!el) return;
    if (!CONNECTOR.has(b.id)) {
      el.classList.add('skills-browse-hidden');
      el.innerHTML = '';
      return;
    }
    const apps = integrationListForBundle(b);
    el.classList.remove('skills-browse-hidden');
    el.innerHTML =
      '<h4><i class="fa-solid fa-plug" aria-hidden="true"></i> Connector pack</h4>' +
      '<p>Needs: <strong>' + esc(apps.join(', ') || 'live app access') + '</strong>. Tool names vary, so verify the connector inside your AI tool before running writes.</p>' +
      '<a href="' + CONNECTOR_SETUP_URL + '" class="skills-connector-banner-link">Connector setup guide <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>';
  }

  function openModal(skill) {
    modalSkill = skill;
    const modal = $('xf-skill-modal');
    const title = $('xf-skill-modal-title');
    const body = $('xf-skill-modal-body');
    if (!modal || !title || !body) return;
    title.textContent = skill.slash || skill.id;
    body.textContent = skill.skillContent || '(No preview available)';
    modal.classList.remove('skills-browse-hidden');
    modal.hidden = false;
    document.body.classList.add('skills-modal-open');
  }

  function closeModal() {
    const modal = $('xf-skill-modal');
    if (!modal) return;
    modal.classList.add('skills-browse-hidden');
    modal.hidden = true;
    document.body.classList.remove('skills-modal-open');
    modalSkill = null;
  }

  function renderBundleSkillList(b) {
    const list = $('xf-skills-skill-list');
    if (!list || !b) return;

    list.innerHTML = b.skills.map(function (s, i) {
      const skillConn = s.requiresConnectors;
      const connBadge = skillConn
        ? '<span class="skills-skill-connector-badge">Connector</span>'
        : '<span class="skills-skill-instant-badge">Instant</span>';
      return (
        '<div class="skills-browse-skill-row' + (skillConn ? ' skills-browse-skill-row--connector' : '') + '">' +
        '<div class="skills-browse-skill-body">' +
        '<span class="skills-browse-skill-index" aria-hidden="true">' + esc(String(i + 1)) + '</span>' +
        '<div class="skills-browse-skill-main">' +
        '<div class="skills-browse-skill-title-row">' +
        '<span class="skills-browse-skill-id">' + esc(s.slash) + '</span>' +
        connBadge +
        '</div>' +
        '<p class="skills-browse-skill-desc">' + esc(s.description || '') + '</p>' +
        (skillConn && s.integrations && s.integrations.length
          ? '<p class="skills-browse-skill-integrations">Needs: ' + esc(s.integrations.join(', ')) + '</p>'
          : '') +
        '</div></div>' +
        '<div class="skills-browse-skill-actions">' +
        '<button type="button" class="skills-browse-btn primary" data-copy-skill="' + esc(s.id) + '">Copy prompt</button>' +
        '<button type="button" class="skills-browse-btn" data-preview-skill="' + esc(s.id) + '">Preview</button>' +
        '</div></div>'
      );
    }).join('');

    list.querySelectorAll('[data-copy-skill]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const skillId = btn.getAttribute('data-copy-skill');
        const skill = b.skills.find(function (x) { return x.id === skillId; });
        if (!skill) return;
        if (skill.aiInstallPrompt) {
          copyText(buildCopyText(skill), btn);
          return;
        }
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Loading…';
        loadPack(b.id).then(function () {
          const loaded = b.skills.find(function (x) { return x.id === skillId; });
          copyText(loaded ? buildCopyText(loaded) : '', btn);
        }).catch(function () {
          window.alert('Could not load this skill. Please try again.');
        }).finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
      });
    });

    list.querySelectorAll('[data-preview-skill]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const skillId = btn.getAttribute('data-preview-skill');
        const skill = b.skills.find(function (x) { return x.id === skillId; });
        if (!skill) return;
        if (skill.skillContent) {
          openModal(skill);
          return;
        }
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Loading…';
        loadPack(b.id).then(function () {
          const loaded = b.skills.find(function (x) { return x.id === skillId; });
          if (loaded) openModal(loaded);
        }).catch(function () {
          window.alert('Could not load preview. Please try again.');
        }).finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
      });
    });

    const detail = $('xf-skills-view-detail');
    if (global.XFreezeScrollReveal && global.XFreezeScrollReveal.reveal) {
      if (detail) detail.classList.remove('is-revealed');
      requestAnimationFrame(function () {
        if (detail) global.XFreezeScrollReveal.reveal(detail);
        if (list) global.XFreezeScrollReveal.reveal(list);
      });
    }
  }

  function showBundleUI(id) {
    const b = BUNDLES.find(function (x) { return x.id === id; });
    if (!b) {
      showHomeUI();
      return;
    }
    currentBundle = b;

    $('xf-skills-view-home').classList.add('skills-browse-hidden');
    const detail = $('xf-skills-view-detail');
    detail.classList.remove('skills-browse-hidden');

    const conn = CONNECTOR.has(b.id);
    const tag = $('xf-skills-detail-tag');
    tag.textContent = b.tier === 'premium' ? 'Premium' : (conn ? 'Connector' : 'Instant');
    tag.className = 'skills-browse-tag' + (conn ? ' connector' : '') + (b.tier === 'premium' ? ' premium' : '');

    $('xf-skills-detail-title').textContent = displayBundleName(b.name);
    $('xf-skills-detail-desc').textContent = b.desc || '';
    $('xf-skills-detail-count').innerHTML = countBadge(b.skillCount || b.skills.length);
    renderConnectorBanner(b);

    const list = $('xf-skills-skill-list');
    renderBundleSkillList(b);

    loadPack(b.id).then(function () {
      if (currentBundle && currentBundle.id === b.id) {
        renderBundleSkillList(b);
      }
    }).catch(function () {
      if (currentBundle && currentBundle.id === b.id && list) {
        list.innerHTML = '<p class="skills-empty">Could not load skill prompts. Refresh and try again.</p>';
      }
    });
  }

  function navigateHome() {
    if (location.hash) {
      history.back();
      return;
    }
    showHomeUI();
  }

  function navigateToPack(id) {
    setHash(HASH_PACK + id, true);
    showBundleUI(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function navigateToCategory(cat) {
    activeCategory = cat;
    updateCategoryPills();
    showHomeUI();
    renderCurrentGrid();
    const catHash = cat === 'all' ? '' : HASH_CAT + encodeURIComponent(cat);
    setHash(catHash, true);
  }

  function applyRoute() {
    const h = location.hash.replace(/^#/, '');

    if (h.indexOf(HASH_PACK) === 0 || h.indexOf('bundle/') === 0) {
      const id = h.indexOf(HASH_PACK) === 0 ? h.slice(HASH_PACK.length) : h.slice(7);
      showBundleUI(id);
      return;
    }

    if (h.indexOf(HASH_CAT) === 0) {
      activeCategory = decodeURIComponent(h.slice(HASH_CAT.length));
      updateCategoryPills();
      showHomeUI();
      return;
    }

    activeCategory = 'all';
    updateCategoryPills();
    showHomeUI();
  }

  function onRouteChange() {
    if (suppressRoute) return;
    applyRoute();
  }

  function renderGrid(list) {
    const grid = $('xf-skills-bundle-grid');
    if (!grid) return;
    const empty = $('xf-skills-empty');
    if (empty) empty.classList.toggle('skills-browse-hidden', list.length > 0);

    grid.innerHTML = list.map(function (b) {
      const conn = CONNECTOR.has(b.id);
      const premium = b.tier === 'premium';
      const tagText = premium ? 'Premium' : (conn ? 'Connector' : 'Instant');
      const useCase = b.realWorldUseCase || b.group || '';
      return (
        '<article class="skills-browse-card" data-id="' + esc(b.id) + '" tabindex="0" role="button">' +
        '<div class="skills-browse-card-top">' +
        '<span class="skills-browse-tag' + (conn ? ' connector' : '') + (premium ? ' premium' : '') + '">' + tagText + '</span>' +
        countBadge(b.skillCount || b.skills.length) +
        '</div>' +
        '<h4>' + esc(displayBundleName(b.name)) + '</h4>' +
        '<p class="skills-browse-card-desc">' + esc(b.desc || '') + '</p>' +
        (useCase ? '<p class="skills-browse-card-usecase">' + esc(useCase) + '</p>' : '') +

        '<div class="skills-browse-card-meta">' +
        '<span class="skills-browse-card-link">Browse pack <i class="fa-solid fa-arrow-right" style="font-size:0.65rem"></i></span>' +
        '</div></article>'
      );
    }).join('');

    grid.querySelectorAll('.skills-browse-card').forEach(function (c) {
      const packId = c.getAttribute('data-id');
      function open() { navigateToPack(packId); }
      c.addEventListener('click', open);
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
      c.addEventListener('mouseenter', function () {
        loadPack(packId).catch(function () {});
      }, { once: true });
    });

    if (global.XFreezeScrollReveal) {
      global.XFreezeScrollReveal.reveal(grid);
      var gridWrap = grid.closest('[data-scroll-reveal]') || grid.parentElement;
      if (gridWrap) global.XFreezeScrollReveal.reveal(gridWrap);
      global.XFreezeScrollReveal.refresh();
    }
  }

  function buildCategoryFilters() {
    const el = $('xf-skills-filter-pills');
    if (!el) return;

    const pills = [
      { id: 'all', label: 'All packs' },
      { id: FILTER_INSTANT, label: 'Instant only' },
    ].concat(MEGA.map(function (p) { return { id: p[0], label: p[0] }; }));

    el.innerHTML = pills.map(function (p) {
      const active = p.id === activeCategory ? ' active' : '';
      const instantClass = p.id === FILTER_INSTANT ? ' skills-filter-pill--instant' : '';
      return '<button type="button" class="skills-filter-pill' + active + instantClass + '" data-cat="' + esc(p.id) + '">' + esc(p.label) + '</button>';
    }).join('');

    el.querySelectorAll('.skills-filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigateToCategory(btn.getAttribute('data-cat'));
      });
    });
  }

  function updateHeroStats() {
    const total = $('xf-stat-total');
    const instant = $('xf-stat-instant');
    const display = (window.XFreezeSite && window.XFreezeSite.display) || {};
    const totalDisplay = String(display.skills != null ? display.skills : 1000) + '+';
    const instantDisplay = String(display.instantSkills != null ? display.instantSkills : 810) + '+';
    if (total) total.textContent = totalDisplay;
    if (instant) instant.textContent = instantDisplay;
    if (window.XFreezeSite && window.XFreezeSite.applyCounts) {
      window.XFreezeSite.applyCounts();
    }
  }

  function initModal() {
    document.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
    var modalBody = $('xf-skill-modal-body');
    if (modalBody) {
      modalBody.addEventListener('wheel', function (e) {
        e.stopPropagation();
      }, { passive: true });
    }
    const copyBtn = $('xf-skill-modal-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (!modalSkill || !currentBundle) return;
        if (modalSkill.aiInstallPrompt) {
          copyText(buildCopyText(modalSkill), copyBtn);
          return;
        }
        const original = copyBtn.textContent;
        copyBtn.disabled = true;
        copyBtn.textContent = 'Loading…';
        loadPack(currentBundle.id).then(function () {
          copyText(buildCopyText(modalSkill), copyBtn);
        }).catch(function () {
          window.alert('Could not load this skill. Please try again.');
        }).finally(function () {
          copyBtn.disabled = false;
          copyBtn.textContent = original;
        });
      });
    }
  }

  function init() {
    if (!BUNDLES.length) {
      const grid = $('xf-skills-bundle-grid');
      if (grid) {
        grid.innerHTML = '<p class="skills-empty">Skills data failed to load. Check data/skills-browse-index.js is included.</p>';
      }
      return;
    }

    updateHeroStats();
    initModal();

    const search = $('xf-skills-search');
    if (search) {
      search.addEventListener('input', function () {
        query = search.value;
        if (!$('xf-skills-view-detail').classList.contains('skills-browse-hidden')) {
          navigateHome();
        } else {
          renderCurrentGrid();
        }
      });
    }

    const back = $('xf-skills-back-btn');
    if (back) back.addEventListener('click', navigateHome);

    buildCategoryFilters();

    if (!location.hash) {
      history.replaceState({ xfSkills: true }, '', location.pathname + location.search);
    }

    applyRoute();

    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('hashchange', onRouteChange);
  }

  global.XFreezeSkillsBrowse = {
    init: init,
    showBundle: navigateToPack,
    showHome: navigateHome,
  };
})(window);
