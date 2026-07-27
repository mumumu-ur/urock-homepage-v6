import type { MetadataRoute } from "next";
import { getContentSource } from "@/lib/content/source";
import { LOCALES, absoluteUrl, languageAlternates } from "@/lib/seo/site";

const ABOUT_SLUGS = ["greeting", "history", "certifications", "global", "brand", "news", "location"];
const SUPPORT_SLUGS = ["faq", "environment"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const source = await getContentSource();
  const solutions = await source.getSolutions(LOCALES[0]);
  const services = await source.getServices(LOCALES[0]);

  const staticPaths = [
    "",
    "solutions",
    "services",
    "support",
    "contact",
    ...solutions.map((s) => `solutions/${s.slug}`),
    "solutions/dfas/pro-one",
    ...services.map((s) => `services/${s.slug}`),
    ...ABOUT_SLUGS.map((slug) => `about/${slug}`),
    ...SUPPORT_SLUGS.map((slug) => `support/${slug}`),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of staticPaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }
  return entries;
}
