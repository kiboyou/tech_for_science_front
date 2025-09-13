"use client";
import { useMemo } from "react";

export function GooeyBlobs() {
  const blobs = useMemo(
    () => [
      { left: "10%", top: "20%", color: "rgba(34,211,238,0.18)", size: 220 },
      { left: "70%", top: "30%", color: "rgba(244,114,182,0.16)", size: 240 },
      { left: "40%", top: "70%", color: "rgba(139,92,246,0.14)", size: 200 },
    ],
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
  <svg className="absolute inset-0 w-full h-full" style={{ filter: "url(#goo) blur(18px)" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute animate-pulse-slow rounded-full"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size, background: b.color }}
        />
      ))}
    </div>
  );
}
