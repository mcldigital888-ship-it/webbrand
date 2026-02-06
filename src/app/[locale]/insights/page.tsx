import type { Metadata } from "next";
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

  return buildLocalizedMetadata({
    locale,
    path: "/insights",
    title: t(dict, "insights.meta_title"),
    description: t(dict, "insights.meta_description"),
    type: "website",
  });
}

export { default } from "../../insights/page";
