import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { collections, products } from "@/data";

export default async function SingleCollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const col = collections.find((c) => c.slug === params.slug);

  if (!col) {
    notFound();
  }

  const collectionProducts = products.filter((p) => p.collection === col.slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
              COLLECTION
            </span>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-[#1A1A1A] mt-2 mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {col.nameAr}
            </h1>
            <p className="text-[14px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {col.descriptionAr}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} light />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
