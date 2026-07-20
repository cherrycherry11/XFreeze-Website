/**
 * Applies document title, meta description, and sitewide favicons
 * from <html data-xf-meta-*> attributes.
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

  /**
   * Resolve asset path relative to this script so /website/ and nested
   * pages (blog/*) both hit the correct logo folder.
   */
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

  function ensureLink(rel, href, attrs) {
    var sel = 'link[rel="' + rel + '"]';
    if (attrs && attrs.sizes) sel += '[sizes="' + attrs.sizes + '"]';
    if (document.querySelector(sel)) return;
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

  /* Sitewide favicons — dark mark (white glyph on #0a0a0a); ?v busts browser cache */
  var v = 'dark2';
  var base = assetUrl('assets/images/logo/');
  var rootFav = assetUrl('favicon.ico') + '?v=' + v;
  var rootPng = assetUrl('favicon.png') + '?v=' + v;

  ensureLink('icon', rootFav, { type: 'image/x-icon' });
  ensureLink('icon', rootPng, { type: 'image/png', sizes: '48x48' });
  ensureLink('icon', base + 'favicon-32.png?v=' + v, { type: 'image/png', sizes: '32x32' });
  ensureLink('icon', base + 'favicon-192.png?v=' + v, { type: 'image/png', sizes: '192x192' });
  ensureLink('apple-touch-icon', base + 'apple-touch-icon.png?v=' + v, { sizes: '180x180' });
  ensureLink('shortcut icon', rootFav, {});
})();
