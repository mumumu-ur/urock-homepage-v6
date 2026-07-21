import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/interactive/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale,
    path: "contact",
    title: `${t("title")} · UROCK`,
    description: t("subtitle"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: "72px 32px 96px" }}>
      <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
        // CONTACT
      </div>
      <h1 style={{ margin: 0, fontSize: 40, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.12 }}>
        {t("title")}
      </h1>
      <p style={{ margin: "18px 0 40px", fontSize: 16, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.66)", maxWidth: "56ch" }}>
        {t("subtitle")}
      </p>
      <ContactForm />
    </section>
  );
}
