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
  loginPath: 'login.html',
  defaultRedirect: 'home.html',

  /* Google OAuth Web Client ID (same as Supabase) for One Tap */
  googleClientId: 'YOUR_GOOGLE_OAUTH_WEB_CLIENT_ID.apps.googleusercontent.com',
  googleOneTap: true,

  requireAuth: true,
  publicPages: [
    'login.html',
    'signup.html',
    'home.html',
    'index.html',
    'terms.html',
    'privacy.html',
    'templates.html',
    'skills.html',
    'prompt-library.html',
    'bundles.html',
    'contact.html',
    'connector-setup.html',
    'about.html',
    'skill-builder.html',
    'workflows.html',
    'use-cases.html',
    'changelog.html',
  ],
  protectedPages: ['account.html'],

  providers: {
    x: false,
    google: true,
  },
};
