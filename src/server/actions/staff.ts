"use server";

import { revalidatePath } from "next/cache";
import { queryOne, execute, transaction } from "@/server/db";
import { getCurrentAdmin } from "@/server/auth/session";
import { assertPermission } from "@/server/auth/rbac";
import { hashPassword } from "@/server/auth/crypto";
import { logAuditAction } from "@/server/audit";

export async function createStaffAdminAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "staff.write");

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const roleSlug = formData.get("role_slug") as string;

  if (!name || !email || !password || password.length < 8) return;

  const existing = queryOne("SELECT id FROM admins WHERE email = ?", [email]);
  if (existing) return;

  const role = queryOne<{ id: string }>("SELECT id FROM roles WHERE slug = ?", [roleSlug]);
  if (!role) return;

  const adminId = `admin_${Math.random().toString(36).slice(2, 9)}`;
  const passwordHash = await hashPassword(password);

  transaction(() => {
    execute(
      `INSERT INTO admins (id, email, password_hash, name, status)
       VALUES (?, ?, ?, ?, 'active')`,
      [adminId, email, passwordHash, name]
    );

    execute(
      `INSERT INTO admin_role_assignments (admin_id, role_id)
       VALUES (?, ?)`,
      [adminId, role.id]
    );
  });

  logAuditAction(admin.id, admin.email, "staff.created", "admin", adminId, {
    email,
    name,
    roleSlug,
  });

  revalidatePath("/admin/staff");
}

export async function toggleStaffStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) return;

  assertPermission(admin, "staff.write");

  const targetAdminId = formData.get("adminId") as string;
  const currentStatus = formData.get("currentStatus") as string;

  // Protect root admin from suspension
  if (targetAdminId === admin.id) return;

  const nextStatus = currentStatus === "active" ? "suspended" : "active";

  execute("UPDATE admins SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    nextStatus,
    targetAdminId,
  ]);

  logAuditAction(admin.id, admin.email, "staff.status_changed", "admin", targetAdminId, {
    status: nextStatus,
  });

  revalidatePath("/admin/staff");
}
