"use client";

import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const typographyVariants = cva("font-pretendard", {
  variants: {
    variant: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      p: "",
      span: "",
    },
    size: {
      12: "text-[0.75rem] leading-[1.02rem] tracking-[-0.03125rem]",
      14: "text-[14px] leading-[19.6px] tracking-[-0.03125rem]",
      16: "text-[1rem] leading-[1.48rem] tracking-[-0.03125rem]",
      18: "text-[1.125rem] leading-[1.53rem] tracking-[-0.03125rem]",
      20: "text-[1.25rem] leading-[1.5rem] tracking-[-0.0625rem]",
      24: "text-[1.5rem] leading-[2.1rem] tracking-[-0.08125rem]",
      28: "text-[1.75rem] leading-[2.38rem] tracking-[-0.08125rem]",
      32: "text-[2rem] leading-[2.4rem] tracking-[-0.06rem]",
      36: "text-[2.25rem] leading-[2.88rem] tracking-[-0.0675rem]",
      40: "text-[2.5rem] leading-[3rem] tracking-[-0.075rem]",
      48: "text-[3rem] leading-[3.6rem] tracking-[-0.09rem]",
      72: "text-[4.5rem] leading-[5.4rem] tracking-[-0.25rem]",
    },
    weight: {
      semibold: "font-semibold",
      bold: "font-bold",
      medium: "font-medium",
    },
  },
});
export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Text = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, size = 16, weight = "medium", ...props }, ref) => {
    const Comp = variant || "p";

    return (
      <Comp
        className={cn(typographyVariants({ variant, size, className, weight }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text };
