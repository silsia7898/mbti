"use client";

import dynamic from "next/dynamic";
import type { MbtiCode } from "@/data/types";

// 3D 캔버스는 브라우저에서만 동작하므로 서버 렌더링(ssr: false)에서 제외합니다.
const CharacterCanvas = dynamic(() => import("./CharacterCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#6b6285]">
      캐릭터 불러오는 중...
    </div>
  ),
});

// 3D 캐릭터를 감싸서 보여주는 뷰어 컴포넌트
export default function CharacterViewer({
  typeCode = "ISFJ",
  className = "h-[340px] w-full",
}: {
  typeCode?: MbtiCode;
  className?: string;
}) {
  return (
    <div className={className}>
      <CharacterCanvas typeCode={typeCode} />
    </div>
  );
}
