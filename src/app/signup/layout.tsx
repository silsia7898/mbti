import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "몽글 MBTI에 가입하고 나의 3D 동물 성격 유형 결과를 저장해 보세요.",
};

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return children;
}
