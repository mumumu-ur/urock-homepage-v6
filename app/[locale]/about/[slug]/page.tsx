import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo/metadata";
import { DetailView } from "@/components/detail/DetailView";

const SLUGS = ["greeting", "history", "certifications", "global", "brand", "news", "location"] as const;

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const source = await getContentSource();
  const page = await source.getAbout(locale as Locale, slug);
  if (!page) return {};
  return buildMetadata({
    locale,
    path: `about/${slug}`,
    title: `${page.name} · UROCK`,
    description: page.summary,
  });
}

export default async function AboutSubPage({
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
  const page = await source.getAbout(locale as Locale, slug);
  if (!page) notFound();

  const active = tab && page.tabs.some((t) => t.id === tab) ? tab : page.tabs[0].id;
  const t = await getTranslations("common");

  return (
    <DetailView
      page={page}
      active={active}
      backHref={`/${locale}`}
      backLabel={t("backToHome")}
    />
  );
}
