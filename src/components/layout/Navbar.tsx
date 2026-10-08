"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { navItems, announcements, formatEGP, products } from "@/data";
import type { NavItem } from "@/types";
import { REZAN_WORDMARK } from "@/config/brand";
import { usePathname } from "next/navigation";

// ─── 1. Announcement Ticker ────────────────────────────────────────────────────
function AnnouncementTicker() {
  const active = announcements.filter((a) => a.active);
  const items = [...active, ...active, ...active]; // 3× for seamless loop
  return (
    <div className="bg-[#111111] border-b border-[#2A2A2A] h-9 overflow-hidden flex items-center">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((a, i) => (
          <span key={`${a.id}-${i}`} className="text-[11px] text-[#F7F3EA]/60 px-10" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            {a.textAr}
            <span className="mx-6 text-[#B89A62]/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Desktop Nav Dropdown ───────────────────────────────────────────────────
function DesktopNavItem({ item, isTransparent }: { item: NavItem; isTransparent: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const base = `text-[13px] transition-colors duration-200 flex items-center gap-1 py-1 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-[#1A1A1A] hover:text-[#B89A62]'}`;

  if (!item.children?.length) {
    return (
      <li>
        <Link href={item.href} className={base} style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          {item.labelAr}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className={`${base} cursor-pointer active:scale-95 transition-transform`}
        style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        aria-expanded={open}
      >
        {item.labelAr}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onMouseLeave={() => setOpen(false)}
            className="absolute top-full end-0 mt-1 min-w-[190px] bg-white border border-[#E8E4DB] shadow-lg z-[60] py-1.5 rounded-xs"
          >
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:text-[#B89A62] hover:bg-[#F7F3EA] transition-colors active:scale-[0.99]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  {child.labelAr}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

// ─── 3. Search Overlay ─────────────────────────────────────────────────────────
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return products.filter((p) =>
      p.nameAr.includes(trimmed) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.olfactiveFamily.toLowerCase().includes(q)
    ).slice(0, 7);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-24 px-3 sm:px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal aria-label="البحث"
    >
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden rounded-xs border border-[#E8E4DB]"
      >
        <div className="flex items-center border-b border-[#E8E4DB] px-2">
          <Search size={18} className="text-[#888880] ms-3 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن عطر أو مجموعة..."
            className="flex-1 min-w-0 px-3 sm:px-4 py-3.5 sm:py-4 text-[14px] sm:text-[15px] text-[#1A1A1A] placeholder:text-[#B0ACA4] focus:outline-none bg-transparent"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#888880] hover:text-[#1A1A1A] p-2 text-[12px]"
              aria-label="مسح البحث"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#1A1A1A] p-2 active:scale-95 transition-transform"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="divide-y divide-[#F0EDE6] max-h-80 overflow-y-auto"
          >
            {results.map((p) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={`/collection/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 hover:bg-[#F7F3EA] transition-colors active:scale-[0.99]"
                >
                  <div className="w-10 h-10 bg-[#F0EDE6] flex-shrink-0 overflow-hidden flex items-center justify-center p-1 rounded-xs">
                    <Image src={p.images.primary} alt={p.images.alt} width={40} height={40} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#1A1A1A] font-medium truncate" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{p.nameAr}</p>
                    <p className="text-[11px] text-[#888880] font-en truncate">{p.olfactiveFamily}</p>
                  </div>
                  <span className="text-[13px] text-[#B89A62] font-medium whitespace-nowrap" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    {formatEGP(p.sizes[0].price)}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[13px] text-[#888880] py-8"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            لا توجد نتائج لـ &quot;{query}&quot;
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── 4. Cart Drawer ────────────────────────────────────────────────────────────
function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, increment, decrement, subtotal, totalItems } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs"
          />
          <motion.aside
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.26, ease: "easeOut" }}
            className="fixed inset-y-0 start-0 w-full max-w-[360px] sm:max-w-[400px] h-[100dvh] max-h-[100dvh] bg-white z-[160] flex flex-col shadow-2xl overscroll-contain"
            role="dialog" aria-modal aria-label="حقيبة التسوق"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DB]">
              <h2 className="text-[15px] font-medium text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                حقيبة التسوق ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                aria-label="إغلاق"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#1A1A1A] active:scale-95 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <ShoppingBag size={44} strokeWidth={1} className="text-[#D0CCC4]" />
                  <p className="text-[14px] text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>حقيبتك فارغة</p>
                  <Link href="/collection" onClick={closeCart}
                    className="text-[13px] border border-[#B89A62] text-[#B89A62] px-6 py-3 min-h-[44px] flex items-center justify-center hover:bg-[#B89A62] hover:text-white transition-all active:scale-[0.98]"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    اكتشف العطور
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.product.id}-${item.sizeMl}`}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden", transition: { duration: 0.2 } }}
                        className="flex gap-3 pb-4 border-b border-[#F0EDE6]"
                      >
                        <div className="w-16 h-20 bg-[#F0EDE6] flex-shrink-0 overflow-hidden flex items-center justify-center p-1 rounded-xs">
                          <Image src={item.product.images.primary} alt={item.product.images.alt} width={64} height={80} className="object-contain w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#1A1A1A] leading-tight break-words" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{item.product.nameAr}</p>
                          <p className="text-[11px] text-[#888880] mt-0.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>{item.sizeMl} مل</p>
                          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                            <div className="flex items-center border border-[#E8E4DB] rounded-xs">
                              <button
                                onClick={() => decrement(item.product.id, item.sizeMl)}
                                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#888880] hover:text-[#B89A62] text-[15px] active:scale-90 transition-transform"
                                aria-label="تقليل الكمية"
                              >
                                −
                              </button>
                              <motion.span
                                key={item.quantity}
                                initial={{ opacity: 0.4, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.15 }}
                                className="px-2 text-[13px] text-[#1A1A1A] w-6 text-center font-medium"
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                onClick={() => increment(item.product.id, item.sizeMl)}
                                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#888880] hover:text-[#B89A62] text-[15px] active:scale-90 transition-transform"
                                aria-label="زيادة الكمية"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[13px] text-[#B89A62] font-medium whitespace-nowrap" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                              {formatEGP(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.sizeMl)}
                          aria-label="حذف"
                          className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#C8C4BC] hover:text-[#B89A62] self-start active:scale-90 transition-transform"
                        >
                          <X size={15} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-[#E8E4DB] space-y-3 bg-[#FAFAF8] pb-safe">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#888880]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>المجموع</span>
                  <span className="text-[#B89A62] font-semibold" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                    {formatEGP(subtotal)}
                  </span>
                </div>
                <Link href="/checkout" onClick={closeCart}
                  className="btn-tactile block w-full text-center text-[13px] font-medium bg-[#111111] text-white py-3.5 min-h-[44px] flex items-center justify-center hover:bg-[#1A1A1A] active:scale-[0.98] transition-all rounded-xs"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  إتمام الشراء
                </Link>
                <Link href="/collection" onClick={closeCart}
                  className="block text-center text-[12px] text-[#888880] hover:text-[#B89A62] py-2 transition-colors min-h-[40px] flex items-center justify-center"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  مواصلة التسوق
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── 5. Mobile Slide Menu ──────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.26, ease: "easeOut" }}
            className="fixed inset-y-0 start-0 w-[88%] max-w-[340px] h-[100dvh] max-h-[100dvh] bg-[#F7F3EA] z-[160] flex flex-col overflow-y-auto shadow-2xl overscroll-contain pb-safe"
            role="dialog" aria-modal aria-label="القائمة"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DB]">
              <Image
                src={REZAN_WORDMARK}
                alt="REZAN | ريزان"
                width={100}
                height={30}
                className="object-contain h-6 w-auto brightness-0"
              />
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#888880] hover:text-[#1A1A1A] active:scale-95 transition-transform"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 py-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                >
                  {item.children?.length ? (
                    <button
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between px-5 py-3.5 min-h-[44px] text-[14px] text-[#1A1A1A] hover:text-[#B89A62] hover:bg-[#FAF8F3] transition-colors"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                    >
                      <span>{item.labelAr}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${expanded === item.id ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link href={item.href} onClick={onClose}
                      className="flex items-center px-5 py-3.5 min-h-[44px] text-[14px] text-[#1A1A1A] hover:text-[#B89A62] hover:bg-[#FAF8F3] transition-colors"
                      style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                      {item.labelAr}
                    </Link>
                  )}
                  <AnimatePresence>
                    {expanded === item.id && item.children && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-[#FAFAF8]"
                      >
                        {item.children.map((child) => (
                          <Link key={child.id} href={child.href} onClick={onClose}
                            className="flex items-center px-9 py-2.5 min-h-[40px] text-[13px] text-[#666660] hover:text-[#B89A62] transition-colors"
                            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                            {child.labelAr}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── 6. Main Navbar ────────────────────────────────────────────────────────────
export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  // Colors and styles based on scroll state
  const headerBg = isTransparent ? "bg-transparent" : "bg-[#F7F3EA] shadow-sm";
  const iconColor = isTransparent ? "text-white hover:text-white/80" : "text-[#1A1A1A] hover:text-[#B89A62]";
  const borderColor = isTransparent ? "border-white/10" : "border-[#E8E4DB]";

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-colors duration-300 ${headerBg}`}>
        <AnnouncementTicker />

        <header className="w-full">
          {/* Main header row */}
          <div className={`w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 h-[68px] sm:h-[72px] lg:h-[84px] flex items-center justify-between border-b transition-colors duration-300 relative ${borderColor}`}>
            
            {/* Start: hamburger + search (visual right in RTL, logical start) */}
            <div className="flex items-center gap-1 sm:gap-2 w-auto lg:w-[160px] flex-shrink-0 z-10">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="القائمة"
                className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 transition-colors ${iconColor}`}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                className={`hidden lg:flex min-w-[44px] min-h-[44px] items-center justify-center p-2 transition-colors ${iconColor}`}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link
                href="/account"
                aria-label="حسابي"
                className={`hidden lg:flex min-w-[44px] min-h-[44px] items-center justify-center p-2 transition-colors ${iconColor}`}
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Center: logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center max-w-[120px] sm:max-w-[160px] lg:max-w-none z-0">
              <Link href="/" aria-label="ريزان — الرئيسية" className="block">
                <Image
                  src={REZAN_WORDMARK}
                  alt="REZAN | ريزان"
                  width={150}
                  height={56}
                  priority
                  className={`object-contain h-5 sm:h-6 lg:h-10 w-auto transition-all duration-300 ${isTransparent ? 'brightness-100' : 'brightness-0'}`}
                />
              </Link>
            </div>

            {/* End: search (mobile) + bag (visual left in RTL, logical end) */}
            <div className="flex items-center justify-end gap-1 w-auto lg:w-[160px] flex-shrink-0 z-10">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 transition-colors ${iconColor}`}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label={`حقيبة التسوق (${totalItems})`}
                className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 transition-colors ${iconColor}`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 end-1.5 w-4 h-4 bg-[#B89A62] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Category navigation (desktop only) */}
          <nav aria-label="التصنيفات" className="hidden lg:block">
            <ul className="flex justify-center items-center gap-6 xl:gap-9 px-4 sm:px-8 h-[52px] w-full max-w-[1440px] mx-auto">
              {navItems.map((item) => (
                <DesktopNavItem key={item.id} item={item} isTransparent={isTransparent} />
              ))}
            </ul>
          </nav>
        </header>
      </div>

      {/* Spacer so fixed header doesn't cover content on inner pages */}
      {!isHome && <div className="h-[104px] sm:h-[108px] lg:h-[136px]" />}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
      <CartDrawer />
    </>
  );
}
