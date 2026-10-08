import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { bestSellers, newArrivals, collections, reviews } from "@/data";
import { MotionSection, MotionStaggerGroup, MotionItem, MotionImageReveal } from "@/components/ui/MotionPrimitives";

// ─── Promotional strip ─────────────────────────────────────────────────────────
export function PromoStrip() {
  return (
    <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x md:divide-[#2A2A2A] rtl:md:divide-x-reverse">
        {[
          { icon: "✦", text: "شحن مجاني للطلبات بقيمة ٢٥٠٠ ج.م وأكثر" },
          { icon: "◈", text: "مكونات مختارة من أرقى المصادر العالمية" },
          { icon: "◇", text: "ضمان الرضا التام أو الاسترداد الكامل" },
        ].map((item) => (
          <div key={item.text} className="flex items-center justify-center gap-2.5 py-2 md:py-0">
            <span className="text-[#B89A62] text-[10px]">{item.icon}</span>
            <span className="text-[12px] text-[#F7F3EA]/70" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Category tiles ────────────────────────────────────────────────────────────
const categories = [
  { labelAr: "العطور", labelEn: "Fragrances", href: "/collection", bg: "from-[#2A2015] to-[#111]" },
  { labelAr: "المجموعات", labelEn: "Collections", href: "/collection?filter=collections", bg: "from-[#1A1F2A] to-[#111]" },
  { labelAr: "الجديد", labelEn: "New Arrivals", href: "/collection?filter=new", bg: "from-[#1F1A2A] to-[#111]" },
  { labelAr: "الهدايا", labelEn: "Gift Sets", href: "/collection?filter=bestsellers", bg: "from-[#2A1A15] to-[#111]" },
  { labelAr: "الأكثر مبيعاً", labelEn: "Best Sellers", href: "/collection?filter=bestsellers", bg: "from-[#1A2A1A] to-[#111]" },
];

export function CategoryTiles() {
  return (
    <div className="bg-[#111111] py-6 sm:py-8 px-4 sm:px-5 lg:px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {categories.map((cat, index) => (
          <Link
            key={cat.href + cat.labelAr}
            href={cat.href}
            className={`relative group h-20 sm:h-24 lg:h-32 flex flex-col items-center justify-center bg-gradient-to-b ${cat.bg} border border-[#2A2A2A] hover:border-[#B89A62]/50 transition-colors overflow-hidden ${
              index === 4 ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
            }`}
          >
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#F7F3EA] group-hover:text-[#B89A62] transition-colors text-center px-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {cat.labelAr}
            </p>
            <p className="text-[9px] text-[#F7F3EA]/40 mt-1 uppercase tracking-widest font-en">{cat.labelEn}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SH({ ar, en, viewHref, ivory = false }: { ar: string; en: string; viewHref: string; ivory?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-6">
      <div>
        <p className={`text-[10px] sm:text-[11px] tracking-[0.18em] mb-1 sm:mb-1.5 ${ivory ? "text-[#888880]" : "text-[#B89A62]/70"}`}
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{en}</p>
        <h2 className={`text-[20px] sm:text-[24px] lg:text-[28px] font-semibold leading-tight ${ivory ? "text-[#1A1A1A]" : "text-[#F7F3EA]"}`}
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{ar}</h2>
      </div>
      <Link href={viewHref}
        className={`text-[12px] border px-4 sm:px-5 py-2 min-h-[38px] flex items-center justify-center transition-colors whitespace-nowrap ${ivory
          ? "border-[#1A1A1A]/30 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
          : "border-[#B89A62]/40 text-[#B89A62] hover:bg-[#B89A62] hover:text-[#111111]"}`}
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
        عرض الكل
      </Link>
    </div>
  );
}

// ─── Best Sellers ──────────────────────────────────────────────────────────────
export function BestSellersSection() {
  return (
    <MotionSection className="bg-[#111111] py-10 sm:py-14 px-4 sm:px-5 lg:px-8 border-t border-[#1E1E1E]">
      <div className="max-w-[1440px] mx-auto">
        <SH ar="الأكثر مبيعاً" en="BEST SELLERS" viewHref="/collection?filter=bestsellers" />
        <MotionStaggerGroup className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {bestSellers.map((p) => (
            <MotionItem key={p.id}>
              <ProductCard product={p} />
            </MotionItem>
          ))}
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── New Arrivals ──────────────────────────────────────────────────────────────
export function NewArrivalsSection() {
  return (
    <MotionSection className="bg-[#F7F3EA] py-10 sm:py-14 px-4 sm:px-5 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <SH ar="وصل حديثاً" en="NEW ARRIVALS" viewHref="/collection?filter=new" ivory />
        <MotionStaggerGroup className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {newArrivals.map((p) => (
            <MotionItem key={p.id}>
              <ProductCard product={p} light />
            </MotionItem>
          ))}
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── Featured Collection Banner ────────────────────────────────────────────────
export function FeaturedCollectionBanner() {
  return (
    <MotionSection className="relative w-full overflow-hidden min-h-[300px] h-[320px] sm:h-[360px] lg:h-[400px] bg-[#0D0D0D]">
      <Image src="/images/rezan/collections/oud-attar-golden-prayer-beads.png" alt="مجموعة ريزان" fill className="object-cover object-center opacity-40" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-[#0D0D0D]/60" />
      <MotionStaggerGroup className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <MotionItem className="text-[10px] sm:text-[11px] text-[#B89A62]/80 tracking-[0.25em] mb-3 sm:mb-4 uppercase" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>المجموعة المميزة</MotionItem>
        <MotionItem className="text-[24px] sm:text-[34px] lg:text-[44px] font-semibold text-white mb-2 sm:mb-3 leading-tight break-words" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          مجموعة عود النور
        </MotionItem>
        <MotionItem className="text-[13px] sm:text-[14px] text-white/70 max-w-md mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          أرقى عطور العود — مُقطّرة بحرفية وموجّهة لمن يؤمن أن العطر هوية.
        </MotionItem>
        <MotionItem>
          <Link href="/collection?collection=oud"
            className="inline-flex items-center justify-center text-[13px] bg-[#B89A62] text-[#111111] px-8 sm:px-10 py-3.5 min-h-[48px] font-medium hover:bg-[#CDB48A] transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            اكتشف المجموعة
          </Link>
        </MotionItem>
      </MotionStaggerGroup>
    </MotionSection>
  );
}

// ─── Collections Grid ──────────────────────────────────────────────────────────
export function CollectionsSection() {
  return (
    <MotionSection className="bg-[#111111] py-10 sm:py-14 px-4 sm:px-5 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <SH ar="مجموعاتنا" en="COLLECTIONS" viewHref="/collection" />
        <MotionStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {collections.map((col) => (
            <MotionItem key={col.id}>
              <Link href={`/collection?collection=${col.slug}`}
                className="group relative overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#B89A62]/40 transition-colors block h-full">
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <Image src={col.image} alt={col.nameAr} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/30 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-[15px] font-medium text-[#F7F3EA] group-hover:text-[#B89A62] transition-colors" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    {col.nameAr}
                  </p>
                  <p className="text-[11px] text-[#888880] mt-0.5 uppercase tracking-wide font-en">{col.nameEn}</p>
                  {col.productCount && (
                    <p className="text-[11px] text-[#B89A62]/60 mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{col.productCount} عطر</p>
                  )}
                </div>
              </Link>
            </MotionItem>
          ))}
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── Olfactive Families / Discovery ───────────────────────────────────────────
const families = [
  { ar: "خشبي", en: "Woody", color: "#4A3728" },
  { ar: "شرقي", en: "Oriental", color: "#3D2810" },
  { ar: "زهري", en: "Floral", color: "#3D2835" },
  { ar: "دافئ", en: "Warm", color: "#3D3010" },
  { ar: "منعش", en: "Fresh", color: "#10303D" },
  { ar: "مسك", en: "Musky", color: "#2A2A2A" },
];

export function DiscoverySection() {
  return (
    <MotionSection className="bg-[#0D0D0D] py-10 sm:py-12 px-4 sm:px-5 lg:px-8 border-t border-[#1E1E1E]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-[11px] text-[#B89A62]/70 tracking-[0.18em] mb-1.5 sm:mb-2 uppercase" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>اكتشف بحسب العائلة العطرية</p>
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>ابحث عن عطرك</h2>
        </div>
        <MotionStaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
          {families.map((f) => (
            <MotionItem key={f.en}>
              <Link href={`/collection?family=${f.en}`}
                className="group flex flex-col items-center justify-center h-18 sm:h-20 border border-[#2A2A2A] hover:border-[#B89A62]/50 transition-colors w-full min-h-[44px]"
                style={{ backgroundColor: f.color }}>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#F7F3EA] group-hover:text-[#B89A62] transition-colors" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{f.ar}</p>
                <p className="text-[10px] text-[#F7F3EA]/40 mt-0.5 uppercase tracking-wide font-en">{f.en}</p>
              </Link>
            </MotionItem>
          ))}
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── Maison Story ──────────────────────────────────────────────────────────────
export function MaisonStorySection() {
  return (
    <MotionSection className="bg-[#F7F3EA] py-14 sm:py-20 px-4 sm:px-5 lg:px-8 border-t border-[#E8E4DB]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* On desktop RTL: order-1 renders on the RIGHT (first column), taking ~50% width */}
        <MotionImageReveal className="order-2 lg:order-1 lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#E8E4D8] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/rezan/heritage/rezan-heritage-fragrance.png"
            alt="عطور ريزان - إرث العطور المصرية العريقة"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </MotionImageReveal>

        {/* On desktop RTL: order-2 renders on the LEFT (second column), taking ~45% width */}
        <MotionStaggerGroup className="order-1 lg:order-2 lg:col-span-6 max-w-xl">
          <MotionItem className="text-[10px] sm:text-[11px] text-[#888880] tracking-[0.2em] mb-3 sm:mb-4 uppercase font-en">The Maison</MotionItem>
          <MotionItem className="text-[24px] sm:text-[32px] lg:text-[38px] font-semibold text-[#1A1A1A] leading-snug mb-3 sm:mb-5 break-words" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            دار عطور تُعبّر عن هوية لا تُقلَّد
          </MotionItem>
          <MotionItem className="text-[14px] sm:text-[15px] text-[#555550] leading-relaxed sm:leading-loose mb-6 sm:mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            ريزان دار عطور تجمع بين حرفية العطور الأوروبية وأصالة المكونات العربية، كل عطر يُصنع بمكونات مختارة بعناية ويُعبّر عن قصة تستحق أن تُروى.
          </MotionItem>
          <MotionItem>
            <Link href="/about"
              className="inline-flex items-center justify-center text-[13px] border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 min-h-[44px] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              عن ريزان
            </Link>
          </MotionItem>
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── Reviews ───────────────────────────────────────────────────────────────────
export function ReviewsSection() {
  return (
    <MotionSection className="bg-[#111111] py-10 sm:py-14 px-4 sm:px-5 lg:px-8 border-t border-[#1E1E1E]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-[11px] text-[#B89A62]/70 tracking-[0.18em] mb-1.5 sm:mb-2 uppercase" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>آراء موثقة</p>
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>ماذا يقول عملاؤنا</h2>
        </div>
        <MotionStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {reviews.slice(0, 6).map((r) => (
            <MotionItem key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 sm:p-5 rounded-sm">
              <div className="flex gap-0.5 mb-2.5 sm:mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24"
                    className={s <= r.rating ? "fill-[#B89A62]" : "fill-[#2A2A2A]"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#F7F3EA]/80 leading-relaxed mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                &ldquo;{r.commentAr}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#B89A62]/20 rounded-full flex items-center justify-center text-[#B89A62] text-[10px] font-bold">
                  {r.customerName[0]}
                </div>
                <p className="text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{r.customerName}</p>
                {r.verified && <span className="text-[10px] text-[#B89A62]/60" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>✓ مشتري موثق</span>}
              </div>
            </MotionItem>
          ))}
        </MotionStaggerGroup>
      </div>
    </MotionSection>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────
export function NewsletterSection() {
  return (
    <MotionSection className="bg-[#1A1A1A] py-12 sm:py-16 px-4 sm:px-5 lg:px-8 border-t border-[#2A2A2A]">
      <MotionStaggerGroup className="max-w-xl mx-auto text-center">
        <MotionItem className="text-[10px] sm:text-[11px] text-[#B89A62]/70 tracking-[0.2em] mb-2 sm:mb-3 uppercase" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>النشرة البريدية</MotionItem>
        <MotionItem className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#F7F3EA] mb-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          ادخل عالم ريزان
        </MotionItem>
        <MotionItem className="text-[13px] sm:text-[14px] text-[#888880] mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          كن أول من يعرف بالإصدارات الجديدة والعروض الحصرية.
        </MotionItem>
        <MotionItem>
          <form className="flex flex-col sm:flex-row max-w-sm mx-auto gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              required
              dir="ltr"
              className="flex-1 min-w-0 bg-[#111111] border border-[#2A2A2A] sm:border-e-0 px-4 py-3 min-h-[44px] text-[13px] text-[#F7F3EA] placeholder:text-[#555550] focus:outline-none focus:border-[#B89A62] transition-colors font-en"
            />
            <button type="submit"
              className="bg-[#B89A62] text-[#111111] text-[13px] font-medium px-6 py-3 min-h-[44px] flex items-center justify-center hover:bg-[#CDB48A] transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              اشترك
            </button>
          </form>
        </MotionItem>
      </MotionStaggerGroup>
    </MotionSection>
  );
}
