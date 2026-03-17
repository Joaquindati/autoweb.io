import type { MetadataRoute } from "next";

const BASE_URL = "https://automatika.studio";
const locales = ["es", "en", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/panel", "/dashboard"];
  const legalRoutes = ["/legal/privacy", "/legal/terms", "/legal/cookies"];

  const mainEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const legalEntries = legalRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    }))
  );

  return [...mainEntries, ...legalEntries];
}
