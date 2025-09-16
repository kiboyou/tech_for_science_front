"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { useEquipe } from "@/front/lib/useApi";
import { useEffect, useRef, useState } from "react";

type Member = { name: string; role: string; desc?: string; image?: string };

export function Equipe({ t }: { t: (s: string) => string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Auto-scroll diaporama
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const items = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
      if (!items.length) return;
      const next = (index + 1) % items.length;
      const target = items[next];
      if (next === 0) {
        // Jump back to start without smooth to avoid long rewind
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
      }
      setIndex(next);
    }, 3500);
    return () => clearInterval(id);
  }, [index]);

  const { data } = useEquipe();
  const raw = (data && data.length
    ? data.map(m => ({ name: m.name, role: m.role || "", desc: m.bio || "", image: m.photo || undefined, featured: !!m.is_featured }))
    : ((COPY.equipeMembers as unknown as (Member & {featured?:boolean})[]) || []).map((m, i) => ({...m, featured: i===0})));
  const featured = raw.find(m => m.featured);
  const others = raw.filter(m => m !== featured);

  return (
    <section id="equipe" className="py-20 scroll-mt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(COPY.equipeTitle ?? "Notre équipe")} subtitle={t(COPY.equipeSubtitle ?? "Présentation des membres")} />
        <AnimatedReveal>
          {featured ? (
            <div className="mt-8">
              <article className="relative overflow-hidden rounded-3xl bg-transparent">
                <div className="grid gap-0 md:grid-cols-2">
                  {featured.image ? (
                    <div className="h-80 md:h-[520px] flex items-center justify-center p-0 md:p-0">
                      <div className="group relative h-full w-[70%] md:w-[55%] mx-auto rounded-[32px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={featured.image} alt={t(featured.name)} decoding="async" className="block h-full w-full max-h-full max-w-full rounded-[32px] object-cover border border-slate-300/70 dark:border-white/20" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                      </div>
                    </div>
                  ) : (
                    <div className="h-72 md:h-[460px] grid place-items-center bg-gradient-to-br from-[rgba(241,192,22,0.25)] to-white/40">
                      <span className="text-5xl font-extrabold text-slate-900/90 dark:text-white/90">{getInitials(t(featured.name))}</span>
                    </div>
                  )}
                  <div className="relative p-7 md:p-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--edu-primary))] text-slate-900 px-3 py-1 text-xs font-semibold tracking-wide shadow-sm">
                      À la une
                    </span>
                    <h3 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                      {t(featured.name)}
                    </h3>
                    <p className="mt-1 text-[15px] italic text-slate-700 dark:text-slate-300">{t(featured.role)}</p>
                    {featured.desc ? (
                      <p className="mt-4 text-base leading-relaxed text-slate-800 dark:text-slate-200">
                        {t(featured.desc)}
                      </p>
                    ) : null}
                    <div className="mt-6 h-px w-24 bg-gradient-to-r from-[rgb(var(--edu-primary))] to-transparent" />
                  </div>
                </div>
              </article>
            </div>
          ) : null}
          
        </AnimatedReveal>
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "?";
}

{/* <div
            ref={listRef}
            className="mt-8 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0"
            style={{ scrollbarWidth: "none" as any }}
          >
            <div className="flex gap-4 sm:gap-6 pr-4 max-w-full">
              {others.map((m, i) => (
                <article
                  key={(m.name || "") + i}
                  data-slide
                  className="w-72 sm:w-80 flex-shrink-0 rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm overflow-hidden shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  
                  {m.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden p-0 flex items-center justify-center">
                      <div className="group relative h-full w-full rounded-xl overflow-hidden">
                        <Image src={m.image} alt={t(m.name)} fill className="object-contain" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 grid place-items-center bg-gradient-to-br from-[rgba(241,192,22,0.5)] to-white/40">
                      <span className="text-3xl font-bold text-slate-900">{getInitials(t(m.name))}</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg leading-tight break-words">{t(m.name)}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 break-words">{t(m.role)}</p>
                    {m.desc ? (
                      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 break-words hyphens-auto line-clamp-6">{t(m.desc)}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div> */}