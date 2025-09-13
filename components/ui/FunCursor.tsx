"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export function FunCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const trail = useMemo(() => new Array(10).fill(0).map(() => ({ x: 0, y: 0 })), []);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFine && !mq.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const step = () => {
      // simple easing trail
      trail[0].x += (pos.current.x - trail[0].x) * 0.25;
      trail[0].y += (pos.current.y - trail[0].y) * 0.25;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.25;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.25;
      }
      dotsRef.current.forEach((el, i) => {
        if (!el) return;
        const t = i / dotsRef.current.length;
        const s = 0.5 + 0.8 * (1 - t);
        el.style.transform = `translate3d(${trail[i].x}px, ${trail[i].y}px, 0) scale(${s})`;
        el.style.opacity = String(0.15 + 0.6 * (1 - t));
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, trail]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen">
      {trail.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(34,211,238,0.9), rgba(244,114,182,0.7))`,
            filter: "blur(2px)",
            willChange: "transform",
            transition: "opacity 0.2s, scale 0.2s",
          }}
        />
      ))}
    </div>
  );
}
