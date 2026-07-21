import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/content/schema";
import { getContentSource } from "@/lib/content/source";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { RevealController } from "@/components/interactive/RevealController";
import { Hero } from "@/components/sections/Hero";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { FieldScenarios } from "@/components/sections/FieldScenarios";
import { OrgPersonas } from "@/components/sections/OrgPersonas";
import { SolutionPortfolio } from "@/components/sections/SolutionPortfolio";
import { ExpertServices } from "@/components/sections/ExpertServices";
import { TrustSection } from "@/components/sections/TrustSection";
import { GlobalSection } from "@/components/sections/GlobalSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const source = await getContentSource();
  const home = await source.getHome(locale as Locale);
  const tMeta = await getTranslations("meta");

  return (
    <>
      <OrganizationJsonLd
        locale={locale}
        name={tMeta("siteName")}
        description={tMeta("description")}
      />
      <RevealController />
      <Hero content={home.hero} />
      <ProcessPipeline content={home.process} />
      <FieldScenarios content={home.scenarios} />
      <OrgPersonas content={home.personas} />
      <SolutionPortfolio content={home.solutions} />
      <ExpertServices content={home.servicesSection} />
      <TrustSection content={home.trust} />
      <GlobalSection content={home.global} />
      <NewsSection news={home.news} partners={home.partners} />
      <ContactCta content={home.contactCta} />
    </>
  );
}
