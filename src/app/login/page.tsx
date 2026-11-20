"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

// 안전한 내부 경로('/'로 시작하고 '//'로 시작하지 않는 주소)만 허용합니다.
function getSafeNextPath(nextParam: string | null): string {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return "/";
}

// Supabase 로그인 오류 메시지를 한국어로 바꿔주는 함수
function mapLoginError(message: string, code?: string): string {
  const lower = message.toLowerCase();
  if (
    code === "invalid_credentials" ||
    lower.includes("invalid login credentials")
  ) {
    return "이메일 또는 비밀번호가 틀렸어요.";
  }
  if (lower.includes("email not confirmed")) {
    return "이메일 인증을 먼저 완료해 주세요.";
  }
  return "로그인 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.";
}

// useSearchParams를 사용하는 실제 로그인 폼 컴포넌트
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) {
      setErrorMessage(mapLoginError(error.message, error.code));
      setSubmitting(false);
      return;
    }

    // 로그인에 성공하면 next 주소(없으면 홈 "/")로 이동합니다.
    router.push(nextPath);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-col rounded-3xl bg-white/90 px-6 py-8 shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#f3f0ff] px-3.5 py-1 text-xs font-bold text-[#5b4b8a]">
            로그인
          </span>
          <h1 className="mt-3 text-2xl font-extrabold text-[#2e294e]">
            다시 오셨네요!
          </h1>
          <p className="mt-1.5 text-xs text-[#6b6285]">
            이메일과 비밀번호로 로그인해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-pink-50 px-4 py-3 text-xs font-semibold leading-relaxed text-[#c93b6b]">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-4 text-base font-extrabold text-white shadow-md shadow-purple-200/80 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "처리 중..." : "로그인"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[#6b6285]">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="font-extrabold text-[#5b4b8a] underline underline-offset-4"
          >
            회원가입
          </Link>
        </p>
      </section>
    </div>
  );
}

// 로그인 페이지 (/login): Next.js 16 규칙에 맞게 Suspense로 감싸서 렌더링합니다.
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm font-semibold text-[#6b6285]">
          불러오는 중...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
