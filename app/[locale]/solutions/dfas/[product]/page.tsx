import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo/metadata";
import { DetailView } from "@/components/detail/DetailView";

const PRODUCTS = ["edge", "go", "discovery", "arc"] as const;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ product }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}): Promise<Metadata> {
  const { locale, product } = await params;
  const source = await getContentSource();
  const page = await source.getProduct(locale as Locale, "dfas", product);
  if (!page) return {};
  return buildMetadata({
    locale,
    path: `solutions/dfas/${product}`,
    title: `${page.name} · UROCK`,
    description: page.summary,
  });
}

export default async function DfasProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; product: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale, product } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);

  const source = await getContentSource();
  const page = await source.getProduct(locale as Locale, "dfas", product);
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
