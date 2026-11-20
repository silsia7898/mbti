"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 헤더 오른쪽에 표시할 메뉴 (유형 도감 + 로그인 상태에 따라 로그인/내 기록 버튼)
export default function HeaderAuthNav() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // 현재 로그인한 사용자 정보를 가져옵니다.
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.name;
      setUserName(typeof name === "string" && name ? name : data.user ? "회원" : null);
    });

    // 로그인·로그아웃 상태가 바뀔 때마다 헤더를 자동으로 업데이트합니다.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const name = session?.user?.user_metadata?.name;
      setUserName(
        typeof name === "string" && name ? name : session?.user ? "회원" : null
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav aria-label="주 메뉴" className="flex items-center gap-2">
      <Link
        href="/types"
        className="inline-flex items-center rounded-full bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
      >
        유형 도감
      </Link>

      {userName ? (
        <Link
          href="/mypage"
          className="inline-flex items-center rounded-full bg-[#eef9f4] px-3.5 py-2 text-xs font-bold text-[#2f7d64] shadow-sm ring-1 ring-[#bce5d4] transition hover:bg-[#e1f5ec]"
        >
          {userName}님
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-flex items-center rounded-full bg-white/85 px-3.5 py-2 text-xs font-bold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
        >
          로그인
        </Link>
      )}
    </nav>
  );
}
