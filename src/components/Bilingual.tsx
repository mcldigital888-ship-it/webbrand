"use client";

import { useLanguage } from "@/components/LangToggle";

export default function Bilingual({
  en,
  it,
}: {
  en: React.ReactNode;
  it: React.ReactNode;
}) {
  const { lang } = useLanguage();
  return <>{lang === "it" ? it : en}</>;
}
