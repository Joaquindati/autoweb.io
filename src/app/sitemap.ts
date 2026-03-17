import type { MetadataRoute } from "next";

const BASE_URL = "https://automatika.studio";
const locales = ["es", "en", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/panel", "/dashboard"];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
