import { Suspense } from "react";
import Link from "next/link";
import { queryAll } from "@/server/db";
import { updateMessageStatusAction } from "@/server/actions/messages";
import {
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Archive,
  Reply,
} from "lucide-react";

interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  admin_notes: string | null;
  created_at: string;
}

export default function AdminMessagesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            استفسارات ورسائل العملاء (Concierge Inbox)
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            متابعة طلبات التخصيص، استفسارات التوفر، وخدمة عملاء الدار
          </p>
        </div>
      </div>

      {/* Dynamic Streamed Content */}
      <Suspense fallback={<MessagesSkeleton />}>
        <MessagesContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function MessagesContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const statusFilter = (params.status as string) || "all";

  let sql = "SELECT * FROM contact_messages";
  const queryParams: unknown[] = [];

  if (statusFilter !== "all") {
    sql += " WHERE status = ?";
    queryParams.push(statusFilter);
  }

  sql += " ORDER BY created_at DESC";

  const messages = queryAll<MessageRow>(sql, queryParams);

  const allStatuses = queryAll<{ status: string }>("SELECT status FROM contact_messages");
  const totalCount = allStatuses.length;
  const unreadCount = allStatuses.filter((m) => m.status === "unread").length;
  const repliedCount = allStatuses.filter((m) => m.status === "replied").length;

  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الرسائل</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">رسائل غير مقروءة</p>
            <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">{unreadCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">تم الرد والمتابعة</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{repliedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-3 overflow-x-auto">
        <Link
          href="/admin/messages?status=all"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          الكل ({totalCount})
        </Link>
        <Link
          href="/admin/messages?status=unread"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "unread"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          غير مقروءة ({unreadCount})
        </Link>
        <Link
          href="/admin/messages?status=replied"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "replied"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          تم الرد ({repliedCount})
        </Link>
        <Link
          href="/admin/messages?status=archived"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "archived"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          المؤرشفة
        </Link>
      </div>

      {/* Messages Feed */}
      <div className="space-y-4">
        {messages.map((msg) => {
          const isUnread = msg.status === "unread";
          const isReplied = msg.status === "replied";

          return (
            <div
              key={msg.id}
              className={`bg-[#161616] border rounded-xs p-5 transition-colors space-y-4 ${
                isUnread ? "border-[#B89A62]/50 bg-[#1A1813]/40" : "border-[#242424]"
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#242424]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#F7F3EA] text-[15px]">{msg.name}</h3>
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-[#B89A62] animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-[#888880] mt-1 flex-wrap">
                    <span className="flex items-center gap-1 font-mono" dir="ltr">
                      <Mail size={12} />
                      {msg.email}
                    </span>
                    {msg.phone && (
                      <span className="flex items-center gap-1 font-mono" dir="ltr">
                        <Phone size={12} />
                        {msg.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#706E68] font-mono">{msg.created_at}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      isUnread
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : isReplied
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-[#242424] text-[#AAA]"
                    }`}
                  >
                    {isUnread ? "غير مقروءة" : isReplied ? "تم الرد" : "مقروءة"}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                {msg.subject && (
                  <h4 className="text-[13px] font-bold text-[#B89A62] mb-1.5">
                    الموضوع: {msg.subject}
                  </h4>
                )}
                <p className="text-[13px] text-[#D0CEC4] leading-relaxed whitespace-pre-line bg-[#111111] p-4 rounded-xs border border-[#242424]">
                  {msg.message}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={`mailto:${msg.email}?subject=رد من دار ريزان العطرية: ${encodeURIComponent(
                    msg.subject || "استفساركم"
                  )}`}
                  className="bg-[#B89A62] hover:bg-[#A38550] text-[#111111] px-3.5 py-1.5 rounded-xs text-[12px] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Reply size={14} />
                  الرد عبر البريد الإلكتروني
                </a>

                <div className="flex items-center gap-2">
                  {isUnread && (
                    <form action={updateMessageStatusAction}>
                      <input type="hidden" name="messageId" value={msg.id} />
                      <input type="hidden" name="status" value="read" />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xs bg-[#242424] text-[#AAA] hover:text-white hover:bg-[#2C2C2C] text-[12px] transition-colors cursor-pointer"
                      >
                        وضع علامة كمقروء
                      </button>
                    </form>
                  )}

                  {!isReplied && (
                    <form action={updateMessageStatusAction}>
                      <input type="hidden" name="messageId" value={msg.id} />
                      <input type="hidden" name="status" value="replied" />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[12px] transition-colors cursor-pointer"
                      >
                        تسجيل كرد منجز
                      </button>
                    </form>
                  )}

                  <form action={updateMessageStatusAction}>
                    <input type="hidden" name="messageId" value={msg.id} />
                    <input type="hidden" name="status" value="archived" />
                    <button
                      type="submit"
                      className="p-1.5 rounded-xs text-[#706E68] hover:text-[#D0CEC4] hover:bg-[#242424] transition-colors cursor-pointer"
                      title="أرشفة الرسالة"
                    >
                      <Archive size={15} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="bg-[#161616] border border-[#242424] p-12 text-center text-[#888880] rounded-xs">
            لا توجد استفسارات في صندوق الرسائل
          </div>
        )}
      </div>
    </>
  );
}

function MessagesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#161616] border border-[#242424] rounded-xs animate-pulse" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-[#161616] border border-[#242424] rounded-xs animate-pulse" />
        ))}
      </div>
    </div>
  );
}
