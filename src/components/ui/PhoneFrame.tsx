import type { ReactNode } from "react";

/** Koyu titanyum telefon çerçevesi. `children` = ekran içeriği. */
export default function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] w-[min(68vw,290px)] rounded-phone bg-[#0d0908] p-[9px] shadow-[0_50px_140px_-30px_rgba(201,132,112,0.45),inset_0_0_0_1px_rgba(255,255,255,0.14)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-cream text-ink">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-[#0d0908]" />
        {children}
        <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,transparent_32%)]" />
      </div>
    </div>
  );
}
