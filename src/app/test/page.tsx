"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type MbtiTrait } from "@/data/questions";
import { calculateMbtiType } from "@/lib/mbti";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const router = useRouter();

  // 현재 보고 있는 문항의 순서 (0부터 11까지)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 각 문항에서 사용자가 고른 성향 글자를 순서대로 저장하는 배열
  const [answers, setAnswers] = useState<(MbtiTrait | null)[]>(() =>
    Array(QUESTIONS.length).fill(null)
  );

  const totalCount = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer = answers[currentIndex];

  // 진행 막대 너비(%) 계산
  const progressPercent = ((currentIndex + 1) / totalCount) * 100;

  // 선택지 버튼을 눌렀을 때 실행되는 함수
  const handleSelectOption = async (trait: MbtiTrait) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = trait;
    setAnswers(nextAnswers);

    // 마지막(12번째) 문항이면 유형을 계산하고, 로그인한 경우 결과를 저장한 뒤 결과 페이지로 이동합니다.
    if (currentIndex === totalCount - 1) {
      const validTraits = nextAnswers.filter(
        (item): item is MbtiTrait => item !== null
      );
      const mbtiType = calculateMbtiType(validTraits);

      // 로그인한 회원이면 test_results 테이블에 자동으로 결과를 저장합니다.
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from("test_results").insert({ mbti_type: mbtiType });
      }

      router.push(`/result/${mbtiType}`);
      return;
    }

    // 아직 남은 문항이 있으면 바로 다음 질문으로 넘어갑니다.
    setCurrentIndex((prev) => prev + 1);
  };

  // "이전" 버튼을 눌러 앞 질문으로 돌아가는 함수
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-5">
      {/* 위쪽: 진행 숫자("3 / 12")와 진행 막대 */}
      <section aria-label="검사 진행 상황" className="rounded-3xl bg-white/85 px-5 py-4 shadow-sm ring-1 ring-white">
        <div className="mb-2.5 flex items-center justify-between text-sm font-bold text-[#4c3b7a]">
          <span>질문 {currentIndex + 1}</span>
          <span className="rounded-full bg-[#eef9f4] px-3 py-0.5 text-xs font-extrabold text-[#2f7d64]">
            {currentIndex + 1} / {totalCount}
          </span>
        </div>

        {/* 진행 막대 트랙 */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#e9f5f0]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* 가운데: 현재 질문 카드와 큼직한 선택지 버튼 2개 */}
      <section className="flex flex-1 flex-col justify-center rounded-3xl bg-white/90 px-6 py-8 shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <p className="mb-2 text-center text-xs font-bold text-[#8a82a1]">
          Q{currentQuestion.id}. 나에게 더 가까운 모습은?
        </p>

        <h1 className="text-center text-xl font-extrabold leading-snug text-[#2e294e]">
          {currentQuestion.prompt}
        </h1>

        {/* 선택지 2개 */}
        <div className="mt-7 flex flex-col gap-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = currentAnswer === option.trait;

            return (
              <button
                key={option.trait}
                type="button"
                onClick={() => handleSelectOption(option.trait)}
                className={`min-h-[84px] w-full cursor-pointer rounded-3xl px-5 py-5 text-left text-base font-bold leading-relaxed transition active:scale-[0.99] ${
                  isSelected
                    ? "bg-gradient-to-r from-[#ffe6f0] to-[#efe7ff] text-[#3a2863] shadow-md ring-2 ring-[#c79dff]"
                    : "bg-[#f7fbf9] text-[#2e294e] shadow-sm ring-1 ring-[#dceee6] hover:bg-[#eef9f4] hover:ring-[#a7dec8]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 아래쪽: 이전 버튼 (첫 질문에서는 숨김) */}
      <div className="flex min-h-[48px] items-center justify-start">
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/90 px-5 py-3 text-sm font-bold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-white"
          >
            <span aria-hidden="true">←</span>
            <span>이전</span>
          </button>
        )}
      </div>
    </div>
  );
}
