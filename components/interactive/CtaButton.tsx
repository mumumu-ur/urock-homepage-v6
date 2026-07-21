"use client";

import type { ReactNode } from "react";
import { Button } from "@workspace/ui/components/button";
import { Link } from "@/i18n/navigation";
import type { CtaLink } from "@/lib/content/schema";

type Variant = "filled" | "outlined" | "text";
type Color = "primary" | "secondary" | "danger";
type Size = "L" | "M" | "S";

interface CtaButtonProps {
  cta: CtaLink;
  variant?: Variant;
  color?: Color;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 60;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function CtaButton({
  cta,
  variant = "filled",
  color = "primary",
  size = "M",
  className,
  children,
}: CtaButtonProps) {
  const label = children ?? cta.label;

  if (cta.targetId) {
    return (
      <Button
        variant={variant}
        color={color}
        size={size}
        className={className}
        onClick={() => smoothScrollTo(cta.targetId!)}
      >
        {label}
      </Button>
    );
  }

  if (cta.href) {
    return (
      <Button asChild variant={variant} color={color} size={size} className={className}>
        <Link href={`/${cta.href.replace(/^\//, "")}`}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} color={color} size={size} className={className}>
      {label}
    </Button>
  );
}
