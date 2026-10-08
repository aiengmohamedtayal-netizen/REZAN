// ─── Announcement Bar Data ────────────────────────────────────────────────────
// Replace messages with real promotional content when available.

export interface Announcement {
  id: string;
  textAr: string;
  textEn: string;
  href?: string;
}

export const announcements: Announcement[] = [
  {
    id: "1",
    textAr: "شحن مجاني للطلبات فوق 300 ريال",
    textEn: "Free shipping on orders over 300 SAR",
  },
  {
    id: "2",
    textAr: "اكتشف مجموعة ريزان الحصرية الجديدة",
    textEn: "Discover REZAN's exclusive new collection",
    href: "/collection",
  },
  {
    id: "3",
    textAr: "التوصيل خلال 2-4 أيام عمل داخل المملكة",
    textEn: "Delivery within 2–4 business days across KSA",
  },
];

export interface NavCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  href: string;
  children?: { nameAr: string; nameEn: string; href: string }[];
}

export const navCategories: NavCategory[] = [
  {
    id: "fragrances",
    nameAr: "العطور",
    nameEn: "Fragrances",
    href: "/collection",
    children: [
      { nameAr: "عطور 50 مل", nameEn: "50ml Fragrances", href: "/collection?size=50" },
      { nameAr: "عطور 100 مل", nameEn: "100ml Fragrances", href: "/collection?size=100" },
      { nameAr: "عطور 200 مل", nameEn: "200ml Fragrances", href: "/collection?size=200" },
      { nameAr: "جميع العطور", nameEn: "All Fragrances", href: "/collection" },
    ],
  },
  {
    id: "new",
    nameAr: "الجديد",
    nameEn: "New Arrivals",
    href: "/collection?filter=new",
  },
  {
    id: "bestsellers",
    nameAr: "الأكثر مبيعاً",
    nameEn: "Best Sellers",
    href: "/collection?filter=bestsellers",
  },
  {
    id: "collections",
    nameAr: "المجموعات",
    nameEn: "Collections",
    href: "/collection",
    children: [
      { nameAr: "مجموعة الكلاسيكية", nameEn: "Signature", href: "/collection/signature" },
      { nameAr: "عطور العود", nameEn: "Oud Masters", href: "/collection/oud" },
      { nameAr: "مجموعة الإرث", nameEn: "Heritage", href: "/collection/heritage" },
    ],
  },
  {
    id: "oils",
    nameAr: "زيوت عطرية",
    nameEn: "Perfume Oils",
    href: "/collection?category=oils",
  },
  {
    id: "gifts",
    nameAr: "الهدايا",
    nameEn: "Gifts",
    href: "/gifts",
  },
  {
    id: "maison",
    nameAr: "عن ريزان",
    nameEn: "The Maison",
    href: "/about",
  },
];
