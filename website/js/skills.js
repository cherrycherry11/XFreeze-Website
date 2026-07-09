/**
 * X Freeze Skills Library - browse, search, copy install prompts
 */
(function (global) {
  const cfg = global.XFreezeSkillsConfig;
  let catalog = null;
  let activeCategory = 'all';
  let activeBundleId = null;
  let searchQuery = '';

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function loadCatalog() {
    const url = cfg.CATALOG_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load catalog: ' + res.status);
    catalog = cfg.patchGithubUrls(await res.json());
    return catalog;
  }

  function bundlesForCategory(catId) {
    if (!catalog) return [];
    if (catId === 'all') return catalog.bundles;
    const cat = cfg.MEGA_CATEGORIES.find(function (c) { return c.id === catId; });
    if (!cat || !cat.bundles) return catalog.bundles;
    const set = new Set(cat.bundles);
    return catalog.bundles.filter(function (b) { return set.has(b.id); });
  }

  function filterBundles(list) {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(function (b) {
      if (b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)) return true;
      if (b.desc && b.desc.toLowerCase().includes(q)) return true;
      return b.skills.some(function (s) {
        return s.id.includes(q) || (s.description && s.description.toLowerCase().includes(q));
      });
    });
  }

  function isConnectorBundle(bundleId) {
    return cfg.CONNECTOR_BUNDLE_IDS.has(bundleId);
  }

  function getSkillPrompt(bundleId, skillId) {
    if (!catalog) return '';
    const bundle = catalog.bundles.find(function (b) { return b.id === bundleId; });
    if (!bundle) return '';
    const skill = bundle.skills.find(function (s) { return s.id === skillId; });
    return skill ? (skill.aiInstallPrompt || '') : '';
  }

  function copyText(text, btn) {
    const original = btn.innerHTML;
    navigator.clipboard.writeText(text).then(function () {
      btn.innerHTML = '<i class="fa-solid fa-check text-xs"></i> Copied';
      btn.classList.add('copy-btn--done');
      setTimeout(function () {
        btn.innerHTML = original;
        btn.classList.remove('copy-btn--done');
      }, 2000);
    }).catch(function () {
      window.prompt('Copy this text:', text);
    });
  }

  function renderStats() {
    const el = $('skills-stats');
    if (!el || !catalog) return;
    el.innerHTML =
      '<div class="skills-stat"><span class="skills-stat-num">' + catalog.totalSkills + '</span><span class="skills-stat-label">Skills</span></div>' +
      '<div class="skills-stat"><span class="skills-stat-num">' + catalog.totalBundles + '</span><span class="skills-stat-label">Bundles</span></div>' +
      '<div class="skills-stat"><span class="skills-stat-num">3</span><span class="skills-stat-label">AI tools</span></div>';
  }

  function renderCategoryTabs() {
    const el = $('skills-categories');
    if (!el) return;
    el.innerHTML = cfg.MEGA_CATEGORIES.map(function (cat) {
      const active = cat.id === activeCategory ? ' skills-tab--active' : '';
      return '<button type="button" class="skills-tab' + active + '" data-cat="' + cat.id + '">' +
        '<i class="fa-solid ' + cat.icon + ' text-xs opacity-70"></i> ' + escapeHtml(cat.label) +
        '</button>';
    }).join('');
    el.querySelectorAll('.skills-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = btn.getAttribute('data-cat');
        activeBundleId = null;
        location.hash = '';
        renderCategoryTabs();
        renderBundleGrid();
        hideBundleDetail();
      });
    });
  }

  function renderBundleGrid() {
    const grid = $('skills-bundle-grid');
    const empty = $('skills-empty');
    if (!grid) return;
    const bundles = filterBundles(bundlesForCategory(activeCategory));
    if (!bundles.length) {
      grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }
    if (empty) empty.classList.add('hidden');

    grid.innerHTML = bundles.map(function (b) {
      const connector = isConnectorBundle(b.id);
      return (
        '<article class="skill-bundle-card" data-bundle="' + b.id + '" tabindex="0" role="button">' +
        (connector ? '<span class="skill-tag skill-tag--connector">Connectors</span>' : '<span class="skill-tag">Free</span>') +
        '<h2 class="skill-bundle-title">' + escapeHtml(b.name) + '</h2>' +
        '<p class="skill-bundle-desc">' + escapeHtml(b.desc || '') + '</p>' +
        '<div class="skill-bundle-meta">' + b.skillCount + ' skills</div>' +
        '<span class="skill-bundle-link">Browse pack <i class="fa-solid fa-arrow-right text-[10px]"></i></span>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll('.skill-bundle-card').forEach(function (card) {
      function open() {
        openBundle(card.getAttribute('data-bundle'));
      }
      card.addEventListener('click', open);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    if (global.XFreezeScrollReveal) global.XFreezeScrollReveal.refresh();
  }

  function hideBundleDetail() {
    const detail = $('skills-bundle-detail');
    const grid = $('skills-bundle-grid');
    if (detail) detail.classList.add('hidden');
    if (grid) grid.classList.remove('hidden');
  }

  function openBundle(bundleId) {
    if (!catalog) return;
    const bundle = catalog.bundles.find(function (b) { return b.id === bundleId; });
    if (!bundle) return;
    activeBundleId = bundleId;
    location.hash = 'bundle/' + bundleId;

    const grid = $('skills-bundle-grid');
    const detail = $('skills-bundle-detail');
    if (grid) grid.classList.add('hidden');
    if (!detail) return;
    detail.classList.remove('hidden');

    const githubTree = bundle.installMethods
      ? bundle.installMethods.website
      : (catalog.repo + '/tree/main/bundles/' + bundleId);

    $('bundle-detail-title').textContent = bundle.name;
    $('bundle-detail-desc').textContent = bundle.desc || '';
    $('bundle-detail-count').textContent = bundle.skillCount + ' skills';
    $('bundle-github-link').href = githubTree;

    const bundlePrompt = bundle.aiPromptBundle
      || (bundle.installMethods && bundle.installMethods.aiPromptBundle)
      || '';

    $('bundle-copy-ai').onclick = function () { copyText(bundlePrompt, $('bundle-copy-ai')); };

    const list = $('bundle-skill-list');
    const q = searchQuery.toLowerCase();
    const skills = bundle.skills.filter(function (s) {
      if (!q) return true;
      return s.id.includes(q) || (s.description && s.description.toLowerCase().includes(q));
    });

    list.innerHTML = skills.map(function (s) {
      const conn = s.requiresConnectors ? '<span class="skill-tag skill-tag--sm">Connector</span>' : '';
      return (
        '<div class="skill-row" data-skill="' + s.id + '">' +
        '<div class="skill-row-main">' +
        '<div class="skill-row-head">' +
        '<code class="skill-slash">' + escapeHtml(s.slash) + '</code>' + conn +
        '</div>' +
        '<div class="skill-row-name">' + escapeHtml(s.name) + '</div>' +
        '<p class="skill-row-desc">' + escapeHtml((s.description || '').slice(0, 140)) + '</p>' +
        '</div>' +
        '<div class="skill-row-actions">' +
        '<a href="' + escapeHtml(s.localPath || s.githubPath || s.githubUrl) + '" target="_blank" rel="noopener" class="skill-action" title="View skill file"><i class="fa-solid fa-file-lines"></i></a>' +
        '<button type="button" class="skill-action skill-action--primary" data-copy="ai" data-skill-id="' + escapeHtml(s.id) + '" title="Copy full install prompt with skill content"><i class="fa-solid fa-wand-magic-sparkles"></i></button>' +
        '</div></div>'
      );
    }).join('');

    list.querySelectorAll('[data-copy="ai"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        copyText(getSkillPrompt(bundleId, btn.getAttribute('data-skill-id')), btn);
      });
    });

    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function parseHash() {
    const h = location.hash.replace(/^#/, '');
    if (h.indexOf('bundle/') === 0) {
      openBundle(h.slice(7));
    }
  }

  function initSearch() {
    const input = $('skills-search');
    if (!input) return;
    input.addEventListener('input', function () {
      searchQuery = input.value;
      if (activeBundleId) openBundle(activeBundleId);
      else renderBundleGrid();
    });
  }

  function initBack() {
    const btn = $('bundle-back-btn');
    if (btn) btn.addEventListener('click', function () {
      activeBundleId = null;
      location.hash = '';
      hideBundleDetail();
      renderBundleGrid();
    });
  }

  async function init() {
    try {
      await loadCatalog();
      renderStats();
      renderCategoryTabs();
      renderBundleGrid();
      initSearch();
      initBack();
      parseHash();
      window.addEventListener('hashchange', parseHash);
    } catch (err) {
      const grid = $('skills-bundle-grid');
      if (grid) {
        grid.innerHTML = '<p class="text-sm text-[#52525b]">Could not load skills catalog. Run from a local server or check data/skills-catalog.json.</p>';
      }
      console.error(err);
    }
  }

  global.X FreezeSkills = { init: init, loadCatalog: loadCatalog, openBundle: openBundle };
})(typeof window !== 'undefined' ? window : globalThis);