import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/server/domain/products";
import { listAdminCollections } from "@/server/domain/collections";
import { updateProductAction } from "@/server/actions/products";
import {
  ArrowRight,
  Save,
  Package,
  Sparkles,
  Eye,
} from "lucide-react";

export default async function AdminEditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const product = getProductDetail(id);

  if (!product) {
    notFound();
  }

  const collections = listAdminCollections();
  const primaryImage = product.images?.[0]?.url as string | undefined;

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
                EDIT FRAGRANCE
              </span>
              <span className="text-[#444]">•</span>
              <span className="text-[11px] text-[#706E68] font-mono">{product.slug}</span>
            </div>
            <h1
              className="text-[22px] sm:text-[24px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              تعديل عطر: {product.name_ar}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/collection/${product.slug}`}
            target="_blank"
            className="bg-[#1A1A1A] hover:bg-[#222222] text-[#C8C4BC] border border-[#2E2E2E] text-[13px] px-3.5 py-2 rounded-xs flex items-center gap-1.5 transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Eye size={15} className="text-[#B89A62]" />
            <span>معاينة في المتجر</span>
          </Link>
        </div>
      </div>

      <form action={updateProductAction} className="space-y-6">
        <input type="hidden" name="productId" value={product.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
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
                    defaultValue={product.name_ar}
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
                    defaultValue={product.name_en}
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
                    defaultValue={product.slug}
                    required
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    العائلة العطرية (Olfactive Family)
                  </label>
                  <select
                    name="olfactiveFamily"
                    defaultValue={product.olfactive_family}
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
                    defaultValue={product.tagline_ar || ""}
                    placeholder="مثال: عبق العود الملكي مع خشب الصندل"
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
                    defaultValue={product.tagline_en || ""}
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
                  defaultValue={product.description_ar || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-3 rounded-xs outline-none leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الوصف الكامل بالإنجليزية
                </label>
                <textarea
                  name="descriptionEn"
                  rows={3}
                  defaultValue={product.description_en || ""}
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-3 rounded-xs outline-none leading-relaxed font-en"
                />
              </div>
            </div>

            {/* Olfactory Notes Pyramid */}
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Sparkles size={16} className="text-[#B89A62]" />
                الهرم العطري (Olfactory Pyramid)
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قمة العطر (Top Notes) — مفصولة بفواصل
                  </label>
                  <input
                    type="text"
                    name="notesTop"
                    defaultValue={(product.notesTop as string[] || []).join(", ")}
                    placeholder="زعفران, برغموت كالانبريا, هيل"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قلب العطر (Heart Notes) — مفصولة بفواصل
                  </label>
                  <input
                    type="text"
                    name="notesHeart"
                    defaultValue={(product.notesHeart as string[] || []).join(", ")}
                    placeholder="ورد طائفي, ياسمين سامباك, خشب الغاياك"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    قاعدة العطر (Base Notes) — مفصولة بفواصل
                  </label>
                  <input
                    type="text"
                    name="notesBase"
                    defaultValue={(product.notesBase as string[] || []).join(", ")}
                    placeholder="عود كمبودي عتيق, عنبر حوت, فانيليا مدغشقر"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings (1 col) */}
          <div className="space-y-6">
            {/* Status & Visibility */}
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                الحالة والظهور
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    defaultChecked={Boolean(product.is_available)}
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>متاح للشراء في المتجر</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isNew"
                    defaultChecked={Boolean(product.is_new)}
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>إصدار جديد (New Release)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    defaultChecked={Boolean(product.is_bestseller)}
                    className="w-4 h-4 rounded-xs accent-[#B89A62]"
                  />
                  <span>الأكثر مبيعاً (Best Seller)</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#242424]">
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  شارة العطر (Badge)
                </label>
                <select
                  name="badge"
                  defaultValue={product.badge || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="">بدون شارة</option>
                  <option value="new">NEW — إصدار جديد</option>
                  <option value="bestseller">BESTSELLER — الأكثر طلباً</option>
                  <option value="limited">LIMITED — إصدار خاص محدود</option>
                  <option value="sale">OFFER — عرض خاص</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  المجموعة العطرية
                </label>
                <select
                  name="collectionId"
                  defaultValue={product.collection_id || ""}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="">بدون مجموعة</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الجنس المستهدف
                </label>
                <select
                  name="gender"
                  defaultValue={product.gender}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="unisex">Unisex — للجنسين</option>
                  <option value="male">Male — رجالي</option>
                  <option value="female">Female — نسائي</option>
                </select>
              </div>
            </div>

            {/* Product Image */}
            <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                صورة العطر الرئيسية
              </h2>

              {primaryImage && (
                <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-[#111111] border border-[#2A2A2A]">
                  <Image
                    src={primaryImage}
                    alt={product.name_ar}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  رابط الصورة (URL)
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={primaryImage || ""}
                  placeholder="https://..."
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[14px] py-3 rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Save size={16} />
              <span>حفظ التعديلات والتحديث الفوري</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
