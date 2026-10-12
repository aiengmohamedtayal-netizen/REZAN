"use server";

import { revalidatePath } from "next/cache";
import { queryOne, execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function createCouponAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "orders.write");

  const code = (formData.get("code") as string)?.trim().toUpperCase();
  const discountType = formData.get("discount_type") as string;
  const discountValue = parseFloat(formData.get("discount_value") as string);
  const minOrderValue = parseFloat((formData.get("min_order_value") as string) || "0");
  const maxUsesRaw = formData.get("max_uses") as string;
  const maxUses = maxUsesRaw ? parseInt(maxUsesRaw, 10) : null;

  if (!code || isNaN(discountValue) || discountValue <= 0) return;

  const existing = queryOne("SELECT id FROM coupons WHERE code = ?", [code]);
  if (existing) return;

  const id = `cpn_${Math.random().toString(36).slice(2, 9)}`;

  execute(
    `INSERT INTO coupons (id, code, discount_type, discount_value, min_order_value, max_uses, is_active)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    [id, code, discountType, discountValue, minOrderValue, maxUses]
  );

  logAuditAction(admin.id, admin.email, "coupon.created", "coupon", id, {
    code,
    discountType,
    discountValue,
  });

  revalidatePath("/admin/coupons");
}

export async function toggleCouponAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "orders.write");

  const couponId = formData.get("couponId") as string;
  const currentActive = parseInt(formData.get("currentActive") as string, 10);
  const nextActive = currentActive === 1 ? 0 : 1;

  execute("UPDATE coupons SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    nextActive,
    couponId,
  ]);

  logAuditAction(admin.id, admin.email, "coupon.status_changed", "coupon", couponId, {
    active: nextActive === 1,
  });

  revalidatePath("/admin/coupons");
}

export async function deleteCouponAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "orders.write");

  const couponId = formData.get("couponId") as string;

  execute("DELETE FROM coupons WHERE id = ?", [couponId]);

  logAuditAction(admin.id, admin.email, "coupon.deleted", "coupon", couponId, {});

  revalidatePath("/admin/coupons");
}
