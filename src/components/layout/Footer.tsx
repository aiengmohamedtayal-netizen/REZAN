"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { REZAN_WORDMARK } from "@/config/brand";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} width="1em" height="1em" aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.49-3.02 5.71-1.9 1.23-4.4 1.4-6.44.53-2.05-.88-3.61-2.73-3.82-4.96-.2-2.22.84-4.52 2.66-5.83 1.83-1.32 4.31-1.57 6.42-.71 0 1.41-.01 2.82 0 4.24-1.12-.51-2.52-.39-3.5.34-.99.73-1.47 2.05-1.17 3.23.29 1.18 1.44 2.11 2.67 2.18 1.23.08 2.45-.63 2.97-1.74.52-1.1.5-2.42.5-3.63V.02z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width="1em" height="1em" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const footerLinks = [
  {
    titleAr: "التسوق",
    links: [
      { labelAr: "جميع العطور", href: "/collection" },
      { labelAr: "الأكثر مبيعًا", href: "/collection?filter=bestsellers" },
      { labelAr: "الجديد", href: "/collection?filter=new" },
      { labelAr: "مجموعات الهدايا", href: "/collection?filter=bestsellers" },
    ],
  },
  {
    titleAr: "ريزان",
    links: [
      { labelAr: "عن الدار", href: "/about" },
      { labelAr: "قصة العلامة", href: "/story" },
      { labelAr: "المجلة", href: "/journal" },
    ],
  },
  {
    titleAr: "خدمة العملاء",
    links: [
      { labelAr: "تواصل معنا", href: "/contact" },
      { labelAr: "الشحن والتوصيل", href: "/shipping" },
      { labelAr: "الإرجاع والاستبدال", href: "/returns" },
      { labelAr: "الأسئلة الشائعة", href: "/faq" },
    ],
  },
  {
    titleAr: "السياسات",
    links: [
      { labelAr: "سياسة الخصوصية", href: "/privacy" },
      { labelAr: "الشروط والأحكام", href: "/terms" },
    ],
  },
];

function MobileAccordion({ title, links, isSupport }: { title: string, links: { labelAr: string, href: string }[], isSupport?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#F7F3EA]/10 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-[#F7F3EA] min-h-[44px]"
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        aria-expanded={isOpen}
      >
        <span className="text-[14px]">{title}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              {isSupport && (
                <p className="text-[12px] text-[#F7F3EA]/60 font-light mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>نحن هنا لمساعدتك.</p>
              )}
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <Link href={link.href} className="block text-[13px] text-[#F7F3EA]/60 hover:text-[#B89A62] transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {link.labelAr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3500);
  };

  return (
    <form 
      className="flex w-full max-w-sm mx-auto border-b border-[#F7F3EA]/30 pb-2 focus-within:border-[#B89A62] transition-colors relative group"
      onSubmit={handleSubmit}
    >
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={submitted ? "تم الاشتراك بنجاح ✓" : "البريد الإلكتروني"} 
        aria-label="البريد الإلكتروني"
        required
        disabled={submitted}
        className={`flex-1 min-w-0 bg-transparent outline-none text-[#F7F3EA] text-[13px] placeholder:text-[#F7F3EA]/40 ps-2 transition-all ${
          submitted ? "placeholder:text-[#B89A62] text-[#B89A62]" : ""
        }`} 
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
      />
      <button 
        type="submit" 
        disabled={submitted}
        className="btn-tactile text-[13px] text-[#B89A62] font-medium px-4 hover:text-[#F7F3EA] active:scale-95 transition-all min-h-[44px] flex items-center justify-center whitespace-nowrap shrink-0 disabled:opacity-75" 
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
      >
        {submitted ? "شكراً لك ✓" : "اشترك"}
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#F7F3EA] pt-16 sm:pt-20 pb-10 lg:pb-8 relative overflow-hidden" role="contentinfo">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* 1. Brand Statement */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex justify-center mb-6">
            <Image 
              src={REZAN_WORDMARK} 
              alt="REZAN" 
              width={160} 
              height={60} 
              className="object-contain h-7 sm:h-8 lg:h-10 w-auto brightness-0 invert" 
              priority 
            />
          </div>
          <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-[#B89A62] font-semibold tracking-[0.3em] uppercase font-en mb-4 sm:mb-6">MAISON DE PARFUM</p>
          <p className="text-[16px] sm:text-[17px] lg:text-[20px] text-[#F7F3EA]/90 font-light max-w-sm mx-auto leading-relaxed px-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            عطرٌ يحمل الحكاية، وأثرٌ يبقى.
          </p>
        </div>

        {/* 2. Newsletter */}
        <div className="max-w-xl mx-auto text-center pb-12 sm:pb-16 lg:pb-20 mb-10 sm:mb-12 lg:mb-16 border-b border-[#F7F3EA]/10">
          <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-[#F7F3EA] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>ادخل عالم ريزان</h3>
          <p className="text-[13px] lg:text-[14px] text-[#F7F3EA]/70 mb-6 sm:mb-8 font-light leading-relaxed px-2" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            كن أول من يكتشف إصداراتنا الجديدة وقصص العطور المختارة.
          </p>
          <NewsletterForm />
        </div>

        {/* 3. Navigation Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-12 pb-16 border-b border-[#F7F3EA]/10" aria-label="روابط سريعة">
          {footerLinks.map(col => (
            <div key={col.titleAr}>
              <h3 className="text-[12px] text-[#F7F3EA] mb-6 font-semibold tracking-wider" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{col.titleAr}</h3>
              {col.titleAr === "خدمة العملاء" && (
                <p className="text-[12px] text-[#F7F3EA]/60 font-light mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>نحن هنا لمساعدتك.</p>
              )}
              <ul className="space-y-4">
                {col.links.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <Link 
                      href={link.href} 
                      className="text-[13px] text-[#F7F3EA]/60 hover:text-[#B89A62] transition-colors relative inline-block py-0.5 group"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      <span>{link.labelAr}</span>
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-[#B89A62]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Navigation Mobile */}
        <div className="lg:hidden pb-8 mb-12 border-b border-[#F7F3EA]/10" aria-label="روابط سريعة">
          {footerLinks.map(col => (
            <MobileAccordion key={col.titleAr} title={col.titleAr} links={col.links} isSupport={col.titleAr === "خدمة العملاء"} />
          ))}
        </div>

        {/* 4. Brand Signature */}
        <div className="text-center pb-10 lg:pb-12 border-b border-[#F7F3EA]/10">
          <p className="text-[14px] text-[#F7F3EA]/70 font-light tracking-wide" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            من الإرث العربي، إلى عطرٍ بروح معاصرة.
          </p>
        </div>

        {/* 5. Legal Bar & Socials */}
        <div className="pt-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-6">
          <p className="text-[11px] lg:text-[12px] text-[#F7F3EA]/40" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            © 2026 ريزان — دار العطور الفاخرة. جميع الحقوق محفوظة.
          </p>
          
          <div className="flex items-center gap-8 lg:gap-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 group text-[#F7F3EA]/50 hover:text-[#B89A62] active:scale-95 transition-all min-h-[44px] lg:min-h-0" 
              aria-label="Instagram إنستغرام"
            >
              <InstagramIcon className="w-[17px] h-[17px] transition-transform duration-200 group-hover:scale-105" />
              <span className="text-[11px] font-en uppercase tracking-wider group-hover:text-[#B89A62] transition-colors hidden sm:inline">Instagram</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 group text-[#F7F3EA]/50 hover:text-[#B89A62] active:scale-95 transition-all min-h-[44px] lg:min-h-0" 
              aria-label="Facebook فيسبوك"
            >
              <FacebookIcon className="w-[17px] h-[17px] transition-transform duration-200 group-hover:scale-105" />
              <span className="text-[11px] font-en uppercase tracking-wider group-hover:text-[#B89A62] transition-colors hidden sm:inline">Facebook</span>
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 group text-[#F7F3EA]/50 hover:text-[#B89A62] active:scale-95 transition-all min-h-[44px] lg:min-h-0" 
              aria-label="TikTok تيك توك"
            >
              <TikTokIcon className="w-[18px] h-[18px] fill-current transition-transform duration-200 group-hover:scale-105" />
              <span className="text-[11px] font-en uppercase tracking-wider group-hover:text-[#B89A62] transition-colors hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
