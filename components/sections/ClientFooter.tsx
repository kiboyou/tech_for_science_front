"use client";
import { Footer } from "@/front/components/sections/Footer";
import { TEXT_POOL } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import { useEffect, useState } from "react";

export function ClientFooter() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, TEXT_POOL);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);

  return <Footer t={t} />;
}
