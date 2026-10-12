"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function MediaCopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-xs transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${
        copied
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-[#242424] text-[#AAA] hover:text-white hover:bg-[#2E2E2E]"
      }`}
      title="نسخ الرابط المباشر"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
    </button>
  );
}
