# BeautyLoop Web

Next.js 14 · Tailwind · GSAP + ScrollTrigger · Lenis

## Çalıştırma
```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # prod testi
```

## Yayına alma (canlı test)
**Vercel (önerilen):** repoyu GitHub'a it → vercel.com → Import Project → ayar gerekmez.
veya CLI: `npx vercel` (önizleme) / `npx vercel --prod`.

## Yayın öncesi yapılacaklar
- Gerçek ekran görüntüleri: `public/screens/` içine koyup `Screens.tsx` içindeki `Shot` ile kullanın.
- Footer sosyal linkleri (`#`) gerçek adreslerle değiştirilmeli.

## Yapı
- `src/app/globals.css` — renk/motion token'ları · `tailwind.config.ts` — tema
- `src/components/providers/SmoothScroll.tsx` — Lenis ↔ GSAP köprüsü
- `src/components/sections/*` — Hero, Manifesto, Showcase (pinned), Previews, Footer
