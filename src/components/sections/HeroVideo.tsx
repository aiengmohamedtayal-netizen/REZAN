"use client";

import { useRef, useEffect } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced motion settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    // Automatically pause video when out of viewport to free GPU/CPU and prevent frame drops
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-bg.webp"
      aria-hidden="true"
      tabIndex={-1}
      className="w-full h-full object-cover object-center scale-[1.01] will-change-transform"
    >
      <source src="/videos/hero-campaign.mp4" type="video/mp4" />
    </video>
  );
}
