-- Contact form submissions. Run once in the Supabase SQL editor.

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 100),
  email         text not null check (char_length(email) <= 254),
  message       text not null check (char_length(message) between 10 and 5000),
  email_status  text not null default 'pending'
                check (email_status in ('pending', 'sent', 'failed'))
);

-- Row-level security on, with no policies: public (anon) clients can't read
-- or write. The server uses the secret key, which bypasses RLS.
alter table public.contact_submissions enable row level security;

-- New tables aren't exposed to the Data API automatically in this project, so
-- grant only the server role (used by the secret key) what the API route needs.
grant select, insert, update on table public.contact_submissions to service_role;
