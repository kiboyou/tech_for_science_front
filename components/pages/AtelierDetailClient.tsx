"use client";
import { COPY } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import { CalendarDays, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface AtelierItem {
  title: string;
  desc: string;
  meta: string;
  content?: string;
  location?: string;
  startDate?: string | null;
  image?: string;
  images?: readonly string[];
  video?: string;
}

export function AtelierDetailClient({ item }: { item: AtelierItem }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, [item.title, item.desc, item.meta, item.location || "", COPY.ateliersCtaInscrire, "Voir plus d’images", "Agrandir l’image", "Fermer", "Précédent", "Suivant", "Image", "Retour aux ateliers"]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (!item.images || !item.images.length) return;
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? 0 : (i + 1) % item.images!.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? 0 : (i - 1 + item.images!.length) % item.images!.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, item.images]);

  return (
    <div>
      {/* Bold hero with image focus */}
      <section className="relative">
        <div className="relative h-[280px] sm:h-[360px] w-full">
          {item.image ? (
            <Image src={item.image} alt={t(item.title)} fill sizes="100vw" priority className="object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">{t(item.title)}</h1>
            {item.desc ? <p className="mt-2 max-w-3xl text-white/90 drop-shadow">{t(item.desc)}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#inscription" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t(COPY.ateliersCtaInscrire)}</a>
              <button onClick={() => navigator.share?.({ title: t(item.title), url: typeof window !== 'undefined' ? window.location.href : '' }).catch(()=>{})} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur text-white hover:bg-white/20 transition"><Share2 className="h-4 w-4" /> Partager</button>
            </div>
          </div>
        </div>
      </section>

      {/* Metadata strip */}
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur border-y border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
            {item.location ? (<span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {t(item.location)}</span>) : null}
            {item.startDate ? (<span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {new Date(item.startDate).toLocaleDateString()}</span>) : null}
          </div>
        </div>
      </div>

      {/* Optional hero video */}
      {item.video ? (
        <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-black dark:border-white/10">
            <video src={item.video} controls playsInline className="w-full h-auto" poster={item.image} />
          </div>
        </section>
      ) : null}

      {/* Content + Sidebar */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 min-w-0 space-y-6">
            {item.content ? (
              <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="prose prose-slate dark:prose-invert prose-img:rounded-xl prose-a:text-[rgb(var(--edu-accent))]" dangerouslySetInnerHTML={{ __html: toHtml(t(item.content)) }} />
              </div>
            ) : null}
            {/* Horizontal gallery strip */}
            {item.images?.length || item.video ? (
              <section id="media" className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="text-xl font-semibold">Voir plus d’images</h3>
                <div className="mt-4 overflow-x-auto no-scrollbar">
                  <div className="flex gap-4 snap-x snap-mandatory min-w-max pr-2">
                    {item.video ? (
                      <button
                        onClick={() => setLightboxIndex(0)}
                        className="group relative h-40 w-72 flex-shrink-0 overflow-hidden rounded-xl border border-slate-300 bg-white/10 dark:bg-white/5 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--edu-primary))] snap-start"
                        aria-label="Lire la vidéo"
                      >
                        <video src={item.video} className="h-full w-full object-cover" muted playsInline />
                        <span className="pointer-events-none absolute inset-0 bg-black/20 grid place-items-center text-white text-sm">Vidéo</span>
                      </button>
                    ) : null}
                    {(item.images || []).map((src, idx) => (
                      <button
                        key={src}
                        onClick={() => setLightboxIndex(item.video ? idx + 1 : idx)}
                        className="group relative h-40 w-72 flex-shrink-0 overflow-hidden rounded-xl border border-slate-300 bg-white/10 dark:bg-white/5 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--edu-primary))] snap-start"
                        aria-label="Agrandir l’image"
                      >
                        <Image src={src} alt={t(item.title)} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="text-xs uppercase tracking-wide text-slate-500">{t("Informations")}</div>
                <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
                  {item.location ? <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><MapPin className="h-4 w-4" /> {t(item.location)}</div> : null}
                  {item.startDate ? <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><CalendarDays className="h-4 w-4" /> {new Date(item.startDate).toLocaleDateString()}</div> : null}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <a href="/ateliers" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur hover:bg-white text-slate-700 transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">{t("Retour aux ateliers")}</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      {/* Removed duplicate bottom grid gallery to favor strip above */}

      {/* Lightbox modal */}
      {lightboxIndex !== null && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99998] bg-black/80 text-white overscroll-contain"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchStartX == null || !item.images || !item.images.length) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
            if (Math.abs(dx) > 40) {
              if (dx < 0) {
                // swipe left -> next
                setLightboxIndex((i) => (i === null ? 0 : (i + 1) % item.images!.length));
              } else {
                // swipe right -> prev
                setLightboxIndex((i) => (i === null ? 0 : (i - 1 + item.images!.length) % item.images!.length));
              }
            }
            setTouchStartX(null);
          }}
        >
          <div className="absolute top-3 right-3 flex gap-2 p-[max(0.5rem,env(safe-area-inset-top))]">
            <button onClick={() => setLightboxIndex(null)} aria-label={t("Fermer")}
              className="rounded-xl border border-white/40 bg-white/10 px-3 py-2 hover:bg-white/20">
              {t("Fermer")}
            </button>
          </div>
          <div className="h-full w-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
              <div className="relative w-full max-w-5xl h-[60vh] sm:h-[72vh]">
                {item.video && lightboxIndex === 0 ? (
                  <video src={item.video} controls playsInline className="h-full w-full object-contain" />
                ) : item.images && item.images.length > 0 ? (
                  <Image src={item.images[item.video ? lightboxIndex! - 1 : lightboxIndex!]} alt={t(item.title)} fill className="object-contain" />
                ) : null}
              </div>
            </div>
            <div className="px-4 sm:px-6">
              {(item.images && item.images.length > 1) || item.video ? (
                <div className="mb-3 overflow-x-auto no-scrollbar">
                  <div className="flex gap-2 min-w-max">
                    {item.video ? (
                      <button
                        onClick={() => setLightboxIndex(0)}
                        className={`relative h-14 w-20 rounded-lg overflow-hidden border ${lightboxIndex === 0 ? 'border-white' : 'border-white/30'} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
                        aria-label="Aller à la vidéo"
                      >
                        <video src={item.video} className="h-full w-full object-cover" muted playsInline />
                      </button>
                    ) : null}
                    {(item.images || []).map((src, i) => {
                      const idx = item.video ? i + 1 : i;
                      return (
                        <button
                          key={src}
                          onClick={() => setLightboxIndex(idx)}
                          className={`relative h-14 w-20 rounded-lg overflow-hidden border ${idx === lightboxIndex ? 'border-white' : 'border-white/30'} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
                          aria-label={t("Aller à l’image") + ' ' + (i + 1)}
                        >
                          <Image src={src} alt={t(item.title)} fill className="object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="pb-[max(1rem,env(safe-area-inset-bottom))] px-4 sm:px-6 flex items-center justify-between">
              <div className="text-sm text-white/80">
                {item.video ? (
                  lightboxIndex === 0 ? 'Vidéo' : `Image ${lightboxIndex!} / ${(item.images?.length || 0)}`
                ) : (
                  `Image ${lightboxIndex! + 1} / ${(item.images?.length || 0)}`
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxIndex((i) => {
                    if (i === null) return i;
                    const total = (item.images?.length || 0) + (item.video ? 1 : 0);
                    return (i - 1 + total) % total;
                  })}
                  className="rounded-xl border border-white/40 bg-white/10 px-4 py-2 hover:bg-white/20"
                >
                  {t("Précédent")}
                </button>
                <button
                  onClick={() => setLightboxIndex((i) => {
                    if (i === null) return i;
                    const total = (item.images?.length || 0) + (item.video ? 1 : 0);
                    return (i + 1) % total;
                  })}
                  className="rounded-xl border border-white/40 bg-white/10 px-4 py-2 hover:bg-white/20"
                >
                  {t("Suivant")}
                </button>
              </div>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
}

function toHtml(text: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safe = esc(text);
  const linked = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1<\/a>');
  return linked.replace(/\n/g, "<br/>");
}
