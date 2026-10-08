import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: "./fonts/Roboto.ttf",
  variable: "--font-roboto",
  display: "swap",
  weight: "100 900",
  preload: true,
});

const tajarib = localFont({
  src: [
    { path: "./fonts/Tajarib_Typeface_Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Tajarib_Typeface_Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Tajarib_Typeface_Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Tajarib_Typeface_Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Tajarib_Typeface_Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-tajarib",
  display: "swap",
  preload: true,
});

const ibmPlexArabic = localFont({
  src: [
    { path: "./fonts/IBMPlexSansArabic-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexSansArabic-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexSansArabic-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "ريزان | REZAN — Maison de Parfum",
    template: "%s | ريزان REZAN",
  },
  description: "دار عطور ريزان — حيث تلتقي الروح العربية بعراقة العطور الأوروبية.",
  openGraph: {
    title: "ريزان | REZAN — Maison de Parfum",
    description: "دار عطور ريزان — حيث تلتقي الروح العربية بعراقة العطور الأوروبية.",
    type: "website",
    locale: "ar_EG",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${roboto.variable} ${tajarib.variable} ${ibmPlexArabic.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-rezan-black text-rezan-ivory">
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
