import { Suspense } from "react";
import type { DetailPage } from "@/lib/content/schema";
import { DetailTabsNav } from "./DetailTabsNav";

async function TabPanel({ page, active }: { page: DetailPage; active: string }) {
  const tab = page.tabs.find((t) => t.id === active) ?? page.tabs[0];
  return (
    <div>
      <h2 style={{ margin: "0 0 18px", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
        {tab.heading}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tab.body.map((line, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgb(var(--brand-muted) / 0.72)",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function PanelFallback() {
  return (
    <div className="cC-mono" style={{ fontSize: 12, color: "rgb(var(--brand-muted) / 0.5)", padding: "8px 0" }}>
      loading…
    </div>
  );
}

export function DetailView({
  page,
  active,
  backHref,
  backLabel,
}: {
  page: DetailPage;
  active: string;
  backHref: string;
  backLabel: string;
}) {
  const activeLabel = page.tabs.find((t) => t.id === active)?.label ?? "";
  return (
    <section style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", padding: "72px 32px 96px" }}>
      <a href={backHref} className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
        ← {backLabel}
      </a>
      <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", margin: "24px 0 12px" }}>
        {page.kicker}
      </div>
      <h1 style={{ margin: 0, fontSize: 40, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.12 }}>
        {page.name}
      </h1>
      <p style={{ margin: "18px 0 36px", fontSize: 16, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.66)", maxWidth: "60ch" }}>
        {page.summary}
      </p>

      <DetailTabsNav tabs={page.tabs.map((t) => ({ id: t.id, label: t.label }))} active={active} />

      <div
        role="tabpanel"
        aria-label={activeLabel}
        tabIndex={0}
        style={{
          marginTop: 28,
          padding: "32px 28px",
          border: "1px solid rgb(var(--brand-muted) / 0.14)",
          borderRadius: 4,
          background: "rgb(255 255 255 / 0.02)",
          minHeight: 180,
        }}
      >
        <Suspense key={active} fallback={<PanelFallback />}>
          <TabPanel page={page} active={active} />
        </Suspense>
      </div>

      {page.links && page.links.length > 0 ? (
        <nav
          aria-label="related"
          style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}
        >
          {page.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cC-mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.06em",
                padding: "10px 16px",
                border: "1px solid rgb(var(--brand-muted) / 0.18)",
                borderRadius: 4,
                color: "var(--brand-accent-bright)",
              }}
            >
              {link.label} →
            </a>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
