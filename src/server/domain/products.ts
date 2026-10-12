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

export function updateProductStock(variantId: string, newStock: number, adminId?: string, notes?: string) {
  return transaction(() => {
    const current = queryOne<{ id: string; product_id: string; stock: number }>(
      `SELECT id, product_id, stock FROM product_variants WHERE id = ?`,
      [variantId]
    );

    if (!current) throw new Error("Variant not found");

    const diff = newStock - current.stock;
    execute(`UPDATE product_variants SET stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [newStock, variantId]);

    const movementId = `mov_${variantId}_${Date.now()}`;
    execute(
      `INSERT INTO inventory_movements (id, variant_id, product_id, quantity_change, previous_stock, new_stock, reason, admin_id, notes)
       VALUES (?, ?, ?, ?, ?, ?, 'manual_adjustment', ?, ?)`,
      [movementId, variantId, current.product_id, diff, current.stock, newStock, adminId || null, notes || "Manual stock adjustment"]
    );

    logAuditAction({
      adminId,
      action: "inventory.adjust",
      entityType: "variant",
      entityId: variantId,
      details: { previous: current.stock, current: newStock, diff, notes },
    });

    return { variantId, previousStock: current.stock, newStock };
  });
}
