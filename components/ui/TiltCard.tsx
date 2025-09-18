"use client";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  maxTilt?: number; // degrees
};

export function TiltCard({ className = "", children, maxTilt = 10 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const current = React.useRef({ x: 0, y: 0 });
  const frame = React.useRef<number | null>(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animate() {
    const el = ref.current;
    if (!el) return;
    // simple spring-ish lerp
    current.current.x += (target.current.x - current.current.x) * 0.12;
    current.current.y += (target.current.y - current.current.y) * 0.12;
    el.style.transform = `perspective(1000px) rotateX(${current.current.x.toFixed(2)}deg) rotateY(${current.current.y.toFixed(2)}deg)`;
    if (Math.abs(current.current.x - target.current.x) > 0.01 || Math.abs(current.current.y - target.current.y) > 0.01) {
      frame.current = requestAnimationFrame(animate);
    } else {
      frame.current = null;
    }
  }

  function setTarget(x: number, y: number) {
    target.current.x = x;
    target.current.y = y;
    if (!frame.current) frame.current = requestAnimationFrame(animate);
  }

  function onMove(e: React.MouseEvent) {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 2 * maxTilt;
    const ry = (px - 0.5) * 2 * maxTilt;
    setTarget(rx, ry);
  }

  function reset() {
    setTarget(0, 0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={onMove}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
