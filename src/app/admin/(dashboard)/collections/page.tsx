import Image from "next/image";
import Link from "next/link";
import { queryAll } from "@/server/db";
import {
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
} from "@/server/actions/collections";
import {
  Layers,
  Package,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Save,
} from "lucide-react";

interface CollectionRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  image_url: string | null;
  is_featured: number;
  product_count: number;
}

export default async function AdminCollectionsPage() {
  const collections = queryAll<CollectionRow>(`
    SELECT 
      c.id, c.slug, c.name_ar, c.name_en, c.description_ar, c.description_en, c.image_url, c.is_featured,
      COUNT(p.id) as product_count
    FROM collections c
    LEFT JOIN products p ON p.collection_id = c.id
    GROUP BY c.id
    ORDER BY c.sort_order ASC, c.created_at ASC
  `);

  const totalCollections = collections.length;
  const totalProductsInCollections = collections.reduce((acc, c) => acc + c.product_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              COLLECTIONS & CURATIONS
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            المجموعات العطرية لدار ريزان
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            إدارة تصنيفات الدار، المجموعات الحصرية، وتوزيع العطور عليها مع التحكم الكامل
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي المجموعات المسجلة</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalCollections}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Layers size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">العطور المفهرسة في المجموعات</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">{totalProductsInCollections}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Package size={20} />
          </div>
        </div>
      </div>

      {/* Create New Collection Drawer/Card */}
      <details className="bg-[#141414] border border-[#2E2E2E] rounded-xs group overflow-hidden">
        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#1A1A1A] transition-colors select-none">
          <div className="flex items-center gap-2 text-[#F7F3EA] font-semibold text-[14px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <Plus size={16} className="text-[#B89A62]" />
            <span>إضافة مجموعة عطرية جديدة (Add New Collection)</span>
          </div>
          <span className="text-[12px] text-[#B89A62] group-open:hidden">+ إظهار النموذج</span>
          <span className="text-[12px] text-[#888880] hidden group-open:inline">− إخفاء</span>
        </summary>
        <div className="p-5 border-t border-[#242424] bg-[#161616]">
          <form action={createCollectionAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الاسم بالعربية <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nameAr"
                  placeholder="مثال: المجموعة الملكية"
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
                  placeholder="e.g. Royal Collection"
                  required
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-en"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  المعرف الرابط (Slug) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  placeholder="royal-collection"
                  required
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  رابط صورة الغلاف (Image URL)
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="https://images.unsplash.com/..."
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#F7F3EA]">
                  <input type="checkbox" name="isFeatured" className="w-4 h-4 rounded-xs accent-[#B89A62]" />
                  <span>تمييز المجموعة في الصفحة الرئيسية (Featured)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                الوصف بالعربية
              </label>
              <textarea
                name="descriptionAr"
                rows={2}
                placeholder="وصف فلسفة المجموعة العطرية وتجربتها..."
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-2.5 rounded-xs outline-none leading-relaxed"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              />
            </div>

            <button
              type="submit"
              className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[13px] px-5 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Save size={15} />
              <span>إنشاء المجموعة وحفظها</span>
            </button>
          </form>
        </div>
      </details>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden flex flex-col group hover:border-[#B89A62]/40 transition-colors"
          >
            <div className="relative aspect-16/9 bg-[#111111] overflow-hidden">
              {col.image_url ? (
                <Image
                  src={col.image_url}
                  alt={col.name_ar}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">
                  <Layers size={36} />
                </div>
              )}
              <div className="absolute top-3 end-3 flex items-center gap-2">
                {col.is_featured === 1 && (
                  <span className="bg-[#B89A62] text-[#111] text-[10px] font-bold px-2 py-0.5 rounded-xs">
                    مميزة
                  </span>
                )}
                <span className="bg-[#111111]/80 backdrop-blur-md border border-[#2A2A2A] text-[#B89A62] text-[11px] px-2.5 py-1 rounded-full font-mono">
                  {col.product_count} عطور
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3
                  className="text-[16px] font-bold text-[#F7F3EA]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  {col.name_ar}
                </h3>
                <p className="text-[12px] text-[#888880] font-sans mt-0.5" dir="ltr">
                  {col.name_en}
                </p>
                <p className="text-[13px] text-[#A8A8A0] mt-2 line-clamp-2 leading-relaxed">
                  {col.description_ar || "لا يوجد وصف مدخل لهذه المجموعة."}
                </p>
              </div>

              {/* Edit Details Drawer */}
              <details className="text-[12px] bg-[#111111] border border-[#242424] rounded-xs p-3">
                <summary className="text-[#B89A62] cursor-pointer hover:underline flex items-center gap-1.5 font-medium">
                  <Edit2 size={13} />
                  <span>تعديل بيانات المجموعة</span>
                </summary>
                <form action={updateCollectionAction} className="mt-3 space-y-3 pt-3 border-t border-[#222]">
                  <input type="hidden" name="collectionId" value={col.id} />
                  <div>
                    <label className="block text-[11px] text-[#888] mb-1">الاسم بالعربية</label>
                    <input
                      type="text"
                      name="nameAr"
                      defaultValue={col.name_ar}
                      required
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#888] mb-1">الاسم بالإنجليزية</label>
                    <input
                      type="text"
                      name="nameEn"
                      defaultValue={col.name_en}
                      required
                      dir="ltr"
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs font-en"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#888] mb-1">المعرف الرابط</label>
                    <input
                      type="text"
                      name="slug"
                      defaultValue={col.slug}
                      required
                      dir="ltr"
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#888] mb-1">رابط الصورة</label>
                    <input
                      type="text"
                      name="imageUrl"
                      defaultValue={col.image_url || ""}
                      dir="ltr"
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#888] mb-1">الوصف</label>
                    <textarea
                      name="descriptionAr"
                      defaultValue={col.description_ar || ""}
                      rows={2}
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#CCC]">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      defaultChecked={col.is_featured === 1}
                      className="accent-[#B89A62]"
                    />
                    <span>مميزة في الرئيسية</span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-[#B89A62] text-[#111] font-semibold py-1.5 rounded-xs text-[11px] hover:bg-[#CDB48A] transition-colors cursor-pointer"
                  >
                    حفظ التحديثات
                  </button>
                </form>
              </details>

              <div className="pt-3 border-t border-[#242424] flex items-center justify-between">
                <Link
                  href={`/admin/products?collection=${col.id}`}
                  className="text-[12px] text-[#B89A62] hover:underline flex items-center gap-1 font-medium"
                >
                  <Package size={14} />
                  استعراض عطور المجموعة
                </Link>

                <div className="flex items-center gap-2">
                  <form action={deleteCollectionAction}>
                    <input type="hidden" name="collectionId" value={col.id} />
                    <button
                      type="submit"
                      className="text-[#706E68] hover:text-red-400 p-1.5 rounded-xs hover:bg-red-950/20 transition-colors cursor-pointer"
                      title="حذف المجموعة"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>

                  <Link
                    href={`/collections/${col.slug}`}
                    target="_blank"
                    className="text-[11px] text-[#888880] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
