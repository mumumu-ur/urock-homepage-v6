"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputSearchGrayProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "compact";
  onSearchClick?: () => void;
}

const InputSearchGray = React.forwardRef<HTMLInputElement, InputSearchGrayProps>(
  (
    {
      className,
      inputSize = "default",
      onSearchClick,
      placeholder = "검색어를 입력해주세요",
      disabled,
      ...props
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";

    return (
      <div
        className={cn(
          "flex items-center w-[312px]",
          isCompact ? "rounded-[8px]" : "rounded-[12px]",
          className,
        )}
      >
        {/* Left: input section — bg-02 (gray) in default state; hover/focus identical to InputSearch */}
        <div
          className={cn(
            "flex-[1_0_0] flex items-center min-w-0",
            "bg-02 border-t-2 border-b-2 border-l-2 line-01",
            "hover:line-02 hover:bg-03",
            "focus-within:line-03 focus-within:bg-00",
            isCompact
              ? "h-[40px] pl-[16px] rounded-bl-[10px] rounded-tl-[10px]"
              : "h-[56px] pl-[16px] py-[16px] rounded-bl-[12px] rounded-tl-[12px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-semibold tracking-[-0.5px]",
              "text-03-high placeholder:text-01",
              isCompact ? "text-[14px] leading-[1.4]" : "text-[16px] leading-[1.48]",
              disabled && "cursor-not-allowed text-02-row",
            )}
            {...props}
          />
        </div>
        {/* Right: search button section */}
        <div
          className={cn(
            "flex items-center shrink-0 gap-[8px]",
            "bg-00 border-t-2 border-b-2 border-r-2 line-01",
            isCompact
              ? "h-[40px] pl-[8px] pr-[12px] rounded-br-[10px] rounded-tr-[10px]"
              : "h-[56px] pl-[8px] pr-[16px] py-[16px] rounded-br-[12px] rounded-tr-[12px]",
            disabled && "bg-01",
          )}
        >
          <div
            className={cn("w-[2px] shrink-0 line-01", isCompact ? "h-[20px]" : "h-[24px]")}
          />
          <button
            type="button"
            onClick={onSearchClick}
            disabled={disabled}
            aria-label="검색"
            className={cn(
              "flex items-center justify-center",
              disabled && "cursor-not-allowed",
            )}
          >
            <Search
              className={cn(
                "text-gray-05-icon-high",
                isCompact ? "w-[20px] h-[20px]" : "w-[24px] h-[24px]",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);

InputSearchGray.displayName = "InputSearchGray";

export default InputSearchGray;
