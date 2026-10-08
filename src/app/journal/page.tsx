import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "مجلة ريزان | REZAN Journal",
  description: "مقالات حصرية تستكشف أسرار العطور، خامات التقطير، وثقافة الطيب في الشرق والغرب.",
};

export default function JournalPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA]">
        {/* Page Header */}
        <div className="border-b border-[#E8E4DB] bg-[#FAF8F3] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1240px] mx-auto text-center">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en">
              REZAN JOURNAL
            </span>
            <h1
              className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold text-[#1A1A1A] mt-2 mb-3"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              مجلة الدار
            </h1>
            <p
              className="text-[14px] sm:text-[15px] text-[#555550] leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              مقالات حصرية تستكشف أسرار العطور، خامات التقطير الطبيعية، وثقافة الطيب في الشرق والغرب.
            </p>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* Featured Article — Full Width Hero */}
          {featured && (
            <Link
              href={`/journal/${featured.slug}`}
              className="group relative mb-10 sm:mb-14 flex flex-col md:flex-row bg-white border border-[#E8E4DB] overflow-hidden hover:border-[#B89A62]/50 transition-all duration-300 block"
            >
              {/* Cover Image */}
              <div className="relative md:w-[55%] aspect-[16/9] md:aspect-auto overflow-hidden bg-[#E8E4D8] flex-shrink-0">
                <Image
                  src={featured.coverImage}
                  alt={featured.titleAr}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent md:block hidden" />
                <span className="absolute top-4 end-4 bg-[#111111]/80 backdrop-blur-xs text-[#B89A62] text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 font-en">
                  {featured.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p
                    className="text-[11px] text-[#888880] mb-3"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {featured.publishedAt} · {featured.readingTime}
                  </p>
                  <h2
                    className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold text-[#1A1A1A] group-hover:text-[#B89A62] transition-colors leading-snug mb-4"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {featured.titleAr}
                  </h2>
                  <p
                    className="text-[14px] sm:text-[15px] text-[#666660] leading-relaxed line-clamp-3"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {featured.excerptAr}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 mt-6 text-[13px] text-[#B89A62] font-medium group-hover:-translate-x-1 transition-transform duration-200"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  اقرأ المقال الكامل
                  <ArrowLeft size={14} />
                </span>
              </div>
            </Link>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group bg-white border border-[#E8E4DB] overflow-hidden hover:border-[#B89A62]/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E4D8]">
                  <Image
                    src={article.coverImage}
                    alt={article.titleAr}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-3 end-3 bg-[#111111]/80 backdrop-blur-xs text-[#B89A62] text-[10px] uppercase tracking-wider px-2.5 py-1 font-en">
                    {article.category}
                  </span>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div
                      className="flex items-center gap-2 text-[11px] text-[#888880] mb-2"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h2
                      className="text-[17px] sm:text-[18px] font-semibold text-[#1A1A1A] group-hover:text-[#B89A62] transition-colors leading-snug mb-2"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      {article.titleAr}
                    </h2>
                    <p
                      className="text-[13px] text-[#666660] line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      {article.excerptAr}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 mt-4 text-[12px] text-[#B89A62] font-medium group-hover:-translate-x-0.5 transition-transform duration-200"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    اقرأ المقال ←
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
