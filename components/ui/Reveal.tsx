"use client";
import React, { useEffect, useRef, useState } from "react";

// Map effect names to the CSS utility classes defined in globals.css
const EFFECT_CLASS: Record<string, string> = {
  fadeUp: "anim-fade-up",
  fadeIn: "anim-fade-in",
  zoomIn: "anim-zoom-in",
  slideLeft: "anim-slide-left",
  slideRight: "anim-slide-right",
  rotateIn: "anim-rotate-in",
};

export type RevealEffect = keyof typeof EFFECT_CLASS;

interface RevealProps {
  children: React.ReactNode;
  effect?: RevealEffect;
  delay?: number; // seconds
  className?: string;
  as?: keyof Pick<JSX.IntrinsicElements, 'div' | 'section' | 'article' | 'span' | 'li'>; // limited to reduce complex unions
  once?: boolean; // default true
  rootMargin?: string; // intersection observer margin
}

export function Reveal({
  children,
  effect = "fadeUp",
  delay = 0,
  className = "",
  as: Tag = "div",
  once = true,
  rootMargin = "-10% 0px -10% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, prefersReduced]);

  const effectClass = EFFECT_CLASS[effect] || EFFECT_CLASS.fadeUp;
  const styleDelay = delay ? { animationDelay: `${delay}s` } : undefined;

  const appliedClasses = `${className} ${!visible && !prefersReduced ? effectClass : ''}`.trim();
  const finalClassName = visible ? appliedClasses : `${appliedClasses} will-change-transform will-change-opacity`;
  return (
    <Tag ref={ref as any} className={finalClassName} style={styleDelay}>
      {children}
    </Tag>
  );
}