"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { SolutionsCarouselContent } from "@/lib/content/schema";
import { CtaButton } from "./CtaButton";

const KICKER_COLORS = ["var(--brand-blue)", "#B7A5FF", "var(--brand-accent)", "var(--brand-accent-bright)"];

export function SolutionCarousel({ content }: { content: SolutionsCarouselContent }) {
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const slides = content.slides;
  const slide = slides[active];
  const accent = KICKER_COLORS[active % KICKER_COLORS.length];
  const unit = locale === "ko" ? "종" : " items";

  return (
    <div
      className="cC-caro"
      style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "stretch" }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid rgb(var(--brand-muted) / 0.16)",
          borderRadius: 4,
          background: "rgb(15 14 23 / 0.6)",
          overflow: "hidden",
          minHeight: 440,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 440 }}>
          <div style={{ padding: "38px 34px", display: "flex", flexDirection: "column" }}>
            <div
              className="cC-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                fontSize: 11,
                letterSpacing: "0.14em",
                color: accent,
                marginBottom: "auto",
              }}
            >
              {slide.kicker}
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", margin: "24px 0 4px" }}>
              {slide.series}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: accent, marginBottom: 12 }}>
              {slide.title}
            </div>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "rgb(var(--brand-muted) / 0.62)",
              }}
            >
              {slide.desc}
            </p>
            <div style={{ marginTop: "auto" }}>
              <CtaButton cta={slide.cta} variant="filled" color="primary" size="M" />
            </div>
          </div>
          <div
            style={{
              borderLeft: "1px solid rgb(var(--brand-muted) / 0.12)",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "rgb(147 176 248 / 0.03)",
            }}
          >
            {slide.points.map((p, i) => {
              const [name, ...rest] = p.split(" · ");
              const desc = rest.join(" · ");
              const isLast = i === slide.points.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    padding: "13px 0",
                    borderBottom: isLast ? "none" : "1px solid rgb(var(--brand-muted) / 0.08)",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{name}</span>
                  {desc && (
                    <p
                      style={{
                        margin: "5px 0 0",
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "rgb(var(--brand-muted) / 0.55)",
                      }}
                    >
                      {desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="cC-mono"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderTop: "1px solid rgb(var(--brand-muted) / 0.1)",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgb(var(--brand-muted) / 0.4)",
            background: "rgb(15 14 23 / 0.7)",
          }}
        >
          <span>
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <span>PORTFOLIO_STREAM</span>
        </div>
      </div>

      <div className="cC-thumbs" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {slides.map((s, i) => {
          const on = i === active;
          const topCode = `${String(i + 1).padStart(2, "0")} · ${s.kicker.split(" ")[0]}`;
          return (
            <button
              key={s.id}
              type="button"
              className={`cC-thumb cC-mono${on ? " on" : ""}`}
              aria-current={on ? "true" : undefined}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              style={{
                textAlign: "left",
                border: "1px solid rgb(var(--brand-muted) / 0.16)",
                borderRadius: 3,
                background: "rgb(255 255 255 / 0.02)",
                padding: 16,
                cursor: "pointer",
                color: "var(--brand-fg)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: KICKER_COLORS[i % KICKER_COLORS.length], marginBottom: 8 }}>
                {topCode}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-pretendard)" }}>
                {s.series}
              </div>
              <div style={{ fontSize: 11, color: "rgb(var(--brand-muted) / 0.5)", fontFamily: "var(--font-pretendard)", marginTop: 3 }}>
                {s.points.length}
                {unit}
              </div>
              <span
                className="cC-thumb-bar"
                style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: 0, background: "var(--brand-accent)" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
