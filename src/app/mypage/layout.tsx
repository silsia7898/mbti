import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "내가 저장한 몽글 MBTI 검사 기록을 다시 확인해 보세요.",
};

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return children;
}
