"use client";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "tps:auto-en";

export function AutoENToggle({ onChange, className = "" }: { onChange?: (enabled: boolean) => void; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(KEY) === "1";
    setOn(v);
    onChange?.(v);
  }, [onChange]);

  useEffect(() => {
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch {}
  }, [on]);

  return (
    <button
      onClick={() => { setOn((p) => { const n = !p; onChange?.(n); return n; }); }}
  className={`h-9 w-9 rounded-xl ${on ? 'bg-[rgb(var(--edu-primary))] text-slate-900 hover:bg-[#f5cd43]' : 'bg-white/10 hover:bg-white/20'} transition grid place-items-center ${className}`}
      aria-pressed={on}
      aria-label="Auto English"
      title="Auto English"
    >
      <Languages className="h-4 w-4" />
    </button>
  );
}
