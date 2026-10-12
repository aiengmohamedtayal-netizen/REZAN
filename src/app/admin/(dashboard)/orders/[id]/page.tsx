import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOrderDetail } from "@/server/domain/orders";
import { formatEGP } from "@/data";
import { updateOrderDetailsAction, updateOrderStatusAction, updateOrderPaymentStatusAction } from "@/server/actions/orders";
import {
  ArrowRight,
  Truck,
  CheckCircle,
  MapPin,
  CreditCard,
  Package,
  Printer,
  Save,
} from "lucide-react";

export default async function AdminOrderDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const order = getOrderDetail(id);

  if (!order) {
    notFound();
  }

  const items = (order.items || []) as Array<{
    id: string;
    product_name_ar: string;
    product_name_en: string;
    size_ml: number;
    unit_price: number;
    quantity: number;
    total_price: number;
    product_image?: string;
    product_slug?: string;
  }>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="w-9 h-9 rounded-xs bg-[#1A1A1A] hover:bg-[#222222] border border-[#2E2E2E] text-[#A09C94] hover:text-[#F7F3EA] flex items-center justify-center transition-colors"
          >
            <ArrowRight size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-mono">
                {String(order.order_number)}
              </span>
              <span className="text-[#444]">•</span>
              <span className="text-[11px] text-[#706E68] font-mono">{String(order.created_at).slice(0, 16)}</span>
            </div>
            <h1
              className="text-[22px] sm:text-[24px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              تفاصيل وتجهيز الطلب: {String(order.order_number)}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {}}
            className="bg-[#1A1A1A] hover:bg-[#242424] text-[#C8C4BC] border border-[#2E2E2E] text-[13px] px-3.5 py-2 rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Printer size={15} className="text-[#B89A62]" />
            <span>طباعة بوليصة الشحن</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2 Cols: Items & Shipping Update */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Table */}
          <div className="bg-[#141414] border border-[#242424] rounded-xs overflow-hidden">
            <div className="p-4 border-b border-[#242424] flex items-center justify-between">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Package size={16} className="text-[#B89A62]" />
                محتويات الطلب ({items.length} قطع)
              </h2>
            </div>

            <div className="divide-y divide-[#242424]">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xs bg-[#1A1A1A] overflow-hidden border border-[#2A2A2A] shrink-0">
                      {item.product_image ? (
                        <Image src={item.product_image} alt={item.product_name_ar} fill sizes="48px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#555]">
                          <Package size={16} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#F7F3EA]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                        {item.product_name_ar}
                      </h4>
                      <p className="text-[11px] text-[#706E68] font-mono">{item.product_name_en} — {item.size_ml} مل</p>
                    </div>
                  </div>

                  <div className="text-end">
                    <p className="text-[13px] font-mono text-[#F7F3EA]">
                      {item.quantity} × {formatEGP(item.unit_price)}
                    </p>
                    <p className="text-[14px] font-mono font-bold text-[#B89A62] mt-0.5">
                      {formatEGP(item.total_price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-[#111111] border-t border-[#242424] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#888880]">
                <span>المجموع الفرعي للسلع:</span>
                <span className="font-mono text-[#F7F3EA]">{formatEGP(Number(order.subtotal))}</span>
              </div>
              <div className="flex justify-between text-[#888880]">
                <span>رسوم التوصيل السريع:</span>
                <span className="font-mono text-[#F7F3EA]">{formatEGP(Number(order.shipping_fee))}</span>
              </div>
              {Number(order.discount_amount) > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>الخصم المطبق ({String(order.coupon_code || "كوبون")}):</span>
                  <span className="font-mono">-{formatEGP(Number(order.discount_amount))}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#242424] flex justify-between text-[15px] font-bold text-[#F7F3EA]">
                <span>الإجمالي النهائي المستحق:</span>
                <span className="font-mono text-[#B89A62] text-[18px]">{formatEGP(Number(order.total))}</span>
              </div>
            </div>
          </div>

          {/* Customer Address & Shipping Control Form */}
          <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <MapPin size={16} className="text-[#B89A62]" />
              بيانات العميل وعنوان الشحن والتوصيل
            </h2>

            <form action={updateOrderDetailsAction} className="space-y-4">
              <input type="hidden" name="orderId" value={String(order.id)} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    اسم العميل
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    defaultValue={String(order.customer_name)}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    name="customerPhone"
                    defaultValue={String(order.customer_phone)}
                    required
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    defaultValue={String(order.customer_email)}
                    required
                    dir="ltr"
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-en"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    المحافظة / الإمارة
                  </label>
                  <input
                    type="text"
                    name="governorate"
                    defaultValue={String(order.governorate)}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    المدينة / الحي
                  </label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={String(order.city)}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  العنوان التفصيلي (الشارع، رقم المبنى، الشقة)
                </label>
                <textarea
                  name="address"
                  rows={2}
                  defaultValue={String(order.address)}
                  required
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-2.5 rounded-xs outline-none leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  ملاحظات داخلية / رقم التتبع لشركة الشحن (Internal Notes & Tracking Carrier)
                </label>
                <textarea
                  name="internalNotes"
                  rows={2}
                  defaultValue={String(order.internal_notes || "")}
                  placeholder="مثال: رقم البوليصة Aramex #8912301 — الاتصال بالعميل قبل الوصول بساعة"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] p-2.5 rounded-xs outline-none leading-relaxed"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="bg-[#242424] hover:bg-[#B89A62] hover:text-[#111111] text-[#F7F3EA] font-semibold text-[13px] px-4 py-2 rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <Save size={14} />
                <span>حفظ بيانات الشحن والملاحظات</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar 1 Col: Statuses and Fulfillment Actions */}
        <div className="space-y-6">
          {/* Order Status Control */}
          <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Truck size={16} className="text-[#B89A62]" />
              حالة مسار الطلب والشحن
            </h2>

            <form action={updateOrderStatusAction} className="space-y-3">
              <input type="hidden" name="orderId" value={String(order.id)} />
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5">مرحلة الطلب الحالية:</label>
                <select
                  name="status"
                  defaultValue={String(order.order_status)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="pending">قيد الانتظار (Pending)</option>
                  <option value="processing">قيد التجهيز والتعبئة (Processing)</option>
                  <option value="shipped">تم التسليم لشركة الشحن (Shipped)</option>
                  <option value="delivered">تم التوصيل للعميل بنجاح (Delivered)</option>
                  <option value="cancelled">ملغي (Cancelled)</option>
                  <option value="refunded">مسترجع (Refunded)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[13px] py-2.5 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <CheckCircle size={15} />
                <span>تحديث مرحلة الطلب</span>
              </button>
            </form>
          </div>

          {/* Payment Status Control */}
          <div className="bg-[#141414] border border-[#242424] p-5 rounded-xs space-y-4">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA] pb-3 border-b border-[#242424] flex items-center gap-2"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <CreditCard size={16} className="text-[#B89A62]" />
              حالة السداد والدفع
            </h2>

            <div className="text-[13px] space-y-2 mb-3">
              <div className="flex justify-between text-[#888880]">
                <span>طريقة الدفع:</span>
                <span className="font-bold text-[#F7F3EA] uppercase font-mono">{String(order.payment_method)}</span>
              </div>
              <div className="flex justify-between text-[#888880]">
                <span>الحالة المسجلة:</span>
                <span className="font-bold text-amber-400 font-mono capitalize">{String(order.payment_status)}</span>
              </div>
            </div>

            <form action={updateOrderPaymentStatusAction} className="space-y-3">
              <input type="hidden" name="orderId" value={String(order.id)} />
              <select
                name="paymentStatus"
                defaultValue={String(order.payment_status)}
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
              >
                <option value="pending">معلق / قيد الانتظار (Pending)</option>
                <option value="paid">تم التحصيل بنجاح (Paid)</option>
                <option value="refunded">تم استرداد المبلغ (Refunded)</option>
                <option value="failed">فشلت العملية (Failed)</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#242424] hover:bg-[#333] text-[#F7F3EA] font-semibold text-[13px] py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#333]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                <span>تحديث حالة السداد</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
