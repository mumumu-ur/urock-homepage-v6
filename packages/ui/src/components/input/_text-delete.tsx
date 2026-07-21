"use client";
import * as React from "react";
import { CircleX } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

function TextDelete(props: Props) {
  const { className, ..._props } = props;

  return (
    <span className={className} {..._props}>
      <CircleX className="absolute top-1/2 h-[24px] w-[24px] -translate-y-1/2 cursor-pointer" />
    </span>
  );
}

export default TextDelete;
