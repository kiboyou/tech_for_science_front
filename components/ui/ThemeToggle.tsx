"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "tps:theme:v2";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(KEY) as any) : null;
    let initial: "light" | "dark" = "light";
    if (stored === "light" || stored === "dark") {
      initial = stored;
    } else if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initial = "dark";
    }
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try { localStorage.setItem(KEY, theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className={`h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20 dark:border-white/10 transition grid place-items-center ${className}`}
      aria-label="toggle theme"
      title={theme === "dark" ? "Passer en clair" : "Passer en sombre"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
