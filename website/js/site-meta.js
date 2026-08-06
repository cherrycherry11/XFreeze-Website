/**
 * Applies document title, meta description, and sitewide favicons
 * from <html data-xf-meta-*> attributes.
 *
 * Favicons use root-absolute paths on production so Google Search
 * can crawl a stable icon URL for SERP results (48px+ square PNG).
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

  /** Prefer absolute freezestack.com icons on live; relative elsewhere */
  function iconUrl(path) {
    var host = (location.hostname || '').toLowerCase();
    if (
      host === 'freezestack.com' ||
      host === 'www.freezestack.com' ||
      host === 'xfreeze.com' ||
      host === 'www.xfreeze.com'
    ) {
      return 'https://freezestack.com/' + path.replace(/^\//, '');
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
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          existing.setAttribute(k, attrs[k]);
        });
      }
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

  /* Google SERP: clean absolute 48x48+ first, no cache-bust query on primary icons */
  var origin = 'https://freezestack.com';
  try {
    var host = (location.hostname || '').toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') {
      origin = location.origin;
    }
  } catch (e) {}
  var ico = origin + '/favicon.ico';
  var png32 = origin + '/favicon-32x32.png';
  var png48 = origin + '/favicon-48x48.png';
  var png96 = origin + '/favicon-96x96.png';
  var apple = origin + '/apple-touch-icon.png';
  var manifest = origin + '/site.webmanifest';

  ensureLink('icon', png48, { type: 'image/png', sizes: '48x48' });
  ensureLink('icon', png96, { type: 'image/png', sizes: '96x96' });
  ensureLink('icon', ico, { type: 'image/x-icon' });
  ensureLink('icon', png32, { type: 'image/png', sizes: '32x32' });
  ensureLink('apple-touch-icon', apple, { sizes: '180x180' });
  ensureLink('manifest', manifest, {});
})();
