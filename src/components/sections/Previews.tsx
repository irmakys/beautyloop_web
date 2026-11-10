"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { ScanScreen, PlannerScreen, RoutinesScreen, ProductsScreen, GalleryScreen, ReportScreen } from "@/components/ui/Screens";

const ITEMS = [
  { t: "Planlayıcı", s: "Günlük ilerleme", Screen: PlannerScreen },
  { t: "Rutinler", s: "Sabah & akşam", Screen: RoutinesScreen },
  { t: "Ürünlerim", s: "Son kullanma takibi", Screen: ProductsScreen },
  { t: "Barkod Tara", s: "Barkod → içerik", Screen: ScanScreen },
  { t: "Galeri", s: "Önce / sonra kıyasla", Screen: GalleryScreen },
  { t: "Rutin Raporu", s: "Haftalık ilerleme", Screen: ReportScreen },
];

/** Liste satırında hover → imleci takip eden telefon preview'u. */
export default function Previews() {
  const prev = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pos = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void } | null>(null);
  const last = useRef(0);

  const ensure = () => {
    if (!pos.current) pos.current = {
      x: gsap.quickTo(prev.current, "x", { duration: 0.8, ease: "power3" }),
      y: gsap.quickTo(prev.current, "y", { duration: 0.8, ease: "power3" }),
      r: gsap.quickTo(prev.current, "rotation", { duration: 0.6, ease: "power3" }),
    };
    return pos.current;
  };
  const Active = ITEMS[active].Screen;

  return (
    <section id="onizleme" className="relative px-5 py-40 md:px-10"
      onMouseMove={(e) => {
        const p = ensure();
        p.x(e.clientX - 145); p.y(e.clientY - 275);
        p.r(Math.max(-8, Math.min(8, (e.clientX - last.current) * 0.4))); last.current = e.clientX;
      }}
      onMouseEnter={() => gsap.to(prev.current, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" })}
      onMouseLeave={() => gsap.to(prev.current, { opacity: 0, scale: 0.8, duration: 0.7, ease: "expo.out" })}>
      <p className="eyebrow no-after mb-12">Canlı önizleme</p>
      <ul>
        {ITEMS.map((it, i) => (
          <li key={it.t} onMouseEnter={() => setActive(i)}
            className="group flex items-baseline justify-between border-t border-cream/15 py-6 md:py-9">
            <span className="flex items-baseline gap-6">
              <span className="label w-8">0{i + 1}</span>
              <span className={`text-display-md font-extralight transition-all duration-700 ease-expo group-hover:translate-x-4 ${i === active ? "text-cream" : "text-cream/25"}`}>{it.t}</span>
            </span>
            <span className="label hidden md:block">{it.s}</span>
          </li>
        ))}
        <li className="border-t border-cream/15" />
      </ul>

      {/* Sadece masaüstü: fixed, imleci takip eder */}
      <div ref={prev} className="pointer-events-none fixed left-0 top-0 z-30 hidden origin-center scale-75 opacity-0 lg:block">
        <PhoneFrame className="!w-[290px]"><Active /></PhoneFrame>
      </div>
    </section>
  );
}
