"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import CharacterViewer from "@/components/three/CharacterViewer";
import { getMbtiTypeInfo, type MbtiCode } from "@/data/types";

interface SavedResultRow {
  id: number;
  mbti_type: string;
  created_at: string;
}

// 날짜를 "2026.11.17" 형식으로 바꿔주는 함수
function formatDotDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

// 회원이 저장한 검사 결과를 다시 보고 삭제할 수 있는 마이페이지
export default function MyPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState<SavedResultRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    // 로그아웃 상태면 로그인 후 마이페이지로 돌아오도록 보냅니다.
    if (!user) {
      router.replace("/login?next=/mypage");
      return;
    }

    // 내 검사 기록을 최신순으로 불러옵니다.
    supabase
      .from("test_results")
      .select("id, mbti_type, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setResults(data);
        setFetching(false);
      });
  }, [user, authLoading, router]);

  // 정말 지울지 확인한 뒤 삭제하고 목록에서 바로 제거합니다.
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("이 검사 기록을 정말 삭제할까요?");
    if (!confirmed) return;

    const { error } = await supabase.from("test_results").delete().eq("id", id);
    if (!error) {
      setResults((prev) => prev.filter((item) => item.id !== id));
    }
  };

  if (authLoading || fetching || !user) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm font-bold text-[#6b6285]">
        불러오는 중...
      </div>
    );
  }

  const nickname =
    (user.user_metadata?.nickname as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    "회원";

  const latestTypeInfo =
    results.length > 0 ? getMbtiTypeInfo(results[0].mbti_type) : undefined;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 맨 위: "닉네임 님의 기록" 과 가입 이메일 */}
      <section className="rounded-3xl bg-white/90 px-5 py-5 shadow-sm ring-1 ring-white">
        <h1 className="text-xl font-extrabold text-[#2e294e]">
          {nickname} 님의 기록
        </h1>
        {user.email && (
          <p className="mt-1 text-xs font-medium text-[#6b6285]">
            {user.email}
          </p>
        )}
      </section>

      {/* 가장 최근에 저장한 유형의 3D 캐릭터 */}
      {latestTypeInfo && (
        <section
          className="flex flex-col items-center rounded-3xl px-5 pb-4 pt-3 text-center shadow-sm ring-1 ring-white"
          style={{
            background: `linear-gradient(180deg, ${latestTypeInfo.color}66 0%, rgba(255,255,255,0.92) 100%)`,
          }}
        >
          <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold text-[#4c3b7a]">
            최근 결과 · {latestTypeInfo.code} ({latestTypeInfo.character.name})
          </span>
          <CharacterViewer
            typeCode={latestTypeInfo.code as MbtiCode}
            className="h-[230px] w-full"
          />
        </section>
      )}

      {/* 내 검사 기록 목록 (최신순) 또는 빈 상태 안내 */}
      {results.length === 0 ? (
        <section className="flex flex-1 flex-col items-center justify-center rounded-3xl bg-white/85 px-6 py-12 text-center shadow-sm ring-1 ring-white">
          <p className="text-sm font-bold text-[#574f70]">
            아직 저장한 결과가 없어요
          </p>
          <Link
            href="/test"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            검사하러 가기
          </Link>
        </section>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {results.map((row) => {
            const typeInfo = getMbtiTypeInfo(row.mbti_type);
            return (
              <li
                key={row.id}
                className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3.5 shadow-sm ring-1 ring-white"
              >
                <Link
                  href={`/result/${row.mbti_type}`}
                  className="flex flex-1 items-center gap-2.5 overflow-hidden"
                >
                  <span className="shrink-0 text-xs font-semibold text-[#8a82a1]">
                    {formatDotDate(row.created_at)}
                  </span>
                  <span
                    className="shrink-0 rounded-xl px-2.5 py-1 text-xs font-black text-[#2e294e]"
                    style={{ backgroundColor: typeInfo?.color ?? "#eef9f4" }}
                  >
                    {row.mbti_type}
                  </span>
                  <span className="truncate text-xs font-bold text-[#4a4363]">
                    {typeInfo?.nickname ?? ""}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  className="ml-2 shrink-0 cursor-pointer rounded-full px-2.5 py-1 text-xs font-bold text-[#a39bb8] transition hover:bg-pink-50 hover:text-[#c93b6b]"
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
