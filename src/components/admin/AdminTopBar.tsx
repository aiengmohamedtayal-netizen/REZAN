"use client";

import { useState } from "react";
import { Menu, LogOut, ShieldCheck, ChevronDown, Bell, Search } from "lucide-react";
import type { AdminUser } from "@/server/auth/session";
import { logoutAdminAction } from "@/server/actions/auth";

interface AdminTopBarProps {
  admin: AdminUser;
  onOpenMobile: () => void;
}

export function AdminTopBar({ admin, onOpenMobile }: AdminTopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const roleLabel = admin.roles.includes("owner")
    ? "المالك (Owner)"
    : admin.roles.includes("admin")
    ? "مدير عام"
    : admin.roles[0] || "موظف";

  return (
    <header className="h-16 bg-[#161616] border-b border-[#242424] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Start: mobile hamburger + status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden text-[#C8C4BC] hover:text-white p-2 -ms-2 rounded-xs hover:bg-[#202020]"
          aria-label="فتح القائمة"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[12px] text-[#888880]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            المنظومة متصلة — قاعدة البيانات D1/SQLite نشطة
          </span>
        </div>
      </div>

      {/* End: search + notifications + admin profile dropdown */}
      <div className="flex items-center gap-3">
        {/* Quick Search trigger */}
        <div className="hidden md:flex items-center gap-2 bg-[#101010] border border-[#2A2A2A] rounded-xs px-3 py-1.5 text-[12px] text-[#706E68] w-48 lg:w-64">
          <Search size={14} />
          <span style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>بحث سريع...</span>
          <kbd className="ms-auto text-[10px] bg-[#1E1E1E] px-1.5 py-0.5 rounded-xs border border-[#333] font-mono text-[#888]">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button
          className="relative text-[#A09C94] hover:text-[#F7F3EA] p-2 rounded-xs hover:bg-[#202020] transition-colors"
          aria-label="التنبيهات"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-[#B89A62] rounded-full" />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2.5 p-1.5 pe-2.5 rounded-xs hover:bg-[#202020] transition-colors border border-transparent hover:border-[#2A2A2A]"
            aria-expanded={profileOpen}
          >
            <div className="w-8 h-8 rounded-full bg-[#B89A62]/20 border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62] text-[12px] font-bold">
              {admin.name[0] || "A"}
            </div>
            <div className="hidden sm:flex flex-col text-start">
              <span className="text-[13px] text-[#F7F3EA] font-medium leading-tight" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                {admin.name}
              </span>
              <span className="text-[10px] text-[#B89A62] leading-tight flex items-center gap-1">
                <ShieldCheck size={10} />
                <span>{roleLabel}</span>
              </span>
            </div>
            <ChevronDown size={14} className={`text-[#888] transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div
              className="absolute end-0 top-full mt-2 w-56 bg-[#1A1A1A] border border-[#2E2E2E] shadow-xl rounded-xs py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
              role="menu"
            >
              <div className="px-4 py-2 border-b border-[#2A2A2A]">
                <p className="text-[13px] text-white font-medium truncate" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  {admin.name}
                </p>
                <p className="text-[11px] text-[#888880] truncate font-en" dir="ltr">
                  {admin.email}
                </p>
              </div>

              <div className="py-1">
                <form action={logoutAdminAction}>
                  <button
                    type="submit"
                    className="w-full text-start flex items-center gap-2.5 px-4 py-2 text-[13px] text-red-400 hover:bg-[#242424] transition-colors"
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    <LogOut size={15} />
                    <span>تسجيل الخروج</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
