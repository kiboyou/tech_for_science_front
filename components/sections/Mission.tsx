"use client";
import { Card } from "@/front/components/ui/Card";
import { IconBadge } from "@/front/components/ui/IconBadge";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionContainer } from "@/front/components/ui/SectionContainer";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Activity, Compass, Layers, Lightbulb, Sparkles, Target } from "lucide-react";
import Image from "next/image";

export function Mission({ t }: { t: (s: string) => string }) {
  return (
    <SectionContainer id="mission">
      <SectionTitle title={t(COPY.missionTitle)} subtitle={t(COPY.missionDesc)} />
        <div className="mt-16 grid gap-16 lg:grid-cols-12 items-start">
          <Reveal effect="fadeUp" className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {COPY.missionPoints.map((it, idx) => {
                const IconSet = [Lightbulb, Target, Activity, Layers, Sparkles, Compass];
                const Icon = IconSet[idx % IconSet.length];
                // Nouveau mapping (3 couleurs demandées) :
                // Rouge = Orientation / Cap (Target, Compass)
                // Bleu = Innovation / Idée (Lightbulb, Sparkles)
                // Vert = Structure / Impact (Activity, Layers)
                const toneMap = new Map<any, 'red' | 'blue' | 'green'>([
                  [Target, 'red'],
                  [Compass, 'red'],
                  [Lightbulb, 'blue'],
                  [Sparkles, 'blue'],
                  [Activity, 'green'],
                  [Layers, 'green'],
                ]);
                const tone = toneMap.get(Icon) || 'neutral';
                return (
                  <Reveal key={it} delay={idx * 0.05} effect={idx % 2 === 0 ? "zoomIn" : "fadeUp"}>
                    <Card variant="soft" className="h-full p-5 flex flex-col">
                      <div className="flex items-start gap-4 mb-2">
                        <IconBadge tone={tone} size="md">
                          <Icon className="h-5 w-5" />
                        </IconBadge>
                        <h3 className="text-base font-semibold tracking-tight text-edu-heading leading-snug mt-1">{t(it)}</h3>
                      </div>
                      <p className="mt-auto text-sm text-edu-body leading-snug">{t("Initiatives concrètes et mesurables, pilotées avec nos partenaires éducatifs.")}</p>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
            <Card variant="soft" className="p-6">
              <div className="flex items-start gap-4">
                <IconBadge tone="blue" size="md">
                  <Lightbulb className="h-5 w-5" />
                </IconBadge>
                <p className="text-base sm:text-lg text-edu-body leading-relaxed">
                  {t("Nous créons des expériences qui donnent envie d'apprendre : manipulations, simulations 3D et démonstrations.")}
                </p>
              </div>
            </Card>
          </Reveal>
          <Reveal effect="slideRight" className="lg:col-span-5 order-first lg:order-none">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[rgba(241,192,22,0.18)] blur-xl opacity-60" />
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm">
                <Image src="https://res.cloudinary.com/djhpmgfha/image/upload/v1757977673/IMG_0547_qwddc6.jpg" alt="mission" width={1000} height={800} className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </div>
          </Reveal>
        </div>
    </SectionContainer>
  );
}
