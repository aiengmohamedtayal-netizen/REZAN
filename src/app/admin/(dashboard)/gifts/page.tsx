import Image from "next/image";
import { queryAll } from "@/server/db";
import { formatEGP } from "@/data";
import {
  toggleGiftSetAction,
  createGiftSetAction,
  updateGiftSetAction,
  deleteGiftSetAction,
} from "@/server/actions/gifts";
import {
  Gift,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Save,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              LUXURY GIFTING & BOXES
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            أطقم وباقات الهدايا الفاخرة
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            إدارة مجموعات الهدايا الملكية، باقات الإهداء، والصناديق التذكارية الخاصة
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الباقات المسجلة</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalSets}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Gift size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">الباقات المتاحة للطلب</p>
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

      {/* Create New Gift Set Drawer */}
      <details className="bg-[#141414] border border-[#2E2E2E] rounded-xs group overflow-hidden">
        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#1A1A1A] transition-colors select-none">
          <div className="flex items-center gap-2 text-[#F7F3EA] font-semibold text-[14px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <Plus size={16} className="text-[#B89A62]" />
            <span>إضافة باقة هدايا فاخرة جديدة (Add New Luxury Gift Set)</span>
          </div>
          <span className="text-[12px] text-[#B89A62] group-open:hidden">+ إظهار النموذج</span>
          <span className="text-[12px] text-[#888880] hidden group-open:inline">− إخفاء</span>
        </summary>
        <div className="p-5 border-t border-[#242424] bg-[#161616]">
          <form action={createGiftSetAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  اسم الباقة بالعربية <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="titleAr"
                  placeholder="مثال: طقم إهداء ريزان الملكي"
                  required
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  اسم الباقة بالإنجليزية <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="titleEn"
                  placeholder="e.g. Royal Imperial Set"
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
                  placeholder="royal-imperial-set"
                  required
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  سعر الباقة (ج.م) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="4200"
                  required
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  السعر الأصلي قبل الخصم (اختياري)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="5000"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  رابط صورة الباقة (Image URL)
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

            <div>
              <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                محتويات الباقة (مفصولة بفواصل)
              </label>
              <input
                type="text"
                name="items"
                placeholder="زجاجة عود النور ١٠٠مل, زجاجة مسك الخلود ٥٠مل, عينة مسك روز ١٥مل, بطاقة إهداء ملكية"
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                الوصف الكامل للباقة بالعربية
              </label>
              <textarea
                name="descriptionAr"
                rows={2}
                placeholder="صندوق جلدي فاخر مبطن بالمخمل يحوي روائع العطور الشرقية..."
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
              <span>إضافة باقة الهدايا وحفظها</span>
            </button>
          </form>
        </div>
      </details>

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

                {/* Edit Form Drawer */}
                <details className="text-[12px] bg-[#111111] border border-[#242424] rounded-xs p-3">
                  <summary className="text-[#B89A62] cursor-pointer hover:underline flex items-center gap-1.5 font-medium select-none">
                    <Edit2 size={13} />
                    <span>تعديل تفاصيل الباقة والأسعار</span>
                  </summary>
                  <form action={updateGiftSetAction} className="mt-3 space-y-3 pt-3 border-t border-[#222]">
                    <input type="hidden" name="giftSetId" value={set.id} />
                    <div>
                      <label className="block text-[11px] text-[#888] mb-1">الاسم بالعربية</label>
                      <input
                        type="text"
                        name="titleAr"
                        defaultValue={set.title_ar}
                        required
                        className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#888] mb-1">الاسم بالإنجليزية</label>
                      <input
                        type="text"
                        name="titleEn"
                        defaultValue={set.title_en}
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
                        defaultValue={set.slug}
                        required
                        dir="ltr"
                        className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-[#888] mb-1">السعر (ج.م)</label>
                        <input
                          type="number"
                          name="price"
                          defaultValue={set.price}
                          required
                          className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] font-mono rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#888] mb-1">السعر الأصلي</label>
                        <input
                          type="number"
                          name="originalPrice"
                          defaultValue={set.original_price || ""}
                          className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] font-mono rounded-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#888] mb-1">رابط الصورة</label>
                      <input
                        type="text"
                        name="imageUrl"
                        defaultValue={set.image_url || ""}
                        dir="ltr"
                        className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#888] mb-1">المحتويات (مفصولة بفواصل)</label>
                      <input
                        type="text"
                        name="items"
                        defaultValue={includedList.join(", ")}
                        className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] rounded-xs"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#CCC]">
                      <input
                        type="checkbox"
                        name="isAvailable"
                        defaultChecked={set.is_available === 1}
                        className="accent-[#B89A62]"
                      />
                      <span>متوفر للطلب</span>
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-[#B89A62] text-[#111] font-semibold py-1.5 rounded-xs text-[11px] hover:bg-[#CDB48A] transition-colors cursor-pointer"
                    >
                      حفظ التعديلات
                    </button>
                  </form>
                </details>

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

                  <div className="flex items-center gap-2">
                    <form action={toggleGiftSetAction}>
                      <input type="hidden" name="giftSetId" value={set.id} />
                      <input type="hidden" name="currentAvailable" value={set.is_available} />
                      <button
                        type="submit"
                        className={`px-3 py-1.5 rounded-xs text-[12px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                          isAvail
                            ? "bg-[#242424] text-[#AAA] hover:bg-amber-500/10 hover:text-amber-400"
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

                    <form action={deleteGiftSetAction}>
                      <input type="hidden" name="giftSetId" value={set.id} />
                      <button
                        type="submit"
                        className="text-[#706E68] hover:text-red-400 p-1.5 rounded-xs hover:bg-red-950/20 transition-colors cursor-pointer"
                        title="حذف الباقة نهائياً"
                      >
                        <Trash2 size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
