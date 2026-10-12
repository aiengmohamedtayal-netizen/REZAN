import Image from "next/image";
import Link from "next/link";
import { queryAll } from "@/server/db";
import {
  createJournalPostAction,
  updateJournalStatusAction,
  deleteJournalPostAction,
} from "@/server/actions/journal";
import {
  BookOpen,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  FileEdit,
  Eye,
} from "lucide-react";

interface JournalRow {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string | null;
  category: string;
  status: "published" | "draft" | "archived";
  reading_time: string | null;
  cover_image: string | null;
  published_at: string;
}

export default async function AdminJournalPage() {
  const posts = queryAll<JournalRow>(
    "SELECT * FROM journal_posts ORDER BY published_at DESC, created_at DESC"
  );

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            إدارة الجورنال والمقالات التحريرية
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            صياغة ونشر مقالات الدار، ثقافة العطور، وأسرار التعتيق الحرفي
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي المقالات</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalPosts}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <BookOpen size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">المقالات المنشورة</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{publishedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">المسودات قيد الإعداد</p>
            <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">{draftCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <FileEdit size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Post Form */}
        <div className="lg:col-span-1 bg-[#161616] border border-[#242424] p-5 rounded-xs h-fit space-y-4">
          <h2
            className="text-[15px] font-semibold text-[#F7F3EA] flex items-center gap-2"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            <Plus size={16} className="text-[#B89A62]" />
            كتابة ونشر مقال جديد
          </h2>

          <form action={createJournalPostAction} className="space-y-4">
            <div>
              <label className="block text-[12px] text-[#888880] mb-1">عنوان المقال (بالعربية)</label>
              <input
                type="text"
                name="title_ar"
                required
                placeholder="مثال: رحلة العود الكمبودي من الغابة إلى القارورة"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">الرابط اللطيف (Slug)</label>
              <input
                type="text"
                name="slug"
                required
                placeholder="cambodian-oud-heritage"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] font-mono focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] text-[#888880] mb-1">التصنيف</label>
                <input
                  type="text"
                  name="category"
                  defaultValue="ثقافة العطور"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#888880] mb-1">وقت القراءة</label>
                <input
                  type="text"
                  name="reading_time"
                  defaultValue="٥ دقائق قراءة"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">المقتطف الموجز</label>
              <textarea
                name="excerpt_ar"
                rows={2}
                placeholder="نبذة ترويجية تظهر في بطاقة المقال..."
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">المحتوى التحريري الكامل</label>
              <textarea
                name="content_ar"
                rows={5}
                required
                placeholder="نص المقال الكامل..."
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">رابط صورة الغلاف</label>
              <input
                type="url"
                name="cover_image"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] placeholder-[#555] font-mono focus:outline-none focus:border-[#B89A62]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-[12px] text-[#888880] mb-1">حالة النشر</label>
              <select
                name="status"
                className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xs px-3 py-2 text-[13px] text-[#F7F3EA] focus:outline-none focus:border-[#B89A62]"
              >
                <option value="published">نشر فوري</option>
                <option value="draft">حفظ كمسودة</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B89A62] hover:bg-[#A38550] text-[#111111] font-semibold py-2.5 rounded-xs text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <BookOpen size={16} />
              حفظ المقال
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-[#242424] flex items-center justify-between">
              <h2
                className="text-[15px] font-semibold text-[#F7F3EA]"
                style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
              >
                المقالات المحررة ({posts.length})
              </h2>
            </div>

            <div className="divide-y divide-[#242424]">
              {posts.map((post) => {
                const isPublished = post.status === "published";

                return (
                  <div
                    key={post.id}
                    className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-[#1A1A1A]/40 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      {post.cover_image && (
                        <div className="relative w-18 h-18 rounded-xs overflow-hidden bg-[#111] flex-shrink-0 border border-[#242424]">
                          <Image
                            src={post.cover_image}
                            alt={post.title_ar}
                            fill
                            sizes="72px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] bg-[#B89A62]/10 text-[#B89A62] px-2 py-0.5 rounded-xs">
                            {post.category}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              isPublished
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {isPublished ? "منشور" : "مسودة"}
                          </span>
                        </div>
                        <h3
                          className="text-[14px] font-bold text-[#F7F3EA] leading-snug"
                          style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                        >
                          {post.title_ar}
                        </h3>
                        <p className="text-[12px] text-[#888880] flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.reading_time || "٥ دقائق"}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-[11px]">{post.slug}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-[#242424]">
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-xs text-[#888880] hover:text-[#B89A62] hover:bg-[#242424] transition-colors"
                        title="معاينة في المتجر"
                      >
                        <Eye size={16} />
                      </Link>

                      <form action={updateJournalStatusAction}>
                        <input type="hidden" name="postId" value={post.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={isPublished ? "draft" : "published"}
                        />
                        <button
                          type="submit"
                          className={`text-[12px] px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                            isPublished
                              ? "bg-[#242424] text-[#AAA] hover:bg-amber-500/10 hover:text-amber-400"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {isPublished ? "تحويل لمسودة" : "نشر الآن"}
                        </button>
                      </form>

                      <form action={deleteJournalPostAction}>
                        <input type="hidden" name="postId" value={post.id} />
                        <button
                          type="submit"
                          className="p-2 rounded-xs text-[#888880] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="حذف المقال"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}

              {posts.length === 0 && (
                <div className="p-10 text-center text-[#888880]">
                  لا توجد مقالات مسجلة حتى الآن
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
