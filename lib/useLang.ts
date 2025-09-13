"use client";
import { useEffect, useState } from "react";
import { DEFAULT_LANG, Lang } from "./i18n";

export function getStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const v = (localStorage.getItem("tps:lang") as Lang | null) ?? DEFAULT_LANG;
  return v === "en" ? "en" : "fr";
}

export function setStoredLang(lang: Lang) {
  try { localStorage.setItem("tps:lang", lang); } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<Lang>("tps:lang-change", { detail: lang } as any));
  }
}

export function useSharedLang(): [Lang, (l: Lang) => void] {
  // Initialize with DEFAULT_LANG to match server-rendered HTML and avoid hydration mismatch
  const [lang, _setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    // After mount, sync from storage and update <html lang>
    const initial = getStoredLang();
    _setLang((prev) => {
      const next = initial;
      if (prev !== next && typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", next);
      }
      return next;
    });
    const onStorage = (e: StorageEvent) => {
      if (e.key === "tps:lang" && (e.newValue === "fr" || e.newValue === "en")) {
        _setLang(e.newValue);
        if (typeof document !== "undefined") document.documentElement.setAttribute("lang", e.newValue);
      }
    };
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<Lang>).detail;
      if (detail === "fr" || detail === "en") {
        _setLang(detail);
        if (typeof document !== "undefined") document.documentElement.setAttribute("lang", detail);
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("tps:lang-change", onCustom as any);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tps:lang-change", onCustom as any);
    };
  }, []);

  const setLang = (l: Lang) => {
    _setLang(l);
    setStoredLang(l);
    if (typeof document !== "undefined") document.documentElement.setAttribute("lang", l);
  };
  return [lang, setLang];
}
