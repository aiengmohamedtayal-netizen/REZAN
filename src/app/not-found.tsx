import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#111111] px-5 text-center">
        <p className="text-[11px] text-[#B89A62]/70 tracking-[0.2em] mb-3 font-en">404</p>
        <h1 className="text-[28px] lg:text-[44px] font-semibold text-[#F7F3EA] mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          الصفحة غير موجودة
        </h1>
        <p className="text-[14px] text-[#888880] mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          يبدو أن هذه الصفحة لم تعد متاحة أو تم تغيير رابطها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <Link
            href="/"
            className="inline-flex items-center justify-center text-[13px] border border-[#F7F3EA]/30 text-[#F7F3EA] px-8 py-3.5 min-h-[46px] hover:bg-[#F7F3EA] hover:text-[#111111] transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/collection"
            className="inline-flex items-center justify-center text-[13px] bg-[#B89A62] text-[#111111] px-8 py-3.5 min-h-[46px] font-medium hover:bg-[#CDB48A] transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            اكتشف العطور
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
