import type { TrustContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";

export function TrustSection({ content }: { content: TrustContent }) {
  return (
    <section
      id="cC-trust"
      style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgb(var(--brand-muted) / 0.12)", background: "rgb(255 255 255 / 0.015)" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 32px" }}>
        <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 36 }}>
          <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
            {content.kicker}
          </div>
          <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            <AccentText segments={content.title} />
          </h2>
        </div>
        <div className="cC-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {content.items.map((item, i) => (
            <div key={i} className="cC-rv" style={{ borderLeft: `2px solid ${item.color}`, padding: "4px 0 4px 20px" }}>
              <div className="cC-mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: item.color, marginBottom: 10 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{item.name}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgb(var(--brand-muted) / 0.55)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
