"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Kelime kelime scroll-scrub reveal. `*vurgu*` ile işaretlenen kısımlar serif italik rose-gold olur.
 */
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = text.split("*").flatMap((seg, i) =>
    seg.split(" ").filter(Boolean).map((w) => ({ w, em: i % 2 === 1 })),
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".w", { opacity: 0.12 }, {
        opacity: 1, ease: "none", stagger: 0.12, duration: 1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 50%", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <span key={i} className={`w inline-block pr-[0.22em] ${t.em ? "font-serif italic text-rosegold" : ""}`}>{t.w}</span>
      ))}
    </p>
  );
}
