import { queryAll } from "@/server/db";
import {
  createStaffAdminAction,
  toggleStaffStatusAction,
} from "@/server/actions/staff";
import {
  UserPlus,
  Shield,
  ShieldCheck,
} from "lucide-react";

interface AdminStaffRow {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "inactive";
  created_at: string;
  last_login_at: string | null;
  role_name: string;
  role_slug: string;
}

interface RoleRow {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default async function AdminStaffPage() {
  const staff = queryAll<AdminStaffRow>(`
    SELECT 
      a.id, a.name, a.email, a.status, a.created_at, a.last_login_at,
      COALESCE(r.name, 'غير محدد') as role_name,
      COALESCE(r.slug, 'none') as role_slug
    FROM admins a
    LEFT JOIN admin_role_assignments ara ON ara.admin_id = a.id
    LEFT JOIN roles r ON r.id = ara.role_id
    ORDER BY a.created_at ASC
  `);

  const roles = queryAll<RoleRow>("SELECT * FROM roles ORDER BY is_system DESC");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            فريق العمل والأدوار الوظيفية (Staff & RBAC)
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة حسابات مسؤولي المتجر، توزيع الصلاحيات، وضبط مستويات الوصول للمنظومة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Staff Member Form */}
        <div className="lg:col-span-1 bg-[#161616] border border-[#242424] p-5 rounded-xs h-fit space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <UserPlus size={16} className="text-[#B89A62]" />
            إضافة عضو جديد للفريق
          </h2>

          <form action={createStaffAdminAction} className="space-y-4">
            <div>
              <label className="block text-[12px] text-[#888880] mb-1">الاسم الكامل</label>
              <input
                type="text"
                name="name"
                required
                placeholder="مثال: ياسمين الشريف"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">البريد الإلكتروني المهني</label>
              <input
                type="email"
                name="email"
                required
                placeholder="yasmin@rezan.com"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">كلمة المرور المؤقتة</label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="••••••••••••"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] font-mono focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">الدور الوظيفي والصلاحيات</label>
              <select
                name="role_slug"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold py-2.5 rounded-xs text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <ShieldCheck size={16} />
              إنشاء الحساب وتعيين الدور
            </button>
          </form>
        </div>

        {/* Staff Table */}
        <div className="lg:col-span-2 bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-[#242424] flex items-center justify-between">
            <h2
              className="text-[15px] font-semibold text-[#F7F3EA]"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              حسابات الإدارة النشطة ({staff.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-[13px]">
              <thead className="bg-[#111111] text-[#706E68] text-[11px] uppercase border-b border-[#242424]">
                <tr>
                  <th className="px-5 py-3 text-start">الموظف</th>
                  <th className="px-5 py-3 text-start">الدور الوظيفي</th>
                  <th className="px-5 py-3 text-start">الحالة</th>
                  <th className="px-5 py-3 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242424]">
                {staff.map((member) => {
                  const isActive = member.status === "active";
                  const isOwner = member.role_slug === "owner";

                  return (
                    <tr key={member.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#B89A62]/20 text-[#B89A62] flex items-center justify-center font-bold text-xs">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-[#F7F3EA] block">
                              {member.name}
                            </span>
                            <span className="text-[11px] text-[#706E68] font-mono" dir="ltr">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-[#111111] border border-[#2A2A2A] text-[#B89A62] px-2.5 py-1 rounded-xs text-[11px] font-medium inline-flex items-center gap-1.5">
                          <Shield size={12} />
                          {member.role_name}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {isActive ? "نشط" : "معلق"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-end">
                        {!isOwner && (
                          <form action={toggleStaffStatusAction}>
                            <input type="hidden" name="adminId" value={member.id} />
                            <input type="hidden" name="currentStatus" value={member.status} />
                            <button
                              type="submit"
                              className={`text-[12px] px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                                isActive
                                  ? "bg-[#242424] text-[#AAA] hover:bg-red-500/10 hover:text-red-400"
                                  : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              }`}
                            >
                              {isActive ? "تعليق الحساب" : "تنشيط"}
                            </button>
                          </form>
                        )}
                        {isOwner && (
                          <span className="text-[11px] text-[#706E68]">محمي (مالك)</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
