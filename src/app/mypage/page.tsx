"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMbtiTypeInfo } from "@/data/types";

interface SavedResultRow {
  id: number;
  mbti_type: string;
  created_at: string;
}

// 회원이 저장한 검사 결과를 다시 보고 삭제할 수 있는 마이페이지
export default function MyPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [results, setResults] = useState<SavedResultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMyData() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }

      const name = userData.user.user_metadata?.name;
      setUserName(typeof name === "string" && name ? name : "회원");

      // 최신순으로 내 검사 결과를 불러옵니다.
      const { data: rows } = await supabase
        .from("test_results")
        .select("id, mbti_type, created_at")
        .order("created_at", { ascending: false });

      if (rows) {
        setResults(rows);
      }
      setLoading(false);
    }

    loadMyData();
  }, []);

  // 저장된 결과 1개 삭제
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("test_results").delete().eq("id", id);
    if (!error) {
      setResults((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 로그아웃 후 첫 화면으로 이동
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm font-bold text-[#6b6285]">
        내 기록을 불러오는 중...
      </div>
    );
  }

  if (!userName) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-10 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
          <h1 className="text-xl font-extrabold text-[#2e294e]">
            로그인이 필요해요
          </h1>
          <p className="mt-2 text-xs text-[#6b6285]">
            이름만 입력하면 검사 결과를 저장하고 다시 볼 수 있어요.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            이름 입력하고 시작하기
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* 상단 회원 인사 및 로그아웃 버튼 */}
      <section className="flex items-center justify-between rounded-3xl bg-white/90 px-5 py-5 shadow-sm ring-1 ring-white">
        <div>
          <p className="text-xs font-bold text-[#2f7d64]">반가워요!</p>
          <h1 className="text-xl font-extrabold text-[#2e294e]">
            {userName}님의 검사 기록
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer rounded-full bg-[#f7fbf9] px-3.5 py-2 text-xs font-bold text-[#6b6285] ring-1 ring-[#dceee6] transition hover:bg-pink-50 hover:text-[#c93b6b]"
        >
          로그아웃
        </button>
      </section>

      {/* 저장된 검사 결과 목록 */}
      {results.length === 0 ? (
        <section className="flex flex-1 flex-col items-center justify-center rounded-3xl bg-white/85 px-6 py-12 text-center shadow-sm ring-1 ring-white">
          <p className="text-sm font-bold text-[#574f70]">
            아직 저장된 검사 결과가 없어요.
          </p>
          <Link
            href="/test"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-3.5 text-sm font-extrabold text-white shadow-md"
          >
            지금 검사하러 가기
          </Link>
        </section>
      ) : (
        <ul className="flex flex-col gap-3">
          {results.map((row) => {
            const typeInfo = getMbtiTypeInfo(row.mbti_type);
            const dateLabel = new Date(row.created_at).toLocaleDateString(
              "ko-KR",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <li
                key={row.id}
                className="flex items-center justify-between rounded-3xl bg-white/90 px-5 py-4 shadow-sm ring-1 ring-white"
              >
                <Link
                  href={`/result/${row.mbti_type}`}
                  className="flex flex-1 items-center gap-3.5"
                >
                  <span
                    className="flex h-12 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-[#2e294e]"
                    style={{ backgroundColor: typeInfo?.color ?? "#eef9f4" }}
                  >
                    {row.mbti_type}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#2e294e]">
                      {typeInfo?.character.name ?? row.mbti_type}
                    </p>
                    <p className="text-xs text-[#8a82a1]">{dateLabel}</p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(row.id)}
                  className="ml-3 cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold text-[#a39bb8] transition hover:bg-pink-50 hover:text-[#c93b6b]"
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
