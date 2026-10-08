import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticleBySlug } from "@/data";

export default async function ArticleDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <article className="max-w-[840px] mx-auto py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link href="/journal" className="inline-flex items-center text-[12px] text-[#888880] hover:text-[#B89A62] mb-4 transition-colors min-h-[44px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              ← العودة إلى مجلة الدار
            </Link>
            <span className="block text-[11px] text-[#B89A62] tracking-[0.25em] uppercase font-en mb-2">
              {article.category}
            </span>
            <h1 className="text-[26px] sm:text-[34px] lg:text-[44px] font-semibold text-[#1A1A1A] leading-tight mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {article.titleAr}
            </h1>
            <p className="text-[13px] text-[#888880] font-en">{article.titleEn}</p>
            <div className="flex items-center justify-center gap-4 text-[12px] text-[#888880] mt-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span>{article.publishedAt}</span>
              <span>•</span>
              <span>{article.readingTime}</span>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] mb-8 sm:mb-12 bg-[#F0EDE6] rounded-[12px] overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.titleAr}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 840px) 100vw, 840px"
            />
          </div>

          <div className="text-[15px] sm:text-[16px] text-[#333330] leading-[2] space-y-6 text-justify" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <p className="text-[17px] sm:text-[18px] font-medium text-[#111111] leading-relaxed">
              {article.excerptAr}
            </p>
            <p>
              {article.contentAr}
            </p>
            <blockquote className="border-s-2 border-[#B89A62] ps-4 sm:ps-6 my-6 sm:my-8 italic text-[16px] sm:text-[17px] text-[#1A1A1A] bg-[#FAF8F3] py-4">
              &ldquo;العطر ليس مجرد رائحة طيبة، بل هو استحضار للذكريات وتجسيد لشخصية الإنسان في العالم المادي.&rdquo;
            </blockquote>
            <p>
              في نهاية المطاف، يبقى العطر لغة صامتة ولكنها شديدة الفصاحة، تعبر عن الهوية وتنقل المشاعر عبر الزمان والمكان.
            </p>
          </div>

          <div className="border-t border-[#E8E4DB] mt-12 sm:mt-16 pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/collection"
              className="w-full sm:w-auto text-center text-[13px] bg-[#B89A62] text-[#111111] px-6 py-3 min-h-[46px] flex items-center justify-center font-medium hover:bg-[#CDB48A] transition-colors rounded-sm"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              اكتشف عطور الدار
            </Link>
            <Link
              href="/journal"
              className="inline-flex items-center text-[13px] text-[#888880] hover:text-[#111111] transition-colors min-h-[44px]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              المزيد من المقالات ←
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
