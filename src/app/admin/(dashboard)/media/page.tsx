import Image from "next/image";
import { queryAll } from "@/server/db";
import { MediaCopyButton } from "@/components/admin/MediaCopyButton";
import {
  Image as ImageIcon,
  HardDrive,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F7F3EA]"
            style={{ fontFamily: "var(--font-tajarib), sans-serif" }}
          >
            مكتبة الوسائط والصور
          </h1>
          <p className="text-[13px] text-[#888880] mt-1">
            إدارة الصور الفوتوغرافية، الأصول البصرية، والروابط السحابية لدار ريزان
          </p>
        </div>
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
            <p className="text-[12px] text-[#888880]">إجمالي الحجم التخزيني</p>
            <p className="text-2xl font-bold text-[#B89A62] mt-1 font-mono">{formatBytes(totalSizeBytes)}</p>
          </div>
          <div className="w-10 h-10 rounded-xs bg-[#B89A62]/10 text-[#B89A62] flex items-center justify-center border border-[#B89A62]/20">
            <HardDrive size={20} />
          </div>
        </div>
      </div>

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
                  <span>{asset.mime_type.split("/")[1]?.toUpperCase() || "WEBP"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#242424] flex items-center justify-between">
                <MediaCopyButton url={asset.url} />
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#888880] hover:text-[#B89A62] transition-colors"
                >
                  فتح الأصل ↗
                </a>
              </div>
            </div>
          </div>
        ))}

        {assets.length === 0 && (
          <div className="col-span-full p-12 text-center text-[#888880] bg-[#161616] border border-[#242424] rounded-xs">
            لا توجد ملفات وسائط مفهرسة بعد
          </div>
        )}
      </div>
    </div>
  );
}
