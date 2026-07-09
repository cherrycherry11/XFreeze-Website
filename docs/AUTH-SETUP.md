# XFreeze Auth Setup (xfreeze.com)

The site uses [Supabase Auth](https://supabase.com/docs/guides/auth) for sign-in.

**Active methods:**
- Email + password (sign in / create account)
- X / Twitter OAuth (button visible; enable when your X developer app is ready)

---

## Supabase project

Project: `https://ekmllicbgmuodptvgxsl.supabase.co`  
Config: `xfreeze-auth-config.js`

### Enable email + password

**Authentication → Providers → Email**

- Enable Email provider
- Enable **Email + Password** sign-up
- For testing: disable **Confirm email** (re-enable for production)

### Redirect URLs

**Authentication → URL Configuration**

Site URL:
```
https://xfreeze.com
```

Redirect URLs:
```
https://xfreeze.com/xfreeze-login.html
https://www.xfreeze.com/xfreeze-login.html
http://localhost:8765/xfreeze-login.html
```

---

## Enable X sign-in (when ready)

Use **X / Twitter (OAuth 2.0)** in Supabase — not the legacy OAuth 1.0a provider.

### Part A — X Developer Portal

1. Go to [developer.x.com](https://developer.x.com) and sign in
2. **+ Create Project** → name it (e.g. XFreeze), pick a use case, add a short description
3. Create an app inside the project
4. Open the app → **User authentication settings** → **Set up**
5. Configure:
   - **App permissions:** Read (minimum)
   - Turn ON **Request email from users**
   - **Type of app:** Web App
   - **Callback URL:**
     ```
     https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback
     ```
   - **Website URL:** `https://xfreeze.com`
   - **Terms of service URL** and **Privacy policy URL** (required — use your site pages or placeholders)
6. Save, then go to **Keys and tokens**
7. Copy **OAuth 2.0 Client ID** and **Client Secret** (regenerate secret if needed)

### Part B — Supabase Dashboard

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) → your project
2. **Authentication → Providers**
3. Enable **X / Twitter (OAuth 2.0)** — not "Twitter (OAuth 1.0a)"
4. Paste **Client ID** and **Client Secret** from Part A
5. Save

Confirm redirect URLs are set (Step 1 above):
```
https://xfreeze.com/xfreeze-login.html
```

### Part C — Enable the button on your site

Edit `xfreeze-auth-config.js`:

```js
providers: {
  twitter: true,
},
```

Redeploy or refresh — **Continue with X** becomes active.

### Test

1. Open `https://xfreeze.com/xfreeze-login.html`
2. Click **Continue with X**
3. Authorize on X → you should land back on the login page, then redirect home signed in

---

## Test locally

```bash
cd ~/Developer/xfreeze
python3 -m http.server 8765
```

Open `http://localhost:8765/xfreeze-login.html`

1. Create account with email + password
2. Sign out, then sign back in
3. Nav shows **Account** menu when logged in

---

## Files

| File | Purpose |
|------|---------|
| `xfreeze-login.html` | Sign-in page |
| `xfreeze-auth.js` | Auth logic + nav user menu |
| `xfreeze-auth.css` | Login + nav styles |
| `xfreeze-auth-config.js` | Supabase URL, key, provider flags |

---

## Security

- Only the **publishable/anon** key goes in `xfreeze-auth-config.js` — never the **service_role** key
- Use Row Level Security (RLS) on any user data tables you add later