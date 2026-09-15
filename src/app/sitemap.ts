import type { MetadataRoute } from "next";
import { school } from "@/data/site";
import { news } from "@/data/news";
import { locales } from "@/types";
export default function sitemap(): MetadataRoute.Sitemap {
  if (school.demoMode) return [];
  return locales.flatMap((locale) =>
    [
      "",
      "/students",
      "/news",
      "/documents",
      "/gallery",
      "/contacts",
      ...news.map((item) => "/news/" + item.slug),
    ].map((path) => ({ url: school.siteUrl + "/" + locale + path })),
  );
}
