import type { ScenariosContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function FieldScenarios({ content }: { content: ScenariosContent }) {
  return (
    <section
      id="cC-cases"
      style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgb(var(--brand-muted) / 0.12)", background: "rgb(255 255 255 / 0.015)" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
        <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 40 }}>
          <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
            {content.kicker}
          </div>
          <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            <AccentText segments={content.title} />
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 14, color: "rgb(var(--brand-muted) / 0.55)" }}>{content.desc}</p>
        </div>
        <div
          className="cC-g4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgb(var(--brand-muted) / 0.12)",
            border: "1px solid rgb(var(--brand-muted) / 0.12)",
          }}
        >
          {content.items.map((item, i) => (
            <a key={i} href={item.href} className="cC-mod" style={{ background: "var(--brand-bg)", padding: "26px 22px" }}>
              <MaterialIcon name={item.icon} size={23} color="var(--brand-accent)" />
              <div style={{ fontSize: 16, fontWeight: 600, margin: "14px 0 8px" }}>{item.title}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "rgb(var(--brand-muted) / 0.55)" }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
