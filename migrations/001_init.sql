create table if not exists inquiries (
  id text primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  business_name text not null,
  email text not null,
  whatsapp text not null,
  service text not null,
  budget text,
  description text not null,
  email_status text not null,
  ip_hash text
);

create index if not exists inquiries_created_at_idx on inquiries (created_at desc);

create table if not exists form_challenges (
  id text primary key,
  created_at timestamptz not null default now(),
  used_at timestamptz
);

create table if not exists rate_events (
  id text primary key,
  ip_hash text not null,
  kind text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_events_lookup_idx on rate_events (ip_hash, kind, created_at);

create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists portfolio_items (
  id text primary key,
  title text not null,
  summary text not null,
  services text not null default '',
  sample boolean not null default true,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id text primary key,
  quote text not null,
  attribution text not null,
  role text not null default '',
  sort_order integer not null default 0,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists service_overrides (
  slug text primary key,
  summary text,
  outcome text,
  intro text,
  updated_at timestamptz not null default now()
);
