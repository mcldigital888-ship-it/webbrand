"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function Bilingual({
  en,
  it,
}: {
  en: React.ReactNode;
  it: React.ReactNode;
}) {
  const { locale } = useLocale();
  return <>{locale === "it" ? it : en}</>;
}
