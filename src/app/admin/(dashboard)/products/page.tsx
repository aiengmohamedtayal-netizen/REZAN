import Link from "next/link";
import Image from "next/image";
import { listAdminProducts } from "@/server/domain/products";
import { formatEGP } from "@/data";
import {
  Package,
  Plus,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export default async function AdminProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search as string | undefined;
  const collection = searchParams.collection as string | undefined;
  const family = searchParams.family as string | undefined;
  const status = (searchParams.status as "all" | "active" | "archived") || "all";

  const { products, total } = listAdminProducts({
    search,
    collection,
    family,
    status,
    limit: 50,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              CATALOG MANAGEMENT
            </span>
            <span className="text-[#444]">•</span>
            <span className="text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {total} عطر مسجل
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة العطور والمنتجات
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/collections"
            className="bg-[#1A1A1A] hover:bg-[#222222] text-[#C8C4BC] border border-[#2E2E2E] text-[13px] px-4 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Layers size={15} className="text-[#B89A62]" />
            <span>المجموعات</span>
          </Link>
          <button
            type="button"
            className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-medium text-[13px] px-4 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors shadow-xs"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Plus size={15} />
            <span>إضافة عطر جديد</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-[#141414] border border-[#242424] p-4 rounded-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <form method="GET" className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="ابحث بالاسم العربي أو الإنجليزي أو المعرف..."
              className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 ps-9 rounded-xs outline-none"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            />
            <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#706E68]" />
          </div>
          <button
            type="submit"
            className="bg-[#242424] hover:bg-[#2A2A2A] text-[#C8C4BC] text-[13px] px-3.5 py-2 rounded-xs transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            بحث
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            تصفية:
          </span>
          <Link
            href="/admin/products"
            className={`text-[12px] px-3 py-1.5 rounded-xs border transition-colors ${
              !collection && !family && status === "all"
                ? "bg-[#B89A62]/15 text-[#B89A62] border-[#B89A62]/40"
                : "bg-[#181818] text-[#888880] border-[#2A2A2A] hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            الكل
          </Link>
          <Link
            href="/admin/products?collection=signature"
            className={`text-[12px] px-3 py-1.5 rounded-xs border transition-colors ${
              collection === "signature"
                ? "bg-[#B89A62]/15 text-[#B89A62] border-[#B89A62]/40"
                : "bg-[#181818] text-[#888880] border-[#2A2A2A] hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            الكلاسيكية
          </Link>
          <Link
            href="/admin/products?collection=oud"
            className={`text-[12px] px-3 py-1.5 rounded-xs border transition-colors ${
              collection === "oud"
                ? "bg-[#B89A62]/15 text-[#B89A62] border-[#B89A62]/40"
                : "bg-[#181818] text-[#888880] border-[#2A2A2A] hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            عطور العود
          </Link>
        </div>
      </div>

      {/* Products DataTable */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#181818] border-b border-[#242424] text-[#888880] text-[11px] uppercase tracking-wider font-en">
              <tr>
                <th className="px-4 py-3 text-start">الزجاجة</th>
                <th className="px-4 py-3 text-start">العطر / الاسم</th>
                <th className="px-4 py-3 text-start">المجموعة</th>
                <th className="px-4 py-3 text-start">العائلة العطرية</th>
                <th className="px-4 py-3 text-start">السعر (EGP)</th>
                <th className="px-4 py-3 text-start">المخزون الكلي</th>
                <th className="px-4 py-3 text-start">الحالة</th>
                <th className="px-4 py-3 text-start">معاينة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020] text-[#D8D4CC]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#706E68]">
                    لا توجد عطور مطابقة للفلاتر المحددة
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1A1A1A] transition-colors group">
                    <td className="px-4 py-3 w-16">
                      <div className="w-12 h-14 bg-[#1F1F1F] rounded-xs overflow-hidden flex items-center justify-center p-1 border border-[#2A2A2A]">
                        {p.primaryImage ? (
                          <Image
                            src={p.primaryImage}
                            alt={p.nameAr}
                            width={44}
                            height={52}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <Package size={18} className="text-[#555]" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#F7F3EA] text-[14px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {p.nameAr}
                      </p>
                      <p className="text-[11px] text-[#888880] font-en">
                        {p.nameEn} • {p.slug}
                      </p>
                      {p.isBestSeller && (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-[#B89A62]/20 text-[#B89A62] px-1.5 py-0.5 rounded-xs mt-1">
                          <Sparkles size={9} />
                          <span>الأكثر مبيعاً</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#A09C94]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {p.collectionNameAr || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#B89A62]/90" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {p.olfactiveFamily}
                    </td>
                    <td className="px-4 py-3 font-mono font-medium">
                      {p.minPrice === p.maxPrice
                        ? formatEGP(p.minPrice)
                        : `${formatEGP(p.minPrice)} – ${formatEGP(p.maxPrice)}`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[12px] font-mono px-2 py-0.5 rounded-xs border ${
                          p.totalStock <= 20
                            ? "bg-amber-950/40 text-amber-300 border-amber-800/40"
                            : "bg-emerald-950/40 text-emerald-300 border-emerald-800/40"
                        }`}
                      >
                        {p.totalStock} زجاجة
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.isAvailable ? (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>متاح للشراء</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-red-400 flex items-center gap-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <span>غير متوفر</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/collection/${p.slug}`}
                        target="_blank"
                        className="text-[#706E68] hover:text-[#B89A62] p-1.5 inline-flex rounded-xs hover:bg-[#242424] transition-colors"
                        title="معاينة في المتجر"
                      >
                        <ExternalLink size={15} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
