import type { MetadataRoute } from "next";
import { school } from "@/data/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(school.demoMode ? { disallow: "/" } : { allow: "/" }),
    },
    ...(school.demoMode ? {} : { sitemap: school.siteUrl + "/sitemap.xml" }),
  };
}
