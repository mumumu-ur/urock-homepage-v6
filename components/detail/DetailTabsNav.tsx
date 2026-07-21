"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

interface DetailTabsNavProps {
  tabs: { id: string; label: string }[];
  active: string;
}

/** URL-driven tabs: selection is persisted in ?tab= so deep links, back/forward
 * and SEO all work. useTransition keeps the UI responsive while the server
 * streams the next panel. */
export function DetailTabsNav({ tabs, active }: DetailTabsNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const onValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div style={{ opacity: isPending ? 0.6 : 1, transition: "opacity .2s" }}>
      <Tabs value={active} onValueChange={onValueChange}>
        <TabsList
          className="cC-mono"
          style={{
            background: "rgb(255 255 255 / 0.03)",
            border: "1px solid rgb(var(--brand-muted) / 0.14)",
            height: "auto",
            padding: 4,
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              style={{
                padding: "8px 16px",
                color: tab.id === active ? "var(--brand-accent-bright)" : "rgb(var(--brand-muted) / 0.7)",
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
