"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "it";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const stored = window.localStorage.getItem("webbrand_lang");
      if (stored === "en" || stored === "it") return stored;
      return "en";
    } catch {
      return "en";
    }
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("webbrand_lang", next);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.02] p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150",
          lang === "en"
            ? "bg-[var(--ds-text)] text-[var(--ds-bg)]"
            : "text-[var(--ds-muted)] hover:text-[var(--ds-text)]",
        ].join(" ")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("it")}
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150",
          lang === "it"
            ? "bg-[var(--ds-text)] text-[var(--ds-bg)]"
            : "text-[var(--ds-muted)] hover:text-[var(--ds-text)]",
        ].join(" ")}
      >
        IT
      </button>
    </div>
  );
}
