/**
 * X Freeze — smooth, fast video playback
 * - Lazy-load sources near the viewport
 * - Pause when off-screen
 * - Cap concurrent plays (hero excluded) to reduce decode glitches
 */
(function () {
  'use strict';

  var MAX_ACTIVE = 2;
  var active = [];

  function isHero(video) {
    return !!(
      video.closest('.hero-stage') ||
      video.closest('#hero-header') ||
      video.classList.contains('hero-stage__video') ||
      video.hasAttribute('data-banner-dark') ||
      video.hasAttribute('data-banner-light')
    );
  }

  function ensureSource(video) {
    if (video.getAttribute('data-xf-src-ready') === '1') return;
    var src = video.getAttribute('data-src') || video.getAttribute('src');
    var source = video.querySelector('source[data-src], source[src]');
    if (!src && source) {
      src = source.getAttribute('data-src') || source.getAttribute('src');
    }
    if (source && source.getAttribute('data-src')) {
      source.setAttribute('src', source.getAttribute('data-src'));
      source.removeAttribute('data-src');
    }
    if (video.getAttribute('data-src')) {
      video.setAttribute('src', video.getAttribute('data-src'));
      video.removeAttribute('data-src');
    }
    if (src || source) {
      try {
        video.load();
      } catch (e) {}
    }
    video.setAttribute('data-xf-src-ready', '1');
  }

  function trackPlay(video) {
    if (isHero(video)) return;
    if (active.indexOf(video) === -1) active.push(video);
    while (active.length > MAX_ACTIVE) {
      var old = active.shift();
      if (old && old !== video && !old.paused) {
        try {
          old.pause();
        } catch (e) {}
      }
    }
  }

  function untrack(video) {
    active = active.filter(function (v) {
      return v !== video;
    });
  }

  function softPlay(video) {
    if (!video) return;
    ensureSource(video);
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    var p = video.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        trackPlay(video);
      }).catch(function () {});
    } else {
      trackPlay(video);
    }
  }

  function softPause(video) {
    if (!video || isHero(video)) return;
    try {
      video.pause();
    } catch (e) {}
    untrack(video);
  }

  function init() {
    var videos = document.querySelectorAll('video');
    if (!videos.length) return;

    videos.forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');

      if (isHero(video)) {
        if (!video.getAttribute('preload') || video.getAttribute('preload') === 'none') {
          video.setAttribute('preload', 'metadata');
        }
        return;
      }

      /* Section / card videos: stay light until near viewport */
      if (!video.closest('[data-video-cycle]')) {
        video.preload = 'none';
      }

      video.addEventListener('playing', function () {
        trackPlay(video);
      });
      video.addEventListener('pause', function () {
        untrack(video);
      });
    });

    if (typeof IntersectionObserver === 'undefined') {
      videos.forEach(function (v) {
        if (!isHero(v)) ensureSource(v);
      });
      return;
    }

    /* Warm up sources slightly before visible */
    var warm = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            ensureSource(entry.target);
            warm.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '40% 0px', threshold: 0.01 }
    );

    var playObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target;
          if (isHero(video)) return;
          if (video.closest('[data-video-cycle]')) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            if (video.classList.contains('is-active') || !video.closest('.section-video-stack')) {
              softPlay(video);
            }
          } else if (!entry.isIntersecting) {
            softPause(video);
          }
        });
      },
      { threshold: [0, 0.15, 0.35], rootMargin: '8% 0px' }
    );

    videos.forEach(function (video) {
      if (isHero(video)) return;
      warm.observe(video);
      playObs.observe(video);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        active.slice().forEach(function (v) {
          softPause(v);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.XFreezeVideoPerf = { ensureSource: ensureSource, softPlay: softPlay, softPause: softPause };
})();
