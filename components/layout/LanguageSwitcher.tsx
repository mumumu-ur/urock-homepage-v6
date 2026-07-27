"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { LanguageIcon } from "./nav/icons";
import { glassPanelStyle } from "./nav/glass";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const labels: Record<string, string> = { ko: t("languageKo"), en: t("languageEn") };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("languageLabel")}
        style={{ opacity: isPending ? 0.6 : 1 }}
        className="flex size-9 items-center justify-center rounded-full text-white/85 hover:bg-white/5 hover:text-00"
      >
        <LanguageIcon size={16} />
      </DropdownMenuTrigger>
      {/* SNB panel: same glass treatment as the GNB pill/mega-menu (glass.ts) —
       * applied via inline style, not className, since it must win over the
       * primitive's default `bg-00 border line-01` regardless of stylesheet
       * rule order (see DesktopNav.tsx/MobileNav.tsx for the same pattern). */}
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        style={{ ...glassPanelStyle, minWidth: 140 }}
        className="cC-mono rounded-frame-20 border-0 p-2"
      >
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => switchTo(loc)}
            aria-current={loc === locale ? "true" : undefined}
            style={{ color: "rgb(var(--color-text-00))" }}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-14 focus:bg-white/10 data-[current=true]:font-semibold"
            data-current={loc === locale}
          >
            {labels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
