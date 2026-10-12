import { cookies } from "next/headers";
import { queryOne, queryAll, execute } from "../db";
import { generateSecureToken, hashToken } from "./crypto";

export const ADMIN_SESSION_COOKIE = "rezan_admin_session";
const SESSION_DURATION_DAYS = 7;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  status: "active" | "suspended" | "inactive";
  roles: string[];
  permissions: string[];
}

export async function createAdminSession(adminId: string, ip?: string, userAgent?: string): Promise<string> {
  const token = generateSecureToken(32);
  const tokenHash = await hashToken(token);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);
  const expiresAtIso = expiresAt.toISOString();

  execute(
    `INSERT INTO admin_sessions (id, admin_id, token_hash, expires_at, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [`sess_${Math.random().toString(36).slice(2, 9)}`, adminId, tokenHash, expiresAtIso, ip || null, userAgent || null]
  );

  execute("UPDATE admins SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?", [adminId]);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = await hashToken(token);
    execute("DELETE FROM admin_sessions WHERE token_hash = ?", [tokenHash]);
  }
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;

    const tokenHash = await hashToken(token);
    
    // Find active session
    const session = queryOne<{ admin_id: string; expires_at: string }>(
      `SELECT admin_id, expires_at FROM admin_sessions 
       WHERE token_hash = ? AND datetime(expires_at) > datetime('now')`,
      [tokenHash]
    );

    if (!session) {
      return null;
    }

    // Find admin
    const admin = queryOne<{
      id: string;
      email: string;
      name: string;
      avatar_url: string | null;
      status: string;
    }>(
      `SELECT id, email, name, avatar_url, status FROM admins WHERE id = ?`,
      [session.admin_id]
    );

    if (!admin || admin.status !== "active") {
      return null;
    }

    // Load roles
    const roles = queryAll<{ slug: string }>(
      `SELECT r.slug FROM roles r
       JOIN admin_role_assignments ara ON ara.role_id = r.id
       WHERE ara.admin_id = ?`,
      [admin.id]
    ).map((r) => r.slug);

    // Load permissions
    const permissions = queryAll<{ slug: string }>(
      `SELECT DISTINCT p.slug FROM permissions p
       JOIN role_permissions rp ON rp.permission_id = p.id
       JOIN admin_role_assignments ara ON ara.role_id = rp.role_id
       WHERE ara.admin_id = ?`,
      [admin.id]
    ).map((p) => p.slug);

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      avatarUrl: admin.avatar_url || undefined,
      status: admin.status as AdminUser["status"],
      roles,
      permissions,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("UNAUTHORIZED");
  }
  return admin;
}
