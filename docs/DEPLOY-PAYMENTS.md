# Deploy payments + Pro security on xfreeze.com (Vercel)

The live site and payment API run on the **same Vercel project** (`website/`).

> **You must do the Supabase + env steps below** after this code is pushed.
> Without them, checkout will refuse to grant Pro (safe fail) instead of faking access.

---

## A. Supabase tables (5 minutes — do once)

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) → your X Freeze project  
2. **SQL Editor** → New query  
3. Paste **all** of `docs/supabase-entitlements.sql`  
4. Click **Run**  
5. Confirm no errors  

This creates:

- `entitlements` — who is Pro (users can only **read** their row)  
- `payments` — payment ledger (stops double-grants)

---

## B. Vercel environment variables

1. [Vercel Dashboard](https://vercel.com/dashboard) → your **xfreeze** project  
2. **Settings** → **Environment Variables**  
3. Add (Production + Preview):

| Name | Where to get it |
|------|------------------|
| `RAZORPAY_KEY_ID` | Razorpay Dashboard → API Keys |
| `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay → Webhooks → secret (after step C) |
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase → API → `anon` / publishable key (same as site) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API → `service_role` (**secret** — never put in HTML/JS) |
| `SITE_URL` | `https://xfreeze.com` |
| `ALLOWED_ORIGINS` | `https://xfreeze.com,https://www.xfreeze.com` |

4. **Redeploy** Production after saving vars.

---

## C. Razorpay webhook (backup if browser closes mid-checkout)

1. Razorpay Dashboard → **Webhooks** → Add  
2. URL: `https://xfreeze.com/api/webhooks/razorpay`  
3. Active events: **`payment.captured`**  
4. Copy webhook **secret** → set as `RAZORPAY_WEBHOOK_SECRET` in Vercel  
5. Redeploy again if you added the secret after the first deploy  

---

## D. Verify (you can do this yourself)

| URL | Expect |
|-----|--------|
| https://xfreeze.com/api/health | `"razorpay": true` **and** `"entitlements": true` |
| https://xfreeze.com/api/config | `"configured": true`, `"entitlements": true` |
| https://xfreeze.com/data/skills-packs/premium-developer-agent-rules-pack.json | Stub only: `"locked": true`, empty `skills` |

### Security smoke tests

1. **Not signed in** — open a premium skill pack → should not show full skill text.  
2. **DevTools Console** (should NOT unlock Pro content):
   ```js
   localStorage.setItem('xf_subscription', JSON.stringify({
     planId:'pro-yearly', status:'active',
     expiresAt:'2099-01-01', source:'server'
   }));
   ```
   Reload skills → premium pack open should still fail without a real server grant.  
3. **Real pay** (signed in) → Account shows Pro → premium pack loads.

---

## Pricing

Server catalog: **Pro Monthly $49** · **Pro Yearly $499** (USD).

---

## Local development

```bash
cd payment-server && npm start   # localhost:4242 (orders only)
# Full Pro grant + content APIs need Vercel env (or `vercel dev` in website/)
```

Static site on port 8080 uses `http://localhost:4242` for create-order when local.

For full security stack locally, prefer:

```bash
cd website && npx vercel dev
```

---

## What the code now enforces

1. **Server owns Pro** — table only the service role can write after verified payment.  
2. **Premium content is gated** — not downloadable as free static files.  
3. **Success URL cannot fake Pro** — visiting `checkout-success.html?plan=…` does nothing without a server grant.  
4. **CORS** restricted to your domains.

Details: `docs/SECURITY-ENTITLEMENTS.md`
