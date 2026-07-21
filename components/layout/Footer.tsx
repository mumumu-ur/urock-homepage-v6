import { getLocale } from "next-intl/server";

export async function Footer() {
  const locale = await getLocale();
  const h = (id: string) => `/${locale}#${id}`;

  const cols = [
    {
      title: "SOLUTION",
      links: [
        { label: "DFAS Series", href: h("cC-solutions") },
        { label: "GateManager", href: h("cC-solutions") },
        { label: "M-SecuManager", href: h("cC-solutions") },
      ],
    },
    {
      title: "SERVICE",
      links: [
        { label: locale === "ko" ? "보안진단" : "Diagnosis", href: h("cC-services") },
        { label: locale === "ko" ? "포렌식 분석" : "Forensics", href: h("cC-services") },
        { label: locale === "ko" ? "교육·삭제" : "Training & Erasure", href: h("cC-services") },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "TRUST", href: h("cC-trust") },
        { label: "GLOBAL", href: h("cC-global") },
        { label: "CONTACT", href: `/${locale}/contact` },
      ],
    },
  ];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        background: "#0B0A12",
        borderTop: "1px solid rgb(var(--brand-muted) / 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "56px 32px 40px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/UROCK_white.svg" alt="UROCK" style={{ height: 19, marginBottom: 16 }} />
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgb(var(--brand-muted) / 0.45)",
              maxWidth: 340,
            }}
          >
            {locale === "ko" ? (
              <>
                보이지 않는 진실을 발견하고 연결합니다.
                <br />
                주식회사 유락 · AI 디지털 포렌식 전문기업
              </>
            ) : (
              <>
                We discover and connect the invisible truth.
                <br />
                UROCK Inc. · AI Digital Forensics
              </>
            )}
          </p>
        </div>
        <div
          className="cC-mono"
          style={{ display: "flex", gap: 44, fontSize: 12, flexWrap: "wrap" }}
        >
          {cols.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span
                style={{
                  color: "rgb(var(--brand-muted) / 0.4)",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {col.title}
              </span>
              {col.links.map((l, i) => (
                <a key={i} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="cC-mono" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px 36px" }}>
        <div
          style={{
            paddingTop: 20,
            borderTop: "1px solid rgb(var(--brand-muted) / 0.08)",
            fontSize: 11,
            color: "rgb(var(--brand-muted) / 0.3)",
          }}
        >
          © 2026 UROCK Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
