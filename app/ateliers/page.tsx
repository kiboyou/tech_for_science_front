"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { TiltCard } from "@/front/components/ui/TiltCard";
import { api, AtelierDTO } from "@/front/lib/api";
import { COPY } from "@/front/lib/copy";
import { useAutoI18n } from "@/front/lib/i18n";
import { useAteliers } from "@/front/lib/useApi";
import { useSharedLang } from "@/front/lib/useLang";
import { useEffect, useState } from "react";

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
  const [promoted, setPromoted] = useState<AtelierDTO[] | null>(null);
  useEffect(() => { api.getAteliersPromoted().then(setPromoted).catch(()=>setPromoted([])); }, []);
  const { data: ateliers } = useAteliers();

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title={t(COPY.ateliersTitle)} />
        {promoted && promoted.length ? (
          <div className="mt-6">
            {promoted.slice(0,1).map(p => (
              <article key={p.slug} className="rounded-2xl border border-amber-300 bg-amber-100/40 dark:bg-amber-200/10 dark:border-amber-200/30 overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-2 gap-0">
                  {p.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                  ) : null}
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wide text-amber-700">Atelier à venir</div>
                    <h3 className="font-semibold text-2xl mt-1">{p.title}</h3>
                    {p.summary ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{p.summary}</p> : null}
                    <div className="mt-3 flex gap-2">
                      <a href="#inscription" className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold">{t(COPY.ateliersCtaInscrire)}</a>
                      <a href={`/ateliers/${p.slug}`} className="px-4 py-2 rounded-xl border border-slate-300 bg-white/20 dark:bg-white/10 dark:border-white/10">{t(COPY.ateliersCtaDetails)}</a>
                  </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
        {/* Removed redundant descriptive listing sentence per request */}
        {!(ateliers || []).length ? (
          <p className="mt-10 text-center text-slate-500">Aucun atelier disponible.</p>
        ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(ateliers || []).map((a, i) => (
            <div key={a.title} className={`anim-fade-up ${i===0?'':'anim-delay-'+((i%5)+1)}`}>
      <TiltCard className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-0 shadow-sm dark:border-white/10 dark:bg-white/5 transition-transform will-change-transform">
                <article className="p-6">
                  <div className="text-sm text-slate-400">{a.start_date ? new Date(a.start_date).toLocaleString() : ""}</div>
                  <h3 className="mt-3 font-semibold text-lg">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{a.summary || ""}</p>
                  <div className="mt-4 flex gap-2">
                    <a href="#inscription" className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t(COPY.ateliersCtaInscrire)}</a>
        <a href={`/ateliers/${a.slug}`} className="px-4 py-2 rounded-xl border border-slate-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-slate-700 shadow-sm transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">{t(COPY.ateliersCtaDetails)}</a>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
        )}
      </main>
      <ClientFooter />
    </div>
  );
}
