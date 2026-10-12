import { queryAll } from "@/server/db";
import { getDashboardOverview, getAdvancedAnalytics } from "@/server/domain/analytics";
import { formatEGP } from "@/data";
import {
  BarChart3,
  TrendingUp,
  Coins,
  Sparkles,
  PieChart,
  MapPin,
  Repeat,
  Warehouse,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

interface TopProductRow {
  product_id: string;
  name_ar: string;
  name_en: string;
  total_units: number;
  total_revenue: number;
}

export default async function AdminAnalyticsPage() {
  const { kpis, salesByFamily, orderStatusCounts } = getDashboardOverview();
  const { governorateSales, retention, inventory, payments } = getAdvancedAnalytics();

  const topProducts = queryAll<TopProductRow>(`
    SELECT 
      oi.product_id,
      oi.product_name_ar as name_ar,
      oi.product_name_en as name_en,
      SUM(oi.quantity) as total_units,
      SUM(oi.total_price) as total_revenue
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.order_status != 'cancelled'
    GROUP BY oi.product_id
    ORDER BY total_revenue DESC
    LIMIT 10
  `);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              FINANCIAL INTELLIGENCE & ANALYTICS
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            التقارير والتحليلات البيعية والمالية المتقدمة
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            تحليل التوزيع الجغرافي للمبيعات، ولاء العملاء وتكرار الشراء، وتوزيع رأس مال المخزون
          </p>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الإيرادات المحققة</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">
              {formatEGP(kpis.totalRevenue)}
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <TrendingUp size={12} />
              +{kpis.revenueGrowthPercent}% نمو المبيعات
            </p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Coins size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">متوسط قيمة السلة (AOV)</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">
              {formatEGP(kpis.averageOrderValue)}
            </p>
            <p className="text-[11px] text-[#888880] mt-1">لكل عملية شراء معتمدة</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <BarChart3 size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">معدل تكرار الشراء (Retention)</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
              {retention.repeatPurchaseRate}%
            </p>
            <p className="text-[11px] text-[#888880] mt-1 font-mono">
              متوسط LTV: {formatEGP(retention.averageLTV)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Repeat size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">رأس مال المخزون (Retail Value)</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">
              {formatEGP(inventory.retailValuation)}
            </p>
            <p className="text-[11px] text-[#888880] mt-1 font-mono">
              {inventory.totalUnits} زجاجة جاهزة للشحن
            </p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Warehouse size={20} />
          </div>
        </div>
      </div>

      {/* Row 2: Governorate Sales Distribution & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic / Governorate Distribution */}
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <MapPin size={16} className="text-[#B89A62]" />
            التوزيع الجغرافي للمبيعات حسب المحافظات والمدن
          </h2>

          <div className="space-y-3">
            {governorateSales.map((g) => (
              <div key={g.governorate} className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#F7F3EA] font-medium">{g.governorate}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#888] font-mono">({g.orderCount} طلبات)</span>
                    <span className="text-[#B89A62] font-mono font-bold">
                      {formatEGP(g.revenue)} ({g.percent}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden border border-[#242424]">
                  <div
                    className="bg-[#B89A62] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(g.percent, 6)}%` }}
                  />
                </div>
              </div>
            ))}

            {governorateSales.length === 0 && (
              <p className="text-center text-[#888880] py-6 text-[13px]">
                لا توجد بيانات توزيع جغرافي كافية حتى الآن
              </p>
            )}
          </div>
        </div>

        {/* Payment Methods & Capital at Risk */}
        <div className="space-y-6">
          {/* Payment Methods Breakdown */}
          <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <CreditCard size={16} className="text-[#B89A62]" />
              توزيع طرق الدفع والتحصيل (Payment Methods)
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {payments.map((p) => (
                <div key={p.method} className="bg-[#111111] border border-[#242424] p-4 rounded-xs space-y-1.5">
                  <span className="text-[11px] text-[#888880] block font-medium">
                    {p.labelAr}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-[#F7F3EA] font-mono">
                      {p.percent}%
                    </span>
                    <span className="text-[12px] text-[#B89A62] font-mono">
                      {formatEGP(p.revenue)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#666] font-mono block">
                    {p.count} عملية شراء
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Capital Risk Alert */}
          <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <AlertTriangle size={16} className="text-amber-400" />
                تحليل مخاطر نفاذ المخزون (Stock Vulnerability)
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div className="bg-[#111111] p-3 rounded-xs border border-[#222]">
                <span className="text-[#888] text-[11px] block">متغيرات نافدة بالكامل:</span>
                <span className="font-mono text-xl font-bold text-red-400">{inventory.outOfStockVariants} عطر</span>
              </div>
              <div className="bg-[#111111] p-3 rounded-xs border border-[#222]">
                <span className="text-[#888] text-[11px] block">متغيرات منخفضة (أقل من ١٥):</span>
                <span className="font-mono text-xl font-bold text-amber-400">{inventory.lowStockVariants} عطر</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Fragrance Families & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Olfactive Family */}
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Sparkles size={16} className="text-[#B89A62]" />
            المبيعات حسب العائلة العطرية (Olfactive Families)
          </h2>

          <div className="space-y-3">
            {salesByFamily.map((fam) => {
              const pct = kpis.totalRevenue > 0 ? Math.round((fam.revenue / kpis.totalRevenue) * 100) : 0;
              return (
                <div key={fam.family} className="space-y-1">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#F7F3EA] font-medium">{fam.family}</span>
                    <span className="text-[#B89A62] font-mono font-bold">
                      {formatEGP(fam.revenue)} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden border border-[#242424]">
                    <div
                      className="bg-[#B89A62] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <PieChart size={16} className="text-[#B89A62]" />
            حالات تنفيذ الطلبات (Fulfillment Breakdown)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {orderStatusCounts.map((st) => (
              <div
                key={st.status}
                className="bg-[#111111] border border-[#242424] p-3.5 rounded-xs space-y-1"
              >
                <span className="text-[11px] text-[#888880] block font-mono capitalize">
                  {st.status}
                </span>
                <span className="text-xl font-bold text-[#F7F3EA] font-mono">
                  {st.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Fragrances */}
      <div className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#242424] flex items-center justify-between">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            العطور الأكثر تحقيقاً للإيرادات (Top Perfumes Leaderboard)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#111111] text-[#706E68] text-[11px] uppercase border-b border-[#242424]">
              <tr>
                <th className="px-5 py-3 text-start">الترتيب</th>
                <th className="px-5 py-3 text-start">العطر</th>
                <th className="px-5 py-3 text-start">الكميات المباعة</th>
                <th className="px-5 py-3 text-end">إجمالي الإيرادات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {topProducts.map((p, idx) => (
                <tr key={p.product_id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[#B89A62] text-[12px]">
                    #{idx + 1}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-[#F7F3EA] block">{p.name_ar}</span>
                    <span className="text-[11px] text-[#706E68] font-mono" dir="ltr">
                      {p.name_en}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[#D0CEC4] text-[12px]">
                    {p.total_units} زجاجة
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-[#B89A62] text-end">
                    {formatEGP(p.total_revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
