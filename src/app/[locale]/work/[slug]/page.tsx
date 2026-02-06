import type { Metadata } from "next";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/types";
import { t } from "@/i18n/t";
import { buildLocalizedMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/content";

function getDictString(dict: any, key: string, fallback: string) {
  const parts = key.split(".");
  let cur: any = dict;
  for (const p of parts) cur = cur?.[p];
  return typeof cur === "string" && cur.length > 0 ? cur : fallback;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const locale: Locale = p.locale === "en" ? "en" : "it";
  const dict = dictionaries[locale];
  const cs = caseStudies.find((x) => x.slug === p.slug);

  const title = cs
    ? getDictString(dict, `work.case_studies.${p.slug}.title`, cs.client)
    : t(dict, "work.meta_title");
  const description = cs
    ? getDictString(dict, `work.case_studies.${p.slug}.description`, cs.oneLiner)
    : t(dict, "work.meta_description");

  return buildLocalizedMetadata({
    locale,
    path: `/work/${p.slug}`,
    title,
    description,
    type: "article",
  });
}

export { default } from "../../../work/[slug]/page";
