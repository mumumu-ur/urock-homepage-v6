import type { ContactCtaContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { CtaButton } from "@/components/interactive/CtaButton";

export function ContactCta({ content }: { content: ContactCtaContent }) {
  return (
    <section
      id="cC-contact"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        textAlign: "center",
        padding: "110px 32px",
        background: "radial-gradient(ellipse at 50% 130%, rgba(109,231,239,.14), #0F0E17 60%)",
      }}
    >
      <div className="cC-rv" style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto" }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--brand-accent)", marginBottom: 20 }}>
          {content.kicker}
        </div>
        <h2 className="cC-h2" style={{ margin: 0, fontSize: 46, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.16 }}>
          <AccentText segments={content.title} />
        </h2>
        <p style={{ margin: "24px auto 0", maxWidth: "48ch", fontSize: 15, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.66)" }}>
          {content.desc}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          <CtaButton cta={content.cta} variant="filled" color="primary" size="L" />
        </div>
      </div>
    </section>
  );
}
