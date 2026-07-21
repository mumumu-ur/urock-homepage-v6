import { Slot } from "@radix-ui/react-slot";
import { cn } from "@workspace/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

type ButtonVariant = "filled" | "outlined" | "text";
type ButtonColor = "primary" | "secondary" | "danger";
type ButtonSize = "L" | "M" | "S";
type ButtonIconType = "none" | "leading" | "trailing" | "only";

const BUTTON_SIZES = {
  L: "rounded-lg px-[28px] py-[16px] text-[18px] font-medium [&_svg]:w-[24px] [&_svg]:h-[24px]",
  M: "rounded-md px-[12px] py-[8px] text-[16px] font-medium [&_svg]:w-[20px] [&_svg]:h-[20px]",
  S: "rounded-sm px-[8px] py-[4px] text-[14px] font-medium [&_svg]:w-[16px] [&_svg]:h-[16px]",
} as const;

const buttonVariants = cva(
  "inline-flex h-[48px] items-center justify-center gap-[2px] whitespace-nowrap transition-all duration-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:bg-02 disabled:text-03-high disabled:[&_svg]:text-gray-03-icon-row disabled:cursor-not-allowed data-[loading=true]:cursor-not-allowed",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
        text: "",
      },
      color: {
        primary: "",
        secondary: "",
        danger: "",
      },
      iconType: {
        none: "",
        leading: "",
        trailing: "",
        only: "aspect-square px-0 py-0 rounded-full [&_svg]:w-full [&_svg]:h-full",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
      size: BUTTON_SIZES,
    },
    compoundVariants: [
      // filled + primary (구: filled)
      {
        variant: "filled",
        color: "primary",
        className:
          "primary-01 text-00 [&_svg]:text-00 [&:not(:disabled):hover:not(:active)]:secondary-01 enabled:active:bg-blue-09 enabled:active:scale-95 shadow-blue-03",
      },
      // filled + danger (구: filledRed)
      {
        variant: "filled",
        color: "danger",
        className:
          "border-2 border-transparent state-error text-00 [&_svg]:text-00 [&:not(:disabled):hover:not(:active)]:border-state-error [&:not(:disabled):hover:not(:active)]:bg-error-70 enabled:active:border-state-error enabled:active:bg-error enabled:active:scale-95 shadow-red-03",
      },
      // outlined + primary (구: outlinedBlue)
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-2 line-03 bg-03 text-04-brand [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:bg-blue-03 enabled:active:bg-blue-05-icon-sub enabled:active:scale-95 shadow-blue-03",
      },
      // outlined + secondary (구: outlinedBlack)
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-2 line-01 bg-00 text-03-high [&_svg]:text-gray-05-icon-high [&:not(:disabled):hover:not(:active)]:bg-03 enabled:active:bg-04 enabled:active:scale-95",
      },
      // outlined + danger (구: outlinedRed)
      {
        variant: "outlined",
        color: "danger",
        className:
          "border-2 border-state-error bg-00 text-error [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:soft-red-light enabled:active:bg-error enabled:active:scale-95 shadow-red-03",
      },
      // text + primary (구: text)
      {
        variant: "text",
        color: "primary",
        className:
          "border-none text-04-brand [&_svg]:primary-01 [&:not(:disabled):hover:not(:active)]:text-05-dark enabled:active:text-03-high [&:enabled:active_svg]:primary-02 enabled:active:scale-95",
      },
      // text + secondary (구: textBlack)
      {
        variant: "text",
        color: "secondary",
        className:
          "border-none text-03-high [&_svg]:text-gray-05-icon-high [&:not(:disabled):hover:not(:active)]:text-02-row [&:not(:disabled):hover:not(:active)_svg]:text-gray-03-icon-row enabled:active:text-03-high [&:enabled:active_svg]:text-gray-05-icon-high enabled:active:scale-95",
      },
      // loading states
      {
        variant: "filled",
        color: "primary",
        loading: true,
        className:
          "line-03 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-04-brand",
      },
      {
        variant: "filled",
        color: "danger",
        loading: true,
        className: "disabled:data-[loading=true]:text-00",
      },
      {
        variant: "outlined",
        color: "primary",
        loading: true,
        className:
          "line-01 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-04-brand",
      },
      {
        variant: "outlined",
        color: "secondary",
        loading: true,
        className:
          "line-01 disabled:data-[loading=true]:bg-00 disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "outlined",
        color: "danger",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "text",
        color: "primary",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
      {
        variant: "text",
        color: "secondary",
        loading: true,
        className: "disabled:data-[loading=true]:text-03-high",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "primary",
      iconType: "none",
      size: "M",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  iconType?: ButtonIconType;
}

const CircularProgress = () => (
  <div className="inline-block h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      iconType = "none",
      asChild = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = loading ? (
      <CircularProgress />
    ) : iconType === "only" ? (
      leftIcon ?? rightIcon
    ) : iconType === "leading" ? (
      <>
        {leftIcon}
        {children}
      </>
    ) : iconType === "trailing" ? (
      <>
        {children}
        {rightIcon}
      </>
    ) : (
      children
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, iconType, loading, className }))}
        ref={ref}
        disabled={disabled || loading}
        data-loading={loading}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
