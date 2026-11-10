import type { Config } from "tailwindcss";

/**
 * BeautyLoop design tokens.
 * Renkler CSS değişkenlerinden (globals.css) okunur; tek yerden değiştirilebilir.
 * Palet: uygulama ekran görüntülerinden (bakır / rose-gold + krem) + tafpa tarzı koyu tuval.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        blush: "rgb(var(--c-blush) / <alpha-value>)",
        rose: "rgb(var(--c-rose) / <alpha-value>)",
        copper: "rgb(var(--c-copper) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
        mauve: "rgb(var(--c-mauve) / <alpha-value>)",
        champagne: "rgb(var(--c-champagne) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        app: ["var(--font-app)", "Georgia", "serif"], // yalnızca telefon içi UI (uygulamanın kendi serif'i)
      },
      fontSize: {
        "display-xl": ["clamp(3.1rem, 9.6vw, 10.5rem)", { lineHeight: "0.9", letterSpacing: "-0.055em" }],
        "display-lg": ["clamp(2.6rem, 6.4vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.05em" }],
        "display-md": ["clamp(1.9rem, 3.9vw, 4.4rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
      },
      letterSpacing: { hyper: "-0.055em", tightest: "-0.04em" },
      transitionTimingFunction: { expo: "cubic-bezier(0.22, 1, 0.36, 1)" },
      borderRadius: { phone: "3rem" },
    },
  },
  plugins: [],
};
export default config;
