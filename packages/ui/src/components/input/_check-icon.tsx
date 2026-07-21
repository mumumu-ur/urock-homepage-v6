"use client";
import * as React from "react";
import { CircleCheck } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

function CheckIcon(props: Props) {
  return (
    <span {...props}>
      <CircleCheck className="absolute w-[24px] h-[24px] top-1/2 -translate-y-1/2 cursor-pointer" />
    </span>
  );
}

export default CheckIcon;
