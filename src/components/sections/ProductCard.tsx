"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/types";
import { formatEGP } from "@/data";

const badgeLabels: Record<string, string> = {
  new: "جديد",
  bestseller: "الأكثر مبيعاً",
  sale: "تخفيض",
  limited: "محدود",
};

const badgeColors: Record<string, string> = {
  new: "bg-[#111] text-[#F7F3EA]",
  bestseller: "bg-[#F7F3EA] text-[#111]",
  sale: "bg-[#8B0000] text-white",
  limited: "bg-[#B89A62] text-[#111]",
};

interface ProductCardProps {
  product: Product;
  className?: string;
  light?: boolean;
}

export function ProductCard({ product, className = "", light = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.images.primary);
  const [addStatus, setAddStatus] = useState<"idle" | "loading" | "success">("idle");
  const defaultSize = product.sizes[0];
  const wishlisted = isWishlisted(product.id);

  const secondaryImage =
    product.images.gallery && product.images.gallery.length > 0 && product.images.gallery[0] !== product.images.primary
      ? product.images.gallery[0]
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (addStatus !== "idle") return;

    setAddStatus("loading");
    // Immediate cart count update
    addItem(product, defaultSize.ml, defaultSize.price);

    setTimeout(() => {
      setAddStatus("success");
      setTimeout(() => {
        setAddStatus("idle");
      }, 1600);
    }, 280);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  // Theming based on container
  const bgCard = light
    ? "bg-white border-[#E8E4DB] hover:border-[#B89A62]/40"
    : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#B89A62]/40";
  const bgImage = light ? "bg-[#F0EDE6]" : "bg-[#0D0D0D]";
  const textTitle = light ? "text-[#1A1A1A]" : "text-[#F7F3EA]";
  const textMuted = light ? "text-[#888880]" : "text-[#888880]";
  const textPrice = light ? "text-[#B89A62]" : "text-[#B89A62]";

  return (
    <article
      className={`group relative flex flex-col border rounded-[12px] overflow-hidden transition-all duration-300 ${bgCard} ${className}`}
    >
      {/* Image wrapper: strict 4:5 ratio with top rounded corners */}
      <div className={`relative aspect-[4/5] overflow-hidden ${bgImage} rounded-t-[11px]`}>
        <Link
          href={`/collection/${product.slug}`}
          className="absolute inset-0 z-0"
          aria-label={product.nameAr}
        >
          {/* Primary image with subtle 1.02 scale */}
          <Image
            src={imgSrc}
            alt={product.images.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain object-center p-2.5 sm:p-3 transition-all duration-500 ease-out group-hover:scale-[1.02] ${
              secondaryImage ? "group-hover:opacity-0" : ""
            }`}
            onError={() => setImgSrc("/images/rezan/heritage/rezan-heritage-fragrance.png")}
          />

          {/* Secondary image subtle crossfade on hover if available */}
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={product.images.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center p-2.5 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out scale-[1.02]"
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-2.5 sm:top-3 start-2.5 sm:start-3 px-2 py-0.5 text-[9px] font-medium tracking-wide z-10 pointer-events-none rounded-xs shadow-xs ${badgeColors[product.badge]}`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            {badgeLabels[product.badge]}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? `إزالة ${product.nameAr} من المفضلة` : `إضافة ${product.nameAr} إلى المفضلة`}
          aria-pressed={wishlisted}
          className={`absolute top-2.5 sm:top-3 end-2.5 sm:end-3 z-10 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-110 ${
            wishlisted
              ? "opacity-100 bg-white/90 text-[#B89A62] shadow-xs"
              : "opacity-100 md:opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white text-[#777067] hover:text-[#111111] shadow-xs"
          }`}
        >
          <Heart
            size={15}
            strokeWidth={1.75}
            className={`transition-colors duration-200 ${
              wishlisted ? "fill-[#B89A62] text-[#B89A62]" : ""
            }`}
          />
        </button>

        {/* Mobile Quick Add Icon (Always accessible on touch devices) */}
        <button
          onClick={handleAddToCart}
          className="md:hidden absolute bottom-2 end-2 z-10 w-11 h-11 bg-[#111111]/90 text-[#F7F3EA] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label={`أضف ${product.nameAr} إلى الحقيبة`}
          aria-live="polite"
        >
          {addStatus === "loading" ? (
            <Loader2 size={16} className="animate-spin text-[#B89A62]" />
          ) : addStatus === "success" ? (
            <Check size={16} className="text-[#B89A62]" />
          ) : (
            <ShoppingBag size={16} className="text-[#F7F3EA]" />
          )}
        </button>

        {/* Desktop Quick Add Overlay (Slide-up on hover) */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full text-[12px] py-3 min-h-[44px] flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] ${
              addStatus === "success"
                ? "bg-[#2E7D32] text-white"
                : "bg-[#B89A62] text-[#111111] hover:bg-[#CDB48A]"
            }`}
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            aria-live="polite"
          >
            {addStatus === "loading" ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>جاري الإضافة...</span>
              </>
            ) : addStatus === "success" ? (
              <>
                <Check size={14} />
                <span>تمت الإضافة ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>أضف إلى الحقيبة</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Area */}
      <Link href={`/collection/${product.slug}`} className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
        <p className="text-[9px] text-[#B89A62]/80 tracking-widest uppercase font-en">{product.olfactiveFamily}</p>
        <h3 className={`text-[13px] sm:text-[14px] font-medium leading-snug line-clamp-1 break-words ${textTitle}`} style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          {product.nameAr}
        </h3>
        <p className={`text-[11px] ${textMuted} font-en truncate`}>{product.nameEn}</p>

        <div className="flex flex-wrap items-center justify-between gap-1 mt-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`text-[13px] font-medium whitespace-nowrap ${textPrice}`} style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              {formatEGP(defaultSize.price)}
            </span>
            {defaultSize.originalPrice && (
              <span className={`text-[11px] ${textMuted} line-through whitespace-nowrap`} style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                {formatEGP(defaultSize.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              <Star size={10} className="fill-[#B89A62] text-[#B89A62]" />
            </div>
            <span className={`text-[10px] ${textMuted}`}>({product.reviewCount})</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
