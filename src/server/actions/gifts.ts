"use server";

import { revalidatePath } from "next/cache";
import { execute, transaction } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function toggleGiftSetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "products.write");

  const giftSetId = formData.get("giftSetId") as string;
  const currentAvailable = parseInt(formData.get("currentAvailable") as string, 10);
  const nextAvailable = currentAvailable === 1 ? 0 : 1;

  execute(
    "UPDATE gift_sets SET is_available = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [nextAvailable, giftSetId]
  );

  logAuditAction(admin.id, admin.email, "gift_set.availability_changed", "gift_set", giftSetId, {
    available: nextAvailable === 1,
  });

  revalidatePath("/admin/gifts");
  revalidatePath("/gifts");
}

export async function createGiftSetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  assertPermission(admin, "products.write");

  const titleAr = (formData.get("titleAr") as string)?.trim();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const descriptionEn = (formData.get("descriptionEn") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const originalPriceRaw = formData.get("originalPrice") as string;
  const originalPrice = originalPriceRaw ? parseFloat(originalPriceRaw) : null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || null;
  const isAvailable = formData.get("isAvailable") !== "off" ? 1 : 0;
  const isFeatured = formData.get("isFeatured") === "on" ? 1 : 0;
  const itemsRaw = (formData.get("items") as string)?.trim();

  if (!titleAr || !titleEn || !slug || isNaN(price)) {
    throw new Error("Missing required gift set fields");
  }

  transaction(() => {
    const id = `gift_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    execute(
      `INSERT INTO gift_sets (id, slug, title_ar, title_en, description_ar, description_en, price, original_price, image_url, is_available, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        slug,
        titleAr,
        titleEn,
        descriptionAr || null,
        descriptionEn || null,
        price,
        originalPrice,
        imageUrl,
        isAvailable,
        isFeatured,
      ]
    );

    if (itemsRaw) {
      const itemsList = itemsRaw.split(",").map((s) => s.trim()).filter(Boolean);
      for (const item of itemsList) {
        const itemId = `gi_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        execute(
          `INSERT INTO gift_set_items (id, gift_set_id, item_title_ar, item_title_en) VALUES (?, ?, ?, ?)`,
          [itemId, id, item, item]
        );
      }
    }

    logAuditAction(admin.id, admin.email, "gift_set.create", "gift_set", id, {
      slug,
      titleAr,
      price,
    });
  });

  revalidatePath("/admin/gifts");
  revalidatePath("/gifts");
}

export async function updateGiftSetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  assertPermission(admin, "products.write");

  const id = formData.get("giftSetId") as string;
  const titleAr = (formData.get("titleAr") as string)?.trim();
  const titleEn = (formData.get("titleEn") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const descriptionAr = (formData.get("descriptionAr") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const originalPriceRaw = formData.get("originalPrice") as string;
  const originalPrice = originalPriceRaw ? parseFloat(originalPriceRaw) : null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || null;
  const isAvailable = formData.get("isAvailable") === "on" ? 1 : 0;
  const isFeatured = formData.get("isFeatured") === "on" ? 1 : 0;
  const itemsRaw = (formData.get("items") as string)?.trim();

  if (!id || !titleAr || !titleEn || !slug || isNaN(price)) {
    throw new Error("Missing required gift set fields");
  }

  transaction(() => {
    execute(
      `UPDATE gift_sets SET
        slug = ?, title_ar = ?, title_en = ?, description_ar = ?, price = ?,
        original_price = ?, image_url = ?, is_available = ?, is_featured = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        slug,
        titleAr,
        titleEn,
        descriptionAr || null,
        price,
        originalPrice,
        imageUrl,
        isAvailable,
        isFeatured,
        id,
      ]
    );

    if (itemsRaw !== undefined) {
      execute("DELETE FROM gift_set_items WHERE gift_set_id = ?", [id]);
      const itemsList = itemsRaw.split(",").map((s) => s.trim()).filter(Boolean);
      for (const item of itemsList) {
        const itemId = `gi_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        execute(
          `INSERT INTO gift_set_items (id, gift_set_id, item_title_ar, item_title_en) VALUES (?, ?, ?, ?)`,
          [itemId, id, item, item]
        );
      }
    }

    logAuditAction(admin.id, admin.email, "gift_set.update", "gift_set", id, {
      slug,
      titleAr,
      price,
    });
  });

  revalidatePath("/admin/gifts");
  revalidatePath("/gifts");
}

export async function deleteGiftSetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  assertPermission(admin, "products.write");

  const id = formData.get("giftSetId") as string;
  if (!id) throw new Error("Missing gift set ID");

  transaction(() => {
    execute("DELETE FROM gift_set_items WHERE gift_set_id = ?", [id]);
    execute("DELETE FROM gift_sets WHERE id = ?", [id]);

    logAuditAction(admin.id, admin.email, "gift_set.delete", "gift_set", id, {});
  });

  revalidatePath("/admin/gifts");
  revalidatePath("/gifts");
}
