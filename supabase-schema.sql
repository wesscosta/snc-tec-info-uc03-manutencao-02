-- UC03 Arena Técnica v3 - Supabase/PostgreSQL
-- Execute no SQL Editor do Supabase.

create extension if not exists pgcrypto;

create table if not exists public.configuracoes_turma (
  id text primary key default 'uc03_default',
  modo text not null default 'historia' check (modo in ('historia','arena')),
  atividades jsonb not null default '{"diagnostico":true,"anatomia":true,"consultoria":true,"missoes":true}',
  casos_liberados int[] not null default array(select generate_series(1,50)),
  atualizado_em timestamptz not null default now()
);

insert into public.configuracoes_turma (id)
values ('uc03_default')
on conflict (id) do nothing;

create table if not exists public.respostas_diagnostico (
  id uuid primary key default gen_random_uuid(),
  aluno text not null,
  turma text not null,
  caso_id int not null,
  pista_usada int not null check (pista_usada between 1 and 3),
  diagnostico text not null,
  possiveis_causas text not null,
  como_testar text not null,
  pontos_auto int not null default 0,
  criado_em timestamptz not null default now(),
  unique (aluno, turma, caso_id)
);

create table if not exists public.respostas_anatomia (
  id uuid primary key default gen_random_uuid(),
  aluno text not null,
  turma text not null,
  componente_numero int not null,
  nome text not null,
  funcao text not null,
  defeitos text not null,
  sintomas text not null,
  como_testar text not null,
  pontos_auto int not null default 0,
  criado_em timestamptz not null default now(),
  unique (aluno, turma, componente_numero)
);

create table if not exists public.entregas_consultoria_hardware (
  id uuid primary key default gen_random_uuid(),
  aluno text not null,
  turma text not null,
  link_planilha text not null,
  link_canva text not null,
  observacoes text,
  criado_em timestamptz not null default now(),
  unique (aluno, turma)
);

create table if not exists public.pontuacoes_manuais (
  id uuid primary key default gen_random_uuid(),
  aluno text not null,
  turma text not null,
  atividade text not null check (atividade in ('diagnostico','anatomia','consultoria','extra')),
  pontos int not null check (pontos >= 0),
  comentario text,
  criado_em timestamptz not null default now()
);

create or replace view public.ranking_uc03 as
with pontos as (
  select aluno, turma, 'diagnostico'::text atividade, coalesce(sum(pontos_auto),0)::int pontos from public.respostas_diagnostico group by aluno,turma
  union all
  select aluno, turma, 'anatomia', coalesce(sum(pontos_auto),0)::int from public.respostas_anatomia group by aluno,turma
  union all
  select aluno, turma, 'consultoria', 10::int from public.entregas_consultoria_hardware
  union all
  select aluno, turma, atividade, coalesce(sum(pontos),0)::int from public.pontuacoes_manuais group by aluno,turma,atividade
)
select aluno, turma,
  coalesce(sum(pontos) filter (where atividade='diagnostico'),0)::int as diagnostico,
  coalesce(sum(pontos) filter (where atividade='anatomia'),0)::int as anatomia,
  coalesce(sum(pontos) filter (where atividade='consultoria'),0)::int as consultoria,
  coalesce(sum(pontos) filter (where atividade='extra'),0)::int as extra,
  coalesce(sum(pontos),0)::int as total
from pontos
group by aluno,turma
order by total desc, aluno asc;

alter table public.configuracoes_turma enable row level security;
alter table public.respostas_diagnostico enable row level security;
alter table public.respostas_anatomia enable row level security;
alter table public.entregas_consultoria_hardware enable row level security;
alter table public.pontuacoes_manuais enable row level security;

drop policy if exists "read config" on public.configuracoes_turma;
drop policy if exists "write config anon" on public.configuracoes_turma;
create policy "read config" on public.configuracoes_turma for select to anon using (true);
create policy "write config anon" on public.configuracoes_turma for update to anon using (true) with check (true);

drop policy if exists "insert diagnostico" on public.respostas_diagnostico;
drop policy if exists "read diagnostico" on public.respostas_diagnostico;
create policy "insert diagnostico" on public.respostas_diagnostico for insert to anon with check (true);
create policy "read diagnostico" on public.respostas_diagnostico for select to anon using (true);

drop policy if exists "insert anatomia" on public.respostas_anatomia;
drop policy if exists "read anatomia" on public.respostas_anatomia;
create policy "insert anatomia" on public.respostas_anatomia for insert to anon with check (true);
create policy "read anatomia" on public.respostas_anatomia for select to anon using (true);

drop policy if exists "insert consultoria" on public.entregas_consultoria_hardware;
drop policy if exists "read consultoria" on public.entregas_consultoria_hardware;
create policy "insert consultoria" on public.entregas_consultoria_hardware for insert to anon with check (true);
create policy "read consultoria" on public.entregas_consultoria_hardware for select to anon using (true);

drop policy if exists "insert pontuacoes" on public.pontuacoes_manuais;
drop policy if exists "read pontuacoes" on public.pontuacoes_manuais;
create policy "insert pontuacoes" on public.pontuacoes_manuais for insert to anon with check (true);
create policy "read pontuacoes" on public.pontuacoes_manuais for select to anon using (true);
