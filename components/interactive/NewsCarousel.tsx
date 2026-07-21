"use client";

import { useRef, useState } from "react";
import type { NewsContent } from "@/lib/content/schema";

const CATEGORY_COLOR: Record<string, string> = {
  news: "var(--brand-accent)",
  product: "var(--brand-blue)",
  expo: "#B7A5FF",
};
const CATEGORY_CODE: Record<string, string> = {
  news: "NEWS",
  product: "UPDATE",
  expo: "EXPO",
};

export function NewsCarousel({ content }: { content: NewsContent }) {
  const [filter, setFilter] = useState("all");
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = content.items.filter(
    (item) => filter === "all" || item.category === filter,
  );

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".cC-news-card");
    const step = (card?.getBoundingClientRect().width ?? 260) + 16;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        className="cC-rv"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {content.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`cC-news-tab${filter === f.id ? " on" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="cC-news-arrow" aria-label="Previous" onClick={() => scrollBy(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="cC-news-arrow" aria-label="Next" onClick={() => scrollBy(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={trackRef} className="cC-news-track cC-rv">
        {visible.map((item) => {
          const color = CATEGORY_COLOR[item.category] ?? "var(--brand-accent)";
          return (
            <a
              key={item.id}
              href={item.href}
              className="cC-news-card cC-mod"
              style={{
                border: "1px solid rgb(var(--brand-muted) / 0.14)",
                borderRadius: 6,
                background: "rgb(255 255 255 / 0.02)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16 / 10",
                  background: `radial-gradient(circle at 30% 24%, color-mix(in srgb, ${color} 22%, transparent), transparent 60%), #161522`,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 14,
                }}
              >
                <span className="cC-mono" style={{ fontSize: 10, letterSpacing: "0.12em", color }}>
                  {CATEGORY_CODE[item.category] ?? "NEWS"}
                </span>
              </div>
              <div style={{ padding: "18px 18px 20px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                  <span className="cC-news-tag" style={{ borderColor: `color-mix(in srgb, ${color} 40%, transparent)`, color }}>
                    {item.categoryLabel}
                  </span>
                  <span className="cC-news-tag">{item.tag}</span>
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.5, marginBottom: 10, color: "var(--brand-fg)" }}>
                  {item.title}
                </div>
                <div className="cC-mono" style={{ fontSize: 10.5, color: "rgb(var(--brand-muted) / 0.4)" }}>
                  {item.date}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
