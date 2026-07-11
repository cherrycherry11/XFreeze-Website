/**
 * Public pages - no login required (landing + legal + auth only).
 * Everything else requires a signed-in account on the live site.
 */
var XF_PUBLIC_PAGES = ['login.html', 'signup.html', 'home.html', 'index.html', 'terms.html', 'privacy.html'];

/**
 * Explicit protected list (kept for clarity). Live auth also gates any
 * non-public page, not only this list.
 */
var XF_PROTECTED_PAGES = [
  'templates.html',
  'skills.html',
  'prompt-library.html',
  'bundles.html',
  'contact.html',
  'connector-setup.html',
  'about.html',
  'skill-builder.html',
  'account.html',
  'workflows.html',
  'use-cases.html',
  'changelog.html',
];

/**
 * Hide non-public pages until auth check completes (prevents content flash).
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
var XF_REQUIRE_AUTH_LIVE = true;

/**
 * X Freeze Supabase auth config - xfreeze.com
 */
window.XFreezeAuthConfig = {
  supabaseUrl: 'https://ekmllicbgmuodptvgxsl.supabase.co',
  supabaseAnonKey: 'sb_publishable_hwfaIz4HJxim1Rb3o04-UA_jyyoJgfY',
  siteUrl: 'https://xfreeze.com',
  loginPath: 'login.html',
  defaultRedirect: 'home.html',

  /* Same Google OAuth Web Client ID as Supabase (for One Tap / GIS). */
  googleClientId: '420941566311-7ms3q9vd5p6er0j1lmvnumug51c6dsqb.apps.googleusercontent.com',
  googleOneTap: true,

  requireAuth: XF_IS_LOCAL_DEV ? false : XF_REQUIRE_AUTH_LIVE,
  publicPages: XF_PUBLIC_PAGES,
  protectedPages: XF_PROTECTED_PAGES,

  providers: {
    /* Twitter/X must be ON in Supabase Auth → Providers before setting true */
    twitter: false,
    google: true,
  },
};