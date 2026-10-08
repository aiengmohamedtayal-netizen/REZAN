"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Sparkles, Compass, Feather } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] text-[#111111] overflow-hidden">
        {/* ─── 1. THE MAISON INTRODUCTION (EDITORIAL SPLIT) ───────────── */}
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#E8E4DB]">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Desktop RTL: Right side is order-1 in RTL grid (takes 48% width) */}
            <div className="order-2 lg:order-1 lg:col-span-6 flex justify-center">
              <div className="relative w-full aspect-[4/5] max-w-[500px] rounded-sm overflow-hidden bg-[#FAF8F3] border border-[#E8E4DB] shadow-md">
                <Image
                  src="/images/rezan/heritage/rezan-heritage-fragrance.png"
                  alt="عطور دار ريزان - الزجاجة التراثية وإرث العطور المصرية على النيل"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Desktop RTL: Left side is order-2 in RTL grid (takes 44% width) */}
            <div className="order-1 lg:order-2 lg:col-span-6 max-w-xl">
              <span className="inline-block text-[11px] lg:text-[12px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en mb-3 sm:mb-4">
                THE MAISON
              </span>

              <h1
                className="text-[28px] sm:text-[40px] lg:text-[46px] font-semibold text-[#1A1A1A] mb-4 sm:mb-6 leading-snug"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                دار عطور تعبّر عن هوية لا تُقلَّد
              </h1>

              <div
                className="space-y-4 text-[14px] sm:text-[15px] lg:text-[16px] text-[#555550] leading-loose mb-6 sm:mb-8 text-justify"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <p>
                  ريزان دار عطور تجمع بين حرفية العطور الأوروبية وأصالة المكونات العربية، كل عطر يُصنع بمكونات مختارة بعناية ويُعبّر عن قصة تستحق أن تُروى.
                </p>
                <p>
                  بدأت ريزان من فكرة بسيطة: أن العطر ليس مجرد رائحة، بل ذاكرة تُستحضر، وحكاية تُروى، وأثرٌ يبقى.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-[#F7F3EA] px-8 py-3.5 min-h-[46px] text-[14px] font-medium hover:bg-black transition-colors shadow-sm"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  اكتشف المجموعة
                  <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <a
                  href="#heritage"
                  className="inline-flex items-center justify-center gap-2 border border-[#B89A62] text-[#B89A62] px-7 py-3.5 min-h-[46px] text-[14px] font-medium hover:bg-[#B89A62] hover:text-[#111111] transition-colors"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  حكاية الإرث
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE HERITAGE SECTION (HISTORICAL EGYPTIAN PANORAMA) ──── */}
        <section id="heritage" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#E8E4DB]">
          <div className="max-w-[1240px] mx-auto">
            {/* Editorial Panoramic Historical Image */}
            <div className="w-full mb-12 sm:mb-16 rounded-sm overflow-hidden border border-[#E8E4DB] shadow-md bg-[#FAF8F3]">
              <Image
                src="/images/rezan/heritage/ancient-egyptian-perfume-by-the-nile.png"
                alt="العطر عبر الحضارة المصرية العريقة على ضفاف النيل"
                width={1600}
                height={900}
                priority
                className="w-full h-auto block"
              />
            </div>

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
                THE HERITAGE
              </span>
              <h2
                className="text-[26px] sm:text-[36px] lg:text-[42px] font-semibold text-[#1A1A1A] mt-2 mb-4"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                العطر... حكايةٌ تمتد عبر الزمن
              </h2>
              <div className="w-12 h-[2px] bg-[#B89A62] mx-auto mt-4" />
            </div>

            {/* Image Caption */}
            <p
              className="text-center text-[12px] text-[#888880] mb-10 sm:mb-14"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              إلهامٌ من علاقة الإنسان بالعطر عبر الحضارات.
            </p>

            {/* Two-Column Storytelling Spread */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 text-[14px] sm:text-[15px] lg:text-[16px] text-[#555550] leading-loose text-justify"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <div className="space-y-4">
                <p>
                  منذ أقدم الحضارات، ارتبط العطر بالذاكرة والاحتفال والطقوس والعناية. وفي مصر، تركت الروائح العطرة والزهور والزيوت والبخور حضورًا عميقًا في الثقافة القديمة.
                </p>
                <p>
                  من هذه العلاقة القديمة بين الإنسان والعطر، تستلهم ريزان رؤيتها: أن الرائحة ليست مجرد تركيبة، بل لغة تصل الماضي بالحاضر وتترك أثرًا يتجاوز اللحظة.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  نؤمن أن لكل مكوّن شخصيته، ولكل تركيبة إيقاعها، ولكل عطر لحظة تستحق أن تُحفظ. لذلك نصوغ عطورنا حول تناغم دقيق بين النفحات، مع اهتمام بالتفاصيل التي تمنح كل تركيبة حضورها الخاص.
                </p>
                <p>
                  ريزان ليست مجرد مجموعة من العطور؛ إنها دعوة لاكتشاف الحكاية التي يمكن لرائحة واحدة أن تحملها.
                </p>
              </div>
            </div>

            {/* Second Editorial Visual */}
            <div className="mt-16 sm:mt-20 lg:mt-24 w-full rounded-sm overflow-hidden border border-[#E8E4DB] shadow-md bg-[#FAF8F3]">
              <Image
                src="/images/rezan/heritage/golden-attar-by-the-nile.png"
                alt="عطر ذهبي تراثي على ضفاف النيل"
                width={1600}
                height={900}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>

        {/* ─── 3. BETWEEN HERITAGE & INNOVATION ────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF8F3] border-b border-[#E8E4DB]">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.2em] uppercase font-en">
                OUR IDENTITY
              </span>
              <h2
                className="text-[26px] sm:text-[36px] font-semibold text-[#1A1A1A] mt-2 mb-4"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                بين الإرث والابتكار
              </h2>
              <p
                className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#555550] leading-relaxed"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                من العود والتوابل والورد، إلى التركيبات العصرية المتوازنة؛ نستمد إلهامنا من تراث عطري غني، ثم نعيد تقديمه بروح هادئة ومعاصرة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 border border-[#E8E4DB] flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7F3EA] flex items-center justify-center text-[#B89A62] mb-5">
                  <Compass size={22} />
                </div>
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الأصالة والتراث
                </h3>
                <p className="text-[13px] text-[#666660] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  استلهام مباشر من أندر كنوز الطبيعة الشرقية: دهن العود المعتق، اللبان السلطاني، وخشب الصندل النادر.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-[#E8E4DB] flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7F3EA] flex items-center justify-center text-[#B89A62] mb-5">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الحس المعاصر
                </h3>
                <p className="text-[13px] text-[#666660] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  توازن دقيق مع مدارس النيش الأوروبية الراقية ليولد عطر عصري متوازن، دائم الحضور دون تكلف.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-[#E8E4DB] flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7F3EA] flex items-center justify-center text-[#B89A62] mb-5">
                  <Feather size={22} />
                </div>
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  حرفية الصياغة
                </h3>
                <p className="text-[13px] text-[#666660] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  تعتيق متقن واختبارات دقيقة للثبات والانتشار، لنضمن زجاجة فاخرة ترافقك في أرقى مناسباتك.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. MAISON PHILOSOPHY ────────────────────────────────────── */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#111111] text-[#F7F3EA] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#B89A62_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en">
              MAISON PHILOSOPHY
            </span>

            <h2
              className="text-[24px] sm:text-[36px] lg:text-[42px] font-semibold text-[#F7F3EA] mt-4 mb-6 sm:mb-8 leading-snug"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              فلسفة الدار
            </h2>

            <blockquote
              className="text-[19px] sm:text-[28px] lg:text-[32px] font-light text-[#B89A62] leading-relaxed mb-6 sm:mb-8 italic"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              &ldquo;نؤمن بالعطر الذي لا يحتاج إلى أن يصرخ.&rdquo;
            </blockquote>

            <p
              className="text-[14px] sm:text-[16px] text-[#F7F3EA]/80 leading-loose max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              الفخامة الحقيقية تكمن في التفاصيل؛ في تركيبة متوازنة، حضور هادئ، وزجاجة تحمل شخصية العطر قبل أن تُفتح.
            </p>
          </div>
        </section>

        {/* ─── 5. DISCOVER THE MAISON CTA ─────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#F7F3EA] text-center">
          <div className="max-w-[700px] mx-auto">
            <h2
              className="text-[26px] sm:text-[36px] font-semibold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              اكتشف عالم ريزان
            </h2>
            <p
              className="text-[14px] sm:text-[15px] text-[#555550] mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              عطور صيغت لتترك أثرًا يتجاوز اللحظة.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center justify-center gap-2 bg-[#B89A62] text-[#111111] px-10 py-3.5 min-h-[48px] text-[14px] font-medium hover:bg-[#CDB48A] transition-colors shadow-sm w-full sm:w-auto"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              اكتشف المجموعة
              <ArrowLeft size={16} className="rtl:rotate-0 ltr:rotate-180" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
