"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
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
}
