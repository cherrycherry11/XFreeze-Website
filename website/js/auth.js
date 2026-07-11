/**
 * X Freeze auth - email/password + X/Twitter via Supabase
 */
(function () {
  'use strict';

  var client = null;
  var session = null;
  var authMode = 'signin';
  var oauthUrlCache = {};
  var oauthPrefetching = {};

  function config() {
    return window.X FreezeAuthConfig || {};
  }

  function providers() {
    var c = config();
    return c.providers || {};
  }

  function providerConfigKey(name) {
    if (name === 'x') return 'twitter';
    return name;
  }

  function isProviderEnabled(name) {
    return Boolean(providers()[providerConfigKey(name)]);
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
    var c = config();
    if (c.siteUrl) return c.siteUrl.replace(/\/$/, '');
    return window.location.origin;
  }

  function loginUrl() {
    var c = config();
    var path = c.loginPath || 'login.html';
    return siteOrigin() + '/' + path.replace(/^\//, '');
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
    return (config().loginPath || 'login.html') + '?signin=1';
  }

  function shouldStayOnLoginPage() {
    var page = currentPage();
    if (page === 'signup.html') return true;
    if (page !== loginPageName()) return false;
    if (isOAuthCallback()) return true;
    var search = window.location.search || '';
    if (search.indexOf('signin=1') !== -1) return true;
    if (search.indexOf('signup=1') !== -1) return true;
    if (search.indexOf('mode=signup') !== -1 || search.indexOf('mode=signin') !== -1) return true;
    try {
      var intent = sessionStorage.getItem('xf-auth-intent');
      return intent === 'signin' || intent === 'signup';
    } catch (e) {
      return false;
    }
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
    return protectedPages().indexOf(page) !== -1;
  }

  function pageFromHref(href) {
    if (!href || href.indexOf('://') !== -1 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
      return '';
    }
    return href.split('?')[0].split('#')[0].replace(/^\.\//, '');
  }

  function isProtectedHref(href) {
    var page = pageFromHref(href);
    return page ? isProtectedPage(page) : false;
  }

  function redirectToLogin(returnPath) {
    markSignInIntent();
    if (returnPath) {
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

        var href = link.getAttribute('href') || '';
        if (!isProtectedHref(href)) return;

        event.preventDefault();
        event.stopPropagation();
        redirectToLogin(href.replace(/^\.\//, ''));
      },
      true
    );
  }

  function shouldRequireAuth() {
    return isConfigured() && config().requireAuth !== false;
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
    window.location.href = redirectAfterLogin();
  }

  function renderNavSlot() {
    var slot = document.getElementById('xf-auth-nav');
    if (!slot) return;

    if (!isConfigured()) {
      slot.innerHTML =
        '<a href="login.html?signin=1" class="site-nav-auth-btn" title="Auth not configured yet">Sign in</a>' +
        '<a href="signup.html" class="site-nav-auth-btn site-nav-auth-btn--ghost">Sign up</a>';
      return;
    }

    if (!session || !session.user) {
      slot.innerHTML =
        '<a href="login.html?signin=1" class="site-nav-auth-btn" onclick="window.XFreezeAuth && window.XFreezeAuth.rememberRedirect()">Sign in</a>' +
        '<a href="signup.html" class="site-nav-auth-btn site-nav-auth-btn--ghost" onclick="window.XFreezeAuth && window.XFreezeAuth.rememberRedirect()">Sign up</a>';
      return;
    }

    var user = session.user;
    var email = user.email || 'Signed in';
    var avatar = avatarUrl(user);
    var initials = initialsFromUser(user);

    slot.innerHTML =
      '<div class="site-nav-user">' +
      '<button type="button" class="site-nav-user-trigger" id="xf-auth-user-trigger" aria-expanded="false" aria-haspopup="true">' +
      '<span class="site-nav-user-avatar">' +
      (avatar
        ? '<img src="' + escapeHtml(avatar) + '" alt="" referrerpolicy="no-referrer">'
        : escapeHtml(initials)) +
      '</span>' +
      '<span class="hidden sm:inline">Account</span>' +
      '<i class="fa-solid fa-chevron-down text-[10px] opacity-60" aria-hidden="true"></i>' +
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

  async function refreshSession() {
    var sb = getClient();
    if (!sb) {
      session = null;
      renderNavSlot();
      return null;
    }

    var result = await sb.auth.getSession();
    session = result.data.session;
    renderNavSlot();
    return session;
  }

  async function fetchOAuthUrl(provider) {
    var sb = getClient();
    if (!sb) throw new Error('Auth is not configured.');

    if (!isProviderEnabled(provider)) {
      throw new Error('This sign-in method is not enabled yet. Use email and password for now.');
    }

    rememberRedirect();

    var result = await sb.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: loginUrl(),
        skipBrowserRedirect: true,
      },
    });

    if (result.error) throw result.error;
    if (result.data && result.data.url) {
      oauthUrlCache[provider] = result.data.url;
    }
    return result.data;
  }

  function prefetchOAuthUrl(provider) {
    if (!isProviderEnabled(provider) || oauthUrlCache[provider] || oauthPrefetching[provider]) return;
    oauthPrefetching[provider] = true;
    fetchOAuthUrl(provider)
      .catch(function () {})
      .finally(function () {
        oauthPrefetching[provider] = false;
      });
  }

  async function signInWithOAuth(provider) {
    if (oauthUrlCache[provider]) {
      window.location.assign(oauthUrlCache[provider]);
      return { url: oauthUrlCache[provider] };
    }

    var data = await fetchOAuthUrl(provider);
    if (data && data.url) {
      window.location.assign(data.url);
    }
    return data;
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
      subheading.textContent =
        authMode === 'signup'
          ? 'Set up email and password to save progress. Free to start.'
          : 'Use your email and password, or sign in with X.';
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

    btn.addEventListener('mouseenter', function () {
      if (enabled) prefetchOAuthUrl(provider);
    });
    btn.addEventListener('focus', function () {
      if (enabled) prefetchOAuthUrl(provider);
    });

    btn.addEventListener('click', async function () {
      if (!enabled) {
        setStatus(statusEl, 'info', 'This sign-in method is coming soon. Use email and password for now.');
        return;
      }

      btn.disabled = true;
      setStatus(statusEl, 'info', provider === 'google' ? 'Redirecting to Google...' : 'Redirecting to X...');

      if (oauthUrlCache[provider]) {
        window.location.assign(oauthUrlCache[provider]);
        return;
      }

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

    var googleBtn = document.getElementById('xf-auth-google');
    bindProviderButton(googleBtn, 'google', statusEl);
    prefetchOAuthUrl('google');
    bindProviderButton(twitterBtn, 'x', statusEl);
    prefetchOAuthUrl('x');

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
    if (!sb) return;

    await refreshSession();

    if (session && session.user) {
      finishLogin(statusEl);
      return;
    }

    sb.auth.onAuthStateChange(function (event, nextSession) {
      if (event === 'SIGNED_IN' && nextSession) {
        session = nextSession;
        renderNavSlot();
        finishLogin(statusEl);
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
    renderNavSlot();

    var sb = getClient();
    if (!sb) return;

    sb.auth.onAuthStateChange(function (_event, nextSession) {
      session = nextSession;
      renderNavSlot();
    });

    if (!session) {
      await refreshSession();
    }

    if (document.getElementById('xf-auth-page')) {
      if (!isOAuthCallback() && !(session && session.user) && !shouldStayOnLoginPage()) {
        window.location.replace(config().defaultRedirect || 'home.html');
        return;
      }
      await handleLoginCallback();
    }
  }

  window.X FreezeAuth = {
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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();