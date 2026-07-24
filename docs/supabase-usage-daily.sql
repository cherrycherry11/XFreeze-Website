-- X Freeze: server-owned daily usage limits
-- Run once in Supabase SQL Editor (service role writes only).
--
-- Free:  3 templates / 5 skills / 5 prompts per UTC day
-- Pro:  20 templates / 30 skills / 30 prompts per UTC day

create table if not exists public.usage_daily (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  templates integer not null default 0 check (templates >= 0),
  skills integer not null default 0 check (skills >= 0),
  prompts integer not null default 0 check (prompts >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

create index if not exists usage_daily_day_idx on public.usage_daily (day);

alter table public.usage_daily enable row level security;

drop policy if exists "users_read_own_usage_daily" on public.usage_daily;
create policy "users_read_own_usage_daily"
  on public.usage_daily
  for select
  to authenticated
  using (auth.uid() = user_id);

-- No insert/update/delete for authenticated — service role only.
grant select on public.usage_daily to authenticated;

/**
 * Atomic consume: increments one counter if under limit.
 * Called by API with service role (security definer).
 */
create or replace function public.xf_consume_usage(
  p_user_id uuid,
  p_kind text,
  p_limit integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  d date := (timezone('utc', now()))::date;
  r public.usage_daily%rowtype;
  used integer;
  kind text := lower(trim(p_kind));
begin
  if p_user_id is null then
    return jsonb_build_object('ok', false, 'code', 'user_required');
  end if;
  if kind not in ('templates', 'skills', 'prompts') then
    return jsonb_build_object('ok', false, 'code', 'invalid_kind');
  end if;
  if p_limit is null or p_limit < 0 then
    return jsonb_build_object('ok', false, 'code', 'invalid_limit');
  end if;

  insert into public.usage_daily (user_id, day)
  values (p_user_id, d)
  on conflict (user_id, day) do nothing;

  select * into r
  from public.usage_daily
  where user_id = p_user_id and day = d
  for update;

  if kind = 'templates' then
    if r.templates >= p_limit then
      return jsonb_build_object(
        'ok', false,
        'code', 'limit_exceeded',
        'kind', kind,
        'used', r.templates,
        'limit', p_limit,
        'day', d::text
      );
    end if;
    update public.usage_daily
      set templates = templates + 1, updated_at = now()
      where user_id = p_user_id and day = d
      returning templates into used;
  elsif kind = 'skills' then
    if r.skills >= p_limit then
      return jsonb_build_object(
        'ok', false,
        'code', 'limit_exceeded',
        'kind', kind,
        'used', r.skills,
        'limit', p_limit,
        'day', d::text
      );
    end if;
    update public.usage_daily
      set skills = skills + 1, updated_at = now()
      where user_id = p_user_id and day = d
      returning skills into used;
  else
    if r.prompts >= p_limit then
      return jsonb_build_object(
        'ok', false,
        'code', 'limit_exceeded',
        'kind', kind,
        'used', r.prompts,
        'limit', p_limit,
        'day', d::text
      );
    end if;
    update public.usage_daily
      set prompts = prompts + 1, updated_at = now()
      where user_id = p_user_id and day = d
      returning prompts into used;
  end if;

  return jsonb_build_object(
    'ok', true,
    'kind', kind,
    'used', used,
    'limit', p_limit,
    'remaining', greatest(p_limit - used, 0),
    'day', d::text
  );
end;
$$;

revoke all on function public.xf_consume_usage(uuid, text, integer) from public;
grant execute on function public.xf_consume_usage(uuid, text, integer) to service_role;
