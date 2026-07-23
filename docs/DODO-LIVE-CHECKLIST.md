# Dodo live mode — X Freeze checklist

## Done by engineering (code + Vercel + Dodo API)

- [x] Live API key set on Vercel Production (`DODO_PAYMENTS_API_KEY`)
- [x] `DODO_PAYMENTS_ENVIRONMENT=live_mode`
- [x] Live products created:
  - Monthly → `pdt_0NjofZzNUmAj7F2orOfiZ` (**TEMP $1** for smoke tests; retail $49 later)
  - Yearly → `pdt_0Njofa161VEeG8I8Lgrym` (**TEMP $1** for smoke tests; retail $499 later)
- [x] Product IDs on Vercel Production
- [x] Production redeployed; `/api/health` shows `dodoEnv: live_mode`
- [x] Webhook endpoint created → `https://xfreeze.com/api/webhooks/dodo`
- [x] Event filters: payment.succeeded/failed, subscription.active/renewed/updated/cancelled/expired/on_hold/plan_changed
- [x] Webhook signing secret set as `DODO_PAYMENTS_WEBHOOK_KEY` on Vercel Production

## You must do (no API access from here)

1. **Business / payouts** in Dodo live dashboard  
   - Verification complete, bank/payout details correct, tax/GST for FREEZELOOPS LLP  
2. **Confirm payment methods** you need are enabled for live (cards at minimum)  
3. **One real smoke payment** on https://xfreeze.com/pricing  
   - Overlay opens without “Test Mode”  
   - Pay succeeds → Account shows Pro  
   - Premium content unlocks  
   - Receipt/invoice email with tax  
   - Pricing shows “Current plan”  
4. **Rotate the live API key** (it was shared in chat)  
   - Create new key in Dodo → update Vercel → disable old key  
5. Optional: refund the smoke charge in Dodo if it was only a test  

## Verify anytime

```
curl -s https://xfreeze.com/api/health
```

Expect: `"dodoEnv":"live_mode"`, `"configured":true`, `"entitlements":true`.

## Support notes

- Card statement may show Dodo as MoR; product line should say X Freeze Pro…  
- Do not paste secrets into chat; say “key is in Vercel” instead  
