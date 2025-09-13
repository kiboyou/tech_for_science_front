"use client";
import { Ateliers } from "@/front/components/sections/Ateliers";
import { Blog } from "@/front/components/sections/Blog";
import { Contact } from "@/front/components/sections/Contact";
import { Equipe } from "@/front/components/sections/Equipe";
import { Features } from "@/front/components/sections/Features";
import { Footer } from "@/front/components/sections/Footer";
import { Header } from "@/front/components/sections/Header";
import { Hero } from "@/front/components/sections/Hero";
import { Impacts } from "@/front/components/sections/Impacts";
import { Mission } from "@/front/components/sections/Mission";
import { Objectifs } from "@/front/components/sections/Objectifs";
import { Rejoindre } from "@/front/components/sections/Rejoindre";
import { TEXT_POOL } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import { useEffect, useState } from "react";

// Stable scene type and rotation order at module scope
export type Scene = "atom" | "molecule" | "lab" | "saturn";
const SCENES: Scene[] = ["lab", "saturn", "atom", "molecule"];

export default function TechPourScienceLandingImmersive() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [scene, setScene] = useState<Scene>("lab");
  const t = useAutoI18n(lang, TEXT_POOL);

  // Hydrate language from storage and reflect on <html lang>
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") {
        setLang(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("tps:lang", lang); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  // Auto-rotate 3D scenes every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setScene((prev) => {
        const idx = SCENES.indexOf(prev);
        const next = SCENES[(idx + 1) % SCENES.length];
        return next;
      });
  }, 20000);
    return () => clearInterval(id);
  }, []);

  return (
  <main className="min-h-screen bg-gradient-to-b from-white to-[#e8fbfd] dark:from-black dark:to-slate-950 text-slate-900 dark:text-white transition-colors">
      <Header
        lang={lang}
        t={t}
  onToggleLang={() => setLang(lang === "fr" ? "en" : "fr")}
  onSetLang={(l: Lang) => setLang(l)}
      />
      <Hero t={t} scene={scene} setScene={setScene} />
  <Features t={t} />
      <Mission t={t} />
  <Objectifs t={t} />
  <Ateliers t={t} />
  <Impacts t={t} />
  <Blog t={t} />
  <Equipe t={t} />
  <Rejoindre t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  );
}
