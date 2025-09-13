"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { MediaGrid } from "@/front/components/ui/MediaGrid";
import { SectionTitle } from "@/front/components/ui/SectionTitle";

export function Galerie({ t }: { t: (s: string) => string }) {
  const items = [
    { type: "image", src: "/media/sample-1.jpg", alt: "Atelier 1" },
    { type: "image", src: "/media/sample-2.jpg", alt: "Atelier 2" },
    { type: "video", src: "/media/sample-clip.mp4", poster: "/media/sample-3.jpg" },
    { type: "image", src: "/media/sample-4.jpg", alt: "Atelier 3" },
    { type: "image", src: "/media/sample-5.jpg", alt: "Atelier 4" },
    { type: "image", src: "/media/sample-6.jpg", alt: "Atelier 5" },
  ] as const;
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
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <MediaGrid items={items as any} t={t} />
        </div>
      </section>
    </AnimatedReveal>
  );
}
