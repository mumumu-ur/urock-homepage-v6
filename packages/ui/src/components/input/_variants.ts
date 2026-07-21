import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const inputVariants = cva(
  `flex p-1 items-center rounded-lg border-2 line-01 bg-00
  hover:line-02 hover:bg-03 hover:rounded-lg hover:border-2
  focus:outline-none focus:line-03 focus:bg-00 focus:rounded-lg focus:border-2 focus:line-03
  disabled:bg-01 disabled:text-02-row disabled:cursor-not-allowed
  `,
  {
    variants: {
      variants: {
        text: "pl-4 pr-4",
        number: "pr-4 pl-[40px]",
      },
      state: {
        default: "",
        error:
          "border-state-error hover:border-state-error focus:border-state-error",
        success:
          "border-state-success hover:border-state-success focus:border-state-success",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}
