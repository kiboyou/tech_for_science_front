"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { GALLERY_ITEMS } from "@/front/lib/gallery";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalerieIndex() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, ["Galerie", ...GALLERY_ITEMS.map((g) => g.alt ?? "Media")]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);
  return (
    <>
      <ClientHeader />
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle title={t("Galerie")} />
      <div className="mt-2 flex justify-center sm:justify-end">
        <a href="/#galerie" className="btn-pill btn-ghost">Retour à la section</a>
      </div>
      <div className="mt-6 grid gap-5 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {GALLERY_ITEMS.map((g) => (
          <a key={g.id} href={`/galerie/${g.id}`} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white aspect-video group dark:border-white/10 dark:bg-white/5">
            {g.type === 'image' ? (
              <Image src={g.src} fill alt={g.alt} className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <video className="w-full h-full object-cover" src={g.src} poster={g.poster} loop autoPlay muted playsInline />
            )}
          </a>
        ))}
      </div>
      </main>
  <ClientFooter />
    </>
  );
}
