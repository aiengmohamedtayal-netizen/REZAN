"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Package, Truck, Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderConfirmationPage() {
  const orderNumber = `EG-839215`;
  const estimatedDelivery = "خلال ٢–٤ أيام عمل";

  return (
    <>
      <Navbar />
      <main className="min-h-[90vh] bg-[#F7F3EA] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[560px]"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-[#B89A62]/10 border border-[#B89A62]/20 flex items-center justify-center">
                <CheckCircle2 size={44} className="text-[#B89A62]" strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h1
              className="text-[26px] sm:text-[30px] font-semibold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              تم تأكيد طلبك
            </h1>
            <p
              className="text-[14px] sm:text-[15px] text-[#555550] leading-relaxed"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              شكراً لتسوقك من ريزان. سنقوم بتجهيز طلبك وإرساله إليك قريباً.
            </p>
          </motion.div>

          {/* Order Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
            className="bg-white border border-[#E8E4DB] mb-6"
          >
            {/* Order Number */}
            <div className="px-6 py-5 border-b border-[#E8E4DB] flex items-center justify-between">
              <div>
                <p
                  className="text-[11px] text-[#888880] tracking-wide uppercase mb-1 font-en"
                >
                  Order Number / رقم الطلب
                </p>
                <p className="text-[17px] font-semibold text-[#1A1A1A] font-en tracking-wide">
                  {orderNumber}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#F7F3EA] flex items-center justify-center">
                <Package size={20} className="text-[#B89A62]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Steps */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    تم استلام الطلب
                  </p>
                  <p
                    className="text-[12px] text-[#888880] mt-0.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    طريقة الدفع: الدفع عند الاستلام (COD)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#F7F3EA] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck size={16} className="text-[#B89A62]" strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    جاري التحضير والشحن
                  </p>
                  <p
                    className="text-[12px] text-[#888880] mt-0.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    سنرسل لك رقم التتبع فور شحن الطلب
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-40">
                <div className="w-8 h-8 bg-[#F7F3EA] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#888880]" strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    التوصيل المتوقع
                  </p>
                  <p
                    className="text-[12px] text-[#888880] mt-0.5"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F7F3EA] border-t border-[#E8E4DB]">
              <p
                className="text-[11px] text-[#888880]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                * هذه صفحة تأكيد تجريبية — لم يتم إنشاء طلب حقيقي.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
            className="space-y-3"
          >
            <Link
              href="/collection"
              className="btn-tactile flex items-center justify-center gap-2 w-full min-h-[50px] text-[14px] font-medium bg-[#1A1A1A] text-white hover:bg-black active:scale-[0.98] transition-all"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <span>استكشف المزيد من العطور</span>
              <ArrowLeft size={15} />
            </Link>
            <Link
              href="/"
              className="btn-tactile flex items-center justify-center w-full min-h-[46px] text-[13px] text-[#555550] hover:text-[#1A1A1A] border border-[#E8E4DB] hover:border-[#1A1A1A] bg-white active:scale-[0.98] transition-all"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
