"use client";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface AtelierItem {
  title: string;
  desc: string;
  meta: string;
  image?: string;
  images?: readonly string[];
}

export function AtelierDetailClient({ item }: { item: AtelierItem }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, [item.title, item.desc, item.meta, COPY.ateliersCtaInscrire]);
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
      <SectionTitle title={t(item.title)} subtitle={t(item.meta)} />
      <p className="mt-4 text-slate-700 dark:text-slate-300">{t(item.desc)}</p>
      <div className="mt-8">
  <a href="#inscription" className="px-5 py-3 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t(COPY.ateliersCtaInscrire)}</a>
      </div>
      {item.images?.length ? (
        <section id="media" className="mt-12">
          <h3 className="text-xl font-semibold">{t("Voir plus d’images")}</h3>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {item.images.map((src, idx) => (
        <button
                key={src}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-300 bg-white/10 dark:bg-white/5 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--edu-primary))]"
                aria-label={t("Agrandir l’image")}
              >
                <Image src={src} alt={t(item.title)} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
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
              <div className="relative w-full max-w-5xl h-[60vh] sm:h-[72vh]">
                {item.images && item.images.length > 0 ? (
                  <Image src={item.images[lightboxIndex!]} alt={t(item.title)} fill className="object-contain" />
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
                        <Image src={src} alt={t(item.title)} fill className="object-cover" />
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
