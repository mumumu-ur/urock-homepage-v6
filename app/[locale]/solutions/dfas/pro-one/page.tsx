import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo/metadata";
import { DetailView } from "@/components/detail/DetailView";

/** DFAS Pro One is a single unified product with one route.
 * Windows / macOS / Linux are NOT separate routes or SEO pages — they are
 * async tab content synced to ?tab= on this page (deep link / refresh /
 * back-forward supported by DetailTabsNav). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const source = await getContentSource();
  const page = await source.getProduct(locale as Locale, "dfas", "pro-one");
  if (!page) return {};
  return buildMetadata({
    locale,
    path: "solutions/dfas/pro-one",
    title: `${page.name} · UROCK`,
    description: page.summary,
  });
}

export default async function DfasProOnePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);

  const source = await getContentSource();
  const page = await source.getProduct(locale as Locale, "dfas", "pro-one");
  if (!page) notFound();

  const active = tab && page.tabs.some((t) => t.id === tab) ? tab : page.tabs[0].id;
  const t = await getTranslations("common");

  return (
    <DetailView
      page={page}
      active={active}
      backHref={`/${locale}/solutions/dfas`}
      backLabel={t("backToHome")}
    />
  );
}
