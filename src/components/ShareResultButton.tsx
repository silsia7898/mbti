"use client";

import { useState } from "react";

// 현재 결과 페이지 주소를 클립보드에 복사하고 안내 문구를 보여주는 버튼
export default function ShareResultButton() {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      // 2.5초 뒤 안내 문구를 원래대로 돌립니다.
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // 클립보드 API가 제한된 환경일 때의 예외 처리
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center">
      <button
        type="button"
        onClick={handleCopyUrl}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-5 py-4 text-base font-extrabold text-white shadow-md shadow-purple-200/80 transition hover:scale-[1.01] active:scale-[0.99]"
      >
        <span>{copied ? "주소를 복사했어요" : "결과 공유하기"}</span>
      </button>
    </div>
  );
}
