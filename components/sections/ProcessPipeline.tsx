import type { ProcessContent } from "@/lib/content/schema";

export function ProcessPipeline({ content }: { content: ProcessContent }) {
  return (
    <section id="cC-viz" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
      <div
        className="cC-rv"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}
      >
        <div>
          <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
            {content.kicker}
          </div>
          <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            {content.title}
          </h2>
        </div>
        <p style={{ maxWidth: "34ch", fontSize: 14, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.55)", margin: 0 }}>
          {content.desc}
        </p>
      </div>
      <div className="cC-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {content.steps.map((step, i) => (
          <div
            key={i}
            className="cC-mod cC-rv"
            style={{
              border: `1px solid ${step.highlight ? "rgb(109 231 239 / 0.4)" : "rgb(var(--brand-muted) / 0.14)"}`,
              borderRadius: 3,
              padding: "26px 22px",
              background: step.highlight ? "rgb(109 231 239 / 0.06)" : "rgb(255 255 255 / 0.02)",
            }}
          >
            <div
              className="cC-mono"
              style={{ fontSize: 11, letterSpacing: "0.12em", color: step.highlight ? "var(--brand-accent)" : "rgb(var(--brand-muted) / 0.5)", marginBottom: 16 }}
            >
              {step.step}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: step.highlight ? "var(--brand-accent-bright)" : undefined }}>
              {step.title}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: step.highlight ? "rgb(var(--brand-muted) / 0.7)" : "rgb(var(--brand-muted) / 0.58)" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
