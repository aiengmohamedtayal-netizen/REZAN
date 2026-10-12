import { queryAll } from "@/server/db";
import { getDashboardOverview } from "@/server/domain/analytics";
import { formatEGP } from "@/data";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  Coins,
  Sparkles,
  PieChart,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            التقارير والتحليلات البيعية والمالية
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            مؤشرات النمو، الإيرادات المحققة، توزيع المبيعات حسب العائلات العطرية والمجموعات
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الإيرادات</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">
              {formatEGP(kpis.totalRevenue)}
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <TrendingUp size={12} />
              +{kpis.revenueGrowthPercent}% نمو شهري
            </p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Coins size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">متوسط قيمة الطلب (AOV)</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">
              {formatEGP(kpis.averageOrderValue)}
            </p>
            <p className="text-[11px] text-[#888880] mt-1">لكل عملية شراء</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <BarChart3 size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">الطلبات المنجزة</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">
              {kpis.totalOrders}
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <TrendingUp size={12} />
              +{kpis.ordersGrowthPercent}% هذا الأسبوع
            </p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShoppingBag size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">عملاء النخبة المسجلين</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">
              {kpis.totalCustomers}
            </p>
            <p className="text-[11px] text-[#888880] mt-1">حسابات نشطة</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Users size={20} />
          </div>
        </div>
      </div>

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

            {salesByFamily.length === 0 && (
              <p className="text-center text-[#888880] py-6 text-[13px]">
                لا توجد بيانات مبيعات للعائلات العطرية حتى الآن
              </p>
            )}
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
            العطور الأكثر تحقيقاً للإيرادات (Top Perfumes)
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

              {topProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-[#888880]">
                    لا توجد بيانات مبيعات مسجلة حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
