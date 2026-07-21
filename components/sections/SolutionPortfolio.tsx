import type { SolutionsCarouselContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { SolutionCarousel } from "@/components/interactive/SolutionCarousel";

export function SolutionPortfolio({ content }: { content: SolutionsCarouselContent }) {
  return (
    <section
      id="cC-solutions"
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgb(var(--brand-muted) / 0.12)",
        borderBottom: "1px solid rgb(var(--brand-muted) / 0.12)",
        background: "rgb(255 255 255 / 0.015)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
        <div
          className="cC-rv"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}
        >
          <div style={{ maxWidth: 620 }}>
            <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
              {content.kicker}
            </div>
            <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              <AccentText segments={content.title} />
            </h2>
          </div>
          <p style={{ maxWidth: "32ch", fontSize: 14, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.55)", margin: 0 }}>
            {content.desc}
          </p>
        </div>
        <div className="cC-rv">
          <SolutionCarousel content={content} />
        </div>
      </div>
    </section>
  );
}
