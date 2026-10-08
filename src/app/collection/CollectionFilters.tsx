"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CollectionFiltersProps {
  currentGender?: string;
  currentFamily?: string;
  currentFilter?: string;
  totalProducts: number;
}

const genders = [
  { id: "all", label: "الكل", href: "/collection" },
  { id: "male", label: "رجالي", href: "/collection?gender=male" },
  { id: "female", label: "نسائي", href: "/collection?gender=female" },
  { id: "unisex", label: "يونيسكس", href: "/collection?gender=unisex" },
];

const families = [
  { id: "oriental", label: "شرقي", href: "/collection?family=oriental" },
  { id: "woody", label: "خشبي", href: "/collection?family=woody" },
  { id: "floral", label: "زهري", href: "/collection?family=floral" },
  { id: "warm", label: "دافئ", href: "/collection?family=warm" },
  { id: "fresh", label: "منعش", href: "/collection?family=fresh" },
  { id: "musky", label: "مسكي", href: "/collection?family=musky" },
];

export function CollectionFilters({
  currentGender,
  currentFamily,
  currentFilter,
  totalProducts,
}: CollectionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const activeFiltersCount = [currentGender, currentFamily, currentFilter].filter(Boolean).length;

  return (
    <>
      {/* Mobile/Tablet Filter Trigger Bar */}
      <div className="lg:hidden mb-6 flex items-center justify-between gap-3 bg-white border border-[#E8E4DB] p-3 rounded-sm shadow-xs">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 text-[14px] text-[#1A1A1A] font-medium min-h-[44px] px-3 hover:text-[#B89A62] transition-colors"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          aria-expanded={isOpen}
          aria-label="تصفية العطور"
        >
          <SlidersHorizontal size={18} className="text-[#B89A62]" />
          <span>تصفية العطور</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 bg-[#B89A62] text-[#111111] rounded-full text-[11px] font-bold flex items-center justify-center font-en">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <span className="text-[13px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          {totalProducts} عطر
        </span>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[180] lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.26 }}
              className="fixed inset-y-0 start-0 w-[90%] max-w-[360px] h-[100dvh] max-h-[100dvh] bg-white z-[190] flex flex-col shadow-2xl lg:hidden overscroll-contain"
              role="dialog"
              aria-modal
              aria-label="خيارات التصفية"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DB]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#B89A62]" />
                  <h2 className="text-[16px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    تصفية العطور
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#1A1A1A]"
                  aria-label="إغلاق التصفية"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Gender */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    التصنيف
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {genders.map((g) => {
                      const isActive = (!currentGender && g.id === "all") || currentGender === g.id;
                      return (
                        <Link
                          key={g.id}
                          href={g.href}
                          onClick={() => setIsOpen(false)}
                          className={`min-h-[44px] flex items-center justify-center text-[13px] border rounded-sm transition-colors ${
                            isActive
                              ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                              : "bg-white text-[#555550] border-[#E8E4DB] hover:border-[#B89A62]"
                          }`}
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          {g.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Family */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    العائلة العطرية
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {families.map((f) => {
                      const isActive = currentFamily?.toLowerCase() === f.id.toLowerCase();
                      return (
                        <Link
                          key={f.id}
                          href={f.href}
                          onClick={() => setIsOpen(false)}
                          className={`min-h-[44px] flex items-center justify-center text-[13px] border rounded-sm transition-colors ${
                            isActive
                              ? "bg-[#B89A62] text-[#111111] border-[#B89A62] font-medium"
                              : "bg-white text-[#555550] border-[#E8E4DB] hover:border-[#B89A62]"
                          }`}
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          {f.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action */}
              <div className="p-4 border-t border-[#E8E4DB] bg-[#FAFAF8] space-y-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full min-h-[44px] bg-[#1A1A1A] text-white text-[14px] font-medium flex items-center justify-center hover:bg-black transition-colors"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  عرض النتائج ({totalProducts})
                </button>
                {activeFiltersCount > 0 && (
                  <Link
                    href="/collection"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-[12px] text-[#888880] hover:text-[#B89A62] py-2 transition-colors min-h-[36px]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    إعادة ضبط الفلاتر
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              التصنيف
            </h3>
            <ul className="space-y-2.5 text-[13px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {genders.map((g) => {
                const isActive = (!currentGender && g.id === "all") || currentGender === g.id;
                return (
                  <li key={g.id}>
                    <Link
                      href={g.href}
                      className={`hover:text-[#B89A62] transition-colors ${isActive ? "text-[#B89A62] font-semibold" : ""}`}
                    >
                      {g.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              العائلة العطرية
            </h3>
            <ul className="space-y-2.5 text-[13px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {families.map((f) => {
                const isActive = currentFamily?.toLowerCase() === f.id.toLowerCase();
                return (
                  <li key={f.id}>
                    <Link
                      href={f.href}
                      className={`hover:text-[#B89A62] transition-colors ${isActive ? "text-[#B89A62] font-semibold" : ""}`}
                    >
                      {f.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {activeFiltersCount > 0 && (
            <div className="pt-2">
              <Link
                href="/collection"
                className="inline-block text-[12px] text-[#888880] hover:text-[#B89A62] transition-colors underline underline-offset-4"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                مسح جميع الفلاتر
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
