/**
 * X Freeze - X post library (search, filter, sort, load more)
 * Data: window.XF_POSTS / XF_STATS / XF_CHIPS from data/x-posts-library.js
 */
(function () {
  'use strict';

  function init() {
    var grid = document.getElementById('lib-grid');
    if (!grid || !window.XF_POSTS) return;

    var POSTS = window.XF_POSTS;
    var STATS = window.XF_STATS || {};
    var CHIPS = window.XF_CHIPS || [];
    var PAGE = 12;
    var state = { cat: 'all', q: '', sort: 'views', shown: PAGE };

    function compact(n) {
      if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
      if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
      if (n >= 1e3) return Math.round(n / 1e3) + 'K';
      return String(n);
    }

    function commas(n) {
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function niceDate(iso) {
      var d = new Date(iso + 'T00:00:00Z');
      return d.toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      });
    }

    function esc(s) {
      return String(s || '').replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    }

    var statsEl = document.getElementById('lib-stats');
    if (statsEl && STATS.posts) {
      var tiles = [
        [commas(STATS.posts), 'Posts published'],
        [compact(STATS.views), 'Total views'],
        [commas(STATS.over1m), 'Posts past 1M views'],
        [compact(STATS.topPostViews), 'Biggest single post'],
      ];
      statsEl.innerHTML = tiles
        .map(function (t) {
          return (
            '<div class="lib-stat"><b>' +
            t[0] +
            '</b><span>' +
            t[1] +
            '</span></div>'
          );
        })
        .join('');
    }

    var filtersEl = document.getElementById('lib-filters');
    if (filtersEl) {
      filtersEl.innerHTML =
        '<button type="button" class="lib-filter is-active" data-cat="all" aria-pressed="true">All ' +
        POSTS.length +
        '</button>' +
        CHIPS.map(function (c) {
          return (
            '<button type="button" class="lib-filter" data-cat="' +
            esc(c.key) +
            '" aria-pressed="false">' +
            esc(c.label) +
            ' ' +
            c.n +
            '</button>'
          );
        }).join('');
    }

    function matches() {
      var q = state.q.toLowerCase();
      return POSTS.filter(function (p) {
        if (state.cat !== 'all' && p.c.indexOf(state.cat) === -1) return false;
        if (q && p.t.toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
    }

    function sortList(list) {
      var out = list.slice();
      if (state.sort === 'date') {
        out.sort(function (a, b) {
          return a.d < b.d ? 1 : -1;
        });
      } else {
        out.sort(function (a, b) {
          return b.v - a.v;
        });
      }
      return out;
    }

    var countEl = document.getElementById('lib-count');
    var moreWrap = document.querySelector('#xf-post-library .lib-more');
    var moreBtn = document.getElementById('lib-more');

    function render() {
      var list = sortList(matches());
      var slice = list.slice(0, state.shown);

      if (!list.length) {
        grid.innerHTML =
          '<p class="lib-empty">No posts match that search. Try another word or clear the filter.</p>';
      } else {
        grid.innerHTML = slice
          .map(function (p) {
            return (
              '<a class="lib-card" href="' +
              esc(p.u) +
              '" target="_blank" rel="noopener noreferrer">' +
              '<div class="lib-card-top"><span class="lib-tag">' +
              esc(p.tag) +
              '</span><span class="lib-date">' +
              niceDate(p.d) +
              '</span></div>' +
              (p.q
                ? '<p class="lib-quoting">Reply on @' + esc(p.q) + '</p>'
                : '') +
              '<p class="lib-text">' +
              esc(p.t) +
              '</p>' +
              '<div class="lib-metrics"><span class="v">' +
              compact(p.v) +
              ' views</span><span>' +
              compact(p.l) +
              ' likes</span><span>' +
              compact(p.r) +
              ' reposts</span><span class="go" aria-hidden="true">↗</span></div>' +
              '</a>'
            );
          })
          .join('');
      }

      if (countEl) {
        countEl.textContent = list.length
          ? 'Showing ' + slice.length + ' of ' + list.length + ' posts'
          : '';
      }
      if (moreWrap) {
        moreWrap.classList.toggle('is-done', slice.length >= list.length);
      }
    }

    function reset() {
      state.shown = PAGE;
      render();
    }

    if (filtersEl) {
      filtersEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.lib-filter');
        if (!btn) return;
        filtersEl.querySelectorAll('.lib-filter').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.cat = btn.getAttribute('data-cat') || 'all';
        reset();
      });
    }

    var q = document.getElementById('lib-q');
    if (q) {
      var timer;
      q.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.q = q.value.trim();
          reset();
        }, 140);
      });
    }

    document.querySelectorAll('#xf-post-library .lib-sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#xf-post-library .lib-sort-btn').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.sort = btn.getAttribute('data-sort') || 'views';
        reset();
      });
    });

    if (moreBtn) {
      moreBtn.addEventListener('click', function () {
        state.shown += PAGE;
        render();
      });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
