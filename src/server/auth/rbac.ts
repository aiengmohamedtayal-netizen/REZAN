import type { AdminUser } from "./session";

export type PermissionSlug =
  | "products.read"
  | "products.write"
  | "products.delete"
  | "orders.read"
  | "orders.write"
  | "orders.refund"
  | "inventory.read"
  | "inventory.write"
  | "customers.read"
  | "customers.write"
  | "content.read"
  | "content.write"
  | "media.read"
  | "media.write"
  | "analytics.read"
  | "staff.read"
  | "staff.write"
  | "settings.read"
  | "settings.write"
  | "audit.read";

export function hasPermission(admin: AdminUser | null, permission: PermissionSlug): boolean {
  if (!admin) return false;
  // Owners and Super Admins bypass checks
  if (admin.roles.includes("owner") || admin.roles.includes("admin")) {
    return true;
  }
  return admin.permissions.includes(permission);
}

export function assertPermission(admin: AdminUser | null, permission: PermissionSlug): void {
  if (!hasPermission(admin, permission)) {
    throw new Error(`FORBIDDEN: Permission ${permission} required`);
  }
}

export function hasRole(admin: AdminUser | null, roleSlug: string): boolean {
  if (!admin) return false;
  return admin.roles.includes(roleSlug);
}
