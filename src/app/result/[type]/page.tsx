import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getMbtiTypeInfo } from "@/data/types";
import ShareResultButton from "@/components/ShareResultButton";
import SaveResultButton from "@/components/SaveResultButton";
import CharacterViewer from "@/components/three/CharacterViewer";

// 결과 페이지 URL의 유형 코드에 맞춰 동적으로 제목과 Open Graph 미리보기를 생성합니다.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const typeInfo = getMbtiTypeInfo(type);

  if (!typeInfo) {
    return {
      title: "없는 유형",
      description: "존재하지 않는 성격 유형입니다.",
    };
  }

  const pageTitle = `${typeInfo.code} ${typeInfo.nickname}`;
  return {
    title: pageTitle,
    description: typeInfo.summary,
    openGraph: {
      title: `${pageTitle} | 몽글 MBTI`,
      description: typeInfo.summary,
      type: "website",
      locale: "ko_KR",
    },
  };
}

// 실제로 params를 읽어 결과 화면을 렌더링하는 내부 컴포넌트
async function ResultContent({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  // 소문자로 들어와도 대문자로 변환해 16가지 유형에서 찾아옵니다.
  const typeInfo = getMbtiTypeInfo(type);

  // 16가지에 없는 유형 코드인 경우 안내 화면을 보여줍니다.
  if (!typeInfo) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-12 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
          <span aria-hidden="true" className="mb-3 text-4xl">
            🫧
          </span>
          <h1 className="text-2xl font-extrabold text-[#2e294e]">
            없는 유형이에요
          </h1>
          <p className="mt-2 text-sm text-[#6b6285]">
            주소가 잘못되었거나 존재하지 않는 성격 유형입니다.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-7 py-4 text-base font-extrabold text-white shadow-md transition hover:scale-[1.01]"
          >
            홈으로 돌아가기
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col gap-4 rounded-3xl p-4 shadow-lg ring-1 ring-white/80"
      style={{
        // 페이지 전체에 해당 유형의 대표 색상이 은은하게 감돌도록 배경 그라데이션을 적용합니다.
        background: `linear-gradient(180deg, ${typeInfo.color}66 0%, rgba(255, 255, 255, 0.88) 45%, ${typeInfo.color}44 100%)`,
      }}
    >
      {/* 1) "당신의 유형은" 문구, 유형 코드(크게), 별명 */}
      <section className="flex flex-col items-center rounded-3xl bg-white/90 px-6 py-7 text-center shadow-sm ring-1 ring-white">
        <p className="text-sm font-bold text-[#6b6285]">당신의 유형은</p>
        <h1 className="mt-1 text-5xl font-black tracking-widest text-[#2e294e]">
          {typeInfo.code}
        </h1>
        <p
          className="mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-extrabold text-[#2e294e]"
          style={{ backgroundColor: `${typeInfo.color}99` }}
        >
          {typeInfo.nickname}
        </p>

        {/* 2) 캐릭터 자리: 대표 색상 배경의 둥근 상자 안에 해당 유형의 3D 캐릭터 표시 */}
        <div
          className="mt-6 flex w-full flex-col items-center rounded-3xl px-4 pb-4 pt-2 shadow-inner ring-1 ring-white/80"
          style={{ backgroundColor: `${typeInfo.color}aa` }}
        >
          <CharacterViewer
            typeCode={typeInfo.code}
            className="h-[310px] w-full"
          />
          <span className="mt-1 rounded-full bg-white/85 px-4 py-1 text-sm font-extrabold text-[#2e294e] shadow-sm">
            {typeInfo.character.name}
          </span>
        </div>
      </section>

      {/* 3) 한 줄 소개와 성격 설명 */}
      <section className="rounded-3xl bg-white/90 px-6 py-6 shadow-sm ring-1 ring-white">
        <p className="text-base font-extrabold leading-snug text-[#2e294e]">
          {typeInfo.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#574f70]">
          {typeInfo.description}
        </p>
      </section>

      {/* 4) 강점 목록, 조심할 점 목록 */}
      <section className="grid grid-cols-1 gap-3">
        {/* 강점 카드 */}
        <div className="rounded-3xl bg-white/90 px-6 py-5 shadow-sm ring-1 ring-white">
          <h2 className="text-base font-extrabold text-[#2e294e]">
            ✨ 이런 점이 강점이에요
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[#4a4363]">
            {typeInfo.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-xs text-[#2f7d64]">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 조심할 점 카드 */}
        <div className="rounded-3xl bg-white/90 px-6 py-5 shadow-sm ring-1 ring-white">
          <h2 className="text-base font-extrabold text-[#2e294e]">
            🍀 이런 점은 살짝 조심해요
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[#4a4363]">
            {typeInfo.cautions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-xs text-[#d64d86]">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5) 잘 맞는 유형 2개 (누르면 그 유형의 결과 페이지로 이동) */}
      <section className="rounded-3xl bg-white/90 px-6 py-5 shadow-sm ring-1 ring-white">
        <h2 className="text-base font-extrabold text-[#2e294e]">
          💞 나와 잘 맞는 유형
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {typeInfo.bestMatches.map((matchCode) => {
            const matchInfo = getMbtiTypeInfo(matchCode);
            return (
              <Link
                key={matchCode}
                href={`/result/${matchCode}`}
                className="flex flex-col items-center rounded-2xl px-3 py-4 text-center shadow-sm ring-1 ring-black/5 transition hover:scale-[1.02]"
                style={{
                  backgroundColor: matchInfo
                    ? `${matchInfo.color}66`
                    : "#f7fbf9",
                }}
              >
                <span className="text-lg font-black tracking-wider text-[#2e294e]">
                  {matchCode}
                </span>
                {matchInfo && (
                  <span className="mt-1 text-xs font-semibold text-[#574f70]">
                    {matchInfo.character.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6) 내 기록에 저장 + 다시 검사하기 / 결과 공유하기 버튼 */}
      <div className="flex flex-col gap-3 pt-1">
        <SaveResultButton typeCode={typeInfo.code} />

        <div className="flex gap-3">
          <Link
            href="/test"
            className="flex flex-1 items-center justify-center rounded-2xl bg-white/95 px-5 py-4 text-base font-extrabold text-[#4c3b7a] shadow-sm ring-1 ring-purple-100 transition hover:bg-white"
          >
            다시 검사하기
          </Link>
          <ShareResultButton />
        </div>
      </div>
    </div>
  );
}

// 결과 페이지: Next.js 16 규칙에 맞게 Suspense로 감싸서 렌더링합니다.
export default function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm font-semibold text-[#6b6285]">
          결과를 불러오는 중이에요...
        </div>
      }
    >
      <ResultContent params={params} />
    </Suspense>
  );
}
