"use client";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  maxTilt?: number; // degrees
};

export function TiltCard({ className = "", children, maxTilt = 10 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rx = (0.5 - py) * 2 * maxTilt; // invert Y for natural feel
    const ry = (px - 0.5) * 2 * maxTilt;
    setTilt({ x: rx, y: ry });
  }

  function reset() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={onMove}
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
