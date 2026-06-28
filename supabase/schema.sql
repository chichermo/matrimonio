-- Ejecuta en Supabase → SQL Editor (https://supabase.com)

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  author text not null check (char_length(author) between 1 and 50),
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Todos pueden leer mensajes"
  on public.messages for select using (true);

create policy "Todos pueden enviar mensajes"
  on public.messages for insert with check (true);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- Habilitar Realtime: Database → Replication → activar tabla "messages"
