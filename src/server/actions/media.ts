"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function addMediaAssetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  assertPermission(admin, "media.write");

  const filename = (formData.get("filename") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();
  const altText = (formData.get("altText") as string)?.trim() || null;
  const dimensions = (formData.get("dimensions") as string)?.trim() || "1200x1200";
  const mimeType = (formData.get("mimeType") as string)?.trim() || "image/jpeg";
  const fileSize = parseInt(formData.get("fileSize") as string || "1500000", 10);

  if (!filename || !url) {
    throw new Error("Missing required media parameters");
  }

  const id = `med_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  execute(
    `INSERT INTO media_assets (id, filename, url, file_size, mime_type, dimensions, alt_text, uploaded_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, filename, url, fileSize, mimeType, dimensions, altText, admin.id]
  );

  logAuditAction(admin.id, admin.email, "media.upload", "media_asset", id, {
    filename,
    url,
  });

  revalidatePath("/admin/media");
}

export async function deleteMediaAssetAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");

  assertPermission(admin, "media.write");

  const id = formData.get("mediaId") as string;
  if (!id) throw new Error("Missing media asset ID");

  execute("DELETE FROM media_assets WHERE id = ?", [id]);

  logAuditAction(admin.id, admin.email, "media.delete", "media_asset", id, {});

  revalidatePath("/admin/media");
}
