import type { CSSProperties } from "react";

interface MaterialIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

/** Google Material Symbols glyph. The stylesheet is loaded in the locale layout. */
export function MaterialIcon({ name, size = 24, color, style }: MaterialIconProps) {
  return (
    <span
      className="material-symbols-outlined"
      aria-hidden="true"
      style={{ fontSize: size, color, lineHeight: 1, ...style }}
    >
      {name}
    </span>
  );
}
