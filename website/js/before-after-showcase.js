/**
 * Before & After - large dual-card showcase (matches Product section)
 */
(function () {
  'use strict';

  var videos = window.XFreezeBeforeAfterVideos;
  if (!videos || !videos.length) return;

  function wrapIndex(i, n) {
    return ((i % n) + n) % n;
  }

  function init() {
    var section = document.getElementById('video-studies');
    var videoNow = document.getElementById('ba-video-now');
    var videoNext = document.getElementById('ba-video-next');
    var titleNow = document.getElementById('ba-title-now');
    var titleNext = document.getElementById('ba-title-next');
    var counterEl = document.getElementById('ba-counter');
    var strip = document.getElementById('ba-strip');
    var prevBtn = document.getElementById('ba-prev');
    var nextBtn = document.getElementById('ba-next');
    var primaryCard = document.getElementById('ba-card-now');
    if (!section || !videoNow || !videoNext || !titleNow) return;

    var activeIndex = 0;
    var isActive = false;
    var advanceTimer = null;

    function clearAdvance() {
      if (advanceTimer) {
        clearTimeout(advanceTimer);
        advanceTimer = null;
      }
    }

    function scheduleFallback(ms) {
      clearAdvance();
      advanceTimer = setTimeout(function () {
        go(1);
      }, ms);
    }

    function setVideoSrc(video, file) {
      var src = 'assets/videos/before-after/' + file;
      if (video.getAttribute('src') !== src) {
        video.setAttribute('src', src);
        video.load();
      }
    }

    function popTitle(el) {
      if (!el) return;
      el.classList.remove('is-popping');
      void el.offsetWidth;
      el.classList.add('is-popping');
    }

    function updateStrip() {
      if (!strip) return;
      strip.querySelectorAll('[data-ba-idx]').forEach(function (btn) {
        var idx = parseInt(btn.getAttribute('data-ba-idx'), 10);
        btn.classList.toggle('is-active', idx === activeIndex);
      });
      var activeBtn = strip.querySelector('[data-ba-idx="' + activeIndex + '"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    function renderPair(autoplay) {
      var now = videos[activeIndex];
      var next = videos[wrapIndex(activeIndex + 1, videos.length)];

      setVideoSrc(videoNow, now.file);
      setVideoSrc(videoNext, next.file);

      titleNow.textContent = now.title;
      if (titleNext) titleNext.textContent = next.title;
      popTitle(titleNow);

      if (counterEl) {
        counterEl.textContent = (activeIndex + 1) + ' / ' + videos.length;
      }

      updateStrip();

      videoNext.pause();
      if (videoNext.readyState >= 1) {
        videoNext.currentTime = 0;
      }

      if (autoplay && isActive) {
        videoNow.currentTime = 0;
        videoNow.play().catch(function () {
          scheduleFallback(6000);
        });
      }
    }

    function go(delta) {
      clearAdvance();
      if (primaryCard) {
        primaryCard.classList.add('is-rotating');
        setTimeout(function () {
          primaryCard.classList.remove('is-rotating');
        }, 380);
      }
      activeIndex = wrapIndex(activeIndex + delta, videos.length);
      renderPair(true);
    }

    if (strip) {
      strip.innerHTML = videos
        .map(function (v, i) {
          return (
            '<button type="button" class="ba-reel__btn' + (i === 0 ? ' is-active' : '') + '" data-ba-idx="' + i + '">' +
            v.title +
            '</button>'
          );
        })
        .join('');

      strip.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-ba-idx]');
        if (!btn) return;
        clearAdvance();
        activeIndex = parseInt(btn.getAttribute('data-ba-idx'), 10);
        renderPair(true);
      });
    }

    videoNow.addEventListener('ended', function () {
      if (!isActive) return;
      go(1);
    });

    videoNow.addEventListener('loadedmetadata', function () {
      if (!isActive) return;
      scheduleFallback(Math.min((videoNow.duration || 8) * 1000 + 300, 14000));
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          isActive = entry.isIntersecting;
          if (isActive) {
            videoNow.play().catch(function () {
              scheduleFallback(6000);
            });
          } else {
            clearAdvance();
            videoNow.pause();
            videoNext.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);

    renderPair(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();