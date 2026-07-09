/**
 * Applies document title and meta description from <html data-xf-meta-*> attributes.
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
})();
