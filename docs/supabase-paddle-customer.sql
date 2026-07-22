-- Optional: store Paddle customer id for Retain (pwCustomer)
alter table public.entitlements
  add column if not exists paddle_customer_id text;

create index if not exists entitlements_paddle_customer_id_idx
  on public.entitlements (paddle_customer_id);
