"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

function getLocaleFromPathname(pathname: string) {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "en" || seg === "it") return seg;
  return null;
}

function withLocale(href: string, locale: string | null) {
  if (!href.startsWith("/")) return href;
  if (href.startsWith("/api") || href.startsWith("/admin") || href.startsWith("/crm")) return href;
  if (href === "/") return locale ? `/${locale}` : "/";
  const first = href.split("/").filter(Boolean)[0];
  if (first === "en" || first === "it") return href;
  return locale ? `/${locale}${href}` : href;
}

export default function LocaleLink({ href, ...props }: LinkProps & { className?: string; children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const nextHref = typeof href === "string" ? withLocale(href, locale) : href;
  return <Link href={nextHref} {...props} />;
}
