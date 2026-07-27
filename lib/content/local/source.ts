import type { ContentSource } from "../source";
import type { DetailPage, HomeContent, Locale } from "../schema";
import { homeKo, solutionsKo, servicesKo, productsKo, aboutKo, supportKo } from "./ko";
import { homeEn, solutionsEn, servicesEn, productsEn, aboutEn, supportEn } from "./en";

const home: Record<Locale, HomeContent> = { ko: homeKo, en: homeEn };
const solutions: Record<Locale, DetailPage[]> = { ko: solutionsKo, en: solutionsEn };
const services: Record<Locale, DetailPage[]> = { ko: servicesKo, en: servicesEn };
/** Keyed by `${series}/${product}` so future products can be added without
 * new plumbing. Values are locale-keyed DetailPages. */
const products: Record<Locale, Record<string, DetailPage>> = {
  ko: productsKo,
  en: productsEn,
};
const about: Record<Locale, DetailPage[]> = { ko: aboutKo, en: aboutEn };
const support: Record<Locale, DetailPage[]> = { ko: supportKo, en: supportEn };

export const localSource: ContentSource = {
  async getHome(locale) {
    return home[locale] ?? home.ko;
  },
  async getSolutions(locale) {
    return solutions[locale] ?? solutions.ko;
  },
  async getSolution(locale, slug) {
    return (solutions[locale] ?? solutions.ko).find((s) => s.slug === slug) ?? null;
  },
  async getServices(locale) {
    return services[locale] ?? services.ko;
  },
  async getService(locale, slug) {
    return (services[locale] ?? services.ko).find((s) => s.slug === slug) ?? null;
  },
  async getProduct(locale, series, product) {
    const key = `${series}/${product}`;
    return (products[locale] ?? products.ko)[key] ?? null;
  },
  async getAbout(locale, slug) {
    return (about[locale] ?? about.ko).find((s) => s.slug === slug) ?? null;
  },
  async getSupportPage(locale, slug) {
    return (support[locale] ?? support.ko).find((s) => s.slug === slug) ?? null;
  },
};
