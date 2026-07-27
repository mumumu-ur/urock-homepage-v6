import { getLocale, getTranslations } from "next-intl/server";
import { glassPanelStyle } from "./nav/glass";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileNav } from "./nav/MobileNav";
import { HeaderCta } from "./nav/HeaderCta";
import { ThemeToggle } from "./nav/ThemeToggle";
import { getNavIA } from "@/lib/nav/ia";
import type { Locale } from "@/lib/content/schema";

export async function Header() {
  const [t, locale] = await Promise.all([getTranslations("nav"), getLocale()]);
  const ia = getNavIA(locale as Locale);

  return (
    <header
      style={{ paddingLeft: "2.2%", paddingRight: "2.2%" }}
      className="sticky top-0 z-110 pt-4"
    >
      {/* Glass GNB pill — Figma node 12002:2806, same glass spec as the SNB
       * mega-menu (see glass.ts). Figma's frame is 1840px wide inset from a
       * 1920-ish canvas (left:43/width:1840) — a ~2.2% side margin, not a
       * fixed pixel breakpoint — so the header uses percentage padding
       * (inline style: Tailwind's `px-[2.2%]` arbitrary-percentage class
       * silently fails to compile, see git history) instead of a max-width
       * cap, so the pill stays proportional to the viewport at any width
       * instead of pinning to one section's fixed container. */}
      <div
        style={glassPanelStyle}
        className="relative grid h-13 w-full grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-frame-20 px-5 sm:px-8"
      >
        {/* `grid-cols-[1fr_auto_1fr]` (not the previous `flex justify-between`)
         * puts DesktopNav in its own centered track, so it sits at the true
         * horizontal center of the pill regardless of the logo/CTA cluster
         * widths on either side — matching Figma, where solutions/services/
         * support/about are centered independent of the logo and buttons.
         * This has to be a grid, not `position: absolute` centering: the
         * mega-menu's Viewport positions itself via `absolute inset-x-0`
         * against the nearest *positioned* ancestor (this pill), and an
         * absolutely-positioned centering wrapper around DesktopNav would
         * itself become that ancestor instead, re-collapsing the SNB width
         * (see DesktopNav.tsx / navigation-menu.tsx for that fix). */}
        <a href={`/${locale}`} aria-label="UROCK home" className="inline-flex shrink-0 justify-self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/UROCK_white.svg" alt="UROCK" style={{ height: 19, width: "auto" }} />
        </a>
        <DesktopNav ia={ia} />
        <div className="flex shrink-0 items-center justify-self-end gap-2">
          <div className="hidden min-[901px]:flex items-center gap-3">
            <ThemeToggle label={t("themeToggle")} />
            <LanguageSwitcher />
            <div className="h-6 w-px bg-white/10" aria-hidden />
          </div>
          <HeaderCta cta={ia.cta} />
          <MobileNav ia={ia} menuLabel={t("menu")} />
        </div>
      </div>
    </header>
  );
}
