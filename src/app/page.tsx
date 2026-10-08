import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import {
  PromoStrip,
  CategoryTiles,
  BestSellersSection,
  NewArrivalsSection,
  FeaturedCollectionBanner,
  CollectionsSection,
  DiscoverySection,
  MaisonStorySection,
  ReviewsSection,
  NewsletterSection,
} from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PromoStrip />
        <CategoryTiles />
        <BestSellersSection />
        <FeaturedCollectionBanner />
        <NewArrivalsSection />
        <CollectionsSection />
        <DiscoverySection />
        <MaisonStorySection />
        <ReviewsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
