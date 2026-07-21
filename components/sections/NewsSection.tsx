import type { NewsContent, PartnersContent } from "@/lib/content/schema";
import { NewsCarousel } from "@/components/interactive/NewsCarousel";

export function NewsSection({
  news,
  partners,
}: {
  news: NewsContent;
  partners: PartnersContent;
}) {
  return (
    <section
      id="cC-partners"
      style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgb(var(--brand-muted) / 0.12)", background: "rgb(255 255 255 / 0.015)" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "72px 32px" }}>
        <div className="cC-rv cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "rgb(var(--brand-muted) / 0.5)", marginBottom: 24 }}>
          {partners.kicker}
        </div>
        <div
          className="cC-rv"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1,
            background: "rgb(var(--brand-muted) / 0.1)",
            border: "1px solid rgb(var(--brand-muted) / 0.1)",
            marginBottom: 56,
          }}
        >
          {partners.items.map((p, i) => (
            <div
              key={i}
              className="cC-mono"
              style={{ background: "var(--brand-bg)", padding: "26px 10px", textAlign: "center", fontSize: 12, letterSpacing: "0.08em", color: "rgb(var(--brand-muted) / 0.35)" }}
            >
              {p}
            </div>
          ))}
        </div>

        <div
          className="cC-rv"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 20 }}
        >
          <h3 className="cC-mono" style={{ margin: 0, fontSize: 12, letterSpacing: "0.14em", color: "rgb(var(--brand-muted) / 0.5)" }}>
            {news.kicker}
          </h3>
        </div>

        <NewsCarousel content={news} />
      </div>
    </section>
  );
}
