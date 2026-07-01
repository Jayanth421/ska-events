import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skaevents.online";
  const locales = ["en", "te"];

  const pages = [
    "",
    "/services",
    "/packages",
    "/venues",
    "/gallery",
    "/about",
    "/contact",
    "/blog",
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            te: `${baseUrl}/te${page}`,
          },
        },
      });
    });
  });

  return entries;
}
