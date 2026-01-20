import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--ds-bg)",
        surface: "var(--ds-surface)",
        border: "var(--ds-border)",
        text: "var(--ds-text)",
        muted: "var(--ds-muted)",
        accent: "var(--ds-accent)",
        accent2: "var(--ds-accent2)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
        ],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 16px 50px rgba(0,0,0,0.55)",
        lift: "0 0 0 1px rgba(255,255,255,0.10) inset, 0 22px 70px rgba(0,0,0,0.65)",
      },
      transitionDuration: {
        150: "150ms",
        220: "220ms",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
