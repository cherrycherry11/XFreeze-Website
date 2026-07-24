-- X Freeze: server-owned daily usage limits
-- Run in Supabase SQL Editor (service role writes only).
-- Safe to re-run.
--
-- Free:  3 templates / 5 skills / 5 prompts per UTC day
-- Pro:  20 templates / 30 skills / 30 prompts per UTC day
--
-- Counting is unique per resource id within the day (reopening the same
-- template does not burn another unit).

create table if not exists public.usage_daily (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  templates integer not null default 0 check (templates >= 0),
  skills integer not null default 0 check (skills >= 0),
  prompts integer not null default 0 check (prompts >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

-- Unique resource keys used today (template code, skill pack id, prompt id)
alter table public.usage_daily
  add column if not exists template_keys text[] not null default '{}';
alter table public.usage_daily
  add column if not exists skill_keys text[] not null default '{}';
alter table public.usage_daily
  add column if not exists prompt_keys text[] not null default '{}';

create index if not exists usage_daily_day_idx on public.usage_daily (day);

alter table public.usage_daily enable row level security;

drop policy if exists "users_read_own_usage_daily" on public.usage_daily;
create policy "users_read_own_usage_daily"
  on public.usage_daily
  for select
  to authenticated
  using (auth.uid() = user_id);

grant select on public.usage_daily to authenticated;

/**
 * Atomic consume: increments only when resource is new for the day.
 * p_resource_id: optional unique key (template code, pack id, prompt id).
 * When the same id is opened again the same UTC day, returns ok without +1.
 */
create or replace function public.xf_consume_usage(
  p_user_id uuid,
  p_kind text,
  p_limit integer,
  p_resource_id text default null
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
  rid text := nullif(trim(coalesce(p_resource_id, '')), '');
  keys text[];
  already boolean := false;
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
    keys := coalesce(r.template_keys, '{}');
    used := r.templates;
  elsif kind = 'skills' then
    keys := coalesce(r.skill_keys, '{}');
    used := r.skills;
  else
    keys := coalesce(r.prompt_keys, '{}');
    used := r.prompts;
  end if;

  if rid is not null then
    already := rid = any (keys);
  end if;

  /* Same resource again today: allow without burning a unit */
  if already then
    return jsonb_build_object(
      'ok', true,
      'kind', kind,
      'used', used,
      'limit', p_limit,
      'remaining', greatest(p_limit - used, 0),
      'day', d::text,
      'duplicate', true,
      'resource_id', rid
    );
  end if;

  if used >= p_limit then
    return jsonb_build_object(
      'ok', false,
      'code', 'limit_exceeded',
      'kind', kind,
      'used', used,
      'limit', p_limit,
      'day', d::text
    );
  end if;

  if kind = 'templates' then
    update public.usage_daily
      set
        templates = templates + 1,
        template_keys = case
          when rid is null then template_keys
          else array_append(template_keys, rid)
        end,
        updated_at = now()
      where user_id = p_user_id and day = d
      returning templates into used;
  elsif kind = 'skills' then
    update public.usage_daily
      set
        skills = skills + 1,
        skill_keys = case
          when rid is null then skill_keys
          else array_append(skill_keys, rid)
        end,
        updated_at = now()
      where user_id = p_user_id and day = d
      returning skills into used;
  else
    update public.usage_daily
      set
        prompts = prompts + 1,
        prompt_keys = case
          when rid is null then prompt_keys
          else array_append(prompt_keys, rid)
        end,
        updated_at = now()
      where user_id = p_user_id and day = d
      returning prompts into used;
  end if;

  return jsonb_build_object(
    'ok', true,
    'kind', kind,
    'used', used,
    'limit', p_limit,
    'remaining', greatest(p_limit - used, 0),
    'day', d::text,
    'duplicate', false,
    'resource_id', rid
  );
end;
$$;

revoke all on function public.xf_consume_usage(uuid, text, integer) from public;
revoke all on function public.xf_consume_usage(uuid, text, integer, text) from public;
grant execute on function public.xf_consume_usage(uuid, text, integer) to service_role;
grant execute on function public.xf_consume_usage(uuid, text, integer, text) to service_role;
