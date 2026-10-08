import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products } from "@/data";
import Link from "next/link";

export const instant = false;

import { CollectionFilters } from "./CollectionFilters";

async function CollectionGrid({ searchParamsPromise }: { searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await searchParamsPromise;
  const filter = searchParams.filter as string | undefined;
  const gender = searchParams.gender as string | undefined;
  const family = searchParams.family as string | undefined;
  const collectionSlug = searchParams.collection as string | undefined;

  let filteredProducts = [...products];

  if (filter === "new") filteredProducts = filteredProducts.filter((p) => p.isNew);
  if (filter === "bestsellers") filteredProducts = filteredProducts.filter((p) => p.isBestSeller);
  if (gender) filteredProducts = filteredProducts.filter((p) => p.gender === gender);
  if (family) filteredProducts = filteredProducts.filter((p) => p.olfactiveFamily.toLowerCase() === family.toLowerCase());
  if (collectionSlug) filteredProducts = filteredProducts.filter((p) => p.collection === collectionSlug);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-8">
      <div className="mb-6 sm:mb-10 text-center lg:text-start border-b border-[#E8E4DB] pb-4 sm:pb-6">
        <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-1 sm:mb-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          العطور
        </h1>
        <p className="text-[13px] sm:text-[14px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          {filteredProducts.length} عطر فاخر
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Filters (Mobile Drawer Trigger + Desktop Sticky Sidebar) */}
        <CollectionFilters
          currentGender={gender}
          currentFamily={family}
          currentFilter={filter}
          totalProducts={filteredProducts.length}
        />

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} light />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20 bg-white border border-[#E8E4DB] rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center">
              <p className="text-[14px] sm:text-[15px] text-[#555550] mb-6" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                لا توجد عطور مطابقة للفلاتر المحددة.
              </p>
              <Link
                href="/collection"
                className="btn-tactile inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[13px] px-8 py-3 min-h-[44px] hover:bg-black active:scale-[0.98] transition-all rounded-sm font-medium"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                مسح الفلاتر وعرض كافة العطور
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] pt-10 pb-20">
        <Suspense fallback={
          <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-8 pt-24 pb-20">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="h-96 bg-black/5 animate-pulse rounded-sm" />
              </div>
              <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-black/5 animate-pulse rounded-sm" />
                ))}
              </div>
            </div>
          </div>
        }>
          <CollectionGrid searchParamsPromise={props.searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
