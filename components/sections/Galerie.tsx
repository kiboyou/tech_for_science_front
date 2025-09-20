"use client";
import { MediaGrid } from "@/front/components/ui/MediaGrid";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";

export function Galerie({ t }: { t: (s: string) => string }) {
  const items: any[] = [];
  return (
  <Reveal>
  <section id="galerie" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("Galerie")} />
          <div className="mt-2 flex justify-center sm:justify-end">
            <a href="/galerie" className="btn-pill btn-ghost">{t('Voir toute la galerie')}</a>
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
  </Reveal>
  );
}
