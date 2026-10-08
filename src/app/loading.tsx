export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0D0D0D] z-50 flex items-center justify-center">
      <div className="relative w-16 h-16 opacity-50">
        {/* Subtle pulsing REZAN emblem or abstract loader */}
        <div className="absolute inset-0 rounded-full border border-[#B89A62]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-[#B89A62]/40 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#B89A62] tracking-widest font-en">
          REZAN
        </div>
      </div>
    </div>
  );
}
