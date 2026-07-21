"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[rgba(24,29,34,0.72)] group-[.toaster]:border group-[.toaster]:line-03 group-[.toaster]:text-00 group-[.toaster]:shadow-black-03 group-[.toaster]:rounded-[40px]",
          description: "group-[.toast]:text-02-row",
          actionButton: "group-[.toast]:primary-01 group-[.toast]:text-00",
          cancelButton:
            "group-[.toast]:border group-[.toast]:line-03 group-[.toast]:bg-transparent group-[.toast]:text-00 group-[.toast]:backdrop-blur-sm",
        },
      }}
      {...props}
    />
  );
};

export { toast, Toaster };
