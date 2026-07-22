/**
 * Copy to js/auth-config.js and fill in your Supabase values.
 * See docs/AUTH-SETUP.md
 *
 * requireAuth: when true on live, resource use (copy/open) needs login.
 * Pages are free to browse; only protectedPages gate on load.
 */
window.XFreezeAuthConfig = {
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY',
  siteUrl: 'https://xfreeze.com',
  loginPath: 'login',
  defaultRedirect: 'home',

  /* Google OAuth Web Client ID (same as Supabase) for One Tap */
  googleClientId: 'YOUR_GOOGLE_OAUTH_WEB_CLIENT_ID.apps.googleusercontent.com',
  googleOneTap: true,

  requireAuth: true,
  publicPages: [
    'login',
    'signup',
    'home',
    'index',
    'terms',
    'privacy',
    'templates',
    'skills',
    'prompt-library',
    'bundles',
    'contact',
    'connector-setup',
    'about',
    'skill-builder',
    'workflows',
    'use-cases',

  ],
  protectedPages: ['account'],

  providers: {
    x: false,
    google: true,
  },
};
