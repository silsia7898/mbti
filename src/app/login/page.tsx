"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 이름만 입력하고 바로 검사를 시작하는 간편 로그인 페이지
export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage("이름을 입력해 주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    // 이미 로그인된 세션이 있으면 이름만 업데이트하고, 없으면 익명 로그인으로 바로 시작합니다.
    const { data: currentData } = await supabase.auth.getUser();

    if (currentData.user) {
      const { error } = await supabase.auth.updateUser({
        data: { name: trimmedName },
      });
      if (error) {
        setErrorMessage("이름 저장 중 오류가 발생했어요. 다시 시도해 주세요.");
        setLoading(false);
        return;
      }
      router.push("/test");
      return;
    }

    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: { name: trimmedName },
      },
    });

    if (error) {
      if (error.code === "anonymous_provider_disabled") {
        setErrorMessage(
          "Supabase 대시보드(Authentication > Sign In / Providers)에서 'Allow anonymous sign-ins'를 켜 주세요."
        );
      } else {
        setErrorMessage(`로그인에 실패했어요: ${error.message}`);
      }
      setLoading(false);
      return;
    }

    // 로그인 성공 시 바로 검사 화면(/test)으로 이동합니다.
    router.push("/test");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-col rounded-3xl bg-white/90 px-6 py-8 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <span className="mx-auto mb-3 inline-flex items-center rounded-full bg-[#eef9f4] px-3.5 py-1 text-xs font-bold text-[#2f7d64]">
          간편 시작하기
        </span>

        <h1 className="text-2xl font-extrabold text-[#2e294e]">
          이름만 넣고 바로 시작해요!
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[#6b6285]">
          이메일이나 비밀번호 없이 이름만 입력하면 검사 결과를 저장하고 다시 볼 수 있어요.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 민지"
            maxLength={20}
            className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-4 text-center text-base font-bold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
          />

          {errorMessage && (
            <p className="rounded-2xl bg-pink-50 px-4 py-2.5 text-xs font-semibold leading-relaxed text-[#c93b6b]">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-4 text-lg font-extrabold text-white shadow-md shadow-purple-200/80 transition hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "준비 중..." : "이 이름으로 검사 시작하기 →"}
          </button>
        </form>

        <Link
          href="/test"
          className="mt-4 text-xs font-semibold text-[#8a82a1] underline-offset-4 hover:underline"
        >
          로그인 없이 검사만 해볼래요
        </Link>
      </section>
    </div>
  );
}
