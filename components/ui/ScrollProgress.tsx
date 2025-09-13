"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const v = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setP(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-1">
      <div
  className="h-full bg-gradient-to-r from-[rgba(241,192,22,0.9)] via-white to-[rgb(var(--edu-accent))]"
        style={{ width: `${p}%`, transition: "width 120ms linear" }}
      />
    </div>
  );
}
