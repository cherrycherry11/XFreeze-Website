/**
 * X Freeze — sitewide cinematic motion
 * Home: pinned hero, parallax, marquee safety, final CTA
 * Other pages: calm Lenis + GSAP reveals, soft card lifts
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  /* 768+ so laptop windows still get motion */
  var wide = window.matchMedia('(min-width: 768px)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var isHome = !!(
    document.getElementById('hero-header') ||
    document.querySelector('.hero-header--studio')
  );

  /* Even if GSAP path bails, drop pending/home flags so CSS scroll-reveal can run */
  if (reduced || !wide || saveData) {
    if (!wide || reduced) {
      document.documentElement.classList.remove(
        'xf-cinematic-pending',
        'xf-cinematic',
        'xf-cinematic-home'
      );
    }
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    console.warn('[xf-cinematic] GSAP/ScrollTrigger missing');
    document.documentElement.classList.remove(
      'xf-cinematic-pending',
      'xf-cinematic',
      'xf-cinematic-home'
    );
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('xf-cinematic');
  document.documentElement.classList.remove('xf-cinematic-pending');
  if (isHome) {
    document.documentElement.classList.add('xf-cinematic-home');
  }

  var expandDone = false;

  function bindLenis() {
    var lenis = window.XFreezeLenis;
    if (!lenis) return null;
    lenis.on('scroll', ScrollTrigger.update);
    /* Refresh after pin layout so ST measures spacer + fixed hero correctly */
    window.requestAnimationFrame(function () {
      ScrollTrigger.refresh();
    });
    return lenis;
  }

  /** Ensure pin spacer matches live viewport (mobile browser chrome, resize). */
  function syncHeroPinSpacer() {
    var spacer = document.querySelector('.xf-hero-pin-spacer');
    var hero = document.getElementById('hero-header');
    if (!spacer || !hero) return;
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    if (h > 0) {
      spacer.style.height = h + 'px';
      hero.style.height = h + 'px';
      hero.style.minHeight = h + 'px';
    }
  }

  function initAtmosphere() {
    /* No mouse spotlight / gradient wash — felt gimmicky sitewide */
    document.querySelectorAll('.xf-spotlight, .xf-atmosphere, .xf-scroll-progress').forEach(function (el) {
      el.remove();
    });
  }

  function initProgress() {
    /* Disabled — no gradient progress bar */
  }

  function splitWords(el) {
    if (!el || el.classList.contains('is-split')) return [];
    var text = el.textContent || '';
    var words = text.trim().split(/\s+/);
    el.textContent = '';
    el.classList.add('is-split');
    var inners = [];
    words.forEach(function (word) {
      var wrap = document.createElement('span');
      wrap.className = 'xf-word';
      wrap.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span');
      inner.className = 'xf-word__inner';
      inner.textContent = word;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      inners.push(inner);
    });
    el.setAttribute('aria-label', text.trim());
    return inners;
  }

  /** Same as home hero, but keeps <br> line breaks (skills title, etc.) */
  function splitWordsPreserveLines(el) {
    if (!el || el.classList.contains('is-split')) return [];
    var raw = el.innerHTML;
    var lineHtmls = raw.split(/<br\s*\/?>/i);
    el.textContent = '';
    el.classList.add('is-split');
    el.setAttribute(
      'aria-label',
      raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    );
    var inners = [];
    lineHtmls.forEach(function (lineHtml) {
      var lineText = lineHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!lineText) return;
      var lineEl = document.createElement('span');
      lineEl.className = 'xf-hero-line';
      lineEl.style.display = 'block';
      lineEl.style.width = '100%';
      /* Left for about/prompts; center for skills + contact heroes */
      var centerTitle = !!el.closest('.skills-hero, .contact-hero');
      lineEl.style.textAlign = centerTitle ? 'center' : 'left';
      lineText.split(/\s+/).forEach(function (word) {
        var wrap = document.createElement('span');
        wrap.className = 'xf-word';
        wrap.setAttribute('aria-hidden', 'true');
        var inner = document.createElement('span');
        inner.className = 'xf-word__inner';
        inner.textContent = word;
        wrap.appendChild(inner);
        lineEl.appendChild(wrap);
        inners.push(inner);
      });
      el.appendChild(lineEl);
      if (centerTitle) {
        el.style.textAlign = 'center';
        el.style.width = '100%';
        el.style.marginLeft = 'auto';
        el.style.marginRight = 'auto';
      } else {
        el.style.textAlign = 'left';
        el.style.marginLeft = '';
        el.style.marginRight = '';
      }
    });
    return inners;
  }

  /**
   * Home-style word reveal for inner page heroes (prompts / skills).
   * Does not rewrite layout — only animates existing title + support nodes.
   */
  function runHomeStyleHeroFlow(opts) {
    var root = opts.root;
    if (!root || root._xfHomeStyleFlow) return false;
    root._xfHomeStyleFlow = true;

    var titles = root.querySelectorAll(opts.titleSelector || 'h1');
    var supports = opts.supportSelector
      ? Array.prototype.slice.call(root.querySelectorAll(opts.supportSelector))
      : [];
    var allInners = [];

    titles.forEach(function (title) {
      allInners = allInners.concat(splitWordsPreserveLines(title));
    });

    if (!allInners.length && !supports.length) return false;

    /* Title shell visible; words start below (CSS + GSAP match home) */
    if (titles.length) gsap.set(titles, { opacity: 1, y: 0 });
    if (allInners.length) gsap.set(allInners, { opacity: 0, y: '110%' });
    if (supports.length) gsap.set(supports, { opacity: 0, y: 22 });

    /* Parent may stay CSS-hidden until children are zeroed (avoids FOUC) */
    if (typeof opts.onBeforeAnimate === 'function') opts.onBeforeAnimate();

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (allInners.length) {
      tl.to(
        allInners,
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.055,
          ease: 'power4.out',
        },
        0.15
      );
    }
    if (supports.length) {
      tl.to(
        supports,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.07,
          ease: 'power3.out',
        },
        allInners.length ? '-=0.65' : 0.15
      );
    }

    tl.eventCallback('onComplete', function () {
      root.classList.add(opts.readyClass || 'is-hero-ready');
      if (typeof opts.onComplete === 'function') opts.onComplete();
    });

    /* Safety: never leave copy stuck hidden */
    window.setTimeout(function () {
      if (!root.classList.contains(opts.readyClass || 'is-hero-ready')) {
        if (allInners.length) gsap.set(allInners, { opacity: 1, y: 0 });
        if (supports.length) gsap.set(supports, { opacity: 1, y: 0 });
        root.classList.add(opts.readyClass || 'is-hero-ready');
        if (typeof opts.onComplete === 'function') opts.onComplete();
      }
    }, 2800);

    return true;
  }

  /** Ensure word reveal CSS applies even if boot is slightly delayed */
  function ensureHomeFlag() {
    if (isHome) document.documentElement.classList.add('xf-cinematic-home');
  }
  ensureHomeFlag();

  function initHero() {
    var hero = document.getElementById('hero-header');
    if (!hero) return;

    /* Extra orb for richer depth */
    var depth = hero.querySelector('.hero-stage__depth');
    if (depth && !depth.querySelector('.hero-stage__orb--c')) {
      var c = document.createElement('span');
      c.className = 'hero-stage__orb hero-stage__orb--c';
      depth.appendChild(c);
    }

    /* Scroll cue */
    if (!hero.querySelector('.xf-scroll-cue')) {
      var cue = document.createElement('div');
      cue.className = 'xf-scroll-cue';
      cue.setAttribute('aria-hidden', 'true');
      cue.innerHTML =
        '<span class="xf-scroll-cue__label">Scroll</span><span class="xf-scroll-cue__line"></span>';
      hero.appendChild(cue);
      gsap.to(cue, { opacity: 1, duration: 1.2, delay: 1.6, ease: 'power2.out' });
      gsap.to(cue, {
        opacity: 0,
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: document.getElementById('selected-work') || hero,
          start: 'top 95%',
          end: 'top 55%',
          scrub: true,
        },
      });
    }

    var video = hero.querySelector('.hero-stage__video');
    var base = hero.querySelector('.hero-stage__base');
    var vignette = hero.querySelector('.hero-stage__vignette');
    var titles = hero.querySelectorAll('[data-xf-hero-title]');
    var lead = hero.querySelector('[data-xf-hero-lead]');
    var actions = hero.querySelector('.hero-actions');
    var proof = hero.querySelector('.hero-proof');
    var proofSub = hero.querySelector('.hero-proof-sub');
    var proofEyebrow = hero.querySelector('.hero-proof__eyebrow');
    var chips = hero.querySelectorAll('.hero-proof__chip');
    var tools = hero.querySelectorAll('.hero-proof__tool');
    var theme = hero.querySelector('.hero-theme');
    var copy = hero.querySelector('.hero-copy');

    var wordInners = [];
    titles.forEach(function (line) {
      wordInners = wordInners.concat(splitWords(line));
    });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (wordInners.length) {
      gsap.set(titles, { opacity: 1, y: 0 });
      tl.to(
        wordInners,
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.055,
          ease: 'power4.out',
        },
        0.2
      );
    } else if (titles.length) {
      tl.to(titles, { opacity: 1, y: 0, duration: 1.15, stagger: 0.12 }, 0.15);
    }

    if (lead) tl.to(lead, { opacity: 1, y: 0, duration: 1.05 }, '-=0.7');
    if (actions) tl.to(actions, { opacity: 1, y: 0, duration: 0.95 }, '-=0.65');
    if (chips.length) {
      gsap.set(proof, { opacity: 1, y: 0 });
      tl.fromTo(
        chips,
        { opacity: 0, y: 18, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
        '-=0.55'
      );
    } else if (proof) {
      /* Clear pre-hide on children so they can animate (eyebrow had opacity:0 stuck) */
      if (proofEyebrow) gsap.set(proofEyebrow, { opacity: 0, y: 12 });
      if (tools.length) gsap.set(tools, { opacity: 0, y: 10 });
      if (proofSub) gsap.set(proofSub, { opacity: 0, y: 10 });
      gsap.set(proof, { opacity: 1, y: 0 });

      if (proofEyebrow) {
        tl.to(
          proofEyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            onComplete: function () {
              proofEyebrow.classList.add('is-revealed');
              proofEyebrow.style.opacity = '1';
            },
          },
          '-=0.45'
        );
      }
      if (tools.length) {
        tl.to(
          tools,
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out' },
          '-=0.4'
        );
      }
      if (proofSub) {
        tl.to(proofSub, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      }
      /* Safety: eyebrow never stuck hidden */
      window.setTimeout(function () {
        if (!proofEyebrow) return;
        proofEyebrow.classList.add('is-revealed');
        proofEyebrow.style.opacity = '1';
        proofEyebrow.style.transform = 'none';
        if (proof) proof.classList.add('is-revealed');
      }, 2400);
    } else {
      if (proofEyebrow) {
        tl.to(proofEyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          onComplete: function () {
            proofEyebrow.classList.add('is-revealed');
          },
        }, '-=0.45');
      }
      if (proofSub) tl.to(proofSub, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
    }
    if (theme) tl.to(theme, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');

    /*
     * Pin hero: scrub against first content section sliding over.
     * Blur ramps up as Templates covers the hero.
     */
    var cover = document.getElementById('selected-work') || hero;
    /* End scrub as next section reaches the top — avoids a growing empty band */
    var pinEnd = cover === hero ? 'bottom top' : 'top top';
    var stage = hero.querySelector('.hero-stage') || hero;
    var scrubCommon = {
      trigger: cover,
      start: 'top bottom',
      end: pinEnd,
      scrub: 1.05,
    };

    /* Progressive blur + soft darken on the visual stage (not the fixed nav bar) */
    gsap.fromTo(
      stage,
      {
        filter: 'blur(0px) brightness(1)',
        webkitFilter: 'blur(0px) brightness(1)',
      },
      {
        filter: 'blur(28px) brightness(0.88)',
        webkitFilter: 'blur(28px) brightness(0.88)',
        ease: 'none',
        scrollTrigger: Object.assign({}, scrubCommon, { scrub: 1.25 }),
      }
    );

    /* Extra frost veil over hero for a more premium “behind glass” feel */
    var frost = hero.querySelector('.hero-stage__frost');
    if (!frost) {
      frost = document.createElement('div');
      frost.className = 'hero-stage__frost';
      frost.setAttribute('aria-hidden', 'true');
      stage.appendChild(frost);
    }
    gsap.fromTo(
      frost,
      { opacity: 0 },
      {
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: Object.assign({}, scrubCommon),
      }
    );

    [
      { el: video, y: 12, scale: 1.08 },
      { el: base, y: 6, scale: 1.03 },
      { el: depth, y: 16, scale: 1.05 },
      { el: vignette, y: 5, scale: 1 },
    ].forEach(function (layer) {
      if (!layer.el) return;
      gsap.to(layer.el, {
        yPercent: layer.y,
        scale: layer.scale,
        ease: 'none',
        scrollTrigger: Object.assign({}, scrubCommon, { scrub: 1.2 }),
      });
    });

    if (copy) {
      gsap.to(copy, {
        yPercent: 10,
        opacity: 0.15,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: Object.assign({}, scrubCommon, { scrub: 1.1 }),
      });
    }

    hero.querySelectorAll('.hero-stage__orb').forEach(function (orb, i) {
      gsap.to(orb, {
        x: (i % 2 === 0 ? 1 : -1) * (28 + i * 12),
        y: (i % 2 === 0 ? 1 : -1) * (32 + i * 10),
        ease: 'none',
        scrollTrigger: Object.assign({}, scrubCommon, { scrub: 1.35 }),
      });
      gsap.to(orb, {
        x: '+=14',
        y: '+=10',
        duration: 7 + i * 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });
  }

  /**
   * Skills spotlight cards are injected by home-extras.js after load.
   * Re-run stagger when nodes appear (or once already ready).
   */
  function initSkillsSectionMotion() {
    var section = document.getElementById('xf-skills-spotlight-section');
    if (!section) return;
    if (!section._xfSkillsMotionBound) {
      section._xfSkillsMotionBound = true;
    }

    function finishCards(cards) {
      cards.forEach(function (c) {
        c.classList.add('is-revealed', 'is-cinematic-revealed');
        gsap.set(c, { clearProps: 'transform,opacity,visibility' });
        /* Inline safety so CSS never re-hides after clearProps */
        c.style.opacity = '1';
        c.style.transform = 'none';
        c.style.visibility = 'visible';
      });
    }

    function animateGrid(grid) {
      if (!grid) return;
      var cards = Array.prototype.slice.call(
        grid.querySelectorAll('.xf-spot-card, .xf-combo-card, a, article')
      );
      if (!cards.length) {
        /* Allow re-bind when home-extras injects later */
        grid._xfStaggerBound = false;
        grid._xfStaggerCount = 0;
        return;
      }

      /* Re-bind if card set changed (inject after empty bind) */
      if (grid._xfStaggerBound && grid._xfStaggerCount === cards.length && grid._xfStaggerPlayed) {
        return;
      }

      grid._xfStaggerBound = true;
      grid._xfStaggerCount = cards.length;
      grid._xfStaggerPlayed = false;

      gsap.set(cards, { autoAlpha: 0, y: 36, scale: 0.97 });

      function playCards() {
        if (grid._xfStaggerPlayed) return;
        grid._xfStaggerPlayed = true;
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: function () {
            finishCards(cards);
          },
        });
      }

      if (typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              playCards();
              io.disconnect();
            });
          },
          { root: null, rootMargin: '0px 0px -8% 0px', threshold: [0, 0.05, 0.12] }
        );
        io.observe(grid);
      }

      if (ScrollTrigger) {
        ScrollTrigger.create({
          trigger: grid,
          start: 'top 90%',
          once: true,
          onEnter: playCards,
          onEnterBack: playCards,
        });
      }

      /* Already in view (parent scroll-reveal opened while cards injected) */
      window.requestAnimationFrame(function () {
        var rect = grid.getBoundingClientRect();
        var vh = window.innerHeight || 0;
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          playCards();
        }
      });

      /* Safety: if still hidden while on-screen, force play */
      window.setTimeout(function () {
        if (grid._xfStaggerPlayed) return;
        var rect = grid.getBoundingClientRect();
        var vh = window.innerHeight || 0;
        if (rect.top < vh * 0.98 && rect.bottom > 0) playCards();
      }, 2800);
    }

    function tryBind() {
      section.querySelectorAll('[data-xf-stagger-in]').forEach(animateGrid);
    }

    tryBind();

    /* Cards often land after first paint via home-extras.js */
    if (!section._xfSkillsMo) {
      section._xfSkillsMo = new MutationObserver(function () {
        tryBind();
      });
      section._xfSkillsMo.observe(section, { childList: true, subtree: true });
      window.setTimeout(function () {
        if (section._xfSkillsMo) {
          section._xfSkillsMo.disconnect();
          section._xfSkillsMo = null;
        }
        tryBind();
      }, 5000);
    }
  }

  function animateRevealNodes(nodes, trigger) {
    if (!nodes || !nodes.length) return;
    var list = Array.prototype.slice.call(nodes);
    var yDist = isHome ? 48 : 32;
    var dur = isHome ? 1.15 : 0.95;
    gsap.fromTo(
      list,
      { opacity: 0, y: yDist },
      {
        opacity: 1,
        y: 0,
        duration: dur,
        stagger: isHome ? 0.09 : 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger || list[0],
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        onComplete: function () {
          list.forEach(function (el) {
            el.classList.add('is-cinematic-revealed', 'is-revealed');
          });
          if (trigger && trigger.classList) trigger.classList.add('is-revealed');
        },
      }
    );
  }

  /**
   * Home: per-block scroll flow via IntersectionObserver.
   * More reliable than ScrollTrigger-on-section when Lenis + content-visibility
   * skew layout (lower sections used to paint fully with no entrance).
   */
  function bindHomeBlockReveal(el, opts) {
    if (!el || el._xfHomeBlockReveal) return;
    el._xfHomeBlockReveal = true;
    opts = opts || {};

    var yFrom = opts.y != null ? opts.y : 44;
    var dur = opts.duration != null ? opts.duration : 0.95;
    var delay = opts.delay || 0;

    gsap.set(el, { autoAlpha: 0, y: yFrom, force3D: true });

    var played = false;
    function play() {
      if (played) return;
      played = true;

      /* Nested cards / chips stagger for richer “flow” */
      var staggerKids = el.querySelectorAll(
        '.xf-motion-card, .xf-motion-chip, .xf-cat-showcase-item, .artistic-card, .bundles-stat-col'
      );
      var hasKids = staggerKids.length > 1;

      if (hasKids) {
        gsap.set(staggerKids, { autoAlpha: 0, y: 28 });
      }

      var tl = gsap.timeline({
        delay: delay,
        defaults: { ease: 'power3.out', overwrite: 'auto' },
        onComplete: function () {
          el.classList.add('is-revealed', 'is-cinematic-revealed');
          gsap.set(el, { clearProps: 'transform,opacity,visibility' });
          if (hasKids) {
            staggerKids.forEach(function (k) {
              k.classList.add('is-revealed', 'is-cinematic-revealed');
              gsap.set(k, { clearProps: 'transform,opacity,visibility' });
            });
          }
          /* Do not mark the whole section is-revealed here — that CSS path
             forced sibling .scroll-reveal-in blocks visible and killed the flow. */
        },
      });

      tl.to(el, { autoAlpha: 1, y: 0, duration: dur }, 0);

      /* Title clip rise inside this block */
      var title = el.querySelector('.xf-section-title');
      if (title && !title._xfTitleClip) {
        title._xfTitleClip = true;
        gsap.set(title, { clipPath: 'inset(18% 0 82% 0)' });
        tl.to(
          title,
          {
            clipPath: 'inset(0% 0 0% 0)',
            duration: 1.05,
            ease: 'power4.out',
          },
          0.05
        );
      }

      if (hasKids) {
        tl.to(
          staggerKids,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.18
        );
      }
    }

    if (typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var vh = window.innerHeight || 0;
            /* Ignore blocks still deep below the fold at observe time */
            if (entry.boundingClientRect.top > vh * 0.92) return;
            play();
            io.disconnect();
          });
        },
        { root: null, rootMargin: '0px 0px -12% 0px', threshold: [0, 0.08, 0.15, 0.28] }
      );
      io.observe(el);
    }

    if (ScrollTrigger) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 84%',
        once: true,
        onEnter: play,
        invalidateOnRefresh: true,
      });
    }

    /* If already in view after layout (deep-link / mid-page reload) */
    window.requestAnimationFrame(function () {
      var scrollY = window.scrollY || window.pageYOffset || 0;
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight || 0;
      if (scrollY > 80 && rect.top < vh * 0.88 && rect.bottom > vh * 0.12) {
        play();
      }
    });
  }

  function initHomeSectionFlow(section) {
    if (!section || !isHome) return;

    /* Only top-level reveal blocks — avoid double-binding titles/leads inside */
    var blocks = section.querySelectorAll(':scope > .scroll-reveal-in, :scope > .content-container > .scroll-reveal-in, :scope .content-container > .scroll-reveal-in');
    if (!blocks.length) {
      blocks = section.querySelectorAll('.scroll-reveal-in');
    }

    var seen = [];
    blocks.forEach(function (el) {
      if (el._xfHomeBlockReveal) return;
      /* Skip nested reveal-in inside another reveal-in */
      var parentReveal = el.parentElement && el.parentElement.closest('.scroll-reveal-in');
      if (parentReveal && parentReveal !== el && section.contains(parentReveal)) return;
      seen.push(el);
    });

    seen.forEach(function (el, i) {
      bindHomeBlockReveal(el, {
        delay: Math.min(i * 0.04, 0.16),
        y: 48,
        duration: 1,
      });
    });

    /* Creator library stats (not always .scroll-reveal-in) */
    if (section.id === 'creator-library') {
      section.querySelectorAll('.bundles-stat-col').forEach(function (col, i) {
        if (col.closest('.scroll-reveal-in')) return;
        bindHomeBlockReveal(col, { delay: 0.08 + i * 0.05, y: 36, duration: 0.85 });
      });
    }
  }

  /**
   * Template system section entrance — eyebrow → title → lead → filters → marquee.
   * CSS pre-hides children (.xf-selected-work-copy:not(.is-flow-done) > *).
   * Parent shell stays paint-ready so stagger is never blocked by parent opacity:0.
   * Primary trigger: IntersectionObserver on #selected-work (works with Lenis + fixed hero).
   * Backup: ScrollTrigger once.
   */
  function initSelectedWorkReveal(section) {
    if (!section || section._xfSelectedWorkReveal) return;
    section._xfSelectedWorkReveal = true;

    var marqueeWrap = section.querySelector('.scroll-reveal-in.mt-4');
    var marquee = document.getElementById('selected-work-marquee');
    var textBlock =
      section.querySelector('.xf-selected-work-copy') ||
      section.querySelector('#templates > .scroll-reveal-in:not(.mt-4)') ||
      section.querySelector('.content-container > .scroll-reveal-in:not(.mt-4)');

    /* Marquee CSS train must keep transform free — hide wrap until flow plays */
    if (marquee) {
      gsap.set(marquee, { clearProps: 'transform,x,y' });
      marquee.style.visibility = 'visible';
    }

    var eyebrow = textBlock && textBlock.querySelector('.xf-section-eyebrow');
    var title = textBlock && textBlock.querySelector('.xf-section-title');
    var leadRow = textBlock && textBlock.querySelector('.mt-3');
    var filters = textBlock && textBlock.querySelector('.xf-temp-filters');
    var flowList = [eyebrow, title, leadRow, filters].filter(Boolean);

    if (!textBlock || !flowList.length) {
      if (textBlock) {
        textBlock.classList.add('is-revealed', 'is-cinematic-revealed', 'is-flow-done');
        gsap.set(textBlock, { opacity: 1, y: 0 });
      }
      if (marqueeWrap) {
        gsap.set(marqueeWrap, { opacity: 1, y: 0 });
        marqueeWrap.classList.add('is-revealed', 'is-cinematic-revealed');
      }
      section.classList.add('is-revealed');
      return;
    }

    /*
     * Parent shell: force paint-ready (CSS also forces this via !important).
     * Children: GSAP owns from hidden state so stagger is visible on scroll.
     */
    textBlock.classList.add('is-revealed', 'is-cinematic-revealed');
    gsap.set(textBlock, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set(flowList, { autoAlpha: 0, y: 48, force3D: true });

    if (marqueeWrap) {
      /* Keep class off is-revealed so default home CSS keeps it hidden until flow */
      gsap.set(marqueeWrap, { autoAlpha: 0, y: 28, force3D: true });
    }

    var played = false;
    function finishFlow() {
      /* Mark done first so CSS :not(.is-flow-done) hide rules drop before clearProps */
      textBlock.classList.add('is-flow-done', 'is-revealed', 'is-cinematic-revealed');
      section.classList.add('is-revealed');
      flowList.forEach(function (el) {
        el.classList.add('is-revealed', 'is-cinematic-revealed');
        gsap.set(el, { clearProps: 'transform,opacity,visibility,clipPath' });
      });
      if (marqueeWrap) {
        marqueeWrap.classList.add('is-revealed', 'is-cinematic-revealed');
        gsap.set(marqueeWrap, { clearProps: 'transform,opacity,visibility' });
      }
    }

    function playFlow() {
      if (played) return;
      played = true;

      var tl = gsap.timeline({
        defaults: { ease: 'power3.out', overwrite: 'auto' },
        onComplete: finishFlow,
      });

      if (eyebrow) {
        tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.65 }, 0);
      }
      if (title) {
        tl.fromTo(
          title,
          { autoAlpha: 0, y: 52, clipPath: 'inset(12% 0 88% 0)' },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0 0% 0)',
            duration: 1.05,
            ease: 'power4.out',
          },
          eyebrow ? 0.1 : 0
        );
      }
      if (leadRow) {
        tl.to(leadRow, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.55');
      }
      if (filters) {
        tl.to(filters, { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.48');
      }
      if (marqueeWrap) {
        tl.to(marqueeWrap, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4');
      }
    }

    /* Primary: IO on the whole section (not a tiny child rect) */
    if (typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            /*
             * Skip false positives at page top: section still mostly below fold
             * (fixed hero + pin spacer leave #selected-work ~1vh down).
             */
            var vh = window.innerHeight || 0;
            if (entry.boundingClientRect.top > vh * 0.82) return;
            playFlow();
            io.disconnect();
          });
        },
        { root: null, rootMargin: '0px 0px -10% 0px', threshold: [0, 0.05, 0.12, 0.2, 0.35] }
      );
      io.observe(section);
    }

    /* Backup: ScrollTrigger once section top crosses ~72% of viewport */
    if (ScrollTrigger) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        onEnter: playFlow,
        invalidateOnRefresh: true,
      });
    }

    /* Only auto-play if user already scrolled into the section (not at page top) */
    window.requestAnimationFrame(function () {
      var scrollY = window.scrollY || window.pageYOffset || 0;
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || 0;
      if (scrollY > vh * 0.35 && rect.top < vh * 0.75 && rect.bottom > vh * 0.2) {
        playFlow();
      }
    });

    /* Safety: never leave copy stuck hidden if triggers miss */
    window.setTimeout(function () {
      if (played) return;
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || 0;
      if (rect.top < vh * 0.85 && rect.bottom > 0) playFlow();
    }, 6000);
  }

  function initReveals() {
    document.querySelectorAll('[data-scroll-reveal]').forEach(function (section) {
      if (section._xfRevealBound) return;
      section._xfRevealBound = true;

      var isMarqueeSection = section.id === 'selected-work';
      var isSkillsSection = section.id === 'xf-skills-spotlight-section';
      var isFinalCta = section.id === 'xf-final-cta';

      /* Final CTA owned exclusively by initFinalCta — avoid double GSAP thrash */
      if (isFinalCta) {
        initFinalCta();
        return;
      }

      /*
       * Template system (#selected-work): dedicated scroll flow.
       */
      if (isMarqueeSection) {
        initSelectedWorkReveal(section);
        return;
      }

      /*
       * HOME: per-block IO flow for motion / skills / categories / style sections.
       * Replaces section-level ST batch that fired early or not at all below the fold.
       */
      if (isHome) {
        initHomeSectionFlow(section);
        /* Skills dynamic grids keep their own card stagger */
        if (isSkillsSection) initSkillsSectionMotion();
        return;
      }

      var kids = section.querySelectorAll(
        '.scroll-reveal-in, .xf-section-title, .xf-section-eyebrow, .xf-section-lead, .xf-motion-hero, .xf-more-categories-head, .bundles-stat-col, .xf-content-hero, .xf-prose, .xf-about-section, .connector-setup-header, .connector-setup-grid, .connector-setup-apps, .connector-setup-faq, .connector-setup-cta, .skills-how-card, .skills-builder-promo, .skills-toolbar, .templates-header, .pl-hero'
      );
      if (!kids.length && !isSkillsSection) {
        if (section.classList.contains('scroll-reveal-in') || section.children.length) {
          animateRevealNodes(section.children.length ? [section] : [], section);
        }
        return;
      }

      animateRevealNodes(kids, section);
    });

    /* Standalone .scroll-reveal-in nodes not wrapped in [data-scroll-reveal] */
    document.querySelectorAll('.scroll-reveal-in').forEach(function (el) {
      if (el._xfRevealBound || el._xfHomeBlockReveal) return;
      if (el.closest('[data-scroll-reveal]')) return;
      el._xfRevealBound = true;
      if (isHome) {
        bindHomeBlockReveal(el, {});
      } else {
        animateRevealNodes([el], el);
      }
    });
  }

  function initExpand() {
    /* Never touch marquee slides: CSS train animation owns transform there */
    document
      .querySelectorAll('.artistic-card, .xf-cat-showcase-card')
      .forEach(function (wrap) {
        if (wrap._xfExpandBound) return;
        var media = wrap.querySelector('img, video');
        if (!media) return;
        wrap._xfExpandBound = true;
        wrap.setAttribute('data-xf-expand', '');

        /* Mild scale only — large overscale softens HQ video/images */
        gsap.fromTo(
          media,
          { scale: 1.04 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 92%',
              end: 'top 28%',
              scrub: 1.2,
            },
          }
        );
      });
    expandDone = true;
  }

  function initTilt() {
    if (!fine) return;
    /* Skip marquee — tilt transform fights CSS marquee translate */
    var nodes = document.querySelectorAll(
      '.artistic-card, .xf-cat-showcase-card, .xf-motion-card'
    );
    nodes.forEach(function (el) {
      el.setAttribute('data-xf-tilt', '');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          rotateY: px * 10,
          rotateX: -py * 8,
          transformPerspective: 900,
          transformOrigin: 'center',
          duration: 0.45,
          ease: 'power2.out',
        });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    });
  }

  function initMagneticEnhanced() {
    if (!fine) return;
    /* Nav coffee is excluded — magnetic pull felt sticky next to the avatar */
    document
      .querySelectorAll('.hero-btn, .xf-final-cta-btn, [data-xf-magnetic]')
      .forEach(function (el) {
        if (el.classList.contains('site-nav-coffee')) return;
        var strength = parseFloat(el.getAttribute('data-xf-magnetic')) || 0.3;
        el.addEventListener('mousemove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * strength;
          var dy = (e.clientY - (r.top + r.height / 2)) * strength;
          gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
        });
        el.addEventListener('mouseleave', function () {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
        });
      });
  }

  function initCursor() {
    /* Keep native system cursor — no custom dot/ring */
    document.documentElement.classList.remove('xf-cursor-on');
    document.querySelectorAll('.xf-cursor, .xf-cursor-ring').forEach(function (el) {
      el.remove();
    });
  }

  /**
   * Final CTA: single calm reveal. No double GSAP, no opacity thrash on reload.
   * Stage stays layout-stable; only a soft fade-up of the glass card.
   */
  function initFinalCta() {
    var cta = document.getElementById('xf-final-cta');
    if (!cta || cta._xfFinalCtaBound) return;
    cta._xfFinalCtaBound = true;

    var stage = cta.querySelector('.xf-final-cta-stage');
    var box = cta.querySelector('.xf-final-cta-box');
    if (!box) return;

    /* Stage always paint-ready (prevents FOUC hide → show glitch) */
    if (stage) {
      gsap.set(stage, { opacity: 1, y: 0, clearProps: 'transform' });
      stage.classList.add('is-revealed', 'is-cinematic-revealed');
    }

    /* Soft card entrance only — never re-hide to 0 (reload flash) */
    gsap.fromTo(
      box,
      { opacity: 0.88, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: cta,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: function () {
          gsap.set(box, { clearProps: 'transform,opacity' });
          box.classList.add('is-revealed', 'is-cinematic-revealed');
          cta.classList.add('is-revealed');
        },
      }
    );
  }

  function initStatsPunch() {
    document.querySelectorAll('.bundles-stat-value, [data-xf-count]').forEach(function (el) {
      gsap.fromTo(
        el,
        { scale: 0.86, opacity: 0.3, filter: 'blur(6px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  function initFooter() {
    /*
     * Do NOT translateY the footer — with a fixed hero underneath, any y offset
     * opens a gap that shows the hero video between CTA and footer.
     */
    var footer = document.querySelector('.xf-site-footer');
    if (!footer) return;
    gsap.set(footer, { clearProps: 'transform,y,opacity' });
    footer.style.opacity = '1';
    footer.style.transform = 'none';
  }

  /**
   * Nav lives inside #hero-header (z-index: 0). Fixed children cannot paint
   * above body sections (z-index: 2) while trapped in that stacking context.
   * Reparent chrome to <body> so the bar always stays on top.
   */
  function liberateNavFromHero() {
    var hero = document.getElementById('hero-header');
    var nav = document.getElementById('site-nav');
    if (!hero || !nav) return;
    if (nav.parentElement === document.body) {
      nav.classList.add('site-nav--elevated');
      return;
    }

    var backdrop = document.getElementById('mobile-menu-backdrop');
    var menu = document.getElementById('mobile-menu');
    var nodes = [nav, backdrop, menu].filter(Boolean);

    /* Insert before first section so DOM order stays sensible */
    var anchor = document.querySelector('.xf-hero-pin-spacer') || hero.nextSibling;
    nodes.forEach(function (node) {
      if (node.parentElement === document.body) return;
      document.body.insertBefore(node, anchor);
    });

    nav.classList.add('site-nav--elevated');
    /* Force a measure so is-scrolled kicks in under the sliding panel */
    if (window.XFreezeMotion && typeof window.XFreezeMotion.init === 'function') {
      /* motion already running — dispatch scroll */
      window.dispatchEvent(new Event('scroll'));
    }
  }

  function initNavMorph() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    ScrollTrigger.create({
      start: 0,
      end: 400,
      onUpdate: function (self) {
        var p = self.progress;
        nav.style.setProperty('--xf-nav-blur', 8 + p * 14 + 'px');
      },
    });
  }

  function markLiftTargets() {
    document
      .querySelectorAll(
        [
          '.artistic-card',
          '.xf-cat-showcase-card',
          '.xf-motion-card',
          '.bundles-stat-col',
          '.blog-card',
          '.xf-spot-card',
          '.xf-combo-card',
          '.skills-browse-card',
          '.template-card',
          '.templates-card',
          '.pl-card',
          '.connector-setup-card',
          '.skill-bundle-card',
          '.sb-panel',
        ].join(', ')
      )
      .forEach(function (el) {
        el.setAttribute('data-xf-lift', '');
      });
  }

  /**
   * Prompts library hero — home-style word flow on title + copy (typewriter stays solid).
   */
  function initPromptsHeroFlow() {
    var hero = document.querySelector('.pl-hero');
    var copy = hero && hero.querySelector('.pl-hero__copy');
    if (!hero || !copy) return false;

    hero.classList.add('is-revealed', 'is-cinematic-revealed');
    document.documentElement.classList.add('xf-prompts-page');

    /* Typewriter: simple fade, no word-split (live typing owns that panel) */
    var stage = hero.querySelector('.pl-hero__typewriter');
    if (stage) {
      gsap.set(stage, { opacity: 0 });
      gsap.to(stage, { opacity: 1, duration: 0.9, delay: 0.45, ease: 'power2.out' });
    }

    return runHomeStyleHeroFlow({
      root: copy,
      titleSelector: 'h1',
      supportSelector: '.pl-hero__eyebrow, .pl-hero__lead, .pl-hero__stats, .pl-hero__tools',
      readyClass: 'is-hero-ready',
      onComplete: function () {
        hero.classList.add('pl-hero--ready');
        copy.classList.add('pl-hero--ready');
      },
    });
  }

  /**
   * Skills page hero — same word-by-word flow as home hero titles.
   */
  function initSkillsPageFlow() {
    var section = document.querySelector('.skills-hero-section, .skills-banner');
    var hero = document.querySelector('.skills-hero');
    if (!hero) return false;

    document.documentElement.classList.add('xf-skills-page');
    if (section) {
      section.classList.add('is-revealed', 'is-cinematic-revealed');
    }
    hero.classList.add('is-revealed', 'is-cinematic-revealed');

    document.querySelectorAll('.skills-main .scroll-reveal-in, .skills-grid-wrap, .skills-how-card, .skills-builder-promo').forEach(function (el) {
      el.classList.add('is-revealed', 'is-cinematic-revealed');
    });

    return runHomeStyleHeroFlow({
      root: hero,
      titleSelector: 'h1',
      supportSelector:
        '.skills-hero-eyebrow, .skills-hero-lead, .skills-hero-actions, .skills-hero-stats',
      readyClass: 'is-hero-ready',
      onComplete: function () {
        hero.classList.add('skills-hero--ready');
        if (section) section.classList.add('skills-hero-section--ready');
      },
    });
  }

  /**
   * Templates page — calm opacity-only banner intro.
   * No word-split reflow, no body y-reveals (filters + dynamic grid were glitching).
   */
  function initTemplatesPageFlow() {
    var banner = document.querySelector('.templates-banner');
    var main = document.querySelector('.templates-main');
    if ((!banner && !main) || document.documentElement._xfTemplatesFlow) return false;
    document.documentElement._xfTemplatesFlow = true;
    document.documentElement.classList.add('xf-templates-page');

    if (banner) {
      banner.classList.add('is-revealed', 'is-cinematic-revealed');
      var wrap = banner.querySelector('.templates-banner__content .scroll-reveal-in, .templates-banner__content');
      if (wrap) wrap.classList.add('is-revealed', 'is-cinematic-revealed');
    }

    if (main) {
      main.classList.add('is-revealed', 'is-cinematic-revealed');
      main.querySelectorAll('.scroll-reveal-in, [data-scroll-stagger]').forEach(function (el) {
        el.classList.add('is-revealed', 'is-cinematic-revealed');
      });
    }

    var grid = document.getElementById('visual-templates-grid');
    if (grid) grid.classList.add('is-revealed', 'is-cinematic-revealed');

    var bits = banner
      ? banner.querySelectorAll(
          '.xf-section-eyebrow, .xf-section-title, .xf-section-lead, .templates-subscription-note'
        )
      : [];
    var targets = Array.prototype.slice.call(bits);

    function settle() {
      targets.forEach(function (el) {
        try {
          gsap.set(el, { clearProps: 'opacity' });
        } catch (e) {}
        el.style.opacity = '';
      });
      if (banner) banner.classList.add('templates-banner--ready');
    }

    if (!targets.length) {
      settle();
      return true;
    }

    window.setTimeout(function () {
      if (banner && !banner.classList.contains('templates-banner--ready')) settle();
    }, 2200);

    gsap.set(targets, { opacity: 0 });
    gsap.to(targets, {
      opacity: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out',
      delay: 0.06,
      onComplete: settle,
    });

    return true;
  }

  /**
   * Skill Builder — solid centered hero (word-split broke alignment: title left / lead right).
   */
  function initSkillBuilderPageFlow() {
    var hero = document.querySelector('.sb-hero');
    if (!hero || document.documentElement._xfSkillBuilderFlow) return false;
    document.documentElement._xfSkillBuilderFlow = true;
    document.documentElement.classList.add('xf-skill-builder-page');

    hero.classList.add('is-revealed', 'is-cinematic-revealed', 'sb-hero--ready');
    hero.querySelectorAll('.scroll-reveal-in, h1, .sb-hero__eyebrow, .sb-hero__lead, .xf-word, .xf-word__inner, .xf-hero-line').forEach(function (el) {
      el.classList.add('is-revealed', 'is-cinematic-revealed');
      try {
        gsap.set(el, { clearProps: 'all' });
      } catch (e) {}
      el.style.opacity = '';
      el.style.transform = '';
    });

    document.querySelectorAll('.sb-body .scroll-reveal-in, .sb-panel').forEach(function (el) {
      el.classList.add('is-revealed', 'is-cinematic-revealed');
    });

    return true;
  }

  /**
   * Word-by-word title reveal for remaining inner pages.
   * Skips prompts / templates / skills / skill-builder (calm solid heroes).
   */
  function initPageHeroWordReveal() {
    if (isHome) return;
    if (document.querySelector('.pl-hero')) return;
    if (document.querySelector('.templates-banner, .templates-main')) return;
    if (document.querySelector('.skills-hero, .skills-hero-section, .skills-banner')) return;
    if (document.querySelector('.sb-hero, .sb-main')) return;
    if (document.querySelector('.xf-about-body, .xf-about-section')) return;
    if (document.querySelector('.contact-hero')) return;

    var titleSelectors = [
      '.xf-content-hero h1',
      '.xf-content-title',
      '.connector-setup-header h1',
      '.page-main h1',
      'main h1',
    ].join(', ');

    var titles = document.querySelectorAll(titleSelectors);
    if (!titles.length) return;

    var allInners = [];
    var supports = [];

    titles.forEach(function (title) {
      if (title._xfWordReady || title.querySelector('.xf-word')) return;
      title._xfWordReady = true;

      /* Preserve line breaks from <br> */
      var raw = title.innerHTML;
      var lineHtmls = raw.split(/<br\s*\/?>/i);
      title.textContent = '';
      title.setAttribute('aria-label', raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

      lineHtmls.forEach(function (lineHtml, li) {
        var lineText = lineHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (!lineText) return;
        var lineEl = document.createElement('span');
        lineEl.className = 'xf-hero-line';
        lineEl.style.display = 'block';
        var words = lineText.split(/\s+/);
        words.forEach(function (word) {
          var wrap = document.createElement('span');
          wrap.className = 'xf-word';
          wrap.setAttribute('aria-hidden', 'true');
          var inner = document.createElement('span');
          inner.className = 'xf-word__inner';
          inner.textContent = word;
          wrap.appendChild(inner);
          lineEl.appendChild(wrap);
          allInners.push(inner);
        });
        title.appendChild(lineEl);
      });

      /* Nearby lead / eyebrow / actions for a full hero intro */
      var root =
        title.closest('.xf-content-hero, .connector-setup-header, .contact-hero, header, section') ||
        title.parentElement;
      if (root) {
        root.querySelectorAll(
          [
            '.xf-section-eyebrow',
            '.xf-section-lead',
            '.xf-content-hero p',
            '.connector-setup-header p',
          ].join(', ')
        ).forEach(function (el) {
          if (supports.indexOf(el) === -1) supports.push(el);
        });
      }
    });

    if (!allInners.length) return;

    gsap.set(supports, { opacity: 0, y: 22 });
    gsap.set(allInners, { opacity: 0, y: '110%' });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(
      allInners,
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.045,
        ease: 'power4.out',
      },
      0.12
    );
    if (supports.length) {
      tl.to(
        supports,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: 'power3.out',
          /* Keep final transform so CSS doesn't re-apply a parked translateY */
          onComplete: function () {
            supports.forEach(function (el) {
              gsap.set(el, { clearProps: 'all' });
            });
          },
        },
        '-=0.55'
      );
    }
  }

  function isCalmInnerPage() {
    return !!(
      document.querySelector('.pl-main, .pl-hero') ||
      document.querySelector('.templates-banner, .templates-main') ||
      document.querySelector('.skills-hero, .skills-hero-section, .skills-banner, .skills-main') ||
      document.querySelector('.sb-hero, .sb-main')
    );
  }

  /**
   * Contact page — home-style centered word flow on hero (no FOUC flash).
   */
  function initContactPageFlow() {
    var hero = document.querySelector('.contact-hero');
    if (!hero) return false;
    document.documentElement.classList.add('xf-contact-page');

    var content = hero.querySelector('.contact-hero__content') || hero;
    runHomeStyleHeroFlow({
      root: content,
      titleSelector: 'h1, .contact-hero__title',
      supportSelector: '.contact-hero__tagline, p',
      readyClass: 'is-hero-ready',
      onBeforeAnimate: function () {
        content.classList.add('is-cinematic-revealing');
        hero.classList.add('is-cinematic-revealing');
      },
      onComplete: function () {
        content.classList.add('is-revealed', 'is-cinematic-revealed', 'is-hero-ready');
        hero.classList.add('is-revealed', 'is-cinematic-revealed', 'is-hero-ready');
        content.classList.remove('is-cinematic-revealing');
        hero.classList.remove('is-cinematic-revealing');
        content.style.opacity = '1';
        content.style.transform = 'none';
      },
    });

    /* Panel: slow fade once when it enters view (starts CSS-hidden) */
    var panel = document.querySelector('.contact-panel');
    if (panel && !panel._xfInnerReveal) {
      panel._xfInnerReveal = true;
      gsap.fromTo(
        panel,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          onStart: function () {
            panel.classList.add('is-cinematic-revealing');
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(28px)';
          },
          onComplete: function () {
            panel.classList.add('is-revealed', 'is-cinematic-revealed');
            panel.classList.remove('is-cinematic-revealing');
            gsap.set(panel, { clearProps: 'transform,opacity' });
            panel.style.opacity = '1';
            panel.style.transform = 'none';
          },
        }
      );
    }

    return true;
  }

  /**
   * About page — home-style hero word flow + section reveals.
   * Pre-hidden via inline CSS (xf-about-page) so nothing flashes before the slow fade-in.
   */
  function initAboutPageFlow() {
    var hero = document.querySelector('.xf-content-hero');
    document.documentElement.classList.add('xf-about-page');

    if (hero) {
      runHomeStyleHeroFlow({
        root: hero,
        titleSelector: 'h1, .xf-content-title',
        supportSelector: '.xf-content-eyebrow, .xf-content-lead, .xf-section-eyebrow, .xf-section-lead',
        readyClass: 'is-hero-ready',
        onBeforeAnimate: function () {
          /* Only after words/supports are at opacity 0 — then show shell */
          hero.classList.add('is-cinematic-revealing');
        },
        onComplete: function () {
          hero.classList.add('is-revealed', 'is-cinematic-revealed', 'is-hero-ready');
          hero.classList.remove('is-cinematic-revealing');
          hero.style.opacity = '1';
          hero.style.transform = 'none';
        },
      });
    }

    /* Sections: CSS-hidden until onStart; slow fade once — no prior full paint */
    document.querySelectorAll('.xf-about-section').forEach(function (el) {
      if (el._xfInnerReveal) return;
      el._xfInnerReveal = true;
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onStart: function () {
            /* Drop !important pre-hide; GSAP now owns opacity from 0 */
            el.classList.add('is-cinematic-revealing');
            el.style.opacity = '0';
            el.style.transform = 'translateY(32px)';
          },
          onComplete: function () {
            el.classList.add('is-revealed', 'is-cinematic-revealed');
            el.classList.remove('is-cinematic-revealing');
            gsap.set(el, { clearProps: 'transform,opacity' });
            el.style.opacity = '1';
            el.style.transform = 'none';
          },
        }
      );
    });

    return true;
  }

  /** Soft scroll reveals for inner pages (no forced pre-hide = no blank glitch) */
  function initInnerPageReveals() {
    if (isHome) return;
    /* Prompts / templates / skills / about: dedicated flows */
    if (isCalmInnerPage()) return;
    if (document.querySelector('.xf-about-body, .xf-about-section')) return;
    if (document.querySelector('.contact-hero, .contact-panel')) return;

    var nodes = document.querySelectorAll(
      [
        '.scroll-reveal-in',
        '.xf-prose',
        '.connector-setup-grid',
        '.connector-setup-apps',
        '.connector-setup-faq',
        '.connector-setup-cta',
        '.sb-panel',
        '[data-scroll-reveal] > *',
      ].join(', ')
    );

    var seen = [];
    nodes.forEach(function (el) {
      if (el._xfInnerReveal) return;
      /* Skip hero bits already word-animated */
      if (el.closest('.xf-content-hero') || el.classList.contains('xf-content-hero')) {
        return;
      }
      el._xfInnerReveal = true;
      seen.push(el);
    });

    seen.forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          onComplete: function () {
            el.classList.add('is-revealed', 'is-cinematic-revealed');
            gsap.set(el, { clearProps: 'transform,opacity' });
          },
        }
      );
    });
  }

  function boot() {
    bindLenis();
    initAtmosphere();
    markLiftTargets();
    initProgress();

    if (isHome) {
      syncHeroPinSpacer();
      liberateNavFromHero();
      initHero();
      initSkillsSectionMotion();
      initExpand();
      initTilt();
      initFinalCta();
      initStatsPunch();
      initNavMorph();
      initReveals();
      /* Re-measure after pin spacer + elevated nav so ST/IO hit selected-work correctly */
      window.requestAnimationFrame(function () {
        syncHeroPinSpacer();
        ScrollTrigger.refresh();
      });
      window.setTimeout(function () {
        ScrollTrigger.refresh();
      }, 320);
    } else if (document.querySelector('.pl-hero')) {
      /* Prompts: dedicated calm flow only — no word-split, no body y-reveals */
      initPromptsHeroFlow();
    } else if (document.querySelector('.templates-banner, .templates-main')) {
      /* Templates: calm banner fade — no word-split, no filter/grid y thrash */
      initTemplatesPageFlow();
    } else if (document.querySelector('.skills-hero, .skills-hero-section, .skills-banner')) {
      /* Skills: solid first paint — no word-split re-flow flash */
      initSkillsPageFlow();
    } else if (document.querySelector('.sb-hero, .sb-main')) {
      /* Skill Builder: solid centered hero — word-split broke title/lead alignment */
      initSkillBuilderPageFlow();
    } else if (document.querySelector('.xf-about-body, .xf-about-section')) {
      /* About: pre-hidden, then home-style word flow + slow section fade (no FOUC flash) */
      initAboutPageFlow();
    } else if (document.querySelector('.contact-hero')) {
      /* Contact: pre-hidden centered word flow (no FOUC flash) */
      initContactPageFlow();
    } else {
      /* Other inner pages: word-title + calm scroll reveals */
      initPageHeroWordReveal();
      initInnerPageReveals();
    }

    initMagneticEnhanced();
    initCursor();
    initFooter();

    window.addEventListener('resize', function () {
      if (isHome) syncHeroPinSpacer();
      ScrollTrigger.refresh();
    });

    window.addEventListener('load', function () {
      if (isHome) syncHeroPinSpacer();
      ScrollTrigger.refresh();
      window.setTimeout(function () {
        if (isHome) {
          syncHeroPinSpacer();
          initExpand();
          initTilt();
          /* Re-bind skills/combo cards after home-extras inject */
          initSkillsSectionMotion();
        } else if (!isCalmInnerPage()) {
          /* Re-run after skills/dynamic render (not prompts/templates) */
          initInnerPageReveals();
          markLiftTargets();
        } else {
          markLiftTargets();
          /* Re-mark templates grid if it rendered after boot */
          if (document.documentElement.classList.contains('xf-templates-page')) {
            var g = document.getElementById('visual-templates-grid');
            if (g) g.classList.add('is-revealed', 'is-cinematic-revealed');
            document.querySelectorAll('.templates-main .scroll-reveal-in, .templates-main [data-scroll-stagger]').forEach(function (el) {
              el.classList.add('is-revealed', 'is-cinematic-revealed');
            });
          }
        }
        ScrollTrigger.refresh();
      }, 400);
      window.setTimeout(function () {
        if (!isHome && !isCalmInnerPage()) initInnerPageReveals();
        ScrollTrigger.refresh();
      }, 1200);
    });

    var marquee = document.getElementById('selected-work-marquee');
    if (marquee) {
      var mo = new MutationObserver(function () {
        ScrollTrigger.refresh();
        if (isHome) {
          initExpand();
          initTilt();
        }
      });
      mo.observe(marquee, { childList: true, subtree: true });
      window.setTimeout(function () {
        mo.disconnect();
      }, 10000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.setTimeout(boot, 50);
    });
  } else {
    window.setTimeout(boot, 50);
  }

  window.XFreezeCinematic = {
    refresh: function () {
      var section = document.getElementById('xf-skills-spotlight-section');
      if (section) {
        /* Allow re-bind after home-extras injects combo/spotlight cards */
        section.querySelectorAll('[data-xf-stagger-in]').forEach(function (grid) {
          var n = grid.querySelectorAll('.xf-spot-card, .xf-combo-card, a, article').length;
          if (n && (!grid._xfStaggerPlayed || grid._xfStaggerCount !== n)) {
            grid._xfStaggerBound = false;
            grid._xfStaggerPlayed = false;
            grid._xfStaggerCount = 0;
          }
        });
        initSkillsSectionMotion();
      }
      if (!isHome && !isCalmInnerPage()) {
        initInnerPageReveals();
      }
      if (document.documentElement.classList.contains('xf-templates-page')) {
        var g = document.getElementById('visual-templates-grid');
        if (g) g.classList.add('is-revealed', 'is-cinematic-revealed');
        document
          .querySelectorAll('.templates-main .scroll-reveal-in, .templates-main [data-scroll-stagger]')
          .forEach(function (el) {
            el.classList.add('is-revealed', 'is-cinematic-revealed');
          });
      }
      markLiftTargets();
      ScrollTrigger.refresh();
    },
  };
})();
