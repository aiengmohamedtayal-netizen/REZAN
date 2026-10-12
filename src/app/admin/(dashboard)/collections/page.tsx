import Image from "next/image";
import Link from "next/link";
import { queryAll } from "@/server/db";
import { Layers, Package, ExternalLink } from "lucide-react";

interface CollectionRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  image_url: string | null;
  is_featured: number;
  product_count: number;
}

export default async function AdminCollectionsPage() {
  const collections = queryAll<CollectionRow>(`
    SELECT 
      c.id, c.slug, c.name_ar, c.name_en, c.description_ar, c.image_url, c.is_featured,
      COUNT(p.id) as product_count
    FROM collections c
    LEFT JOIN products p ON p.collection_id = c.id
    GROUP BY c.id
    ORDER BY c.sort_order ASC
  `);

  const totalCollections = collections.length;
  const totalProductsInCollections = collections.reduce((acc, c) => acc + c.product_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            المجموعات العطرية
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة تصنيفات الدار، المجموعات الحصرية، وتوزيع العطور عليها
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي المجموعات</p>
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
              <div className="absolute top-3 end-3">
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
                  {col.description_ar}
                </p>
              </div>

              <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                <Link
                  href={`/admin/products?collection=${col.id}`}
                  className="text-[12px] text-[#B89A62] hover:underline flex items-center gap-1 font-medium"
                >
                  <Package size={14} />
                  استعراض عطور المجموعة
                </Link>

                <Link
                  href={`/collections/${col.slug}`}
                  target="_blank"
                  className="text-[11px] text-[#888880] hover:text-white flex items-center gap-1 transition-colors"
                >
                  معاينة في المتجر
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
