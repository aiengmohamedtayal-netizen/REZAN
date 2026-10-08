"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products, giftSets, formatEGP } from "@/data";
import { Sparkles, Heart, PackageCheck, ArrowLeft } from "lucide-react";

export default function GiftsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const giftCategories = [
    { id: "all", labelAr: "جميع الهدايا" },
    { id: "luxury", labelAr: "هدايا فاخرة" },
    { id: "men", labelAr: "هدايا للرجال" },
    { id: "women", labelAr: "هدايا للنساء" },
    { id: "occasions", labelAr: "هدايا المناسبات" },
  ];

  // Curated products based on selection
  const curatedProducts = products.filter((p) => {
    if (selectedCategory === "men") return p.gender === "male";
    if (selectedCategory === "women") return p.gender === "female";
    if (selectedCategory === "luxury") return p.sizes[0].price >= 3000;
    if (selectedCategory === "occasions") return p.isBestSeller;
    return true;
  }).slice(0, 8);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] text-[#111111]">
        {/* ─── 1. HERO SECTION ─────────────────────────────────────────── */}
        <section className="pt-16 pb-16 lg:pt-24 lg:pb-20 px-5 lg:px-12 border-b border-[#E8E4DB] bg-white">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="inline-block text-[11px] lg:text-[12px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en mb-4">
              REZAN GIFTING
            </span>

            <h1
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold text-[#1A1A1A] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              الهدايا
            </h1>

            <p
              className="text-[20px] sm:text-[24px] lg:text-[26px] text-[#B89A62] font-medium mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              هدايا تُترك أثرًا
            </p>

            <p
              className="text-[15px] sm:text-[16px] text-[#555550] max-w-xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              اختيارات صيغت لتمنح اللحظة معنى، وتترك أثرًا يتجاوز المناسبة. كل هدية من ريزان تأتي مغلفة بعناية تليق بذائقتكم الرفيعة.
            </p>

            <a
              href="#gift-sets"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F7F3EA] px-8 py-3.5 text-[14px] font-medium hover:bg-black transition-colors shadow-sm"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              اكتشف أطقم الهدايا
              <ArrowLeft size={16} />
            </a>
          </div>
        </section>

        {/* ─── 2. CURATED GIFT COFFRETS / SETS ─────────────────────────── */}
        <section id="gift-sets" className="py-20 lg:py-24 px-5 lg:px-12 border-b border-[#E8E4DB]">
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
                EXCLUSIVE COFFRETS
              </span>
              <h2
                className="text-[28px] sm:text-[36px] font-semibold text-[#1A1A1A] mt-2 mb-3"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                أطقم ومجموعات الهدايا الخاصة
              </h2>
              <p
                className="text-[14px] text-[#555550]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                توليفات مختارة بعناية تجمع بين العطور الاستثنائية والزيوت المعتقة في صناديق مخملية فاخرة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {giftSets.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white border border-[#E8E4DB] rounded-[12px] overflow-hidden shadow-sm hover:border-[#B89A62]/50 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-[#FAF8F3] overflow-hidden">
                    <Image
                      src={gift.image}
                      alt={gift.nameAr}
                      fill
                      className="object-contain p-6 transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 start-4 bg-[#B89A62] text-[#111111] px-3 py-1 text-[11px] font-semibold rounded-sm">
                      إصدار إهداء فاخر
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className="text-[20px] font-semibold text-[#1A1A1A]"
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          {gift.nameAr}
                        </h3>
                        <div className="text-end">
                          <span
                            className="text-[18px] font-bold text-[#B89A62]"
                            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                          >
                            {formatEGP(gift.price)}
                          </span>
                          {gift.originalPrice && (
                            <span className="block text-[12px] text-[#888880] line-through font-en">
                              {formatEGP(gift.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[12px] text-[#888880] font-en mb-3">{gift.nameEn}</p>

                      <p
                        className="text-[14px] text-[#555550] leading-relaxed mb-6"
                        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                      >
                        {gift.descriptionAr}
                      </p>

                      {/* Included contents */}
                      <div className="bg-[#FAF8F3] p-4 rounded-sm border border-[#E8E4DB] mb-6">
                        <span
                          className="block text-[11px] font-semibold text-[#1A1A1A] mb-2"
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          محتويات الطقم:
                        </span>
                        <ul className="space-y-1.5 text-[12px] text-[#666660]">
                          {gift.includedProducts.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-[#B89A62]">◆</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="w-full text-center bg-[#1A1A1A] text-white py-3.5 text-[14px] font-medium hover:bg-black transition-colors rounded-sm"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      طلب الهدية الآن
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. CURATED INDIVIDUAL PERFUMES ──────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#E8E4DB]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
                CURATED SELECTION
              </span>
              <h2
                className="text-[26px] sm:text-[36px] font-semibold text-[#1A1A1A] mt-2 mb-3"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                عطور ملهمة للإهداء
              </h2>
              <p
                className="text-[14px] text-[#555550]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                اختر الفئة الأنسب لمن تحب، ودع عبير ريزان يروي مشاعرك.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
              {giftCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 min-h-[44px] text-[13px] rounded-full transition-all flex items-center justify-center ${
                    selectedCategory === cat.id
                      ? "bg-[#1A1A1A] text-white font-medium shadow-sm"
                      : "bg-[#FAF8F3] text-[#555550] hover:bg-[#E8E4DB] border border-[#E8E4DB]"
                  }`}
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  {cat.labelAr}
                </button>
              ))}
            </div>

            {/* Product Grid with Refined Responsive Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {curatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} light />
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. THE GIFTING EXPERIENCE / PHILOSOPHY ─────────────────── */}
        <section className="py-20 lg:py-24 px-5 lg:px-12 bg-[#FAF8F3] border-b border-[#E8E4DB]">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-[12px] border border-[#E8E4DB] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F3] text-[#B89A62] flex items-center justify-center mx-auto mb-4">
                  <PackageCheck size={22} />
                </div>
                <h3
                  className="text-[16px] font-semibold text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  تغليف إهداء ملكي
                </h3>
                <p
                  className="text-[13px] text-[#666660] leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  تأتي كل هدية ملفوفة بورق حريري مميز داخل صندوق ريزان الفاخر والمزين برباط ساتان ذهبي.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[12px] border border-[#E8E4DB] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F3] text-[#B89A62] flex items-center justify-center mx-auto mb-4">
                  <Heart size={22} />
                </div>
                <h3
                  className="text-[16px] font-semibold text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  بطاقة إهداء مخصصة
                </h3>
                <p
                  className="text-[13px] text-[#666660] leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  نكتب رسالتكم الخاصة بخط يدوي أنيق على بطاقة مصممة خصيصاً لترافق عطركم المختار.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[12px] border border-[#E8E4DB] shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F3] text-[#B89A62] flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={22} />
                </div>
                <h3
                  className="text-[16px] font-semibold text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  عينات استكشاف مجانية
                </h3>
                <p
                  className="text-[13px] text-[#666660] leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  نرفق مع كل هدية عينة من نفس العطر ليتسنى للمهدى إليه تجربتها قبل فتح الزجاجة الأصلية.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. FINAL CTA ────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-12 bg-[#111111] text-[#F7F3EA] text-center">
          <div className="max-w-[700px] mx-auto">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en">
              MAISON SELECTION
            </span>
            <h2
              className="text-[28px] sm:text-[38px] font-semibold mt-3 mb-4"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              استكشف تشكيلات دار ريزان الكاملة
            </h2>
            <p
              className="text-[15px] text-[#F7F3EA]/70 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              عطور صيغت بحرفية استثنائية لتروي حكايات من الفخامة والأصالة.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 bg-[#B89A62] text-[#111111] px-10 py-4 text-[14px] font-medium hover:bg-[#CDB48A] transition-colors rounded-sm"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              استعراض كافة العطور
              <ArrowLeft size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
