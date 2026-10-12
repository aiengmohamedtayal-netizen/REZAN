"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { REZAN_WORDMARK } from "@/config/brand";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Warehouse,
  Users,
  TicketPercent,
  Gift,
  BookOpen,
  LayoutTemplate,
  Image as ImageIcon,
  Star,
  MessageSquare,
  BarChart3,
  ShieldAlert,
  Settings,
  X,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import type { AdminUser } from "@/server/auth/session";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  permission?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "الرئيسية",
    items: [
      { label: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "التجارة والمخزون",
    items: [
      { label: "الطلبات", href: "/admin/orders", icon: ShoppingBag, permission: "orders.read" },
      { label: "العطور والمنتجات", href: "/admin/products", icon: Package, permission: "products.read" },
      { label: "المجموعات", href: "/admin/collections", icon: Layers, permission: "products.read" },
      { label: "المستودع والمخزون", href: "/admin/inventory", icon: Warehouse, permission: "inventory.read" },
      { label: "العملاء", href: "/admin/customers", icon: Users, permission: "customers.read" },
      { label: "كوبونات الخصم", href: "/admin/coupons", icon: TicketPercent, permission: "orders.read" },
      { label: "أطقم الهدايا", href: "/admin/gifts", icon: Gift, permission: "products.read" },
    ],
  },
  {
    title: "المحتوى والواجهة",
    items: [
      { label: "الجورنال والمقالات", href: "/admin/journal", icon: BookOpen, permission: "content.read" },
      { label: "محتوى الواجهة", href: "/admin/content/home", icon: LayoutTemplate, permission: "content.read" },
      { label: "مكتبة الوسائط", href: "/admin/media", icon: ImageIcon, permission: "media.read" },
      { label: "التقييمات والآراء", href: "/admin/reviews", icon: Star, permission: "products.read" },
      { label: "رسائل التواصل", href: "/admin/messages", icon: MessageSquare, permission: "customers.read" },
    ],
  },
  {
    title: "المنظومة والرقابة",
    items: [
      { label: "التقارير والتحليلات", href: "/admin/analytics", icon: BarChart3, permission: "analytics.read" },
      { label: "فريق العمل والصلاحيات", href: "/admin/staff", icon: Users, permission: "staff.read" },
      { label: "سجل التدقيق الأمني", href: "/admin/audit-log", icon: ShieldAlert, permission: "audit.read" },
      { label: "إعدادات المتجر", href: "/admin/settings", icon: Settings, permission: "settings.read" },
    ],
  },
];

interface AdminSidebarProps {
  admin: AdminUser;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ admin, mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  function isItemActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  }

  const content = (
    <div className="flex flex-col h-full bg-[#111111] text-[#F7F3EA] border-e border-[#242424] select-none">
      {/* Brand Header */}
      <div className="h-18 px-5 flex items-center justify-between border-b border-[#242424] flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src={REZAN_WORDMARK}
            alt="REZAN"
            width={110}
            height={32}
            className="h-6 w-auto object-contain brightness-100"
          />
          <span className="text-[10px] bg-[#B89A62]/15 text-[#B89A62] border border-[#B89A62]/30 px-2 py-0.5 rounded-xs font-mono uppercase tracking-wider">
            ADMIN
          </span>
        </Link>
        <button
          onClick={onCloseMobile}
          className="lg:hidden text-[#888880] hover:text-white p-1.5"
          aria-label="إغلاق القائمة"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((section) => {
          const visibleItems = section.items.filter((item) => {
            if (!item.permission) return true;
            if (admin.roles.includes("owner") || admin.roles.includes("admin")) return true;
            return admin.permissions.includes(item.permission);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1">
              <p
                className="px-3 text-[10px] text-[#706E68] font-semibold tracking-wider uppercase mb-1.5"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                {section.title}
              </p>
              {visibleItems.map((item) => {
                const active = isItemActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-[13px] font-medium transition-all group ${
                      active
                        ? "bg-[#1C1C1C] text-[#B89A62] border-s-2 border-[#B89A62] shadow-xs"
                        : "text-[#C0BCB4] hover:bg-[#181818] hover:text-[#F7F3EA]"
                    }`}
                    style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={17}
                        className={active ? "text-[#B89A62]" : "text-[#77746E] group-hover:text-[#F7F3EA]"}
                      />
                      <span>{item.label}</span>
                    </div>
                    {active && <ChevronLeft size={14} className="text-[#B89A62]/60" />}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Store Shortcut */}
      <div className="p-3 border-t border-[#242424] flex-shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-xs bg-[#161616] hover:bg-[#1E1E1E] text-[12px] text-[#A09C94] hover:text-[#B89A62] transition-colors border border-[#242424]"
          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
        >
          <span className="flex items-center gap-2">
            <span>زيارة المتجر الحي</span>
          </span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed inset-y-0 start-0 z-40">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-right duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
