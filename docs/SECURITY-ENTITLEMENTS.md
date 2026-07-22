# X Freeze — Server entitlements & paywall

This document is the deploy checklist for the security fix that makes **Pro paid content unforgeable from the browser**.

## What changed

| Before | After |
|--------|--------|
| Pro = localStorage / user_metadata | Pro = `entitlements` row (service role write only) |
| `verify-payment` only checked HMAC | Verifies payment + order + amount + user, then **grants** |
| Premium packs/prompts/links in public static files | Served only via `/api/content/*` after Pro check |
| Success page activated Pro from URL | Success page only refreshes server entitlement |
| CORS `*` | Origin allow-list |

## Required env (Vercel Production + Preview)

```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=          # from Razorpay Dashboard → Webhooks
SUPABASE_URL=https://YOUR.supabase.co
SUPABASE_ANON_KEY=                # same as public site anon key
SUPABASE_SERVICE_ROLE_KEY=        # secret — never put in browser
SITE_URL=https://xfreeze.com
ALLOWED_ORIGINS=https://xfreeze.com,https://www.xfreeze.com
```

Optional local `payment-server/.env` may reuse the same names.

## Supabase setup (once)

1. Open Supabase SQL editor.
2. Run `docs/supabase-entitlements.sql`.
3. Confirm RLS is **on** for `entitlements` and `payments`.
4. Confirm there is **no** insert/update policy for `authenticated` on those tables.

## Razorpay webhook

1. Dashboard → **Webhooks** → Add.
2. URL: `https://xfreeze.com/api/webhooks/razorpay`
3. Secret → `RAZORPAY_WEBHOOK_SECRET`
4. Events: at least **`payment.captured`** (and optionally `payment.authorized`).

Webhooks re-grant if the browser closes before `verify-payment` finishes (idempotent on `payment_id`).

## Content lockdown

Run when premium data is updated from source:

```bash
node scripts/secure-premium-content.js
```

- Premium skill packs live in `website/api/_private/skills-packs/`
- Public `data/skills-packs/premium-*.json` are **stubs only**
- Premium prompt bodies → `api/_private/premium-prompts.json`
- Premium template links → `api/_private/premium-templates.json`

`vercel.json` sets `includeFiles: api/_private/**` so serverless functions can read private files.

## API map

| Endpoint | Role |
|----------|------|
| `POST /api/create-order` | Auth required for subscriptions; amount from server catalog; notes include `user_id` |
| `POST /api/verify-payment` | HMAC + Razorpay fetch + amount match + grant entitlement |
| `GET /api/me/entitlement` | Auth; returns `{ isPro, subscription }` |
| `POST /api/webhooks/razorpay` | Signature + grant (backup) |
| `GET /api/content/skill-pack?id=` | Pro + auth for `premium-*` packs |
| `GET /api/content/prompt?id=` | Pro + auth; full prompt text |
| `GET /api/content/template?code=` | Pro + auth; Grok link |
| `GET /api/health` | `{ razorpay, entitlements }` |

## Client rules

- `js/entitlement.js` — only source of Pro UI cache (from server).
- `js/usage.js` — **fails closed**: local Pro without `source:'server'` is ignored.
- `checkout-success` never activates from `?plan=` alone.
- Forging localStorage still cannot load premium pack/prompt/template bytes.

## Verify after deploy

1. `/api/health` → `"razorpay": true`, `"entitlements": true`
2. Signed-out: `curl https://xfreeze.com/data/skills-packs/premium-developer-agent-rules-pack.json` → stub / empty skills
3. Signed-out: open premium template → pricing (no Grok link in page source for premium)
4. Free signed-in user: `/api/content/skill-pack?id=premium-...` with JWT → 403
5. Pay with real Razorpay (or test keys): entitlement row appears; Account shows Pro; pack loads
6. Console `localStorage.setItem('xf_subscription', ...)` → UI may still deny Pro; content APIs still 403

## Honest limits

- **UI gates** can always be faked; **bytes** must stay off the public CDN (done).
- One-time Razorpay orders still mean “paid period” not auto-renew; expiry is server `expires_at`. For true recurring billing, add Razorpay Subscriptions later.
- Free usage counters remain cosmetic (localStorage) unless you add server quotas later.
