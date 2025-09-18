"use client";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Beaker, Box, Brain, GalleryHorizontal, Users } from "lucide-react";

export function Features({ t }: { t: (s: string) => string }) {
  // Map icons to items order: Ateliers scientifiques, Expositions virtuelles, Animation 3D, Panels IA, Clubs & Mentorat
  const icons = [Beaker, GalleryHorizontal, Box, Brain, Users];
  return (
    <section id="features" className="py-20 scroll-mt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(COPY.featuresTitle) as any} subtitle={t(COPY.featuresSubtitle) as any} />
        <div className="mt-12 grid md:grid-cols-3 gap-7">
          {COPY.featuresItems.map((f: { title: string; desc: string }, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={f.title} delay={i * 0.06} effect={i % 2 ? "zoomIn" : "fadeUp"}>
                <div className="rounded-2xl border border-slate-300 bg-white/70 backdrop-blur-sm p-7 h-full shadow-sm dark:border-white/10 dark:bg-white/5">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[rgba(241,192,22,0.20)] to-[rgba(241,192,22,0.30)] grid place-items-center mb-4 dark:from-[rgba(241,192,22,0.30)] dark:to-white/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-edu-heading">{t(f.title)}</h3>
                  <p className="mt-2 text-base text-edu-body">{t(f.desc)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
