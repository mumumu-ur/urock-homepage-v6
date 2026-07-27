"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon } from "./icons";

/** Figma GNB sub-menu's Moon icon (node 12009:3336) — the DS ships full
 * light/dark token pairs (see globals.css `:root` vs `.dark`), so this
 * actually flips `next-themes`' theme instead of being decorative. Only
 * classNames/inline values that reference a DS token respond; colors with
 * no defined light-mode counterpart (this whole header's literal
 * `rgba(255,255,255,…)` glass values) intentionally stay fixed. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      className="flex items-center justify-center rounded-full p-3 text-white hover:bg-white/5"
    >
      <MoonIcon size={16} />
    </button>
  );
}
