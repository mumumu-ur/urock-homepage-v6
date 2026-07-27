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
  const title = locale === "ko" ? "고객지원 · UROCK" : "Support · UROCK";
  const description =
    locale === "ko"
      ? "문의하기, 자주 찾는 질문, 지원환경(OS) 및 사양 안내."
      : "Contact us, FAQ, and supported environments (OS) & specifications.";
  return buildMetadata({ locale, path: "support", title, description });
}

export default async function SupportIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const source = await getContentSource();
  const items = await source.getSupportPage(locale as Locale, "faq").then(async (faq) => {
    const environment = await source.getSupportPage(locale as Locale, "environment");
    return [faq, environment].filter((p): p is NonNullable<typeof p> => p !== null);
  });
  const t = await getTranslations("common");

  return (
    <DetailIndex
      kicker="// SUPPORT"
      title={locale === "ko" ? "고객지원" : "Support"}
      items={items}
      basePath={`/${locale}/support`}
      moreLabel={t("learnMore")}
    />
  );
}
