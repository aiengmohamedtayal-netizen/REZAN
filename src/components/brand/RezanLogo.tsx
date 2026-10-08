import Image from "next/image";
import Link from "next/link";
import { REZAN_WORDMARK } from "@/config/brand";

interface RezanLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 90, height: 34, maxHeight: "34px" },
  md: { width: 130, height: 48, maxHeight: "48px" },
  lg: { width: 180, height: 66, maxHeight: "66px" },
};

export function RezanLogo({ className = "", size = "md" }: RezanLogoProps) {
  const dims = sizeMap[size];
  return (
    <Link href="/" aria-label="ريزان — الصفحة الرئيسية" className={`inline-block flex-shrink-0 ${className}`}>
      <Image
        src={REZAN_WORDMARK}
        alt="REZAN | ريزان"
        width={dims.width}
        height={dims.height}
        priority
        className="object-contain w-auto"
        style={{ maxHeight: dims.maxHeight }}
      />
    </Link>
  );
}
