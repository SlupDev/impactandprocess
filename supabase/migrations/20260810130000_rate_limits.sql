-- Rate limit des endpoints publics (règle 8). Jamais d’IP brute : uniquement le hash salé.

create table if not exists public.rate_limits (
  id         bigint generated always as identity primary key,
  bucket     text not null,
  ip_hash    char(64) not null,
  created_at timestamptz not null default now(),

  constraint rate_limits_ip_hash_hex check (ip_hash ~ '^[0-9a-f]{64}$')
);

create index if not exists rate_limits_lookup_idx
  on public.rate_limits (bucket, ip_hash, created_at desc);

alter table public.rate_limits enable row level security;
alter table public.rate_limits force row level security;
revoke all on public.rate_limits from anon, authenticated;

/*
  Compte les tentatives de la fenêtre et enregistre celle-ci, en une seule aller-retour.
  Renvoie le nombre de tentatives restantes après celle-ci, ou -1 si la limite est atteinte
  (dans ce cas rien n’est enregistré, pour qu’un bot ne repousse pas indéfiniment sa fenêtre).
*/
create or replace function public.consume_rate_limit(
  p_bucket  text,
  p_ip_hash char(64),
  p_limit   integer,
  p_window  interval
)
returns integer
language plpgsql
security definer
set search_path = public, pg_catalog
as $$
declare
  used integer;
begin
  delete from public.rate_limits
   where created_at < now() - greatest(p_window, interval '1 day');

  select count(*) into used
    from public.rate_limits
   where bucket = p_bucket
     and ip_hash = p_ip_hash
     and created_at > now() - p_window;

  if used >= p_limit then
    return -1;
  end if;

  insert into public.rate_limits (bucket, ip_hash) values (p_bucket, p_ip_hash);
  return p_limit - used - 1;
end;
$$;

revoke all on function public.consume_rate_limit(text, char, integer, interval) from public, anon, authenticated;
