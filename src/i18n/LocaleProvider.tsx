"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary, Locale } from "./types";
import { t as translate } from "./t";

const LocaleContext = createContext<{
  locale: Locale;
  dict: Dictionary;
  t: (key: string, vars?: Record<string, string | number>) => string;
} | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => {
    return {
      locale,
      dict,
      t: (key: string, vars?: Record<string, string | number>) => translate(dict, key, vars),
    };
  }, [locale, dict]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
