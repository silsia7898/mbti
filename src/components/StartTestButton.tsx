"use client";

import Link from "next/link";

// 첫 화면의 "검사 시작하기" 버튼: 누구나 바로 /test로 이동해 검사를 시작할 수 있습니다.
export default function StartTestButton() {
  return (
    <Link
      href="/test"
      className="mt-7 flex min-h-[88px] w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-8 py-6 text-2xl font-extrabold text-white shadow-lg shadow-purple-200/90 transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
    >
      <span>검사 시작하기</span>
      <span aria-hidden="true" className="text-2xl">
        →
      </span>
    </Link>
  );
}
