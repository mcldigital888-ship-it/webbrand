import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrackingClient from "@/components/TrackingClient";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/types";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { t } from "@/i18n/t";
import { buildLocalizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const p = await params;
  const locale: Locale = p.locale === "en" ? "en" : "it";
  const dict = dictionaries[locale];

  return buildLocalizedMetadata({
    locale,
    path: "/",
    title: t(dict, "meta.root.title"),
    description: t(dict, "common.brand_tagline"),
    type: "website",
  });
}

export default async function PublicLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await params;
  const locale: Locale = p.locale === "en" ? "en" : "it";
  const dict = dictionaries[locale];

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <TrackingClient />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-14">{children}</main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
    </LocaleProvider>
  );
}
