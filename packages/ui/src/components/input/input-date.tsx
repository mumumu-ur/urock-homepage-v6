"use client";
import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@workspace/ui/utils";

export interface InputDateProps {
  inputSize?: "default" | "compact";
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  onCalendarClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const DATE_PLACEHOLDER = "YYYY/MM/DD";
const TIME_PLACEHOLDER = "00:00";

const InputDate = React.forwardRef<HTMLDivElement, InputDateProps>(
  (
    {
      className,
      inputSize = "default",
      startDate,
      startTime,
      endDate,
      endTime,
      onCalendarClick,
      disabled,
    },
    ref,
  ) => {
    const isCompact = inputSize === "compact";

    const dateTextClass = cn(
      "font-semibold tracking-[-0.5px] text-03-high",
      isCompact ? "text-[12px]" : "text-[14px]",
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          isCompact ? "rounded-[8px]" : "rounded-[12px]",
          className,
        )}
      >
        {/* Left: date range display section */}
        <div
          className={cn(
            "flex items-center min-w-0",
            "bg-00 border-t-2 border-b-2 border-l-2 line-01",
            "hover:line-02 hover:bg-03",
            isCompact
              ? "h-[40px] px-[12px] gap-[6px] rounded-bl-[10px] rounded-tl-[10px]"
              : "h-[56px] px-[16px] gap-[8px] rounded-bl-[12px] rounded-tl-[12px]",
            disabled && "bg-01 cursor-not-allowed pointer-events-none",
          )}
        >
          {/* Start date / time */}
          <div className={cn("flex items-center gap-[4px] shrink-0", dateTextClass)}>
            <span className={cn(!startDate && "text-01")}>{startDate ?? DATE_PLACEHOLDER}</span>
            <span className={cn(!startTime && "text-01")}>{startTime ?? TIME_PLACEHOLDER}</span>
          </div>
          {/* Range separator */}
          <div
            className={cn(
              "shrink-0 line-01",
              isCompact ? "w-[8px] h-[1px]" : "w-[12px] h-[1px]",
            )}
          />
          {/* End date / time */}
          <div className={cn("flex items-center gap-[4px] shrink-0", dateTextClass)}>
            <span className={cn(!endDate && "text-01")}>{endDate ?? DATE_PLACEHOLDER}</span>
            <span className={cn(!endTime && "text-01")}>{endTime ?? TIME_PLACEHOLDER}</span>
          </div>
        </div>
        {/* Right: calendar button section */}
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
            onClick={onCalendarClick}
            disabled={disabled}
            aria-label="날짜 선택"
            className={cn(
              "flex items-center justify-center",
              disabled && "cursor-not-allowed",
            )}
          >
            <Calendar
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

InputDate.displayName = "InputDate";

export default InputDate;
export type { InputDateProps };
