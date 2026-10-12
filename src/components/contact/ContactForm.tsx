"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { submitContactMessageAction } from "@/server/actions/contact";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);

    try {
      await submitContactMessageAction(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#1A1A1A] border border-[#B89A62]/40 p-8 rounded-xs text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center mx-auto border border-[#B89A62]/30">
          <CheckCircle size={28} />
        </div>
        <h3 className="text-[20px] font-semibold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          تم استلام استفسارك بنجاح
        </h3>
        <p className="text-[14px] text-[#A09C94] max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          شكرًا لتواصلك مع دار ريزان. سيقوم مستشار العطور وخدمة العملاء بالرد عليك عبر البريد الإلكتروني أو الهاتف في أقرب وقت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-[12px] text-[#888] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            الاسم الكريم <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            required
            className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white text-[#111]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          />
        </div>

        <div>
          <label className="block text-[12px] text-[#888] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            البريد الإلكتروني <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            required
            dir="ltr"
            className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white text-[#111] font-en"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-[12px] text-[#888] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            رقم الهاتف للتواصل
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+20 100 ..."
            dir="ltr"
            className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white text-[#111]"
          />
        </div>

        <div>
          <label className="block text-[12px] text-[#888] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            موضوع الاستفسار
          </label>
          <input
            type="text"
            name="subject"
            placeholder="استفسار عن التوفر / طلب إهداء خاص"
            className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white text-[#111]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          />
        </div>
      </div>

      <div>
        <label className="block text-[12px] text-[#888] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          نص الرسالة أو الاستفسار <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          placeholder="اكتب رسالتك واستفسارك هنا..."
          rows={5}
          required
          className="w-full border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white text-[#111]"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full min-h-[48px] bg-[#1A1A1A] text-white py-3.5 text-[14px] font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
      >
        <Send size={15} />
        <span>{isPending ? "جاري الإرسال..." : "إرسال الرسالة إلى كونسيرج الدار"}</span>
      </button>
    </form>
  );
}
