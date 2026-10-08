import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { collections } from "@/data";

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-16 px-5 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en">
              MAISON COLLECTIONS
            </span>
            <h1 className="text-[32px] lg:text-[44px] font-semibold text-[#1A1A1A] mt-2 mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              مجموعات ريزان الفاخرة
            </h1>
            <p className="text-[15px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              عطور مصممة لتروي حكايات من التراث والتميز، مقسمة بعناية لتناسب كل الأذواق واللحظات الخاصة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative h-[300px] sm:h-[360px] lg:h-[460px] overflow-hidden bg-[#111111] border border-[#E8E4DB] flex items-end p-5 sm:p-8"
              >
                <Image
                  src={col.image}
                  alt={col.nameAr}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="relative z-10 text-white">
                  <span className="text-[10px] text-[#B89A62] tracking-widest uppercase font-en">{col.nameEn}</span>
                  <h2 className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold mt-1 mb-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    {col.nameAr}
                  </h2>
                  <p className="text-[12px] sm:text-[13px] text-white/70 max-w-md line-clamp-2 leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    {col.descriptionAr}
                  </p>
                  <span className="inline-block mt-3 sm:mt-4 text-[12px] text-[#B89A62] font-medium group-hover:underline underline-offset-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    استكشف المجموعة ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
