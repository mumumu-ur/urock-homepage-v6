"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@workspace/ui/utils";
import { InputProps, inputVariants } from "./_variants";
import TextDelete from "@workspace/ui/components/input/_text-delete";
import CheckIcon from "@workspace/ui/components/input/_check-icon";

interface Props extends InputProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

const InputModify = React.forwardRef<HTMLInputElement, Props>(
  ({ className, defaultValue = "", onConfirm, onCancel, variants, state, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(defaultValue);

    return (
      <div className="flex relative w-fit">
        {isFocus && (
          <div className={"flex items-center"}>
            <CheckIcon
              className={"right-[40px]"}
              onMouseDown={(e) => {
                setIsFocus(false);
                onConfirm?.();
              }}
            />
            <TextDelete
              className={"right-[15px]"}
              onMouseDown={(e) => {
                setIsFocus(false);
                onCancel?.();
              }}
            />
          </div>
        )}

        <input
          type={"text"}
          className={cn(inputVariants({ variants: "text", state, className }))}
          value={value}
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          ref={ref}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            props.onBlur?.(e);
          }}
        />
      </div>
    );
  },
);

export default InputModify;
