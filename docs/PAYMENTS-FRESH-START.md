# Payments — clean slate (keys wiped)

All payment **code**, **Vercel secrets**, and the **Dodo production webhook**
have been removed. Rebuild from zero when ready.

## Deleted from Vercel

- `DODO_PAYMENTS_API_KEY`
- `DODO_PAYMENTS_ENVIRONMENT`
- `DODO_PRODUCT_PRO_MONTHLY` / `DODO_PRODUCT_PRO_YEARLY`
- `DODO_PAYMENTS_WEBHOOK_KEY`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`

## Deleted connections

- Dodo webhook endpoint → `https://xfreeze.com/api/webhooks/dodo` (removed in Dodo live)

## Deleted from repo

- Checkout/create/verify/webhook APIs and provider libs
- `payment-server/`
- Local payment env files / debug grant scripts

## Still on Vercel (not payment)

- Supabase URL / anon / service role
- `SITE_URL`, `ALLOWED_ORIGINS`

## Health

`GET /api/health` → `"payments": false`

## Rebuild later

1. Choose a provider
2. Add new API routes + env vars (new keys only)
3. Wire pricing CTAs
4. Create a new webhook for the new stack

**Do not re-paste old keys into chat.** Rotate any key that was ever shared.
