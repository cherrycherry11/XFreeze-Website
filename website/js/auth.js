/**
 * X Freeze auth - email/password + X/Twitter via Supabase
 */
(function () {
  'use strict';

  var client = null;
  var session = null;
  var authMode = 'signin';

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
    var path = c.loginPath || 'login.html';
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

    return c.defaultRedirect || 'home.html';
  }

  function currentPage() {
    var page = (window.location.pathname.split('/').pop() || '').split('?')[0];
    if (!page || page === 'index.html') return 'home.html';
    return page;
  }

  function loginPageName() {
    var path = config().loginPath || 'login.html';
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
    return config().loginPath || 'login.html';
  }

  function shouldStayOnLoginPage() {
    var page = currentPage();
    /* Always allow the login + signup pages to render */
    if (page === 'signup.html' || page === loginPageName()) return true;
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
    return c.publicPages || ['login.html', 'signup.html', 'home.html'];
  }

  function protectedPages() {
    var c = config();
    return (
      c.protectedPages || [
        'templates.html',
        'skills.html',
        'bundles.html',
                'contact.html',
        'connector-setup.html',
      ]
    );
  }

  function isPublicPage() {
    return publicPages().indexOf(currentPage()) !== -1;
  }

  function isProtectedPage(page) {
    if (!page) return false;
    if (publicPages().indexOf(page) !== -1) return false;
    if (page === loginPageName()) return false;
    /* Any non-public page is gated when auth is required. */
    if (protectedPages().indexOf(page) !== -1) return true;
    return true;
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
   * Logged-out users: any internal navigation or in-page jump goes to login
   * (no smooth-scroll to sections - open login instead).
   */
  function shouldGateHref(href) {
    if (!href || href === '#' || href.indexOf('javascript:') === 0) return false;
    if (isExternalHref(href)) return false;

    /* In-page anchors (#skills, #section-...) - do not scroll, send to login */
    if (href.charAt(0) === '#') return true;

    var page = pageFromHref(href);
    if (!page) return false;
    if (page === loginPageName() || page === 'signup.html') return false;
    if (publicPages().indexOf(page) !== -1) return false;
    return true;
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

  function bindProtectedLinks() {
    if (!shouldRequireAuth()) return;

    document.addEventListener(
      'click',
      function (event) {
        if (session && session.user) return;

        var link = event.target.closest('a[href]');
        if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

        var href = (link.getAttribute('href') || '').trim();
        if (!shouldGateHref(href)) return;

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }

        var returnPath = href.charAt(0) === '#' ? currentPage() : href.replace(/^\.\//, '');
        redirectToLogin(returnPath);
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
    if (!shouldRequireAuth() || isPublicPage()) {
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
    /* Gate every page that is not explicitly public. */
    return shouldRequireAuth() && !isPublicPage();
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
      '<a href="login.html" class="site-nav-auth-btn" onclick="window.XFreezeAuth && window.XFreezeAuth.rememberRedirect()">Sign in</a>';
    var signedOutDrawer =
      '<a href="login.html" class="site-nav-drawer-auth-btn" onclick="toggleMobileMenu && toggleMobileMenu()">Sign in</a>' +
      '<a href="signup.html" class="site-nav-drawer-auth-btn site-nav-drawer-auth-btn--ghost" onclick="toggleMobileMenu && toggleMobileMenu()">Create account</a>';

    if (!slot && !document.getElementById('xf-auth-drawer')) return;

    if (!isConfigured() || !session || !session.user) {
      if (slot) slot.innerHTML = signedOutNav;
      renderDrawerAuth(null, signedOutDrawer);
      return;
    }

    var user = session.user;
    var email = user.email || 'Signed in';
    var avatar = avatarUrl(user);
    var initials = initialsFromUser(user);

    if (slot) {
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
        '<button type="button" id="xf-auth-sign-out"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Sign out</button>' +
        '</div>' +
        '</div>';

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

    renderDrawerAuth(
      '<button type="button" class="site-nav-drawer-auth-btn" id="xf-auth-drawer-sign-out">' +
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

    var result = await sb.auth.signInWithOAuth({
      provider: supabaseProviderName(provider),
      options: {
        redirectTo: loginUrl(),
        skipBrowserRedirect: true,
      },
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
    renderNavSlot();
    if (window.location.pathname.indexOf('login') !== -1 || window.location.pathname.indexOf('signup') !== -1) return;
    window.location.reload();
  }

  function detectAuthMode() {
    var page = currentPage();
    if (page === 'signup.html') return 'signup';
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
      setStatus(statusEl, 'error', decodeURIComponent(oauthError.replace(/\+/g, ' ')));
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

  async function handleGoogleOneTap(response) {
    var sb = getClient();
    if (!sb || !response || !response.credential) return;

    try {
      var result = await sb.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });
      if (result.error) {
        console.warn('[xf-auth] Google One Tap failed', result.error);
        return;
      }
      session = result.data.session;
      renderNavSlot();
      cancelGoogleOneTap();
    } catch (err) {
      console.warn('[xf-auth] Google One Tap error', err);
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
      try {
        window.google.accounts.id.initialize({
          client_id: c.googleClientId,
          callback: handleGoogleOneTap,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin',
          itp_support: true,
          use_fedcm_for_prompt: true,
        });
        window.google.accounts.id.prompt(function (notification) {
          if (!notification) return;
          /* Fallback if FedCM / One Tap is suppressed */
          try {
            if (
              notification.isNotDisplayed &&
              notification.isNotDisplayed() &&
              notification.getNotDisplayedReason &&
              notification.getNotDisplayedReason() === 'suppressed_by_user'
            ) {
              return;
            }
          } catch (e) {}
        });
      } catch (err) {
        console.warn('[xf-auth] One Tap init failed', err);
      }
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
        window.setTimeout(maybeShowGoogleOneTap, 400);
      }
    });

    await refreshSession();

    if (document.getElementById('xf-auth-page')) {
      if (!isOAuthCallback() && session && session.user && !shouldStayOnLoginPage()) {
        window.location.replace(config().defaultRedirect || 'home.html');
        return;
      }
      await handleLoginCallback();
    } else {
      renderNavSlot();
      if (!(session && session.user)) {
        window.setTimeout(maybeShowGoogleOneTap, 600);
      }
    }
  }

  window.XFreezeAuth = {
    init: init,
    rememberRedirect: rememberRedirect,
    signInWithTwitter: function () { return signInWithOAuth('x'); },
    signInWithGoogle: function () { return signInWithOAuth('google'); },
    signInWithPassword: signInWithPassword,
    signUpWithPassword: signUpWithPassword,
    signOut: signOut,
    getSession: function () { return session; },
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