import type { HeroContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { HeroCanvas } from "@/components/interactive/HeroCanvas";
import { CtaButton } from "@/components/interactive/CtaButton";

const TONE: Record<string, string> = {
  blue: "var(--brand-blue)",
  teal: "var(--brand-accent)",
  bright: "var(--brand-accent-bright)",
};

const LEGEND = ["#1C2846", "#364D87", "#4663AE", "#628CF5", "#7D6CFF", "#6DE7EF", "#8CF4FF"];

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id="cC-hero"
      style={{
        position: "relative",
        zIndex: 2,
        borderBottom: "1px solid rgb(var(--brand-muted) / 0.12)",
        overflow: "hidden",
      }}
    >
      <HeroCanvas />
      <div
        aria-hidden="true"
        className="cC-mono"
        style={{ position: "absolute", top: 16, left: 32, zIndex: 2, fontSize: 10, letterSpacing: "0.1em", color: "rgb(109 231 239 / 0.55)" }}
      >
        + 00.00
      </div>
      <div
        aria-hidden="true"
        className="cC-mono"
        style={{ position: "absolute", bottom: 16, right: 32, zIndex: 2, fontSize: 10, letterSpacing: "0.1em", color: "rgb(109 231 239 / 0.55)" }}
      >
        FALSE-COLOR / HALFTONE +
      </div>

      <div
        className="cC-hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "96px 32px 80px",
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="cC-mono cC-rv"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "var(--brand-accent)",
              marginBottom: 26,
              border: "1px solid rgb(109 231 239 / 0.3)",
              padding: "6px 12px",
              borderRadius: 2,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-accent)", boxShadow: "0 0 10px var(--brand-accent)" }} />
            {content.badge}
          </div>
          <h1
            className="cC-hero-h1 cC-rv"
            style={{ margin: 0, fontSize: 56, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em" }}
          >
            <AccentText segments={content.title} />
          </h1>
          <p
            className="cC-rv"
            style={{ margin: "28px 0 0", maxWidth: "52ch", fontSize: 16, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.72)" }}
          >
            {content.lead}
          </p>
          <p
            className="cC-mono cC-rv"
            style={{ margin: "14px 0 0", maxWidth: "52ch", fontSize: 12.5, lineHeight: 1.7, color: "rgb(140 244 255 / 0.7)" }}
          >
            {content.monoNote}
          </p>
          <div className="cC-rv" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <CtaButton cta={content.primaryCta} variant="filled" color="primary" size="L" />
            <CtaButton cta={content.secondaryCta} variant="outlined" color="secondary" size="L" />
          </div>
        </div>

        <div
          className="cC-rv cC-mono"
          style={{
            border: "1px solid rgb(var(--brand-muted) / 0.16)",
            borderRadius: 3,
            background: "rgb(15 14 23 / 0.5)",
            backdropFilter: "blur(6px)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid rgb(var(--brand-muted) / 0.12)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "rgb(var(--brand-muted) / 0.55)",
            }}
          >
            <span>{content.readout.header}</span>
            <span style={{ color: "var(--brand-accent)" }}>{content.readout.status}</span>
          </div>
          <div style={{ padding: "8px 16px" }}>
            {content.readout.rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "11px 0",
                  borderBottom: i === content.readout.rows.length - 1 ? "none" : "1px solid rgb(var(--brand-muted) / 0.07)",
                  fontSize: 12.5,
                }}
              >
                <span style={{ color: "rgb(var(--brand-muted) / 0.6)" }}>{row.label}</span>
                <span style={{ color: TONE[row.tone] }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", height: 8 }}>
            {LEGEND.map((c) => (
              <span key={c} style={{ flex: 1, background: c }} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 16px 12px",
              fontSize: 9.5,
              letterSpacing: "0.08em",
              color: "rgb(var(--brand-muted) / 0.4)",
            }}
          >
            <span>{content.readout.legendLow}</span>
            <span>{content.readout.legendHigh}</span>
          </div>
        </div>
      </div>

      <div
        className="cC-g3"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid rgb(var(--brand-muted) / 0.12)",
        }}
      >
        {content.scope.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="cC-mod"
            style={{
              padding: "22px 32px",
              borderRight: i === content.scope.length - 1 ? "none" : "1px solid rgb(var(--brand-muted) / 0.12)",
            }}
          >
            <div className="cC-mono" style={{ fontSize: 11, color: "var(--brand-accent)", letterSpacing: "0.1em", marginBottom: 10 }}>
              {s.index}
            </div>
            <div style={{ fontSize: 15, color: "rgb(var(--brand-muted) / 0.85)" }}>{s.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
