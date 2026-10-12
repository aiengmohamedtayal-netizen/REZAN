import { queryAll, execute, transaction } from "../db";
import { logAuditAction } from "../audit";

export interface CollectionItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
}

export function listAdminCollections(): CollectionItem[] {
  const rows = queryAll<{
    id: string;
    slug: string;
    name_ar: string;
    name_en: string;
    description_ar: string | null;
    description_en: string | null;
    image_url: string | null;
    banner_url: string | null;
    is_featured: number;
    sort_order: number;
    product_count: number;
  }>(`
    SELECT 
      c.id, c.slug, c.name_ar, c.name_en, c.description_ar, c.description_en,
      c.image_url, c.banner_url, c.is_featured, c.sort_order,
      COUNT(p.id) as product_count
    FROM collections c
    LEFT JOIN products p ON p.collection_id = c.id
    GROUP BY c.id
    ORDER BY c.sort_order ASC, c.created_at ASC
  `);

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    nameAr: r.name_ar,
    nameEn: r.name_en,
    descriptionAr: r.description_ar,
    descriptionEn: r.description_en,
    imageUrl: r.image_url,
    bannerUrl: r.banner_url,
    isFeatured: Boolean(r.is_featured),
    sortOrder: r.sort_order,
    productCount: Number(r.product_count || 0),
  }));
}

export function createCollection(
  data: {
    slug: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    imageUrl?: string;
    bannerUrl?: string;
    isFeatured?: boolean;
    sortOrder?: number;
  },
  adminId?: string,
  adminEmail?: string
) {
  const id = `col_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  execute(
    `INSERT INTO collections (id, slug, name_ar, name_en, description_ar, description_en, image_url, banner_url, is_featured, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.slug,
      data.nameAr,
      data.nameEn,
      data.descriptionAr || null,
      data.descriptionEn || null,
      data.imageUrl || null,
      data.bannerUrl || null,
      data.isFeatured ? 1 : 0,
      data.sortOrder || 0,
    ]
  );

  logAuditAction({
    adminId,
    adminEmail,
    action: "collection.create",
    entityType: "collection",
    entityId: id,
    details: { slug: data.slug, nameAr: data.nameAr },
  });

  return id;
}

export function updateCollection(
  id: string,
  data: {
    slug: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    imageUrl?: string;
    isFeatured?: boolean;
  },
  adminId?: string,
  adminEmail?: string
) {
  execute(
    `UPDATE collections 
     SET slug = ?, name_ar = ?, name_en = ?, description_ar = ?, description_en = ?,
         image_url = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      data.slug,
      data.nameAr,
      data.nameEn,
      data.descriptionAr || null,
      data.descriptionEn || null,
      data.imageUrl || null,
      data.isFeatured ? 1 : 0,
      id,
    ]
  );

  logAuditAction({
    adminId,
    adminEmail,
    action: "collection.update",
    entityType: "collection",
    entityId: id,
    details: data,
  });
}

export function deleteCollection(id: string, adminId?: string, adminEmail?: string) {
  transaction(() => {
    // Unlink products
    execute("UPDATE products SET collection_id = NULL WHERE collection_id = ?", [id]);
    execute("DELETE FROM collections WHERE id = ?", [id]);

    logAuditAction({
      adminId,
      adminEmail,
      action: "collection.delete",
      entityType: "collection",
      entityId: id,
    });
  });
}
