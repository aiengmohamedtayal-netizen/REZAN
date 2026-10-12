import { execute, queryAll } from "../db";

export interface AuditLogEntry {
  id?: string;
  adminId?: string;
  adminEmail?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

export function logAuditAction(
  entryOrAdminId: AuditLogEntry | string | undefined | null,
  adminEmail?: string | null,
  action?: string,
  entityType?: string,
  entityId?: string | null,
  details?: Record<string, unknown>
): void {
  try {
    let entry: AuditLogEntry;
    if (typeof entryOrAdminId === "object" && entryOrAdminId !== null) {
      entry = entryOrAdminId;
    } else {
      entry = {
        adminId: entryOrAdminId || undefined,
        adminEmail: adminEmail || undefined,
        action: action || "unknown",
        entityType: entityType || "unknown",
        entityId: entityId || undefined,
        details,
      };
    }

    const id = `aud_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
    execute(
      `INSERT INTO audit_logs (id, admin_id, admin_email, action, entity_type, entity_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        entry.adminId || null,
        entry.adminEmail || null,
        entry.action,
        entry.entityType,
        entry.entityId || null,
        entry.details ? JSON.stringify(entry.details) : null,
        entry.ipAddress || null,
      ]
    );
  } catch (err) {
    // Non-blocking fallback to console
    console.error("Audit log failed to record:", err);
  }
}

export function getAuditLogs(limit = 100, offset = 0) {
  return queryAll<{
    id: string;
    admin_id: string | null;
    admin_email: string | null;
    action: string;
    entity_type: string;
    entity_id: string | null;
    details: string | null;
    ip_address: string | null;
    created_at: string;
  }>(
    `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [limit, offset]
  );
}
