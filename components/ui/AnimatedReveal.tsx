"use client";
import { motion, useReducedMotion, Variants } from "framer-motion";
import React from "react";

type VariantName = "fadeUp" | "fadeIn" | "zoomIn" | "slideLeft" | "slideRight" | "rotateIn";

const variants: Record<VariantName, Variants> = {
  fadeUp: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  zoomIn: { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } },
  slideLeft: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  rotateIn: { hidden: { opacity: 0, rotate: -3 }, show: { opacity: 1, rotate: 0 } },
};

export function AnimatedReveal({ children, delay = 0, className = "", effect = "fadeUp" as VariantName }: { children: React.ReactNode; delay?: number; className?: string; effect?: VariantName }) {
  const prefersReduced = useReducedMotion();
  const v = variants[effect] ?? variants.fadeUp;
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? undefined : "hidden"}
      whileInView={prefersReduced ? undefined : "show"}
      variants={v}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
