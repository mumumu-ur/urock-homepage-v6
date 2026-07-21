import { getLocale, getTranslations } from "next-intl/server";

export async function FloatingContact() {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);

  return (
    <a
      href={`/${locale}/contact`}
      className="cC-fab cC-mono"
      style={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "14px 18px",
        border: "1px solid var(--brand-accent)",
        borderRadius: 2,
        cursor: "pointer",
        background: "rgb(109 231 239 / 0.12)",
        color: "var(--brand-accent-bright)",
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: "0.02em",
        boxShadow: "0 0 24px rgb(109 231 239 / 0.2)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--brand-accent)",
          boxShadow: "0 0 8px var(--brand-accent)",
          animation: "cC-blink 1.6s infinite",
        }}
      />
      {t("requestScan")}
    </a>
  );
}
