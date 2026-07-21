"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="cC-mono"
      role="group"
      aria-label="Language"
      style={{ display: "inline-flex", gap: 2, opacity: isPending ? 0.6 : 1 }}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: "inline-flex", alignItems: "center" }}>
          {i > 0 && (
            <span
              aria-hidden
              style={{ color: "rgb(var(--brand-muted) / 0.3)", margin: "0 2px" }}
            >
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === locale ? "true" : undefined}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 4px",
              fontSize: 12,
              letterSpacing: "0.04em",
              color:
                loc === locale
                  ? "var(--brand-accent)"
                  : "rgb(var(--brand-muted) / 0.6)",
              fontWeight: loc === locale ? 600 : 400,
            }}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
