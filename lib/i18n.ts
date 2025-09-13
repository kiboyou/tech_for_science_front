"use client";

import { useEffect, useMemo, useState } from "react";
import { EN_DICT } from "./i18n-dict";

export type Lang = "fr" | "en";
export const DEFAULT_LANG: Lang = "fr";
const MT_ENDPOINT = process.env.NEXT_PUBLIC_MT_ENDPOINT || "https://libretranslate.com/translate";

function hash(s: string) {
  let h = 0,
    i = 0,
    len = s.length;
  while (i < len) {
    h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  }
  return h.toString();
}

async function machineTranslateMany(texts: string[], from: Lang, to: Lang): Promise<string[]> {
  const out: string[] = [];
  for (const t of texts) {
    const body = { q: t, source: from, target: to, format: "text" } as any;
    const res = await fetch(MT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) {
      out.push(t);
      continue;
    }
    const data = await res.json();
    out.push(data.translatedText ?? t);
  }
  return out;
}

export function useAutoI18n(lang: Lang, texts: string[]) {
  const [map, setMap] = useState<Record<string, string>>({});
  const textsKey = useMemo(() => JSON.stringify(texts), [texts]);

  useEffect(() => {
    if (lang === DEFAULT_LANG) {
      setMap({});
      return;
    }
    // Prefill from built-in dictionary for instant switch without waiting on MT
    const cached: Record<string, string> = {};
    const missing: string[] = [];
    texts.forEach((t) => {
      if (EN_DICT[t]) {
        cached[t] = EN_DICT[t];
        return;
      }
      const key = `${lang}:${hash(t)}`;
      const v = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      if (v) cached[t] = v;
      else missing.push(t);
    });
    setMap(cached);

    if (missing.length) {
      machineTranslateMany(missing, DEFAULT_LANG, lang)
        .then((translations) => {
          const mm: Record<string, string> = {};
          missing.forEach((src, i) => {
            const tr = translations[i] ?? src;
            mm[src] = tr;
            if (typeof window !== "undefined") localStorage.setItem(`${lang}:${hash(src)}`, tr);
          });
          setMap((prev) => ({ ...prev, ...mm }));
        })
        .catch(() => {});
    }
  }, [lang, textsKey, texts]);

  const t = (fr: string) => (lang === DEFAULT_LANG ? fr : map[fr] ?? EN_DICT[fr] ?? fr);
  return t;
}
