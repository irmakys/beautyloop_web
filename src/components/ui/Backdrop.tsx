"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Sabit tuval: üst glow, imleci yumuşakça takip eden spotlight, vinyet ve film noise. */
export default function Backdrop() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = spot.current!;
    const t = { x: innerWidth / 2, y: innerHeight * 0.35 };
    const c = { ...t };
    const move = (e: MouseEvent) => { t.x = e.clientX; t.y = e.clientY; };
    const tick = () => {
      c.x += (t.x - c.x) * 0.08; c.y += (t.y - c.y) * 0.08;
      el.style.setProperty("--gx", `${c.x}px`); el.style.setProperty("--gy", `${c.y}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    gsap.ticker.add(tick);
    return () => { window.removeEventListener("mousemove", move); gsap.ticker.remove(tick); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="absolute -top-[40vh] left-1/2 h-[90vh] w-[130vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(201,132,112,0.10),transparent)]" />
      <div ref={spot} className="absolute inset-0"
        style={{ background: "radial-gradient(560px circle at var(--gx, 50%) var(--gy, 35%), rgba(232,195,168,0.075), transparent 65%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6))]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
        <filter id="bl-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bl-noise)" />
      </svg>
    </div>
  );
}
