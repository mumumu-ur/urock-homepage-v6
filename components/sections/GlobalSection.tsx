import type { GlobalContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { RegionMap } from "@/components/interactive/RegionMap";

export function GlobalSection({ content }: { content: GlobalContent }) {
  return (
    <section id="cC-global" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
      <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 36 }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
          {content.kicker}
        </div>
        <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          <AccentText segments={content.title} />
        </h2>
        <p style={{ margin: "16px 0 0", fontSize: 14, color: "rgb(var(--brand-muted) / 0.55)" }}>{content.desc}</p>
      </div>
      <div className="cC-rv">
        <RegionMap regions={content.regions} />
      </div>
    </section>
  );
}
