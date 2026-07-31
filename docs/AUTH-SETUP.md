# FreezeStack Auth Setup (freezestack.com)

The site uses [Supabase Auth](https://supabase.com/docs/guides/auth) for sign-in.

**Active methods:**
- Email + password (sign in / create account)
- Google OAuth
- X / Twitter OAuth 2.0

---

## Supabase project

Project: `https://ekmllicbgmuodptvgxsl.supabase.co`  
Config: `website/js/auth-config.js`

### Enable email + password

**Authentication → Providers → Email**

- Enable Email provider
- Enable **Email + Password** sign-up
- For production: decide whether **Confirm email** is required

### Redirect URLs (required)

**Authentication → URL Configuration**

**Site URL:**
```
https://freezestack.com
```

**Redirect URLs** (add every line - OAuth fails if the return host is missing):
```
https://freezestack.com/**
https://freezestack.com/login
https://freezestack.com/signup
https://www.freezestack.com/**
https://www.freezestack.com/login
https://www.freezestack.com/signup
https://xfreeze.com/**
https://xfreeze.com/login
https://www.xfreeze.com/**
http://localhost:8765/**
http://127.0.0.1:8765/**
```

If `https://freezestack.com/login` is missing, Google can start but fail when returning to the site.

---

## Enable X sign-in

Use **X / Twitter (OAuth 2.0)** in Supabase - **not** the legacy “Twitter (OAuth 1.0a)” provider.

### Why you see “Something went wrong” on X

That message is from **x.com**, not FreezeStack. It almost always means the X app or credentials are misconfigured.

**Scopes (code vs portal)**  
- Site code requests: `tweet.read users.read offline.access` (no email in our client options).  
- Supabase may still append `users.email` on the authorize URL. Keep **Request email from users ON** in the X portal so that does not fail.  
- Verified: keep portal email ON even if the site omits email from `scopes`.  

X users without a public email can still sign in, but **checkout requires an email**. They should add one on Account or use Google / email sign-in before buying.

### Part A - X Developer Portal

1. Go to [developer.x.com](https://developer.x.com) and sign in  
2. Open your **Project → App** (or create one)  
3. **User authentication settings → Set up / Edit**  
4. Configure **exactly**:

| Setting | Value |
|--------|--------|
| App permissions | **Read** (minimum) |
| Request email from users | **ON** (keep on; Supabase may still request `users.email` even when our site scopes omit it) |
| Type of App | **Web App** |
| Callback URI / Redirect URL | `https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback` |
| Website URL | `https://freezestack.com` |
| Terms of service | `https://freezestack.com/terms` |
| Privacy policy | `https://freezestack.com/privacy` |

5. Save  
6. **Keys and tokens** → copy **OAuth 2.0 Client ID** and **Client Secret**  
   - Use the **OAuth 2.0** Client ID / Secret  
   - **Do not** paste the API Key / API Secret (those are OAuth 1.0a)

### Part B - Supabase Dashboard

1. [supabase.com/dashboard](https://supabase.com/dashboard) → project `ekmllicbgmuodptvgxsl`  
2. **Authentication → Providers**  
3. Enable **X / Twitter (OAuth 2.0)** only (disable legacy Twitter if both are on)  
4. Paste **Client ID** + **Client Secret** from Part A  
5. Save  
6. Confirm redirect URLs from the section above include `https://freezestack.com/login`

### Part C - Site config

`website/js/auth-config.js`:

```js
providers: {
  x: true,
  google: true,
},
```

### Test

1. Hard-refresh `https://freezestack.com/login`  
2. Click **Continue with X**  
3. X consent screen should appear (not “Something went wrong”)  
4. Authorize → land on `/login` → redirect home signed in  

### Still broken?

| Symptom | Fix |
|--------|-----|
| “Something went wrong” on x.com | Callback URI exact match; OAuth 2.0 Client ID/Secret; email toggle ON |
| X works then “Sign-in did not complete” | Add `https://freezestack.com/login` to Supabase Redirect URLs |
| Wrong keys | Regenerate OAuth 2.0 Client Secret; re-paste into Supabase |
| App in restricted mode | Ensure your X account is an authorized user of the app if Development mode |

---

## Google sign-in

### Part A - Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → Credentials**
2. Open the **OAuth 2.0 Web client** (or create one)
3. **Authorized JavaScript origins** (add all you use):
   ```
   https://freezestack.com
   https://www.freezestack.com
   http://localhost:8765
   ```
4. **Authorized redirect URIs** - must be the Supabase callback (not freezestack.com/login):
   ```
   https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback
   ```
5. Copy **Client ID** and **Client secret**

### Part B - Supabase

1. **Authentication → Providers → Google** → Enable
2. Paste the **same** Client ID + Client secret from Part A
3. Optional: enable **Skip nonce check** if One Tap fails with a nonce error
4. Confirm **URL Configuration** redirect list includes `https://freezestack.com/**` and `/login` (see above)

### Part C - Site config

`website/js/auth-config.js`:

```js
siteUrl: 'https://freezestack.com',
googleClientId: '<same Web Client ID as Supabase>',
googleOneTap: true,
providers: { google: true, x: true },
```

The **Continue with Google** button uses Supabase OAuth (redirect). One Tap uses `googleClientId` on the page - both IDs must match.

### Test

1. Hard-refresh `https://freezestack.com/login`
2. Click **Continue with Google** → Google account picker
3. Approve → return to `/login` → redirect home signed in

### Still broken?

| Symptom | Fix |
|--------|-----|
| Google `redirect_uri_mismatch` | Redirect URI in Google Cloud must be exactly `https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback` |
| Returns to site but "Sign-in did not complete" | Add freezestack.com to Supabase Redirect URLs; allow cookies/storage; close extra tabs |
| One Tap does nothing | Add freezestack.com to Google **JavaScript origins**; try the button instead |
| Client ID error | Supabase Google Client ID = Google Cloud Web client = `googleClientId` in auth-config.js |

---

## Test locally

```bash
cd website
python3 -m http.server 8765
```

Open `http://localhost:8765/login`  
Add the localhost redirect URLs above in Supabase first.

---

## Files

| File | Purpose |
|------|---------|
| `website/login.html` / `signup.html` | Sign-in UI |
| `website/js/auth.js` | Auth logic + OAuth |
| `website/js/auth-config.js` | Supabase URL, key, provider flags |
| `website/css/auth.css` | Login styles |

---

## Security

- Only the **publishable/anon** key goes in `auth-config.js` - never the **service_role** key  
- Use Row Level Security (RLS) on any user data tables  
