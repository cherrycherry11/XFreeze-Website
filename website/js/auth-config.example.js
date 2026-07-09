/**
 * Copy to js/auth-config.js and fill in your Supabase values.
 * See docs/AUTH-SETUP.md
 */
window.X FreezeAuthConfig = {
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY',
  siteUrl: 'https://xfreeze.com',
  loginPath: 'login.html',
  defaultRedirect: 'home.html',

  requireAuth: true,
  publicPages: ['login.html', 'home.html'],
  protectedPages: [
    'templates.html',
    'skills.html',
    'bundles.html',
    'blog.html',
    'contact.html',
    'connector-setup.html',
  ],

  providers: {
    twitter: false,
  },
};