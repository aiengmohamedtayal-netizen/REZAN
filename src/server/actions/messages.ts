"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { logAuditAction } from "@/server/audit";

export async function updateMessageStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "customers.write");

  const messageId = formData.get("messageId") as string;
  const status = formData.get("status") as string;

  if (!["unread", "read", "replied", "archived"].includes(status)) return;

  execute("UPDATE contact_messages SET status = ? WHERE id = ?", [status, messageId]);

  logAuditAction(admin.id, admin.email, "message.status_changed", "contact_message", messageId, {
    status,
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function updateMessageNotesAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "customers.write");

  const messageId = formData.get("messageId") as string;
  const adminNotes = (formData.get("adminNotes") as string)?.trim() || null;

  execute("UPDATE contact_messages SET admin_notes = ? WHERE id = ?", [adminNotes, messageId]);

  logAuditAction(admin.id, admin.email, "message.notes_updated", "contact_message", messageId, {
    adminNotes,
  });

  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "customers.write");

  const messageId = formData.get("messageId") as string;
  if (!messageId) return;

  execute("DELETE FROM contact_messages WHERE id = ?", [messageId]);

  logAuditAction(admin.id, admin.email, "message.deleted", "contact_message", messageId, {});

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
