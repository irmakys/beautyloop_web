"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";
import SplitReveal from "@/components/ui/SplitReveal";
import { ScanScreen, RoutinesScreen, PlannerScreen } from "@/components/ui/Screens";

type Scene = {
  n: string; tag: string; title: ReactNode[]; desc: string; bullets: string[];
  Screen: () => JSX.Element; chips: [string, string][];
};

const em = (t: string) => <span key={t} className="font-serif font-normal italic text-rosegold">{t}</span>;

const SCENES: Scene[] = [
  { n: "01", tag: "Barkod okuma & ürün analizi", title: ["Barkodu tara,", em("içeriği çöz.")],
    desc: "Kozmetik ürünün barkodunu okut; içerik listesi saniyeler içinde çözülsün, riskli bileşenler işaretlensin.",
    bullets: ["Anında içerik analizi", "Hassas cilt uyarıları", "Manuel ekleme seçeneği"], Screen: ScanScreen,
    chips: [["12 içerik", "-left-4 top-[18%] lg:-left-20"], ["2 uyarı", "-right-2 bottom-[22%] lg:-right-16"]] },
  { n: "02", tag: "Kişiselleştirilmiş rutin takibi", title: ["Sabah, akşam,", em("adım adım.")],
    desc: "Cilt ve saç bakım döngünü kendi ürünlerinle kur; saatini seç, her adımı işaretle, ilerlemeni gör.",
    bullets: ["Sabah & akşam rutinleri", "Opsiyonel adımlar · Tembel mod", "Cilt günlüğü & fotoğraf"], Screen: RoutinesScreen,
    chips: [["Her gün 10:00", "-left-4 top-[30%] lg:-left-20"], ["Cilt günlüğü", "-right-2 bottom-[18%] lg:-right-16"]] },
  { n: "03", tag: "Dinamik bildirim & içerik takibi", title: ["Hatırlatma,", em("tam zamanında.")],
    desc: "Rutin hatırlatmaları, son kullanma tarihleri ve haftalık ilerleme raporu cebinde.",
    bullets: ["Akıllı hatırlatıcılar", "Son kullanma (PAO) takibi", "Haftalık tamamlama raporu"], Screen: PlannerScreen,
    chips: [["4/6 tamamlandı", "-left-4 top-[22%] lg:-left-20"], ["25 Eyl 2027", "-right-2 bottom-[26%] lg:-right-16"]] },
];

/**
 * Masaüstü: pinned sahne. Scrub timeline sahneleri blur + y ile cross-fade eder, sayaç ve ilerleme çizgisi güncellenir.
 * Mobil: pin yok, sahneler dikey akar ve görünür oldukça açılır.
 */
export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const scenes = () => gsap.utils.toArray<HTMLElement>(".scene");

    mm.add("(min-width: 1024px)", () => {
      const s = scenes();
      const count = s.length;
      gsap.set(s.slice(1), { opacity: 0, y: 70, filter: "blur(10px)", pointerEvents: "none" });
      gsap.set(".scene .p-phone", { rotateY: -14, rotateX: 4 });
      const counter = root.current!.querySelector<HTMLElement>(".counter-n")!;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage.current, pin: true, scrub: 0.7, start: "top top",
          end: () => "+=" + (innerHeight * 1.6 * (count - 1) + innerHeight * 0.4),
          anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(".progress-fill", { scaleY: self.progress });
            const i = Math.min(count - 1, Math.round(self.progress * (count - 1)));
            counter.textContent = String(i + 1).padStart(2, "0");
          },
        },
      });
      tl.to({}, { duration: 0.6 }); // ilk sahnede bekle
      for (let i = 1; i < count; i++) {
        tl.to(s[i - 1], { opacity: 0, y: -70, filter: "blur(10px)", duration: 1, pointerEvents: "none" })
          .to(s[i - 1].querySelector(".p-phone"), { rotateY: 14, duration: 1 }, "<")
          .fromTo(s[i], { opacity: 0, y: 70, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, pointerEvents: "auto" }, "<0.25")
          .to(s[i].querySelector(".p-phone"), { rotateY: 0, rotateX: 0, duration: 1 }, "<")
          .to({}, { duration: 0.6 });
      }
      gsap.to(s[0].querySelector(".p-phone"), { rotateY: 0, rotateX: 0, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: stage.current, start: "top 60%" } });
    });

    mm.add("(max-width: 1023px)", () => {
      scenes().forEach((el) => {
        gsap.from(el.children, { opacity: 0, y: 50, stagger: 0.12, duration: 1.2,
          scrollTrigger: { trigger: el, start: "top 80%" } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="ozellikler" ref={root} className="relative">
      <div className="px-5 pb-20 pt-10 md:px-10 lg:pb-8">
        <p className="eyebrow no-after mb-8">Özellikler</p>
        <SplitReveal onScroll className="text-display-lg font-extralight"
          lines={["Üç odak.", em("Tek döngü.")]} />
      </div>

      <div ref={stage} className="relative px-5 md:px-10 lg:h-screen">
        <div className="relative flex flex-col gap-32 lg:block lg:h-full lg:gap-0">
          {SCENES.map(({ n, tag, title, desc, bullets, Screen, chips }) => (
            <article key={n} className="scene grid grid-cols-1 items-center gap-12 lg:absolute lg:inset-0 lg:grid-cols-2 lg:pt-16">
              <div>
                <p className="label mb-6">{n} / 0{SCENES.length} — {tag}</p>
                <h3 className="text-display-lg font-extralight">
                  {title.map((l, i) => <span key={i} className="block">{l}</span>)}
                </h3>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/55">{desc}</p>
                <ul className="mt-8 flex flex-col gap-3 text-[15px] text-cream/75">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-4"><span className="h-px w-6 bg-rose/70" />{b}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center" style={{ perspective: 1400 }}>
                <div className="p-phone relative will-change-transform" style={{ transformStyle: "preserve-3d" }} data-cursor data-cursor-label="Keşfet">
                  <PhoneFrame><Screen /></PhoneFrame>
                  {chips.map(([t, pos]) => (
                    <div key={t} className={`glass absolute ${pos} whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80`}
                      style={{ transform: "translateZ(60px)" }}>
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose" />{t}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sayaç + ilerleme (yalnızca masaüstü) */}
        <div className="pointer-events-none absolute bottom-10 left-10 hidden items-center gap-5 lg:flex">
          <span className="label"><span className="counter-n">01</span> / 0{SCENES.length}</span>
          <span className="relative block h-16 w-px bg-cream/15">
            <span className="progress-fill absolute inset-0 origin-top scale-y-0 bg-rose" />
          </span>
        </div>
      </div>
    </section>
  );
}
