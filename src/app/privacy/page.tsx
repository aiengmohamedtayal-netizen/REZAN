import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-20 px-5">
        <div className="max-w-[800px] mx-auto bg-white p-10 border border-[#E8E4DB]">
          <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>سياسة الخصوصية</h1>
          <div className="space-y-6 text-[14px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <p>نحن في ريزان نولي اهتماماً كبيراً بخصوصية بيانات عملائنا.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">١. جمع المعلومات</h3>
            <p>نقوم بجمع المعلومات التي تقدمها لنا عند تسجيل الدخول، أو إتمام عملية شراء، أو الاشتراك في نشرتنا البريدية.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">٢. استخدام المعلومات</h3>
            <p>نستخدم هذه المعلومات لمعالجة طلباتك، تحسين تجربتك في الموقع، وإرسال عروض خاصة لك.</p>
            <h3 className="font-semibold text-[#1A1A1A] text-[16px]">٣. حماية البيانات</h3>
            <p>نحن نستخدم أحدث تقنيات التشفير لضمان حماية بياناتك الشخصية وبيانات الدفع الخاصة بك.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
