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
  const title = locale === "ko" ? "전문 서비스 · UROCK" : "Expert Services · UROCK";
  const description =
    locale === "ko"
      ? "보안진단, 디지털 포렌식 분석, 교육, 안심삭제 전문 서비스."
      : "Security diagnosis, digital forensic analysis, training, and secure erasure services.";
  return buildMetadata({ locale, path: "services", title, description });
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const source = await getContentSource();
  const items = await source.getServices(locale as Locale);
  const t = await getTranslations("common");

  return (
    <DetailIndex
      kicker="// EXPERT SERVICES"
      title={locale === "ko" ? "전문 서비스" : "Expert Services"}
      items={items}
      basePath={`/${locale}/services`}
      moreLabel={t("learnMore")}
    />
  );
}
