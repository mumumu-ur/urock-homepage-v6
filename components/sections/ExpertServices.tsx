import type { ServicesSectionContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function ExpertServices({ content }: { content: ServicesSectionContent }) {
  return (
    <section id="cC-services" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
      <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 40 }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
          {content.kicker}
        </div>
        <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          <AccentText segments={content.title} />
        </h2>
      </div>
      <div className="cC-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {content.items.map((item, i) => (
          <div
            key={i}
            className="cC-mod cC-rv"
            style={{ border: "1px solid rgb(var(--brand-muted) / 0.14)", borderRadius: 3, padding: "26px 22px", background: "rgb(255 255 255 / 0.02)" }}
          >
            <MaterialIcon name={item.icon} size={24} color="var(--brand-accent)" />
            <div style={{ fontSize: 16, fontWeight: 600, margin: "14px 0 8px" }}>{item.title}</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgb(var(--brand-muted) / 0.56)" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
