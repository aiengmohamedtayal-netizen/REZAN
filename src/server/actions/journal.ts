"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function createJournalPostAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "content.write");

  const titleAr = (formData.get("title_ar") as string)?.trim();
  const titleEn = (formData.get("title_en") as string)?.trim() || titleAr;
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const excerptAr = (formData.get("excerpt_ar") as string)?.trim();
  const contentAr = (formData.get("content_ar") as string)?.trim();
  const category = (formData.get("category") as string)?.trim() || "ثقافة العطور";
  const coverImage = (formData.get("cover_image") as string)?.trim() || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80";
  const readingTime = (formData.get("reading_time") as string)?.trim() || "٥ دقائق قراءة";
  const status = (formData.get("status") as string) || "published";

  if (!titleAr || !slug) return;

  const id = `art_${Math.random().toString(36).slice(2, 9)}`;

  execute(
    `INSERT INTO journal_posts 
     (id, slug, title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, cover_image, category, status, reading_time, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [id, slug, titleAr, titleEn, excerptAr, excerptAr, contentAr, contentAr, coverImage, category, status, readingTime]
  );

  logAuditAction(admin.id, admin.email, "journal.created", "journal_post", id, {
    titleAr,
    slug,
    status,
  });

  revalidatePath("/admin/journal");
  revalidatePath("/journal");
}

export async function updateJournalStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "content.write");

  const postId = formData.get("postId") as string;
  const nextStatus = formData.get("status") as string;

  execute("UPDATE journal_posts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    nextStatus,
    postId,
  ]);

  logAuditAction(admin.id, admin.email, "journal.status_changed", "journal_post", postId, {
    status: nextStatus,
  });

  revalidatePath("/admin/journal");
  revalidatePath("/journal");
}

export async function deleteJournalPostAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "content.write");

  const postId = formData.get("postId") as string;

  execute("DELETE FROM journal_posts WHERE id = ?", [postId]);

  logAuditAction(admin.id, admin.email, "journal.deleted", "journal_post", postId, {});

  revalidatePath("/admin/journal");
  revalidatePath("/journal");
}
