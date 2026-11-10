"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import Magnetic from "@/components/ui/Magnetic";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { PlannerScreen } from "@/components/ui/Screens";

export const PLAY_URL = "https://play.google.com/store/apps/details?id=net.beautyloop.app&hl=tr";

const CHIPS = [
  { t: "Barkod → 12 içerik çözüldü", pos: "left-0 top-[14%] lg:-left-24", depth: 40 },
  { t: "4/6 adım tamamlandı", pos: "right-0 top-[48%] lg:-right-20", depth: 70 },
  { t: "Retinol · SPF uyarısı", pos: "left-2 bottom-[10%] lg:-left-16", depth: 55 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const START = 2.1; // preloader süresi

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", { opacity: 0, y: 24, stagger: 0.12, delay: START + 0.5, duration: 1.4 });
      gsap.from(".rig-in", { yPercent: 18, opacity: 0, rotateX: 18, duration: 2, delay: START });
      gsap.from(".chip", { opacity: 0, scale: 0.8, y: 20, stagger: 0.15, delay: START + 1, duration: 1.2 });
      gsap.to(".chip", { y: "+=14", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.5, from: "random" } });
      gsap.to(".hint-line", { scaleY: 1, duration: 1.8, repeat: -1, ease: "power2.inOut", yoyo: true });

      // Scroll: rig kalkar, hafif küçülür; başlık alttan karşı yönde kayar (scrub)
      gsap.to(rig.current, { yPercent: -14, scale: 0.9, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-copy", { yPercent: 18, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);

    // Desktop: pointer ile 3D tilt + chip derinlik parallax'ı
    let off = () => {};
    if (!window.matchMedia("(pointer: coarse)").matches) {
      const ry = gsap.quickTo(".tilt", "rotationY", { duration: 1 });
      const rx = gsap.quickTo(".tilt", "rotationX", { duration: 1 });
      const chips = gsap.utils.toArray<HTMLElement>(".chip-wrap");
      const cx = chips.map((c) => gsap.quickTo(c, "x", { duration: 1.2 }));
      const cy = chips.map((c) => gsap.quickTo(c, "y", { duration: 1.2 }));
      const mv = (e: MouseEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        ry(nx * 24); rx(-ny * 16);
        chips.forEach((c, i) => { const d = Number(c.dataset.depth); cx[i](nx * d); cy[i](ny * d); });
      };
      window.addEventListener("mousemove", mv, { passive: true });
      off = () => window.removeEventListener("mousemove", mv);
    }
    return () => { off(); ctx.revert(); };
  }, []);

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] items-center px-5 pb-20 pt-32 md:px-10">
      <div className="grid w-full grid-cols-12 items-center gap-y-16">
        <div className="hero-copy col-span-12 lg:col-span-7">
          <p className="hero-fade eyebrow no-after mb-8">Cilt &amp; saç bakım planlayıcı · Android</p>
          <SplitReveal as="h1" delay={START} className="text-display-xl font-extralight"
            lines={["Cilt ve saç", "bakım rutininin", <span key="e" className="font-serif font-normal italic text-rosegold">yeni döngüsü.</span>]} />
          <p className="hero-fade mt-10 max-w-md text-lg leading-relaxed text-cream/55">
            Barkodu tara, içerikleri çöz, sabah ve akşam rutinini adım adım takip et.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-6">
            <Magnetic>
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" data-cursor data-cursor-label="İndir"
                className="btn-shimmer group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-5 text-sm font-normal text-ink transition-colors duration-700 hover:bg-champagne">
                Google Play&apos;den İndir
                <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <a href="#manifesto" data-cursor className="label transition-colors duration-500 hover:text-cream">Hemen keşfet</a>
          </div>
        </div>

        <div ref={rig} className="col-span-12 flex justify-center will-change-transform lg:col-span-5" style={{ perspective: 1400 }}>
          <div className="rig-in relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="tilt" style={{ transformStyle: "preserve-3d" }}>
              <PhoneFrame><PlannerScreen /></PhoneFrame>
            </div>
            {CHIPS.map((c) => (
              <div key={c.t} data-depth={c.depth} className={`chip-wrap absolute ${c.pos}`}>
                <div className="chip glass whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose" />{c.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="label">Kaydırın</span>
        <span className="hint-line block h-10 w-px origin-top scale-y-0 bg-cream/40" />
      </div>
    </section>
  );
}
