export const storeConfig = {
  storeName: "REZAN",
  storeNameAr: "ريزان",
  country: "Egypt",
  countryCode: "EG",
  locale: "ar-EG",
  currency: "EGP",
  currencySymbol: "ج.م",
  direction: "rtl",
  supportEmail: "care@rezan.com.eg",
  supportPhone: "+20 100 000 0000",
  socialLinks: {
    instagram: "https://instagram.com/rezan.eg",
    facebook: "https://facebook.com/rezan.eg",
    tiktok: "https://tiktok.com/@rezan.eg",
  },
  shippingConfig: {
    country: "EG",
    currency: "EGP",
    enabled: true,
    fee: 50,
    freeShippingThreshold: 2500,
  },
  paymentConfig: {
    methods: ["cod", "credit_card", "wallet"],
  },
  storeFeatures: {
    reviews: true,
    wishlist: true,
    newsletter: true,
  },
};
