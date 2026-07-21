"use client";
import { cn } from "@workspace/ui/utils";
import * as React from "react";
import { useState } from "react";

import { CircleX } from "lucide-react";
import { InputProps, inputVariants } from "./_variants";

interface Props extends InputProps {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDeleteIconVisible?: boolean;
  onTextDeleteClick?: () => void;
}

const InputPassword = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      isDeleteIconVisible = true,
      onTextDeleteClick,
      variants,
      state,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <div className="relative flex items-center w-full">
          <input
            type={show ? "text" : "password"}
            className={cn(
              "h-[48px] w-full pr-[44px]",
              inputVariants({ variants: variants ?? "text", state, className }),
            )}
            ref={ref}
            {...props}
          />
          {isDeleteIconVisible && (
            <button
              type={"button"}
              className="absolute inset-y-0 right-14 flex items-center"
              onMouseDown={(e) => {
                onTextDeleteClick?.();
              }}
            >
              <CircleX className={cn("cursor-pointer")} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-05-icon-high"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <EyeIcon state={show ? "on" : "off"} />
          </button>
        </div>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export default InputPassword;

function EyeIcon(props: { state: "on" | "off" }) {
  const { state } = props;
  return state === "on" ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.52539 11.0693C2.85951 10.4488 3.36517 9.87402 4.01079 9.36283C4.81266 8.72728 5.8299 8.19083 6.99921 7.79055C8.46709 7.28807 10.1746 7.00016 11.9966 7.00016C13.2294 7.00016 14.4098 7.13198 15.499 7.37291C16.0195 7.48804 16.5191 7.62808 16.9937 7.79055C18.163 8.19083 19.1803 8.72728 19.9824 9.36283C20.628 9.87402 21.1337 10.4488 21.4678 11.0693"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.52539 10C2.85951 10.6205 3.36517 11.1953 4.01079 11.7065C4.81266 12.3421 5.8299 12.8785 6.99921 13.2788M11.9966 14.0692V18.5M11.9966 14.0692C10.1746 14.0692 8.46709 13.7813 6.99921 13.2788M11.9966 14.0692C13.8185 14.0692 15.5259 13.7813 16.9937 13.2788M21.4678 10C21.1337 10.6205 20.628 11.1953 19.9824 11.7065C19.1803 12.3421 18.163 12.8785 16.9937 13.2788M6.99921 13.2788L3.99921 17M16.9937 13.2788L19.999 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
