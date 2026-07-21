import type { PersonasContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function OrgPersonas({ content }: { content: PersonasContent }) {
  return (
    <section id="cC-org" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
      <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 40 }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
          {content.kicker}
        </div>
        <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          <AccentText segments={content.title} />
        </h2>
      </div>
      <div className="cC-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {content.items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="cC-mod cC-rv"
            style={{
              border: `1px solid ${item.highlight ? "rgb(109 231 239 / 0.35)" : "rgb(var(--brand-muted) / 0.14)"}`,
              borderRadius: 3,
              padding: "26px 24px",
              background: item.highlight ? "rgb(109 231 239 / 0.05)" : "rgb(255 255 255 / 0.02)",
            }}
          >
            <MaterialIcon name={item.icon} size={24} color={item.iconColor ?? "var(--brand-blue)"} />
            <div style={{ fontSize: 17, fontWeight: 600, margin: "14px 0 8px" }}>{item.title}</div>
            <p style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.6, color: item.highlight ? "rgb(var(--brand-muted) / 0.7)" : "rgb(var(--brand-muted) / 0.55)" }}>
              {item.desc}
            </p>
            {item.tag && (
              <div className="cC-mono" style={{ fontSize: 11, color: "var(--brand-accent)" }}>
                {item.tag}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
