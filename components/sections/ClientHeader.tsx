"use client";
import { TEXT_POOL } from "@/front/lib/copy";
import { Lang, useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";
import { Header } from "./Header";

export function ClientHeader() {
  const [lang, setLang] = useSharedLang();
  const t = useAutoI18n(lang, TEXT_POOL);

  return (
    <Header
      lang={lang}
      t={t}
  onToggleLang={() => setLang(lang === "fr" ? "en" : "fr")}
      onSetLang={(l: Lang) => setLang(l)}
    />
  );
}
