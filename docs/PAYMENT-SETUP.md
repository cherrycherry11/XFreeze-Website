# XFreeze Payment Setup Guide

This guide explains how to run the checkout system (credit card + PayPal), connect payouts to your **bank account**, and go live.

---

## Architecture overview

```
Customer clicks "Get bundle" or "Buy template"
        ↓
Checkout modal (xfreeze-checkout.js)
        ↓
Payment server (payment-server/server.js on port 4242)
        ↓
Stripe (cards)  or  PayPal
        ↓
Money lands in your Stripe balance / PayPal balance
        ↓
Automatic payouts to your linked bank account
```

**Files involved:**

| File | Purpose |
|------|---------|
| `xfreeze-products.js` | Product catalog & prices |
| `xfreeze-checkout.js` / `.css` | Checkout modal UI |
| `payment-server/server.js` | Secure API (creates Stripe intents, PayPal orders) |
| `xfreeze-checkout-success.html` | Post-payment confirmation |
| `xfreeze-bundles.html` | Bundle "Get bundle" buttons |
| `xfreeze-templates.html` | Template "Buy template" buttons |

---

## Step 1 — Run locally (test mode)

### Terminal 1: Payment API

```bash
cd payment-server
cp .env.example .env
npm install
npm start
```

Server runs at `http://localhost:4242`.

### Terminal 2: Static site

```bash
cd /Users/jeevan/Developer/xfreeze
python3 -m http.server 8080
```

Open `http://localhost:8080/xfreeze-bundles.html` and click **Get bundle**.

> Do **not** open HTML via `file://` — the checkout needs HTTP and the payment API.

---

## Step 2 — Stripe (credit & debit cards)

### 2.1 Create a Stripe account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete business profile (sole proprietor or LLC both work)
3. Stay in **Test mode** while developing (toggle in dashboard header)

### 2.2 Get API keys

1. Dashboard → **Developers** → **API keys**
2. Copy:
   - **Publishable key** → `STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - **Secret key** → `STRIPE_SECRET_KEY` (starts with `sk_test_`)

Add to `payment-server/.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Restart the payment server.

### 2.3 Test a card payment

Use Stripe test cards:

| Card number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |

Any future expiry, any CVC, any ZIP.

### 2.4 Connect your bank account (Stripe payouts)

This is how money from card sales reaches your bank.

1. Dashboard → **Settings** → **Business** → complete identity verification (KYC)
   - Legal name, DOB, address, last 4 of SSN (US) or equivalent ID
2. Dashboard → **Settings** → **Payouts** → **Add bank account**
   - Enter routing number + account number (or use Plaid instant verify)
3. Choose payout schedule:
   - **Daily** (default, 2-day rolling in US) or **Weekly / Monthly**
4. First payout may take **7–14 days** while Stripe verifies your account

**Flow:** Customer pays → funds appear in **Stripe Balance** → Stripe auto-transfers to your bank on schedule (minus ~2.9% + $0.30 per successful US card charge).

### 2.5 Go live with Stripe

1. Toggle dashboard to **Live mode**
2. Replace test keys with live keys (`pk_live_`, `sk_live_`) in production `.env`
3. Complete all activation checklist items (business details, bank, tax form W-9/W-8)
4. Add webhook (recommended):
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `charge.refunded`
   - Secret → `STRIPE_WEBHOOK_SECRET`

---

## Step 3 — PayPal

### 3.1 Create PayPal Business account

1. [https://www.paypal.com/business](https://www.paypal.com/business) — upgrade or create Business account
2. Link a **bank account** under **Wallet** → **Link a bank** (required for withdrawals)

### 3.2 Create developer app

1. [https://developer.paypal.com/dashboard/](https://developer.paypal.com/dashboard/)
2. **Apps & Credentials** → create app (Sandbox first)
3. Copy **Client ID** and **Secret**

Add to `payment-server/.env`:

```env
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox
SITE_URL=http://localhost:8080
```

`SITE_URL` must match where your HTML pages are hosted (used for PayPal return URLs).

### 3.3 Test PayPal (sandbox)

1. Developer dashboard → **Sandbox** → **Accounts**
2. Use the sandbox **Personal** buyer account to pay
3. Click **PayPal** tab in checkout → log in as sandbox buyer

### 3.4 Connect bank & receive PayPal payouts

1. Log into **live** PayPal Business (not sandbox)
2. **Wallet** → link checking/savings account
3. PayPal verifies with 2 small deposits (confirm amounts)
4. By default, balance **auto-transfers to bank daily** (can change under **Money, banks and cards** → **Automatic transfers**)

**Flow:** Customer pays via PayPal → funds in PayPal balance → automatic transfer to linked bank (PayPal fee ~2.99% + fixed fee for US domestic).

### 3.5 Go live with PayPal

1. Create a **Live** app in developer dashboard
2. Set `PAYPAL_MODE=live` and use live Client ID / Secret
3. Set `SITE_URL=https://yourdomain.com` (must be HTTPS in production)

---

## Step 4 — Production deployment

### Option A: Keep static HTML + payment server (simplest)

Deploy static files to **Netlify / Cloudflare Pages / S3**.

Deploy `payment-server` to **Railway, Render, Fly.io, or a VPS**:

```bash
# Example: Render / Railway
Start command: node server.js
Env vars: all keys from .env + SITE_URL=https://xfreeze.ai
```

Update checkout API URL in pages (before going live):

```html
<script>
  XFreezeCheckout.setApiBase('https://api.xfreeze.ai');
</script>
```

Add that snippet after `xfreeze-checkout.js` on bundles and templates pages.

### Option B: Merge into Next.js later

Move API routes to `app/api/checkout/...` and serve HTML from `public/`. Same Stripe/PayPal keys apply.

---

## Step 5 — Security checklist

- [ ] Never put `STRIPE_SECRET_KEY` or `PAYPAL_CLIENT_SECRET` in frontend code
- [ ] Prices validated server-side in `payment-server/products.js` (never trust browser price)
- [ ] Use HTTPS in production
- [ ] Enable Stripe webhooks for fulfillment (send download links after `payment_intent.succeeded`)
- [ ] Store `.env` only on server; add `payment-server/.env` to `.gitignore`

---

## Step 6 — Fulfillment (after payment)

Payments are wired; **digital delivery** is the next step:

1. On successful payment webhook, email customer a secure download link
2. Options: SendGrid/Resend email + signed S3/Cloudflare R2 URL
3. Or use Stripe **Payment Links** + **Customer Portal** for subscription bundles later

---

## Fee & timing summary

| Provider | Typical fee (US) | Time to bank |
|----------|------------------|--------------|
| Stripe (cards) | 2.9% + $0.30 | 2 business days (rolling) |
| PayPal | ~2.99% + $0.49 | 1–3 business days (auto-transfer) |

Both require identity verification before first payout.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Cannot reach payment server" | Run `cd payment-server && npm start` |
| "Stripe is not configured" | Fill keys in `payment-server/.env`, restart |
| PayPal popup blocked | Allow popups for your site |
| CORS errors | Payment server allows all origins in dev; restrict in prod |
| `file://` pages broken | Use `python3 -m http.server 8080` |

---

## Quick reference — `.env` template

```env
PORT=4242
SITE_URL=https://xfreeze.ai

STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=live
```

---

## Support links

- Stripe bank payouts: [https://stripe.com/docs/payouts](https://stripe.com/docs/payouts)
- Stripe Connect (if you ever pay collaborators): [https://stripe.com/docs/connect](https://stripe.com/docs/connect)
- PayPal bank withdrawals: [https://www.paypal.com/us/smarthelp/article/how-do-i-withdraw-money-to-my-bank-account](https://www.paypal.com/us/smarthelp/article/how-do-i-withdraw-money-to-my-bank-account)
- PayPal developer docs: [https://developer.paypal.com/docs/checkout/](https://developer.paypal.com/docs/checkout/)