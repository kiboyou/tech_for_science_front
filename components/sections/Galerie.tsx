"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { MediaGrid } from "@/front/components/ui/MediaGrid";
import { SectionTitle } from "@/front/components/ui/SectionTitle";

export function Galerie({ t }: { t: (s: string) => string }) {
  const items: any[] = [];
  return (
    <AnimatedReveal>
  <section id="galerie" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("Galerie")} />
          <div className="mt-2 flex justify-center sm:justify-end">
            <a href="/galerie" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-white/30 transition dark:border-white/10 dark:bg-white/5 dark:text-white">
              {t('Voir toute la galerie')}
            </a>
          </div>
        </div>
        {items.length === 0 ? (
          <p className="mt-8 text-center text-slate-500">Aucun média pour le moment.</p>
        ) : (
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <MediaGrid items={items as any} t={t} />
          </div>
        )}
      </section>
    </AnimatedReveal>
  );
}
