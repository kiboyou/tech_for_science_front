"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { Contact } from "@/front/components/sections/Contact";
import { TEXT_POOL } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, TEXT_POOL);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("tps:lang", lang); } catch {}
    if (typeof document !== "undefined") document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  return (
    <>
      <ClientHeader />
      <main className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Contact t={t} />
        </div>
      </main>
  <ClientFooter />
    </>
  );
}
