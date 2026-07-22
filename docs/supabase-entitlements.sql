-- X Freeze: server-owned entitlements (run in Supabase SQL editor)
-- Users can READ their own row only. No user INSERT/UPDATE/DELETE.
-- Server uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) after verified payment.

-- 1) Payments ledger (idempotency)
create table if not exists public.payments (
  payment_id text primary key,
  order_id text,
  user_id uuid references auth.users (id) on delete set null,
  product_type text,
  product_id text,
  amount_cents integer,
  currency text default 'USD',
  status text,
  raw jsonb,
  created_at timestamptz not null default now()
);

create index if not exists payments_user_id_idx on public.payments (user_id);

-- 2) Entitlements (one row per user)
create table if not exists public.entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan_id text not null,
  plan_name text,
  interval text,
  status text not null default 'active',
  price numeric,
  started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  payment_id text,
  order_id text,
  amount_cents integer,
  currency text default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists entitlements_status_idx on public.entitlements (status);
create index if not exists entitlements_expires_at_idx on public.entitlements (expires_at);

-- 3) RLS
alter table public.payments enable row level security;
alter table public.entitlements enable row level security;

-- Drop old policies if re-running
drop policy if exists "users_read_own_entitlement" on public.entitlements;
drop policy if exists "users_read_own_payments" on public.payments;

-- Authenticated users: read own entitlement only
create policy "users_read_own_entitlement"
  on public.entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Authenticated users: read own payment rows only (optional UX)
create policy "users_read_own_payments"
  on public.payments
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Intentionally NO insert/update/delete policies for authenticated/anon.
-- Only the service role (server) can write.

grant select on public.entitlements to authenticated;
grant select on public.payments to authenticated;
