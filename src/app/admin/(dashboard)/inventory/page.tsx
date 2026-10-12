import { queryAll } from "@/server/db";
import { formatEGP } from "@/data";
import { adjustStockAction } from "@/server/actions/inventory";
import {
  Warehouse,
  AlertTriangle,
  PackageX,
  Coins,
  History,
} from "lucide-react";

interface InventoryRow {
  variant_id: string;
  sku: string;
  size_ml: number;
  stock: number;
  price: number;
  product_id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  olfactive_family: string;
}

export default async function AdminInventoryPage() {
  const items = queryAll<InventoryRow>(
    `SELECT 
      v.id as variant_id, v.sku, v.size_ml, v.stock, v.price,
      p.id as product_id, p.name_ar, p.name_en, p.slug, p.olfactive_family
     FROM product_variants v
     JOIN products p ON p.id = v.product_id
     ORDER BY v.stock ASC, p.name_ar ASC`
  );

  // Computed metrics
  const totalStockUnits = items.reduce((sum, item) => sum + item.stock, 0);
  const totalValuation = items.reduce((sum, item) => sum + item.stock * item.price, 0);
  const outOfStockCount = items.filter((item) => item.stock === 0).length;
  const lowStockCount = items.filter((item) => item.stock > 0 && item.stock <= 15).length;

  // Recent 6 inventory movements
  const recentMovements = queryAll<{
    id: string;
    sku: string;
    quantity_change: number;
    new_stock: number;
    reason: string;
    notes: string | null;
    created_at: string;
    name_ar: string;
  }>(
    `SELECT m.id, m.quantity_change, m.new_stock, m.reason, m.notes, m.created_at,
            v.sku, p.name_ar
     FROM inventory_movements m
     JOIN product_variants v ON v.id = m.variant_id
     JOIN products p ON p.id = m.product_id
     ORDER BY m.created_at DESC
     LIMIT 6`
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              WAREHOUSE & LOGISTICS
            </span>
            <span className="text-[#444]">•</span>
            <span className="text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {items.length} متغير عطر مسجل
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة المستودع والمخزون
          </h1>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>إجمالي الوحدات بالمستودع</span>
            <Warehouse size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[22px] font-bold text-[#F7F3EA] font-mono mb-1">
            {totalStockUnits.toLocaleString()} زجاجة
          </p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            جاهزة للشحن الفوري
          </p>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>القيمة التقديرية للمخزون</span>
            <Coins size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[22px] font-bold text-[#B89A62] font-mono mb-1">
            {formatEGP(totalValuation)}
          </p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            بسعر البيع الحالي
          </p>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>عطور منخفضة المخزون</span>
            <AlertTriangle size={16} className="text-amber-400" />
          </div>
          <p className="text-[22px] font-bold text-amber-300 font-mono mb-1">
            {lowStockCount}
          </p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            أقل من أو يساوي ١٥ زجاجة
          </p>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>نفد من المخزون</span>
            <PackageX size={16} className="text-red-400" />
          </div>
          <p className="text-[22px] font-bold text-red-300 font-mono mb-1">
            {outOfStockCount}
          </p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            تتطلب إعادة توريد عاجلة
          </p>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
        <div className="p-4 border-b border-[#242424] flex items-center justify-between">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            أرصدة المخزون والتسوية المباشرة
          </h2>
          <span className="text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            جميع التسويات موثقة تلقائياً بسجل التدقيق
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#181818] border-b border-[#242424] text-[#888880] text-[11px] uppercase tracking-wider font-en">
              <tr>
                <th className="px-4 py-3 text-start">SKU</th>
                <th className="px-4 py-3 text-start">العطر</th>
                <th className="px-4 py-3 text-start">الحجم</th>
                <th className="px-4 py-3 text-start">سعر الوحدة</th>
                <th className="px-4 py-3 text-start">قيمة المخزون</th>
                <th className="px-4 py-3 text-start">الرصيد الحالي</th>
                <th className="px-4 py-3 text-start">تسوية سريعة للرصيد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020] text-[#D8D4CC]">
              {items.map((item) => {
                const isCritical = item.stock <= 5;
                const isLow = item.stock > 5 && item.stock <= 15;
                return (
                  <tr key={item.variant_id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#B89A62]">
                      {item.sku}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {item.name_ar}
                      </p>
                      <p className="text-[11px] text-[#706E68] font-en">
                        {item.name_en}
                      </p>
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {item.size_ml} مل
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {formatEGP(item.price)}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#B89A62]">
                      {formatEGP(item.stock * item.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[12px] font-mono px-2.5 py-0.5 rounded-xs border font-bold ${
                          isCritical
                            ? "bg-red-950/60 text-red-300 border-red-800/40"
                            : isLow
                            ? "bg-amber-950/60 text-amber-300 border-amber-800/40"
                            : "bg-emerald-950/60 text-emerald-300 border-emerald-800/40"
                        }`}
                      >
                        {item.stock} زجاجة
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {/* Direct Inline Stock Adjustment with Reason and Controls */}
                      <details className="text-[12px] group">
                        <summary className="cursor-pointer text-[#B89A62] hover:underline flex items-center gap-1 font-medium select-none">
                          <span>تعديل الجرد</span>
                        </summary>
                        <form action={adjustStockAction} className="mt-2 p-3 bg-[#111111] border border-[#262626] rounded-xs space-y-2 min-w-[220px]">
                          <input type="hidden" name="variantId" value={item.variant_id} />
                          <div>
                            <label className="block text-[10px] text-[#888] mb-1">الرصيد الجديد:</label>
                            <input
                              type="number"
                              name="newStock"
                              defaultValue={item.stock}
                              min={0}
                              className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[12px] font-mono rounded-xs text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#888] mb-1">سبب التعديل:</label>
                            <select
                              name="reason"
                              defaultValue="manual_adjustment"
                              className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[11px] rounded-xs"
                            >
                              <option value="restock">إعادة تموين (Restock)</option>
                              <option value="manual_adjustment">تسوية يدوية (Adjustment)</option>
                              <option value="damaged">هالك / تالف (Damaged)</option>
                              <option value="return">مرتجع عميل (Return)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#888] mb-1">السعر (ج.م):</label>
                            <input
                              type="number"
                              name="price"
                              defaultValue={item.price}
                              className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[11px] font-mono rounded-xs text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#888] mb-1">ملاحظة التعديل:</label>
                            <input
                              type="text"
                              name="notes"
                              placeholder="سبب الجرد أو رقم الشحنة..."
                              className="w-full bg-[#1A1A1A] border border-[#333] text-white px-2 py-1 text-[11px] rounded-xs"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-[#B89A62] text-[#111] font-semibold py-1 rounded-xs text-[11px] hover:bg-[#CDB48A] transition-colors cursor-pointer"
                          >
                            تأكيد واعتماد الحركة
                          </button>
                        </form>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Movements Log */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs p-5">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#242424]">
          <History size={16} className="text-[#B89A62]" />
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            أحدث حركات وتعديلات المستودع (Audit Trail)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentMovements.map((mov) => (
            <div key={mov.id} className="bg-[#1A1A1A] border border-[#262626] p-3 rounded-xs text-[12px]">
              <div className="flex justify-between font-mono mb-1">
                <span className="text-[#B89A62] font-bold">{mov.sku}</span>
                <span className="text-[#706E68] text-[10px]">{mov.created_at?.slice(0, 16)}</span>
              </div>
              <p className="text-[#F7F3EA] font-medium" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                {mov.name_ar}
              </p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#222]">
                <span className="text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  السبب: {mov.reason}
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  الرصيد بعد الحركة: {mov.new_stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
