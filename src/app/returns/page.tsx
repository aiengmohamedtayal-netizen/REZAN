import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto bg-white p-5 sm:p-8 lg:p-10 border border-[#E8E4DB]">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الاستبدال والاسترجاع</h1>
          <div className="space-y-6 text-[14px] text-[#555550] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <p>رضاكم هو أولويتنا في ريزان. إذا لم تكن راضياً تماماً عن طلبك، يمكنك استرجاعه وفقاً للشروط التالية:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>يجب أن يتم طلب الاسترجاع خلال ١٤ يوماً من تاريخ الاستلام.</li>
              <li>يجب أن يكون المنتج في حالته الأصلية، غير مستخدم، وبغلافه الأصلي غير المفتوح.</li>
              <li>يتحمل العميل رسوم الشحن في حالة الاسترجاع (إلا إذا كان المنتج تالفاً أو به عيب مصنعي).</li>
            </ul>
            <p className="mt-6">لبدء عملية الاسترجاع، يرجى التواصل مع فريق خدمة العملاء.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
