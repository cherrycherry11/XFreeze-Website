/**
 * X Freeze auth - email/password + X/Twitter via Supabase
 */
(function () {
  'use strict';

  var client = null;
  var session = null;
  var authMode = 'signin';
  /* Raw nonce for signInWithIdToken; hashed version is sent to Google GIS. */
  var googleOneTapNonce = null;
  var googleOneTapBusy = false;
  var googleOneTapInited = false;

  function config() {
    return window.XFreezeAuthConfig || {};
  }

  function providers() {
    var c = config();
    return c.providers || {};
  }

  function providerConfigKey(name) {
    /* Site config may use either key for X login. */
    if (name === 'x' || name === 'twitter') return 'x';
    return name;
  }

  function isProviderEnabled(name) {
    var p = providers();
    if (name === 'x' || name === 'twitter') {
      return Boolean(p.x || p.twitter);
    }
    return Boolean(p[providerConfigKey(name)]);
  }

  function isConfigured() {
    var c = config();
    return Boolean(
      c.supabaseUrl &&
        c.supabaseUrl.indexOf('YOUR_PROJECT') === -1 &&
        c.supabaseAnonKey &&
        c.supabaseAnonKey.indexOf('YOUR_SUPABASE') === -1 &&
        c.supabaseAnonKey.indexOf('YOUR_PROJECT') === -1
    );
  }

  function siteOrigin() {
    /* Prefer the origin the user is actually on so the session cookie/storage
       stays on the same host (www vs apex, vercel vs custom domain). */
    return window.location.origin;
  }

  function loginUrl() {
    var c = config();
    var path = c.loginPath || 'login';
    return siteOrigin() + '/' + path.replace(/^\//, '');
  }

  function supabaseProviderName(name) {
    /* Supabase "X / Twitter (OAuth 2.0)" uses provider id "x".
       Legacy "Twitter (Deprecated)" was "twitter" - do not use that. */
    if (name === 'x' || name === 'twitter') return 'x';
    return name;
  }

  function redirectAfterLogin() {
    var c = config();
    var stored = '';
    try {
      stored = sessionStorage.getItem('xf-auth-redirect') || '';
    } catch (e) {}

    if (stored && stored.indexOf('login') === -1) {
      try {
        sessionStorage.removeItem('xf-auth-redirect');
      } catch (err) {}
      return stored;
    }

    return c.defaultRedirect || 'home';
  }

  function currentPage() {
    var page = (window.location.pathname.split('/').pop() || '').split('?')[0];
    if (!page || page === 'index' || page === 'index.html') return 'home';
    /* Support both /pricing and legacy /pricing.html */
    if (page.length > 5 && page.slice(-5) === '.html') {
      page = page.slice(0, -5);
    }
    return page;
  }

  function loginPageName() {
    var path = config().loginPath || 'login';
    return path.split('/').pop();
  }

  function isOAuthCallback() {
    var hash = window.location.hash || '';
    var search = window.location.search || '';
    return (
      hash.indexOf('access_token') !== -1 ||
      hash.indexOf('error') !== -1 ||
      search.indexOf('code=') !== -1
    );
  }

  function loginPageUrl() {
    return config().loginPath || 'login';
  }

  function shouldStayOnLoginPage() {
    var page = currentPage();
    /* Always allow the login + signup pages to render */
    if (page === 'signup' || page === loginPageName()) return true;
    if (isOAuthCallback()) return true;
    return false;
  }

  function markSignInIntent() {
    try {
      sessionStorage.setItem('xf-auth-intent', 'signin');
    } catch (e) {}
  }

  function clearSignInIntent() {
    try {
      sessionStorage.removeItem('xf-auth-intent');
    } catch (e) {}
  }

  function publicPages() {
    var c = config();
    return c.publicPages || ['login', 'signup', 'home'];
  }

  function protectedPages() {
    var c = config();
    return (
      c.protectedPages || [
        'templates',
        'skills',
        'bundles',
        'contact',
        'connector-setup',
      ]
    );
  }

  function isPublicPage() {
    return publicPages().indexOf(currentPage()) !== -1;
  }

  function isProtectedPage(page) {
    if (!page) return false;
    if (publicPages().indexOf(page) !== -1) return false;
    if (page === loginPageName() || page === 'signup') return false;
    /* Only pages listed in protectedPages require sign-in on load. */
    return protectedPages().indexOf(page) !== -1;
  }

  function pageFromHref(href) {
    if (!href || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
      return '';
    }
    try {
      if (href.indexOf('://') !== -1) {
        var abs = new URL(href, window.location.href);
        if (abs.origin !== window.location.origin) return '';
        href = abs.pathname.split('/').pop() || '';
      }
    } catch (e) {
      return '';
    }
    return href.split('?')[0].split('#')[0].replace(/^\.\//, '').replace(/^\//, '');
  }

  function isExternalHref(href) {
    if (!href) return false;
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return true;
    try {
      if (href.indexOf('://') !== -1 || href.indexOf('//') === 0) {
        return new URL(href, window.location.href).origin !== window.location.origin;
      }
    } catch (e) {}
    return false;
  }

  /**
   * Page navigation is free. Only explicit protected pages (e.g. account)
   * still use page-level login on load.
   */
  function shouldGateHref(href) {
    if (!href || href === '#' || href.indexOf('javascript:') === 0) return false;
    if (isExternalHref(href)) return false;
    if (href.charAt(0) === '#') return false;

    var page = pageFromHref(href);
    if (!page) return false;
    if (page === loginPageName() || page === 'signup') return false;
    return isProtectedPage(page);
  }

  function redirectToLogin(returnPath) {
    markSignInIntent();
    if (returnPath && returnPath.charAt(0) !== '#' && returnPath.indexOf('login') === -1) {
      try {
        sessionStorage.setItem('xf-auth-redirect', returnPath);
      } catch (e) {}
    }
    window.location.href = loginPageUrl();
  }

  /**
   * Resource actions that require sign-in (copy / open / use).
   * Browsing pages and catalogs stays free.
   */
  var RESOURCE_ACTION_SELECTORS = [
    '[data-copy-skill]',
    '#xf-skill-modal-copy',
    '[data-preview-skill]',
    '[data-pl-copy]',
    '#pl-panel-copy',
    '[data-motion-copy]',
    '[data-xf-copy-motion]',
    '[data-sb-copy]',
    '[data-template-open]',
  ].join(',');

  function isLoggedIn() {
    return Boolean(session && session.user);
  }

  /**
   * Returns true if the user may proceed. If login is required and they
   * are signed out, redirects to login and returns false.
   */
  function requireLoginForResource(returnPath) {
    if (!shouldRequireAuth()) return true;
    if (isLoggedIn()) return true;
    redirectToLogin(returnPath || currentPage() + window.location.search + window.location.hash);
    return false;
  }

  function isResourceActionTarget(el) {
    if (!el || !el.closest) return null;
    return el.closest(RESOURCE_ACTION_SELECTORS);
  }

  function bindProtectedLinks() {
    if (!shouldRequireAuth()) return;

    /* Rare: links to pages that still require login on load (account). */
    document.addEventListener(
      'click',
      function (event) {
        if (isLoggedIn()) return;

        var link = event.target.closest('a[href]');
        if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

        var href = (link.getAttribute('href') || '').trim();
        if (!shouldGateHref(href)) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }

        redirectToLogin(href.replace(/^\.\//, ''));
      },
      true
    );
  }

  function bindResourceActions() {
    if (!shouldRequireAuth()) return;

    document.addEventListener(
      'click',
      function (event) {
        if (isLoggedIn()) return;

        var target = isResourceActionTarget(event.target);
        if (!target) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }

        redirectToLogin(currentPage() + window.location.search + window.location.hash);
      },
      true
    );
  }

  function shouldRequireAuth() {
    return isConfigured() && config().requireAuth === true;
  }

  function setPageVisible(visible) {
    document.documentElement.classList.toggle('xf-auth-pending', !visible);
  }

  function rememberRedirect() {
    markSignInIntent();
    var path = currentPage();
    if (path === loginPageName()) return;
    try {
      sessionStorage.setItem('xf-auth-redirect', path + window.location.search + window.location.hash);
    } catch (e) {}
  }

  async function enforceAuth() {
    if (!shouldRequireAuth() || !isProtectedPage(currentPage())) {
      setPageVisible(true);
      return true;
    }

    setPageVisible(false);
    await refreshSession();

    if (session && session.user) {
      setPageVisible(true);
      return true;
    }

    rememberRedirect();
    window.location.replace(loginPageUrl());
    return false;
  }

  function isProtectedDestination() {
    /* Only pages listed as protected (e.g. account) gate on load. */
    return shouldRequireAuth() && isProtectedPage(currentPage());
  }

  function getClient() {
    if (client) return client;
    if (!isConfigured() || !window.supabase) return null;

    var c = config();
    client = window.supabase.createClient(c.supabaseUrl, c.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: window.localStorage,
        storageKey: 'xf-auth-session',
      },
    });
    return client;
  }

  function initialsFromUser(user) {
    if (!user) return '?';
    var name = user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name);
    if (name) {
      var parts = name.trim().split(/\s+/);
      return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    }
    if (user.email) return user.email[0].toUpperCase();
    return '?';
  }

  function avatarUrl(user) {
    if (!user || !user.user_metadata) return '';
    return user.user_metadata.avatar_url || user.user_metadata.picture || '';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setStatus(el, type, message) {
    if (!el) return;
    el.hidden = !message;
    el.className = 'xf-auth-status xf-auth-status--' + (type || 'info');
    el.textContent = message || '';
  }

  function finishLogin(statusEl) {
    clearSignInIntent();
    setStatus(statusEl, 'success', 'Signed in. Redirecting…');
    var target = redirectAfterLogin();
    /* Small delay so the session is flushed to localStorage before navigation. */
    window.setTimeout(function () {
      window.location.href = target;
    }, 80);
  }

  function renderDrawerAuth(loggedInHtml, signedOutHtml) {
    var drawer = document.getElementById('xf-auth-drawer');
    if (!drawer) return;
    drawer.innerHTML = loggedInHtml || signedOutHtml || '';
  }

  function renderNavSlot() {
    var slot = document.getElementById('xf-auth-nav');
    var signedOutNav =
      '<a href="login" class="site-nav-auth-btn" onclick="window.XFreezeAuth && window.XFreezeAuth.rememberRedirect()">Sign in</a>';
    var signedOutDrawer =
      '<a href="templates" class="site-nav-drawer-auth-btn site-nav-drawer-cta" onclick="toggleMobileMenu && toggleMobileMenu()">Get started</a>' +
      '<a href="login" class="site-nav-drawer-auth-btn site-nav-drawer-auth-btn--ghost" onclick="toggleMobileMenu && toggleMobileMenu()">Sign in</a>';

    if (!slot && !document.getElementById('xf-auth-drawer')) return;

    if (!isConfigured() || !session || !session.user) {
      /*
       * Avoid wiping/rebuilding identical Sign in HTML on every page load
       * (that remount was making coffee + Sign in glitch between pages).
       */
      if (slot) {
        var existingSignIn = slot.querySelector('a.site-nav-auth-btn');
        var hasUserMenu = slot.querySelector('.site-nav-user');
        if (slot.getAttribute('data-auth-state') === 'signed-out' && existingSignIn) {
          /* already stable */
        } else if (existingSignIn && !hasUserMenu) {
          slot.setAttribute('data-auth-state', 'signed-out');
          if (!existingSignIn.getAttribute('onclick')) {
            existingSignIn.setAttribute(
              'onclick',
              'window.XFreezeAuth && window.XFreezeAuth.rememberRedirect()'
            );
          }
        } else {
          slot.innerHTML = signedOutNav;
          slot.setAttribute('data-auth-state', 'signed-out');
        }
      }
      renderDrawerAuth(null, signedOutDrawer);
      return;
    }

    var user = session.user;
    var email = user.email || 'Signed in';
    var avatar = avatarUrl(user);
    var initials = initialsFromUser(user);
    var userKey = user.id || email;

    if (slot) {
      /* Skip rebuild if already showing this signed-in user */
      if (slot.getAttribute('data-auth-state') === 'signed-in' && slot.getAttribute('data-auth-user') === userKey) {
        /* still refresh drawer below */
      } else {
      slot.innerHTML =
        '<div class="site-nav-user">' +
        '<button type="button" class="site-nav-user-trigger" id="xf-auth-user-trigger" aria-expanded="false" aria-haspopup="true" aria-label="Account" title="' +
        escapeHtml(email) +
        '">' +
        '<span class="site-nav-user-avatar">' +
        (avatar
          ? '<img src="' + escapeHtml(avatar) + '" alt="" referrerpolicy="no-referrer">'
          : escapeHtml(initials)) +
        '</span>' +
        '</button>' +
        '<div class="site-nav-user-menu" id="xf-auth-user-menu" hidden>' +
        '<div class="site-nav-user-email">' + escapeHtml(email) + '</div>' +
        '<a href="account" class="site-nav-user-menu-link"><i class="fa-regular fa-user" aria-hidden="true"></i> Account</a>' +
        '<a href="account#billing" class="site-nav-user-menu-link"><i class="fa-regular fa-credit-card" aria-hidden="true"></i> Billing</a>' +
        '<button type="button" id="xf-auth-sign-out"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Sign out</button>' +
        '</div>' +
        '</div>';
      slot.setAttribute('data-auth-state', 'signed-in');
      slot.setAttribute('data-auth-user', userKey);

      var trigger = document.getElementById('xf-auth-user-trigger');
      var menu = document.getElementById('xf-auth-user-menu');
      var signOutBtn = document.getElementById('xf-auth-sign-out');

      if (trigger && menu) {
        trigger.addEventListener('click', function (event) {
          event.stopPropagation();
          var open = menu.hasAttribute('hidden');
          menu.hidden = !open;
          trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        document.addEventListener('click', function () {
          menu.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        });
      }

      if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
          signOut();
        });
      }
      }
    }

    renderDrawerAuth(
      '<a href="account" class="site-nav-drawer-auth-btn site-nav-drawer-cta" onclick="toggleMobileMenu && toggleMobileMenu()">Account</a>' +
        '<button type="button" class="site-nav-drawer-auth-btn site-nav-drawer-auth-btn--ghost" id="xf-auth-drawer-sign-out">' +
        '<i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Sign out' +
        '</button>' +
        '<p class="site-nav-drawer-auth-email">' +
        escapeHtml(email) +
        '</p>',
      signedOutDrawer
    );

    var drawerSignOut = document.getElementById('xf-auth-drawer-sign-out');
    if (drawerSignOut) {
      drawerSignOut.addEventListener('click', function () {
        signOut();
      });
    }
  }

  function cleanAuthParamsFromUrl() {
    try {
      var url = new URL(window.location.href);
      var keys = ['code', 'state', 'error', 'error_description', 'error_code'];
      var changed = false;
      keys.forEach(function (key) {
        if (url.searchParams.has(key)) {
          url.searchParams.delete(key);
          changed = true;
        }
      });
      if (url.hash && (url.hash.indexOf('access_token') !== -1 || url.hash.indexOf('error') !== -1)) {
        url.hash = '';
        changed = true;
      }
      if (changed) {
        window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
      }
    } catch (e) {}
  }

  async function refreshSession() {
    var sb = getClient();
    if (!sb) {
      session = null;
      renderNavSlot();
      return null;
    }

    try {
      if (typeof sb.auth.initialize === 'function') {
        await sb.auth.initialize();
      }
    } catch (e) {}

    /* Explicit PKCE code exchange - more reliable than relying only on auto-detect. */
    try {
      var params = new URLSearchParams(window.location.search || '');
      var code = params.get('code');
      if (code) {
        var exchanged = await sb.auth.exchangeCodeForSession(code);
        if (exchanged.error) {
          console.warn('[xf-auth] code exchange failed', exchanged.error);
        } else if (exchanged.data && exchanged.data.session) {
          session = exchanged.data.session;
          cleanAuthParamsFromUrl();
          renderNavSlot();
          return session;
        }
      }
    } catch (err) {
      console.warn('[xf-auth] code exchange error', err);
    }

    var result = await sb.auth.getSession();
    if (result.error) {
      console.warn('[xf-auth] getSession failed', result.error);
    }
    session = result.data && result.data.session ? result.data.session : null;
    renderNavSlot();
    return session;
  }

  async function fetchOAuthUrl(provider) {
    var sb = getClient();
    if (!sb) throw new Error('Auth is not configured.');

    if (!isProviderEnabled(provider)) {
      throw new Error(
        provider === 'x' || provider === 'twitter'
          ? 'Sign in with X is not available yet. Use Google or email for now.'
          : 'This sign-in method is not enabled yet. Use email and password for now.'
      );
    }

    rememberRedirect();

    var oauthOptions = {
      redirectTo: loginUrl(),
      skipBrowserRedirect: true,
    };

    /*
     * X OAuth 2.0: avoid users.email (often blocked / not granted on free apps).
     * tweet.read + users.read + offline.access is enough for sign-in.
     */
    if (supabaseProviderName(provider) === 'x') {
      oauthOptions.scopes = 'tweet.read users.read offline.access';
    }

    var result = await sb.auth.signInWithOAuth({
      provider: supabaseProviderName(provider),
      options: oauthOptions,
    });

    if (result.error) {
      var msg = result.error.message || 'Sign-in failed.';
      if (/not enabled|unsupported provider/i.test(msg)) {
        msg =
          provider === 'x' || provider === 'twitter'
            ? 'Sign in with X is not available yet. Use Google or email for now.'
            : 'That sign-in method is not available yet. Try Google or email.';
      }
      throw new Error(msg);
    }
    return result.data;
  }

  async function signInWithOAuth(provider) {
    /* Always start a fresh OAuth request (PKCE verifier must match this attempt). */
    var data = await fetchOAuthUrl(provider);
    var url = data && data.url;
    if (url && /^https?:\/\//i.test(url) && url.indexOf('error') === -1) {
      /* Avoid navigating to Supabase JSON error pages (e.g. provider disabled). */
      window.location.assign(url);
      return data;
    }
    throw new Error('Could not start sign-in. Try Google or email instead.');
  }

  async function signInWithPassword(email, password) {
    var sb = getClient();
    if (!sb) throw new Error('Auth is not configured.');

    rememberRedirect();

    var result = await sb.auth.signInWithPassword({ email: email, password: password });
    if (result.error) throw result.error;

    session = result.data.session;
    renderNavSlot();
    return result.data;
  }

  async function signUpWithPassword(email, password) {
    var sb = getClient();
    if (!sb) throw new Error('Auth is not configured.');

    rememberRedirect();

    var result = await sb.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: loginPageUrl(),
      },
    });

    if (result.error) throw result.error;
    return result.data;
  }

  async function signOut() {
    cancelGoogleOneTap();
    var sb = getClient();
    if (sb) await sb.auth.signOut();
    session = null;
    clearEntitlementQuiet();
    renderNavSlot();
    if (window.location.pathname.indexOf('login') !== -1 || window.location.pathname.indexOf('signup') !== -1) return;
    window.location.reload();
  }

  function detectAuthMode() {
    var page = currentPage();
    if (page === 'signup') return 'signup';
    var params = new URLSearchParams(window.location.search || '');
    if (params.get('mode') === 'signup' || params.get('signup') === '1') return 'signup';
    var attr = document.documentElement.getAttribute('data-xf-auth-mode');
    if (attr === 'signup') return 'signup';
    try {
      if (sessionStorage.getItem('xf-auth-intent') === 'signup') return 'signup';
    } catch (e) {}
    return 'signin';
  }

  function setAuthMode(mode) {
    authMode = mode === 'signup' ? 'signup' : 'signin';

    var heading = document.getElementById('xf-auth-heading');
    var subheading = document.getElementById('xf-auth-subheading');
    var tabSignIn = document.getElementById('xf-auth-tab-signin');
    var tabSignUp = document.getElementById('xf-auth-tab-signup');
    var submit = document.getElementById('xf-auth-password-submit');
    var passwordInput = document.getElementById('xf-auth-password');
    var confirmWrap = document.getElementById('xf-auth-password-confirm');
    var confirmLabel = document.querySelector('label[for="xf-auth-password-confirm"]');

    if (heading) heading.textContent = authMode === 'signup' ? 'Create your account' : 'Sign in to X Freeze';
    if (subheading) {
      if (authMode === 'signup') {
        subheading.textContent = 'Set up email and password to save progress. Free to start.';
      } else if (isProviderEnabled('google') && isProviderEnabled('x')) {
        subheading.textContent = 'Use Google, email and password, or X.';
      } else if (isProviderEnabled('google')) {
        subheading.textContent = 'Use Google, or email and password.';
      } else {
        subheading.textContent = 'Use your email and password.';
      }
    }
    if (tabSignIn) {
      tabSignIn.classList.toggle('is-active', authMode === 'signin');
      tabSignIn.setAttribute('aria-selected', authMode === 'signin' ? 'true' : 'false');
    }
    if (tabSignUp) {
      tabSignUp.classList.toggle('is-active', authMode === 'signup');
      tabSignUp.setAttribute('aria-selected', authMode === 'signup' ? 'true' : 'false');
    }
    if (submit) submit.textContent = authMode === 'signup' ? 'Create account' : 'Sign in';
    if (passwordInput) {
      passwordInput.autocomplete = authMode === 'signup' ? 'new-password' : 'current-password';
      passwordInput.placeholder = authMode === 'signup' ? 'At least 6 characters' : 'Your password';
    }
    if (confirmWrap) {
      confirmWrap.hidden = authMode !== 'signup';
      confirmWrap.required = authMode === 'signup';
      if (authMode !== 'signup') confirmWrap.value = '';
    }
    if (confirmLabel) confirmLabel.hidden = authMode !== 'signup';

    try {
      sessionStorage.setItem('xf-auth-intent', authMode);
    } catch (e) {}
  }

  function bindProviderButton(btn, provider, statusEl) {
    if (!btn) return;

    var enabled = isProviderEnabled(provider);
    var badge = btn.querySelector('.xf-auth-provider-badge');

    btn.disabled = !enabled;
    btn.classList.toggle('is-disabled', !enabled);
    btn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
    var configKey = providerConfigKey(provider);
    btn.title = enabled ? '' : 'Coming soon - configure in Supabase, then set providers.' + configKey + ' = true';

    if (badge) {
      badge.textContent = enabled ? '' : 'Soon';
      badge.hidden = enabled;
    }

    btn.addEventListener('click', async function () {
      if (!enabled) {
        setStatus(statusEl, 'info', 'This sign-in method is coming soon. Use email and password for now.');
        return;
      }

      btn.disabled = true;
      setStatus(statusEl, 'info', provider === 'google' ? 'Redirecting to Google...' : 'Redirecting to X...');

      try {
        await signInWithOAuth(provider);
      } catch (err) {
        setStatus(statusEl, 'error', err.message || 'Sign-in failed.');
        btn.disabled = false;
      }
    });
  }

  function bindLoginPage() {
    var page = document.getElementById('xf-auth-page');
    if (!page) return;

    var twitterBtn = document.getElementById('xf-auth-twitter');
    var passwordForm = document.getElementById('xf-auth-password-form');
    var tabSignIn = document.getElementById('xf-auth-tab-signin');
    var tabSignUp = document.getElementById('xf-auth-tab-signup');
    var statusEl = document.getElementById('xf-auth-status');

    if (!isConfigured()) {
      setStatus(statusEl, 'error', 'Auth is not configured. Edit js/auth-config.js.');
      return;
    }

    if (!window.supabase) {
      setStatus(statusEl, 'error', 'Sign-in library failed to load. Refresh the page.');
      return;
    }

    var googleBtn = document.getElementById('xf-auth-google');
    bindProviderButton(googleBtn, 'google', statusEl);
    bindProviderButton(twitterBtn, 'x', statusEl);

    if (tabSignIn && tabSignIn.tagName === 'BUTTON') {
      tabSignIn.addEventListener('click', function () { setAuthMode('signin'); });
    }
    if (tabSignUp && tabSignUp.tagName === 'BUTTON') {
      tabSignUp.addEventListener('click', function () { setAuthMode('signup'); });
    }

    setAuthMode(detectAuthMode());

    if (passwordForm) {
      passwordForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        var emailInput = document.getElementById('xf-auth-email');
        var passwordInput = document.getElementById('xf-auth-password');
        var confirmInput = document.getElementById('xf-auth-password-confirm');
        var submit = document.getElementById('xf-auth-password-submit');
        var email = emailInput && emailInput.value ? emailInput.value.trim() : '';
        var password = passwordInput ? passwordInput.value : '';
        var confirm = confirmInput ? confirmInput.value : '';

        if (!email) {
          setStatus(statusEl, 'error', 'Enter your email address.');
          return;
        }
        if (!password || password.length < 6) {
          setStatus(statusEl, 'error', 'Password must be at least 6 characters.');
          return;
        }
        if (authMode === 'signup' && confirmInput && password !== confirm) {
          setStatus(statusEl, 'error', 'Passwords do not match.');
          return;
        }

        if (submit) submit.disabled = true;
        setStatus(statusEl, 'info', authMode === 'signup' ? 'Creating account…' : 'Signing in…');

        try {
          if (authMode === 'signup') {
            var data = await signUpWithPassword(email, password);
            if (data.session) {
              session = data.session;
              renderNavSlot();
              finishLogin(statusEl);
              return;
            }
            setStatus(
              statusEl,
              'success',
              'Account created. Check your email to confirm, then sign in.'
            );
            /* Offer a clear path to sign-in after email confirmation */
            window.setTimeout(function () {
              if (!session) {
                setStatus(
                  statusEl,
                  'success',
                  'Account created. Confirm your email if asked, then go to Sign in.'
                );
              }
            }, 50);
          } else {
            await signInWithPassword(email, password);
            finishLogin(statusEl);
          }
        } catch (err) {
          var msg = err.message || 'Something went wrong.';
          if (msg.indexOf('Invalid login credentials') !== -1) {
            msg = 'Wrong email or password. Try again or create an account.';
          }
          if (msg.indexOf('User already registered') !== -1) {
            msg = 'That email already has an account. Sign in instead.';
          }
          setStatus(statusEl, 'error', msg);
        } finally {
          if (submit) submit.disabled = false;
        }
      });
    }
  }

  async function handleLoginCallback() {
    var page = document.getElementById('xf-auth-page');
    if (!page) return;

    var statusEl = document.getElementById('xf-auth-status');
    var sb = getClient();
    if (!sb) {
      setStatus(statusEl, 'error', 'Auth is not configured.');
      return;
    }

    var params = new URLSearchParams(window.location.search || '');
    var oauthError = params.get('error_description') || params.get('error');
    if (oauthError) {
      var decoded = decodeURIComponent(String(oauthError).replace(/\+/g, ' '));
      /* X often fails before return; when it does return an error, surface a fix hint. */
      if (/access_denied|user_cancelled|user canceled/i.test(decoded)) {
        decoded = 'X sign-in was cancelled. Try again, or use Google / email.';
      } else if (/email|users\.email|scope/i.test(decoded)) {
        decoded =
          'X email permission is missing. In the X Developer Portal, turn ON “Request email from users”, then retry.';
      } else if (/redirect|callback|uri/i.test(decoded)) {
        decoded =
          'X callback URL mismatch. Set callback to https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback';
      }
      setStatus(statusEl, 'error', decoded);
      cleanAuthParamsFromUrl();
      return;
    }

    if (session && session.user) {
      finishLogin(statusEl);
      return;
    }

    if (isOAuthCallback()) {
      setStatus(statusEl, 'info', 'Finishing sign-in…');
      await refreshSession();
      if (session && session.user) {
        finishLogin(statusEl);
        return;
      }
      setStatus(statusEl, 'error', 'Sign-in did not complete. Try Google or email again.');
    }
  }

  function loadGoogleIdentityServices(done) {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      done();
      return;
    }
    if (window.__xfGsiLoading) {
      window.__xfGsiLoading.push(done);
      return;
    }
    window.__xfGsiLoading = [done];
    var script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = function () {
      var queue = window.__xfGsiLoading || [];
      window.__xfGsiLoading = null;
      queue.forEach(function (fn) {
        try {
          fn();
        } catch (e) {}
      });
    };
    script.onerror = function () {
      window.__xfGsiLoading = null;
    };
    document.head.appendChild(script);
  }

  /**
   * Supabase expects the raw nonce in signInWithIdToken; Google GIS gets the
   * SHA-256 hex digest (see Supabase Google One Tap docs).
   */
  async function generateGoogleOneTapNonce() {
    if (!window.crypto || !window.crypto.getRandomValues || !window.crypto.subtle) {
      return null;
    }
    var bytes = new Uint8Array(32);
    window.crypto.getRandomValues(bytes);
    var raw = btoa(String.fromCharCode.apply(null, bytes));
    var hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    var hashed = hashArray
      .map(function (b) {
        return ('0' + b.toString(16)).slice(-2);
      })
      .join('');
    return { raw: raw, hashed: hashed };
  }

  function showAuthNotice(type, message, actionHref, actionLabel) {
    var existing = document.getElementById('xf-auth-notice');
    if (existing) existing.remove();
    if (!message) return;

    var el = document.createElement('div');
    el.id = 'xf-auth-notice';
    el.className = 'xf-auth-notice xf-auth-notice--' + (type || 'info');
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');

    var copy = document.createElement('span');
    copy.className = 'xf-auth-notice-text';
    copy.textContent = message;
    el.appendChild(copy);

    if (actionHref && actionLabel) {
      var link = document.createElement('a');
      link.className = 'xf-auth-notice-action';
      link.href = actionHref;
      link.textContent = actionLabel;
      if (actionHref.indexOf('login') !== -1) {
        link.addEventListener('click', function () {
          rememberRedirect();
        });
      }
      el.appendChild(link);
    }

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'xf-auth-notice-close';
    close.setAttribute('aria-label', 'Dismiss');
    close.innerHTML = '&times;';
    close.addEventListener('click', function () {
      el.remove();
    });
    el.appendChild(close);

    document.body.appendChild(el);
    window.requestAnimationFrame(function () {
      el.classList.add('is-visible');
    });

    if (type !== 'error') {
      window.setTimeout(function () {
        if (el.parentNode) {
          el.classList.remove('is-visible');
          window.setTimeout(function () {
            if (el.parentNode) el.remove();
          }, 280);
        }
      }, 4200);
    }
  }

  function friendlyOneTapError(err) {
    var msg = (err && (err.message || err.error_description || err.msg)) || '';
    if (/audience|client.?id|unacceptable/i.test(msg)) {
      return 'Google sign-in is misconfigured (client ID). Use Sign in → Google, or fix Google provider Client IDs in Supabase.';
    }
    if (/nonce/i.test(msg)) {
      return 'Google sign-in failed a security check (nonce). Try Sign in → Google, or enable “Skip nonce check” for Google in Supabase.';
    }
    if (/provider|not enabled|unsupported/i.test(msg)) {
      return 'Google sign-in is not enabled in Supabase yet. Use email or try again later.';
    }
    if (/network|fetch|Failed to fetch/i.test(msg)) {
      return 'Could not reach the sign-in server. Check your connection and try again.';
    }
    return msg || 'Google One Tap failed. Use Sign in → Google instead.';
  }

  async function handleGoogleOneTap(response) {
    if (googleOneTapBusy) return;

    var sb = getClient();
    if (!sb) {
      showAuthNotice('error', 'Auth is not configured.', 'login', 'Sign in');
      return;
    }
    if (!response || !response.credential) {
      showAuthNotice('error', 'Google did not return a credential. Try Sign in → Google.', 'login', 'Sign in');
      return;
    }

    googleOneTapBusy = true;
    showAuthNotice('info', 'Signing you in…');

    try {
      var payload = {
        provider: 'google',
        token: response.credential,
      };
      if (googleOneTapNonce) {
        payload.nonce = googleOneTapNonce;
      }

      var result = await sb.auth.signInWithIdToken(payload);

      /* Retry without nonce if the dashboard has skip_nonce_check / token has no nonce. */
      if (
        result.error &&
        googleOneTapNonce &&
        /nonce/i.test(result.error.message || '')
      ) {
        result = await sb.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        });
      }

      if (result.error) {
        console.warn('[xf-auth] Google One Tap failed', result.error);
        showAuthNotice('error', friendlyOneTapError(result.error), 'login', 'Sign in');
        return;
      }

      session =
        result.data && result.data.session
          ? result.data.session
          : null;

      if (!session || !session.user) {
        await refreshSession();
      }

      if (!session || !session.user) {
        showAuthNotice(
          'error',
          'Google accepted the sign-in, but no session was saved. Try Sign in → Google.',
          'login',
          'Sign in'
        );
        return;
      }

      cancelGoogleOneTap();
      renderNavSlot();
      clearSignInIntent();
      showAuthNotice('success', 'Signed in as ' + (session.user.email || 'you') + '.');

      /* Honor pending redirect (gated resource / deep link). */
      var stored = '';
      try {
        stored = sessionStorage.getItem('xf-auth-redirect') || '';
      } catch (e) {}
      if (stored && stored.indexOf('login') === -1) {
        window.setTimeout(function () {
          window.location.href = redirectAfterLogin();
        }, 250);
      }
    } catch (err) {
      console.warn('[xf-auth] Google One Tap error', err);
      showAuthNotice('error', friendlyOneTapError(err), 'login', 'Sign in');
    } finally {
      googleOneTapBusy = false;
    }
  }

  function cancelGoogleOneTap() {
    try {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.cancel();
      }
    } catch (e) {}
  }

  function maybeShowGoogleOneTap() {
    var c = config();
    if (!c.googleOneTap || !c.googleClientId) return;
    if (!isProviderEnabled('google')) return;
    if (!isConfigured() || !window.supabase) return;
    if (session && session.user) return;
    if (isOAuthCallback()) return;

    /* Avoid stacking prompts on the dedicated login form. */
    if (document.getElementById('xf-auth-page')) return;

    loadGoogleIdentityServices(function () {
      if (session && session.user) return;

      generateGoogleOneTapNonce()
        .then(function (pair) {
          if (session && session.user) return;

          googleOneTapNonce = pair ? pair.raw : null;

          var initOpts = {
            client_id: c.googleClientId,
            callback: handleGoogleOneTap,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: 'signin',
            itp_support: true,
            /* FedCM required as third-party cookies phase out */
            use_fedcm_for_prompt: true,
          };
          if (pair && pair.hashed) {
            initOpts.nonce = pair.hashed;
          }

          try {
            window.google.accounts.id.initialize(initOpts);
            googleOneTapInited = true;
            window.google.accounts.id.prompt();
          } catch (err) {
            console.warn('[xf-auth] One Tap init failed', err);
          }
        })
        .catch(function (err) {
          console.warn('[xf-auth] One Tap nonce failed', err);
          /* Last resort: init without nonce */
          try {
            googleOneTapNonce = null;
            window.google.accounts.id.initialize({
              client_id: c.googleClientId,
              callback: handleGoogleOneTap,
              auto_select: false,
              cancel_on_tap_outside: true,
              context: 'signin',
              itp_support: true,
              use_fedcm_for_prompt: true,
            });
            googleOneTapInited = true;
            window.google.accounts.id.prompt();
          } catch (e2) {
            console.warn('[xf-auth] One Tap init failed', e2);
          }
        });
    });
  }

  async function init() {
    if (!isConfigured()) {
      setPageVisible(true);
      bindLoginPage();
      renderNavSlot();
      return;
    }

    getClient();

    if (isProtectedDestination()) {
      var allowed = await enforceAuth();
      if (!allowed) return;
    } else {
      setPageVisible(true);
    }

    bindLoginPage();
    bindProtectedLinks();
    bindResourceActions();

    var sb = getClient();
    if (!sb) {
      renderNavSlot();
      return;
    }

    sb.auth.onAuthStateChange(function (event, nextSession) {
      session = nextSession;
      renderNavSlot();
      if (event === 'SIGNED_IN' && nextSession && nextSession.user) {
        cancelGoogleOneTap();
        refreshEntitlementQuiet();
      }
      if (
        event === 'SIGNED_IN' &&
        nextSession &&
        nextSession.user &&
        document.getElementById('xf-auth-page') &&
        isOAuthCallback()
      ) {
        finishLogin(document.getElementById('xf-auth-status'));
      }
      if (event === 'SIGNED_OUT') {
        clearEntitlementQuiet();
        window.setTimeout(maybeShowGoogleOneTap, 400);
      }
    });

    await refreshSession();
    if (session && session.user) {
      refreshEntitlementQuiet();
    }

    if (document.getElementById('xf-auth-page')) {
      if (!isOAuthCallback() && session && session.user && !shouldStayOnLoginPage()) {
        window.location.replace(config().defaultRedirect || 'home');
        return;
      }
      await handleLoginCallback();
    } else {
      renderNavSlot();
      if (!(session && session.user)) {
        /* Defer One Tap so it does not compete with hero video decode */
        var oneTapDelay = window.matchMedia('(max-width: 1023px)').matches ? 2200 : 900;
        window.setTimeout(maybeShowGoogleOneTap, oneTapDelay);
      }
    }
  }

  /**
   * Legacy no-op: user_metadata must not grant Pro (users can edit it).
   * Entitlement lives in the server-only `entitlements` table.
   */
  async function syncSubscriptionMetadata() {
    return { ok: false, reason: 'disabled-use-server-entitlements' };
  }

  function refreshEntitlementQuiet() {
    try {
      if (window.XFreezeEntitlement && window.XFreezeEntitlement.refresh) {
        window.XFreezeEntitlement.refresh({ force: true });
      }
    } catch (e) {}
  }

  function clearEntitlementQuiet() {
    try {
      if (window.XFreezeEntitlement && window.XFreezeEntitlement.clear) {
        window.XFreezeEntitlement.clear();
      }
    } catch (e) {}
  }

  window.XFreezeAuth = {
    init: init,
    rememberRedirect: rememberRedirect,
    redirectToLogin: redirectToLogin,
    requireLoginForResource: requireLoginForResource,
    isLoggedIn: isLoggedIn,
    signInWithTwitter: function () { return signInWithOAuth('x'); },
    signInWithGoogle: function () { return signInWithOAuth('google'); },
    signInWithPassword: signInWithPassword,
    signUpWithPassword: signUpWithPassword,
    signOut: signOut,
    getSession: function () { return session; },
    getClient: getClient,
    refreshSession: refreshSession,
    syncSubscriptionMetadata: syncSubscriptionMetadata,
    isConfigured: isConfigured,
    isProviderEnabled: isProviderEnabled,
    showGoogleOneTap: maybeShowGoogleOneTap,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();