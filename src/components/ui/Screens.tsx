/**
 * Paylaşılan uygulama ekranlarının (Planlayıcı / Rutinler / Ürünlerim) kod ile yeniden çizimi.
 * Gerçek PNG'ler geldiğinde: public/screens/*.jpg koyup <Shot src="..." /> kullanın.
 */
import Image from "next/image";

export function Shot({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} fill sizes="300px" className="object-cover object-top" />;
}

const Header = ({ title }: { title: string }) => (
  <div className="rounded-b-[1.6rem] bg-gradient-to-br from-[#D8998A] to-[#A8665A] px-4 pb-4 pt-9 text-cream">
    <p className="text-[8px] tracking-[0.22em]">◖ BEAUTYLOOP</p>
    <p className="mt-1.5 font-app text-[26px] font-bold leading-none">{title}</p>
  </div>
);

const Icon = ({ children, size = 9 }: { children: React.ReactNode; size?: number }) => (
  <span className="flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D8998A] to-[#A8665A] text-[11px] text-cream"
    style={{ width: size * 4, height: size * 4 }}>{children}</span>
);

const NavBar = ({ active }: { active: number }) => (
  <div className="absolute inset-x-0 bottom-0 flex justify-around bg-white px-1 pb-2 pt-1.5 text-[7px] text-ink/80">
    {[["▦", "Planlayıcı"], ["☑", "Rutinler"], ["♁", "Ürünlerim"], ["▣", "Galeri"], ["⚙", "Ayarlar"]].map(([i, l], k) => (
      <span key={l} className={`flex flex-col items-center rounded-full px-2.5 py-1 ${k === active ? "bg-blush font-semibold" : ""}`}>
        <span className="text-[11px]">{i}</span>{l}
      </span>
    ))}
  </div>
);

const Shell = ({ children, active, title }: { children: React.ReactNode; active: number; title: string }) => (
  <div className="relative h-full bg-gradient-to-b from-[#FBF3EE] to-[#F3E1D9]">
    <Header title={title} />
    {children}
    <NavBar active={active} />
  </div>
);

export function PlannerScreen() {
  const days = [["Pzt", 28], ["Sal", 29], ["Çar", 30], ["Per", 1], ["Cum", 2]];
  const items = [["1. Loreal Paris Elseve Mucizevi Yağ S…", true], ["2. L’Oréal Paris Elseve Hydra [Hyaluro…", false], ["3. Maruderm Arındırıcı Toz Peeling 2 …", true]] as const;
  return (
    <Shell active={0} title="Planlayıcı">
      <div className="flex justify-between px-3 pt-3 text-center text-[8px]">
        {days.map(([d, n]) => (
          <span key={d} className={`rounded-xl px-1.5 py-1 ${n === 30 ? "bg-gradient-to-b from-[#C98470] to-[#A8665A] text-cream" : ""}`}>
            {d}<br /><b className="text-[12px]">{n}</b>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 px-3 pt-3">
        {[["4/6", "Bugünkü İlerleme"], ["2", "Aktif Rutin"], ["7", "Ürün Sayısı"]].map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-white/80 p-2 shadow-[0_8px_20px_-10px_rgba(168,102,88,.5)]">
            <span className="mb-1 block h-4 w-4 rounded-md bg-copper/80" />
            <p className="font-app text-xl font-bold leading-none">{v}</p>
            <p className="mt-1 text-[7px] leading-tight text-ink/70">{l}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 rounded-2xl bg-white/85 p-2.5 shadow-[0_8px_24px_-12px_rgba(168,102,88,.5)]">
        <div className="flex items-center gap-2"><Icon size={8}>☼</Icon>
          <div><p className="font-app text-[12px] font-bold">Sabah rutini</p><p className="text-[7px] text-copper">Sabah Rutini · 2/3 tamamlandı</p></div></div>
        {items.map(([t, done]) => (
          <p key={t} className={`mt-1.5 flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[7.5px] ${done ? "bg-blush/70 text-copper line-through" : ""}`}>
            <span className={`h-3 w-3 shrink-0 rounded-full border ${done ? "border-rose bg-rose" : "border-ink/20 bg-white"}`} />{t}
          </p>
        ))}
      </div>
    </Shell>
  );
}

export function RoutinesScreen() {
  const items = ["Loreal Paris Elseve Mucizevi Yağ S…", "L’Oréal Paris Elseve Hydra [Hyaluro…", "Maruderm Arındırıcı Toz Peeling 2 …"];
  return (
    <Shell active={1} title="Rutinler">
      <div className="mx-3 mt-3 rounded-2xl bg-white/85 p-3 shadow-[0_8px_24px_-12px_rgba(168,102,88,.5)]">
        <div className="flex items-start gap-2"><Icon size={10}>☼</Icon>
          <div className="flex-1"><p className="font-app text-[13px] font-bold">Sabah rutini</p>
            <span className="mt-1 inline-block rounded-full bg-blush px-2 py-0.5 text-[7px]">Sabah</span></div>
          <span className="text-copper">🗑</span></div>
        <p className="mt-2 flex justify-between text-[7.5px]"><span>🔔 Her gün 10:00</span><b className="text-copper">Düzenle</b></p>
        <p className="mt-2 text-[7.5px] text-copper/90">📷 Fotoğraf Çek &nbsp; ▣ Cilt Günlüğü</p>
        {items.map((t, i) => (
          <p key={t} className="mt-2 flex justify-between border-t border-ink/5 pt-1.5 text-[7.5px]"><span>{i + 1}. {t}</span><span className="text-copper">⊗</span></p>
        ))}
        <p className="mt-2 text-[7.5px] text-copper">+ Ürün Ekle</p>
      </div>
      <span className="absolute bottom-14 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose text-xl text-white shadow-lg">+</span>
    </Shell>
  );
}

export function ProductsScreen() {
  const items = [["Loreal Paris Els…", "Elseve", "Saç Bakımı", "♨"], ["L’Oréal Paris El…", "L’Oréal Paris, Elseve", "Saç Bakımı", "♨"], ["Reafirmante Q1…", "Nivea", "Vücut Bakımı", "♡"], ["Maruderm Arın…", "Maruderm", "Temizleyici", "◖"]];
  return (
    <Shell active={2} title="Ürünlerim">
      <div className="flex flex-col gap-2 px-3 pt-3">
        {items.map(([t, b, c, i]) => (
          <div key={t} className="flex items-center gap-2.5 rounded-2xl bg-white/85 p-2.5 shadow-[0_8px_24px_-14px_rgba(168,102,88,.5)]">
            <Icon size={10}>{i}</Icon>
            <div className="flex-1"><p className="font-app text-[11px] font-bold">{t}</p>
              <p className="text-[7px] text-copper">{b}</p>
              <span className="mt-1 inline-block rounded-full bg-blush px-1.5 py-0.5 text-[6.5px]">{c}</span>
              <span className="ml-1 inline-block rounded-full bg-sand px-1.5 py-0.5 text-[6.5px]">25 Eyl 2027</span></div>
            <span className="text-[9px] text-copper">✎ <span className="text-[#9b3b3b]">🗑</span></span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/** Ürün Ekle — "Barkod Tara" sekmesi aktif; tarayıcı görünümü paylaşılan formdan türetildi. */
export function ScanScreen() {
  return (
    <Shell active={2} title="Ürün Ekle">
      <div className="mx-3 mt-3 grid grid-cols-2 overflow-hidden rounded-full border border-copper/20 text-center text-[8px] font-medium">
        <span className="bg-blush py-1.5">Barkod Tara</span><span className="bg-cream/80 py-1.5">Manuel Ekle</span>
      </div>
      <div className="relative mx-3 mt-3 h-[40%] overflow-hidden rounded-3xl bg-ink">
        <div className="absolute inset-5 rounded-2xl border border-cream/40" />
        <div className="absolute inset-x-5 top-1/2 h-px animate-[scan_2.4s_ease-in-out_infinite] bg-rose shadow-[0_0_20px_4px_rgb(201,132,112)]" />
        <div className="absolute inset-x-8 top-1/3 flex h-12 items-end gap-[3px]">
          {Array.from({ length: 26 }).map((_, i) => <span key={i} className="flex-1 bg-cream/80" style={{ height: `${40 + ((i * 37) % 60)}%` }} />)}
        </div>
      </div>
      <div className="mx-3 mt-3 rounded-2xl bg-white/85 p-3 text-[9px]">
        <p className="font-app text-[12px] font-bold">Dalin Bebek Şampuanı</p>
        <p className="text-copper">Dalin · Vücut Bakımı · PAO 12 ay</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {["Parfümsüz", "Göz yakmaz", "Hassas ciltte dikkat"].map((t, i) => (
            <span key={t} className={`rounded-full px-2 py-0.5 text-[7px] ${i === 2 ? "bg-rose/40" : "bg-sand"}`}>{t}</span>
          ))}
        </div>
        <p className="mt-3 rounded-full bg-rose py-1.5 text-center text-[8px] font-medium text-white">Kaydet</p>
      </div>
    </Shell>
  );
}

export function GalleryScreen() {
  const cards = [["from-[#C9A08C] to-[#7A4F40]", "Güneş kremine başladım"], ["from-[#B98A74] to-[#4A2E27]", "Sivilce kremi"]];
  return (
    <Shell active={3} title="Galeri">
      <div className="flex justify-center gap-2 pt-3 text-[8px]">
        <span className="rounded-full border border-copper/30 px-3 py-1 text-copper">Seçimi Kaldır</span>
        <span className="rounded-full border border-copper/30 px-3 py-1 text-copper">✕ Vazgeç</span>
      </div>
      <div className="flex justify-center gap-2 pt-2 text-[8px]">
        <span className="rounded-full bg-rose px-3 py-1 text-white">⇄ Kıyasla (2/2)</span>
        <span className="rounded-full bg-blush px-3 py-1">Sil (2)</span>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pt-4">
        {cards.map(([g, t]) => (
          <div key={t} className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-14px_rgba(168,102,88,.6)]">
            <div className={`h-28 bg-gradient-to-br ${g}`} />
            <div className="p-2 text-[7.5px]">
              <span className="inline-block rounded-full bg-sand px-2 py-0.5">30 Eyl 2026</span>
              <p className="mt-1 text-copper">A</p><p>{t}</p>
            </div>
          </div>
        ))}
      </div>
      <span className="absolute bottom-14 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose text-white shadow-lg">▣</span>
    </Shell>
  );
}

export function ReportScreen() {
  const bars = [0, 0, 24, 100];
  return (
    <Shell active={0} title="Rutin Raporu">
      <div className="mx-3 mt-3 grid grid-cols-2 overflow-hidden rounded-full border border-copper/20 text-center text-[8px] font-medium">
        <span className="bg-blush py-1.5">Bu Hafta</span><span className="bg-cream/80 py-1.5">Bu Ay</span>
      </div>
      <div className="mx-3 mt-3 rounded-2xl bg-white/85 p-3">
        <p className="font-app text-[11px] font-bold">Haftalık Tamamlama</p>
        <div className="mt-3 flex h-24 items-end justify-around border-b border-ink/10">
          {bars.map((h, i) => <span key={i} className="w-8 rounded-t-full bg-rose" style={{ height: `${h}%` }} />)}
        </div>
        <div className="mt-1 flex justify-around text-[7px] text-copper"><span>1.Hf</span><span>2.Hf</span><span>3.Hf</span><span>4.Hf</span></div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-3">
        {[["23", "Toplam Tamamlama"], ["18", "En İyi Hafta"], ["5.8", "Ortalama"]].map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-white/85 p-2 text-center">
            <p className="font-app text-lg font-bold text-copper">{v}</p><p className="text-[7px]">{l}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}
