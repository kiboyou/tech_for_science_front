"use client";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface AtelierItem {
  title: string;
  desc: string;
  meta: string;
  image?: string;
  images?: readonly string[];
  video?: string;
  location?: string;
  startDate?: string | null;
  content?: string;
}

export function AtelierDetailClient({ item }: { item: AtelierItem }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, [item.title, item.desc, item.meta, item.content || "", COPY.ateliersCtaInscrire]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const DEFAULT_IMG = 'https://res.cloudinary.com/djhpmgfha/image/upload/v1757529651/WhatsApp_Image_2025-09-10_at_19.29.04_vxld0c.jpg';

  const firstImage = (item.images && item.images[0]) || item.image || DEFAULT_IMG;
  const safe = (s?: string) => (s && s.trim().length ? s : DEFAULT_IMG);
  const displayDate = item.startDate ? (() => { try { return new Date(item.startDate!).toLocaleDateString(); } catch { return item.startDate as string; } })() : null;

  function renderContent(raw?: string) {
    const text = (raw && raw.trim().length ? raw : (item.desc || "")) || "";
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    const blocks: JSX.Element[] = [];
    let currentUL: string[] = [];
    let currentOL: string[] = [];
    const flushLists = () => {
      if (currentUL.length) {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc pl-5">
            {currentUL.map((li, i) => (<li key={i}>{li}</li>))}
          </ul>
        );
        currentUL = [];
      }
      if (currentOL.length) {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="list-decimal pl-5">
            {currentOL.map((li, i) => (<li key={i}>{li}</li>))}
          </ol>
        );
        currentOL = [];
      }
    };
    for (const line of lines) {
      const l = line.trim();
      if (!l) { flushLists(); continue; }
      // Recognize simple section headings (FR) like Objectifs, Déroulement, Bénéfices, etc.
      const isHeading = /^(objectifs?|déroulement|bénéfices?|programme|public|prérequis|infos? pratiques|matériel|matériels|tarifs?|formateur|formateurs?)\s*:?\s*$/i.test(l);
      if (isHeading) {
        flushLists();
        const h = l.replace(/:\s*$/, "");
        blocks.push(<h3 key={`h3-${blocks.length}`}>{h}</h3>);
        continue;
      }
      const ul = l.match(/^[-*]\s+(.*)$/);
      if (ul) { currentUL.push(ul[1]); continue; }
      const ol = l.match(/^\d+\.\s+(.*)$/);
      if (ol) { currentOL.push(ol[1]); continue; }
      flushLists();
      blocks.push(<p key={`p-${blocks.length}`}>{l}</p>);
    }
    flushLists();
    return (
      <div className="prose prose-slate prose-lg md:prose-xl max-w-none dark:prose-invert leading-relaxed prose-p:text-justify prose-p:text-[1.2rem] md:prose-p:text-[1.3rem] lg:prose-p:text-[1.4rem] prose-p:leading-8 md:prose-p:leading-9 prose-li:text-justify prose-li:text-[1.2rem] md:prose-li:text-[1.3rem] lg:prose-li:text-[1.4rem] prose-li:my-2 prose-li:leading-8 md:prose-li:leading-9 prose-li:marker:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-a:text-edu-primary hover:prose-a:opacity-90 prose-h3:mt-6 md:prose-h3:mt-8 prose-h3:mb-3 md:prose-h3:mb-4 prose-h3:text-[1.25rem] md:prose-h3:text-[1.5rem] lg:prose-h3:text-[1.625rem] prose-h3:font-semibold">
        {blocks}
      </div>
    );
  }

  function isYouTube(url: string) {
    try { const u = new URL(url); return /(^|\.)youtube\.com$/.test(u.hostname) || u.hostname === 'youtu.be'; } catch { return false; }
  }
  function isVimeo(url: string) {
    try { const u = new URL(url); return /(^|\.)vimeo\.com$/.test(u.hostname); } catch { return false; }
  }
  function toYouTubeEmbed(url: string) {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      if (/youtube\.com$/.test(u.hostname)) {
        const id = u.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
        // support /embed/ already
        if (u.pathname.startsWith('/embed/')) return url;
      }
    } catch {}
    return url;
  }
  function toVimeoEmbed(url: string) {
    try {
      const u = new URL(url);
      const match = u.pathname.match(/\/([0-9]+)/);
      if (match) return `https://player.vimeo.com/video/${match[1]}`;
    } catch {}
    return url;
  }
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
    <div className="pb-20 md:pb-28">
      {/* Title block matching Ateliers */}
  <div className="mt-6 md:mt-10 max-w-7xl mx-auto px-4 md:px-6">
        <SectionTitle title={t(item.title)} subtitle={t(item.meta)} />
      </div>
      {/* Two-column header: media left, text right */}
  <section className="mt-6 md:mt-10 max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-12 gap-7 md:gap-8 lg:gap-10">
        <div className="md:col-span-7 lg:col-span-8">
          {item.video ? (
            isYouTube(item.video) ? (
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={toYouTubeEmbed(item.video)}
                  className="absolute inset-0 h-full w-full"
                  title={t(item.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : isVimeo(item.video) ? (
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={toVimeoEmbed(item.video)}
                  className="absolute inset-0 h-full w-full"
                  title={t(item.title)}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-black" style={{ aspectRatio: '16 / 9' }}>
                <video
                  className="absolute inset-0 h-full w-full"
                  controls
                  playsInline
                  preload="metadata"
                  poster={firstImage}
                >
                  <source src={item.video} />
                </video>
              </div>
            )
          ) : (
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-slate-800" style={{ aspectRatio: '16 / 9' }}>
              <Image src={safe(firstImage)} alt={t(item.title)} fill className="object-cover" />
            </div>
          )}
        </div>
  <aside className="md:col-span-5 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-5 md:p-6">
          {(displayDate || item.location) ? (
            <div className="flex flex-wrap items-center gap-2">
              {displayDate ? (
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-white/10 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200">
                  <CalendarDays className="h-4 w-4" />
                  <span>{displayDate}</span>
                </div>
              ) : null}
              {item.location ? (
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-white/10 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
              ) : null}
            </div>
          ) : null}
            {item.desc ? (
              <p className="mt-4 text-slate-800 dark:text-slate-100 text-base md:text-[1.0625rem] leading-8 text-justify">{t(item.desc)}</p>
            ) : null}
          </div>
        </aside>
      </section>
      {/* Full content below the media */}
      {item.content && item.content.trim().length ? (
        <section id="content" className="text-xl mt-10 md:mt-12 border-t border-slate-200 dark:border-white/10 pt-8 md:pt-10 max-w-7xl mx-auto px-4 md:px-6">
          {renderContent(item.content)}
        </section>
      ) : null}
        {item.images?.length ? (
  <section id="media" className="mt-12 border-t border-slate-200 dark:border-white/10 pt-8 max-w-7xl mx-auto px-4 md:px-6">
          <h3 className="text-xl font-semibold">{t("Voir plus d’images")}</h3>
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {item.images.map((src, idx) => (
        <button
                key={src}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-300 bg-white/10 dark:bg-white/5 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--edu-primary))]"
                aria-label={t("Agrandir l’image")}
              >
                <Image src={safe(src)} alt={t(item.title)} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </button>
            ))}
          </div>
        </section>
      ) : null}

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
              <div className="relative w-full max-w-7xl h-[60vh] sm:h-[72vh]">
                {item.images && item.images.length > 0 ? (
                  <Image src={safe(item.images[lightboxIndex!]!)} alt={t(item.title)} fill className="object-contain" />
                ) : null}
              </div>
            </div>
            <div className="px-4 sm:px-6">
              {item.images && item.images.length > 1 ? (
                <div className="mb-3 overflow-x-auto no-scrollbar">
                  <div className="flex gap-2 min-w-max">
                    {item.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setLightboxIndex(i)}
                        className={`relative h-14 w-20 rounded-lg overflow-hidden border ${i === lightboxIndex ? 'border-white' : 'border-white/30'} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
                        aria-label={t("Aller à l’image") + ' ' + (i + 1)}
                      >
                        <Image src={safe(src)} alt={t(item.title)} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="pb-[max(1rem,env(safe-area-inset-bottom))] px-4 sm:px-6 flex items-center justify-between">
              <div className="text-sm text-white/80">
                {t("Image")} {lightboxIndex! + 1} / {item.images?.length ?? 0}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxIndex((i) => (i === null || !item.images ? null : (i - 1 + item.images.length) % item.images.length))}
                  className="rounded-xl border border-white/40 bg-white/10 px-4 py-2 hover:bg-white/20"
                >
                  {t("Précédent")}
                </button>
                <button
                  onClick={() => setLightboxIndex((i) => (i === null || !item.images ? null : (i + 1) % item.images.length))}
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
