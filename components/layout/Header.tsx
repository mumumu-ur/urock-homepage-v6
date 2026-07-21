import { getLocale, getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV = [
  { id: "cC-solutions", key: "solutions" },
  { id: "cC-services", key: "services" },
  { id: "cC-cases", key: "field" },
  { id: "cC-trust", key: "trust" },
  { id: "cC-global", key: "global" },
  { id: "cC-contact", key: "contact" },
] as const;

export async function Header() {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 110,
        background: "rgb(15 14 23 / 0.86)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgb(var(--brand-muted) / 0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <a href={`/${locale}`} aria-label="UROCK home" style={{ display: "inline-flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/UROCK_white.svg" alt="UROCK" style={{ height: 19, width: "auto" }} />
          </a>
          <nav
            className="cC-nav cC-mono"
            style={{
              display: "flex",
              gap: 20,
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {NAV.map((item) => (
              <a key={item.id} href={`/${locale}#${item.id}`}>
                {t(item.key)}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="cC-mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "rgb(var(--brand-muted) / 0.5)",
          }}
        >
          <span aria-hidden>
            SYS · <span style={{ color: "var(--brand-accent)" }}>ONLINE</span>
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
