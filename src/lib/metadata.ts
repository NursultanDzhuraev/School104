import type { Metadata } from "next";
import type { Locale } from "@/types";
import { school, imagery } from "@/data/site";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
  image = imagery.campus,
): Metadata {
  const url = new URL("/" + locale + path, school.siteUrl).toString();
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "ky-KG": new URL("/kg" + path, school.siteUrl).toString(),
        "ru-KG": new URL("/ru" + path, school.siteUrl).toString(),
        "x-default": new URL("/kg" + path, school.siteUrl).toString(),
      },
    },
    openGraph: {
      title: title + " — " + school.shortName[locale],
      description,
      url,
      siteName: school.name[locale],
      locale: locale === "kg" ? "ky_KG" : "ru_KG",
      type: "website",
      images: [
        { url: image, width: 1200, height: 630, alt: school.name[locale] },
      ],
    },
  };
}
