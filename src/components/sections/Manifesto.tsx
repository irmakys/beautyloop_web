"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ScrollWords from "@/components/ui/ScrollWords";

const PRINCIPLES = [
  ["01", "Az ürün, net rutin.", "Her ürünün rutinde bir yeri ve nedeni olsun."],
  ["02", "İçerik şeffaflığı.", "Barkodu okut, bileşenleri ve riskleri anla."],
  ["03", "Sessiz hatırlatma.", "Bildirim bağırmaz; tam zamanında gelir."],
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".principle", {
        opacity: 0, y: 40, stagger: 0.15, duration: 1.4,
        scrollTrigger: { trigger: ".principles", start: "top 85%" },
      });
      gsap.from(".p-line", {
        scaleX: 0, transformOrigin: "left", stagger: 0.15, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ".principles", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={root} className="px-5 py-40 md:px-10 md:py-56">
      <p className="eyebrow no-after mb-12">Manifesto · Vizyon</p>
      <ScrollWords
        className="max-w-6xl text-display-md font-extralight"
        text="Hazır rutinler değil, *sana özel* bir döngü. Her üründe *içerik şeffaflığı*, her adımda sessiz bir düzen. Cildin ve saçın için *tavizsiz* özen."
      />
      <div className="principles mt-28 grid gap-12 md:grid-cols-3 md:gap-8">
        {PRINCIPLES.map(([n, t, d]) => (
          <div key={n} className="principle">
            <div className="p-line mb-6 h-px w-full bg-cream/20" />
            <p className="label mb-4">{n}</p>
            <h3 className="text-2xl font-light tracking-tight">{t}</h3>
            <p className="mt-3 max-w-xs text-cream/50">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
