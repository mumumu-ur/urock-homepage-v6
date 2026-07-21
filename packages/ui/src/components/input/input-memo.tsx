"use client";
import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputMemoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "compact";
  maxLength?: number;
  value?: string;
  onEditClick?: () => void;
}

const InputMemo = React.forwardRef<HTMLInputElement, InputMemoProps>(
  (
    {
      className,
      inputSize = "default",
      maxLength,
      value,
      onEditClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn("flex flex-col gap-[4px] w-fit", className)}>
        {/* Input wrapper — border/bg/hover/focus applied to container to include edit icon */}
        <div
          className={cn(
            "flex items-center rounded-lg border-2 line-01 bg-00",
            "hover:line-02 hover:bg-03",
            "focus-within:line-03 focus-within:bg-00",
            "w-[200px] pl-4 pr-2",
            isCompact ? "h-[40px]" : "h-[48px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          <input
            ref={ref}
            type="text"
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-semibold tracking-[-0.5px] text-03-high placeholder:text-01",
              isCompact ? "text-[14px] leading-[1.4]" : "text-[16px] leading-[1.48]",
              disabled && "cursor-not-allowed text-02-row",
            )}
            {...props}
          />
          {onEditClick !== undefined && (
            <button
              type="button"
              onClick={onEditClick}
              disabled={disabled}
              aria-label="편집"
              className="flex items-center justify-center shrink-0 ml-[4px]"
            >
              {/* edit: Material Symbols Outlined "edit" */}
              <Pencil
                className={cn(
                  "text-gray-05-icon-high",
                  isCompact ? "w-[16px] h-[16px]" : "w-[18px] h-[18px]",
                )}
              />
            </button>
          )}
        </div>
        {/* Character limit counter */}
        {maxLength !== undefined && (
          <div className="flex items-center gap-[2px] text-02-row text-[12px]">
            <span>{charCount}</span>
            <span>/</span>
            <span>{maxLength}</span>
          </div>
        )}
      </div>
    );
  },
);

InputMemo.displayName = "InputMemo";

export default InputMemo;
export type { InputMemoProps };
