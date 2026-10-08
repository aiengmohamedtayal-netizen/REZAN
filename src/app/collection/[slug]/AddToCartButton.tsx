"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { formatEGP } from "@/data";
import type { Product } from "@/types";
import { ShoppingBag, Check, Loader2, Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { AnimatePresence, motion } from "framer-motion";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    if (status !== "idle") return;

    setStatus("loading");
    // Immediate cart count update
    addItem(product, selectedSize.ml, selectedSize.price);

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 1600);
    }, 280);
  };

  return (
    <>
      <div className="space-y-6" ref={buttonRef}>
        {/* Price display updated by selected size */}
        <div className="flex items-baseline gap-3">
          <span className="text-[28px] font-semibold text-[#1A1A1A] transition-all duration-200" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            {formatEGP(selectedSize.price)}
          </span>
          {selectedSize.originalPrice && (
            <span className="text-[16px] text-[#888880] line-through transition-all duration-200" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {formatEGP(selectedSize.originalPrice)}
            </span>
          )}
        </div>

        {/* Size selection */}
        <div>
          <label className="block text-[11px] sm:text-[12px] text-[#888880] mb-2 uppercase tracking-wider font-en">
            Select Volume / اختر الحجم
          </label>
          <div className="flex flex-wrap gap-2.5 sm:gap-3" role="radiogroup" aria-label="اختر الحجم">
            {product.sizes.map((s) => {
              const isSelected = selectedSize.ml === s.ml;
              return (
                <button
                  key={s.ml}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedSize(s)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] min-w-[64px] text-[13px] border rounded-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xs"
                      : "border-[#E8E4DB] text-[#555550] bg-white hover:border-[#B89A62] hover:text-[#111111]"
                  }`}
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  {s.ml} مل
                </button>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAdd}
            disabled={status === "loading"}
            aria-live="polite"
            className={`btn-tactile flex-1 min-h-[48px] py-3.5 sm:py-4 text-[14px] font-medium flex items-center justify-center gap-2 rounded-sm transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer ${
              status === "success"
                ? "bg-[#2E7D32] text-white"
                : "bg-[#B89A62] text-[#111111] hover:bg-[#CDB48A]"
            }`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin text-[#111111]" />
                <span>جاري الإضافة...</span>
              </>
            ) : status === "success" ? (
              <>
                <Check size={18} />
                <span>تمت الإضافة ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>أضف إلى الحقيبة</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isFav ? "إزالة من قائمة الأمنيات" : "إضافة إلى قائمة الأمنيات"}
            aria-pressed={isFav}
            className="btn-tactile min-w-[48px] min-h-[48px] border border-[#E8E4DB] bg-white hover:border-[#B89A62] rounded-sm flex items-center justify-center text-[#555550] hover:text-[#B89A62] active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              size={20}
              className={`transition-all duration-200 ${
                isFav ? "fill-[#B89A62] text-[#B89A62] scale-105" : "text-[#666660]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sticky Mobile/Tablet CTA */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 start-0 end-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E4DB] p-4 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,16px)]"
          >
            <div className="flex items-center justify-between gap-4 max-w-[500px] mx-auto">
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1A1A1A] line-clamp-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  {product.nameAr}
                </span>
                <span className="text-[12px] text-[#555550]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  {selectedSize.ml} مل - {formatEGP(selectedSize.price)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={status === "loading"}
                className={`btn-tactile flex-shrink-0 min-h-[44px] px-6 text-[13px] font-medium flex items-center justify-center gap-2 rounded-sm transition-all duration-200 active:scale-[0.98] ${
                  status === "success"
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#B89A62] text-[#111111] hover:bg-[#CDB48A]"
                }`}
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin text-[#111111]" />
                ) : status === "success" ? (
                  <Check size={16} />
                ) : (
                  <span>أضف إلى الحقيبة</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
