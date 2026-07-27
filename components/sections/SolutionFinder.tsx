"use client";

import type { SolutionFinderContent } from "@/lib/content/schema";
import { AccentText } from "@/components/ui/AccentText";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@workspace/ui/components/tabs";

export function SolutionFinder({ content }: { content: SolutionFinderContent }) {
  return (
    <section id="cC-org" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "88px 32px" }}>
      <div className="cC-rv" style={{ maxWidth: 640, marginBottom: 40 }}>
        <div className="cC-mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--brand-accent)", marginBottom: 14 }}>
          {content.kicker}
        </div>
        <h2 className="cC-h2" style={{ margin: 0, fontSize: 38, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          <AccentText segments={content.title} />
        </h2>
        <p style={{ margin: "16px 0 0", fontSize: 14, color: "rgb(var(--brand-muted) / 0.55)" }}>{content.desc}</p>
      </div>

      <Tabs defaultValue={content.tabs[0]?.id} className="cC-rv">
        <TabsList
          className="cC-mono"
          style={{
            background: "rgb(255 255 255 / 0.03)",
            border: "1px solid rgb(var(--brand-muted) / 0.14)",
            height: "auto",
            padding: 4,
            marginBottom: 32,
          }}
        >
          {content.tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} style={{ padding: "8px 20px" }}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {content.tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} style={{ marginTop: 0 }}>
            <div className="cC-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {tab.items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="cC-mod"
                  style={{
                    border: "1px solid rgb(var(--brand-muted) / 0.14)",
                    borderRadius: 3,
                    padding: "26px 24px",
                    background: "rgb(255 255 255 / 0.02)",
                  }}
                >
                  <MaterialIcon name={item.icon} size={24} color={item.iconColor ?? "var(--brand-accent)"} />
                  <div className="text-03-high" style={{ fontSize: 17, fontWeight: 600, margin: "14px 0 8px" }}>{item.title}</div>
                  <p className="text-02-row" style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
