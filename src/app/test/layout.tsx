import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "성격 유형 검사",
  description: "12개의 일상 속 질문에 답하며 나의 MBTI 유형을 알아보세요.",
  openGraph: {
    title: "성격 유형 검사 | 몽글 MBTI",
    description: "12개의 일상 속 질문에 답하며 나의 MBTI 유형을 알아보세요.",
  },
};

export default function TestLayout({ children }: { children: ReactNode }) {
  return children;
}
