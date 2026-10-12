"use client";

import { useState } from "react";
import { Star, CheckCircle, MessageSquarePlus, Sparkles } from "lucide-react";
import { submitCustomerReviewAction } from "@/server/actions/public-reviews";

export function CustomerReviewForm({
  productId,
  productSlug,
  productNameAr,
}: {
  productId: string;
  productSlug: string;
  productNameAr: string;
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set("productId", productId);
    formData.set("slug", productSlug);
    formData.set("rating", String(rating));

    try {
      await submitCustomerReviewAction(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#1A1A1A] border border-[#B89A62]/40 p-6 rounded-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center mx-auto border border-[#B89A62]/30">
          <CheckCircle size={24} />
        </div>
        <h4 className="text-[17px] font-semibold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          شكرًا لمشاركتك انطباعك العطري
        </h4>
        <p className="text-[13px] text-[#A09C94] max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          تم استلام تقييمك لعطر <strong>{productNameAr}</strong> بنجاح. سيتم مراجعته واعتماده من قبل خبراء دار ريزان ونشره فوراً.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#161616] border border-[#2A2A2A] p-6 rounded-xs space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-[#242424]">
        <Sparkles size={16} className="text-[#B89A62]" />
        <h3 className="text-[16px] font-bold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          شاركنا تجربتك وانطباعك العطري عن {productNameAr}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating Selector */}
        <div>
          <label className="block text-[12px] text-[#A09C94] mb-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            تقييمك للعطر (من ١ إلى ٥ نجوم)
          </label>
          <div className="flex items-center gap-1.5" dir="ltr">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110 cursor-pointer focus:outline-none"
              >
                <Star
                  size={20}
                  className={`transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-[#B89A62] text-[#B89A62]"
                      : "fill-transparent text-[#444]"
                  }`}
                />
              </button>
            ))}
            <span className="text-[12px] font-mono text-[#B89A62] ms-2">
              {hoverRating || rating} / 5
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              الاسم الكريم <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              placeholder="مثال: فيصل بن عبدالعزيز"
              required
              className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3.5 py-2.5 rounded-xs outline-none"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              البريد الإلكتروني (لتوثيق الشراء)
            </label>
            <input
              type="email"
              name="customerEmail"
              placeholder="name@example.com"
              dir="ltr"
              className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3.5 py-2.5 rounded-xs outline-none font-en"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            انطباعك عن فوحان وثبات وعبير العطر <span className="text-red-400">*</span>
          </label>
          <textarea
            name="commentAr"
            rows={3}
            placeholder="اكتب هنا تجربتك مع العطر، ثباته، وتميز نوتاته الشرقية..."
            required
            className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-3 rounded-xs outline-none leading-relaxed"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[13px] px-6 py-2.5 rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        >
          <MessageSquarePlus size={16} />
          <span>{isPending ? "جاري الإرسال..." : "إرسال التقييم للمراجعة"}</span>
        </button>
      </form>
    </div>
  );
}
