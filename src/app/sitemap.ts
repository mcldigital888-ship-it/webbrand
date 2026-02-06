import type { MetadataRoute } from "next";
import { caseStudies, insights } from "@/lib/content";
import { absoluteUrl, localePath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const locales = ["it", "en"] as const;

  const staticRoutes = [
    "/",
    "/about",
    "/audit",
    "/contact",
    "/plans",
    "/process",
    "/services",
    "/solutions",
    "/work",
    "/insights",
    "/terms",
    "/thank-you",
  ];

  const allPaths = [
    ...staticRoutes,
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...insights.map((p) => `/insights/${p.slug}`),
  ];

  const entries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    allPaths.map((path) => {
      const itAbs = absoluteUrl(localePath("it", path));
      const enAbs = absoluteUrl(localePath("en", path));

      return {
        url: absoluteUrl(localePath(locale, path)),
        lastModified: now,
        alternates: {
          languages: {
            it: itAbs,
            en: enAbs,
            "x-default": itAbs,
          },
        },
      };
    })
  );

  return entries;
}
