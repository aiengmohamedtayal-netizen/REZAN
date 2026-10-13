import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getStorefrontGiftSets, getStorefrontProducts } from "@/server/domain/storefront";
import { GiftsView } from "./GiftsView";

export default function GiftsPage() {
  const giftSets = getStorefrontGiftSets();
  const products = getStorefrontProducts();

  return (
    <>
      <Navbar />
      <GiftsView giftSets={giftSets} products={products} />
      <Footer />
    </>
  );
}
