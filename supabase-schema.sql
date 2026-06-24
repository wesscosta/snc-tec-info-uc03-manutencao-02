-- Execute no Supabase: SQL Editor > New query > Run.

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_name text not null,
  class_name text not null,
  case_id int not null,
  case_title text not null,
  clues_used int not null,
  rescue_mode boolean not null default false,
  diagnosis text not null,
  causes text not null,
  verification text not null,
  score int not null check (score >= 0 and score <= 10),
  unique(student_name, class_name, case_id)
);

alter table public.submissions enable row level security;

drop policy if exists "students can insert submissions" on public.submissions;
create policy "students can insert submissions"
on public.submissions for insert
to anon
with check (true);

drop policy if exists "students can update own named submissions" on public.submissions;
create policy "students can update own named submissions"
on public.submissions for update
to anon
using (true)
with check (true);

drop policy if exists "public can read submissions" on public.submissions;
create policy "public can read submissions"
on public.submissions for select
to anon
using (true);

create or replace view public.leaderboard as
select
  student_name,
  class_name,
  sum(score)::int as total_score,
  count(*)::int as cases_answered,
  max(created_at) as last_submission
from public.submissions
group by student_name, class_name
order by total_score desc, cases_answered desc, last_submission asc;
