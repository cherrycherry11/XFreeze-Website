/**
 * Applies document title, meta description, and sitewide favicons
 * from <html data-xf-meta-*> attributes.
 *
 * Favicons use root-absolute paths on production so Google Search
 * can crawl a stable icon URL for SERP results.
 */
(function () {
  var root = document.documentElement;
  var title = root.getAttribute('data-xf-meta-title');
  var desc = root.getAttribute('data-xf-meta-desc');
  if (title) document.title = title;
  if (desc) {
    var meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }

  function assetUrl(relFromJs) {
    var scripts = document.getElementsByTagName('script');
    var src = '';
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && /site-meta\.js(\?|$)/.test(scripts[i].src)) {
        src = scripts[i].src;
        break;
      }
    }
    if (!src) return relFromJs;
    return src.replace(/js\/site-meta\.js(\?.*)?$/, '') + relFromJs.replace(/^\//, '');
  }

  /** Prefer https://xfreeze.com/... on live; relative elsewhere */
  function iconUrl(path) {
    var host = (location.hostname || '').toLowerCase();
    if (host === 'xfreeze.com' || host === 'www.xfreeze.com') {
      return 'https://xfreeze.com/' + path.replace(/^\//, '');
    }
    return assetUrl(path);
  }

  function ensureLink(rel, href, attrs) {
    var sel = 'link[rel="' + rel + '"]';
    if (attrs && attrs.sizes) sel += '[sizes="' + attrs.sizes + '"]';
    if (attrs && attrs.type && !attrs.sizes) sel += '[type="' + attrs.type + '"]';
    var existing = document.querySelector(sel);
    if (existing) {
      existing.href = href;
      return;
    }
    var link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        link.setAttribute(k, attrs[k]);
      });
    }
    document.head.appendChild(link);
  }

  /* share2 — Google wants stable crawlable icons (48px+ square PNG) */
  var v = 'share2';
  var ico = iconUrl('favicon.ico') + '?v=' + v;
  var png48 = iconUrl('favicon.png') + '?v=' + v;
  var png32 = iconUrl('assets/images/logo/favicon-32.png') + '?v=' + v;
  var png96 = iconUrl('assets/images/logo/favicon-96.png') + '?v=' + v;
  var png192 = iconUrl('assets/images/logo/favicon-192.png') + '?v=' + v;
  var apple = iconUrl('assets/images/logo/apple-touch-icon.png') + '?v=' + v;
  var manifest = iconUrl('site.webmanifest');

  ensureLink('icon', ico, { type: 'image/x-icon' });
  ensureLink('icon', png48, { type: 'image/png', sizes: '48x48' });
  ensureLink('icon', png32, { type: 'image/png', sizes: '32x32' });
  ensureLink('icon', png96, { type: 'image/png', sizes: '96x96' });
  ensureLink('icon', png192, { type: 'image/png', sizes: '192x192' });
  ensureLink('apple-touch-icon', apple, { sizes: '180x180' });
  ensureLink('shortcut icon', ico, {});
  ensureLink('manifest', manifest, {});
})();
