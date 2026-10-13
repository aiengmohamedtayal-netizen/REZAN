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
import { getStorefrontHomepageData } from "@/server/domain/storefront";

export default function HomePage() {
  const data = getStorefrontHomepageData();

  return (
    <>
      <Navbar />
      <main>
        <Hero
          titleAr={data.hero.titleAr}
          subtitleAr={data.hero.subtitleAr}
          ctaAr={data.hero.ctaAr}
          ctaUrl={data.hero.ctaUrl}
          badgeAr={data.hero.badgeAr}
        />
        <PromoStrip />
        <CategoryTiles />
        <BestSellersSection products={data.bestSellers} />
        <FeaturedCollectionBanner banner={data.featuredBanner} />
        <NewArrivalsSection products={data.newArrivals} />
        <CollectionsSection collections={data.collections} />
        <DiscoverySection />
        <MaisonStorySection />
        <ReviewsSection reviews={data.reviews} />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
