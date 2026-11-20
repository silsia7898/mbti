import Link from "next/link";

// 없는 주소로 접속했을 때 보여주는 404 안내 페이지
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center rounded-3xl bg-white/90 px-6 py-12 text-center shadow-lg shadow-teal-100/70 ring-1 ring-white">
        <span aria-hidden="true" className="mb-3 text-5xl">
          🫧
        </span>
        <p className="rounded-full bg-[#f3f0ff] px-3.5 py-1 text-xs font-extrabold text-[#5b4b8a]">
          404 NOT FOUND
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-[#2e294e]">
          페이지를 찾을 수 없어요
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#6b6285]">
          주소가 잘못되었거나 사라진 페이지예요.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff8fb1] via-[#c79dff] to-[#8cc8ff] px-6 py-4 text-base font-extrabold text-white shadow-md shadow-purple-200/80 transition hover:scale-[1.01]"
        >
          홈으로 돌아가기
        </Link>
      </section>
    </div>
  );
}
