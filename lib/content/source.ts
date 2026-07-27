import type { DetailPage, HomeContent, Locale } from "./schema";

/** Stable content contract. Implemented by the local source today and by a
 * headless CMS adapter in the future (selected via CONTENT_SOURCE env). */
export interface ContentSource {
  getHome(locale: Locale): Promise<HomeContent>;
  getSolutions(locale: Locale): Promise<DetailPage[]>;
  getSolution(locale: Locale, slug: string): Promise<DetailPage | null>;
  getServices(locale: Locale): Promise<DetailPage[]>;
  getService(locale: Locale, slug: string): Promise<DetailPage | null>;
  /** Product detail nested under a solution series (e.g. dfas/pro-one).
   * Tab content (Win/Mac/Linux) lives inside DetailPage.tabs so each tab can be
   * managed independently once a CMS is connected. */
  getProduct(
    locale: Locale,
    series: string,
    product: string,
  ): Promise<DetailPage | null>;
  getAbout(locale: Locale, slug: string): Promise<DetailPage | null>;
  getSupportPage(locale: Locale, slug: string): Promise<DetailPage | null>;
}

let cached: ContentSource | null = null;

export async function getContentSource(): Promise<ContentSource> {
  if (cached) return cached;

  const kind = process.env.CONTENT_SOURCE ?? "local";
  switch (kind) {
    // case "cms": {
    //   const { cmsSource } = await import("./cms/source");
    //   cached = cmsSource;
    //   break;
    // }
    case "local":
    default: {
      const { localSource } = await import("./local/source");
      cached = localSource;
      break;
    }
  }
  return cached;
}
