import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "유형 도감",
  description: "16가지 MBTI 유형별 3D 동물 캐릭터와 성격 특징을 한눈에 살펴보세요.",
  openGraph: {
    title: "유형 도감 | 몽글 MBTI",
    description: "16가지 MBTI 유형별 3D 동물 캐릭터와 성격 특징을 한눈에 살펴보세요.",
  },
};

export default function TypesLayout({ children }: { children: ReactNode }) {
  return children;
}
