-- ============================================================================
-- 몽글 MBTI 검사 결과 저장 테이블(test_results) 생성 SQL
-- 같은 SQL을 여러 번 실행해도 오류가 나지 않도록 작성되어 있습니다.
-- ============================================================================

-- 1. 검사 결과를 저장할 test_results 테이블을 만듭니다 (이미 있으면 건너뜁니다).
create table if not exists public.test_results (
  -- 자동으로 1씩 늘어나는 고유 번호이며, 이 테이블의 기본 키(Primary Key)입니다.
  id bigint generated always as identity primary key,

  -- 결과를 저장한 회원의 고유 ID입니다.
  -- auth.users 테이블의 id를 참조하며, 회원이 탈퇴(삭제)되면 검사 결과도 함께 삭제됩니다.
  -- 기본값을 auth.uid()로 두어 앱에서 user_id를 따로 보내지 않아도 로그인한 회원 ID가 자동 저장됩니다.
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,

  -- 검사 결과로 나온 MBTI 유형 코드 4글자입니다.
  -- 첫 글자(E/I), 둘째(S/N), 셋째(T/F), 넷째(J/P) 조합만 들어가도록 검사(CHECK)합니다.
  mbti_type text not null check (mbti_type ~ '^[EI][SN][TF][JP]$'),

  -- 결과가 저장된 날짜와 시각이며, 기본값으로 현재 시각(now())이 들어갑니다.
  created_at timestamptz not null default now()
);

-- 2. 내 검사 기록을 최신순으로 빠르게 조회하기 위한 복합 인덱스를 만듭니다 (이미 있으면 건너뜁니다).
create index if not exists idx_test_results_user_created_at
  on public.test_results (user_id, created_at desc);

-- 3. 테이블 권한(GRANT)을 설정합니다.
-- 로그인하지 않은 방문자(anon)에게는 모든 권한을 회수하여 접근을 막습니다.
revoke all on table public.test_results from anon;

-- 로그인한 회원(authenticated)에게만 조회(select), 저장(insert), 삭제(delete) 권한을 줍니다.
grant select, insert, delete on table public.test_results to authenticated;

-- 4. 행 수준 보안(RLS: Row Level Security)을 켜서 다른 사람의 결과를 보거나 건드리지 못하게 합니다.
alter table public.test_results enable row level security;

-- 5. 기존에 같은 이름의 보안 정책이 있다면 먼저 지웁니다 (두 번 실행해도 오류 방지).
drop policy if exists "test_results_select_own" on public.test_results;
drop policy if exists "test_results_insert_own" on public.test_results;
drop policy if exists "test_results_delete_own" on public.test_results;

-- [정책 1] 로그인한 회원은 본인의 검사 결과만 조회(SELECT)할 수 있습니다.
create policy "test_results_select_own"
  on public.test_results
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- [정책 2] 로그인한 회원은 본인의 user_id로만 결과를 저장(INSERT)할 수 있습니다.
create policy "test_results_insert_own"
  on public.test_results
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- [정책 3] 로그인한 회원은 본인의 검사 결과만 삭제(DELETE)할 수 있습니다.
create policy "test_results_delete_own"
  on public.test_results
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
