#!/usr/bin/env node
/**
 * Sync Freezestack subscription catalog to Dodo Payments.
 * Loads env from website/.env.dodo.sync (vercel env pull) or process env.
 *
 * Usage:
 *   node scripts/sync-dodo-products.js
 *   node scripts/sync-dodo-products.js --env-file website/.env.dodo.sync
 */
const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] == null || process.env[key] === '') {
      process.env[key] = val;
    }
  }
}

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const envIdx = args.indexOf('--env-file');
const envFile =
  envIdx >= 0
    ? path.resolve(args[envIdx + 1])
    : path.join(root, 'website', '.env.dodo.sync');

loadEnvFile(envFile);

const {
  dodoEnv,
  dodoApiKey,
  dodoBaseUrl,
  ensureDefaultProducts,
  dodoFetch,
  productMap,
  priceAmount,
  KNOWN_PLAN_IDS,
} = require(path.join(root, 'website', 'api', '_lib', 'dodo.js'));

function cents(n) {
  if (n == null) return '?';
  return `$${(n / 100).toFixed(n % 100 === 0 ? 0 : 2)}`;
}

function envNameForPlan(planId) {
  return {
    'pro-monthly': 'DODO_PRODUCT_PRO_MONTHLY',
    'pro-yearly': 'DODO_PRODUCT_PRO_YEARLY',
    'studio-monthly': 'DODO_PRODUCT_STUDIO_MONTHLY',
    'studio-yearly': 'DODO_PRODUCT_STUDIO_YEARLY',
  }[planId];
}

async function main() {
  if (!dodoApiKey()) {
    console.error('Missing DODO_PAYMENTS_API_KEY. Pull with:');
    console.error(
      '  npx vercel env pull website/.env.dodo.sync --environment=production'
    );
    process.exit(1);
  }

  console.log('Dodo env:', dodoEnv());
  console.log('Base URL:', dodoBaseUrl());
  console.log('Syncing catalog: Premium $49/$499, Premium Plus $109/$999\n');

  const before = await dodoFetch('/products?page_size=100');
  const beforeItems = (before && before.items) || [];
  console.log('Products before:', beforeItems.length);

  const result = await ensureDefaultProducts();

  const after = await dodoFetch('/products?page_size=100');
  const afterItems = (after && after.items) || [];
  const byId = Object.fromEntries(
    afterItems.map((p) => [p.product_id || p.productId, p])
  );

  console.log('\nResult:');
  console.log('  created:', result.created);
  console.log('  priceFixed:', result.priceFixed);
  console.log('\nPlan product IDs:');

  const map = productMap();
  const toSet = [];
  for (const planId of KNOWN_PLAN_IDS) {
    const id = result.ids[planId];
    const p = (id && byId[id]) || result.products[planId];
    const priceAmt = priceAmount(p);
    const envId = map[planId] || '';
    let envOk = 'env-missing';
    if (envId && envId === id) envOk = 'env-ok';
    else if (envId) envOk = 'env-mismatch';
    console.log(
      `  ${planId.padEnd(16)} ${(id || '(none)').padEnd(36)} ${cents(priceAmt).padEnd(8)} [${envOk}]`
    );
    if (!envId && id) {
      toSet.push({ env: envNameForPlan(planId), id });
    }
  }

  if (toSet.length) {
    console.log('\nSet on Vercel (production + preview):');
    for (const row of toSet) {
      console.log(`  ${row.env}=${row.id}`);
    }
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error('Sync failed:', err.message || err);
  if (err.data) console.error(JSON.stringify(err.data, null, 2));
  process.exit(1);
});
