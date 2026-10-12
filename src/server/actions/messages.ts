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
  const adminNotes = (formData.get("adminNotes") as string) || null;

  if (!["unread", "read", "replied", "archived"].includes(status)) return;

  execute("UPDATE contact_messages SET status = ?, admin_notes = ? WHERE id = ?", [
    status,
    adminNotes,
    messageId,
  ]);

  logAuditAction(admin.id, admin.email, "message.status_changed", "contact_message", messageId, {
    status,
  });

  revalidatePath("/admin/messages");
}
