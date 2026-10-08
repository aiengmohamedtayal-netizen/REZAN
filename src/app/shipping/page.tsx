import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto bg-white p-5 sm:p-8 lg:p-10 border border-[#E8E4DB]">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الشحن والتوصيل</h1>
          <div className="space-y-6 text-[14px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <p>نحرص في ريزان على توصيل طلباتكم بأسرع وقت ممكن وبأعلى معايير الأمان.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px] mt-6">تكلفة الشحن</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>شحن مجاني للطلبات بقيمة ٢٥٠٠ ج.م وأكثر.</li>
              <li>تكلفة الشحن للطلبات الأقل من ٢٥٠٠ ج.م هي ٥٠ ج.م (تختلف قليلاً حسب المحافظة).</li>
            </ul>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px] mt-6">التتبع</h3>
            <p>بعد تأكيد الطلب، سيصلك رقم التتبع لتتمكن من متابعة حالة الشحنة حتى وصولها إليك.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
