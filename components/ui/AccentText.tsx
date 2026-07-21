import { Fragment } from "react";
import type { TextSegment } from "@/lib/content/schema";

/** Renders localized heading segments, honoring accent highlighting and
 * newline characters (\n -> <br>). Server-safe (no client hooks). */
export function AccentText({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        const lines = seg.text.split("\n");
        return (
          <Fragment key={i}>
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {seg.accent ? (
                  <span style={{ color: "var(--brand-accent)" }}>{line}</span>
                ) : (
                  line
                )}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
