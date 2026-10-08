import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products } from "@/data";
import { Search } from "lucide-react";

export const instant = false;

async function SearchResults({ searchParamsPromise }: { searchParamsPromise: Promise<{ q?: string }> }) {
  const searchParams = await searchParamsPromise;
  const q = (searchParams.q || "").trim().toLowerCase();

  const results = q
    ? products.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.olfactiveFamily.toLowerCase().includes(q) ||
          p.descriptionAr.toLowerCase().includes(q)
      )
    : [];

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          البحث في عطور ريزان
        </h1>
        <form method="GET" action="/search" className="flex items-center border border-[#E8E4DB] bg-white p-1.5 sm:p-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="ابحث بالاسم، العائلة العطرية (عود، عنبر، مسك)..."
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 min-h-[44px] text-[14px] text-[#1A1A1A] outline-none"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          />
          <button
            type="submit"
            className="bg-[#B89A62] text-[#111111] px-5 sm:px-6 py-2.5 min-h-[44px] text-[13px] font-medium hover:bg-[#CDB48A] transition-colors shrink-0 flex items-center justify-center"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            بحث
          </button>
        </form>
      </div>

      {q ? (
        results.length > 0 ? (
          <div>
            <p className="text-[14px] text-[#555550] mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              تم العثور على {results.length} نتيجة مطابقة لـ &quot;{q}&quot;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} light />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E8E4DB] p-16 text-center max-w-lg mx-auto">
            <Search size={44} strokeWidth={1} className="text-[#D0CCC4] mx-auto mb-4" />
            <h2 className="text-[18px] font-medium text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              لم نجد أي عطر يطابق بحثك
            </h2>
            <p className="text-[13px] text-[#888880] mb-6" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              جرب البحث بكلمات عامة مثل &quot;عود&quot;، &quot;عنبر&quot;، أو تصفح مجموعاتنا الكاملة.
            </p>
            <Link
              href="/collection"
              className="inline-block bg-[#111111] text-white text-[13px] px-8 py-3 hover:bg-black transition-colors"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              استكشف جميع العطور
            </Link>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-[14px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            أدخل كلمة بحث أعلاه للبدء في استكشاف تشكيلاتنا العطرية.
          </p>
        </div>
      )}
    </>
  );
}

export default function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-16 px-5 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <Suspense fallback={
            <div className="max-w-[1440px] mx-auto px-5 py-20 text-center">
              <p className="text-[14px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                جاري تحميل نتائج البحث...
              </p>
            </div>
          }>
            <SearchResults searchParamsPromise={props.searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
