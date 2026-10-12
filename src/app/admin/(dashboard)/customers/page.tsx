import { Suspense } from "react";
import { queryAll } from "@/server/db";
import { formatEGP } from "@/data";
import { Users, Search, ShoppingBag, Award } from "lucide-react";

interface CustomerRow {
  id: string;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  total_orders: number;
  total_spent: number;
  status: string;
  created_at: string;
}

export default function AdminCustomersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="space-y-6">
      {/* Static Header Shell */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              CLIENTELE CONCIERGE
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            سجل العملاء والنخبة
          </h1>
        </div>
      </div>

      {/* Static Search Shell */}
      <div className="bg-[#141414] border border-[#242424] p-4 rounded-xs">
        <form method="GET" className="flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              name="search"
              placeholder="ابحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
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
      </div>

      {/* Dynamic Streamed Content */}
      <Suspense fallback={<CustomersSkeleton />}>
        <CustomersContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function CustomersContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search as string | undefined;

  const whereClauses: string[] = [];
  const queryParams: unknown[] = [];

  if (search) {
    whereClauses.push("(first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?)");
    const s = `%${search}%`;
    queryParams.push(s, s, s, s);
  }

  const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  const customers = queryAll<CustomerRow>(
    `SELECT * FROM customers ${whereSql} ORDER BY total_spent DESC, total_orders DESC`,
    queryParams
  );

  const totalCount = customers.length;
  const totalSpendAll = customers.reduce((acc, c) => acc + c.total_spent, 0);
  const avgClv = totalCount > 0 ? Math.round(totalSpendAll / totalCount) : 0;
  const vipCount = customers.filter((c) => c.total_spent >= 10000).length;

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>إجمالي العملاء</span>
            <Users size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[22px] font-bold text-[#F7F3EA] font-mono mb-1">{totalCount}</p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>عميل نشط في المنظومة</p>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>عملاء النخبة (VIP)</span>
            <Award size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[22px] font-bold text-[#B89A62] font-mono mb-1">{vipCount}</p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>مشتريات تفوق ١٠,٠٠٠ ج.م</p>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs">
          <div className="flex items-center justify-between text-[#888880] mb-2 text-[12px]">
            <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>متوسط إنفاق العميل</span>
            <ShoppingBag size={16} className="text-[#B89A62]" />
          </div>
          <p className="text-[22px] font-bold text-[#F7F3EA] font-mono mb-1">{formatEGP(avgClv)}</p>
          <p className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>قيمة العميل الدائمة (CLV)</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#181818] border-b border-[#242424] text-[#888880] text-[11px] uppercase tracking-wider font-en">
              <tr>
                <th className="px-4 py-3 text-start">العميل</th>
                <th className="px-4 py-3 text-start">البريد الإلكتروني</th>
                <th className="px-4 py-3 text-start">رقم الهاتف</th>
                <th className="px-4 py-3 text-start">عدد الطلبات</th>
                <th className="px-4 py-3 text-start">إجمالي الإنفاق</th>
                <th className="px-4 py-3 text-start">الفئة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020] text-[#D8D4CC]">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#706E68]">
                    لا يوجد عملاء مطابقين للبحث
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const isVip = c.total_spent >= 10000;
                  return (
                    <tr key={c.id} className="hover:bg-[#1A1A1A] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#B89A62] text-[12px] font-bold">
                            {c.first_name[0]}
                          </div>
                          <span className="font-medium text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                            {c.first_name} {c.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[#888880]" dir="ltr">
                        {c.email}
                      </td>
                      <td className="px-4 py-3 font-mono text-[#888880]" dir="ltr">
                        {c.phone || "—"}
                      </td>
                      <td className="px-4 py-3 font-mono font-medium">
                        {c.total_orders} طلبية
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-[#B89A62]">
                        {formatEGP(c.total_spent)}
                      </td>
                      <td className="px-4 py-3">
                        {isVip ? (
                          <span className="text-[11px] bg-[#B89A62]/15 text-[#B89A62] border border-[#B89A62]/30 px-2 py-0.5 rounded-xs font-medium inline-flex items-center gap-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                            <Award size={11} />
                            <span>نخبة ريزان</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#706E68]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                            عميل منتظم
                          </span>
                        )}
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

function CustomersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#141414] border border-[#242424] p-4.5 rounded-xs animate-pulse">
            <div className="h-4 bg-[#242424] rounded-xs w-24 mb-3" />
            <div className="h-8 bg-[#202020] rounded-xs w-16 mb-2" />
            <div className="h-3 bg-[#1A1A1A] rounded-xs w-32" />
          </div>
        ))}
      </div>
      <div className="bg-[#141414] border border-[#242424] rounded-xs p-6 animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-[#1A1A1A] rounded-xs" />
        ))}
      </div>
    </div>
  );
}
