"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  lines: ReactNode[];         // Her eleman ayrı maskeli satır (serif vurgu için JSX verilebilir)
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  onScroll?: boolean;         // true: görünür olunca, false: yüklenince
};

/** Staggered satır reveal: her satır overflow-hidden maskesi içinde aşağıdan yükselir. */
export default function SplitReveal({ lines, className = "", as: Tag = "h2", delay = 0, onScroll = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const inner = ref.current!.querySelectorAll(".line-inner");
      gsap.set(inner, { yPercent: 115, rotate: 3 });
      gsap.to(inner, {
        yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12, delay, ease: "expo.out",
        scrollTrigger: onScroll ? { trigger: ref.current, start: "top 85%" } : undefined,
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, onScroll]);

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask"><span className="line-inner origin-left">{l}</span></span>
      ))}
    </Tag>
  );
}
