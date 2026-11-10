/** Rose-gold halka + damla (paylaşılan logodan esinlenen vektör yeniden çizim). */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3D5CB" /><stop offset="1" stopColor="#B8745F" />
        </linearGradient>
      </defs>
      <path d="M33 6.5A19 19 0 1 1 15 6.5" stroke="url(#rg)" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M24 14c4.5 6 7 9.5 7 13a7 7 0 0 1-14 0c0-3.500 2.500-7 7-13Z" fill="url(#rg)" />
    </svg>
  );
}
