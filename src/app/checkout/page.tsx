"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEGP } from "@/data";
import { storeConfig } from "@/config/store";
import { ArrowRight, ShieldCheck, Truck, Lock, Loader2 } from "lucide-react";
import { RezanLogo } from "@/components/brand/RezanLogo";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  if (items.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F7F3EA] text-center px-5 py-20">
        <div className="max-w-md bg-white border border-[#E8E4DB] p-10 shadow-sm">
          <h1
            className="text-[24px] font-semibold text-[#111111] mb-3"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            حقيبة التسوق فارغة
          </h1>
          <p
            className="text-[14px] text-[#5C554D] mb-8"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            لم تقم بإضافة أي عطور إلى حقيبتك بعد.
          </p>
          <Link
            href="/collection"
            className="btn-tactile inline-flex min-h-[48px] items-center justify-center text-[14px] bg-[#B89A62] text-[#111111] font-medium px-8 py-3.5 hover:bg-[#CDB48A] active:scale-[0.98] transition-all"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            اكتشف العطور
          </Link>
        </div>
      </main>
    );
  }

  const shipping =
    subtotal >= storeConfig.shippingConfig.freeShippingThreshold
      ? 0
      : storeConfig.shippingConfig.fee;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#111111]">
      {/* Top Checkout Header */}
      <header className="border-b border-[#2A2A2A] bg-[#111111] py-5 px-5 lg:px-12 sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <RezanLogo size="sm" />
          <div
            className="flex items-center gap-2 text-[12px] text-[#F7F3EA]/70"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Lock size={14} className="text-[#B89A62]" />
            <span>إتمام طلب آمن ومشفّر</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)]">
        {/* LEFT COLUMN (In RTL, this is the main form column, 7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 lg:border-e border-[#E8E4DB] bg-white order-2 lg:order-1">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[13px] text-[#5C554D] hover:text-[#111111] mb-6 sm:mb-8 font-medium transition-colors min-h-[44px]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <ArrowRight size={14} className="rtl:rotate-0 ltr:rotate-180" /> العودة إلى حقيبة التسوق
          </Link>

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            {/* 1. Personal Information */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-3">
                <h2
                  className="text-[17px] sm:text-[18px] font-semibold text-[#111111]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  ١. البيانات الشخصية
                </h2>
                <span
                  className="text-[12px] text-[#777067]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  مطلوب
                </span>
              </div>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-[13px] font-medium text-[#111111] mb-1.5"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  الاسم الكامل
                </label>
                <input
                  id="checkout-name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="مثال: أحمد محمد"
                  className="w-full min-h-[46px] bg-white text-[#111111] placeholder:text-[#777067] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-[13px] font-medium text-[#111111] mb-1.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="checkout-email"
                    required
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    className="w-full min-h-[46px] bg-white text-[#111111] placeholder:text-[#777067] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors font-en text-start"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-[13px] font-medium text-[#111111] mb-1.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    رقم الهاتف المحمول
                  </label>
                  <input
                    id="checkout-phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                    placeholder="01012345678"
                    className="w-full min-h-[46px] bg-white text-[#111111] placeholder:text-[#777067] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors font-en text-start"
                  />
                </div>
              </div>
            </section>

            {/* 2. Shipping Address */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-3">
                <h2
                  className="text-[17px] sm:text-[18px] font-semibold text-[#111111]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  ٢. عنوان التوصيل داخل مصر
                </h2>
                <span
                  className="text-[12px] text-[#777067]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  جمهورية مصر العربية
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkout-gov"
                    className="block text-[13px] font-medium text-[#111111] mb-1.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    المحافظة
                  </label>
                  <select
                    id="checkout-gov"
                    required
                    defaultValue="cairo"
                    autoComplete="address-level1"
                    className="w-full min-h-[46px] bg-white text-[#111111] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    <option value="cairo">القاهرة</option>
                    <option value="giza">الجيزة</option>
                    <option value="alex">الإسكندرية</option>
                    <option value="mansoura">الدقهلية (المنصورة)</option>
                    <option value="sharqia">الشرقية (الزقازيق)</option>
                    <option value="other">محافظة أخرى</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-[13px] font-medium text-[#111111] mb-1.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    المدينة / الحي
                  </label>
                  <input
                    id="checkout-city"
                    required
                    type="text"
                    autoComplete="address-level2"
                    placeholder="مثال: المعادي / الشيخ زايد"
                    className="w-full min-h-[46px] bg-white text-[#111111] placeholder:text-[#777067] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-[13px] font-medium text-[#111111] mb-1.5"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  العنوان التفصيلي
                </label>
                <input
                  id="checkout-address"
                  required
                  type="text"
                  autoComplete="street-address"
                  placeholder="اسم الشارع، رقم العمارة، رقم الشقة أو علامة مميزة"
                  className="w-full min-h-[46px] bg-white text-[#111111] placeholder:text-[#777067] border border-[#D5D0C5] focus:border-[#B89A62] focus:ring-1 focus:ring-[#B89A62] px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed outline-none transition-colors"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>
            </section>

            {/* 3. Payment Method */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-3">
                <h2
                  className="text-[17px] sm:text-[18px] font-semibold text-[#111111]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  ٣. طريقة الدفع
                </h2>
                <span
                  className="text-[12px] text-[#777067]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  اختر وسيلة الدفع
                </span>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-all duration-200 active:scale-[0.99] min-h-[44px] ${
                    paymentMethod === "cod"
                      ? "border-[#B89A62] bg-[#FAF8F3] shadow-xs"
                      : "border-[#D5D0C5] bg-white hover:border-[#B89A62]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-[#B89A62] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span
                      className="block text-[14px] font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      الدفع عند الاستلام (Cash on Delivery)
                    </span>
                    <span
                      className="block text-[12px] text-[#5C554D] mt-0.5 leading-relaxed"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      ادفع نقدًا عند استلام طلبك بعد فحص الطرد.
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-all duration-200 active:scale-[0.99] min-h-[44px] ${
                    paymentMethod === "card"
                      ? "border-[#B89A62] bg-[#FAF8F3] shadow-xs"
                      : "border-[#D5D0C5] bg-white hover:border-[#B89A62]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 accent-[#B89A62] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span
                      className="block text-[14px] font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      البطاقة البنكية (تجريبي / Demo)
                    </span>
                    <span
                      className="block text-[12px] text-[#777067] mt-0.5 leading-relaxed"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      Visa / Mastercard / Meeza — تجريبي ولا يتم سحب مبالغ فعلية.
                    </span>
                  </div>
                </label>
              </div>
            </section>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-tactile w-full min-h-[50px] bg-[#1A1A1A] text-[#F7F3EA] text-[15px] font-medium py-3.5 px-6 hover:bg-black transition-all duration-200 active:scale-[0.98] disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#B89A62]" />
                    <span>جاري تأكيد الطلب...</span>
                  </>
                ) : (
                  <span>تأكيد الطلب — {formatEGP(total)}</span>
                )}
              </button>

              <div
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-[12px] text-[#777067]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#B89A62] shrink-0" />
                  <span>توصيل سريع ٢–٤ أيام</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#B89A62] shrink-0" />
                  <span>ضمان أصالة العطور ١٠٠٪</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-[#F7F3EA] p-4 sm:p-8 lg:p-12 border-b lg:border-b-0 border-[#E8E4DB] order-1 lg:order-2">
          <h2
            className="text-[17px] sm:text-[18px] font-semibold text-[#111111] mb-5 sm:mb-6 border-b border-[#E8E4DB] pb-3"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            ملخص الطلب ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h2>

          {/* Product Items List */}
          <div className="space-y-3 sm:space-y-4 mb-6 max-h-[35vh] lg:max-h-[45vh] overflow-y-auto pe-1">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.sizeMl}`}
                className="flex gap-3 sm:gap-4 items-center bg-white p-3 border border-[#E8E4DB] rounded-sm"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF8F3] border border-[#E8E4DB] flex items-center justify-center p-1 rounded-sm flex-shrink-0">
                  <Image
                    src={item.product.images.primary}
                    alt={item.product.nameAr}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                  <span className="absolute -top-1.5 -start-1.5 w-5 h-5 bg-[#1A1A1A] text-white text-[11px] font-medium rounded-full flex items-center justify-center font-en">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] sm:text-[14px] font-semibold text-[#111111] truncate"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {item.product.nameAr}
                  </p>
                  <p
                    className="text-[11px] text-[#5C554D] mt-0.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    الحجم: {item.sizeMl} مل
                  </p>
                </div>

                <span
                  className="text-[13px] sm:text-[14px] font-semibold text-[#111111] whitespace-nowrap"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  {formatEGP(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="border-t border-[#E8E4DB] py-4 sm:py-5 space-y-3 text-[13px] sm:text-[14px]">
            <div className="flex justify-between items-center text-[#5C554D]">
              <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                المجموع الفرعي
              </span>
              <span
                className="font-medium text-[#111111]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {formatEGP(subtotal)}
              </span>
            </div>

            <div className="flex justify-between items-center text-[#5C554D]">
              <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                الشحن والتوصيل
              </span>
              <span
                className="font-medium text-[#111111]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {shipping === 0 ? (
                  <span className="text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-sm text-[12px] font-semibold">
                    مجاني
                  </span>
                ) : (
                  formatEGP(shipping)
                )}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-[#E8E4DB] pt-4 sm:pt-5">
            <div className="flex justify-between items-baseline mb-1">
              <span
                className="text-[15px] sm:text-[16px] font-semibold text-[#111111]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                الإجمالي النهائي
              </span>
              <span
                className="text-[20px] sm:text-[24px] font-bold text-[#111111]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {formatEGP(total)}
              </span>
            </div>
            <p
              className="text-[11px] text-[#777067]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              الأسعار شاملة ضريبة القيمة المضافة والشحن داخل مصر.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
