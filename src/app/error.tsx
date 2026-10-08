"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7F3EA] px-5 text-center">
        <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          حدث خطأ غير متوقع
        </h1>
        <p className="text-[14px] text-[#555550] mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          نعتذر، واجهنا مشكلة أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center text-[13px] border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 min-h-[46px] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            حاول مرة أخرى
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center text-[13px] bg-[#B89A62] text-[#111111] px-8 py-3.5 min-h-[46px] font-medium hover:bg-[#CDB48A] transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
