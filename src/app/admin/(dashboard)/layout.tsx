import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/server/auth/session";
import { AdminShell } from "@/components/admin/AdminShell";

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminShell admin={admin}>{children}</AdminShell>;
}
