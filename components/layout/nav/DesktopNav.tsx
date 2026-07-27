"use client";

import { useEffect, useState, type ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@workspace/ui/components/navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import type { ChildOsKey, NavIA, NavLeaf, NavTopItem, SolutionGroup, SolutionIconKey, SolutionProduct } from "@/lib/nav/ia";
import { glassPanelStyle } from "./glass";
import {
  DfasArcIcon,
  DfasDiscoveryIcon,
  DfasEdgeIcon,
  DfasGoIcon,
  DfasProOneIcon,
  GateManagerIcon,
  GateManagerProIcon,
  LinuxIcon,
  MacIcon,
  MsecuGIcon,
  MsecuPIcon,
  MsecuSIcon,
  WindowsIcon,
} from "./icons";

/** Applied via inline style (not className) — see glass.ts for why, and why
 * it's hardcoded rather than the `shadow-black-04`/`line-00` DS utilities. */
const viewportGlassStyle = glassPanelStyle;

const iconMap: Record<SolutionIconKey, ComponentType<{ size?: number }>> = {
  "dfas-pro-one": DfasProOneIcon,
  "dfas-edge": DfasEdgeIcon,
  "dfas-go": DfasGoIcon,
  "dfas-discovery": DfasDiscoveryIcon,
  "dfas-arc": DfasArcIcon,
  "msecu-p": MsecuPIcon,
  "msecu-s": MsecuSIcon,
  "msecu-g": MsecuGIcon,
  gatemanager: GateManagerIcon,
  "gatemanager-pro": GateManagerProIcon,
};

const childIconMap: Record<ChildOsKey, ComponentType<{ size?: number }>> = {
  windows: WindowsIcon,
  mac: MacIcon,
  linux: LinuxIcon,
};

function isTopActive(pathname: string, item: NavTopItem): boolean {
  switch (item.id) {
    case "solutions":
      return pathname.startsWith("/solutions");
    case "services":
      return pathname.startsWith("/services");
    case "support":
      return pathname.startsWith("/support") || pathname.startsWith("/contact");
    case "about":
      return pathname.startsWith("/about");
    default:
      return item.href ? pathname === item.href : false;
  }
}

function IconAvatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex size-10 shrink-0 items-center justify-center rounded-[11px] border-[0.9px] border-white/30 bg-white/10 backdrop-blur-[9px]">
      {children}
    </span>
  );
}

function Hashtags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap items-start gap-1">
      {tags.map((tag) => (
        <span key={tag} className="secondary-01 whitespace-nowrap py-[3px] text-xs tracking-tight-05">
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProductRow({ product, pathname }: { product: SolutionProduct; pathname: string }) {
  const Icon = iconMap[product.icon];
  const active = pathname === product.href;
  return (
    <div className="flex items-start gap-3">
      <IconAvatar>
        <Icon />
      </IconAvatar>
      <div className="flex flex-col items-start gap-0.5">
        <div className="flex items-center gap-1.5">
          <NavigationMenuLink asChild>
            <Link
              href={product.href}
              className="text-18 font-semibold tracking-tight-05 text-white hover:text-05-dark"
              aria-current={active ? "page" : undefined}
            >
              {product.label}
            </Link>
          </NavigationMenuLink>
          {product.badge ? (
            <span className="whitespace-nowrap rounded-frame-8 bg-white/5 px-1.5 py-[3px] text-xs font-medium tracking-tight-05 text-white backdrop-blur-[9px]">
              {product.badge}
            </span>
          ) : null}
        </div>
        <p className="text-xs leading-[1.36] tracking-tight-05 text-white/70">
          {product.description.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
        <Hashtags tags={product.hashtags} />
      </div>
    </div>
  );
}

function ProOneChildRow({ label, href, icon }: { label: string; href: string; icon: ChildOsKey }) {
  const Icon = childIconMap[icon];
  return (
    <div className="flex h-[58px] flex-col justify-center gap-0.5 pl-[52px]">
      <div className="flex items-center gap-1.5">
        <NavigationMenuLink asChild>
          <Link href={href} className="text-18 font-semibold tracking-tight-05 text-white hover:text-05-dark">
            {label}
          </Link>
        </NavigationMenuLink>
        <Icon size={18} />
      </div>
      <p className="text-xs leading-[1.36] tracking-tight-05 text-white/70">
        <span className="block">인터넷이 끊긴 현장에서도 완벽하게 작동하는</span>
        <span className="block">온디바이스 AI 통합 솔루션</span>
      </p>
    </div>
  );
}

/** Plain relocated link (e.g. "안심 삭제 서비스" moved here from Consulting) —
 * rendered without the icon avatar/description that SolutionProduct rows use,
 * since it's a cross-linked service, not a hardware product of this group. */
function ExtraLinkRow({ link, pathname }: { link: NavLeaf; pathname: string }) {
  const active = pathname === link.href;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className="inline-flex items-center gap-1 text-14 font-medium tracking-tight-05 text-white/70 hover:text-05-dark"
      >
        {link.label}
        <ArrowUpRight aria-hidden className="size-3.5" />
      </Link>
    </NavigationMenuLink>
  );
}

function SolutionColumn({ group, pathname, wide }: { group: SolutionGroup; pathname: string; wide?: boolean }) {
  const [primary, ...rest] = group.products;
  const hasTree = !!primary?.children?.length;

  return (
    <div className={wide ? "flex gap-[68px]" : "flex flex-col gap-6"}>
      <div className={wide ? "flex w-[294px] flex-col gap-9" : "flex flex-col gap-6"}>
        {!wide ? (
          <div className="flex flex-col gap-1">
            <NavigationMenuLink asChild>
              <Link
                href={group.href}
                className="inline-flex w-fit items-center justify-center rounded-frame-8 bg-gray-06/30 px-1.5 py-[3px] text-xs font-medium tracking-tight-05 text-white"
              >
                {group.code}
              </Link>
            </NavigationMenuLink>
            <p className="text-sm tracking-tight-05 text-white/70">{group.description}</p>
          </div>
        ) : null}
        {primary ? <ProductRow product={primary} pathname={pathname} /> : null}
        {hasTree ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nav-icons/tree-connector.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-[52px]"
            />
            <div className="flex flex-col">
              {primary!.children!.map((child) => (
                <ProOneChildRow key={child.href} {...child} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className={wide ? "flex flex-1 flex-col gap-8" : "flex flex-col gap-8"}>
        {rest.map((product) => (
          <ProductRow key={product.href} product={product} pathname={pathname} />
        ))}
        {group.extraLinks?.map((link) => (
          <ExtraLinkRow key={link.href} link={link} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}

function SolutionsMegaMenu({ groups, pathname }: { groups: SolutionGroup[]; pathname: string }) {
  const [dfas, msecu, gatemanager] = groups;
  return (
    <div className="flex items-start gap-[68px] px-8 py-6 lg:px-14">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <NavigationMenuLink asChild>
            <Link
              href={dfas.href}
              className="inline-flex w-fit items-center justify-center rounded-frame-8 bg-gray-06/30 px-1.5 py-[3px] text-xs font-medium tracking-tight-05 text-white"
            >
              {dfas.code}
            </Link>
          </NavigationMenuLink>
          <p className="text-sm tracking-tight-05 text-white/70">{dfas.description}</p>
        </div>
        <SolutionColumn group={dfas} pathname={pathname} wide />
      </div>
      <div className="h-auto w-px self-stretch bg-white/10" aria-hidden />
      <SolutionColumn group={msecu} pathname={pathname} />
      <div className="h-auto w-px self-stretch bg-white/10" aria-hidden />
      <SolutionColumn group={gatemanager} pathname={pathname} />
    </div>
  );
}

function SimpleMenu({ items, pathname }: { items: NavLeaf[]; pathname: string }) {
  return (
    <ul className="flex min-w-[240px] flex-col gap-1 px-3 py-4">
      {items.map((leaf) => {
        const active = pathname === leaf.href;
        return (
          <li key={leaf.href}>
            <NavigationMenuLink asChild>
              <Link
                href={leaf.href}
                className="block rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5 hover:text-00"
                aria-current={active ? "page" : undefined}
              >
                {leaf.label}
              </Link>
            </NavigationMenuLink>
          </li>
        );
      })}
    </ul>
  );
}

export function DesktopNav({ ia }: { ia: NavIA }) {
  const pathname = usePathname();
  // Header persists across route changes (it lives in the locale layout), so
  // an open mega menu/dropdown must be force-closed on navigation instead of
  // relying on unmount.
  const [openValue, setOpenValue] = useState("");
  useEffect(() => {
    setOpenValue("");
  }, [pathname]);

  return (
    <NavigationMenu
      // `static` (overrides the primitive's default `relative`) so the
      // mega-menu's absolute-positioned Viewport wrapper (hardcoded inside
      // navigation-menu.tsx) escapes this content-hugging trigger row and
      // resolves against the full-width `relative` header pill in Header.tsx
      // instead — otherwise `!w-full` on the Viewport collapses to ~2px
      // (percentage width against this row's own `w-full`-on-an-auto-sized-
      // flex-item indefinite size, a classic circular-sizing bug).
      className="static hidden items-center justify-center max-[900px]:!hidden min-[901px]:flex"
      delayDuration={100}
      value={openValue}
      onValueChange={setOpenValue}
    >
      <NavigationMenuList className="flex items-center gap-0.5">
        {ia.top.map((item) => {
          const active = isTopActive(pathname, item);
          return (
            <NavigationMenuItem key={item.id} value={item.id}>
              <NavigationMenuTrigger
                className="relative rounded-full bg-transparent px-4 py-4 text-14 font-semibold tracking-tight-05 text-white/85 hover:bg-white/5 hover:text-00 data-[state=open]:text-00"
                data-active={active}
              >
                {item.label}
                {active ? (
                  // Figma's own active-indicator asset (node 12002:2828): a
                  // 52px bar + a 4px dot with a 6px gap between them, right-
                  // aligned under the trigger — not a plain centered pill.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/nav-icons/active-indicator-bar.svg"
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute -bottom-1 right-0 h-1 w-15.5"
                  />
                ) : null}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {item.solutionGroups ? (
                  <SolutionsMegaMenu groups={item.solutionGroups} pathname={pathname} />
                ) : (
                  <SimpleMenu items={item.items ?? []} pathname={pathname} />
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuViewport
        style={viewportGlassStyle}
        className="!left-0 !mt-2 !w-full !rounded-frame-20 data-[state=closed]:!animate-none data-[state=open]:!animate-none"
      />
    </NavigationMenu>
  );
}
