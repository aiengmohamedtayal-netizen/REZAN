import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto bg-white p-5 sm:p-8 lg:p-10 border border-[#E8E4DB]">
          <h1
            className="text-[24px] sm:text-[28px] font-semibold text-[#1A1A1A] mb-3 text-center"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            تواصل مع كونسيرج ريزان
          </h1>
          <p
            className="text-[14px] text-[#555550] mb-8 text-center"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            فريق استشاريي العطور الفاخرة وخدمة مقتني الدار متاح دائماً للرد على كافة استفساراتكم وتلبية طلباتكم الخاصة.
          </p>

          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
