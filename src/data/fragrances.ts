// ─── REZAN Product Data ───────────────────────────────────────────────────────
// Static placeholder data. Architecture is API-ready — swap fetchFragrances()
// for a real endpoint when the backend is live.

export interface FragranceNote {
  top: string[];
  heart: string[];
  base: string[];
}

export type OlfactiveFamily = "Warm" | "Woody" | "Floral" | "Oriental" | "Fresh" | "Musky";

export interface Fragrance {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  olfactiveFamily: OlfactiveFamily;
  notes: FragranceNote;
  price: number;
  originalPrice?: number;
  currency: "SAR";
  sizes: number[];
  defaultSizeMl: number;
  isAvailable: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  image: string;
  images: string[];
  collection?: string;
}

export const fragrances: Fragrance[] = [
  {
    id: "1",
    slug: "oud-royale",
    nameEn: "Oud Royale",
    nameAr: "عود رويال",
    tagline: "The Crown of Oud",
    taglineAr: "تاج العود",
    description: "A majestic oriental composition built around the finest aged oud, draped in dark rose and amber.",
    descriptionAr: "تركيبة شرقية ملكية تتمحور حول أجود أنواع العود المعتق، مكسوة بالورد الداكن والعنبر.",
    olfactiveFamily: "Oriental",
    notes: {
      top: ["Saffron", "Rose"],
      heart: ["Oud", "Sandalwood"],
      base: ["Amber", "Musk", "Vetiver"],
    },
    price: 580,
    currency: "SAR",
    sizes: [50, 100],
    defaultSizeMl: 100,
    isAvailable: true,
    isBestSeller: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Signature",
  },
  {
    id: "2",
    slug: "rose-desert",
    nameEn: "Rose Desert",
    nameAr: "ورد الصحراء",
    tagline: "Bloom in Silence",
    taglineAr: "تفتح في الصمت",
    description: "An ethereal floral ode to the desert rose — powdery, warm, and endlessly feminine.",
    descriptionAr: "قصيدة زهرية أثيرية لوردة الصحراء — ناعمة، دافئة، وأنثوية إلى ما لا نهاية.",
    olfactiveFamily: "Floral",
    notes: {
      top: ["Rose", "Peony"],
      heart: ["Iris", "Musk"],
      base: ["Sandalwood", "White Amber"],
    },
    price: 420,
    currency: "SAR",
    sizes: [50, 100],
    defaultSizeMl: 50,
    isAvailable: true,
    isNew: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Signature",
  },
  {
    id: "3",
    slug: "amber-nights",
    nameEn: "Amber Nights",
    nameAr: "ليالي العنبر",
    tagline: "Warmth After Dark",
    taglineAr: "الدفء في الظلام",
    description: "A rich, smoky amber anchored by dark vanilla and precious woods for the night.",
    descriptionAr: "عنبر دخاني غني مثبت بالفانيليا الداكنة والأخشاب الثمينة لأجل الليل.",
    olfactiveFamily: "Warm",
    notes: {
      top: ["Cinnamon", "Cardamom"],
      heart: ["Amber", "Labdanum"],
      base: ["Vanilla", "Dark Woods", "Tonka Bean"],
    },
    price: 490,
    originalPrice: 590,
    currency: "SAR",
    sizes: [50, 100, 200],
    defaultSizeMl: 100,
    isAvailable: true,
    isBestSeller: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Signature",
  },
  {
    id: "4",
    slug: "musk-serenade",
    nameEn: "Musk Serenade",
    nameAr: "سيمفونية المسك",
    tagline: "Skin Like a Second Name",
    taglineAr: "عطر يلتصق بالجلد كاسم ثانٍ",
    description: "A clean, transparent musk that blends seamlessly with the skin. Effortless and unforgettable.",
    descriptionAr: "مسك نظيف وشفاف يمتزج بسلاسة مع الجلد. خفيف لا يُنسى.",
    olfactiveFamily: "Musky",
    notes: {
      top: ["Bergamot", "White Tea"],
      heart: ["Musk", "Orris"],
      base: ["Cedar", "Cashmere Wood"],
    },
    price: 350,
    currency: "SAR",
    sizes: [50, 100],
    defaultSizeMl: 50,
    isAvailable: true,
    isNew: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Signature",
  },
  {
    id: "5",
    slug: "oud-silk",
    nameEn: "Oud Silk",
    nameAr: "عود الحرير",
    tagline: "Soft Power",
    taglineAr: "القوة الناعمة",
    description: "The raw power of oud softened with silk-like woods and creamy musks.",
    descriptionAr: "القوة الخام للعود تلطفها أخشاب تشبه الحرير ومسك كريمي.",
    olfactiveFamily: "Woody",
    notes: {
      top: ["Oud", "Spices"],
      heart: ["Sandalwood", "Rose"],
      base: ["Musk", "Ambergris"],
    },
    price: 650,
    currency: "SAR",
    sizes: [100],
    defaultSizeMl: 100,
    isAvailable: true,
    isBestSeller: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Oud",
  },
  {
    id: "6",
    slug: "al-fajr",
    nameEn: "Al Fajr",
    nameAr: "الفجر",
    tagline: "The Hour Before Dawn",
    taglineAr: "ساعة ما قبل الفجر",
    description: "Fresh, crisp and ethereal — the scent of cool air before sunrise over open desert.",
    descriptionAr: "منعش وأثيري — رائحة الهواء البارد قبل شروق الشمس على الصحراء المفتوحة.",
    olfactiveFamily: "Fresh",
    notes: {
      top: ["Citrus", "Green Tea"],
      heart: ["Neroli", "Water Lily"],
      base: ["Driftwood", "Musk"],
    },
    price: 380,
    currency: "SAR",
    sizes: [50, 100],
    defaultSizeMl: 50,
    isAvailable: true,
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
    images: ["/images/rezan/collections/oud-attar-golden-prayer-beads.png"],
    collection: "Heritage",
  },
];

export const bestSellers = fragrances.filter((f) => f.isBestSeller);
export const newArrivals = fragrances.filter((f) => f.isNew);

export const collections = [
  {
    id: "signature",
    slug: "signature",
    nameEn: "Signature",
    nameAr: "الكلاسيكية",
    description: "The essential REZAN collection.",
    descriptionAr: "المجموعة الأساسية من ريزان.",
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
  },
  {
    id: "oud",
    slug: "oud",
    nameEn: "Oud Masters",
    nameAr: "عطور العود",
    description: "The finest oud compositions.",
    descriptionAr: "أرقى تركيبات العود.",
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
  },
  {
    id: "heritage",
    slug: "heritage",
    nameEn: "Heritage",
    nameAr: "الإرث",
    description: "Inspired by ancient Arabic scent culture.",
    descriptionAr: "مستوحاة من ثقافة العطور العربية العريقة.",
    image: "/images/rezan/collections/oud-attar-golden-prayer-beads.png",
  },
];

export function formatPrice(price: number, currency: string = "SAR") {
  return `${price.toLocaleString("ar-SA")} ${currency}`;
}
