import { queryAll } from "@/server/db";
import {
  ShieldAlert,
  Activity,
} from "lucide-react";

interface AuditLogRow {
  id: string;
  admin_id: string | null;
  admin_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: string | null;
  ip_address: string | null;
  created_at: string;
}

export default async function AdminAuditLogPage() {
  const logs = queryAll<AuditLogRow>(
    "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100"
  );

  const totalLogs = logs.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            سجل التدقيق الأمني والعمليات (Audit Logs)
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            سجل تاريخي مشفر غير قابل للتعديل لكافة الإجراءات والتغييرات المنفذة في المنظومة
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الأحداث المسجلة مؤخراً</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalLogs}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Activity size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">حالة حماية المسار</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">100% Secure</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldAlert size={20} />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#242424] flex items-center justify-between">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            آخر ١٠٠ عملية تدقيق
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-[13px]">
            <thead className="bg-[#111111] text-[#706E68] text-[11px] uppercase border-b border-[#242424]">
              <tr>
                <th className="px-5 py-3 text-start">الوقت والتاريخ</th>
                <th className="px-5 py-3 text-start">المسؤول</th>
                <th className="px-5 py-3 text-start">الإجراء</th>
                <th className="px-5 py-3 text-start">الكيان والهدف</th>
                <th className="px-5 py-3 text-start">تفاصيل العملية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="px-5 py-4 text-[#888880] font-mono text-[11px] whitespace-nowrap">
                    {log.created_at}
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] text-[#D0CEC4] whitespace-nowrap" dir="ltr">
                    {log.admin_email || "System"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-[#111111] border border-[#2A2A2A] text-[#B89A62] px-2 py-0.5 rounded-xs font-mono text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[12px] text-[#888880] font-mono">
                    <span className="text-[#F7F3EA]">{log.entity_type}</span>
                    {log.entity_id && <span className="ms-1 text-[11px]">({log.entity_id})</span>}
                  </td>
                  <td className="px-5 py-4 max-w-xs truncate text-[11px] font-mono text-[#706E68]" dir="ltr">
                    {log.details || "—"}
                  </td>
                </tr>
              ))}

              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-[#888880]">
                    لا توجد عمليات مسجلة في سجل التدقيق حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
