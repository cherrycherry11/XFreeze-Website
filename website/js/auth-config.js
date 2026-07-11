/**
 * Public pages - no login required.
 */
var XF_PUBLIC_PAGES = ['login.html', 'signup.html', 'home.html', 'index.html', 'terms.html', 'privacy.html'];

/**
 * Protected pages - login required (direct URL or link from home).
 */
var XF_PROTECTED_PAGES = [
  'templates.html',
  'skills.html',
  'prompt-library.html',
  'bundles.html',
    'contact.html',
  'connector-setup.html',
];

/**
 * Hide protected pages until auth check completes (prevents content flash).
 */
(function () {
  var page = (location.pathname.split('/').pop() || '').split('?')[0];
  if (!page || page === 'index.html') page = 'home.html';
  if (XF_PUBLIC_PAGES.indexOf(page) === -1) {
    document.documentElement.classList.add('xf-auth-pending');
  }
})();

/**
 * BUILD MODE: set XF_REQUIRE_AUTH_LIVE to false while finishing the site.
 * LAUNCH: set XF_REQUIRE_AUTH_LIVE to true before going public.
 * Localhost always skips auth so you can preview every page while editing.
 */
var XF_IS_LOCAL_DEV = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname);
var XF_REQUIRE_AUTH_LIVE = false;

/**
 * X Freeze Supabase auth config - xfreeze.com
 */
window.X FreezeAuthConfig = {
  supabaseUrl: 'https://ekmllicbgmuodptvgxsl.supabase.co',
  supabaseAnonKey: 'sb_publishable_hwfaIz4HJxim1Rb3o04-UA_jyyoJgfY',
  siteUrl: 'https://xfreeze.com',
  loginPath: 'login.html',
  defaultRedirect: 'home.html',

  requireAuth: XF_IS_LOCAL_DEV ? false : XF_REQUIRE_AUTH_LIVE,
  publicPages: XF_PUBLIC_PAGES,
  protectedPages: XF_PROTECTED_PAGES,

  providers: {
    twitter: true,
  },
};