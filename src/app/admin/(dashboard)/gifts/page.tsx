import Image from "next/image";
import { queryAll } from "@/server/db";
import { formatEGP } from "@/data";
import { toggleGiftSetAction } from "@/server/actions/gifts";
import {
  Gift,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";

interface GiftSetRow {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  is_available: number;
  is_featured: number;
}

interface GiftItemRow {
  gift_set_id: string;
  item_title_ar: string;
}

export default async function AdminGiftsPage() {
  const giftSets = queryAll<GiftSetRow>(
    "SELECT * FROM gift_sets ORDER BY sort_order ASC, created_at DESC"
  );
  const items = queryAll<GiftItemRow>("SELECT gift_set_id, item_title_ar FROM gift_set_items");

  const itemsBySet = items.reduce<Record<string, string[]>>((acc, curr) => {
    if (!acc[curr.gift_set_id]) acc[curr.gift_set_id] = [];
    acc[curr.gift_set_id].push(curr.item_title_ar);
    return acc;
  }, {});

  const totalSets = giftSets.length;
  const availableSets = giftSets.filter((g) => g.is_available === 1).length;
  const avgPrice = totalSets > 0 ? Math.round(giftSets.reduce((sum, g) => sum + g.price, 0) / totalSets) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            أطقم وباقات الهدايا الفاخرة
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة مجموعات الهدايا المنتقاة بعناية وصناديق الإهداء الملكية
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الأطقم</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalSets}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Gift size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">الأطقم المتوفرة للطلب</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{availableSets}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">متوسط سعر الباقة</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">{formatEGP(avgPrice)}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Sparkles size={20} />
          </div>
        </div>
      </div>

      {/* Gift Sets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftSets.map((set) => {
          const isAvail = set.is_available === 1;
          const includedList = itemsBySet[set.id] || [];

          return (
            <div
              key={set.id}
              className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden flex flex-col group hover:border-[#B89A62]/40 transition-colors"
            >
              {/* Image & Status Badge */}
              <div className="relative aspect-4/3 bg-[#111111] overflow-hidden">
                {set.image_url ? (
                  <Image
                    src={set.image_url}
                    alt={set.title_ar}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#555]">
                    <Package size={40} />
                  </div>
                )}
                <div className="absolute top-3 end-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md ${
                      isAvail
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                        : "bg-red-950/80 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {isAvail ? "متوفر" : "غير متوفر"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    className="text-[16px] font-bold text-[#F7F3EA]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {set.title_ar}
                  </h3>
                  <p className="text-[12px] text-[#888880] font-sans mt-0.5" dir="ltr">
                    {set.title_en}
                  </p>
                  <p className="text-[13px] text-[#A8A8A0] mt-2 line-clamp-2 leading-relaxed">
                    {set.description_ar}
                  </p>

                  {/* Included Items List */}
                  {includedList.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#242424] space-y-1.5">
                      <p className="text-[11px] text-[#706E68] font-semibold flex items-center gap-1.5">
                        <Layers size={13} className="text-[#B89A62]" />
                        محتويات الطقم:
                      </p>
                      <ul className="space-y-1">
                        {includedList.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-[#D0CEC4] flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A62]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#888880] block">سعر الباقة</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#B89A62] font-mono">
                        {formatEGP(set.price)}
                      </span>
                      {set.original_price && (
                        <span className="text-xs text-[#666] line-through font-mono">
                          {formatEGP(set.original_price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <form action={toggleGiftSetAction}>
                    <input type="hidden" name="giftSetId" value={set.id} />
                    <input type="hidden" name="currentAvailable" value={set.is_available} />
                    <button
                      type="submit"
                      className={`px-3 py-1.5 rounded-xs text-[12px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isAvail
                          ? "bg-[#242424] text-[#AAA] hover:bg-red-500/10 hover:text-red-400"
                          : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      }`}
                    >
                      {isAvail ? (
                        <>
                          <XCircle size={14} />
                          تعطيل
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} />
                          تفعيل
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
