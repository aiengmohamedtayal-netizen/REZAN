"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function moderateReviewAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "products.write");

  const reviewId = formData.get("reviewId") as string;
  const status = formData.get("status") as string;

  if (!["approved", "rejected", "pending"].includes(status)) return;

  execute("UPDATE reviews SET status = ? WHERE id = ?", [status, reviewId]);

  logAuditAction(admin.id, admin.email, "review.moderated", "review", reviewId, {
    status,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/collection");
}

export async function deleteReviewAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "products.delete");

  const reviewId = formData.get("reviewId") as string;

  execute("DELETE FROM reviews WHERE id = ?", [reviewId]);

  logAuditAction(admin.id, admin.email, "review.deleted", "review", reviewId, {});

  revalidatePath("/admin/reviews");
  revalidatePath("/collection");
}
