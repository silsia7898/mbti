"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";
import type { MbtiCode } from "@/data/types";

// 결과 페이지에서 현재 유형을 내 기록(test_results)에 저장하는 버튼
export default function SaveResultButton({ typeCode }: { typeCode: MbtiCode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (saved || saving) return;
    setErrorMessage(null);

    // 로그아웃 상태면 로그인 후 다시 이 결과 페이지로 돌아오도록 안내합니다.
    if (!user) {
      router.push(`/login?next=/result/${typeCode}`);
      return;
    }

    setSaving(true);

    // user_id 와 created_at 은 DB 기본값(auth.uid(), now())으로 자동 저장되므로 mbti_type 만 보냅니다.
    const { error } = await supabase
      .from("test_results")
      .insert({ mbti_type: typeCode });

    if (error) {
      setErrorMessage(
        `결과를 저장하지 못했어요: ${error.message || "잠시 후 다시 시도해 주세요."}`
      );
      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || saved}
        className={`flex w-full items-center justify-center rounded-2xl px-5 py-4 text-base font-extrabold shadow-sm transition ${
          saved
            ? "cursor-default bg-[#eef9f4] text-[#2f7d64] ring-1 ring-[#bce5d4]"
            : "cursor-pointer bg-[#4c3b7a] text-white shadow-md hover:bg-[#3f3068] disabled:cursor-not-allowed disabled:opacity-60"
        }`}
      >
        {saving ? "저장 중..." : saved ? "저장했어요" : "내 기록에 저장"}
      </button>

      {errorMessage && (
        <p className="w-full rounded-2xl bg-pink-50 px-4 py-2.5 text-center text-xs font-semibold text-[#c93b6b]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
