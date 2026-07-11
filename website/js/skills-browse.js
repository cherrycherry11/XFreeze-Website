/**
 * X Freeze Skills Browser - copy-first, no GitHub required
 */
(function (global) {
  const data = global.XFreezeSkillsBrowseIndex || global.XFreezeSkillsBrowseData || {};
  const BUNDLES = data.BUNDLES || [];
  const MEGA = data.MEGA || [];
  const CONNECTOR = new Set(data.CONNECTOR || []);
  const TAX = global.XFreezeSkillsTaxonomy || null;
  const PACK_BASE = 'data/skills-packs/';
  const HASH_PACK = 'skill-pack/';
  const HASH_CAT = 'skills-cat/';
  const HASH_FILTER = 'skills-filter/';

  let query = '';
  /** @type {{ access: 'all'|'free'|'premium', type: 'all'|'instant'|'connector', topic: string, sub: string }} */
  let filters = { access: 'all', type: 'all', topic: 'all', sub: 'all' };
  let suppressRoute = false;
  let modalSkill = null;
  let currentBundle = null;
  const packCache = new Map();
  const packLoads = new Map();

  function isPremiumPack(b) {
    if (TAX && typeof TAX.isPremiumPack === 'function') return TAX.isPremiumPack(b);
    if (!b) return false;
    if (b.tier === 'premium') return true;
    return String(b.id || '').indexOf('premium-') === 0;
  }

  function isConnectorPack(b) {
    if (TAX && typeof TAX.isConnectorPack === 'function') return TAX.isConnectorPack(b, CONNECTOR);
    return CONNECTOR.has(b && b.id);
  }

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
      if (skill) {
        if (full.aiInstallPrompt) skill.aiInstallPrompt = full.aiInstallPrompt;
        if (full.skillContent) skill.skillContent = full.skillContent;
        if (full.description && !skill.description) skill.description = full.description;
        if (full.slash && !skill.slash) skill.slash = full.slash;
        return;
      }
      /* Pack has a skill the index stub is missing — surface it anyway */
      bundle.skills.push({
        id: full.id,
        slash: full.slash || ('/' + full.id),
        description: full.description || '',
        requiresConnectors: !!full.requiresConnectors,
        connectors: full.connectors || [],
        integrations: full.integrations || [],
        tier: full.tier || 'free',
        type: full.type || 'base',
        risk: full.risk || 'low',
        aiInstallPrompt: full.aiInstallPrompt || '',
        skillContent: full.skillContent || '',
      });
      byId.set(full.id, bundle.skills[bundle.skills.length - 1]);
    });
    if (typeof pack.skillCount === 'number') {
      bundle.skillCount = Math.max(bundle.skillCount || 0, bundle.skills.length, pack.skillCount);
    } else {
      bundle.skillCount = Math.max(bundle.skillCount || 0, bundle.skills.length);
    }
    return bundle;
  }

  function safePackId(bundleId) {
    return String(bundleId || '').replace(/[^a-zA-Z0-9._-]/g, '');
  }

  /** Candidate URLs so packs resolve whether the site is at / or a subfolder. */
  function packUrlCandidates(bundleId, ext) {
    const id = safePackId(bundleId);
    if (!id) return [];
    const rel = PACK_BASE + id + ext;
    const urls = [rel];
    try {
      urls.unshift(new URL(rel, document.baseURI || location.href).href);
    } catch (e) { /* ignore */ }
    try {
      const dir = location.pathname.replace(/[^/]+$/, '');
      urls.push(dir + rel);
    } catch (e2) { /* ignore */ }
    return urls.filter(function (u, i, arr) { return u && arr.indexOf(u) === i; });
  }

  function fetchPackJson(bundleId) {
    const urls = packUrlCandidates(bundleId, '.json');
    let lastErr = new Error('No pack URL');

    function attempt(i) {
      if (i >= urls.length) return Promise.reject(lastErr);
      return fetch(urls[i], { credentials: 'same-origin', cache: 'no-cache' })
        .then(function (res) {
          if (!res.ok) {
            lastErr = new Error('Failed to load pack: ' + res.status + ' @ ' + urls[i]);
            return attempt(i + 1);
          }
          return res.json().catch(function (err) {
            lastErr = err;
            return attempt(i + 1);
          });
        })
        .catch(function (err) {
          lastErr = err;
          return attempt(i + 1);
        });
    }

    return attempt(0);
  }

  /**
   * Script-tag load — works when fetch() is blocked (file://, some sandboxes).
   * Companion files: data/skills-packs/<id>.js registers window.__XF_SKILL_PACKS__[id].
   */
  function loadPackViaScript(bundleId) {
    const id = safePackId(bundleId);
    global.__XF_SKILL_PACKS__ = global.__XF_SKILL_PACKS__ || {};
    if (global.__XF_SKILL_PACKS__[id]) {
      return Promise.resolve(global.__XF_SKILL_PACKS__[id]);
    }

    const urls = packUrlCandidates(bundleId, '.js');
    let lastErr = new Error('Script pack not found');

    function attempt(i) {
      if (i >= urls.length) return Promise.reject(lastErr);
      return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.async = true;
        script.src = urls[i];
        const done = function (ok, err) {
          script.onload = null;
          script.onerror = null;
          if (script.parentNode) script.parentNode.removeChild(script);
          if (ok) resolve(ok);
          else reject(err || lastErr);
        };
        script.onload = function () {
          const pack = global.__XF_SKILL_PACKS__ && global.__XF_SKILL_PACKS__[id];
          if (pack) done(pack);
          else {
            lastErr = new Error('Pack script loaded but did not register: ' + id);
            attempt(i + 1).then(resolve, reject);
          }
        };
        script.onerror = function () {
          lastErr = new Error('Failed to load pack script @ ' + urls[i]);
          attempt(i + 1).then(resolve, reject);
        };
        (document.head || document.documentElement).appendChild(script);
      });
    }

    return attempt(0);
  }

  function applyPackResult(bundleId, bundle, pack) {
    if (bundle) mergePackIntoBundle(bundle, pack);
    packCache.set(bundleId, bundle || pack);
    return bundle || pack;
  }

  function loadPack(bundleId) {
    if (packCache.has(bundleId)) {
      return Promise.resolve(packCache.get(bundleId));
    }
    if (packLoads.has(bundleId)) {
      return packLoads.get(bundleId);
    }

    const bundle = BUNDLES.find(function (b) { return b.id === bundleId; });
    const hasFullContent = bundle && bundle.skills.length > 0 && bundle.skills.every(function (s) {
      return s.aiInstallPrompt || s.skillContent;
    });
    if (hasFullContent) {
      packCache.set(bundleId, bundle);
      return Promise.resolve(bundle);
    }

    /* Prefer fetch on http(s); always fall back to .js script load (works on file://). */
    const request = fetchPackJson(bundleId)
      .catch(function () {
        return loadPackViaScript(bundleId);
      })
      .then(function (pack) {
        return applyPackResult(bundleId, bundle, pack);
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

  function packIdSetForTopic() {
    if (filters.topic === 'all' || !TAX) return null;
    if (filters.sub && filters.sub !== 'all') {
      return new Set(TAX.packIdsForSub(filters.topic, filters.sub));
    }
    return new Set(TAX.packIdsForCategory(filters.topic));
  }

  function bundlesForFilters() {
    let list = BUNDLES.slice();
    const topicSet = packIdSetForTopic();
    if (topicSet) {
      list = list.filter(function (b) { return topicSet.has(b.id); });
    } else if (filters.topic !== 'all' && MEGA.length) {
      /* Fallback to legacy MEGA if taxonomy missing */
      const pair = MEGA.find(function (p) { return p[0] === filters.topic; });
      if (pair) {
        const set = new Set(pair[1]);
        list = list.filter(function (b) { return set.has(b.id); });
      }
    }

    if (filters.access === 'free') {
      list = list.filter(function (b) { return !isPremiumPack(b); });
    } else if (filters.access === 'premium') {
      list = list.filter(function (b) { return isPremiumPack(b); });
    }

    if (filters.type === 'instant') {
      list = list.filter(function (b) { return !isConnectorPack(b); });
    } else if (filters.type === 'connector') {
      list = list.filter(function (b) { return isConnectorPack(b); });
    }

    return list;
  }

  function filterBundles(list) {
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(function (b) {
      if (b.name.toLowerCase().includes(q) || b.id.includes(q)) return true;
      if (b.desc && b.desc.toLowerCase().includes(q)) return true;
      return b.skills.some(function (s) {
        return s.id.includes(q) || (s.description || '').toLowerCase().includes(q) ||
          (s.slash && s.slash.toLowerCase().includes(q));
      });
    });
  }

  function renderCurrentGrid() {
    const list = filterBundles(bundlesForFilters());
    renderGrid(list);
    updateResultsMeta(list);
  }

  function updateResultsMeta(list) {
    const el = $('xf-skills-results-meta');
    if (!el) return;
    const n = list.length;
    const skillTotal = list.reduce(function (sum, b) {
      return sum + (Number(b.skillCount) || (b.skills && b.skills.length) || 0);
    }, 0);
    const freeN = list.filter(function (b) { return !isPremiumPack(b); }).length;
    const premN = list.filter(function (b) { return isPremiumPack(b); }).length;
    el.textContent = n
      ? (n + ' pack' + (n === 1 ? '' : 's') + ' · ' + skillTotal + ' skills' +
        (freeN && premN ? ' · ' + freeN + ' free · ' + premN + ' premium' : ''))
      : 'No packs match these filters';
  }

  function updateCategoryPills() {
    const primary = $('xf-skills-filter-primary');
    if (primary) {
      primary.querySelectorAll('[data-filter]').forEach(function (btn) {
        const kind = btn.getAttribute('data-filter');
        const val = btn.getAttribute('data-value');
        let on = false;
        if (kind === 'reset') {
          on =
            filters.access === 'all' &&
            filters.type === 'all' &&
            filters.topic === 'all' &&
            filters.sub === 'all';
        } else if (kind === 'access') {
          // Free / Premium can stay on while a topic is selected
          on = filters.access === val;
        } else if (kind === 'type') {
          // Instant / Connector can stay on while a topic is selected
          on = filters.type === val;
        }
        btn.classList.toggle('is-active', on);
      });
    }
    const topics = $('xf-skills-filter-topics');
    if (topics) {
      topics.querySelectorAll('[data-filter="topic"]').forEach(function (btn) {
        const val = btn.getAttribute('data-value');
        btn.classList.toggle('is-active', filters.topic === val);
      });
    }
    renderSubPills();
  }

  function countPacks(predicate) {
    return BUNDLES.filter(predicate).length;
  }

  function renderSubPills() {
    const wrap = $('xf-skills-filter-sub-wrap');
    const el = $('xf-skills-filter-sub');
    if (!wrap || !el || !TAX) {
      if (wrap) wrap.classList.add('skills-browse-hidden');
      return;
    }
    if (filters.topic === 'all') {
      wrap.classList.add('skills-browse-hidden');
      el.innerHTML = '';
      return;
    }
    const cat = TAX.CATEGORIES.find(function (c) { return c.id === filters.topic; });
    if (!cat || !cat.subs || !cat.subs.length) {
      wrap.classList.add('skills-browse-hidden');
      el.innerHTML = '';
      return;
    }
    wrap.classList.remove('skills-browse-hidden');
    const pills = [{ id: 'all', label: 'All in family' }].concat(
      cat.subs.map(function (s) { return { id: s.id, label: s.label }; })
    );
    el.innerHTML = pills.map(function (p) {
      const on = p.id === filters.sub;
      return (
        '<button type="button" class="skills-cat-btn' + (on ? ' is-active' : '') + '" data-value="' + esc(p.id) + '">' +
        esc(p.label) +
        '</button>'
      );
    }).join('');
    el.querySelectorAll('[data-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.sub = btn.getAttribute('data-value') || 'all';
        syncFilterHash(true);
        updateCategoryPills();
        renderCurrentGrid();
      });
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

    const conn = isConnectorPack(b);
    const premium = isPremiumPack(b);
    const tag = $('xf-skills-detail-tag');
    tag.textContent = premium ? 'Premium' : (conn ? 'Connector' : 'Instant');
    tag.className = 'skills-browse-tag' + (conn ? ' connector' : '') + (premium ? ' premium' : '');

    $('xf-skills-detail-title').textContent = displayBundleName(b.name);
    $('xf-skills-detail-desc').textContent = b.desc || '';
    $('xf-skills-detail-count').innerHTML = countBadge(b.skillCount || b.skills.length);
    renderConnectorBanner(b);

    const list = $('xf-skills-skill-list');
    renderBundleSkillList(b);

    loadPack(b.id).then(function () {
      if (currentBundle && currentBundle.id === b.id) {
        $('xf-skills-detail-count').innerHTML = countBadge(b.skillCount || b.skills.length);
        renderBundleSkillList(b);
      }
    }).catch(function (err) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[X Freeze] skill pack load failed:', b.id, err);
      }
      /* Keep the skill list visible — only note that full prompts need a retry */
      if (currentBundle && currentBundle.id === b.id && list) {
        renderBundleSkillList(b);
        const note = document.createElement('p');
        note.className = 'skills-empty skills-pack-load-error';
        note.setAttribute('role', 'status');
        note.innerHTML =
          'Could not load copy prompts for this pack. ' +
          '<button type="button" class="skills-browse-btn" data-retry-pack="' + esc(b.id) + '">Retry</button>';
        list.insertBefore(note, list.firstChild);
        const retry = list.querySelector('[data-retry-pack]');
        if (retry) {
          retry.addEventListener('click', function () {
            packCache.delete(b.id);
            packLoads.delete(b.id);
            showBundleUI(b.id);
          });
        }
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

  function filtersToHash() {
    if (
      filters.access === 'all' &&
      filters.type === 'all' &&
      filters.topic === 'all' &&
      filters.sub === 'all'
    ) {
      return '';
    }
    return (
      HASH_FILTER +
      [filters.access, filters.type, filters.topic, filters.sub]
        .map(function (p) { return encodeURIComponent(p); })
        .join('/')
    );
  }

  function syncFilterHash(push) {
    setHash(filtersToHash(), !!push);
  }

  function applyFilters(next, push) {
    filters = {
      access: next.access || 'all',
      type: next.type || 'all',
      topic: next.topic || 'all',
      sub: next.sub || 'all',
    };
    if (filters.topic === 'all') filters.sub = 'all';
    syncFilterHash(push);
    updateCategoryPills();
    showHomeUI();
    renderCurrentGrid();
  }

  function navigateToCategory(cat) {
    /* Legacy: treat as topic */
    applyFilters({
      access: filters.access,
      type: cat === 'instant' ? 'instant' : filters.type,
      topic: cat === 'instant' || cat === 'all' ? 'all' : cat,
      sub: 'all',
    }, true);
  }

  function applyRoute() {
    const h = location.hash.replace(/^#/, '');

    if (h.indexOf(HASH_PACK) === 0 || h.indexOf('bundle/') === 0) {
      const id = h.indexOf(HASH_PACK) === 0 ? h.slice(HASH_PACK.length) : h.slice(7);
      showBundleUI(id);
      return;
    }

    if (h.indexOf(HASH_FILTER) === 0) {
      const parts = h.slice(HASH_FILTER.length).split('/').map(function (p) {
        try { return decodeURIComponent(p); } catch (e) { return p; }
      });
      filters = {
        access: parts[0] || 'all',
        type: parts[1] || 'all',
        topic: parts[2] || 'all',
        sub: parts[3] || 'all',
      };
      updateCategoryPills();
      showHomeUI();
      renderCurrentGrid();
      return;
    }

    if (h.indexOf(HASH_CAT) === 0) {
      const cat = decodeURIComponent(h.slice(HASH_CAT.length));
      if (cat === 'instant') {
        filters = { access: 'all', type: 'instant', topic: 'all', sub: 'all' };
      } else {
        filters = { access: 'all', type: 'all', topic: cat || 'all', sub: 'all' };
      }
      updateCategoryPills();
      showHomeUI();
      renderCurrentGrid();
      return;
    }

    filters = { access: 'all', type: 'all', topic: 'all', sub: 'all' };
    updateCategoryPills();
    showHomeUI();
    renderCurrentGrid();
  }

  function onRouteChange() {
    if (suppressRoute) return;
    applyRoute();
  }

  function cardHtml(b) {
    const conn = isConnectorPack(b);
    const premium = isPremiumPack(b);
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
  }

  function bindCardEvents(grid) {
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
  }

  function renderGrid(list) {
    const grid = $('xf-skills-bundle-grid');
    if (!grid) return;
    const empty = $('xf-skills-empty');
    if (empty) empty.classList.toggle('skills-browse-hidden', list.length > 0);

    grid.classList.remove('skills-browse-grid--stacked');
    grid.innerHTML = list.map(cardHtml).join('');

    bindCardEvents(grid);

    if (global.XFreezeScrollReveal) {
      global.XFreezeScrollReveal.reveal(grid);
      var gridWrap = grid.closest('[data-scroll-reveal]') || grid.parentElement;
      if (gridWrap) global.XFreezeScrollReveal.reveal(gridWrap);
      global.XFreezeScrollReveal.refresh();
    }
  }

  function buildCategoryFilters() {
    const el = $('xf-skills-filter-primary');
    const topicsEl = $('xf-skills-filter-topics');
    if (!el) return;

    // Row 1 — type / access only
    const primaryParts = [
      { filter: 'reset', value: 'all', label: 'All', cls: '' },
      { filter: 'access', value: 'free', label: 'Free', cls: '' },
      { filter: 'access', value: 'premium', label: 'Premium', cls: ' skills-filter-btn--premium' },
      { filter: 'type', value: 'instant', label: 'Instant', cls: '' },
      { filter: 'type', value: 'connector', label: 'Connector', cls: '' },
    ];

    el.innerHTML = primaryParts.map(function (p) {
      return (
        '<button type="button" class="skills-filter-btn' + p.cls + '" data-filter="' + esc(p.filter) + '" data-value="' + esc(p.value) + '">' +
        esc(p.label) +
        '</button>'
      );
    }).join('');

    el.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const kind = btn.getAttribute('data-filter');
        const val = btn.getAttribute('data-value');
        if (kind === 'reset') {
          applyFilters({ access: 'all', type: 'all', topic: 'all', sub: 'all' }, true);
        } else if (kind === 'access') {
          // Combine with topic/type — toggle off if already active
          applyFilters({
            access: filters.access === val ? 'all' : val,
            type: filters.type,
            topic: filters.topic,
            sub: filters.sub,
          }, true);
        } else if (kind === 'type') {
          applyFilters({
            access: filters.access,
            type: filters.type === val ? 'all' : val,
            topic: filters.topic,
            sub: filters.sub,
          }, true);
        }
      });
    });

    // Row 2 — topics (Create & marketing, Systems, …)
    if (topicsEl) {
      const topicParts = [];
      if (TAX && TAX.CATEGORIES) {
        TAX.CATEGORIES.forEach(function (c) {
          topicParts.push({ value: c.id, label: c.label });
        });
      } else {
        MEGA.forEach(function (p) {
          topicParts.push({ value: p[0], label: p[0] });
        });
      }

      topicsEl.innerHTML = topicParts.map(function (p) {
        return (
          '<button type="button" class="skills-filter-btn skills-filter-btn--topic" data-filter="topic" data-value="' + esc(p.value) + '">' +
          esc(p.label) +
          '</button>'
        );
      }).join('');

      topicsEl.querySelectorAll('[data-filter="topic"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const val = btn.getAttribute('data-value');
          // Keep Free/Premium/Instant/Connector when picking a topic
          if (filters.topic === val) {
            applyFilters({
              access: filters.access,
              type: filters.type,
              topic: 'all',
              sub: 'all',
            }, true);
          } else {
            applyFilters({
              access: filters.access,
              type: filters.type,
              topic: val,
              sub: 'all',
            }, true);
          }
        });
      });
    }

    updateCategoryPills();
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
