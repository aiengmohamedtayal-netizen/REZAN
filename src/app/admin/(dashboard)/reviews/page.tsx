import { Suspense } from "react";
import Link from "next/link";
import { queryAll } from "@/server/db";
import { moderateReviewAction, deleteReviewAction } from "@/server/actions/reviews";
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock,
  ShieldCheck,
  Package,
} from "lucide-react";

interface ReviewRow {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string | null;
  rating: number;
  comment_ar: string;
  comment_en: string | null;
  is_verified: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  product_name_ar: string | null;
}

export default function AdminReviewsPage(props: {
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
            إدارة ومراجعة تقييمات العملاء
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            التحقق من آراء وتجارب مقتني عطور ريزان، اعتماد التقييمات، وإدارتها
          </p>
        </div>
      </div>

      {/* Dynamic Streamed Content */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function ReviewsContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const statusFilter = (params.status as string) || "all";

  let sql = `
    SELECT 
      r.*, p.name_ar as product_name_ar
    FROM reviews r
    LEFT JOIN products p ON p.id = r.product_id
  `;

  const queryParams: unknown[] = [];
  if (statusFilter !== "all") {
    sql += " WHERE r.status = ?";
    queryParams.push(statusFilter);
  }

  sql += " ORDER BY r.created_at DESC";

  const reviews = queryAll<ReviewRow>(sql, queryParams);

  const allReviews = queryAll<{ status: string; rating: number }>(
    "SELECT status, rating FROM reviews"
  );
  const totalCount = allReviews.length;
  const pendingCount = allReviews.filter((r) => r.status === "pending").length;
  const approvedCount = allReviews.filter((r) => r.status === "approved").length;
  const avgRating =
    totalCount > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
      : "5.0";

  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي التقييمات</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Star size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">متوسط التقييم العام</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-[#B89A62] font-mono">{avgRating}</span>
              <span className="text-xs text-[#888880]">من 5.0</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <Star size={20} className="fill-[#B89A62]" />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">بانتظار المراجعة</p>
            <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-3 overflow-x-auto">
        <Link
          href="/admin/reviews?status=all"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          الكل ({totalCount})
        </Link>
        <Link
          href="/admin/reviews?status=approved"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "approved"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          المعتمدة ({approvedCount})
        </Link>
        <Link
          href="/admin/reviews?status=pending"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "pending"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          بانتظار المراجعة ({pendingCount})
        </Link>
        <Link
          href="/admin/reviews?status=rejected"
          className={`px-4 py-2 rounded-xs text-[13px] font-medium transition-colors ${
            statusFilter === "rejected"
              ? "bg-[#B89A62] text-[#111111]"
              : "text-[#888880] hover:text-[#F7F3EA] hover:bg-[#1E1E1E]"
          }`}
        >
          المرفوضة
        </Link>
      </div>

      {/* Reviews Table */}
      <div className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
        <div className="divide-y divide-[#242424]">
          {reviews.map((rev) => {
            const isApproved = rev.status === "approved";
            const isRejected = rev.status === "rejected";

            return (
              <div
                key={rev.id}
                className="p-5 flex flex-col md:flex-row gap-4 items-start justify-between hover:bg-[#1A1A1A]/40 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-[#F7F3EA] text-[14px]">
                      {rev.customer_name}
                    </span>
                    {rev.is_verified === 1 && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <ShieldCheck size={12} />
                        مشتري موثق
                      </span>
                    )}
                    <span className="text-[12px] text-[#706E68]">
                      {rev.created_at}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={
                          s <= rev.rating
                            ? "text-[#B89A62] fill-[#B89A62]"
                            : "text-[#444]"
                        }
                      />
                    ))}
                    <span className="text-[12px] font-mono text-[#B89A62] ms-2">
                      ({rev.rating}.0)
                    </span>
                  </div>

                  {/* Product link */}
                  {rev.product_name_ar && (
                    <p className="text-[12px] text-[#888880] flex items-center gap-1.5">
                      <Package size={13} className="text-[#B89A62]" />
                      عطر: <span className="text-[#D0CEC4]">{rev.product_name_ar}</span>
                    </p>
                  )}

                  {/* Comment */}
                  <p className="text-[13px] text-[#E0DED6] leading-relaxed pt-1">
                    &ldquo;{rev.comment_ar}&rdquo;
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#242424] w-full md:w-auto justify-end">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      isApproved
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : isRejected
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {isApproved ? "معتمد" : isRejected ? "مرفوض" : "قيد المراجعة"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {!isApproved && (
                      <form action={moderateReviewAction}>
                        <input type="hidden" name="reviewId" value={rev.id} />
                        <input type="hidden" name="status" value="approved" />
                        <button
                          type="submit"
                          className="px-2.5 py-1 rounded-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 size={13} />
                          اعتماد
                        </button>
                      </form>
                    )}

                    {!isRejected && (
                      <form action={moderateReviewAction}>
                        <input type="hidden" name="reviewId" value={rev.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <button
                          type="submit"
                          className="px-2.5 py-1 rounded-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <XCircle size={13} />
                          رفض
                        </button>
                      </form>
                    )}

                    <form action={deleteReviewAction}>
                      <input type="hidden" name="reviewId" value={rev.id} />
                      <button
                        type="submit"
                        className="p-1.5 rounded-xs text-[#888880] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="حذف التقييم نهائياً"
                      >
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}

          {reviews.length === 0 && (
            <div className="p-12 text-center text-[#888880]">
              لا توجد تقييمات مطابقة لهذا الفلتر
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#161616] border border-[#242424] rounded-xs animate-pulse" />
        ))}
      </div>
      <div className="bg-[#161616] border border-[#242424] rounded-xs p-6 animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-[#1A1A1A] rounded-xs" />
        ))}
      </div>
    </div>
  );
}
