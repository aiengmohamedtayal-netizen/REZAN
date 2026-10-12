import { queryOne, execute, transaction } from "@/server/db";
import { products, collections, giftSets, articles, reviews } from "@/data";
import { hashPassword } from "@/server/auth/crypto";

export async function seedCompleteStoreData() {

  // 1. Ensure default admin has valid password hash
  const admin = queryOne("SELECT id FROM admins WHERE email = ?", ["admin@rezan.com"]);
  if (admin) {
    const defaultPasswordHash = await hashPassword("Rezan@2026!Admin");
    execute("UPDATE admins SET password_hash = ? WHERE id = ?", [defaultPasswordHash, admin.id]);
  }

  // 2. Check if products already seeded
  const productCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM products");
  if (!productCount || productCount.count === 0) {
    transaction(() => {
    // 3. Seed Collections
    for (let i = 0; i < collections.length; i++) {
      const col = collections[i];
      execute(
        `INSERT OR IGNORE INTO collections (id, slug, name_ar, name_en, description_ar, description_en, image_url, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [col.id, col.slug, col.nameAr, col.nameEn, col.descriptionAr, col.descriptionEn, col.image, i]
      );
    }

    // 4. Seed Products and Variants
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      execute(
        `INSERT OR IGNORE INTO products 
         (id, slug, name_ar, name_en, brand, tagline_ar, tagline_en, description_ar, description_en, 
          gender, olfactive_family, notes_top, notes_heart, notes_base, currency, badge, rating, 
          review_count, is_available, is_new, is_bestseller, collection_id, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.slug,
          p.nameAr,
          p.nameEn,
          p.brand || "REZAN",
          p.taglineAr || "",
          p.taglineEn || "",
          p.descriptionAr || "",
          p.descriptionEn || "",
          p.gender || "unisex",
          p.olfactiveFamily,
          JSON.stringify(p.notes?.top || []),
          JSON.stringify(p.notes?.heart || []),
          JSON.stringify(p.notes?.base || []),
          p.currency || "EGP",
          p.badge || null,
          p.rating || 5.0,
          p.reviewCount || 0,
          p.isAvailable ? 1 : 0,
          p.isNew ? 1 : 0,
          p.isBestSeller ? 1 : 0,
          p.collection || "signature",
          i,
        ]
      );

      // Primary Image
      execute(
        `INSERT OR IGNORE INTO product_images (id, product_id, url, alt_ar, is_primary, sort_order)
         VALUES (?, ?, ?, ?, 1, 0)`,
        [`img_${p.id}_pri`, p.id, p.images.primary, p.images.alt || p.nameAr]
      );

      // Variants
      for (const size of p.sizes) {
        const variantId = `var_${p.id}_${size.ml}`;
        const initialStock = 45; // realistic boutique inventory count
        execute(
          `INSERT OR IGNORE INTO product_variants 
           (id, product_id, size_ml, price, original_price, sku, stock, is_available)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            variantId,
            p.id,
            size.ml,
            size.price,
            size.originalPrice || null,
            `RZN-${p.id.toUpperCase()}-${size.ml}`,
            initialStock,
          ]
        );

        // Initial inventory movement audit record
        execute(
          `INSERT OR IGNORE INTO inventory_movements
           (id, variant_id, product_id, quantity_change, previous_stock, new_stock, reason, notes)
           VALUES (?, ?, ?, ?, 0, ?, 'initial', 'Initial boutique launch stock')`,
          [`mov_${variantId}_init`, variantId, p.id, initialStock, initialStock]
        );
      }
    }

    // 5. Seed Curated Gift Sets
    if (giftSets && giftSets.length > 0) {
      for (let i = 0; i < giftSets.length; i++) {
        const g = giftSets[i];
        execute(
          `INSERT OR IGNORE INTO gift_sets (id, slug, title_ar, title_en, description_ar, description_en, price, original_price, image_url, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [g.id, g.slug, g.nameAr, g.nameEn, g.descriptionAr, g.descriptionEn, g.price, g.originalPrice || null, g.image, i]
        );

        for (const itemText of g.includedProducts) {
          execute(
            `INSERT OR IGNORE INTO gift_set_items (id, gift_set_id, item_title_ar, item_title_en)
             VALUES (?, ?, ?, ?)`,
            [`gsi_${g.id}_${Math.random().toString(36).slice(2, 7)}`, g.id, itemText, itemText]
          );
        }
      }
    }

    // 6. Seed Sample Customers and Orders for Rich Initial Analytics
    const sampleCustomers = [
      { id: "cust_1", email: "hassan.farouk@example.com", phone: "+20 100 123 4567", first: "حسن", last: "فاروق", orders: 3, spent: 14600 },
      { id: "cust_2", email: "nour.elgohary@example.com", phone: "+20 101 234 5678", first: "نور", last: "الجوهري", orders: 2, spent: 9200 },
      { id: "cust_3", email: "youssef.mansour@example.com", phone: "+20 102 345 6789", first: "يوسف", last: "منصور", orders: 1, spent: 5800 },
      { id: "cust_4", email: "mariam.salem@example.com", phone: "+20 103 456 7890", first: "مريم", last: "سالم", orders: 4, spent: 21400 },
    ];

    for (const c of sampleCustomers) {
      execute(
        `INSERT OR IGNORE INTO customers (id, email, phone, first_name, last_name, total_orders, total_spent)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [c.id, c.email, c.phone, c.first, c.last, c.orders, c.spent]
      );
    }

    const sampleOrders = [
      { id: "ord_1001", num: "RZN-2401", cust: "cust_1", name: "حسن فاروق", email: "hassan.farouk@example.com", phone: "+20 100 123 4567", gov: "القاهرة", city: "التجمع الخامس", addr: "شارع التسعين الشمالي، فيلا ١٤", sub: 5800, total: 5800, status: "delivered", pay: "paid", ful: "fulfilled", method: "card", created: "2026-10-10 14:30:00" },
      { id: "ord_1002", num: "RZN-2402", cust: "cust_2", name: "نور الجوهري", email: "nour.elgohary@example.com", phone: "+20 101 234 5678", gov: "الجيزة", city: "الشيخ زايد", addr: "كمبوند بيفرلي هيلز، مبنى ٨", sub: 4800, total: 4800, status: "processing", pay: "paid", ful: "unfulfilled", method: "card", created: "2026-10-11 18:20:00" },
      { id: "ord_1003", num: "RZN-2403", cust: "cust_3", name: "يوسف منصور", email: "youssef.mansour@example.com", phone: "+20 102 345 6789", gov: "الإسكندرية", city: "سموحة", addr: "شارع ألبرت الأول، برج الصفوة", sub: 5800, total: 5950, status: "pending", pay: "pending", ful: "unfulfilled", method: "cod", created: "2026-10-12 11:15:00" },
      { id: "ord_1004", num: "RZN-2404", cust: "cust_4", name: "مريم سالم", email: "mariam.salem@example.com", phone: "+20 103 456 7890", gov: "القاهرة", city: "مصر الجديدة", addr: "شارع بيروت، عمارة ٢٢", sub: 6200, total: 6200, status: "shipped", pay: "paid", ful: "fulfilled", method: "card", created: "2026-10-12 16:45:00" },
    ];

    for (const o of sampleOrders) {
      execute(
        `INSERT OR IGNORE INTO orders 
         (id, order_number, customer_id, customer_name, customer_email, customer_phone, governorate, city, address, subtotal, shipping_fee, total, order_status, payment_status, fulfillment_status, payment_method, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?)`,
        [o.id, o.num, o.cust, o.name, o.email, o.phone, o.gov, o.city, o.addr, o.sub, o.total, o.status, o.pay, o.ful, o.method, o.created]
      );

      execute(
        `INSERT OR IGNORE INTO order_items (id, order_id, product_id, variant_id, product_name_ar, product_name_en, size_ml, unit_price, quantity, total_price)
         VALUES (?, ?, 'p01', 'var_p01_100', 'ريزان رقم ٠١', 'REZAN No. 01', 100, 5800, 1, 5800)`,
        [`item_${o.id}_1`, o.id]
      );
    }

      // 7. Seed Sample Coupons
      execute(
        `INSERT OR IGNORE INTO coupons (id, code, discount_type, discount_value, min_order_value, max_uses, is_active)
         VALUES ('cpn_welcome', 'WELCOME10', 'percentage', 10, 2000, 500, 1),
                ('cpn_royal', 'ROYAL500', 'fixed', 500, 5000, 100, 1)`
      );
    });
  }

  // 8. Seed Journal Posts if empty
  const journalCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM journal_posts");
  if (!journalCount || journalCount.count === 0) {
    for (const a of articles) {
      execute(
        `INSERT OR IGNORE INTO journal_posts 
         (id, slug, title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, cover_image, category, status, reading_time, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
        [a.id, a.slug, a.titleAr, a.titleEn, a.excerptAr, a.excerptEn, a.contentAr, a.contentEn, a.coverImage, a.category, a.readingTime, "2026-03-25 10:00:00"]
      );
    }
  }

  // 9. Seed Reviews if empty
  const reviewCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM reviews");
  if (!reviewCount || reviewCount.count === 0) {
    for (const r of reviews) {
      execute(
        `INSERT OR IGNORE INTO reviews 
         (id, product_id, customer_name, rating, comment_ar, comment_en, is_verified, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?)`,
        [r.id, r.productId, r.customerName, r.rating, r.commentAr, r.commentEn, r.verified ? 1 : 0, r.date]
      );
    }
  }

  // 10. Seed Contact Messages if empty
  const msgCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM contact_messages");
  if (!msgCount || msgCount.count === 0) {
    const sampleMessages = [
      { id: "msg_1", name: "طارق سليم", email: "tarek.selim@example.com", phone: "+20 102 111 2233", subject: "استفسار عن توفر عود النور ١٠٠ مل", message: "مساء الخير، هل يتوفر عود النور سعة ١٠٠ مل للتسليم الفوري في الإسكندرية؟", status: "unread", created: "2026-10-12 19:30:00" },
      { id: "msg_2", name: "داليا زهران", email: "dalia.zahran@example.com", phone: "+20 109 444 5566", subject: "طلب تخصيص باقة هدايا لشركة", message: "نود طلب ٢٠ طقم من مجموعة التوقيع الملكية كهدايا تنفيذية مع كروت إهداء مخصصة لشعار الشركة.", status: "read", created: "2026-10-11 14:15:00" },
      { id: "msg_3", name: "كريم عبدالحميد", email: "karim.abdelhamid@example.com", phone: "+20 111 777 8899", subject: "تأكيد موعد استلام الطلب RZN-2401", message: "تم استلام الطلب بالكامل في الموعد المحدد، جودة التغليف والعطر استثنائية وفوق التوقعات، شكراً لكم.", status: "replied", created: "2026-10-10 16:50:00" },
    ];
    for (const m of sampleMessages) {
      execute(
        `INSERT OR IGNORE INTO contact_messages (id, name, email, phone, subject, message, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, m.name, m.email, m.phone, m.subject, m.message, m.status, m.created]
      );
    }
  }

  // 11. Seed Media Assets if empty
  const mediaCount = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM media_assets");
  if (!mediaCount || mediaCount.count === 0) {
    const sampleAssets = [
      { id: "med_1", filename: "rezan-no-01-bottle.webp", url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", size: 450200, mime: "image/webp", dim: "1200x1200", alt: "زجاجة عطر ريزان رقم ٠١ الفاخرة" },
      { id: "med_2", filename: "rezan-no-07-dark.webp", url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", size: 512000, mime: "image/webp", dim: "1200x1200", alt: "زجاجة عطر ريزان رقم ٠٧ في إضاءة سينمائية" },
      { id: "med_3", filename: "oud-al-noor-gold.webp", url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", size: 620400, mime: "image/webp", dim: "1200x1200", alt: "عطر عود النور بتفاصيل ذهبية" },
      { id: "med_4", filename: "royal-gift-set.webp", url: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80", size: 780000, mime: "image/webp", dim: "1600x1200", alt: "صندوق أطقم هدايا ريزان الملكي" },
      { id: "med_5", filename: "rose-taif-harvest.webp", url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80", size: 390100, mime: "image/webp", dim: "1200x800", alt: "موسم قطاف الورد النادر في الجبال" },
    ];
    for (const a of sampleAssets) {
      execute(
        `INSERT OR IGNORE INTO media_assets (id, filename, url, file_size, mime_type, dimensions, alt_text, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, '2026-10-01 10:00:00')`,
        [a.id, a.filename, a.url, a.size, a.mime, a.dim, a.alt]
      );
    }
  }
}
