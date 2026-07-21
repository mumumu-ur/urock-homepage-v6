import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo/metadata";
import { DetailIndex } from "@/components/detail/DetailIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ko" ? "솔루션 · UROCK" : "Solutions · UROCK";
  const description =
    locale === "ko"
      ? "UROCK의 AI 디지털 포렌식 제품군: DFAS, GateManager, M-SecuManager."
      : "UROCK's AI digital forensics product lines: DFAS, GateManager, M-SecuManager.";
  return buildMetadata({ locale, path: "solutions", title, description });
}

export default async function SolutionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const source = await getContentSource();
  const items = await source.getSolutions(locale as Locale);
  const t = await getTranslations("common");

  return (
    <DetailIndex
      kicker="// SOLUTIONS"
      title={locale === "ko" ? "솔루션" : "Solutions"}
      items={items}
      basePath={`/${locale}/solutions`}
      moreLabel={t("learnMore")}
    />
  );
}
