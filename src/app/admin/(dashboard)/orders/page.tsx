import { Suspense } from "react";
import Link from "next/link";
import { listAdminOrders } from "@/server/domain/orders";
import { formatEGP } from "@/data";
import { updateOrderStatusAction } from "@/server/actions/orders";
import {
  Search,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  Eye,
} from "lucide-react";

export default function AdminOrdersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              ORDER FULFILLMENT
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة الطلبات والشحن
          </h1>
        </div>
      </div>

      {/* Dynamic Streamed Content */}
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function OrdersContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search as string | undefined;
  const status = params.status as string | undefined;
  const paymentStatus = params.paymentStatus as string | undefined;

  const { orders } = listAdminOrders({
    search,
    status,
    paymentStatus,
    limit: 50,
  });

  const statusBadges: Record<string, { label: string; bg: string; text: string }> = {
    pending: { label: "قيد الانتظار", bg: "bg-amber-950/40 border-amber-800/40", text: "text-amber-300" },
    processing: { label: "قيد التجهيز", bg: "bg-blue-950/40 border-blue-800/40", text: "text-blue-300" },
    shipped: { label: "تم الشحن", bg: "bg-purple-950/40 border-purple-800/40", text: "text-purple-300" },
    delivered: { label: "تم التوصيل", bg: "bg-emerald-950/40 border-emerald-800/40", text: "text-emerald-300" },
    cancelled: { label: "ملغي", bg: "bg-red-950/40 border-red-800/40", text: "text-red-300" },
  };

  const paymentBadges: Record<string, { label: string; text: string }> = {
    paid: { label: "مدفوع بالكامل", text: "text-emerald-400" },
    pending: { label: "الدفع عند الاستلام", text: "text-amber-400" },
    failed: { label: "فشل الدفع", text: "text-red-400" },
  };

  return (
    <>
      {/* Filter Tabs & Search */}
      <div className="bg-[#141414] border border-[#242424] p-4 rounded-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <form method="GET" className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="ابحث برقم الطلب، اسم العميل، الهاتف أو الإيميل..."
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

        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { label: "كافة الطلبات", val: undefined },
            { label: "قيد الانتظار", val: "pending" },
            { label: "قيد التجهيز", val: "processing" },
            { label: "تم الشحن", val: "shipped" },
            { label: "تم التوصيل", val: "delivered" },
            { label: "الملغية", val: "cancelled" },
          ].map((tab) => {
            const active = status === tab.val || (!status && tab.val === undefined);
            const href = tab.val ? `/admin/orders?status=${tab.val}` : "/admin/orders";
            return (
              <Link
                key={tab.label}
                href={href}
                className={`text-[12px] px-3 py-1.5 rounded-xs border transition-colors ${
                  active
                    ? "bg-[#B89A62]/15 text-[#B89A62] border-[#B89A62]/40"
                    : "bg-[#181818] text-[#888880] border-[#2A2A2A] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#181818] border-b border-[#242424] text-[#888880] text-[11px] uppercase tracking-wider font-en">
              <tr>
                <th className="px-4 py-3 text-start">Order Number</th>
                <th className="px-4 py-3 text-start">العميل والتواصل</th>
                <th className="px-4 py-3 text-start">الوجهة (المحافظة)</th>
                <th className="px-4 py-3 text-start">القيمة الإجمالية</th>
                <th className="px-4 py-3 text-start">حالة الدفع</th>
                <th className="px-4 py-3 text-start">حالة الطلب</th>
                <th className="px-4 py-3 text-start">تحديث الحالة السريع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020] text-[#D8D4CC]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#706E68]">
                    لا توجد طلبات مطابقة للفلاتر المحددة
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const sb = statusBadges[o.orderStatus] || {
                    label: o.orderStatus,
                    bg: "bg-gray-800",
                    text: "text-gray-300",
                  };
                  const pb = paymentBadges[o.paymentStatus] || {
                    label: o.paymentStatus,
                    text: "text-gray-300",
                  };
                  return (
                    <tr key={o.id} className="hover:bg-[#1A1A1A] transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[#B89A62]">
                        <Link href={`/admin/orders/${o.id}`} className="hover:underline">
                          {o.orderNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                          {o.customerName}
                        </p>
                        <p className="text-[11px] text-[#888880] font-mono mt-0.5" dir="ltr">
                          {o.customerPhone}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-[#A09C94]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {o.governorate} — {o.city}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        {formatEGP(o.total)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[12px] font-medium ${pb.text}`} style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                          {pb.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] px-2.5 py-1 rounded-xs border ${sb.bg} ${sb.text}`}
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          {sb.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/admin/orders/${o.id}`}
                            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#B89A62] p-1.5 rounded-xs transition-colors"
                            title="تفاصيل الطلب وبوليصة الشحن"
                          >
                            <Eye size={13} />
                          </Link>
                          {o.orderStatus === "pending" && (
                            <form action={updateOrderStatusAction}>
                              <input type="hidden" name="orderId" value={o.id} />
                              <input type="hidden" name="status" value="processing" />
                              <button
                                type="submit"
                                title="تجهيز الطلب"
                                className="bg-blue-950/60 hover:bg-blue-900 border border-blue-800/40 text-blue-300 text-[11px] px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                              >
                                <CheckCircle size={12} />
                                <span>تجهيز</span>
                              </button>
                            </form>
                          )}

                          {o.orderStatus === "processing" && (
                            <form action={updateOrderStatusAction}>
                              <input type="hidden" name="orderId" value={o.id} />
                              <input type="hidden" name="status" value="shipped" />
                              <button
                                type="submit"
                                title="تسليم للشحن"
                                className="bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 text-purple-300 text-[11px] px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                              >
                                <Truck size={12} />
                                <span>شحن</span>
                              </button>
                            </form>
                          )}

                          {o.orderStatus === "shipped" && (
                            <form action={updateOrderStatusAction}>
                              <input type="hidden" name="orderId" value={o.id} />
                              <input type="hidden" name="status" value="delivered" />
                              <button
                                type="submit"
                                title="تأكيد الاستلام"
                                className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/40 text-emerald-300 text-[11px] px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                              >
                                <PackageCheck size={12} />
                                <span>تم التسليم</span>
                              </button>
                            </form>
                          )}

                          {o.orderStatus !== "cancelled" && o.orderStatus !== "delivered" && (
                            <form action={updateOrderStatusAction}>
                              <input type="hidden" name="orderId" value={o.id} />
                              <input type="hidden" name="status" value="cancelled" />
                              <button
                                type="submit"
                                title="إلغاء الطلب"
                                className="text-red-400 hover:text-red-300 hover:bg-red-950/30 p-1 rounded-xs transition-colors cursor-pointer"
                              >
                                <XCircle size={14} />
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-14 bg-[#141414] border border-[#242424] rounded-xs animate-pulse" />
      <div className="bg-[#141414] border border-[#242424] rounded-xs p-6 animate-pulse space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-[#1A1A1A] rounded-xs" />
        ))}
      </div>
    </div>
  );
}
