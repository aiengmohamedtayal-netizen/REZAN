import { queryAll } from "@/server/db";
import { formatEGP } from "@/data";
import {
  createCouponAction,
  toggleCouponAction,
  deleteCouponAction,
} from "@/server/actions/coupons";
import {
  TicketPercent,
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
  Sparkles,
} from "lucide-react";

interface CouponRow {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_value: number;
  max_uses: number | null;
  used_count: number;
  is_active: number;
  created_at: string;
}

export default async function AdminCouponsPage() {
  const coupons = queryAll<CouponRow>("SELECT * FROM coupons ORDER BY created_at DESC");

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.is_active === 1).length;
  const totalUses = coupons.reduce((sum, c) => sum + c.used_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            كوبونات وعروض الخصم
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة رموز التخفيض، الحملات الترويجية، وضوابط الاستخدام
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الكوبونات</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalCoupons}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <TicketPercent size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">الكوبونات المفعلة</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{activeCoupons}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">مرات الاستخدام المسجلة</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">{totalUses}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Sparkles size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Coupon Form */}
        <div className="lg:col-span-1 bg-[#161616] border border-[#242424] p-5 rounded-xs h-fit space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Plus size={16} className="text-[#B89A62]" />
            إنشاء كوبون جديد
          </h2>

          <form action={createCouponAction} className="space-y-4">
            <div>
              <label className="block text-[12px] text-[#888880] mb-1">رمز الكوبون (الكود)</label>
              <input
                type="text"
                name="code"
                required
                placeholder="مثال: VIPTEN"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] uppercase font-mono tracking-wider focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] text-[#888880] mb-1">نوع الخصم</label>
                <select
                  name="discount_type"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                >
                  <option value="percentage">نسبة مئوية (%)</option>
                  <option value="fixed">مبلغ ثابت (ج.م)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#888880] mb-1">قيمة الخصم</label>
                <input
                  type="number"
                  name="discount_value"
                  required
                  step="any"
                  placeholder="مثال: 15"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] text-[#888880] mb-1">الحد الأدنى للطلب</label>
                <input
                  type="number"
                  name="min_order_value"
                  placeholder="0"
                  defaultValue="0"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#888880] mb-1">أقصى استخدام</label>
                <input
                  type="number"
                  name="max_uses"
                  placeholder="غير محدود"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold py-2.5 rounded-xs text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <TicketPercent size={16} />
              حفظ وتفعيل الكوبون
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="lg:col-span-2 bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-[#242424] flex items-center justify-between">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              قائمة الكوبونات النشطة والسابقة
            </h2>
            <span className="text-[12px] text-[#888880]">{coupons.length} كوبون</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-[13px]">
              <thead className="bg-[#111111] text-[#706E68] text-[11px] uppercase border-b border-[#242424]">
                <tr>
                  <th className="px-5 py-3 text-start">الكود</th>
                  <th className="px-5 py-3 text-start">قيمة الخصم</th>
                  <th className="px-5 py-3 text-start">الحد الأدنى</th>
                  <th className="px-5 py-3 text-start">الاستخدام</th>
                  <th className="px-5 py-3 text-start">الحالة</th>
                  <th className="px-5 py-3 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242424]">
                {coupons.map((coupon) => {
                  const isActive = coupon.is_active === 1;
                  return (
                    <tr key={coupon.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-[#F7F3EA]">
                        <span className="bg-[#111111] border border-[#2A2A2A] px-2.5 py-1 rounded-xs text-[#B89A62]">
                          {coupon.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-[#F7F3EA]">
                        {coupon.discount_type === "percentage" ? (
                          <span className="text-[#B89A62]">{coupon.discount_value}%</span>
                        ) : (
                          <span className="text-[#B89A62]">{formatEGP(coupon.discount_value)}</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[#888880] font-mono text-[12px]">
                        {coupon.min_order_value > 0 ? formatEGP(coupon.min_order_value) : "بدون حد"}
                      </td>
                      <td className="px-5 py-4 text-[#888880] font-mono text-[12px]">
                        {coupon.used_count} / {coupon.max_uses ? coupon.max_uses : "∞"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {isActive ? "نشط" : "معطل"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <form action={toggleCouponAction}>
                            <input type="hidden" name="couponId" value={coupon.id} />
                            <input type="hidden" name="currentActive" value={coupon.is_active} />
                            <button
                              type="submit"
                              title={isActive ? "تعطيل الكوبون" : "تفعيل الكوبون"}
                              className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                                isActive
                                  ? "text-[#888880] hover:text-red-400 hover:bg-red-500/10"
                                  : "text-[#888880] hover:text-emerald-400 hover:bg-emerald-500/10"
                              }`}
                            >
                              {isActive ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                            </button>
                          </form>

                          <form action={deleteCouponAction}>
                            <input type="hidden" name="couponId" value={coupon.id} />
                            <button
                              type="submit"
                              title="حذف الكوبون"
                              className="p-1.5 rounded-xs text-[#888880] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {coupons.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-[#888880]">
                      لا توجد كوبونات مسجلة حتى الآن
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
