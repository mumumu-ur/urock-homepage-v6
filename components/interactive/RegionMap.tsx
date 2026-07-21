"use client";

import { useState } from "react";
import type { Region } from "@/lib/content/schema";

const VW = 760;
const VH = 480;

export function RegionMap({ regions }: { regions: Region[] }) {
  const [activeKey, setActiveKey] = useState(regions[0]?.key ?? "");
  const active = regions.find((r) => r.key === activeKey) ?? regions[0];

  const toXY = (r: Region) => ({ cx: (r.x / 100) * VW, cy: (r.y / 100) * VH });
  const hq = regions[0] ? toXY(regions[0]) : { cx: 610, cy: 205 };

  return (
    <div
      className="cC-map-grid"
      style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "stretch" }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid rgb(var(--brand-muted) / 0.16)",
          borderRadius: 4,
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(28,40,70,.5), rgba(15,14,23,.9))",
          overflow: "hidden",
          minHeight: 440,
        }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          height="100%"
          style={{ display: "block" }}
          role="img"
          aria-label="UROCK global presence map"
        >
          <defs>
            <pattern id="cC-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="rgba(147,176,248,.16)" />
            </pattern>
            <radialGradient id="cC-hg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8CF4FF" />
              <stop offset="100%" stopColor="#6DE7EF" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={VW} height={VH} fill="url(#cC-dots)" />
          <g stroke="rgba(147,176,248,.12)" strokeWidth="1">
            <line x1="0" y1="120" x2="760" y2="120" />
            <line x1="0" y1="240" x2="760" y2="240" />
            <line x1="0" y1="360" x2="760" y2="360" />
            <line x1="190" y1="0" x2="190" y2="480" />
            <line x1="380" y1="0" x2="380" y2="480" />
            <line x1="570" y1="0" x2="570" y2="480" />
          </g>
          <g fill="rgba(147,176,248,.07)" stroke="rgba(147,176,248,.18)" strokeWidth="1">
            <path d="M120,150 Q220,110 340,140 Q460,120 560,170 Q640,200 660,280 Q600,330 500,330 Q420,360 340,340 Q240,350 180,300 Q110,250 120,150 Z" />
            <path d="M300,340 Q360,360 400,410 Q360,440 320,420 Q300,390 300,340 Z" />
          </g>
          <g fill="none" stroke="rgba(109,231,239,.4)" strokeWidth="1.4">
            {regions.slice(1).map((r) => {
              const { cx, cy } = toXY(r);
              const mx = (hq.cx + cx) / 2;
              const my = Math.min(hq.cy, cy) - 60;
              return (
                <path
                  key={r.key}
                  className="cC-arc"
                  d={`M${hq.cx},${hq.cy} Q${mx},${my} ${cx},${cy}`}
                />
              );
            })}
          </g>
          {regions.map((r, i) => {
            const { cx, cy } = toXY(r);
            const on = r.key === activeKey;
            const isHq = i === 0;
            return (
              <g
                key={r.key}
                className="cC-hot"
                role="button"
                tabIndex={0}
                aria-label={r.name}
                aria-pressed={on}
                onClick={() => setActiveKey(r.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveKey(r.key);
                  }
                }}
              >
                <circle cx={cx} cy={cy} r={isHq ? 16 : 13} fill="rgba(109,231,239,.12)" />
                <circle cx={cx} cy={cy} r={isHq ? 6 : 5} fill={isHq ? "url(#cC-hg)" : "#6DE7EF"} />
                {on && (
                  <circle cx={cx} cy={cy} r={18} fill="none" stroke="#8CF4FF" strokeWidth="1.5" opacity={0.8} />
                )}
              </g>
            );
          })}
        </svg>
        <div
          className="cC-mono"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgb(109 231 239 / 0.5)",
          }}
        >
          NODE_NETWORK · {regions.length} REGIONS
        </div>
      </div>

      <div
        className="cC-mono"
        style={{
          border: "1px solid rgb(var(--brand-muted) / 0.16)",
          borderRadius: 4,
          background: "rgb(15 14 23 / 0.6)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "13px 18px",
            borderBottom: "1px solid rgb(var(--brand-muted) / 0.12)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "rgb(var(--brand-muted) / 0.55)",
          }}
        >
          <span>REGION_INFO</span>
          <span style={{ color: "var(--brand-accent)" }}>{active.code}</span>
        </div>
        <div style={{ padding: "24px 20px", flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-pretendard)", letterSpacing: "-0.02em" }}>
            {active.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--brand-accent)", margin: "6px 0 16px" }}>{active.role}</div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "rgb(var(--brand-muted) / 0.6)", fontFamily: "var(--font-pretendard)" }}>
            {active.desc}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            padding: "14px 20px",
            borderTop: "1px solid rgb(var(--brand-muted) / 0.1)",
          }}
        >
          {regions.map((r) => {
            const on = r.key === activeKey;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setActiveKey(r.key)}
                aria-pressed={on}
                style={{
                  fontSize: 10,
                  padding: "5px 9px",
                  border: `1px solid ${on ? "var(--brand-accent)" : "rgb(var(--brand-muted) / 0.2)"}`,
                  background: on ? "rgb(109 231 239 / 0.1)" : "transparent",
                  color: on ? "var(--brand-accent-bright)" : "rgb(var(--brand-muted) / 0.7)",
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                {r.code}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
