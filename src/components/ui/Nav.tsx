"use client";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import { PLAY_URL } from "@/components/sections/Hero";

const LINKS = [["Manifesto", "#manifesto"], ["Özellikler", "#ozellikler"], ["Önizleme", "#onizleme"]];

/** Yüzen cam pill menü (tafpa tarzı). */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-4 pr-2">
        <a href="#top" data-cursor className="flex items-center gap-2 text-[15px] font-normal tracking-tight"><Logo size={24} />BeautyLoop</a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} data-cursor className="rounded-full px-4 py-2 text-[13px] text-cream/60 transition-colors duration-500 hover:bg-white/[0.06] hover:text-cream">{l}</a>
          ))}
        </div>
        <Magnetic strength={0.25}>
          <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" data-cursor className="block rounded-full bg-cream px-4 py-2 text-[13px] font-normal text-ink transition-colors duration-500 hover:bg-champagne">
            <span className="hidden sm:inline">Hemen keşfet</span><span className="sm:hidden">İndir</span>
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
