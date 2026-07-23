# Payments — clean slate

All previous payment providers (Razorpay, Paddle, Dodo), checkout APIs,
webhooks, and client checkout UI have been **removed** so you can re-integrate
from zero.

## What is gone

- `api/create-checkout.js`, `api/verify-payment.js`, `api/webhooks/*`
- `api/_lib/dodo.js`, `paddle.js`, `razorpay-client.js`
- Active checkout JS (stub only remains: `js/checkout.js`)
- `pay-demo.html`, provider-specific setup docs

## What remains (not a payment provider)

- Auth (Supabase)
- Optional `entitlements` table + `GET /api/me/entitlement` (read-only Pro status)
- Pricing page **display** of Free / $49 / $499 (buttons offline)
- Gated content APIs (still require Pro entitlement if you grant it manually)

## Health check

`GET /api/health` → `"payments": false`, `"configured": false`

## When you rebuild

1. Pick one provider
2. Add create-session + webhook + verify APIs
3. Wire pricing CTAs again
4. Set Vercel secrets for that provider only
5. Do not re-use old Dodo/Razorpay/Paddle env vars unless intentional

## Vercel env (you can delete unused)

You may remove from Production when ready:

- `DODO_*`
- `RAZORPAY_*`
- `PADDLE_*` (if any)

Keep Supabase + `SITE_URL` + `ALLOWED_ORIGINS`.
