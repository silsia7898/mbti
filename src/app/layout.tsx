import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Google Fonts에서 Noto Sans KR 글꼴을 불러옵니다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

// 브라우저 탭 제목과 검색 엔진 설명을 한국어로 설정합니다.
export const metadata: Metadata = {
  title: "몽글 MBTI",
  description: "12개 질문으로 알아보는 나의 3D 동물 성격 유형 검사",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="relative min-h-full font-sans text-[#2e294e]">
        {/* 배경 전체에 은은하게 떠 있는 하트와 별 장식 (클릭 방해 방지를 위해 pointer-events-none 적용) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
        >
          <span className="absolute left-[8%] top-[10%] text-2xl opacity-55">
            ✨
          </span>
          <span className="absolute right-[10%] top-[14%] text-3xl opacity-50">
            🩷
          </span>
          <span className="absolute left-[14%] top-[38%] text-xl opacity-45">
            ⭐
          </span>
          <span className="absolute right-[7%] top-[44%] text-2xl opacity-55">
            🌟
          </span>
          <span className="absolute left-[6%] bottom-[24%] text-3xl opacity-50">
            🩵
          </span>
          <span className="absolute right-[12%] bottom-[18%] text-2xl opacity-55">
            ✨
          </span>
          <span className="absolute left-[22%] bottom-[8%] text-xl opacity-45">
            🩷
          </span>
          <span className="absolute right-[24%] top-[8%] text-lg opacity-45">
            ⭐
          </span>
        </div>

        {/* PC에서도 휴대폰 화면처럼 보이도록 전체 틀을 가운데 정렬하고 최대 너비를 480px로 제한합니다. */}
        <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5">
          {/* 모든 페이지 상단에 공통으로 보이는 헤더 영역 */}
          <header className="flex items-center justify-between py-4">
            {/* 왼쪽: 서비스 이름 (클릭하면 첫 화면 "/"으로 이동) */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-base font-extrabold tracking-tight text-[#4c3b7a] shadow-sm ring-1 ring-purple-100 transition hover:bg-white"
            >
              <span aria-hidden="true">🐾</span>
              <span>몽글 MBTI</span>
            </Link>

            {/* 오른쪽: 메뉴 영역 (현재는 "유형 도감" 하나만 배치) */}
            <nav aria-label="주 메뉴">
              <Link
                href="/types"
                className="inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-[#5b4b8a] shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-50"
              >
                유형 도감
              </Link>
            </nav>
          </header>

          {/* 각 페이지의 실제 내용이 들어가는 본문 영역 */}
          <main className="flex flex-1 flex-col pb-8 pt-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
