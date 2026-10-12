import { queryOne } from "@/server/db";
import { updateHomepageContentAction, updateTickerAnnouncementsAction } from "@/server/actions/content";
import {
  Megaphone,
  Sparkles,
  Save,
  Play,
} from "lucide-react";

interface SettingRow {
  value: string;
}

export default async function AdminHomepageContentPage() {
  const tickerRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'ticker_announcements'"
  );
  const heroRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'hero'"
  );

  let tickerItems = [
    { id: "t1", textAr: "شحن مجاني لكافة طلبات النخبة بقيمة ٢٥٠٠ ج.م فأكثر داخل مصر", textEn: "Free shipping within Egypt on orders over 2500 EGP", active: true },
    { id: "t2", textAr: "اكتشف مجموعة ريزان الجديدة — عود النور", textEn: "Discover REZAN's new arrival — Oud Al Noor", active: true },
    { id: "t3", textAr: "التوصيل داخل القاهرة والإسكندرية خلال ٢٤ إلى ٤٨ ساعة", textEn: "Fast delivery within Cairo and Alexandria in 24-48 hours", active: true },
  ];

  if (tickerRow?.value) {
    try {
      const parsed = JSON.parse(tickerRow.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        tickerItems = parsed;
      }
    } catch {
      // fallback
    }
  }

  let hero = {
    headlineAr: "ريزان — فخامة تتجاوز المألوف",
    subheadlineAr: "مزيج استثنائي من العود الكمبودي المعتق والزهور الملكية النادرة",
    ctaTextAr: "اكتشف المجموعة الأيقونية",
  };

  if (heroRow?.value) {
    try {
      hero = { ...hero, ...JSON.parse(heroRow.value) };
    } catch {
      // fallback
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              HOMEPAGE & TICKER CMS
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة شريط الإعلانات المتحرك ومحتوى الواجهة
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            التحكم الكامل في شريط الأخبار المتحرك (Ticker)، النصوص الترويجية، ومقدمة المتجر
          </p>
        </div>
      </div>

      {/* Live Preview Box of Animated Ticker */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-xs p-4 space-y-2">
        <div className="flex items-center justify-between text-[12px] text-[#A09C94]">
          <span className="flex items-center gap-1.5 font-medium text-[#B89A62]">
            <Play size={13} />
            معاينة حية لشريط الإعلانات المتحرك في متجر ريزان
          </span>
          <span className="text-[11px] text-[#706E68]">تحديث حي وتلقائي</span>
        </div>
        <div className="bg-[#111111] border border-[#242424] h-10 overflow-hidden flex items-center rounded-xs">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="text-[12px] text-[#F7F3EA]/80 px-8 flex items-center gap-4">
                <span>{item.textAr}</span>
                <span className="text-[#B89A62]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Animated Ticker Form */}
      <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
          <h2
            className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Megaphone size={18} className="text-[#B89A62]" />
            عناصر شريط الإعلانات المتحرك (Animated Ticker Announcements)
          </h2>
        </div>

        <form action={updateTickerAnnouncementsAction} className="space-y-5">
          {/* Item 1 */}
          <div className="bg-[#111111] p-4 rounded-xs border border-[#262626] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#B89A62]">الإعلان الأول</span>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#D0CEC4]">
                <input
                  type="checkbox"
                  name="active_1"
                  defaultChecked={tickerItems[0]?.active !== false}
                  className="w-4 h-4 accent-[#B89A62]"
                />
                <span>تفعيل</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالعربية</label>
                <input
                  type="text"
                  name="textAr_1"
                  defaultValue={tickerItems[0]?.textAr || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالإنجليزية</label>
                <input
                  type="text"
                  name="textEn_1"
                  defaultValue={tickerItems[0]?.textEn || ""}
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none font-en"
                />
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-[#111111] p-4 rounded-xs border border-[#262626] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#B89A62]">الإعلان الثاني</span>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#D0CEC4]">
                <input
                  type="checkbox"
                  name="active_2"
                  defaultChecked={tickerItems[1]?.active !== false}
                  className="w-4 h-4 accent-[#B89A62]"
                />
                <span>تفعيل</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالعربية</label>
                <input
                  type="text"
                  name="textAr_2"
                  defaultValue={tickerItems[1]?.textAr || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالإنجليزية</label>
                <input
                  type="text"
                  name="textEn_2"
                  defaultValue={tickerItems[1]?.textEn || ""}
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none font-en"
                />
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-[#111111] p-4 rounded-xs border border-[#262626] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#B89A62]">الإعلان الثالث</span>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#D0CEC4]">
                <input
                  type="checkbox"
                  name="active_3"
                  defaultChecked={tickerItems[2]?.active !== false}
                  className="w-4 h-4 accent-[#B89A62]"
                />
                <span>تفعيل</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالعربية</label>
                <input
                  type="text"
                  name="textAr_3"
                  defaultValue={tickerItems[2]?.textAr || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#888880] mb-1">النص بالإنجليزية</label>
                <input
                  type="text"
                  name="textEn_3"
                  defaultValue={tickerItems[2]?.textEn || ""}
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xs px-3 py-1.5 text-[13px] text-[#F7F3EA] focus:border-[#B89A62] outline-none font-en"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold px-5 py-2.5 rounded-xs text-[13px] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Save size={15} />
            <span>حفظ إعلانات الشريط ونشرها فوراً</span>
          </button>
        </form>
      </div>

      {/* Section 2: Hero Section Form */}
      <form action={updateHomepageContentAction} className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
        <input type="hidden" name="announcement_text_ar" value={tickerItems[0]?.textAr || ""} />
        <input type="hidden" name="announcement_text_en" value={tickerItems[0]?.textEn || ""} />
        <input type="hidden" name="announcement_active" value="on" />

        <div className="pb-3 border-b border-[#242424]">
          <h2
            className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Sparkles size={18} className="text-[#B89A62]" />
            نصوص قسم البداية والترحيب (Hero Presentation Copy)
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] text-[#888880] mb-1">العنوان الرئيسي</label>
            <input
              type="text"
              name="hero_headline_ar"
              defaultValue={hero.headlineAr}
              className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#888880] mb-1">النص الترويجي الثانوي</label>
            <textarea
              name="hero_subheadline_ar"
              defaultValue={hero.subheadlineAr}
              rows={2}
              className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
            />
          </div>

          <div>
            <label className="block text-[12px] text-[#888880] mb-1">نص زر الدعوة للطلب (CTA Button)</label>
            <input
              type="text"
              name="hero_cta_ar"
              defaultValue={hero.ctaTextAr}
              className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#242424] hover:bg-[#333] text-[#F7F3EA] font-semibold px-5 py-2.5 rounded-xs text-[13px] transition-colors flex items-center gap-2 cursor-pointer border border-[#333]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Save size={15} />
            <span>حفظ نصوص قسم الترحيب</span>
          </button>
        </div>
      </form>
    </div>
  );
}
