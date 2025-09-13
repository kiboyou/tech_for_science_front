"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ open, title, onClose, children, closeLabel = "Fermer" }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode; closeLabel?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="absolute inset-0 flex items-center justify-center p-0 md:p-4">
        <div className="w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:w-auto md:max-w-2xl rounded-none md:rounded-2xl border border-slate-300 bg-white shadow-xl overflow-hidden dark:border-white/10 dark:bg-slate-900">
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
            <h3 id="modal-title" className="text-base sm:text-lg font-semibold truncate pr-3">{title}</h3>
            <button onClick={onClose} aria-label={closeLabel} className="rounded-lg px-3 py-1 text-sm border border-slate-200 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/10">{closeLabel}</button>
          </div>
          <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(100dvh-64px)] md:max-h-[calc(85vh-64px)]">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
