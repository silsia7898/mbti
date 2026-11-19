import { Suspense } from "react";

// 실제로 params를 읽어 유형 코드를 화면에 그리는 내부 컴포넌트
async function ResultContent({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const mbtiType = type.toUpperCase();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-12 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <span className="mb-3 rounded-full bg-[#eef9f4] px-4 py-1.5 text-xs font-bold text-[#2f7d64]">
          나의 몽글 MBTI 결과
        </span>

        {/* 유형 코드를 크게 표시 */}
        <h1 className="text-5xl font-black tracking-widest text-[#4c3b7a]">
          {mbtiType}
        </h1>

        <p className="mt-4 text-sm text-[#6b6285]">
          유형별 상세 설명과 3D 캐릭터 화면은 다음 단계에서 완성됩니다.
        </p>
      </section>
    </div>
  );
}

// 임시 결과 페이지: Next.js 16 규칙에 맞게 Suspense로 감싸서 렌더링합니다.
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
