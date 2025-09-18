"use client";
import { Card } from "@/front/components/ui/Card";
import { IconBadge } from "@/front/components/ui/IconBadge";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionContainer } from "@/front/components/ui/SectionContainer";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Brain, Compass, Cpu, Sparkles, Users } from "lucide-react";
import Image from "next/image";

export function Impacts({ t }: { t: (s: string) => string }) {
  return (
    <SectionContainer id="impacts">
      <SectionTitle title={t(COPY.impactsTitle)} />
        <div className="mt-16 grid gap-20 lg:grid-cols-12 items-stretch">
          <Reveal effect="fadeUp" className="lg:col-span-7 h-full">
            <div className="relative h-full">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-[rgba(241,192,22,0.10)] dark:bg-[rgba(241,192,22,0.18)] rounded-full blur-3xl" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-5 h-full">
                {COPY.impactsItems.map((it, i) => {
                  // Mapping explicite par valeur exacte
                  const iconRegistry: Record<string, { Icon: any; tone: 'red' | 'blue' | 'green'; effect: string }> = {
                    'Compréhension renforcée': { Icon: Brain, tone: 'blue', effect: 'zoomIn' },
                    'Phénomènes simulés en 3D/VR': { Icon: Cpu, tone: 'green', effect: 'fadeUp' },
                    'Orientation vers filières STEM': { Icon: Compass, tone: 'red', effect: 'slideRight' },
                    '+ Représentation féminine': { Icon: Users, tone: 'blue', effect: 'fadeUp' },
                  };
                  const fallback = { Icon: Sparkles, tone: 'blue' as const, effect: 'fadeUp' };
                  const cfg = iconRegistry[it] || fallback;
                  const { Icon, tone, effect } = cfg;
                  const glowClass = tone === 'red' ? 'bg-[rgba(225,29,72,0.18)]' : tone === 'blue' ? 'bg-[rgba(37,99,235,0.18)]' : 'bg-[rgba(34,197,94,0.18)]';
                  return (
                    <Reveal key={it} delay={i * 0.06} effect={effect}>
                      <Card variant="soft" className="p-5 flex flex-col items-center gap-4 group relative overflow-hidden h-full">
                        <span className={`absolute -left-8 -top-10 w-36 h-36 rounded-full blur-3xl opacity-60 ${glowClass}`} />
                        <div>
                          <IconBadge tone={tone} size="lg">
                            <Icon />
                          </IconBadge>
                        </div>
                        <div className="flex-1" />
                        <div className="w-full flex items-center justify-center">
                          <p className="text-base sm:text-lg text-edu-body leading-snug font-medium tracking-tight text-center">{t(it)}</p>
                        </div>
                        <span className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-70 transition text-[rgb(var(--edu-accent))]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                        </span>
                      </Card>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <Reveal effect="slideRight" className="lg:col-span-5 order-first lg:order-none">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[rgba(241,192,22,0.25)] via-[rgba(241,192,22,0.10)] to-transparent blur-2xl opacity-70 group-hover:opacity-90 transition" />
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(241,192,22,0.18),transparent_70%)] pointer-events-none" />
                <Image src="https://res.cloudinary.com/djhpmgfha/image/upload/v1757977673/IMG_0547_qwddc6.jpg" alt="impacts" width={1200} height={900} className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </div>
          </Reveal>
        </div>
    </SectionContainer>
  );
}
