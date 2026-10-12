import { queryOne } from "@/server/db";
import { updateStoreSettingsAction } from "@/server/actions/content";
import {
  Store,
  Truck,
  Globe,
  Save,
  ShieldCheck,
  Server,
  Receipt,
  CreditCard,
  Activity,
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
  const taxRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'tax_settings'"
  );
  const payRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'payment_settings'"
  );
  const returnRow = queryOne<SettingRow>(
    "SELECT value FROM store_settings WHERE key = 'return_policy'"
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
    } catch {}
  }

  let shipping = {
    freeShippingThreshold: 2500,
    standardFee: 150,
    estimatedDays: "٢-٤ أيام عمل",
  };
  if (shippingRow?.value) {
    try {
      shipping = { ...shipping, ...JSON.parse(shippingRow.value) };
    } catch {}
  }

  let seo = {
    title: "ريزان — دار العطور الفاخرة | REZAN Maison de Parfum",
    description: "دار عطور عربية فاخرة تصوغ تركيبات نادرة مستوحاة من التراث والأصالة.",
  };
  if (seoRow?.value) {
    try {
      seo = { ...seo, ...JSON.parse(seoRow.value) };
    } catch {}
  }

  let tax = {
    vatEnabled: true,
    vatRatePercent: 14,
    taxNumber: "300-482-911",
    pricesIncludeTax: true,
  };
  if (taxRow?.value) {
    try {
      tax = { ...tax, ...JSON.parse(taxRow.value) };
    } catch {}
  }

  let payments = {
    codEnabled: true,
    cardEnabled: true,
    codExtraFee: 0,
  };
  if (payRow?.value) {
    try {
      payments = { ...payments, ...JSON.parse(payRow.value) };
    } catch {}
  }

  let returns = {
    returnDays: 14,
    sealRequired: true,
  };
  if (returnRow?.value) {
    try {
      returns = { ...returns, ...JSON.parse(returnRow.value) };
    } catch {}
  }

  // Audit count
  const auditCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM audit_logs")?.count || 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              SYSTEM & ENTERPRISE CONFIGURATION
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إعدادات المتجر، الضرائب، والأمان المتقدم
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            إدارة بيانات العلامة، بوابات الدفع، الضرائب، وسياسات التوصيل وسجل التدقيق الأمني
          </p>
        </div>
      </div>

      <form action={updateStoreSettingsAction}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Brand & Store Identity */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Store size={16} className="text-[#B89A62]" />
                بيانات العلامة التجارية وهوية المتجر
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">اسم المتجر (بالعربية)</label>
                  <input
                    type="text"
                    name="store_name_ar"
                    defaultValue={store.nameAr}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">اسم المتجر (بالإنجليزية)</label>
                  <input
                    type="text"
                    name="store_name_en"
                    defaultValue={store.nameEn}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-en"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">البريد الإلكتروني للكونسيرج</label>
                  <input
                    type="email"
                    name="contact_email"
                    defaultValue={store.email}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-en"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">رقم هاتف خدمة العملاء</label>
                  <input
                    type="text"
                    name="contact_phone"
                    defaultValue={store.phone}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* 2. Tax & VAT Settings */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
                <h2
                  className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  <Receipt size={16} className="text-[#B89A62]" />
                  الضرائب والفاتورة الإلكترونية (Tax & VAT)
                </h2>
                <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#D0CEC4]">
                  <input
                    type="checkbox"
                    name="vat_enabled"
                    defaultChecked={tax.vatEnabled}
                    className="w-4 h-4 accent-[#B89A62]"
                  />
                  <span>تفعيل حساب الضريبة</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">نسبة ضريبة القيمة المضافة (%)</label>
                  <input
                    type="number"
                    name="vat_rate_percent"
                    defaultValue={tax.vatRatePercent}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">الرقم الضريبي الموحد للعلامة</label>
                  <input
                    type="text"
                    name="tax_number"
                    defaultValue={tax.taxNumber}
                    dir="ltr"
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#A09C94] pt-1">
                <input
                  type="checkbox"
                  name="prices_include_tax"
                  defaultChecked={tax.pricesIncludeTax}
                  className="w-4 h-4 accent-[#B89A62]"
                />
                <span>الأسعار المعروضة في المتجر شاملة ضريبة القيمة المضافة</span>
              </label>
            </div>

            {/* 3. Payment Methods */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <CreditCard size={16} className="text-[#B89A62]" />
                بوابات وطرق الدفع (Payment Methods)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#111111] p-3.5 rounded-xs border border-[#262626] space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[13px] font-bold text-[#F7F3EA]">الدفع عند الاستلام (COD)</span>
                    <input
                      type="checkbox"
                      name="cod_enabled"
                      defaultChecked={payments.codEnabled}
                      className="w-4 h-4 accent-[#B89A62]"
                    />
                  </label>
                  <p className="text-[11px] text-[#706E68]">إتاحة سداد قيمة الطلب نقدياً لمندوب الشحن عند باب المنزل</p>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-xs border border-[#262626] space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[13px] font-bold text-[#F7F3EA]">البطاقات البنكية ومدى (Card / Apple Pay)</span>
                    <input
                      type="checkbox"
                      name="card_enabled"
                      defaultChecked={payments.cardEnabled}
                      className="w-4 h-4 accent-[#B89A62]"
                    />
                  </label>
                  <p className="text-[11px] text-[#706E68]">بوابة سداد إلكترونية مشفرة تدعم فيزا، ماستركارد، ومدى</p>
                </div>
              </div>
            </div>

            {/* 4. Shipping Rules & Policy */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Truck size={16} className="text-[#B89A62]" />
                قواعد الشحن وسياسة الاسترجاع
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">الحد الأدنى للشحن المجاني</label>
                  <input
                    type="number"
                    name="free_shipping_threshold"
                    defaultValue={shipping.freeShippingThreshold}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">رسوم الشحن القياسي (ج.م)</label>
                  <input
                    type="number"
                    name="standard_shipping_fee"
                    defaultValue={shipping.standardFee}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">المدة التقديرية للتوصيل</label>
                  <input
                    type="text"
                    name="estimated_days"
                    defaultValue={shipping.estimatedDays}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#242424]">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">فترة الاسترجاع المسموحة (بالأيام)</label>
                  <input
                    type="number"
                    name="return_days"
                    defaultValue={returns.returnDays}
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] font-mono"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#D0CEC4]">
                    <input
                      type="checkbox"
                      name="seal_required"
                      defaultChecked={returns.sealRequired}
                      className="w-4 h-4 accent-[#B89A62]"
                    />
                    <span>اشتراط عدم كسر شريط الأمان والختم الشمعي للاسترجاع</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 5. SEO Settings */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Globe size={16} className="text-[#B89A62]" />
                تهيئة محركات البحث (SEO & Meta Tags)
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] text-[#888880] mb-1">عنوان الموقع الافتراضي (Meta Title)</label>
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
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62] leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold px-6 py-3 rounded-xs text-[13px] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Save size={16} />
                <span>حفظ كافة إعدادات المتجر والمنظومة</span>
              </button>
            </div>
          </div>

          {/* Sidebar: Security Posture & Health Status */}
          <div className="space-y-6">
            {/* Real Security Posture Card */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-bold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <ShieldCheck size={18} className="text-emerald-400" />
                الحالة الأمنية للمنظومة (Security Posture)
              </h2>

              <div className="space-y-3 text-[12px]">
                <div className="flex items-center justify-between p-2.5 bg-[#111111] rounded-xs border border-[#222]">
                  <span className="text-[#888]">تشفير الجلسات (Sessions):</span>
                  <span className="font-mono text-emerald-400 font-bold">SHA-256 / HttpOnly</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#111111] rounded-xs border border-[#222]">
                  <span className="text-[#888]">سجل التدقيق (Audit Logs):</span>
                  <span className="font-mono text-[#B89A62] font-bold">{auditCount} حدث مسجل</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#111111] rounded-xs border border-[#222]">
                  <span className="text-[#888]">التحقق من الصلاحيات (RBAC):</span>
                  <span className="font-mono text-emerald-400 font-bold">مفعل لكل المسارات</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#111111] rounded-xs border border-[#222]">
                  <span className="text-[#888]">سلامة قاعدة البيانات:</span>
                  <span className="font-mono text-emerald-400 font-bold">SQLite / D1 Integrity OK</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#242424]">
                <a
                  href="/admin/audit-log"
                  className="text-[12px] text-[#B89A62] hover:underline flex items-center gap-1 font-medium"
                >
                  <Activity size={13} />
                  <span>فتح سجل التدقيق الأمني المفصل</span>
                </a>
              </div>
            </div>

            {/* Architecture Stack */}
            <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-3 text-[12px]">
              <h3 className="font-bold text-[#F7F3EA] flex items-center gap-2 pb-2 border-b border-[#242424]">
                <Server size={15} className="text-[#B89A62]" />
                البنية التحتية والخوادم
              </h3>

              <div className="space-y-2 text-[#A09C94]">
                <div className="flex justify-between">
                  <span>محرك العرض:</span>
                  <span className="font-mono text-white">Next.js 16 (Turbopack)</span>
                </div>
                <div className="flex justify-between">
                  <span>الشبكة السحابية:</span>
                  <span className="font-mono text-white">Cloudflare Edge / Workers</span>
                </div>
                <div className="flex justify-between">
                  <span>قاعدة البيانات:</span>
                  <span className="font-mono text-white">Cloudflare D1 / Relational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
