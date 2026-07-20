/**
 * X Freeze favorites — templates, skills, prompts.
 * Persists in localStorage (works signed out; Account shows them when signed in).
 */
(function (global) {
  'use strict';

  var KEY = 'xf_favorites_v1';
  var TYPES = ['templates', 'skills', 'prompts'];
  var listeners = [];

  function emptyStore() {
    return { templates: [], skills: [], prompts: [], updatedAt: null };
  }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return emptyStore();
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return emptyStore();
      TYPES.forEach(function (t) {
        if (!Array.isArray(data[t])) data[t] = [];
      });
      return data;
    } catch (e) {
      return emptyStore();
    }
  }

  function write(data) {
    data.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {}
    listeners.forEach(function (fn) {
      try {
        fn(data);
      } catch (err) {}
    });
    try {
      global.dispatchEvent(
        new CustomEvent('xf-favorites-change', { detail: data })
      );
    } catch (e2) {}
    return data;
  }

  function normalizeType(type) {
    var t = String(type || '').toLowerCase();
    if (t === 'template') return 'templates';
    if (t === 'skill') return 'skills';
    if (t === 'prompt') return 'prompts';
    if (TYPES.indexOf(t) !== -1) return t;
    return null;
  }

  function list(type) {
    var t = normalizeType(type);
    if (!t) return [];
    return read()[t].slice();
  }

  function all() {
    return read();
  }

  function isFavorite(type, id) {
    var t = normalizeType(type);
    if (!t || id == null || id === '') return false;
    var sid = String(id);
    return read()[t].some(function (item) {
      return String(item.id) === sid;
    });
  }

  function findIndex(arr, id) {
    var sid = String(id);
    for (var i = 0; i < arr.length; i++) {
      if (String(arr[i].id) === sid) return i;
    }
    return -1;
  }

  function add(type, item) {
    var t = normalizeType(type);
    if (!t || !item || item.id == null || item.id === '') return null;
    var data = read();
    var idx = findIndex(data[t], item.id);
    var entry = Object.assign({}, item, {
      id: String(item.id),
      savedAt: item.savedAt || new Date().toISOString(),
    });
    if (idx >= 0) {
      data[t][idx] = Object.assign({}, data[t][idx], entry);
    } else {
      data[t].unshift(entry);
    }
    /* Cap each list to keep storage light */
    if (data[t].length > 200) data[t] = data[t].slice(0, 200);
    write(data);
    return entry;
  }

  function remove(type, id) {
    var t = normalizeType(type);
    if (!t || id == null) return false;
    var data = read();
    var before = data[t].length;
    data[t] = data[t].filter(function (item) {
      return String(item.id) !== String(id);
    });
    if (data[t].length === before) return false;
    write(data);
    return true;
  }

  function toggle(type, item) {
    if (!item || item.id == null) return { active: false };
    if (isFavorite(type, item.id)) {
      remove(type, item.id);
      return { active: false, item: item };
    }
    add(type, item);
    return { active: true, item: item };
  }

  function counts() {
    var data = read();
    return {
      templates: data.templates.length,
      skills: data.skills.length,
      prompts: data.prompts.length,
      total:
        data.templates.length + data.skills.length + data.prompts.length,
    };
  }

  function onChange(fn) {
    if (typeof fn === 'function') listeners.push(fn);
    return function () {
      listeners = listeners.filter(function (f) {
        return f !== fn;
      });
    };
  }

  /** Heart button markup for catalogs */
  function heartButtonHtml(type, id, extraClass) {
    var active = isFavorite(type, id);
    var cls = 'xf-fav-btn' + (extraClass ? ' ' + extraClass : '') + (active ? ' is-active' : '');
    var label = active ? 'Remove from favorites' : 'Add to favorites';
    return (
      '<button type="button" class="' +
      cls +
      '" data-xf-fav-type="' +
      String(type).replace(/"/g, '') +
      '" data-xf-fav-id="' +
      String(id).replace(/"/g, '') +
      '" aria-pressed="' +
      (active ? 'true' : 'false') +
      '" aria-label="' +
      label +
      '" title="' +
      label +
      '">' +
      '<i class="' +
      (active ? 'fa-solid' : 'fa-regular') +
      ' fa-heart" aria-hidden="true"></i>' +
      '</button>'
    );
  }

  function syncButton(btn) {
    if (!btn) return;
    var type = btn.getAttribute('data-xf-fav-type');
    var id = btn.getAttribute('data-xf-fav-id');
    var active = isFavorite(type, id);
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    var label = active ? 'Remove from favorites' : 'Add to favorites';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    var icon = btn.querySelector('i');
    if (icon) {
      icon.className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    }
  }

  function syncAll(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-xf-fav-type][data-xf-fav-id]').forEach(syncButton);
  }

  global.XFreezeFavorites = {
    KEY: KEY,
    list: list,
    all: all,
    isFavorite: isFavorite,
    add: add,
    remove: remove,
    toggle: toggle,
    counts: counts,
    onChange: onChange,
    heartButtonHtml: heartButtonHtml,
    syncButton: syncButton,
    syncAll: syncAll,
    TYPES: TYPES,
  };
})(window);
