"use client";

import { useEffect, useRef } from "react";

const RAMP = [
  "#1C2846",
  "#293B67",
  "#364D87",
  "#4663AE",
  "#628CF5",
  "#7D6CFF",
  "#6DE7EF",
  "#8CF4FF",
];

/** False-color halftone density field behind the hero. Ported from the
 * prototype's _initCanvas: respects reduced-motion and pauses off-screen. */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cell = 22;
    let w = 0;
    let h = 0;
    let t = 0;
    let raf: number | null = null;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = cv.width = Math.max(1, Math.floor(r.width));
      h = cv.height = Math.max(1, Math.floor(r.height));
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.74;
      const cy = h * 0.42;
      const maxR = Math.hypot(w, h) * 0.55;
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          const d = Math.hypot(x - cx, y - cy) / maxR;
          const wobble =
            Math.sin(x * 0.02 + t) * 0.06 + Math.cos(y * 0.025 - t * 0.8) * 0.06;
          let dens = 1 - d + wobble;
          dens = Math.max(0, Math.min(1, dens));
          if (dens < 0.06) continue;
          const i = Math.min(RAMP.length - 1, Math.floor(dens * RAMP.length));
          const rad = cell * 0.5 * (0.25 + dens * 0.72);
          ctx.beginPath();
          ctx.fillStyle = RAMP[i];
          ctx.globalAlpha = 0.18 + dens * 0.55;
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      draw();
      return () => window.removeEventListener("resize", resize);
    }

    const loop = () => {
      t += 0.012;
      draw();
      raf = requestAnimationFrame(loop);
    };

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              if (!raf) loop();
            } else if (raf) {
              cancelAnimationFrame(raf);
              raf = null;
            }
          });
        },
        { threshold: 0.02 },
      );
      io.observe(cv);
    } else {
      loop();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
