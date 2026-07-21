import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@workspace/ui/utils";
import { ButtonProps, buttonVariants } from "@workspace/ui/components/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & Pick<ButtonProps, "size" | "iconType"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "M",
  iconType = "none",
  leftIcon,
  rightIcon,
  children,
  ...props
}: PaginationLinkProps) => {
  const inner =
    iconType === "only"
      ? (leftIcon ?? rightIcon)
      : iconType === "leading"
      ? <>{leftIcon}{children}</>
      : iconType === "trailing"
      ? <>{children}{rightIcon}</>
      : children;

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outlined" : "text",
          color: "secondary",
          size,
          iconType,
        }),
        className,
      )}
      {...props}
    >
      {inner}
    </a>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="M"
    iconType="only"
    leftIcon={<ChevronLeft className="h-4 w-4" />}
    className={className}
    {...props}
  />
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="M"
    iconType="only"
    leftIcon={<ChevronRight className="h-4 w-4" />}
    className={className}
    {...props}
  />
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
