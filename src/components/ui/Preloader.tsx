"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "./Logo";

/** Açılış perdesi: sayaç 0→100, sonra perde yukarı kayar ve hero reveal'ı başlar. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const num = root.current!.querySelector<HTMLElement>(".pl-num")!;
    const counter = { v: 0 };
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => { document.documentElement.style.overflow = ""; root.current?.remove(); },
    });
    tl.to(counter, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); } })
      .to(".pl-content", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, ">0.1")
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, ">-0.1");
    return () => { tl.kill(); document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex items-end justify-between bg-ink p-6 md:p-10">
      <div className="pl-content flex items-center gap-3"><Logo size={30} /><span className="label !text-cream/70">BeautyLoop</span></div>
      <span className="pl-num pl-content font-mono text-6xl font-light tracking-tighter text-cream md:text-8xl">000</span>
    </div>
  );
}
