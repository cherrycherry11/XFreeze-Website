# XFreeze Auth Setup (xfreeze.com)

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
https://xfreeze.com
```

**Redirect URLs** (add every line):
```
https://xfreeze.com/**
https://xfreeze.com/login
https://xfreeze.com/signup
https://www.xfreeze.com/**
https://www.xfreeze.com/login
http://localhost:8765/**
http://127.0.0.1:8765/**
```

If `https://xfreeze.com/login` is missing, OAuth can start but fail when returning to the site.

---

## Enable X sign-in

Use **X / Twitter (OAuth 2.0)** in Supabase — **not** the legacy “Twitter (OAuth 1.0a)” provider.

### Why you see “Something went wrong” on X

That message is from **x.com**, not X Freeze. It almost always means the X app or credentials are misconfigured. Supabase always requests the `users.email` scope, so email access must be enabled on the X app.

### Part A — X Developer Portal

1. Go to [developer.x.com](https://developer.x.com) and sign in  
2. Open your **Project → App** (or create one)  
3. **User authentication settings → Set up / Edit**  
4. Configure **exactly**:

| Setting | Value |
|--------|--------|
| App permissions | **Read** (minimum) |
| Request email from users | **ON** (required — Supabase always asks for `users.email`) |
| Type of App | **Web App** |
| Callback URI / Redirect URL | `https://ekmllicbgmuodptvgxsl.supabase.co/auth/v1/callback` |
| Website URL | `https://xfreeze.com` |
| Terms of service | `https://xfreeze.com/terms` |
| Privacy policy | `https://xfreeze.com/privacy` |

5. Save  
6. **Keys and tokens** → copy **OAuth 2.0 Client ID** and **Client Secret**  
   - Use the **OAuth 2.0** Client ID / Secret  
   - **Do not** paste the API Key / API Secret (those are OAuth 1.0a)

### Part B — Supabase Dashboard

1. [supabase.com/dashboard](https://supabase.com/dashboard) → project `ekmllicbgmuodptvgxsl`  
2. **Authentication → Providers**  
3. Enable **X / Twitter (OAuth 2.0)** only (disable legacy Twitter if both are on)  
4. Paste **Client ID** + **Client Secret** from Part A  
5. Save  
6. Confirm redirect URLs from the section above include `https://xfreeze.com/login`

### Part C — Site config

`website/js/auth-config.js`:

```js
providers: {
  x: true,
  google: true,
},
```

### Test

1. Hard-refresh `https://xfreeze.com/login`  
2. Click **Continue with X**  
3. X consent screen should appear (not “Something went wrong”)  
4. Authorize → land on `/login` → redirect home signed in  

### Still broken?

| Symptom | Fix |
|--------|-----|
| “Something went wrong” on x.com | Callback URI exact match; OAuth 2.0 Client ID/Secret; email toggle ON |
| X works then “Sign-in did not complete” | Add `https://xfreeze.com/login` to Supabase Redirect URLs |
| Wrong keys | Regenerate OAuth 2.0 Client Secret; re-paste into Supabase |
| App in restricted mode | Ensure your X account is an authorized user of the app if Development mode |

---

## Google sign-in

Use **Authentication → Providers → Google** with the same Web Client ID as in `auth-config.js` (`googleClientId`).

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

- Only the **publishable/anon** key goes in `auth-config.js` — never the **service_role** key  
- Use Row Level Security (RLS) on any user data tables  
