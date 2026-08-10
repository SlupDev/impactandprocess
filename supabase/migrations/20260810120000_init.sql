-- Refonte impactandprocess.fr — schéma initial.
--
-- Principe : aucun accès direct depuis le navigateur. La RLS est active sur les trois tables
-- et AUCUNE policy n’est créée, donc les rôles `anon` et `authenticated` ne voient rien.
-- Tous les accès passent par les route handlers Next en `service_role`, qui contourne la RLS.

create extension if not exists citext with schema extensions;
create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending', 'paid', 'refunded', 'failed');
  end if;
end
$$;

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------

create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),

  email             extensions.citext not null unique,
  first_name        text,

  -- Consentement newsletter : séparé de la livraison du guide (règle 4).
  newsletter_opt_in boolean not null default false,
  -- Libellé exact affiché au moment du clic, pas seulement un booléen (règle 6).
  consent_text      text not null,
  consent_at        timestamptz not null default now(),

  unsubscribe_token uuid not null unique default gen_random_uuid(),
  unsubscribed_at   timestamptz,

  first_guide_slug  text,

  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_content       text,
  fbclid            text,
  referrer          text,

  -- Jamais d’IP brute en base (règle 22) : SHA-256 salé, en hexadécimal.
  ip_hash           char(64),
  user_agent        text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint leads_email_length check (char_length(email::text) between 3 and 254),
  constraint leads_first_name_length check (first_name is null or char_length(first_name) <= 80),
  constraint leads_ip_hash_hex check (ip_hash is null or ip_hash ~ '^[0-9a-f]{64}$')
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_utm_source_idx on public.leads (utm_source) where utm_source is not null;
create index if not exists leads_newsletter_idx on public.leads (newsletter_opt_in) where unsubscribed_at is null;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- lead_downloads
-- ---------------------------------------------------------------------------

create table if not exists public.lead_downloads (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid not null references public.leads (id) on delete cascade,

  guide_slug     text not null,
  -- Variante kcal pour les guides qui en proposent une ('1800' | '2100').
  variant        text,
  -- Chemin dans le bucket privé `guides`. Jamais exposé au client.
  storage_path   text not null,

  token          text not null unique,
  expires_at     timestamptz not null default (now() + interval '7 days'),
  downloaded_at  timestamptz,
  download_count integer not null default 0,

  created_at     timestamptz not null default now(),

  constraint lead_downloads_variant_check check (variant is null or variant in ('1800', '2100')),
  constraint lead_downloads_token_length check (char_length(token) >= 32),
  constraint lead_downloads_count_positive check (download_count >= 0)
);

create index if not exists lead_downloads_lead_id_idx on public.lead_downloads (lead_id);
create index if not exists lead_downloads_guide_slug_idx on public.lead_downloads (guide_slug);
create index if not exists lead_downloads_expires_at_idx on public.lead_downloads (expires_at);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id                       uuid primary key default gen_random_uuid(),
  lead_id                  uuid references public.leads (id) on delete set null,

  email                    extensions.citext not null,
  product_slug             text not null,

  -- Prix en centimes (convention §6).
  amount_cents             integer not null,
  currency                 char(3) not null default 'eur',
  status                   public.order_status not null default 'pending',

  stripe_session_id        text not null unique,
  stripe_payment_intent_id text unique,

  -- Renonciation expresse au droit de rétractation de 14 jours (contenu numérique livré
  -- immédiatement). On stocke le libellé exact affiché, comme pour le consentement newsletter.
  withdrawal_waived        boolean not null default false,
  withdrawal_waiver_text   text,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),

  constraint orders_amount_positive check (amount_cents > 0),
  constraint orders_waiver_text_present
    check (not withdrawal_waived or withdrawal_waiver_text is not null)
);

create index if not exists orders_lead_id_idx on public.orders (lead_id);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS : activée partout, aucune policy. `anon` et `authenticated` n’ont donc aucun accès.
-- ---------------------------------------------------------------------------

alter table public.leads          enable row level security;
alter table public.lead_downloads enable row level security;
alter table public.orders         enable row level security;

alter table public.leads          force row level security;
alter table public.lead_downloads force row level security;
alter table public.orders         force row level security;

revoke all on public.leads          from anon, authenticated;
revoke all on public.lead_downloads from anon, authenticated;
revoke all on public.orders         from anon, authenticated;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
alter default privileges in schema public revoke all on functions from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage : bucket privé pour les PDF (règle 20).
-- Aucune policy sur storage.objects pour ce bucket : seul `service_role` y accède, et le
-- téléchargement se fait par URL signée de courte durée générée dans /api/download/[token].
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('guides', 'guides', false)
on conflict (id) do update set public = false;
