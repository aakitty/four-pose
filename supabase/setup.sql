-- Four Poses shared feed. Paste this whole file into Supabase → SQL Editor → Run.
create table if not exists public.looks (
  id uuid primary key default gen_random_uuid(),
  nick text not null check (nick ~ '^@[A-Za-z0-9._]{1,20}$'),
  look jsonb not null check (pg_column_size(look) < 2000 and look ? 'template'),
  reports int not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists looks_created_idx on public.looks (created_at desc);

alter table public.looks enable row level security;

-- Anyone can see looks that haven't been hidden by reports.
drop policy if exists "read visible looks" on public.looks;
create policy "read visible looks" on public.looks for select to anon using (hidden = false);

-- Anyone can post a look (design only). They can't edit or delete afterwards.
drop policy if exists "post a look" on public.looks;
create policy "post a look" on public.looks for insert to anon
  with check (reports = 0 and hidden = false);

-- Reporting: 3 reports hide a look for everyone.
create or replace function public.report_look(look_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.looks set reports = reports + 1, hidden = (reports + 1 >= 3) where id = look_id;
$$;
revoke all on function public.report_look(uuid) from public;
grant execute on function public.report_look(uuid) to anon;

-- Simple flood guard: at most 20 looks a minute across the whole app.
create or replace function public.looks_rate_limit() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.looks where created_at > now() - interval '1 minute') >= 20 then
    raise exception 'Too many looks right now, try again in a minute';
  end if;
  return new;
end $$;
drop trigger if exists looks_rate_limit on public.looks;
create trigger looks_rate_limit before insert on public.looks for each row execute function public.looks_rate_limit();
