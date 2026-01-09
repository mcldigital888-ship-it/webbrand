import type { MetadataRoute } from "next";
import { caseStudies, insights } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webbrand.com";

  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/plans",
    "/process",
    "/services",
    "/solutions",
    "/work",
    "/insights",
    "/privacy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  const workEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${baseUrl}/work/${c.slug}`,
    lastModified: now,
  }));

  const insightEntries: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${baseUrl}/insights/${p.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...workEntries, ...insightEntries];
}
