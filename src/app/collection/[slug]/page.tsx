import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { getProductBySlug, products, reviews as allReviews } from "@/data";
import { Star, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.olfactiveFamily === product.olfactiveFamily || p.collection === product.collection))
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#FAF8F3] border-b border-[#E8E4DB] py-3 px-5 lg:px-12">
          <div className="max-w-[1440px] mx-auto text-[12px] text-[#888880] flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <Link href="/" className="hover:text-[#111111] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-[#111111] transition-colors">العطور</Link>
            <span>/</span>
            <span className="text-[#111111] font-medium">{product.nameAr}</span>
          </div>
        </div>

        {/* Top Product Section */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Gallery */}
          <div className="bg-[#F7F3EA] p-4 sm:p-8 lg:p-16 flex items-center justify-center min-h-[42vh] sm:min-h-[50vh] lg:min-h-[85vh] lg:border-e border-[#E8E4DB]">
            <div className="relative w-full max-w-[400px] lg:max-w-[440px] aspect-[4/5]">
              <Image
                src={product.images.primary}
                alt={product.images.alt}
                fill
                priority
                className="object-contain object-center transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-5 sm:p-8 lg:p-16 flex flex-col justify-center max-w-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
                {product.olfactiveFamily} • {product.gender === "unisex" ? "يونيسكس" : product.gender === "male" ? "رجالي" : "نسائي"}
              </span>
              {product.badge && (
                <span className="text-[10px] bg-[#111111] text-[#F7F3EA] px-2.5 py-0.5 tracking-wider uppercase font-en">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-[26px] sm:text-[34px] lg:text-[44px] font-semibold text-[#1A1A1A] mb-1 leading-tight break-words" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {product.nameAr}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#888880] mb-4 sm:mb-6 font-en">{product.nameEn}</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#B89A62]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#B89A62]" : "fill-transparent"} />
                ))}
              </div>
              <span className="text-[13px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                {product.rating} ({product.reviewCount} تقييم)
              </span>
            </div>

            <p className="text-[14px] sm:text-[15px] text-[#555550] leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {product.descriptionAr}
            </p>

            {/* Dynamic Add to Cart with live price update */}
            <AddToCartButton product={product} />

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#E8E4DB] text-center text-[12px] sm:text-[11px] text-[#666660]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <div className="flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:gap-1.5 p-2 bg-[#FAF8F3] sm:bg-transparent rounded-sm">
                <ShieldCheck size={18} className="text-[#B89A62] flex-shrink-0" />
                <span>أصلي ومضمون ١٠٠٪</span>
              </div>
              <div className="flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:gap-1.5 p-2 bg-[#FAF8F3] sm:bg-transparent rounded-sm">
                <RefreshCw size={18} className="text-[#B89A62] flex-shrink-0" />
                <span>إرجاع سلس خلال ١٤ يوم</span>
              </div>
              <div className="flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:gap-1.5 p-2 bg-[#FAF8F3] sm:bg-transparent rounded-sm">
                <Sparkles size={18} className="text-[#B89A62] flex-shrink-0" />
                <span>توصيل سريع لكافة مصر</span>
              </div>
            </div>

            {/* Olfactive Notes Pyramid */}
            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 border-t border-[#E8E4DB] pt-6 sm:pt-8">
              <h2 className="text-[15px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                الهرم العطري (Olfactive Pyramid)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-[#FAF8F3] border border-[#E8E4DB] p-3 sm:p-4 text-center rounded-sm">
                  <p className="text-[11px] text-[#B89A62] font-medium mb-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الافتتاحية</p>
                  <p className="text-[12px] text-[#333330] leading-snug" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{product.notes.top.join("، ")}</p>
                </div>
                <div className="bg-[#FAF8F3] border border-[#E8E4DB] p-3 sm:p-4 text-center rounded-sm">
                  <p className="text-[11px] text-[#B89A62] font-medium mb-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>القلب</p>
                  <p className="text-[12px] text-[#333330] leading-snug" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{product.notes.heart.join("، ")}</p>
                </div>
                <div className="bg-[#FAF8F3] border border-[#E8E4DB] p-3 sm:p-4 text-center rounded-sm">
                  <p className="text-[11px] text-[#B89A62] font-medium mb-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>القاعدة</p>
                  <p className="text-[12px] text-[#333330] leading-snug" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{product.notes.base.join("، ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-[#F7F3EA] py-12 sm:py-16 px-4 sm:px-5 lg:px-8 border-t border-[#E8E4DB]">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-8 sm:mb-10">
                <span className="text-[11px] text-[#B89A62] tracking-[0.2em] uppercase font-en">DISCOVERY</span>
                <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold text-[#1A1A1A] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  عطور قد تنال إعجابك
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} light />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Customer Reviews Section */}
        {productReviews.length > 0 && (
          <section className="bg-[#111111] py-12 sm:py-16 px-4 sm:px-5 lg:px-8 text-[#F7F3EA]">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[20px] sm:text-[24px] font-semibold mb-8 sm:mb-10 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                آراء العملاء عن {product.nameAr}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {productReviews.map((r) => (
                  <div key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 sm:p-6 rounded-sm">
                    <div className="flex gap-1 mb-2.5 sm:mb-3 text-[#B89A62]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? "fill-[#B89A62]" : "fill-transparent"} />
                      ))}
                    </div>
                    <p className="text-[13px] sm:text-[14px] leading-relaxed mb-4 text-[#F7F3EA]/90" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      &ldquo;{r.commentAr}&rdquo;
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {r.customerName} {r.verified && "✓ مشتري موثق"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
