import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo/metadata";
import { DetailView } from "@/components/detail/DetailView";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const source = await getContentSource();
  const solutions = await source.getSolutions(routing.defaultLocale);
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const source = await getContentSource();
  const page = await source.getSolution(locale as Locale, slug);
  if (!page) return {};
  return buildMetadata({
    locale,
    path: `solutions/${slug}`,
    title: `${page.name} · UROCK`,
    description: page.summary,
  });
}

export default async function SolutionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale, slug } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);

  const source = await getContentSource();
  const page = await source.getSolution(locale as Locale, slug);
  if (!page) notFound();

  const active = tab && page.tabs.some((t) => t.id === tab) ? tab : page.tabs[0].id;
  const t = await getTranslations("common");

  return (
    <DetailView
      page={page}
      active={active}
      backHref={`/${locale}#cC-solutions`}
      backLabel={t("backToHome")}
    />
  );
}
