import type { Metadata } from "next";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/types";
import { t } from "@/i18n/t";
import { buildLocalizedMetadata } from "@/lib/seo";
import { insights } from "@/lib/content";

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
  const post = insights.find((x) => x.slug === p.slug);

  const title = post
    ? getDictString(dict, `insights.posts.${p.slug}.title`, post.title)
    : t(dict, "insights.meta_title");
  const description = post
    ? getDictString(dict, `insights.posts.${p.slug}.description`, post.excerpt)
    : t(dict, "insights.meta_description");

  return buildLocalizedMetadata({
    locale,
    path: `/insights/${p.slug}`,
    title,
    description,
    type: "article",
  });
}

export { default } from "../../../insights/[slug]/page";
