import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-20 px-5">
        <div className="max-w-[800px] mx-auto bg-white p-10 border border-[#E8E4DB]">
          <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الشروط والأحكام</h1>
          <div className="space-y-6 text-[14px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <p>مرحباً بكم في موقع ريزان. باستخدامكم لهذا الموقع، فإنكم توافقون على الشروط والأحكام التالية:</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">١. المنتجات</h3>
            <p>جميع المنتجات المعروضة تخضع لتوفرها في المخزون. نحتفظ بالحق في تعديل الأسعار أو إيقاف أي منتج في أي وقت.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">٢. الطلبات</h3>
            <p>يحق لنا رفض أو إلغاء أي طلب لأسباب تتعلق بتوفر المنتج أو وجود خطأ في السعر.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">٣. حقوق الملكية الفكرية</h3>
            <p>جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والتصاميم، هي ملك لدار ريزان ولا يجوز استخدامها دون إذن مسبق.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
