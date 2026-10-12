import { queryOne } from "@/server/db";
import { updateStoreSettingsAction } from "@/server/actions/content";
import {
  Store,
  Truck,
  Globe,
  Save,
  ShieldCheck,
  Server,
  Database,
  Lock,
} from "lucide-react";

interface SettingRow {
  value: string;
}

export default async function AdminSettingsPage() {
  const storeRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'store_info'"
  );
  const shippingRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'shipping'"
  );
  const seoRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'seo'"
  );

  let store = {
    nameAr: "ريزان",
    nameEn: "REZAN",
    email: "concierge@rezan.com",
    phone: "+20 100 000 0000",
    currency: "EGP",
  };
  if (storeRow?.value) {
    try {
      store = { ...store, ...JSON.parse(storeRow.value) };
    } catch {
      // fallback
    }
  }

  let shipping = {
    freeShippingThreshold: 2500,
    standardFee: 150,
    estimatedDays: "٢-٤ أيام عمل",
  };
  if (shippingRow?.value) {
    try {
      shipping = { ...shipping, ...JSON.parse(shippingRow.value) };
    } catch {
      // fallback
    }
  }

  let seo = {
    title: "ريزان — دار العطور الفاخرة | REZAN Maison de Parfum",
    description: "دار عطور عربية فاخرة تصوغ تركيبات نادرة مستوحاة من التراث والأصالة.",
  };
  if (seoRow?.value) {
    try {
      seo = { ...seo, ...JSON.parse(seoRow.value) };
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
            إعدادات المتجر والمنظومة
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة البيانات العامة للعلامة التجارية، قواعد الشحن والتوصيل، وتهيئة محركات البحث
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form action={updateStoreSettingsAction} className="space-y-6">
            {/* 1. Brand & Store Identity */}
            <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
              <h2
                className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Store size={18} className="text-[#B89A62]" />
                بيانات العلامة وهوية المتجر
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">اسم المتجر (عربي)</label>
                  <input
                    type="text"
                    name="store_name_ar"
                    defaultValue={store.nameAr}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">اسم المتجر (إنجليزي)</label>
                  <input
                    type="text"
                    name="store_name_en"
                    defaultValue={store.nameEn}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">بريد التواصل (Concierge)</label>
                  <input
                    type="email"
                    name="contact_email"
                    defaultValue={store.email}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">هاتف خدمة النخبة</label>
                  <input
                    type="text"
                    name="contact_phone"
                    defaultValue={store.phone}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Configuration */}
            <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
              <h2
                className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Truck size={18} className="text-[#B89A62]" />
                سياسات وقواعد الشحن والتوصيل
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">
                    حد الشحن المجاني (ج.م)
                  </label>
                  <input
                    type="number"
                    name="free_shipping_threshold"
                    defaultValue={shipping.freeShippingThreshold}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">
                    تكلفة الشحن القياسي (ج.م)
                  </label>
                  <input
                    type="number"
                    name="standard_shipping_fee"
                    defaultValue={shipping.standardFee}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">مدة التوصيل المتوقعة</label>
                  <input
                    type="text"
                    name="estimated_days"
                    defaultValue={shipping.estimatedDays}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>
              </div>
            </div>

            {/* 3. SEO Configuration */}
            <div className="bg-[#161616] border border-[#242424] p-6 rounded-xs space-y-4">
              <h2
                className="text-[16px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Globe size={18} className="text-[#B89A62]" />
                تهيئة محركات البحث (SEO & Meta Tags)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">عنوان المتجر الافتراضي</label>
                  <input
                    type="text"
                    name="seo_title"
                    defaultValue={seo.title}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">الوصف العام (Meta Description)</label>
                  <textarea
                    name="seo_description"
                    defaultValue={seo.description}
                    rows={2}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold px-6 py-2.5 rounded-xs text-[13px] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Save size={16} />
                حفظ كافة الإعدادات
              </button>
            </div>
          </form>
        </div>

        {/* Operational Health & System Status Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
            <h3
              className="text-[14px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Server size={16} className="text-[#B89A62]" />
              الحالة التشغيلية للمنظومة
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#242424]">
                <span className="text-[#888880] flex items-center gap-1.5">
                  <Database size={13} className="text-emerald-400" />
                  قاعدة البيانات
                </span>
                <span className="text-emerald-400 font-mono font-medium">SQLite WAL / D1</span>
              </div>

              <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#242424]">
                <span className="text-[#888880] flex items-center gap-1.5">
                  <Lock size={13} className="text-emerald-400" />
                  بروتوكول الجلسات
                </span>
                <span className="text-emerald-400 font-mono font-medium">PBKDF2 / HttpOnly</span>
              </div>

              <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#242424]">
                <span className="text-[#888880] flex items-center gap-1.5">
                  <Globe size={13} className="text-emerald-400" />
                  الشبكة السحابية
                </span>
                <span className="text-emerald-400 font-mono font-medium">Cloudflare Workers</span>
              </div>

              <div className="flex items-center justify-between text-[12px] py-1">
                <span className="text-[#888880] flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#B89A62]" />
                  نظام الصلاحيات (RBAC)
                </span>
                <span className="text-[#B89A62] font-mono font-medium">مفعل (٧ أدوار)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
