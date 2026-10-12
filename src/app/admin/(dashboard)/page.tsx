import Link from "next/link";
import { getCurrentAdmin } from "@/server/auth/session";
import { getDashboardOverview } from "@/server/domain/analytics";
import { formatEGP } from "@/data";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Users,
  CreditCard,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Package,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  const {
    kpis,
    salesByFamily,
    salesByCollection,
    orderStatusCounts,
    recentOrders,
    lowStockItems,
    recentActivity,
  } = getDashboardOverview();

  // Status mapping
  const statusLabels: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: "قيد الانتظار", bg: "bg-amber-950/40 border-amber-800/40", text: "text-amber-300" },
    processing: { label: "قيد التجهيز", bg: "bg-blue-950/40 border-blue-800/40", text: "text-blue-300" },
    shipped: { label: "تم الشحن", bg: "bg-purple-950/40 border-purple-800/40", text: "text-purple-300" },
    delivered: { label: "تم التوصيل", bg: "bg-emerald-950/40 border-emerald-800/40", text: "text-emerald-300" },
    cancelled: { label: "ملغي", bg: "bg-red-950/40 border-red-800/40", text: "text-red-300" },
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              OPERATIONS CONSOLE
            </span>
            <span className="text-[#444]">•</span>
            <span className="text-[12px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              مرحباً، {admin?.name}
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            نظرة عامة على المتجر
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products"
            className="bg-[#1A1A1A] hover:bg-[#222222] text-[#F7F3EA] border border-[#2E2E2E] text-[13px] px-4 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Plus size={15} className="text-[#B89A62]" />
            <span>إضافة عطر</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-medium text-[13px] px-4 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors shadow-xs"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Package size={15} />
            <span>تحديث المخزون</span>
          </Link>
        </div>
      </div>

      {/* ── 1. Stats Grid (Real Database KPIs) ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>إجمالي المبيعات</span>
            <CreditCard size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-[#F7F3EA] leading-none mb-2">
            {formatEGP(kpis.totalRevenue)}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp size={12} />
            <span>+{kpis.revenueGrowthPercent}% نمو شهري</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>عدد الطلبات</span>
            <ShoppingBag size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-[#F7F3EA] leading-none mb-2">
            {kpis.totalOrders}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp size={12} />
            <span>+{kpis.ordersGrowthPercent}% معدل الطلب</span>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>متوسط قيمة الطلب</span>
            <span className="text-[10px] text-[#B89A62] font-mono">AOV</span>
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-[#F7F3EA] leading-none mb-2">
            {formatEGP(kpis.averageOrderValue)}
          </p>
          <p className="text-[11px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            لكل طلبية مسجلة
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>طلبات قيد المعالجة</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-amber-300 leading-none mb-2">
            {kpis.pendingOrdersCount}
          </p>
          <Link
            href="/admin/orders?status=pending"
            className="text-[11px] text-[#B89A62] hover:underline flex items-center gap-1"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <span>متابعة الطلبات</span>
            <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>عطور منخفضة المخزون</span>
            <AlertTriangle size={16} className="text-orange-400" />
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-orange-300 leading-none mb-2">
            {kpis.lowStockCount}
          </p>
          <Link
            href="/admin/inventory"
            className="text-[11px] text-[#B89A62] hover:underline flex items-center gap-1"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <span>ضبط المستودع</span>
            <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Total Customers */}
        <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>قاعدة العملاء</span>
            <Users size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[20px] sm:text-[22px] font-bold text-[#F7F3EA] leading-none mb-2">
            {kpis.totalCustomers}
          </p>
          <Link
            href="/admin/customers"
            className="text-[11px] text-[#888880] hover:text-[#B89A62] flex items-center gap-1"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <span>سجل العملاء</span>
            <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── 2. Performance Breakdowns & Distributions ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Olfactive Family */}
        <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs flex flex-col">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] mb-4 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            توزيع المبيعات بالعائلات العطرية
          </h2>
          <div className="space-y-3.5 flex-1">
            {salesByFamily.length === 0 ? (
              <p className="text-[13px] text-[#706E68] text-center py-8">لا توجد مبيعات مسجلة حتى الآن</p>
            ) : (
              salesByFamily.map((item) => {
                const percent = kpis.totalRevenue > 0 ? Math.round((item.revenue / kpis.totalRevenue) * 100) : 0;
                return (
                  <div key={item.family} className="space-y-1">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#C8C4BC] font-medium" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {item.family}
                      </span>
                      <span className="text-[#B89A62] font-mono">
                        {formatEGP(item.revenue)} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#202020] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B89A62] rounded-full transition-all"
                        style={{ width: `${Math.max(percent, 8)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sales by Collection */}
        <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs flex flex-col">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] mb-4 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            المبيعات بحسب المجموعات
          </h2>
          <div className="space-y-3.5 flex-1">
            {salesByCollection.length === 0 ? (
              <p className="text-[13px] text-[#706E68] text-center py-8">لا توجد مبيعات مسجلة للمجموعات</p>
            ) : (
              salesByCollection.map((col) => {
                const percent = kpis.totalRevenue > 0 ? Math.round((col.revenue / kpis.totalRevenue) * 100) : 0;
                return (
                  <div key={col.slug} className="space-y-1">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#C8C4BC] font-medium" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {col.nameAr}
                      </span>
                      <span className="text-[#B89A62] font-mono">
                        {formatEGP(col.revenue)} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#202020] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-[#B89A62] to-[#887042] rounded-full transition-all"
                        style={{ width: `${Math.max(percent, 10)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs flex flex-col">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] mb-4 pb-3 border-b border-[#242424]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            حالات الطلبات الحالية
          </h2>
          <div className="space-y-3 flex-1">
            {orderStatusCounts.map((sc) => {
              const info = statusLabels[sc.status] || {
                label: sc.status,
                bg: "bg-gray-800",
                text: "text-gray-300",
              };
              return (
                <div
                  key={sc.status}
                  className="flex items-center justify-between p-2.5 rounded-xs bg-[#1A1A1A] border border-[#242424]"
                >
                  <span
                    className={`text-[12px] px-2.5 py-1 rounded-xs border ${info.bg} ${info.text}`}
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    {info.label}
                  </span>
                  <span className="text-[14px] font-bold text-[#F7F3EA] font-mono">
                    {sc.count} طلب
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Operational Tables (Recent Orders & Critical Low Stock) ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders DataTable */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#242424] flex items-center justify-between">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              أحدث الطلبات الواردة
            </h2>
            <Link
              href="/admin/orders"
              className="text-[12px] text-[#B89A62] hover:underline"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              عرض كافة الطلبات ({kpis.totalOrders}) ←
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-[13px]">
              <thead className="bg-[#181818] border-b border-[#242424] text-[#888880] text-[11px] uppercase tracking-wider font-en">
                <tr>
                  <th className="px-4 py-3 text-start">Order</th>
                  <th className="px-4 py-3 text-start">Customer</th>
                  <th className="px-4 py-3 text-start">Total</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-start">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020] text-[#D8D4CC]">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#706E68]">
                      لا توجد طلبات واردة حتى الآن
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => {
                    const st = statusLabels[ord.order_status] || {
                      label: ord.order_status,
                      bg: "bg-gray-800",
                      text: "text-gray-300",
                    };
                    return (
                      <tr key={ord.id} className="hover:bg-[#1A1A1A] transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-[#B89A62]">
                          {ord.order_number}
                        </td>
                        <td className="px-4 py-3 font-medium text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                          {ord.customer_name}
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {formatEGP(ord.total)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded-xs border ${st.bg} ${st.text}`}
                            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                          >
                            {st.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#706E68] text-[11px] font-mono">
                          {ord.created_at?.slice(0, 16)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-[#242424] flex items-center justify-between">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              تنبيهات المخزون
            </h2>
            <Link
              href="/admin/inventory"
              className="text-[12px] text-[#B89A62] hover:underline"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              المستودع ←
            </Link>
          </div>

          <div className="divide-y divide-[#202020] flex-1">
            {lowStockItems.length === 0 ? (
              <div className="p-6 text-center text-[#706E68] text-[13px] flex flex-col items-center justify-center h-full">
                <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>المخزون بوضع ممتاز ومستقر</span>
              </div>
            ) : (
              lowStockItems.map((item) => (
                <div key={item.variant_id} className="p-3.5 px-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors">
                  <div>
                    <p className="text-[13px] font-medium text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {item.name_ar}
                    </p>
                    <p className="text-[11px] text-[#706E68] font-mono">
                      {item.sku} • {item.size_ml} مل
                    </p>
                  </div>
                  <div className="text-end">
                    <span
                      className={`text-[12px] font-bold font-mono px-2 py-0.5 rounded-xs ${
                        item.stock <= 5 ? "bg-red-950/60 text-red-300 border border-red-800/40" : "bg-amber-950/60 text-amber-300 border border-amber-800/40"
                      }`}
                    >
                      {item.stock} زجاجة
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Audit Log Activity Stream ───────────────────────────────────────── */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#242424]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#B89A62]" />
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              أحدث سجلات التدقيق والعمليات الإدارية
            </h2>
          </div>
          <Link
            href="/admin/audit-log"
            className="text-[12px] text-[#B89A62] hover:underline"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            سجل العمليات الكامل ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentActivity.length === 0 ? (
            <p className="col-span-3 text-[13px] text-[#706E68] text-center py-4">
              لا توجد عمليات مسجلة حديثاً
            </p>
          ) : (
            recentActivity.map((act) => (
              <div
                key={act.id}
                className="bg-[#181818] border border-[#262626] p-3 rounded-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-[#B89A62]">
                    {act.action}
                  </span>
                  <span className="text-[10px] text-[#706E68] font-mono">
                    {act.created_at?.slice(11, 16)}
                  </span>
                </div>
                <p className="text-[12px] text-[#C8C4BC] truncate" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  بواسطة: {act.admin_email || "النظام"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
