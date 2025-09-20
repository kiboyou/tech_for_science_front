"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { api, AtelierDTO } from "@/front/lib/api";
import { COPY } from "@/front/lib/copy";
import { useAutoI18n } from "@/front/lib/i18n";
import { useAteliers } from "@/front/lib/useApi";
import { useSharedLang } from "@/front/lib/useLang";
import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const THEME_DEFS: { key: string; label: string; keywords: string[] }[] = [
  { key: 'ia', label: 'IA', keywords: ['ia', 'intelligence artificielle', 'ai'] },
  // Renamed to "Robotique virtuelle" and absorbs VR-related terms
  { key: 'robotique', label: 'Robotique virtuelle', keywords: ['robot', 'robotique', 'vr', 'réalité virtuelle', 'realite virtuelle', 'immersive', 'virtuelle'] },
  // Renamed to "3D" and restricted to 3D-related terms only
  { key: 'vr3d', label: '3D', keywords: ['3d', 'modélisation', 'modelisation', 'impression 3d', 'modele 3d'] },
  { key: 'stem', label: 'STEM', keywords: ['stem', 'science', 'tech', 'technologie', 'math', 'ingénierie', 'ingenierie'] },
];

const DEFAULT_IMG = 'https://res.cloudinary.com/djhpmgfha/image/upload/v1757529651/WhatsApp_Image_2025-09-10_at_19.29.04_vxld0c.jpg';

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
  const [themes, setThemes] = useState<string[]>([]);
  const [upcomingOnly, setUpcomingOnly] = useState(false);

  

  const filteredAteliers = useMemo(() => {
    const base = (ateliers || []).slice();
    const now = new Date();
    const normalize = (s?: string | null) => (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return base
      .filter((a) => {
        if (!themes.length) return true;
  const hay = normalize(`${a.title || ""} ${a.slug || ""} ${a.summary || ""} ${a.content || ""} ${a.location || ""}`);
        return themes.some((key) => {
          const def = THEME_DEFS.find((d) => d.key === key);
          return def ? def.keywords.some((k) => hay.includes(normalize(k))) : false;
        });
      })
      .filter((a) => {
        if (!upcomingOnly) return true;
  const start = a.start_date ? new Date(a.start_date) : null;
  const end = a.end_date ? new Date(a.end_date) : null;
        if (end) return end >= now; // include ongoing or future events
        if (start) return start >= now;
        return false;
      });
  }, [ateliers, themes, upcomingOnly]);

  const hasActiveFilters = themes.length > 0 || upcomingOnly;

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title={t(COPY.ateliersTitle)} />
        <div className="mt-2 flex justify-center sm:justify-end">
          <a href="/#ateliers" className="btn-pill btn-ghost">Retour à la section</a>
        </div>
        {/* Filtres au style des onglets Infos */}
        <section className="mt-6">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setThemes([])}
              aria-pressed={themes.length === 0}
              className={`px-4 py-2 rounded-xl border text-sm ${themes.length===0 ? 'bg-[rgb(var(--edu-primary))] text-slate-900 border-transparent' : 'border-slate-300 bg-white/20 dark:bg-white/10 dark:border-white/10'}`}
            >Tous</button>
            {THEME_DEFS.map(def => (
              <button
                key={def.key}
                type="button"
                onClick={() => setThemes(prev => prev.includes(def.key) ? prev.filter(k=>k!==def.key) : [...prev, def.key])}
                aria-pressed={themes.includes(def.key)}
                className={`px-4 py-2 rounded-xl border text-sm ${themes.includes(def.key) ? 'bg-[rgb(var(--edu-primary))] text-slate-900 border-transparent' : 'border-slate-300 bg-white/20 dark:bg-white/10 dark:border-white/10'}`}
              >{def.label}</button>
            ))}
            <button
              type="button"
              onClick={() => setUpcomingOnly(v=>!v)}
              aria-pressed={upcomingOnly}
              className={`px-4 py-2 rounded-xl border text-sm ${upcomingOnly ? 'bg-[rgb(var(--edu-primary))] text-slate-900 border-transparent' : 'border-slate-300 bg-white/20 dark:bg-white/10 dark:border-white/10'}`}
            >À venir seulement</button>
          </div>
        </section>
        {ateliers && ateliers.length > 0 && filteredAteliers.length === 0 ? (
          <div className="mt-6 text-center text-slate-600 dark:text-slate-300">
            <p>Aucun atelier ne correspond à ces filtres.</p>
            <div className="mt-3 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => { setThemes([]); setUpcomingOnly(false); }}
                className="btn-pill btn-ghost"
              >Réinitialiser les filtres</button>
            </div>
          </div>
        ) : null}
        {!hasActiveFilters && promoted && promoted.length ? (
          <div className="mt-8">
            {promoted.slice(0, 1).map((p) => (
              <article key={p.slug} className="rounded-2xl border border-amber-300 bg-amber-100/40 dark:bg-amber-200/10 dark:border-amber-200/30 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative overflow-hidden min-h-[220px] md:min-h-[320px] bg-slate-100/60 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.cover_image || DEFAULT_IMG}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e)=>{ const d = DEFAULT_IMG; if ((e.currentTarget as HTMLImageElement).src !== d) { (e.currentTarget as HTMLImageElement).src = d; } }}
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col justify-center">
                    <div className="text-xs uppercase tracking-wide text-amber-700">Atelier à la une</div>
                    <h3 className="font-semibold text-xl md:text-2xl mt-1 leading-tight">{p.title}</h3>
                    {p.summary ? <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{p.summary}</p> : null}
                    <div className="mt-3 flex gap-2 items-center">
                      <a href={`/ateliers/${p.slug}`} className="px-3 py-1.5 rounded-lg bg-[rgb(var(--edu-primary))] text-slate-900 text-sm font-semibold">{t(COPY.ateliersCtaDetails)}</a>
                      {p.start_date ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-300 bg-white/20 text-sm dark:bg-white/10 dark:border-amber-200/30 text-amber-800">
                          <CalendarDays className="h-4 w-4" />
                          <span>{new Date(p.start_date).toLocaleDateString()}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
        
        {!(ateliers || []).length ? (
          <p className="mt-10 text-center text-slate-500">Aucun atelier disponible.</p>
        ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredAteliers.map((a, i) => (
            <article
              key={a.slug || a.title || i}
              className="rounded-2xl border border-slate-200/60 bg-white/20 backdrop-blur-sm p-0 dark:border-white/10 dark:bg-white/5 overflow-hidden"
            >
              <div className="relative w-full aspect-[3/2] overflow-hidden min-h-[200px] md:min-h-[260px] bg-slate-100/60 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={((a.cover_image || a.images?.[0]?.image_url) as string) || DEFAULT_IMG}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e)=>{ const d = DEFAULT_IMG; if ((e.currentTarget as HTMLImageElement).src !== d) { (e.currentTarget as HTMLImageElement).src = d; } }}
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wide text-slate-500 inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{a.start_date ? new Date(a.start_date).toLocaleDateString() : "Date à venir"}</span>
                </div>
                <h3 className="font-semibold text-lg mt-1">{a.title}</h3>
                {a.summary ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{a.summary}</p> : null}
                <div className="mt-3 flex gap-2">
                  <a href={`/ateliers/${a.slug}`} className="px-3 py-1.5 rounded-lg bg-[rgb(var(--edu-primary))] text-slate-900 text-sm font-semibold">{t(COPY.ateliersCtaDetails)}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </main>
      <ClientFooter />
    </div>
  );
}
