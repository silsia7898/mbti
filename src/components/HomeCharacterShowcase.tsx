"use client";

import { useEffect, useState } from "react";
import CharacterViewer from "@/components/three/CharacterViewer";
import { MBTI_TYPE_LIST } from "@/data/types";

// 첫 화면에서 3초마다 다른 유형의 3D 캐릭터를 순서대로 보여주는 컴포넌트
export default function HomeCharacterShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 3초(3000ms)마다 다음 유형으로 바꿉니다.
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MBTI_TYPE_LIST.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentType = MBTI_TYPE_LIST[index];

  return (
    <div className="mt-4 flex w-full flex-col items-center">
      {/* 한 화면에 하나의 3D 캔버스만 사용해 가볍게 렌더링합니다. */}
      <CharacterViewer typeCode={currentType.code} className="h-[220px] w-full" />

      {/* 현재 보여주고 있는 캐릭터 이름과 유형 코드 표시 */}
      <span
        className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold text-[#2e294e] shadow-sm"
        style={{ backgroundColor: `${currentType.color}aa` }}
      >
        <span>{currentType.character.name}</span>
        <span className="opacity-60">·</span>
        <span>{currentType.code}</span>
      </span>
    </div>
  );
}
