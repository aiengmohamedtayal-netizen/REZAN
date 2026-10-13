import { queryAll, queryOne } from "../db";
import {
  products as staticProducts,
  collections as staticCollections,
  giftSets as staticGiftSets,
  articles as staticArticles,
  reviews as staticReviews,
} from "@/data";
import type {
  Product,
  Collection,
  Review,
  Article,
  ProductSize,
  FragranceNotes,
  OlfactiveFamily,
  ProductBadge,
  Currency,
} from "@/types";
import type { GiftSet } from "@/data";

/**
 * Fetch all active storefront products from SQLite, with graceful fallback to static catalog.
 */
export function getStorefrontProducts(): Product[] {
  try {
    const rows = queryAll<{
      id: string;
      slug: string;
      name_ar: string;
      name_en: string;
      brand: string;
      tagline_ar: string;
      tagline_en: string;
      description_ar: string;
      description_en: string;
      gender: string;
      olfactive_family: string;
      notes_top: string;
      notes_heart: string;
      notes_base: string;
      currency: string;
      badge: string | null;
      rating: number;
      review_count: number;
      is_available: number;
      is_new: number;
      is_bestseller: number;
      is_archived: number;
      collection_slug: string | null;
    }>(
      `SELECT p.*, c.slug as collection_slug
       FROM products p
       LEFT JOIN collections c ON c.id = p.collection_id
       WHERE p.is_archived = 0
       ORDER BY p.sort_order ASC, p.created_at DESC`
    );

    if (!rows || rows.length === 0) {
      return staticProducts;
    }

    const allVariants = queryAll<{
      id: string;
      product_id: string;
      size_ml: number;
      price: number;
      original_price?: number;
      stock: number;
      is_available: number;
    }>(`SELECT * FROM product_variants ORDER BY size_ml ASC`);

    const allImages = queryAll<{
      id: string;
      product_id: string;
      url: string;
      alt_ar: string;
      is_primary: number;
      sort_order: number;
    }>(`SELECT * FROM product_images ORDER BY is_primary DESC, sort_order ASC`);

    const variantsByProd = new Map<string, typeof allVariants>();
    for (const v of allVariants) {
      const list = variantsByProd.get(v.product_id) || [];
      list.push(v);
      variantsByProd.set(v.product_id, list);
    }

    const imagesByProd = new Map<string, typeof allImages>();
    for (const img of allImages) {
      const list = imagesByProd.get(img.product_id) || [];
      list.push(img);
      imagesByProd.set(img.product_id, list);
    }

    return rows.map((r) => {
      const vars = variantsByProd.get(r.id) || [];
      const imgs = imagesByProd.get(r.id) || [];
      const primaryUrl =
        imgs.find((i) => i.is_primary === 1)?.url ||
        imgs[0]?.url ||
        "/images/rezan/heritage/rezan-heritage-fragrance.webp";
      const galleryUrls = imgs.map((i) => i.url);

      const sizes: ProductSize[] = vars.map((v) => ({
        ml: v.size_ml,
        price: Number(v.price),
        originalPrice: v.original_price ? Number(v.original_price) : undefined,
      }));

      if (sizes.length === 0) {
        sizes.push({ ml: 100, price: 1500 });
      }

      let topNotes: string[] = [];
      let heartNotes: string[] = [];
      let baseNotes: string[] = [];
      try {
        topNotes = JSON.parse(r.notes_top || "[]");
      } catch {}
      try {
        heartNotes = JSON.parse(r.notes_heart || "[]");
      } catch {}
      try {
        baseNotes = JSON.parse(r.notes_base || "[]");
      } catch {}

      return {
        id: r.id,
        slug: r.slug,
        nameAr: r.name_ar,
        nameEn: r.name_en,
        brand: r.brand || "REZAN",
        taglineAr: r.tagline_ar || "",
        taglineEn: r.tagline_en || "",
        descriptionAr: r.description_ar || "",
        descriptionEn: r.description_en || "",
        gender: (r.gender as "unisex" | "male" | "female") || "unisex",
        olfactiveFamily: (r.olfactive_family as OlfactiveFamily) || "Oriental",
        notes: {
          top: topNotes,
          heart: heartNotes,
          base: baseNotes,
        } as FragranceNotes,
        sizes,
        currency: (r.currency as Currency) || "EGP",
        isAvailable: r.is_available === 1,
        badge: (r.badge as ProductBadge) || null,
        rating: Number(r.rating || 5.0),
        reviewCount: Number(r.review_count || 0),
        images: {
          primary: primaryUrl,
          gallery: galleryUrls.length > 0 ? galleryUrls : [primaryUrl],
          alt: r.name_ar,
        },
        collection: r.collection_slug || "signature",
        isNew: r.is_new === 1,
        isBestSeller: r.is_bestseller === 1,
      };
    });
  } catch (err) {
    console.error("Failed to load storefront products from SQLite:", err);
    return staticProducts;
  }
}

/**
 * Fetch a single storefront product by slug or id from SQLite.
 */
export function getStorefrontProductBySlug(slugOrId: string): Product | null {
  const all = getStorefrontProducts();
  return all.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
}

/**
 * Fetch all storefront collections from SQLite.
 */
export function getStorefrontCollections(): Collection[] {
  try {
    const rows = queryAll<{
      id: string;
      slug: string;
      name_ar: string;
      name_en: string;
      description_ar: string | null;
      description_en: string | null;
      image_url: string | null;
      sort_order: number;
      product_count: number;
    }>(`
      SELECT 
        c.id, c.slug, c.name_ar, c.name_en, c.description_ar, c.description_en,
        c.image_url, c.sort_order,
        COUNT(p.id) as product_count
      FROM collections c
      LEFT JOIN products p ON p.collection_id = c.id AND p.is_archived = 0
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.created_at ASC
    `);

    if (!rows || rows.length === 0) {
      return staticCollections;
    }

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      nameAr: r.name_ar,
      nameEn: r.name_en,
      descriptionAr: r.description_ar || "",
      descriptionEn: r.description_en || "",
      image: r.image_url || "/images/rezan/heritage/rezan-heritage-fragrance.webp",
      productCount: Number(r.product_count || 0),
      sortOrder: r.sort_order,
    }));
  } catch (err) {
    console.error("Failed to load storefront collections from SQLite:", err);
    return staticCollections;
  }
}

/**
 * Fetch a single collection by slug from SQLite.
 */
export function getStorefrontCollectionBySlug(slug: string): Collection | null {
  const all = getStorefrontCollections();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * Fetch all gift sets from SQLite.
 */
export function getStorefrontGiftSets(): GiftSet[] {
  try {
    const rows = queryAll<{
      id: string;
      slug: string;
      title_ar: string;
      title_en: string;
      description_ar: string | null;
      description_en: string | null;
      price: number;
      original_price: number | null;
      image_url: string | null;
      is_available: number;
      sort_order: number;
    }>(`
      SELECT * FROM gift_sets 
      WHERE is_available = 1
      ORDER BY sort_order ASC, created_at ASC
    `);

    if (!rows || rows.length === 0) {
      return staticGiftSets;
    }

    const items = queryAll<{
      gift_set_id: string;
      item_title_ar: string;
    }>(`SELECT gift_set_id, item_title_ar FROM gift_set_items`);

    const itemsBySet = new Map<string, string[]>();
    for (const item of items) {
      const list = itemsBySet.get(item.gift_set_id) || [];
      list.push(item.item_title_ar);
      itemsBySet.set(item.gift_set_id, list);
    }

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      nameAr: r.title_ar,
      nameEn: r.title_en,
      descriptionAr: r.description_ar || "",
      descriptionEn: r.description_en || "",
      price: Number(r.price),
      originalPrice: r.original_price ? Number(r.original_price) : undefined,
      image: r.image_url || "/images/rezan/heritage/rezan-heritage-fragrance.webp",
      includedProducts: itemsBySet.get(r.id) || [],
    }));
  } catch (err) {
    console.error("Failed to load storefront gift sets from SQLite:", err);
    return staticGiftSets;
  }
}

/**
 * Fetch approved customer reviews from SQLite.
 */
export function getStorefrontReviews(productId?: string): Review[] {
  try {
    let sql = "SELECT * FROM reviews WHERE status = 'approved'";
    const params: unknown[] = [];

    if (productId) {
      sql += " AND (product_id = ? OR product_id = (SELECT slug FROM products WHERE id = ? LIMIT 1))";
      params.push(productId, productId);
    }

    sql += " ORDER BY created_at DESC";

    const rows = queryAll<{
      id: string;
      product_id: string;
      customer_name: string;
      rating: number;
      comment_ar: string;
      comment_en: string | null;
      is_verified: number;
      created_at: string;
    }>(sql, params);

    if (!rows || rows.length === 0) {
      if (productId) {
        return staticReviews.filter((r) => r.productId === productId);
      }
      return staticReviews;
    }

    return rows.map((r) => ({
      id: r.id,
      productId: r.product_id,
      customerName: r.customer_name,
      rating: r.rating,
      commentAr: r.comment_ar,
      commentEn: r.comment_en || "",
      date: r.created_at ? r.created_at.slice(0, 10) : "2026-10-12",
      verified: r.is_verified === 1,
    }));
  } catch (err) {
    console.error("Failed to load storefront reviews from SQLite:", err);
    return staticReviews;
  }
}

/**
 * Fetch journal posts from SQLite.
 */
export function getStorefrontArticles(): Article[] {
  try {
    const rows = queryAll<{
      id: string;
      slug: string;
      title_ar: string;
      title_en: string;
      excerpt_ar: string | null;
      excerpt_en: string | null;
      content_ar: string | null;
      content_en: string | null;
      cover_image: string | null;
      category: string;
      published_at: string;
      reading_time: string | null;
    }>(`
      SELECT * FROM journal_posts 
      WHERE status = 'published'
      ORDER BY published_at DESC
    `);

    if (!rows || rows.length === 0) {
      return staticArticles;
    }

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      titleAr: r.title_ar,
      titleEn: r.title_en,
      excerptAr: r.excerpt_ar || "",
      excerptEn: r.excerpt_en || "",
      contentAr: r.content_ar || "",
      contentEn: r.content_en || "",
      coverImage: r.cover_image || "/images/rezan/heritage/rezan-heritage-fragrance.webp",
      category: r.category,
      publishedAt: r.published_at ? r.published_at.slice(0, 10) : "2026-03-25",
      readingTime: r.reading_time || "4 دقائق",
    }));
  } catch (err) {
    console.error("Failed to load storefront articles from SQLite:", err);
    return staticArticles;
  }
}

export function getStorefrontArticleBySlug(slug: string): Article | null {
  const all = getStorefrontArticles();
  return all.find((a) => a.slug === slug || a.id === slug) || null;
}

/**
 * Fetch homepage dynamic content and sections from SQLite.
 */
export function getStorefrontHomepageData() {
  const hero = {
    titleAr: "إرثٌ من العطر، وأثرٌ لا يزول.",
    subtitleAr: "توليفات عطرية نادرة من قلب التراث العربي بلمسة باريسية راقية.",
    ctaAr: "استكشف العطور",
    ctaUrl: "/collection",
    badgeAr: "MAISON DE PARFUM",
  };

  const featuredBanner = {
    titleAr: "مجموعة العود الملكي النادر",
    subtitleAr: "دهن عود كمبودي نقي وخشب صندل معتق يُخلد اللحظة ويأسر الحواس بأناقة لا مثيل لها.",
    ctaAr: "اكتشف المجموعة الكاملة",
    ctaUrl: "/collections/oud",
    badgeAr: "COLLECTION EXCLUSIVE",
  };

  try {
    const heroRow = queryOne<{ value: string }>(
      "SELECT value FROM store_settings WHERE key = 'hero'"
    );
    if (heroRow?.value) {
      const parsed = JSON.parse(heroRow.value);
      if (parsed.headlineAr) hero.titleAr = parsed.headlineAr;
      if (parsed.subheadlineAr) hero.subtitleAr = parsed.subheadlineAr;
      if (parsed.ctaTextAr) hero.ctaAr = parsed.ctaTextAr;
    }

    const row = queryOne<{ value: string }>(
      "SELECT value FROM store_settings WHERE key = 'homepage_content'"
    );
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      if (parsed.heroTitleAr) hero.titleAr = parsed.heroTitleAr;
      if (parsed.heroSubtitleAr) hero.subtitleAr = parsed.heroSubtitleAr;
      if (parsed.heroCtaAr) hero.ctaAr = parsed.heroCtaAr;
      if (parsed.heroCtaUrl) hero.ctaUrl = parsed.heroCtaUrl;
      if (parsed.heroBadgeAr) hero.badgeAr = parsed.heroBadgeAr;

      if (parsed.featuredTitleAr) featuredBanner.titleAr = parsed.featuredTitleAr;
      if (parsed.featuredSubtitleAr) featuredBanner.subtitleAr = parsed.featuredSubtitleAr;
      if (parsed.featuredCtaAr) featuredBanner.ctaAr = parsed.featuredCtaAr;
      if (parsed.featuredCtaUrl) featuredBanner.ctaUrl = parsed.featuredCtaUrl;
      if (parsed.featuredBadgeAr) featuredBanner.badgeAr = parsed.featuredBadgeAr;
    }
  } catch {}

  const products = getStorefrontProducts();
  const collections = getStorefrontCollections();
  const reviews = getStorefrontReviews();

  return {
    hero,
    featuredBanner,
    products,
    bestSellers: products.filter((p) => p.isBestSeller),
    newArrivals: products.filter((p) => p.isNew),
    collections,
    reviews,
  };
}
