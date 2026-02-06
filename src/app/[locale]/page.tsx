import type { Metadata } from "next";
import HomeClient from "@/app/HomeClient";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/types";
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
  const title = t(dict, "home.meta_title");
  const description = t(dict, "home.meta_description");

  return buildLocalizedMetadata({
    locale,
    path: "/",
    title,
    description,
    type: "website",
  });
}

export default function HomePage() {
  return <HomeClient />;
}
