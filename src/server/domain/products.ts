import { queryAll, queryOne, execute, transaction } from "../db";
import { logAuditAction } from "../audit";

export interface ProductListItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  brand: string;
  gender: string;
  olfactiveFamily: string;
  currency: string;
  badge: string | null;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isArchived: boolean;
  collectionSlug?: string;
  collectionNameAr?: string;
  primaryImage?: string;
  variantsCount: number;
  totalStock: number;
  minPrice: number;
  maxPrice: number;
}

interface ProductDbRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  brand: string;
  gender: string;
  olfactive_family: string;
  currency: string;
  badge: string | null;
  rating: number;
  review_count: number;
  is_available: number;
  is_new: number;
  is_bestseller: number;
  is_archived: number;
  collection_slug?: string;
  collection_name_ar?: string;
  collection_name_en?: string;
  primary_image?: string;
  variants_count?: number;
  total_stock?: number;
  min_price?: number;
  max_price?: number;
  tagline_ar?: string;
  tagline_en?: string;
  description_ar?: string;
  description_en?: string;
  collection_id?: string;
  notes_top?: string;
  notes_heart?: string;
  notes_base?: string;
  [key: string]: unknown;
}

export function listAdminProducts(params?: {
  search?: string;
  collection?: string;
  family?: string;
  gender?: string;
  status?: "all" | "active" | "archived" | "low_stock";
  limit?: number;
  offset?: number;
}): { products: ProductListItem[]; total: number } {
  const whereClauses: string[] = [];
  const queryParams: unknown[] = [];

  if (params?.search) {
    whereClauses.push("(p.name_ar LIKE ? OR p.name_en LIKE ? OR p.slug LIKE ?)");
    const s = `%${params.search}%`;
    queryParams.push(s, s, s);
  }

  if (params?.collection && params.collection !== "all") {
    whereClauses.push("p.collection_id = ?");
    queryParams.push(params.collection);
  }

  if (params?.family && params.family !== "all") {
    whereClauses.push("p.olfactive_family = ?");
    queryParams.push(params.family);
  }

  if (params?.gender && params.gender !== "all") {
    whereClauses.push("p.gender = ?");
    queryParams.push(params.gender);
  }

  if (params?.status === "archived") {
    whereClauses.push("p.is_archived = 1");
  } else if (params?.status === "active") {
    whereClauses.push("p.is_archived = 0 AND p.is_available = 1");
  } else if (params?.status !== "all") {
    whereClauses.push("p.is_archived = 0");
  }

  const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  // Count total
  const countRow = queryOne<{ count: number }>(
    `SELECT COUNT(DISTINCT p.id) as count FROM products p ${whereSql}`,
    queryParams
  );
  const total = countRow?.count || 0;

  const limit = params?.limit || 50;
  const offset = params?.offset || 0;

  const rows = queryAll<ProductDbRow>(
    `SELECT 
      p.id, p.slug, p.name_ar, p.name_en, p.brand, p.gender, p.olfactive_family,
      p.currency, p.badge, p.rating, p.review_count, p.is_available, p.is_new,
      p.is_bestseller, p.is_archived,
      c.slug as collection_slug, c.name_ar as collection_name_ar,
      (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image,
      COUNT(v.id) as variants_count,
      COALESCE(SUM(v.stock), 0) as total_stock,
      COALESCE(MIN(v.price), 0) as min_price,
      COALESCE(MAX(v.price), 0) as max_price
    FROM products p
    LEFT JOIN collections c ON c.id = p.collection_id
    LEFT JOIN product_variants v ON v.product_id = p.id
    ${whereSql}
    GROUP BY p.id
    ORDER BY p.sort_order ASC, p.created_at DESC
    LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  );

  const mapped: ProductListItem[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    nameAr: r.name_ar,
    nameEn: r.name_en,
    brand: r.brand,
    gender: r.gender,
    olfactiveFamily: r.olfactive_family,
    currency: r.currency,
    badge: r.badge,
    rating: r.rating,
    reviewCount: r.review_count,
    isAvailable: Boolean(r.is_available),
    isNew: Boolean(r.is_new),
    isBestSeller: Boolean(r.is_bestseller),
    isArchived: Boolean(r.is_archived),
    collectionSlug: r.collection_slug,
    collectionNameAr: r.collection_name_ar,
    primaryImage: r.primary_image,
    variantsCount: Number(r.variants_count || 0),
    totalStock: Number(r.total_stock || 0),
    minPrice: Number(r.min_price || 0),
    maxPrice: Number(r.max_price || 0),
  }));

  return { products: mapped, total };
}

export function getProductDetail(idOrSlug: string) {
  const product = queryOne<ProductDbRow>(
    `SELECT p.*, c.name_ar as collection_name_ar, c.name_en as collection_name_en, c.slug as collection_slug
     FROM products p
     LEFT JOIN collections c ON c.id = p.collection_id
     WHERE p.id = ? OR p.slug = ?`,
    [idOrSlug, idOrSlug]
  );

  if (!product) return null;

  const variants = queryAll<Record<string, unknown>>(
    `SELECT * FROM product_variants WHERE product_id = ? ORDER BY size_ml ASC`,
    [product.id]
  );

  const images = queryAll<Record<string, unknown>>(
    `SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC`,
    [product.id]
  );

  return {
    ...product,
    notesTop: JSON.parse((product.notes_top as string) || "[]"),
    notesHeart: JSON.parse((product.notes_heart as string) || "[]"),
    notesBase: JSON.parse((product.notes_base as string) || "[]"),
    variants,
    images,
  };
}

export function updateProductStock(
  variantId: string,
  newStock: number,
  adminId?: string,
  notes?: string,
  reason: "order" | "return" | "manual_adjustment" | "damaged" | "restock" | "initial" = "manual_adjustment",
  sku?: string,
  price?: number
) {
  return transaction(() => {
    const current = queryOne<{ id: string; product_id: string; stock: number; sku: string; price: number }>(
      `SELECT id, product_id, stock, sku, price FROM product_variants WHERE id = ?`,
      [variantId]
    );

    if (!current) throw new Error("Variant not found");

    const diff = newStock - current.stock;
    const updatedSku = sku || current.sku;
    const updatedPrice = price !== undefined ? price : current.price;

    execute(
      `UPDATE product_variants SET stock = ?, sku = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [newStock, updatedSku, updatedPrice, variantId]
    );

    const movementId = `mov_${variantId}_${Date.now()}`;
    execute(
      `INSERT INTO inventory_movements (id, variant_id, product_id, quantity_change, previous_stock, new_stock, reason, admin_id, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [movementId, variantId, current.product_id, diff, current.stock, newStock, reason, adminId || null, notes || "Manual stock adjustment"]
    );

    logAuditAction({
      adminId,
      action: "inventory.adjust",
      entityType: "variant",
      entityId: variantId,
      details: { previous: current.stock, current: newStock, diff, reason, notes, sku: updatedSku, price: updatedPrice },
    });

    return { variantId, previousStock: current.stock, newStock };
  });
}

export interface CreateProductInput {
  slug: string;
  nameAr: string;
  nameEn: string;
  brand?: string;
  taglineAr?: string;
  taglineEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  gender?: "unisex" | "male" | "female";
  olfactiveFamily: "Warm" | "Woody" | "Floral" | "Oriental" | "Fresh" | "Musky";
  notesTop?: string[];
  notesHeart?: string[];
  notesBase?: string[];
  badge?: "new" | "bestseller" | "sale" | "limited" | null;
  collectionId?: string | null;
  isAvailable?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  imageUrl?: string;
  variants: {
    sizeMl: number;
    price: number;
    originalPrice?: number;
    stock: number;
    sku?: string;
  }[];
}

export function createProduct(input: CreateProductInput, adminId?: string, adminEmail?: string) {
  return transaction(() => {
    const id = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    execute(
      `INSERT INTO products (
        id, slug, name_ar, name_en, brand, tagline_ar, tagline_en,
        description_ar, description_en, gender, olfactive_family,
        notes_top, notes_heart, notes_base, badge, collection_id,
        is_available, is_new, is_bestseller
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.slug,
        input.nameAr,
        input.nameEn,
        input.brand || "REZAN",
        input.taglineAr || null,
        input.taglineEn || null,
        input.descriptionAr || null,
        input.descriptionEn || null,
        input.gender || "unisex",
        input.olfactiveFamily,
        JSON.stringify(input.notesTop || []),
        JSON.stringify(input.notesHeart || []),
        JSON.stringify(input.notesBase || []),
        input.badge || null,
        input.collectionId || null,
        input.isAvailable !== false ? 1 : 0,
        input.isNew ? 1 : 0,
        input.isBestSeller ? 1 : 0,
      ]
    );

    // Variants
    if (input.variants && input.variants.length > 0) {
      for (const v of input.variants) {
        const vId = `var_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        execute(
          `INSERT INTO product_variants (id, product_id, size_ml, price, original_price, sku, stock)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            vId,
            id,
            v.sizeMl,
            v.price,
            v.originalPrice || null,
            v.sku || `RZN-${input.slug.toUpperCase()}-${v.sizeMl}`,
            v.stock || 0,
          ]
        );
      }
    }

    // Image
    if (input.imageUrl) {
      const imgId = `img_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      execute(
        `INSERT INTO product_images (id, product_id, url, is_primary) VALUES (?, ?, ?, 1)`,
        [imgId, id, input.imageUrl]
      );
    }

    logAuditAction({
      adminId,
      adminEmail,
      action: "product.create",
      entityType: "product",
      entityId: id,
      details: { slug: input.slug, nameAr: input.nameAr },
    });

    return id;
  });
}

export function updateProduct(
  id: string,
  input: Partial<CreateProductInput>,
  adminId?: string,
  adminEmail?: string
) {
  return transaction(() => {
    execute(
      `UPDATE products SET
        slug = COALESCE(?, slug),
        name_ar = COALESCE(?, name_ar),
        name_en = COALESCE(?, name_en),
        tagline_ar = COALESCE(?, tagline_ar),
        tagline_en = COALESCE(?, tagline_en),
        description_ar = COALESCE(?, description_ar),
        description_en = COALESCE(?, description_en),
        gender = COALESCE(?, gender),
        olfactive_family = COALESCE(?, olfactive_family),
        badge = ?,
        collection_id = ?,
        is_available = COALESCE(?, is_available),
        is_new = COALESCE(?, is_new),
        is_bestseller = COALESCE(?, is_bestseller),
        notes_top = COALESCE(?, notes_top),
        notes_heart = COALESCE(?, notes_heart),
        notes_base = COALESCE(?, notes_base),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        input.slug || null,
        input.nameAr || null,
        input.nameEn || null,
        input.taglineAr || null,
        input.taglineEn || null,
        input.descriptionAr || null,
        input.descriptionEn || null,
        input.gender || null,
        input.olfactiveFamily || null,
        input.badge !== undefined ? input.badge : null,
        input.collectionId !== undefined ? input.collectionId : null,
        input.isAvailable !== undefined ? (input.isAvailable ? 1 : 0) : null,
        input.isNew !== undefined ? (input.isNew ? 1 : 0) : null,
        input.isBestSeller !== undefined ? (input.isBestSeller ? 1 : 0) : null,
        input.notesTop ? JSON.stringify(input.notesTop) : null,
        input.notesHeart ? JSON.stringify(input.notesHeart) : null,
        input.notesBase ? JSON.stringify(input.notesBase) : null,
        id,
      ]
    );

    if (input.imageUrl) {
      const existingImg = queryOne<{ id: string }>(
        `SELECT id FROM product_images WHERE product_id = ? AND is_primary = 1`,
        [id]
      );
      if (existingImg) {
        execute(`UPDATE product_images SET url = ? WHERE id = ?`, [input.imageUrl, existingImg.id]);
      } else {
        const imgId = `img_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        execute(`INSERT INTO product_images (id, product_id, url, is_primary) VALUES (?, ?, ?, 1)`, [
          imgId,
          id,
          input.imageUrl,
        ]);
      }
    }

    logAuditAction({
      adminId,
      adminEmail,
      action: "product.update",
      entityType: "product",
      entityId: id,
      details: { slug: input.slug, nameAr: input.nameAr },
    });
  });
}

export function archiveProduct(id: string, isArchived: boolean, adminId?: string, adminEmail?: string) {
  execute(`UPDATE products SET is_archived = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
    isArchived ? 1 : 0,
    id,
  ]);

  logAuditAction({
    adminId,
    adminEmail,
    action: isArchived ? "product.archive" : "product.unarchive",
    entityType: "product",
    entityId: id,
  });
}

export function deleteProduct(id: string, adminId?: string, adminEmail?: string) {
  return transaction(() => {
    execute("DELETE FROM product_images WHERE product_id = ?", [id]);
    execute("DELETE FROM inventory_movements WHERE product_id = ?", [id]);
    execute("DELETE FROM product_variants WHERE product_id = ?", [id]);
    execute("DELETE FROM reviews WHERE product_id = ?", [id]);
    execute("DELETE FROM products WHERE id = ?", [id]);

    logAuditAction({
      adminId,
      adminEmail,
      action: "product.delete",
      entityType: "product",
      entityId: id,
    });
  });
}

