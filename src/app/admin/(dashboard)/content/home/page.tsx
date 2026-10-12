import { queryOne } from "@/server/db";
import { updateHomepageContentAction } from "@/server/actions/content";
import {
  Megaphone,
  Sparkles,
  Save,
} from "lucide-react";

interface SettingRow {
  value: string;
}

export default async function AdminHomepageContentPage() {
  const announcementRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'announcement'"
  );
  const heroRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'hero'"
  );

  let announcement = {
    textAr: "شحن مجاني لكافة طلبات النخبة بقيمة ٢٥٠٠ ج.م فأكثر داخل مصر",
    textEn: "Complimentary White-Glove Delivery on orders over 2,500 EGP",
    active: true,
  };

  if (announcementRow?.value) {
    try {
      announcement = { ...announcement, ...JSON.parse(announcementRow.value) };
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة محتوى الواجهة الرئيسية
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            التحكم في شريط الإعلانات العلوي، النصوص الترويجية، ورسائل الاستقبال دون تعديل الأكواد
          </p>
        </div>
      </div>

      <form action={updateHomepageContentAction} className="space-y-6">
        {/* Section 1: Announcement Bar */}
        <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <h2
              className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Megaphone size={18} className="text-[#B89A62]" />
              شريط الإعلانات العلوي (Announcement Bar)
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="announcement_active"
                defaultChecked={announcement.active}
                className="w-4 h-4 accent-[#B89A62] cursor-pointer"
              />
              <span className="text-[12px] text-[#D0CEC4]">تفعيل الشريط في المتجر</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] text-[#888880] mb-1">
                نص الإعلان (باللغة العربية)
              </label>
              <input
                type="text"
                name="announcement_text_ar"
                defaultValue={announcement.textAr}
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">
                نص الإعلان (باللغة الإنجليزية)
              </label>
              <input
                type="text"
                name="announcement_text_en"
                defaultValue={announcement.textEn}
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hero Presentation Copy */}
        <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
          <div className="pb-3 border-b border-[#242424]">
            <h2
              className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Sparkles size={18} className="text-[#B89A62]" />
              نصوص قسم البداية والترحيب (Hero Section)
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
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold px-6 py-2.5 rounded-xs text-[13px] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Save size={16} />
            حفظ تعديلات المحتوى ونشرها
          </button>
        </div>
      </form>
    </div>
  );
}
