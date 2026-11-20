"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

// 헤더 오른쪽에 표시할 메뉴 (375px 휴대폰 화면에서도 한 줄에 깔끔하게 들어가도록 구성)
export default function HeaderAuthNav() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // 로그아웃 처리 후 홈으로 이동
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav aria-label="주 메뉴" className="flex shrink-0 items-center gap-1">
      <Link
        href="/types"
        className="inline-flex whitespace-nowrap items-center rounded-full bg-white/85 px-2 py-1.5 text-[11px] font-semibold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
      >
        유형 도감
      </Link>
      <Link
        href="/stats"
        className="inline-flex whitespace-nowrap items-center rounded-full bg-white/85 px-2 py-1.5 text-[11px] font-semibold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
      >
        통계
      </Link>

      {/* 로그인 상태를 확인하는 짧은 순간에는 자리를 비워 두어 메뉴 깜빡임을 방지합니다. */}
      {!loading &&
        (user ? (
          <>
            <Link
              href="/mypage"
              className="inline-flex whitespace-nowrap items-center rounded-full bg-[#eef9f4] px-2 py-1.5 text-[11px] font-bold text-[#2f7d64] shadow-sm ring-1 ring-[#bce5d4] transition hover:bg-[#e1f5ec]"
            >
              마이페이지
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer whitespace-nowrap items-center rounded-full bg-white/85 px-2 py-1.5 text-[11px] font-bold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-pink-50 hover:text-[#c93b6b]"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="inline-flex whitespace-nowrap items-center rounded-full bg-white/85 px-2.5 py-1.5 text-[11px] font-bold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
          >
            로그인
          </Link>
        ))}
    </nav>
  );
}
