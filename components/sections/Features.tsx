"use client";
import { Card } from "@/front/components/ui/Card";
import { IconBadge } from "@/front/components/ui/IconBadge";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionContainer } from "@/front/components/ui/SectionContainer";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Beaker, Box, Brain, Cpu, GalleryHorizontal, Users } from "lucide-react";
// no Next/Image needed for video

export function Features({ t }: { t: (s: string) => string }) {
  // Mapping explicite basé sur l'intitulé pour éviter la dépendance à l'ordre
  const iconMap: Record<string, any> = {
    "Ateliers scientifiques": Beaker,
    "Expositions virtuelles": GalleryHorizontal,
    "Animation 3D": Box,
    "Panels IA": Cpu,
    "Clubs & Mentorat": Users,
  };
  return (
    <SectionContainer id="features">
      <SectionTitle title={t(COPY.featuresTitle)} subtitle={t(COPY.featuresSubtitle)} />
      <div className="mt-16 grid gap-16 lg:grid-cols-12 items-start">
        <Reveal effect="slideLeft" className="lg:col-span-5">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[rgba(241,192,22,0.25)] via-[rgba(241,192,22,0.10)] to-transparent blur-2xl opacity-70 group-hover:opacity-90 transition" />
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(241,192,22,0.18),transparent_70%)] pointer-events-none" />
              <video
                src="https://res.cloudinary.com/djhpmgfha/video/upload/v1758329577/WhatsApp_Video_2025-09-19_at_22.54.29_tekjz2.mp4"
                className="w-full h-full object-cover aspect-[4/3]"
                controls
                playsInline
                muted
                loop
                autoPlay
                aria-label="Présentation — Ce que nous faisons"
              >
                Votre navigateur ne supporte pas la lecture vidéo HTML5.
              </video>
            </div>
          </div>
        </Reveal>
        <Reveal effect="fadeUp" className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-8">
            {COPY.featuresItems.map((f: { title: string; desc: string }, i: number) => {
              const Icon = iconMap[f.title] || Brain;
              return (
                <Reveal key={f.title} delay={i * 0.06} effect={i % 2 ? "zoomIn" : "fadeUp"}>
                  <Card variant="soft" className="flex items-start gap-4 p-5">
                    <IconBadge tone={i % 3 === 0 ? 'red' : i % 3 === 1 ? 'blue' : 'green'} size="md">
                      <Icon className="h-5 w-5" />
                    </IconBadge>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-edu-heading">{t(f.title)}</h3>
                      <p className="mt-1 text-sm text-edu-body leading-snug">{t(f.desc)}</p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
