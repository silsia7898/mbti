import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "참여 통계",
  description: "몽글 MBTI 참여자들의 16가지 유형별 실시간 통계를 확인해 보세요.",
  openGraph: {
    title: "참여 통계 | 몽글 MBTI",
    description: "몽글 MBTI 참여자들의 16가지 유형별 실시간 통계를 확인해 보세요.",
  },
};

export default function StatsLayout({ children }: { children: ReactNode }) {
  return children;
}
