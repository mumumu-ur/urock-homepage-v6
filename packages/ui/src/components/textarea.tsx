import * as React from "react";

import { cn } from "@workspace/ui/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-lg border line-01 bg-00 px-3 py-2 text-base text-03-high shadow-black-03 placeholder:text-02-row focus-visible:outline-none focus-visible:border-2 focus-visible:line-03 disabled:cursor-not-allowed disabled:bg-02 disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
