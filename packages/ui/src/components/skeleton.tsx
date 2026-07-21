import { cn } from "@workspace/ui/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md soft-gray-light", className)} {...props} />;
}

export { Skeleton };
