"use client";
import { api, InfoDTO } from "@/front/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PromotedInfoModal() {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState<InfoDTO | null>(null);
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    // Respect user dismissal for 24h, except in dev or when ?promo=1
    const forceShow = (() => {
      try {
        const qs = new URLSearchParams(window.location.search);
        return qs.get("promo") === "1";
      } catch { return false; }
    })();

    if (!forceShow && process.env.NODE_ENV !== "development") {
      try {
        const ts = localStorage.getItem("tps:infos:promo:dismissedAt");
        if (ts) {
          const delta = Date.now() - Number(ts);
          if (!isNaN(delta) && delta < 24 * 60 * 60 * 1000) return;
        }
      } catch {}
    }

    api.getInfosPromoted()
      .then(async (list) => {
        let first = list?.[0];
        if (!first && forceShow) {
          try {
            const all = await api.getInfos();
            first = all?.[0];
          } catch {}
        }
        if (first) {
          setInfo(first);
          setVisible(true);
          setTimeout(() => setShowAnim(true), 10);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (visible) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  const handleClose = () => {
    try { localStorage.setItem("tps:infos:promo:dismissedAt", String(Date.now())); } catch {}
    setShowAnim(false);
    setTimeout(() => setVisible(false), 180);
  };

  if (!visible || !info) return null;

  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/50 ${showAnim ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`} role="dialog" aria-modal="true" onClick={handleClose}>
      <div className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl ring-1 ring-amber-200/60 dark:ring-amber-200/20 ${showAnim ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'} transition duration-200`} onClick={(e)=>e.stopPropagation()}>
        <div className="grid sm:grid-cols-2 bg-amber-50 dark:bg-slate-900">
          <div className="relative min-h-[240px] sm:min-h-[360px] bg-amber-100/50 dark:bg-white/5">
            {info.cover_image ? (
              <Image src={info.cover_image} alt={info.title} fill sizes="50vw" className="object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/90 via-amber-50/60 to-transparent dark:from-slate-900/90 dark:via-slate-900/60" />
          </div>
          <div className="p-6 sm:p-8">
            <div className="text-xs uppercase tracking-wide text-amber-800 dark:text-amber-300">Info à la une</div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">{info.title}</h3>
            {info.excerpt ? <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base">{info.excerpt}</p> : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/infos/${info.slug}`} className="px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">Voir le détail</Link>
              <button onClick={handleClose} className="px-5 py-3 rounded-2xl border border-slate-300 bg-white/80 backdrop-blur text-slate-700 hover:bg-white transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">Fermer</button>
            </div>
          </div>
        </div>
        <button type="button" onClick={handleClose} aria-label="Fermer" className="absolute top-3 right-3 z-20 pointer-events-auto rounded-xl bg-white/80 text-slate-700 hover:bg-white p-2 shadow ring-1 ring-slate-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white">✕</button>
      </div>
    </div>
  );
}
