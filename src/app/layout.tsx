import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Backdrop from "@/components/ui/Backdrop";

const sans = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-sans", weight: ["200", "300", "400", "500"] });
const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], variable: "--font-serif", weight: "400", style: ["normal", "italic"] });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", weight: ["400", "500"] });
// Uygulamanın kendi serif başlıkları (Planlayıcı, Rutinler…) — sadece telefon ekranlarında.
const app = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-app", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "BeautyLoop — Cilt ve Saç Bakım Rutininin Yeni Döngüsü",
  description: "Barkod tara, içerikleri çöz, kişisel cilt ve saç bakım rutinini takip et.",
};

export const viewport: Viewport = { themeColor: "#0A0706", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable} ${mono.variable} ${app.variable}`}>
      <body className="font-sans font-light">
        <Backdrop />
        <SmoothScroll>
          <Cursor />
          <div className="relative z-10 overflow-x-clip">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
