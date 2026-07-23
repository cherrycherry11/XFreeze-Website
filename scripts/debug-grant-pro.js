/**
 * Debug + repair: grant Pro for a succeeded Dodo payment.
 * Usage (with production env):
 *   npx vercel env run --environment production -- node scripts/debug-grant-pro.js [payment_id]
 */
const paymentId = process.argv[2] || 'pay_0NjndyOCagC8JgMywGo0U';

function env(k) {
  return process.env[k] || '';
}

async function main() {
  const supabaseUrl = env('SUPABASE_URL').replace(/\/$/, '');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = env('SUPABASE_ANON_KEY');
  const dodoKey = env('DODO_PAYMENTS_API_KEY');
  const dodoEnv = env('DODO_PAYMENTS_ENVIRONMENT') || 'test_mode';
  const dodoBase =
    dodoEnv === 'live_mode' || dodoEnv === 'live'
      ? 'https://live.dodopayments.com'
      : 'https://test.dodopayments.com';

  console.log('env check', {
    supabaseUrl: supabaseUrl || '(missing)',
    serviceKeyLen: serviceKey.length,
    anonKeyLen: anonKey.length,
    anonPrefix: anonKey.slice(0, 15),
    dodoKeyLen: dodoKey.length,
    dodoBase,
    paymentId,
  });

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  if (!dodoKey) {
    console.error('Missing DODO_PAYMENTS_API_KEY');
    process.exit(1);
  }

  /* 1) DB tables exist? */
  const entRes = await fetch(`${supabaseUrl}/rest/v1/entitlements?select=user_id&limit=1`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });
  const entText = await entRes.text();
  console.log('entitlements select', entRes.status, entText.slice(0, 300));

  const payRes = await fetch(`${supabaseUrl}/rest/v1/payments?select=payment_id&limit=1`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });
  console.log('payments select', payRes.status, (await payRes.text()).slice(0, 300));

  /* 2) Fetch Dodo payment */
  const dRes = await fetch(`${dodoBase}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${dodoKey}` },
  });
  const payment = await dRes.json();
  console.log('dodo payment', dRes.status, {
    status: payment.status,
    plan: payment.metadata && payment.metadata.plan_id,
    user: payment.metadata && payment.metadata.user_id,
    sub: payment.subscription_id,
  });

  if (!dRes.ok || payment.status !== 'succeeded') {
    console.error('Payment not grantable');
    process.exit(1);
  }

  const userId = payment.metadata && payment.metadata.user_id;
  const planId = (payment.metadata && payment.metadata.plan_id) || 'pro-monthly';
  if (!userId) {
    console.error('No user_id in payment metadata');
    process.exit(1);
  }

  const plan =
    planId === 'pro-yearly'
      ? { id: 'pro-yearly', name: 'Pro Yearly', price: 499, interval: 'year' }
      : { id: 'pro-monthly', name: 'Pro Monthly', price: 49, interval: 'month' };

  const started = new Date();
  const expires = new Date(started);
  if (plan.interval === 'year') expires.setFullYear(expires.getFullYear() + 1);
  else expires.setMonth(expires.getMonth() + 1);

  /* 3) Insert payment ledger */
  const led = await fetch(`${supabaseUrl}/rest/v1/payments`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      payment_id: paymentId,
      order_id: payment.subscription_id || paymentId,
      user_id: userId,
      product_type: 'subscription',
      product_id: plan.id,
      amount_cents: payment.total_amount || 4900,
      currency: 'USD',
      status: 'captured',
      raw: { source: 'debug-grant', status: payment.status },
    }),
  });
  console.log('payments insert', led.status, (await led.text()).slice(0, 400));

  /* 4) Upsert entitlement */
  const payload = {
    user_id: userId,
    plan_id: plan.id,
    plan_name: plan.name,
    interval: plan.interval,
    status: 'active',
    price: plan.price,
    started_at: started.toISOString(),
    expires_at: expires.toISOString(),
    payment_id: paymentId,
    order_id: payment.subscription_id || paymentId,
    amount_cents: payment.total_amount || 4900,
    currency: 'USD',
    updated_at: new Date().toISOString(),
  };

  const up = await fetch(`${supabaseUrl}/rest/v1/entitlements?on_conflict=user_id`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(payload),
  });
  const upText = await up.text();
  console.log('entitlements upsert', up.status, upText.slice(0, 600));

  const check = await fetch(
    `${supabaseUrl}/rest/v1/entitlements?user_id=eq.${userId}&select=*`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    }
  );
  console.log('entitlement row', check.status, (await check.text()).slice(0, 600));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
