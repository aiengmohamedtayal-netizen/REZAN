// ─── REZAN Type Definitions ──────────────────────────────────────────────────

export type OlfactiveFamily = "Warm" | "Woody" | "Floral" | "Oriental" | "Fresh" | "Musky";
export type Currency = "EGP";
export type ProductBadge = "new" | "bestseller" | "sale" | "limited" | null;

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSize {
  ml: number;
  price: number;
  originalPrice?: number;
}

export interface ProductImage {
  primary: string;
  gallery: string[];
  alt: string;
  source?: string;
  sourceUrl?: string;
  usage?: "demo" | "licensed" | "owned";
}

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  brand?: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  gender: "unisex" | "male" | "female";
  olfactiveFamily: OlfactiveFamily;
  notes: FragranceNotes;
  sizes: ProductSize[];
  currency: Currency;
  isAvailable: boolean;
  badge: ProductBadge;
  rating: number;         // 1-5
  reviewCount: number;
  images: ProductImage;
  collection: string;     // collection slug
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  date: string;
  verified: boolean;
}

export interface NavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  href: string;
  children?: Omit<NavItem, "children">[];
}

export interface Announcement {
  id: string;
  textAr: string;
  textEn: string;
  href?: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  sizeMl: number;
  quantity: number;
  price: number;
}

export interface Article {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}

