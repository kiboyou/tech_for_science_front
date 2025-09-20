"use client";
import { Card } from "@/front/components/ui/Card";
import { IconBadge } from "@/front/components/ui/IconBadge";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionContainer } from "@/front/components/ui/SectionContainer";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Beaker, BookOpen, Cpu, Globe2, GraduationCap, Handshake, HeartHandshake, ShieldAlert, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import Image from "next/image";

export function Objectifs({ t }: { t: (s: string) => string }) {
  // Données enrichies: items avec icônes par catégorie
  const educatifs = [
    { label: "Vulgariser via supports interactifs", Icon: BookOpen },
    { label: "Éveiller l’intérêt STEM (filles inclus)", Icon: Sparkles },
    { label: "Initier tôt à l’IA/robotique", Icon: Cpu },
    { label: "Croiser science, art & tech", Icon: Beaker },
  ];
  const sociaux = [
    { label: "Réduire les inégalités d’accès", Icon: Users2 },
    { label: "Renforcer la citoyenneté scientifique", Icon: ShieldCheck },
    { label: "Inclusion numérique", Icon: Globe2 },
    { label: "Lutter contre la désinformation", Icon: ShieldAlert },
  ];
  const odd = [
    { label: "ODD4: Éducation de qualité", Icon: GraduationCap },
    { label: "ODD5: Égalité des sexes", Icon: HeartHandshake },
    { label: "ODD9: Innovation & industrie", Icon: Cpu },
    { label: "ODD17: Partenariats", Icon: Handshake },
  ];

  function CategoryCard({
    title,
    items,
    tone,
    badgeIcon: BadgeIcon,
    itemsClassName,
    accentWide,
  }: {
    title: string;
    items: { label: string; Icon: any }[];
    tone: "blue" | "red" | "green";
    badgeIcon: any;
    itemsClassName?: string;
    accentWide?: boolean;
  }) {
    const blobBg =
      tone === "blue"
        ? "from-[rgba(37,99,235,0.20)] to-transparent"
        : tone === "red"
        ? "from-[rgba(225,29,72,0.22)] to-transparent"
        : "from-[rgba(34,197,94,0.22)] to-transparent";
    const underline =
      tone === "blue"
        ? "from-blue-400/70 via-blue-400/30 to-transparent"
        : tone === "red"
        ? "from-rose-400/70 via-rose-400/30 to-transparent"
        : "from-emerald-400/70 via-emerald-400/30 to-transparent";
    const chipHover =
      tone === "blue"
        ? "hover:border-blue-300/60 hover:bg-blue-50/60 dark:hover:border-blue-400/25 dark:hover:bg-blue-400/5"
        : tone === "red"
        ? "hover:border-rose-300/60 hover:bg-rose-50/60 dark:hover:border-rose-400/25 dark:hover:bg-rose-400/5"
        : "hover:border-emerald-300/60 hover:bg-emerald-50/60 dark:hover:border-emerald-400/25 dark:hover:bg-emerald-400/5";
    const hoverRing =
      tone === "blue"
        ? "hover:ring-blue-300/50 dark:hover:ring-blue-400/20"
        : tone === "red"
        ? "hover:ring-rose-300/50 dark:hover:ring-rose-400/20"
        : "hover:ring-emerald-300/50 dark:hover:ring-emerald-400/20";
    return (
      <Card variant="soft" className={`p-5 overflow-hidden h-full flex flex-col transition-all duration-300 will-change-transform hover:-translate-y-0.5 ${hoverRing}`}>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-white/0 via-white/70 to-white/0 dark:from-white/0 dark:via-white/10 dark:to-white/0" />
        <div className={`absolute -top-16 -right-24 w-72 h-72 bg-gradient-to-br ${blobBg} rounded-full blur-3xl opacity-70 pointer-events-none`} />
        <div className="flex items-start gap-3 mb-2.5">
          <IconBadge tone={tone} size="md">
            <BadgeIcon className="h-5 w-5" />
          </IconBadge>
          <h3 className="text-base md:text-xl font-semibold tracking-tight text-edu-heading leading-snug mt-1">{t(title)}</h3>
        </div>
        <div className={`h-[2px] ${accentWide ? 'w-14 md:w-20' : 'w-10 md:w-12'} rounded-full bg-gradient-to-r ${underline} mb-3`} />
        <ul className={`${itemsClassName ?? 'flex flex-wrap gap-1.5'}`}>
          {items.map(({ label }) => (
            <li key={label} className="list-none">
              <span className={`inline-flex items-center rounded-full border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-1.5 text-[14px] md:text-[15px] text-edu-body hover:-translate-y-0.5 hover:shadow-sm transition ${chipHover}`}>
                {t(label)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  return (
    <SectionContainer id="objectifs">
      <SectionTitle title={t(COPY.objectifsTitle)} />
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-stretch">
          <Reveal effect="slideLeft" className="lg:col-span-6 h-full">
            <div className="relative h-full">
              <div className="relative overflow-hidden rounded-4xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm h-full">
                <div className="relative h-full min-h-[280px] md:min-h-[360px] lg:min-h-[480px]">
                  <Image
                    src="https://res.cloudinary.com/djhpmgfha/image/upload/v1757977554/IMG_9555_bkt8ka.jpg"
                    alt="Objectifs"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
            <Reveal effect="slideRight" className="lg:col-span-6 h-full">
              <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <CategoryCard title="Éducatifs" items={educatifs} tone="blue" badgeIcon={BookOpen} />
                  <CategoryCard title="Sociaux" items={sociaux} tone="red" badgeIcon={Users2} />
                </div>
                <CategoryCard
                  title="Objectifs de développement durable (ODD)"
                  items={odd}
                  tone="green"
                  badgeIcon={GraduationCap}
                  itemsClassName="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-start"
                  accentWide
                />
              </div>
            </Reveal>
        </div>
    </SectionContainer>
  );
}
