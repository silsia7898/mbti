"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MBTI_TYPE_LIST, type MbtiTypeInfo } from "@/data/types";
import CharacterViewer from "@/components/three/CharacterViewer";

interface TypeStatRow {
  mbti_type: string;
  count: number;
}

interface StatItem {
  info: MbtiTypeInfo;
  count: number;
  percent: number;
}

// 모든 회원의 저장 결과를 모아 유형별 통계를 보여주는 페이지 (/stats)
export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [items, setItems] = useState<StatItem[]>([]);

  useEffect(() => {
    async function loadStats() {
      const { data, error } = await supabase.rpc("get_type_stats");

      if (error) {
        setErrorMessage(
          "통계를 불러오지 못했어요. Supabase SQL Editor에서 stats.sql을 실행했는지 확인해 주세요."
        );
        setLoading(false);
        return;
      }

      // DB에서 받아온 유형별 개수를 맵으로 정리합니다.
      const countMap = new Map<string, number>();
      let total = 0;

      if (Array.isArray(data)) {
        for (const row of data as TypeStatRow[]) {
          const num = Number(row.count) || 0;
          countMap.set(row.mbti_type, num);
          total += num;
        }
      }

      // 16개 유형 전체를 개수 많은 순서로 정렬합니다.
      const merged: StatItem[] = MBTI_TYPE_LIST.map((info) => {
        const count = countMap.get(info.code) ?? 0;
        const percent = total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
        return { info, count, percent };
      }).sort((a, b) => b.count - a.count);

      setTotalCount(total);
      setItems(merged);
      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm font-bold text-[#6b6285]">
        통계를 불러오는 중...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-10 text-center shadow-sm ring-1 ring-white">
          <p className="text-sm font-bold text-[#c93b6b]">{errorMessage}</p>
        </section>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-12 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
          <span aria-hidden="true" className="mb-3 text-4xl">
            📊
          </span>
          <h1 className="text-xl font-extrabold text-[#2e294e]">
            아직 모인 결과가 없어요
          </h1>
          <p className="mt-2 text-xs text-[#6b6285]">
            첫 번째로 검사를 완료하고 결과를 저장해 보세요!
          </p>
          <Link
            href="/test"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            검사하러 가기
          </Link>
        </section>
      </div>
    );
  }

  const topItem = items[0];
  const maxCount = Math.max(topItem.count, 1);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 맨 위: 지금까지 저장된 결과 수 */}
      <section className="rounded-3xl bg-white/90 px-6 py-5 text-center shadow-sm ring-1 ring-white">
        <span className="inline-flex items-center rounded-full bg-[#eef9f4] px-3 py-1 text-xs font-bold text-[#2f7d64]">
          실시간 유형 통계
        </span>
        <h1 className="mt-2 text-xl font-extrabold text-[#2e294e]">
          지금까지 <span className="text-[#4c3b7a]">{totalCount}개</span>의 결과가 모였어요
        </h1>
      </section>

      {/* 가장 많은 유형의 3D 캐릭터와 별명 */}
      <section
        className="flex flex-col items-center rounded-3xl px-5 pb-5 pt-4 text-center shadow-sm ring-1 ring-white"
        style={{
          background: `linear-gradient(180deg, ${topItem.info.color}66 0%, rgba(255,255,255,0.92) 100%)`,
        }}
      >
        <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-extrabold text-[#4c3b7a]">
          가장 많은 유형 👑 {topItem.info.code} ({topItem.percent}%)
        </span>
        <CharacterViewer
          typeCode={topItem.info.code}
          className="h-[230px] w-full"
        />
        <p className="text-base font-extrabold text-[#2e294e]">
          {topItem.info.nickname}
        </p>
        <p className="mt-0.5 text-xs font-medium text-[#6b6285]">
          {topItem.info.character.name} · {topItem.count}명
        </p>
      </section>

      {/* 16개 유형 전체 가로 막대 그래프 (그래프 라이브러리 없이 직접 구현) */}
      <section className="rounded-3xl bg-white/90 px-5 py-5 shadow-sm ring-1 ring-white">
        <h2 className="mb-4 text-sm font-extrabold text-[#2e294e]">
          16가지 유형별 순위
        </h2>

        <div className="flex flex-col gap-3">
          {items.map(({ info, count, percent }) => {
            const barWidth = count > 0 ? Math.max((count / maxCount) * 100, 4) : 0;

            return (
              <Link
                key={info.code}
                href={`/result/${info.code}`}
                className="group flex items-center gap-2.5"
              >
                {/* 유형 코드 */}
                <span className="w-11 shrink-0 text-xs font-black tracking-wide text-[#2e294e] group-hover:text-[#5b4b8a]">
                  {info.code}
                </span>

                {/* 가로 막대 트랙 */}
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-[#f3f6f5]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: info.color,
                    }}
                  />
                </div>

                {/* 개수와 비율(%) */}
                <span className="w-20 shrink-0 text-right text-xs font-bold text-[#574f70]">
                  {count}개 ({percent}%)
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
