"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/lib/cart";
import { formatEGP } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, increment, decrement, totalItems, subtotal } = useCart();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-10 sm:py-14 px-4 sm:px-5 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            حقيبة التسوق ({totalItems})
          </h1>

          {items.length === 0 ? (
            <div className="bg-white border border-[#E8E4DB] p-8 sm:p-16 flex flex-col items-center justify-center text-center rounded-sm">
              <ShoppingBag size={48} strokeWidth={1} className="text-[#D0CCC4] mb-4" />
              <p className="text-[15px] sm:text-[16px] text-[#555550] mb-6" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>حقيبتك فارغة</p>
              <Link href="/collection"
                className="btn-tactile text-[13px] bg-[#B89A62] text-[#111111] px-8 py-3.5 min-h-[44px] inline-flex items-center justify-center hover:bg-[#CDB48A] active:scale-[0.98] transition-all rounded-sm font-medium"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                اكتشف المجموعة
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white border border-[#E8E4DB] rounded-sm overflow-hidden">
                  <ul className="divide-y divide-[#E8E4DB]">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={`${item.product.id}-${item.sizeMl}`}
                          initial={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.22, ease: "easeInOut" } }}
                          className="flex gap-3 sm:gap-4 p-3.5 sm:p-5"
                        >
                          <div className="w-16 h-20 sm:w-20 sm:h-24 bg-[#F0EDE6] flex-shrink-0 overflow-hidden flex items-center justify-center p-1 rounded-sm">
                            <Image src={item.product.images.primary} alt={item.product.images.alt} width={80} height={96} className="object-contain w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <Link href={`/collection/${item.product.slug}`} className="text-[14px] sm:text-[15px] font-medium text-[#1A1A1A] hover:text-[#B89A62] transition-colors break-words" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                                  {item.product.nameAr}
                                </Link>
                                <p className="text-[11px] sm:text-[12px] text-[#888880] mt-0.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الحجم: {item.sizeMl} مل</p>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id, item.sizeMl)}
                                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#C8C4BC] hover:text-[#1A1A1A] active:scale-90 transition-transform p-1"
                                aria-label={`حذف ${item.product.nameAr}`}
                              >
                                <X size={18} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                              <div className="flex items-center border border-[#E8E4DB] rounded-sm bg-[#FAF8F5]">
                                <button
                                  onClick={() => decrement(item.product.id, item.sizeMl)}
                                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#B89A62] active:scale-90 transition-transform text-[16px]"
                                  aria-label="تقليل الكمية"
                                >
                                  −
                                </button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ opacity: 0, y: -3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="px-2 text-[14px] font-medium text-[#1A1A1A] w-8 text-center tabular-nums"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  onClick={() => increment(item.product.id, item.sizeMl)}
                                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#B89A62] active:scale-90 transition-transform text-[16px]"
                                  aria-label="زيادة الكمية"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-[14px] font-semibold text-[#1A1A1A] whitespace-nowrap" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                                {formatEGP(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white border border-[#E8E4DB] p-5 sm:p-6 sticky top-24 rounded-sm">
                  <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-4 sm:mb-6" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>ملخص الطلب</h2>
                  <div className="space-y-3.5 mb-6">
                    <div className="flex justify-between text-[14px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      <span>المجموع الفرعي</span>
                      <span>{formatEGP(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      <span>الشحن</span>
                      <span>يُحسب في الخطوة التالية</span>
                    </div>
                  </div>
                  <div className="border-t border-[#E8E4DB] pt-4 mb-6 sm:mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الإجمالي المتوقع</span>
                      <span className="text-[18px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{formatEGP(subtotal)}</span>
                    </div>
                    <p className="text-[11px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>شامل ضريبة القيمة المضافة</p>
                  </div>
                  <Link href="/checkout"
                    className="btn-tactile block w-full text-center bg-[#1A1A1A] text-white text-[14px] py-3.5 min-h-[48px] flex items-center justify-center hover:bg-black active:scale-[0.98] transition-all rounded-sm font-medium"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    متابعة الدفع
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
