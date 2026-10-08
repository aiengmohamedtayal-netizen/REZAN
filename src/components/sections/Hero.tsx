import Link from "next/link";
import { MotionStaggerGroup, MotionItem, MotionDiv } from "@/components/ui/MotionPrimitives";
import { rezanFade } from "@/design-system/motion";

export function Hero() {
  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[540px] h-[75dvh] sm:h-[80dvh] lg:h-[88dvh] max-h-[960px] bg-[#0A0A0A] overflow-hidden flex items-end justify-center">
      {/* 
        ── Cinematic Campaign Video Background ────────────────────────────────
        Replaces the static oversized logo artwork with a full-bleed luxury video.
      */}
      <MotionDiv 
        variants={rezanFade} 
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover object-center scale-[1.01]"
        >
          <source src="/videos/hero-campaign.mp4" type="video/mp4" />
        </video>
      </MotionDiv>

      {/* 
        ── Controlled Luxury Contrast Overlay ─────────────────────────────────
        Ensures high legibility and soft transition to the storefront below.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-black/40 pointer-events-none" />

      {/* 
        ── Minimal Editorial Hero Content & CTA ────────────────────────────────
        Restrained, elegant typography allowing the video to be the hero artwork.
      */}
      <MotionStaggerGroup 
        stagger={0.15} 
        delay={0.3} 
        className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 pb-10 sm:pb-16 lg:pb-20 flex flex-col items-center text-center"
      >
        <MotionItem
          className="text-[10px] sm:text-[12px] text-[#B89A62] tracking-[0.3em] uppercase font-en mb-2.5 sm:mb-3 font-medium opacity-90 drop-shadow-sm"
        >
          MAISON DE PARFUM
        </MotionItem>

        <MotionItem
          className="text-[24px] sm:text-[34px] lg:text-[44px] font-semibold text-[#F7F3EA] leading-snug max-w-2xl mb-3 sm:mb-4 drop-shadow-md break-words"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        >
          إرثٌ من العطر، وأثرٌ لا يزول.
        </MotionItem>

        <MotionItem
          className="text-[13px] sm:text-[15px] text-[#F7F3EA]/80 max-w-lg mb-6 sm:mb-8 leading-relaxed font-light drop-shadow"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        >
          توليفات عطرية نادرة من قلب التراث العربي بلمسة باريسية راقية.
        </MotionItem>

        <MotionItem className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/collection"
            className="w-full sm:w-auto text-[13px] font-medium bg-[#B89A62] text-[#111111] px-8 sm:px-10 py-3.5 min-h-[48px] flex items-center justify-center hover:bg-[#CDB48A] transition-all duration-300 shadow-lg hover:shadow-[#B89A62]/20"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            اكتشف العطور
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto text-[13px] font-medium border border-white/30 text-[#F7F3EA] px-8 py-3.5 min-h-[48px] flex items-center justify-center hover:bg-white hover:text-[#111111] transition-all duration-300 backdrop-blur-sm"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            المجموعات الحصرية
          </Link>
        </MotionItem>
      </MotionStaggerGroup>
    </section>
  );
}
