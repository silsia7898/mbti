"use client";

import { useState } from "react";
import Link from "next/link";
import CharacterViewer from "@/components/three/CharacterViewer";
import { MBTI_TYPES, MBTI_TYPE_LIST, type MbtiCode } from "@/data/types";

// 유형 도감(/types) 페이지: 16가지 3D 동물 캐릭터를 한눈에 살펴볼 수 있습니다.
export default function TypesPage() {
  // 현재 선택된 MBTI 유형 코드 (초기값: ENFP)
  const [selectedCode, setSelectedCode] = useState<MbtiCode>("ENFP");
  const selectedInfo = MBTI_TYPES[selectedCode];

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 위쪽: 선택한 유형의 3D 캐릭터 (한 화면에 3D 캔버스는 하나만 사용) */}
      <section
        className="flex flex-col items-center rounded-3xl px-5 py-6 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white"
        style={{
          background: `linear-gradient(180deg, ${selectedInfo.color}66 0%, rgba(255,255,255,0.9) 100%)`,
        }}
      >
        <p className="text-xs font-bold text-[#6b6285]">
          드래그해서 돌려 보고, 캐릭터를 누르면 폴짝 뛰어요!
        </p>

        <div className="mt-2 w-full">
          <CharacterViewer
            typeCode={selectedCode}
            className="h-[340px] w-full"
          />
        </div>

        {/* 캐릭터 이름, 유형 코드, 별명, 한 줄 소개, 자세히 보기 버튼 */}
        <div className="mt-2 flex w-full flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-[#2e294e]">
              {selectedInfo.character.name}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-xs font-black tracking-wider text-[#2e294e]"
              style={{ backgroundColor: selectedInfo.color }}
            >
              {selectedInfo.code}
            </span>
          </div>

          <p className="mt-1.5 text-sm font-bold text-[#4c3b7a]">
            {selectedInfo.nickname}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#574f70]">
            {selectedInfo.summary}
          </p>

          <Link
            href={`/result/${selectedInfo.code}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-5 py-3.5 text-sm font-extrabold text-white shadow-md shadow-purple-200/70 transition hover:scale-[1.01]"
          >
            자세히 보기
          </Link>
        </div>
      </section>

      {/* 맨 아래: 16개 유형 버튼을 4줄 4칸으로 나열 */}
      <section aria-label="16가지 유형 선택" className="rounded-3xl bg-white/85 p-4 shadow-sm ring-1 ring-white">
        <div className="grid grid-cols-4 gap-2">
          {MBTI_TYPE_LIST.map((item) => {
            const isSelected = item.code === selectedCode;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedCode(item.code)}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl py-2.5 text-center transition ${
                  isSelected
                    ? "font-black text-[#2e294e] shadow-md ring-2 ring-[#8a72c9]"
                    : "bg-[#f7fbf9] font-bold text-[#574f70] ring-1 ring-[#e2f1ea] hover:bg-[#eef9f4]"
                }`}
                style={isSelected ? { backgroundColor: item.color } : undefined}
              >
                <span className="text-xs tracking-wide">{item.code}</span>
                <span className="mt-0.5 text-[10px] font-medium opacity-80">
                  {item.character.animal}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
