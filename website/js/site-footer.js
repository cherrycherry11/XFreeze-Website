/**
 * X Freeze site footer - render, active link, crypto copy
 */
(function () {
  'use strict';

  var PAGE_MAP = {
    'home.html': 'home',
    'templates.html': 'templates',
    'about.html': 'about',
    'skills.html': 'skills',
    'skill-builder.html': 'skills',
    'prompt-library.html': 'prompts',
    'blog.html': 'blog',
    'contact.html': 'contact',
    'changelog.html': 'changelog',
    'workflows.html': 'workflows',
    'use-cases.html': 'use-cases',
    'account.html': 'account',
    'privacy.html': 'privacy',
    'terms.html': 'terms',
  };

  var CRYPTO_ADDRESSES = {
    solana: 'EYTx9xJrpB3NiTmLSWQUf4pVksN2naRKXTezZfa6VjWb',
    bitcoin: 'bc1q4ntsw4f9a6vqm5yuzy9h3zd5sc44zk870ncjwy',
    ethereum: '0x22614C159AC3226Ce92E99905EA7A401fa6e6d12',
  };

  var FOOTER_SECTIONS = [
    {
      title: 'Explore',
      links: [
        { href: 'home.html', label: 'Home', nav: 'home' },
        { href: 'templates.html', label: 'Templates', nav: 'templates' },
        { href: 'prompt-library.html', label: 'Motion prompts', nav: 'prompts' },
        { href: 'skills.html', label: 'Skills', nav: 'skills' },
        { href: 'about.html', label: 'About', nav: 'about' },
        { href: 'blog.html', label: 'Blog', nav: 'blog' },
        { href: 'contact.html', label: 'Contact', nav: 'contact' },
      ],
    },
    {
      title: 'Templates',
      links: [
        { href: 'templates.html?cat=Product', label: 'Product' },
        { href: 'templates.html?cat=Mockup%27s', label: "Mockup's" },
        { href: 'templates.html?cat=Style+Edit', label: 'Style Edit' },
        { href: 'templates.html?cat=Make-up', label: 'Make-up' },
        { href: 'templates.html?cat=Filters', label: 'Filters' },
        { href: 'templates.html?cat=Common+Uses', label: 'Common Uses' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { href: 'skill-builder.html', label: 'Skill Builder' },
        { href: 'connector-setup.html', label: 'Connector setup' },
        { href: 'use-cases.html', label: 'Use cases', nav: 'use-cases' },
        { href: 'workflows.html', label: 'Workflow combos', nav: 'workflows' },
        { href: 'changelog.html', label: 'Changelog', nav: 'changelog' },
        { href: 'account.html', label: 'My Library', nav: 'account' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { href: 'https://x.com/XFreeze', label: '@XFreeze', external: true },
        { href: 'https://grok.com', label: 'grok.com', external: true },
        { href: 'https://grok.com/imagine', label: 'Grok Imagine', external: true },
        { href: 'https://buymeacoffee.com/xfreeze', label: 'Buy me a coffee', external: true },
        { href: 'privacy.html', label: 'Privacy', nav: 'privacy' },
        { href: 'terms.html', label: 'Terms', nav: 'terms' },
        { href: 'mailto:contact@xfreeze.com', label: 'contact@xfreeze.com' },
      ],
    },
  ];

  function basePath() {
    var path = location.pathname || '';
    return path.indexOf('/blog/') !== -1 ? '../' : '';
  }

  function currentPageKey() {
    var file = (location.pathname.split('/').pop() || 'home.html').split('?')[0];
    return PAGE_MAP[file] || '';
  }

  function linkAttrs(link, base, activeKey) {
    var attrs = ' href="' + base + link.href + '"';
    if (link.external) {
      attrs += ' target="_blank" rel="noopener noreferrer"';
    }
    if (link.nav && link.nav === activeKey) {
      attrs += ' class="is-active" aria-current="page"';
    } else if (link.nav) {
      attrs += ' data-xf-nav="' + link.nav + '"';
    }
    return attrs;
  }

  function renderColumn(section, base, activeKey) {
    var items = section.links
      .map(function (link) {
        return '<li><a' + linkAttrs(link, base, activeKey) + '>' + link.label + '</a></li>';
      })
      .join('');

    return (
      '<div class="xf-footer-col">' +
      '<h3 class="xf-footer-heading">' + section.title + '</h3>' +
      '<ul class="xf-footer-list">' + items + '</ul>' +
      (section.title === 'Connect' ? renderCryptoTip() : '') +
      '</div>'
    );
  }

  function renderCryptoTip() {
    return (
      '<details class="xf-crypto-tip">' +
      '<summary class="xf-crypto-tip__summary">Optional tip · wallets</summary>' +
      '<div class="xf-crypto-tip__panel">' +
      '<p class="xf-crypto-tip__note">Totally optional - helps keep the library free.</p>' +
      '<div class="xf-crypto-tip__row">' +
      '<button type="button" class="xf-crypto-chip" data-xf-crypto="solana">' +
      '<span>◎ SOL</span><span class="xf-crypto-chip__addr">EYTx…VjWb</span></button>' +
      '<button type="button" class="xf-crypto-chip" data-xf-crypto="bitcoin">' +
      '<span>₿ BTC</span><span class="xf-crypto-chip__addr">bc1q…cjwy</span></button>' +
      '<button type="button" class="xf-crypto-chip" data-xf-crypto="ethereum">' +
      '<span>Ξ ETH</span><span class="xf-crypto-chip__addr">0x22…6d12</span></button>' +
      '</div></div></details>'
    );
  }

  function renderFooter() {
    var root = document.querySelector('[data-xf-footer-root]');
    if (!root) return;

    var base = basePath();
    var activeKey = currentPageKey();
    var columns = FOOTER_SECTIONS.map(function (section) {
      return renderColumn(section, base, activeKey);
    }).join('');

    root.innerHTML =
      '<div class="scroll-reveal-in content-container xf-site-footer__inner">' +
      '<div class="xf-footer-shell">' +
      '<div class="xf-footer-brand">' +
      '<p class="xf-footer-eyebrow">AI library for</p>' +
      '<a href="' + base + 'home.html" class="xf-footer-logo">X Freeze</a>' +
      '<p class="xf-footer-tagline" data-xf-tagline>Ready-made AI assets for everything you ship.</p>' +
      '</div>' +
      '<div class="xf-footer-columns">' + columns + '</div>' +
      '</div>' +
      '<div class="xf-footer-bottom">' +
      '<p class="xf-footer-copy">© 2026 X Freeze</p>' +
      '<div class="xf-footer-badge xf-footer-badge--static">' +
      '<span class="xf-footer-badge--compliance">' +
      '<span>Unofficial fan library</span>' +
      '<span class="xf-footer-badge__sub">Not affiliated with xAI · Opens in ' +
      '<a href="https://grok.com/imagine" target="_blank" rel="noopener noreferrer">Grok Imagine</a></span>' +
      '</span></div></div></div>';

    root.querySelectorAll('[data-xf-crypto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        copyCrypto(btn.getAttribute('data-xf-crypto'), btn);
      });
    });

    if (window.XFreezeSite && window.XFreezeSite.applyCounts) {
      window.XFreezeSite.applyCounts();
    }
  }

  function initFooterNav() {
    var key = currentPageKey();
    if (!key) return;

    document.querySelectorAll('.xf-footer-list a[data-xf-nav="' + key + '"]').forEach(function (link) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    });
  }

  function initTopNav() {
    var key = currentPageKey();
    if (!key) return;

    var hrefMap = {
      home: 'home.html',
      templates: 'templates.html',
      about: 'about.html',
      skills: 'skills.html',
      blog: 'blog.html',
      contact: 'contact.html',
      changelog: 'changelog.html',
      workflows: 'workflows.html',
      'use-cases': 'use-cases.html',
      account: 'account.html',
    };

    var target = hrefMap[key];
    if (!target) return;

    document.querySelectorAll('.site-nav-pill a.site-nav-pill-link').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('?')[0];
      var normalized = href.replace(/^\.\.\//, '');
      if (normalized === target || href === target) {
        link.classList.add('site-nav-pill-link--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function copyCrypto(coin, btnEl) {
    var full = CRYPTO_ADDRESSES[coin];
    if (!full || !btnEl) return;

    var original = btnEl.innerHTML;

    function onSuccess() {
      btnEl.classList.add('is-copied');
      btnEl.innerHTML = '<span>Copied</span>';
      if (window.XFreezeSupportToast) {
        window.XFreezeSupportToast.afterCopy({
          subtitle: 'Wallet address copied.',
        });
      }
      setTimeout(function () {
        btnEl.classList.remove('is-copied');
        btnEl.innerHTML = original;
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(onSuccess).catch(function () {
        window.prompt('Copy this address:', full);
      });
      return;
    }

    window.prompt('Copy this address:', full);
  }

  function loadFaqBot() {
    if (document.getElementById('xf-faq-bot')) return;

    var base = basePath();

    if (!document.querySelector('link[data-xf-faq-bot-css]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'css/faq-assistant.css?v=8';
      link.setAttribute('data-xf-faq-bot-css', '');
      document.head.appendChild(link);
    }

    function loadAssistant() {
      var script = document.createElement('script');
      script.src = base + 'js/faq-assistant.js?v=8';
      script.defer = true;
      document.body.appendChild(script);
    }

    if (window.XFreezeFaqBotData) {
      loadAssistant();
      return;
    }

    var dataScript = document.createElement('script');
    dataScript.src = base + 'data/faq-bot-data.js?v=2';
    dataScript.onload = loadAssistant;
    dataScript.onerror = loadAssistant;
    document.body.appendChild(dataScript);
  }

  function init() {
    renderFooter();
    initFooterNav();
    initTopNav();
    loadFaqBot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.XFreezeFooter = { copyCrypto: copyCrypto, init: init, renderFooter: renderFooter };
})();