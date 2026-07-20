# Deploy payments on xfreeze.com (Vercel)

The live site and payment API run on the **same Vercel project** (`website/`).

## 1. Add Razorpay keys in Vercel

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your **xfreeze** project  
2. **Settings** → **Environment Variables**  
3. Add:

| Name | Value |
|------|--------|
| `RAZORPAY_KEY_ID` | `rzp_live_…` (or test key) |
| `RAZORPAY_KEY_SECRET` | your secret |
| `SITE_URL` | `https://xfreeze.com` |

Apply to **Production** (and Preview if you want).

4. **Redeploy** the project (Deployments → ⋮ → Redeploy)

## 2. Verify

Open these in a browser:

- https://xfreeze.com/api/health  
  → should show `"razorpay": true`

- https://xfreeze.com/api/config  
  → should show `"configured": true`

## 3. Test checkout

1. https://xfreeze.com/pricing.html  
2. **Start monthly** ($1 test) or **yearly** ($9 test)  
3. Complete Razorpay (live keys = real charges)

## Local development

```bash
cd payment-server
npm start   # still uses localhost:4242
```

Static site on port 8080 keeps using `http://localhost:4242` automatically.
