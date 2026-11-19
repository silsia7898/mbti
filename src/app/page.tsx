import Link from "next/link";

// 첫 화면에 보여줄 3가지 특징 카드 데이터
const FEATURES = [
  {
    emoji: "📝",
    title: "12문항 · 2분",
    description: "부담 없이 빠르게 답해요",
    bgClass: "bg-[#fff0f6]",
    ringClass: "ring-pink-100",
  },
  {
    emoji: "🌈",
    title: "16가지 유형",
    description: "나와 닮은 성격을 찾아요",
    bgClass: "bg-[#f3f0ff]",
    ringClass: "ring-purple-100",
  },
  {
    emoji: "🧸",
    title: "유형별 3D 캐릭터",
    description: "귀여운 동물 친구를 만나요",
    bgClass: "bg-[#eef9ff]",
    ringClass: "ring-sky-100",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-between gap-6">
      {/* 메인 소개 카드 영역 */}
      <section className="flex flex-col items-center rounded-3xl bg-white/90 px-6 py-9 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
        {/* 상단 파스텔 배지 */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-1.5 text-xs font-bold text-[#d64d86] ring-1 ring-pink-100">
          ✨ 몽글몽글 성격 유형 테스트
        </span>

        {/* 큰 제목과 한 줄 소개 문구 */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#2e294e]">
          나는 어떤 유형일까?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6b6285]">
          12개의 간단한 질문에 답하고, 나를 닮은 3D 동물 캐릭터를 만나보세요.
        </p>

        {/* 검사 시작하기 버튼 (/test 경로로 이동, 한눈에 띄도록 아주 큼직하게 배치) */}
        <Link
          href="/test"
          className="mt-7 flex min-h-[88px] w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-8 py-6 text-2xl font-extrabold text-white shadow-lg shadow-purple-200/90 transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
        >
          <span>검사 시작하기</span>
          <span aria-hidden="true" className="text-2xl">
            →
          </span>
        </Link>
      </section>

      {/* 특징 카드 3개 영역 */}
      <section aria-label="서비스 특징" className="grid grid-cols-1 gap-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className={`flex items-center gap-4 rounded-2xl ${feature.bgClass} px-5 py-4 shadow-sm ring-1 ${feature.ringClass}`}
          >
            {/* 왼쪽 아이콘 박스 */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
              <span aria-hidden="true">{feature.emoji}</span>
            </div>

            {/* 오른쪽 특징 제목 및 짧은 설명 */}
            <div className="text-left">
              <h2 className="text-base font-bold text-[#2e294e]">
                {feature.title}
              </h2>
              <p className="text-xs font-medium text-[#6b6285]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 맨 아래 작은 안내 문구 */}
      <footer className="pt-2 text-center">
        <p className="text-xs leading-relaxed text-[#8a82a1]">
          이 검사는 재미로 보는 간이 검사이며, 공식 MBTI® 검사가 아닙니다.
        </p>
      </footer>
    </div>
  );
}
