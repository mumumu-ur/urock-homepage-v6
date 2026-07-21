import type { DetailPage } from "@/lib/content/schema";

export function DetailIndex({
  title,
  kicker,
  items,
  basePath,
  moreLabel,
}: {
  title: string;
  kicker: string;
  items: DetailPage[];
  basePath: string;
  moreLabel: string;
}) {
  return (
    <section style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "72px 32px 96px" }}>
      <div style={{ marginBottom: 40 }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
          {kicker}
        </div>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.12 }}>{title}</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {items.map((item) => (
          <a
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="cC-mod"
            style={{
              border: "1px solid rgb(var(--brand-muted) / 0.14)",
              borderRadius: 4,
              padding: "26px 24px",
              background: "rgb(255 255 255 / 0.02)",
              display: "block",
            }}
          >
            <div className="cC-mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--brand-accent)", marginBottom: 12 }}>
              {item.kicker}
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{item.name}</div>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.6, color: "rgb(var(--brand-muted) / 0.6)" }}>
              {item.summary}
            </p>
            <span className="cC-mono" style={{ fontSize: 11, color: "var(--brand-accent-bright)" }}>
              {moreLabel} →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
