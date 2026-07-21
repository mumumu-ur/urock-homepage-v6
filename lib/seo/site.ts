import { routing } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const DEFAULT_LOCALE = routing.defaultLocale;
export const LOCALES = routing.locales;

/** Build an absolute URL for a locale + path (path without leading locale). */
export function absoluteUrl(locale: string, path = ""): string {
  const clean = path.replace(/^\//, "");
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ""}`;
}

/** Map used for `alternates.languages` (hreflang). */
export function languageAlternates(path = ""): Record<string, string> {
  const entries = LOCALES.map((locale) => [locale, absoluteUrl(locale, path)]);
  return {
    ...Object.fromEntries(entries),
    "x-default": absoluteUrl(DEFAULT_LOCALE, path),
  };
}
