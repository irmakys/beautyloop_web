"use client";
import Magnetic from "@/components/ui/Magnetic";
import SplitReveal from "@/components/ui/SplitReveal";
import { PLAY_URL } from "./Hero";

export default function Footer() {
  return (
    <footer id="indir" className="relative overflow-hidden px-5 pb-8 pt-40 md:px-10 md:pt-56">
      <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(201,132,112,0.28),transparent)]" />
      <div className="relative">
        <p className="eyebrow no-after mb-10">Erişim</p>
        <SplitReveal as="h2" onScroll className="text-display-xl font-extralight"
          lines={["Rutini", <span key="e" className="font-serif font-normal italic text-rosegold">başlat.</span>]} />
        <div className="mt-14 flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-md text-lg leading-relaxed text-cream/55">
            Cilt ve saç bakım döngünü bugün kur. BeautyLoop Google Play&apos;de.
          </p>
          <Magnetic strength={0.4}>
            <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" data-cursor data-cursor-label="Git"
              className="btn-shimmer group inline-flex items-center gap-3 rounded-full bg-cream px-10 py-6 text-base font-normal text-ink transition-colors duration-700 hover:bg-champagne">
              Google Play&apos;den İndir
              <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-32 flex flex-wrap items-center justify-between gap-6 border-t border-cream/15 pt-6">
          <p className="label">© {new Date().getFullYear()} BeautyLoop. All rights reserved.</p>
          <nav className="flex gap-8">
            {["Instagram", "TikTok", "X", "İletişim"].map((l) => (
              <a key={l} href="#" data-cursor className="label transition-colors duration-500 hover:text-cream">{l}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
