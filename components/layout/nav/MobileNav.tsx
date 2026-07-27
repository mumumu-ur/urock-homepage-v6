"use client";

import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavIA, NavTopItem } from "@/lib/nav/ia";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/** Dark override for SheetContent — see DesktopNav.tsx for why this is
 * inline style rather than a className override. Reuses the site's existing
 * --brand-bg/--brand-fg tokens (same dark surface as the rest of concept-c)
 * rather than inventing a new panel color. */
const panelDarkStyle = {
  background: "var(--brand-bg)",
  color: "var(--brand-fg)",
  // rgb(217,223,238) is an exact match for the DS's `secondary-04` token
  // (light: 217,223,238 / dark: 58,67,88), so this responds to the theme
  // toggle instead of being a one-off literal.
  borderColor: "rgb(var(--color-secondary-04) / 0.14)",
} as const;

const subLinkClass =
  "block rounded-lg px-3 py-2 text-14 tracking-tight-05 text-white/80 hover:bg-white/5 hover:text-00";

function TopItemGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: NavTopItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-16 font-semibold tracking-tight-05 text-00 hover:bg-white/5"
        aria-label={item.label}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className="size-[18px] shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 py-1 pl-3">
          {item.solutionGroups
            ? item.solutionGroups.map((group) => (
                <div key={group.href} className="py-2">
                  <Link
                    href={group.href}
                    onClick={onNavigate}
                    className="block px-3 pb-1 text-12 font-semibold uppercase tracking-tight-05 text-white/50"
                  >
                    {group.label}
                  </Link>
                  {group.products.map((product) => (
                    <div key={product.href}>
                      <Link
                        href={product.href}
                        onClick={onNavigate}
                        className={subLinkClass}
                        aria-current={pathname === product.href ? "page" : undefined}
                      >
                        {product.label}
                      </Link>
                      {product.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onNavigate}
                          className="block rounded-lg py-2 pl-8 pr-3 text-13 tracking-tight-05 text-white/60 hover:bg-white/5 hover:text-00"
                          aria-current={pathname === child.href ? "page" : undefined}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  {group.extraLinks?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onNavigate}
                      className={subLinkClass}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))
            : (item.items ?? []).map((leaf) => (
                <Link
                  key={leaf.href}
                  href={leaf.href}
                  onClick={onNavigate}
                  className={subLinkClass}
                  aria-current={pathname === leaf.href ? "page" : undefined}
                >
                  {leaf.label}
                </Link>
              ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function MobileNav({ ia, menuLabel }: { ia: NavIA; menuLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex size-9 items-center justify-center rounded-full text-00 hover:bg-white/10 min-[901px]:hidden"
        aria-label={menuLabel}
      >
        <Menu aria-hidden className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        style={panelDarkStyle}
        className="cC-mono flex w-full flex-col gap-0 overflow-y-auto border-l sm:max-w-sm"
        aria-label={menuLabel}
      >
        <SheetTitle className="text-16">{menuLabel}</SheetTitle>
        <nav aria-label={menuLabel} className="mt-2 flex flex-col">
          {ia.top.map((item) =>
            item.solutionGroups || item.items ? (
              <TopItemGroup key={item.id} item={item} pathname={pathname} onNavigate={close} />
            ) : (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                onClick={close}
                className="rounded-lg px-3 py-3 text-16 font-semibold tracking-tight-05 text-00 hover:bg-white/5"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
          {ia.cta.map((cta, i) => {
            const ctaClassName =
              "primary-01 rounded-frame-8 px-4 py-2.5 text-center text-14 font-medium tracking-tight-05 text-00";
            // ia.ts stores `cta` as [brochure, demo, contact] — index 0 is
            // the PDF download, a plain file link, not an app route.
            return i === 0 ? (
              <a key={cta.href} href={cta.href} download onClick={close} className={ctaClassName}>
                {cta.label}
              </a>
            ) : (
              <Link key={cta.href} href={cta.href} onClick={close} className={ctaClassName}>
                {cta.label}
              </Link>
            );
          })}
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
