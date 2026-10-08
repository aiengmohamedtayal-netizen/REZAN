import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto bg-white p-5 sm:p-8 lg:p-10 border border-[#E8E4DB]">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-3 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>تواصل معنا</h1>
          <p className="text-[14px] text-[#555550] mb-8 text-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>فريقنا متاح دائماً للرد على استفساراتكم.</p>
          
          <form className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input type="text" placeholder="الاسم" className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }} />
              <input type="email" placeholder="البريد الإلكتروني" className="w-full min-h-[46px] border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62]" />
            </div>
            <textarea placeholder="رسالتك" rows={5} className="w-full border border-[#E8E4DB] px-4 py-3 text-[14px] focus:outline-none focus:border-[#B89A62]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }} />
            <button type="button" className="w-full min-h-[48px] bg-[#1A1A1A] text-white py-3.5 text-[14px] font-medium hover:bg-black transition-colors flex items-center justify-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              إرسال
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
