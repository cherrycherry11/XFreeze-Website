# Paddle sandbox → live migration status (X Freeze)

**Date audited:** 2026-07-23  
**Scope:** Ready live account + code — **does not** start Paddle business verification or take a live payment.

---

## 1. Audit summary

### Blocker for automated catalog migration

`paddle-sandbox` and `paddle-live` **MCP servers are not connected** to this Grok session (only GitHub / Gmail / Calendar / Tasks appear). Without them, **products/prices cannot be listed or created via API from here**.

### Credentials (Vercel Production)

| Item | Status |
|------|--------|
| `PADDLE_CLIENT_TOKEN` (`live_…`) | **Missing** |
| `PADDLE_API_KEY` (`pdl_live_…`) | **Missing** |
| `PADDLE_PRICE_PRO_MONTHLY` (`pri_…`) | **Missing** |
| `PADDLE_PRICE_PRO_YEARLY` (`pri_…`) | **Missing** |
| `PADDLE_NOTIFICATION_WEBHOOK_SECRET` | **Missing** |
| `PADDLE_ENV` | Not set (code defaults/infers) |
| Supabase entitlements | **OK** (`entitlements: true`) |
| Razorpay keys | Still present (unused for checkout) |

Live health: `"paddle": false`, `"configured": false`.

### Catalog (sandbox vs live)

| Item | Status |
|------|--------|
| Sandbox products/prices inventory | **Unknown here** (no MCP / no sandbox key in env) |
| Live catalog equivalents | **Unknown here** |
| Sandbox → live `pri_` map | **Not available until you provide IDs or connect MCP** |

### Code (repo)

| Item | Status |
|------|--------|
| Checkout uses Paddle overlay | **Done** |
| Price IDs from env (not hard-coded) | **Done** |
| Webhook grant → entitlements | **Done** |
| `Environment.set('sandbox')` only when sandbox | **Done** (live = default) |
| `pwCustomer: { id: 'ctm_…' }` for Retain | **Done** (when known) |
| No hard-coded `pri_` in app | **Done** |
| Webhook IP allowlist (optional) | **Done** (`PADDLE_WEBHOOK_IP_ALLOWLIST=true`) |

---

## 2. What you must do (dashboard / secrets)

### A. Live catalog (if not already created)

1. Open **live** dashboard: https://vendors.paddle.com  
2. Catalog → create product **X Freeze Pro** (or match sandbox name)  
3. Prices (recurring USD):
   - Monthly **$49** → copy `pri_…`  
   - Yearly **$499** → copy `pri_…`  
4. Skip junk/test products  

**Do not delete** existing live prices that may have subscriptions.

### B. Live credentials

| Env var | Source |
|---------|--------|
| `PADDLE_ENV` | `production` |
| `PADDLE_CLIENT_TOKEN` | Developer tools → Authentication → **Client-side token** (`live_…`) |
| `PADDLE_API_KEY` | Same page → **API key** (`pdl_live_…`) — create in dashboard |
| `PADDLE_PRICE_PRO_MONTHLY` | Live monthly `pri_…` |
| `PADDLE_PRICE_PRO_YEARLY` | Live yearly `pri_…` |
| `PADDLE_NOTIFICATION_WEBHOOK_SECRET` | See C |

Add in Vercel → Production (and Preview if needed) → **Redeploy**.

### C. Live notification destination (additive only)

1. Developer tools → **Notifications**  
2. If a destination already points at  
   `https://xfreeze.com/api/webhooks/paddle`  
   → **reuse it** (do not recreate; that rotates the secret).  
3. If **none** exists → create one:
   - URL: `https://xfreeze.com/api/webhooks/paddle`  
   - Events: `subscription.created`, `subscription.updated`, `subscription.canceled`, `transaction.completed`  
   - Copy **endpoint secret** once → `PADDLE_NOTIFICATION_WEBHOOK_SECRET`

### D. Live checkout account settings (dashboard only)

| Setting | Where |
|---------|--------|
| Default payment link | Checkout → Checkout settings → set to `https://xfreeze.com/pricing` (or `/home`) — **real domain, not localhost** |
| Domain approval | Checkout → Request domain approval → submit **xfreeze.com** (and `www` if used) |
| Payment methods | Checkout → Checkout settings → Payment methods |
| Bank / payouts | Business account → Payouts → Payout settings |

### E. Optional hardening

```text
PADDLE_WEBHOOK_IP_ALLOWLIST=true
```

Fetches live IPs from `https://api.paddle.com/ips` (never hard-coded). Enable **after** webhooks work; can block dashboard simulators if on.

### F. Optional DB column (Retain)

```sql
alter table public.entitlements
  add column if not exists paddle_customer_id text;
```

---

## 3. Pre-verification readiness (site)

| Check | Result |
|-------|--------|
| Terms | https://xfreeze.com/terms → **200** |
| Privacy | https://xfreeze.com/privacy → **200** |
| Refunds | https://xfreeze.com/refund → **200** |
| Contact | https://xfreeze.com/contact → **200** (reachable from nav) |
| About / product description | https://xfreeze.com/about → **200** |
| Pricing vs catalog | Site shows **$49 / mo** and **$499 / yr** — live Paddle prices must match |
| Domain for checkout | https://xfreeze.com → **200** (not parked) |
| Webhook route | POST only (`GET` → 405) — expected |

**Do not** send live traffic to customers until:

1. Business verification passes  
2. Domain approved  
3. Live checkout tested by you in a controlled way  

---

## 4. How to unblock full automated migration next time

Either:

1. Connect **paddle-sandbox** + **paddle-live** MCP servers to Grok Build, then re-run this prompt, **or**  
2. Paste into Vercel the six env values above (no need to paste secrets in chat) and reply **`live env done`**.

---

## Guardrails honored

- No live entities deleted/archived  
- No sandbox cleanup  
- Secrets only via env vars  
- Migration additive + code-side only  
