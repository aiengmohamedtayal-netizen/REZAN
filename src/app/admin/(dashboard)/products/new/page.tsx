import Link from "next/link";
import { listAdminCollections } from "@/server/domain/collections";
import { createProductAction } from "@/server/actions/products";
import {
  ArrowRight,
  Plus,
  Package,
  Sparkles,
} from "lucide-react";

export default async function AdminNewProductPage() {
  const collections = listAdminCollections();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="w-9 h-9 rounded-xs bg-[#1A1A1A] hover:bg-[#222222] border border-[#2E2E2E] text-[#A09C94] hover:text-[#F7F3EA] flex items-center justify-center transition-colors"
          >
            <ArrowRight size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
                NEW CREATION
              </span>
            </div>
            <h1
              className="text-[22px] sm:text-[24px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              إضافة ابتكار عطر جديد لدار ريزان
            </h1>
          </div>
        </div>
      </div>

      <form action={createProductAction} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Package size={16} className="text-[#B89A62]" />
                البيانات الأساسية للعطر
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    الاسم بالعربية <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nameAr"
                    placeholder="مثال: ريزان عنبر نوار"
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    الاسم بالإنجليزية <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="nameEn"
                    placeholder="e.g. REZAN Amber Noir"
                    required
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-en"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    المعرف الرابط (Slug) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="amber-noir"
                    required
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    العائلة العطرية
                  </label>
                  <select
                    name="olfactiveFamily"
                    defaultValue="Oriental"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                  >
                    <option value="Oriental">Oriental — شرقي</option>
                    <option value="Woody">Woody — خشبي</option>
                    <option value="Warm">Warm — دافئ</option>
                    <option value="Floral">Floral — زهري</option>
                    <option value="Fresh">Fresh — منعش</option>
                    <option value="Musky">Musky — مسكي</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    الشعار المختصر (العربية)
                  </label>
                  <input
                    type="text"
                    name="taglineAr"
                    placeholder="مثال: أصالة الشرق بلمسة فرنسية ساحرة"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    الشعار المختصر (الإنجليزية)
                  </label>
                  <input
                    type="text"
                    name="taglineEn"
                    placeholder="e.g. Pure opulent elegance"
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-en"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الوصف الكامل بالعربية
                </label>
                <textarea
                  name="descriptionAr"
                  rows={4}
                  placeholder="اكتب وصف العطر وتجربة الانطباع الشمي..."
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-3 rounded-xs outline-none leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>
            </div>

            {/* Olfactory Notes */}
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Sparkles size={16} className="text-[#B89A62]" />
                الهرم العطري
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قمة العطر (Top Notes)
                  </label>
                  <input
                    type="text"
                    name="notesTop"
                    placeholder="برغموت, زعفران, هيل"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قلب العطر (Heart Notes)
                  </label>
                  <input
                    type="text"
                    name="notesHeart"
                    placeholder="ورد طائفي, خشب الأرز, ياسمين"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قاعدة العطر (Base Notes)
                  </label>
                  <input
                    type="text"
                    name="notesBase"
                    placeholder="عود نقي, عنبر, مسك أبيض, فانيليا"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                الأسعار والمخزون الأولي (Variants)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] p-4 rounded-xs border border-[#2E2E2E] space-y-3">
                  <h3 className="text-[13px] font-bold text-[#B89A62]">الحجم الأساسي (100 مل)</h3>
                  <div>
                    <label className="block text-[11px] text-[#A09C94] mb-1">السعر (ج.م)</label>
                    <input
                      type="number"
                      name="price100"
                      defaultValue={1850}
                      required
                      className="w-full bg-[#141414] border border-[#333] text-white px-3 py-1.5 text-[13px] font-mono rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A09C94] mb-1">المخزون الأولي</label>
                    <input
                      type="number"
                      name="stock100"
                      defaultValue={50}
                      required
                      className="w-full bg-[#141414] border border-[#333] text-white px-3 py-1.5 text-[13px] font-mono rounded-xs"
                    />
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-xs border border-[#2E2E2E] space-y-3">
                  <h3 className="text-[13px] font-bold text-[#A09C94]">الحجم الفرعي (50 مل - اختياري)</h3>
                  <div>
                    <label className="block text-[11px] text-[#A09C94] mb-1">السعر (ج.م)</label>
                    <input
                      type="number"
                      name="price50"
                      defaultValue={1250}
                      className="w-full bg-[#141414] border border-[#333] text-white px-3 py-1.5 text-[13px] font-mono rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A09C94] mb-1">المخزون الأولي</label>
                    <input
                      type="number"
                      name="stock50"
                      defaultValue={30}
                      className="w-full bg-[#141414] border border-[#333] text-white px-3 py-1.5 text-[13px] font-mono rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                خيارات العرض
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    defaultChecked
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>متاح للشراء فوراً</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isNew"
                    defaultChecked
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>تمييز كإصدار جديد</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>الأكثر طلباً</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#242424]">
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  المجموعة العطرية
                </label>
                <select
                  name="collectionId"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="">بدون مجموعة</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  رابط صورة العطر
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="https://images.unsplash.com/..."
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[14px] py-3 rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Plus size={16} />
              <span>إضافة العطر إلى الكتالوج</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
