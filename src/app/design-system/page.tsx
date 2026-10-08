import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products, formatEGP } from "@/data";

export default function DesignSystemPage() {
  const sampleProduct = products[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] text-[#111111] py-16 px-5 lg:px-12">
        <div className="max-w-[1300px] mx-auto">
          {/* Header */}
          <header className="border-b border-[#E8E4DB] pb-10 mb-16">
            <span className="text-[11px] text-[#B89A62] font-semibold tracking-[0.25em] uppercase font-en">
              LIVING DESIGN SYSTEM v1.0.0
            </span>
            <h1 className="text-[36px] lg:text-[48px] font-semibold text-[#1A1A1A] mt-2 mb-4 leading-tight" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              نظام تصميم دار عطور ريزان
            </h1>
            <p className="text-[15px] text-[#555550] max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              المرجع البصري الموحد لتجربة التسوق الرقمية — Quiet Luxury، الهوية العربية، والتجارة الإلكترونية الراقية لجمهورية مصر العربية.
            </p>
          </header>

          {/* Section 1: Brand Colors */}
          <section className="mb-20">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span className="text-[#B89A62]">01.</span> لوحة الألوان الأساسية (Color Tokens)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="bg-[#111111] p-6 text-[#F7F3EA] rounded-sm border border-[#2A2A2A] shadow-sm">
                <div className="h-16 w-full rounded-sm mb-4 bg-[#111111]" />
                <p className="text-[14px] font-medium font-en">Near Black</p>
                <p className="text-[12px] text-[#888880] font-mono mt-1">#111111</p>
                <p className="text-[11px] text-[#B89A62] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>خلفيات السرد والفخامة</p>
              </div>
              <div className="bg-[#1A1A1A] p-6 text-[#F7F3EA] rounded-sm border border-[#2A2A2A] shadow-sm">
                <div className="h-16 w-full rounded-sm mb-4 bg-[#1A1A1A]" />
                <p className="text-[14px] font-medium font-en">Charcoal</p>
                <p className="text-[12px] text-[#888880] font-mono mt-1">#1A1A1A</p>
                <p className="text-[11px] text-[#B89A62] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الأسطح الثانوية والبطاقات</p>
              </div>
              <div className="bg-white p-6 text-[#1A1A1A] rounded-sm border border-[#E8E4DB] shadow-sm">
                <div className="h-16 w-full rounded-sm mb-4 bg-[#F7F3EA] border border-[#E8E4DB]" />
                <p className="text-[14px] font-medium font-en">Ivory Canvas</p>
                <p className="text-[12px] text-[#888880] font-mono mt-1">#F7F3EA</p>
                <p className="text-[11px] text-[#B89A62] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>خلفيات التسوق التجارية</p>
              </div>
              <div className="bg-white p-6 text-[#1A1A1A] rounded-sm border border-[#E8E4DB] shadow-sm">
                <div className="h-16 w-full rounded-sm mb-4 bg-[#B89A62]" />
                <p className="text-[14px] font-medium font-en">Champagne Gold</p>
                <p className="text-[12px] text-[#888880] font-mono mt-1">#B89A62</p>
                <p className="text-[11px] text-[#B89A62] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>لمسات التمييز والأزرار</p>
              </div>
            </div>
          </section>

          {/* Section 2: Typography */}
          <section className="mb-20">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span className="text-[#B89A62]">02.</span> منظومة الخطوط (Typography Hierarchy)
            </h2>
            <div className="bg-white p-8 lg:p-12 border border-[#E8E4DB] space-y-8">
              <div className="border-b border-[#F0EDE6] pb-6">
                <span className="text-[11px] text-[#888880] uppercase tracking-wider font-en">Display Hero / Tajarib Bold</span>
                <p className="text-[38px] font-semibold text-[#1A1A1A] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  دار عطور ريزان — سحر الشرق بروح باريسية
                </p>
              </div>
              <div className="border-b border-[#F0EDE6] pb-6">
                <span className="text-[11px] text-[#888880] uppercase tracking-wider font-en">H2 Section Heading / Tajarib Medium</span>
                <p className="text-[26px] font-medium text-[#1A1A1A] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  المجموعات العطرية الحصرية
                </p>
              </div>
              <div className="border-b border-[#F0EDE6] pb-6">
                <span className="text-[11px] text-[#888880] uppercase tracking-wider font-en">Body Text / Tajarib Regular</span>
                <p className="text-[15px] text-[#555550] leading-relaxed mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  ننتقي أندر الخامات الطبيعية من دهن العود الكمبودي المعتق والورد الطائفي الفاخر، لنقدم توليفة تعكس أصالة الشخصية وحضورها الاستثنائي.
                </p>
              </div>
              <div>
                <span className="text-[11px] text-[#888880] uppercase tracking-wider font-en">Price & Numerals / EGP Formatter</span>
                <p className="text-[22px] font-semibold text-[#B89A62] mt-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  {formatEGP(3400)} <span className="text-[14px] text-[#888880] line-through ms-3">{formatEGP(4200)}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Interactive UI Elements & Buttons */}
          <section className="mb-20">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span className="text-[#B89A62]">03.</span> الأزرار والحالات (Buttons & Interactive States)
            </h2>
            <div className="bg-white p-8 lg:p-12 border border-[#E8E4DB]">
              <div className="flex flex-wrap gap-4 items-center">
                <button className="bg-[#B89A62] text-[#111111] text-[13px] font-medium px-8 py-3.5 hover:bg-[#CDB48A] transition-colors" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  زر ذهبي أساسي (Primary Gold)
                </button>
                <button className="bg-[#111111] text-white text-[13px] font-medium px-8 py-3.5 hover:bg-black transition-colors" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  زر داكن (Charcoal Dark)
                </button>
                <button className="border border-[#1A1A1A] text-[#1A1A1A] text-[13px] font-medium px-8 py-3.5 hover:bg-[#1A1A1A] hover:text-white transition-colors" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  زر إطار (Outline)
                </button>
                <button disabled className="bg-[#E8E4DB] text-[#888880] text-[13px] font-medium px-8 py-3.5 cursor-not-allowed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  غير مفعل (Disabled)
                </button>
              </div>

              {/* Badges */}
              <div className="mt-8 pt-8 border-t border-[#F0EDE6] flex flex-wrap gap-4 items-center">
                <span className="text-[12px] text-[#888880] me-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الشارات (Badges):</span>
                <span className="bg-[#111] text-[#F7F3EA] text-[10px] px-3 py-1 font-medium font-en">NEW</span>
                <span className="bg-[#F7F3EA] text-[#111] border border-[#E8E4DB] text-[10px] px-3 py-1 font-medium" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الأكثر مبيعاً</span>
                <span className="bg-[#8B0000] text-white text-[10px] px-3 py-1 font-medium" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>تخفيض محدود</span>
                <span className="bg-[#B89A62] text-[#111] text-[10px] px-3 py-1 font-medium font-en">LIMITED DROP</span>
              </div>
            </div>
          </section>

          {/* Section 4: Commerce Product Card */}
          <section className="mb-20">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span className="text-[#B89A62]">04.</span> بطاقة المنتج الفاخرة (Product Card Showcase)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard product={sampleProduct} light />
              {products[1] && <ProductCard product={products[1]} light />}
              {products[2] && <ProductCard product={products[2]} light />}
              {products[3] && <ProductCard product={products[3]} light />}
            </div>
          </section>

          {/* Section 5: Form Inputs */}
          <section className="mb-20">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <span className="text-[#B89A62]">05.</span> حقول الإدخال والتحقق (Form Elements)
            </h2>
            <div className="bg-white p-8 lg:p-12 border border-[#E8E4DB] max-w-xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] text-[#555550] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الاسم بالكامل</label>
                  <input type="text" placeholder="مثال: أحمد مصطفى" className="w-full border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }} />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555550] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>المحافظة</label>
                  <select className="w-full border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62] bg-white" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    <option>القاهرة</option>
                    <option>الجيزة</option>
                    <option>الإسكندرية</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
