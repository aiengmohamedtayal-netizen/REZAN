"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import type { AdminUser } from "@/server/auth/session";

interface AdminShellProps {
  admin: AdminUser;
  children: React.ReactNode;
}

export function AdminShell({ admin, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F7F3EA] flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        admin={admin}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ps-64">
        <AdminTopBar admin={admin} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
