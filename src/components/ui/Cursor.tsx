"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor. Herhangi bir elemana `data-cursor` (+ opsiyonel `data-cursor-label`)
 * eklenirse hover'da büyür ve etiket gösterir.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = dot.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (t) {
        setLabel(t.dataset.cursorLabel ?? "");
        gsap.to(el, { scale: t.dataset.cursorLabel ? 4.2 : 2.6, duration: 0.5 });
      } else {
        setLabel("");
        gsap.to(el, { scale: 1, duration: 0.5 });
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] -ml-2 -mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-cream mix-blend-difference"
    >
      {label && (
        <span className="absolute whitespace-nowrap text-[3px] font-medium uppercase tracking-widest text-ink" style={{ transform: "scale(1)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
