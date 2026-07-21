import { getLocale, getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const [t, locale] = await Promise.all([getTranslations("common"), getLocale()]);
  return (
    <section style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "120px 32px", textAlign: "center" }}>
      <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 16 }}>
        404
      </div>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em" }}>{t("notFoundTitle")}</h1>
      <p style={{ margin: "16px 0 32px", fontSize: 15, color: "rgb(var(--brand-muted) / 0.6)" }}>{t("notFoundBody")}</p>
      <a href={`/${locale}`} className="cC-mono" style={{ fontSize: 13 }}>
        ← {t("backToHome")}
      </a>
    </section>
  );
}
