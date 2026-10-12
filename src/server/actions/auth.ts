"use server";

import { redirect } from "next/navigation";
import { queryOne } from "@/server/db";
import { verifyPassword } from "@/server/auth/crypto";
import { createAdminSession, destroyAdminSession } from "@/server/auth/session";
import { logAuditAction } from "@/server/audit";

export interface LoginActionResult {
  success: boolean;
  error?: string;
}

export async function loginAdminAction(formData: FormData): Promise<LoginActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "يرجى إدخال البريد الإلكتروني وكلمة المرور" };
  }

  const admin = queryOne<{
    id: string;
    email: string;
    password_hash: string;
    name: string;
    status: string;
  }>("SELECT id, email, password_hash, name, status FROM admins WHERE email = ?", [email]);

  if (!admin) {
    return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }

  if (admin.status !== "active") {
    return { success: false, error: "هذا الحساب معطل حالياً. يرجى مراجعة مدير النظام" };
  }

  const isValid = await verifyPassword(password, admin.password_hash);
  if (!isValid) {
    logAuditAction({
      adminId: admin.id,
      adminEmail: email,
      action: "auth.login_failed",
      entityType: "admin",
      entityId: admin.id,
      details: { reason: "invalid_password" },
    });
    return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }

  // Create session
  await createAdminSession(admin.id);

  logAuditAction({
    adminId: admin.id,
    adminEmail: email,
    action: "auth.login_success",
    entityType: "admin",
    entityId: admin.id,
    details: { name: admin.name },
  });

  return { success: true };
}

export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}
