"use client";
import TextDelete from "@workspace/ui/components/input/_text-delete";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { useState } from "react";
import { InputProps, inputVariants } from "./_variants";

interface Props extends InputProps {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDeleteIconVisible?: boolean;
  onTextDeleteClick?: () => void;
}

const InputText = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      isDeleteIconVisible = false,
      value = "",
      onTextDeleteClick,
      onChange,
      variants,
      state,
      ...props
    },
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
      <div className="relative">
        {isFocus && isDeleteIconVisible && (
          <TextDelete
            className={"right-[18px]"}
            onMouseDown={(e) => {
              onTextDeleteClick?.();
            }}
          />
        )}
        <input
          type={"text"}
          className={cn(
            "h-[48px] w-[200px]",
            inputVariants({ variants: variants ?? "text", state, className }),
            isDeleteIconVisible && "pr-[44px]",
          )}
          value={value}
          onChange={onChange}
          ref={ref}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </div>
    );
  },
);

export default InputText;
export type { Props as InputTextProps };
