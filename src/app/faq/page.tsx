import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto bg-white p-5 sm:p-8 lg:p-10 border border-[#E8E4DB]">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-6 sm:mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>الأسئلة الشائعة</h1>
          <div className="space-y-6 text-[14px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">ما هي مناطق التوصيل المتاحة؟</h3>
              <p>نقوم بالتوصيل لجميع محافظات جمهورية مصر العربية.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">كم تستغرق مدة التوصيل؟</h3>
              <p>داخل القاهرة والإسكندرية: ١-٢ أيام عمل. باقي المحافظات: ٣-٥ أيام عمل.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">هل العطور أصلية؟</h3>
              <p>نعم، جميع عطور ريزان مصنعة من زيوت عطرية أصلية مستوردة من أفضل المصادر العالمية ومعبأة في مصر.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
