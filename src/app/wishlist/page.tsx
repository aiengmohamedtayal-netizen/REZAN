"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/data";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlistIds, clearWishlist } = useWishlist();
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F3EA] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          <aside className="lg:col-span-1 lg:border-e border-[#E8E4DB] lg:pe-6">
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-[#1A1A1A] mb-4 sm:mb-8" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>حسابي</h1>
            <nav className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 text-[14px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
              <Link href="/account" className="text-[#555550] hover:text-[#B89A62] min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white lg:bg-transparent border lg:border-0 border-[#E8E4DB] shrink-0 flex items-center">البيانات الشخصية</Link>
              <Link href="/orders" className="text-[#555550] hover:text-[#B89A62] min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white lg:bg-transparent border lg:border-0 border-[#E8E4DB] shrink-0 flex items-center">طلباتي</Link>
              <Link href="/wishlist" className="text-[#B89A62] font-medium min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white lg:bg-transparent border lg:border-0 border-[#E8E4DB] shrink-0 flex items-center">المفضلة</Link>
            </nav>
          </aside>
          <div className="lg:col-span-3 bg-white p-5 sm:p-8 border border-[#E8E4DB]">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E8E4DB]">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-[#B89A62] fill-[#B89A62]" />
                <h2 className="text-[17px] sm:text-[18px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  المفضلة ({wishlistedProducts.length})
                </h2>
              </div>
              {wishlistedProducts.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="text-[12px] text-[#888880] hover:text-[#1A1A1A] transition-colors py-1.5 px-3 border border-[#E8E4DB] rounded-sm active:scale-95"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  مسح المفضلة
                </button>
              )}
            </div>

            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} light />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 sm:py-16">
                <Heart size={44} strokeWidth={1} className="text-[#D0CCC4] mx-auto mb-4" />
                <p className="text-[14px] text-[#555550] mb-6" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  قائمة المفضلة فارغة. يمكنك حفظ عطورك المفضلة بالضغط على رمز القلب.
                </p>
                <Link
                  href="/collection"
                  className="btn-tactile inline-flex items-center justify-center text-[13px] border border-[#1A1A1A] px-8 py-3.5 min-h-[46px] hover:bg-[#1A1A1A] hover:text-white transition-all active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                >
                  اكتشف العطور
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
