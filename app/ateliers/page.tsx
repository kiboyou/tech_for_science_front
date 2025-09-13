"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { TiltCard } from "@/front/components/ui/TiltCard";
import { COPY } from "@/front/lib/copy";
import { useAutoI18n } from "@/front/lib/i18n";
import { slugify } from "@/front/lib/slugify";
import { useSharedLang } from "@/front/lib/useLang";
import { useEffect } from "react";

export default function AteliersIndex() {
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, [
    COPY.ateliersTitle,
    COPY.ateliersVoirTout,
    COPY.ateliersCalendrier,
    ...COPY.ateliersItems.flatMap((a) => [a.title, a.desc, a.meta]),
    COPY.ateliersCtaInscrire,
    COPY.ateliersCtaDetails,
  ]);
  useEffect(() => {}, [lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title={t(COPY.ateliersTitle)} />
        <AnimatedReveal>
          <p className="mt-2 text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("Listing des ateliers à venir.")}
          </p>
        </AnimatedReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {COPY.ateliersItems.map((a, i) => (
            <AnimatedReveal key={a.title} delay={i * 0.06} effect={i % 3 === 0 ? "slideLeft" : i % 3 === 1 ? "zoomIn" : "slideRight"}>
      <TiltCard className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-0 shadow-sm dark:border-white/10 dark:bg-white/5">
                <article className="p-6">
                  <div className="text-sm text-slate-400">{t(a.meta)}</div>
                  <h3 className="mt-3 font-semibold text-lg">{t(a.title)}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t(a.desc)}</p>
                  <div className="mt-4 flex gap-2">
                    <a href="#inscription" className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t(COPY.ateliersCtaInscrire)}</a>
        <a href={`/ateliers/${slugify(a.title)}`} className="px-4 py-2 rounded-xl border border-slate-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-slate-700 shadow-sm transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">{t(COPY.ateliersCtaDetails)}</a>
                  </div>
                </article>
              </TiltCard>
            </AnimatedReveal>
          ))}
        </div>
      </main>
      <ClientFooter />
    </div>
  );
}
