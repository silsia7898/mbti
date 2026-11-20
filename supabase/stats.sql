-- ============================================================================
-- 몽글 MBTI 전체 유형 통계 조회 함수(get_type_stats) 생성 SQL
-- 같은 SQL을 여러 번 실행해도 오류가 나지 않도록 작성되어 있습니다.
-- ============================================================================

-- 1. 모든 회원의 결과를 유형별로 집계해 유형 코드와 개수만 돌려주는 함수를 만듭니다.
--    개별 기록이나 회원 ID는 절대 밖으로 내보내지 않습니다.
create or replace function public.get_type_stats()
returns table (
  mbti_type text,
  count bigint
)
language sql
-- 이 함수는 데이터를 읽기만 하므로 stable로 지정합니다.
stable
-- RLS 보안 정책을 우회해 집계만 수행하도록 함수 작성자 권한(security definer)으로 실행합니다.
security definer
-- 보안 강화를 위해 search_path를 비워 두고, 아래에서 public.test_results처럼 스키마 이름을 직접 적습니다.
set search_path = ''
as $$
  select
    t.mbti_type,
    count(*)::bigint as count
  from public.test_results as t
  group by t.mbti_type
  order by count(*) desc, t.mbti_type asc;
$$;

-- 2. 기본 public 권한을 회수한 뒤, 비로그인 방문자(anon)와 로그인 회원(authenticated)에게만 실행 권한을 줍니다.
revoke all on function public.get_type_stats() from public;
grant execute on function public.get_type_stats() to anon, authenticated;
