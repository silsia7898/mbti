"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 첫 화면의 "검사 시작하기" 버튼: 로그인되어 있으면 /test로, 아니면 이름 입력(/login)으로 안내합니다.
export default function StartTestButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(Boolean(data.user));
    });
  }, []);

  return (
    <Link
      href={isLoggedIn ? "/test" : "/login"}
      className="mt-7 flex min-h-[88px] w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-8 py-6 text-2xl font-extrabold text-white shadow-lg shadow-purple-200/90 transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
    >
      <span>검사 시작하기</span>
      <span aria-hidden="true" className="text-2xl">
        →
      </span>
    </Link>
  );
}
