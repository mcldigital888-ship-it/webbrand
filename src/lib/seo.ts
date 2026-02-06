import type { Metadata } from "next";
import type { Locale } from "@/i18n/types";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://webbrand.com";
  return raw.replace(/\/+$/, "");
}

export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const normalized = clean === "/" ? "" : clean.replace(/\/+$/, "");
  return `/${locale}${normalized}`;
}

export function absoluteUrl(pathname: string) {
  return `${getSiteUrl()}${pathname}`;
}

export function buildAlternates(locale: Locale, path: string) {
  const itPath = localePath("it", path);
  const enPath = localePath("en", path);

  return {
    canonical: absoluteUrl(locale === "en" ? enPath : itPath),
    languages: {
      it: absoluteUrl(itPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(itPath),
    },
  } satisfies NonNullable<Metadata["alternates"]>;
}

export function buildLocalizedMetadata(args: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const { locale, path, title, description, type = "website", ogImage, noindex } = args;
  const alternates = buildAlternates(locale, path);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates,
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type,
      url: alternates.canonical,
      siteName: "Webrrand",
      locale: locale === "it" ? "it_IT" : "en_US",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
