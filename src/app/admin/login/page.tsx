"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REZAN_WORDMARK } from "@/config/brand";
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "@/server/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAdminAction(formData);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "فشل تسجيل الدخول");
        setLoading(false);
      }
    } catch {
      setError("حدث خطأ غير متوقع. يرجى المحاولة لاحقاً");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111111] text-[#F7F3EA] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-[#B89A62] selection:text-black">
      {/* Subtle Luxury Gradient Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B89A62]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
          <div className="mb-4">
            <Image
              src={REZAN_WORDMARK}
              alt="REZAN | ريزان"
              width={160}
              height={50}
              priority
              className="object-contain h-8 w-auto brightness-100"
            />
          </div>
          <p
            className="text-[11px] text-[#B89A62] tracking-[0.25em] uppercase font-en mb-1.5"
          >
            Maison de Parfum
          </p>
          <h1
            className="text-[20px] sm:text-[22px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            بوابة الإدارة المركزية
          </h1>
          <p
            className="text-[13px] text-[#888880] mt-1"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            منظومة تشغيل ومتابعة متجر ريزان للعطور الفاخرة
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 sm:p-8 rounded-sm shadow-2xl relative">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#2A2A2A] text-[12px] text-[#888880]">
            <ShieldCheck size={16} className="text-[#B89A62]" />
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              وصول آمن وموثق بفريق العمل
            </span>
          </div>

          {error && (
            <div
              className="mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded-xs text-red-200 text-[13px]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-[13px] text-[#C8C4BC] mb-1.5 font-medium"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="admin@rezan.com"
                  placeholder="admin@rezan.com"
                  className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[14px] px-4 py-3 ps-10 rounded-xs outline-none transition-colors font-en"
                  dir="ltr"
                />
                <Mail
                  size={16}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#888880]"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-[13px] text-[#C8C4BC] mb-1.5 font-medium"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  defaultValue="Rezan@2026!Admin"
                  placeholder="••••••••••••"
                  className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[14px] px-4 py-3 ps-10 rounded-xs outline-none transition-colors font-en"
                  dir="ltr"
                />
                <Lock
                  size={16}
                  className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#888880]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B89A62] text-[#111111] font-semibold py-3.5 px-6 min-h-[46px] rounded-xs hover:bg-[#CDB48A] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-[14px] disabled:opacity-50 mt-6 shadow-md"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول إلى المنظومة</span>
                  <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-6 pt-4 border-t border-[#252525] text-center">
            <p className="text-[11px] text-[#666660]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              بيانات الدخول التجريبية للنظام المدمج:
            </p>
            <p className="text-[11px] text-[#B89A62] font-mono mt-0.5" dir="ltr">
              admin@rezan.com / Rezan@2026!Admin
            </p>
          </div>
        </div>

        {/* Back to public store */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[13px] text-[#888880] hover:text-[#B89A62] transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            ← العودة إلى المتجر الرئيسي
          </Link>
        </div>
      </div>
    </main>
  );
}
