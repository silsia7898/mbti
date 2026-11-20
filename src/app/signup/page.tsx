"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Supabase 회원가입 오류 메시지를 한국어로 바꿔주는 함수
function mapSignUpError(message: string, code?: string): string {
  const lower = message.toLowerCase();
  if (
    code === "user_already_exists" ||
    lower.includes("already registered") ||
    lower.includes("already exists")
  ) {
    return "이미 가입된 이메일이에요.";
  }
  if (lower.includes("password") && (lower.includes("6") || lower.includes("short"))) {
    return "비밀번호는 6자 이상 입력해 주세요.";
  }
  if (lower.includes("invalid email") || lower.includes("unable to validate email")) {
    return "올바른 이메일 주소를 입력해 주세요.";
  }
  return "회원가입 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.";
}

// 이메일 + 비밀번호 + 닉네임 회원가입 페이지 (/signup)
export default function SignUpPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const trimmedNickname = nickname.trim();
    const trimmedEmail = email.trim();

    if (!trimmedNickname) {
      setErrorMessage("닉네임을 입력해 주세요.");
      return;
    }
    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("비밀번호는 6자 이상 입력해 주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호 확인이 서로 달라요.");
      return;
    }

    setSubmitting(true);

    // 닉네임은 별도 테이블 없이 user_metadata.nickname 에 함께 저장합니다.
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          nickname: trimmedNickname,
        },
      },
    });

    if (error) {
      setErrorMessage(mapSignUpError(error.message, error.code));
      setSubmitting(false);
      return;
    }

    // 이메일 인증이 꺼져 있어 바로 로그인(session 생성)된 경우 홈으로 이동합니다.
    if (data.session) {
      router.push("/");
      return;
    }

    // 이메일 인증이 켜져 있는 경우 안내 메시지를 보여줍니다.
    setInfoMessage(
      "가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요."
    );
    setSubmitting(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-col rounded-3xl bg-white/90 px-6 py-8 shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#eef9f4] px-3.5 py-1 text-xs font-bold text-[#2f7d64]">
            회원가입
          </span>
          <h1 className="mt-3 text-2xl font-extrabold text-[#2e294e]">
            몽글 MBTI 시작하기
          </h1>
          <p className="mt-1.5 text-xs text-[#6b6285]">
            가입하면 내 검사 결과를 저장하고 언제든 다시 볼 수 있어요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
          <div>
            <label
              htmlFor="signup-nickname"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              닉네임
            </label>
            <input
              id="signup-nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 몽글이"
              maxLength={20}
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              비밀번호 (6자 이상)
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 입력해 주세요"
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password-confirm"
              className="mb-1.5 block text-xs font-bold text-[#4c3b7a]"
            >
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              className="w-full rounded-2xl bg-[#f7fbf9] px-4 py-3.5 text-sm font-semibold text-[#2e294e] placeholder-[#a39bb8] ring-1 ring-[#dceee6] focus:outline-none focus:ring-2 focus:ring-[#c79dff]"
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-pink-50 px-4 py-3 text-xs font-semibold leading-relaxed text-[#c93b6b]">
              {errorMessage}
            </p>
          )}

          {infoMessage && (
            <p className="rounded-2xl bg-[#eef9f4] px-4 py-3 text-xs font-semibold leading-relaxed text-[#2f7d64]">
              {infoMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-4 text-base font-extrabold text-white shadow-md shadow-purple-200/80 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "처리 중..." : "회원가입"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[#6b6285]">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="font-extrabold text-[#5b4b8a] underline underline-offset-4"
          >
            로그인
          </Link>
        </p>
      </section>
    </div>
  );
}
