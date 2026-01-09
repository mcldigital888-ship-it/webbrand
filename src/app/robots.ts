import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://webbrand.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/plans",
          "/process",
          "/services",
          "/solutions",
          "/work",
          "/insights",
          "/privacy",
        ],
        disallow: ["/admin", "/crm", "/api", "/thank-you"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
