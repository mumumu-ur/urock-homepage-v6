"use client";
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const numberVariants = cva("font-spoqa", {
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
      14: "text-[0.875rem] leading-[1.225rem]",
      16: "text-[1rem] leading-[1.48rem]",
      18: "text-[1.125rem] leading-[1.53rem] tracking-[-0.03125rem]",
      20: "text-[1.25rem] leading-[1.5rem] tracking-[-0.01875rem]",
      24: "text-[1.5rem] leading-[1.8rem] tracking-[-0.01875rem]",
      28: "text-[1.75rem] leading-[2.1rem] tracking-[-0.01875rem]",
      32: "text-[2rem] leading-[2.4rem] tracking-[-0.01875rem]",
      36: "text-[2.25rem] leading-[2.7rem] tracking-[-0.01875rem]",
      40: "text-[2.5rem] leading-[3rem] tracking-[-0.01875rem]",
      48: "text-[3rem] leading-[3.6rem] tracking-[-0.015rem]",
      72: "text-[4.5rem] leading-[5.4rem] tracking-[-0.0625rem]",
      120: "text-[7.5rem] leading-[8.25rem] tracking-[-0.125rem]",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
    },
  },
});

export interface NumberProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof numberVariants> {}

const Number = React.forwardRef<HTMLHeadingElement, NumberProps>(
  ({ className, variant, size = 16, weight = "medium", ...props }, ref) => {
    const Comp = variant || "span";

    return (
      <Comp
        className={cn(numberVariants({ variant, size, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Number.displayName = "Number";

export default Number;
