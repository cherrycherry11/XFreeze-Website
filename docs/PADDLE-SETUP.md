# Switch X Freeze payments to Paddle

Razorpay checkout is **retired**. Pro is sold through **Paddle Billing** (overlay checkout + webhooks).

## What you must add (Vercel env)

| Variable | Example | Where |
|----------|---------|--------|
| `PADDLE_ENV` | `sandbox` or `production` | Sandbox while testing |
| `PADDLE_CLIENT_TOKEN` | `test_…` or `live_…` | Paddle → Developer tools → Authentication → **Client-side token** |
| `PADDLE_API_KEY` | `pdl_sdbx_apikey_…` | Same page → **API key** (server, secret) |
| `PADDLE_NOTIFICATION_WEBHOOK_SECRET` | `pdl_ntfset_…` | After creating the notification destination |
| `PADDLE_PRICE_PRO_MONTHLY` | `pri_01…` | Catalog → Pro Monthly price ID |
| `PADDLE_PRICE_PRO_YEARLY` | `pri_01…` | Catalog → Pro Yearly price ID |

Keep existing Supabase vars (`SUPABASE_*`, `SITE_URL`, `ALLOWED_ORIGINS`).

## Paddle dashboard checklist

### 1. Catalog (sandbox first)

1. [sandbox-vendors.paddle.com](https://sandbox-vendors.paddle.com) → **Catalog → Products**
2. Create product **X Freeze Pro** (tax category: `Standard` or SaaS if approved)
3. Add prices:
   - **Monthly** — $49 USD, recurring monthly  
   - **Yearly** — $499 USD, recurring yearly  
4. Copy each **Price ID** (`pri_…`) into Vercel

### 2. Client token + API key

**Developer tools → Authentication**

- Create **client-side token** → `PADDLE_CLIENT_TOKEN`
- Create **API key** → `PADDLE_API_KEY`

### 3. Checkout settings

- **Default payment link** (required) — e.g. `https://xfreeze.com` or `https://xfreeze.com/pricing`
- **Website approval** — add `xfreeze.com` (auto in sandbox)

### 4. Webhook destination

**Developer tools → Notifications → New destination**

- URL: `https://xfreeze.com/api/webhooks/paddle`
- Events (minimum):
  - `subscription.created`
  - `subscription.updated`
  - `subscription.canceled`
  - `transaction.completed`
- Copy **endpoint secret** → `PADDLE_NOTIFICATION_WEBHOOK_SECRET`

### 5. Redeploy

After saving env vars → Vercel → **Redeploy** Production.

## Verify

```text
https://xfreeze.com/api/health
```

Expect:

```json
"provider": "paddle",
"paddle": true,
"paddlePrices": true,
"paddleWebhook": true,
"entitlements": true
```

## Test (sandbox)

1. Sign in on xfreeze.com  
2. Pricing → Pro Monthly  
3. Pay with test card `4242 4242 4242 4242`  
4. Webhook grants Pro → Account shows Pro  
5. Premium skills unlock  

## How Pro is granted (secure)

1. Checkout opens with `customData: { user_id, plan_id }`  
2. User pays in Paddle  
3. Webhook verifies `Paddle-Signature`  
4. Server writes `entitlements` (service role only)  
5. Content APIs check that row  

Browser cannot forge Pro.

## Optional cleanup

You may remove old `RAZORPAY_*` env vars from Vercel after confirming Paddle works. They are no longer used for checkout.
