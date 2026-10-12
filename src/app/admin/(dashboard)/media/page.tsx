import Image from "next/image";
import { queryAll } from "@/server/db";
import { MediaCopyButton } from "@/components/admin/MediaCopyButton";
import { addMediaAssetAction, deleteMediaAssetAction } from "@/server/actions/media";
import {
  Image as ImageIcon,
  HardDrive,
  Plus,
  Trash2,
  Info,
  Save,
} from "lucide-react";

interface MediaRow {
  id: string;
  filename: string;
  url: string;
  file_size: number;
  mime_type: string;
  dimensions: string | null;
  alt_text: string | null;
  created_at: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminMediaPage() {
  const assets = queryAll<MediaRow>(
    "SELECT * FROM media_assets ORDER BY created_at DESC"
  );

  const totalFiles = assets.length;
  const totalSizeBytes = assets.reduce((sum, a) => sum + a.file_size, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#B89A62] font-medium tracking-widest uppercase font-en">
              DIGITAL ASSET MANAGEMENT
            </span>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] font-semibold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            مكتبة الوسائط والأصول البصرية (Media Library)
          </h1>
          <p className="text-[13px] text-[#888880] mt-1" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            المستودع المركزي لصور زجاجات العطور، الحملات التحريرية، والبانرات البصرية لدار ريزان
          </p>
        </div>
      </div>

      {/* Explanatory Luxury Concept Banner */}
      <div className="bg-[#141414] border border-[#B89A62]/30 p-5 rounded-xs space-y-3">
        <div className="flex items-center gap-2 text-[#B89A62]">
          <Info size={18} />
          <h2 className="text-[15px] font-bold" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            ما هي مكتبة الوسائط في منظومة ريزان الفاخرة؟
          </h2>
        </div>
        <p className="text-[13px] text-[#C8C4BC] leading-relaxed" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
          مكتبة الوسائط هي <strong>المستودع السحابي الموحد (Single Source of Truth)</strong> لكافة الصور عالية الدقة (4K Product Shots)،
          صور المكونات الطبيعية (العود، الورد، العنبر، الصندل)، وبانرات مجلة الدار (Journal) وباقات الهدايا.
          تضمن المكتبة عدم تكرار رفع الملفات واستهلاك مساحات التخزين، وحماية الروابط من الانكسار، مع إمكانية نسخ رابط أي أصل فوتوغرافي بنقرة واحدة لربطه الفوري في كتالوج العطور.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الملفات المفهرسة</p>
            <p className="text-2xl font-bold text-[#F7F3EA] mt-1 font-mono">{totalFiles}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <ImageIcon size={20} />
          </div>
        </div>

        <div className="bg-[#161616] border border-[#242424] p-5 rounded-xs flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#888880]">إجمالي الحجم التخزيني للأصول</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">{formatBytes(totalSizeBytes)}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <HardDrive size={20} />
          </div>
        </div>
      </div>

      {/* Add New Media Asset Drawer */}
      <details className="bg-[#141414] border border-[#2E2E2E] rounded-xs group overflow-hidden">
        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#1A1A1A] transition-colors select-none">
          <div className="flex items-center gap-2 text-[#F7F3EA] font-semibold text-[14px]" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
            <Plus size={16} className="text-[#B89A62]" />
            <span>تسجيل وفهرسة أصل بصري جديد (Register New Media Asset)</span>
          </div>
          <span className="text-[12px] text-[#B89A62] group-open:hidden">+ إظهار النموذج</span>
          <span className="text-[12px] text-[#888880] hidden group-open:inline">− إخفاء</span>
        </summary>
        <div className="p-5 border-t border-[#242424] bg-[#161616]">
          <form action={addMediaAssetAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  اسم الملف (Filename) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="filename"
                  placeholder="e.g. rezan-oud-al-noor-bottle-100ml.jpg"
                  required
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  رابط الصورة السحابي (Cloud URL) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  الأبعاد (Dimensions)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  placeholder="1200x1200"
                  defaultValue="1200x1200"
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  نوع الملف (MIME Type)
                </label>
                <select
                  name="mimeType"
                  defaultValue="image/jpeg"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                >
                  <option value="image/jpeg">JPEG / JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WEBP</option>
                  <option value="image/avif">AVIF</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-[#A09C94] mb-1.5" style={{ fontFamily: "var(--font-tajarib), sans-serif" }}>
                  النص البديل (Alt Text)
                </label>
                <input
                  type="text"
                  name="altText"
                  placeholder="صورة زجاجة عطر ريزان عود النور"
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#B89A62] text-[#F7F3EA] text-[13px] px-3 py-2 rounded-xs outline-none"
                  style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#B89A62] hover:bg-[#CDB48A] text-[#111111] font-semibold text-[13px] px-5 py-2.5 rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
            >
              <Save size={15} />
              <span>فهرسة الأصل البصري وحفظه</span>
            </button>
          </form>
        </div>
      </details>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#161616] border border-[#242424] rounded-xs overflow-hidden flex flex-col group hover:border-[#B89A62]/40 transition-colors"
          >
            <div className="relative aspect-square bg-[#111111] overflow-hidden">
              <Image
                src={asset.url}
                alt={asset.alt_text || asset.filename}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 start-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-xs text-[10px] text-[#AAA] font-mono">
                {asset.dimensions || "Original"}
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <p className="text-[12px] font-mono font-medium text-[#F7F3EA] truncate" title={asset.filename} dir="ltr">
                  {asset.filename}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#706E68] mt-1 font-mono">
                  <span>{formatBytes(asset.file_size)}</span>
                  <span>{asset.mime_type.split("/")[1]?.toUpperCase()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#242424] flex items-center justify-between gap-2">
                <MediaCopyButton url={asset.url} />

                <form action={deleteMediaAssetAction}>
                  <input type="hidden" name="mediaId" value={asset.id} />
                  <button
                    type="submit"
                    className="text-[#706E68] hover:text-red-400 p-1.5 rounded-xs hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="حذف الأصل من المكتبة"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
