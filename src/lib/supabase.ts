import { createClient } from "@supabase/supabase-js";

// .env.local 파일에서 Supabase 접속 주소와 공개(Publishable) 키를 읽어옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// 앱 전체에서 이 하나의 Supabase 클라이언트만 사용합니다.
// (학습용 프로젝트이므로 브라우저에서 직접 Supabase를 호출하는 단순한 구조를 사용합니다.)
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
