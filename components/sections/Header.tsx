"use client";
import { ThemeToggle } from "@/front/components/ui/ThemeToggle";
import { COPY } from "@/front/lib/copy";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Header({ lang, t, onToggleLang, onSetLang }: { lang: "fr" | "en"; t: (s: string) => string; onToggleLang: () => void; onSetLang: (l: "fr" | "en") => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close overlay on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // (Mobile translation toggle removed by design request)

  return (
  <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/50 bg-white/60 dark:bg-slate-900/40 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/20" />
  <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 min-w-0">
        {/* Brand */}
  <a href="/" className="flex items-center gap-2 sm:gap-3 font-semibold min-w-0">
          <Image
            src="/media/img_tech_s.png"
            alt={t(COPY.brand)}
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-2xl object-contain"
          />
          <span className="tracking-tight text-sm sm:text-base truncate">{t(COPY.brand)}</span>
        </a>

        {/* Desktop nav */}
  <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-base">
          {[
            { label: t(COPY.navHome ?? "Accueil"), href: "/" },
            { label: t(COPY.navAteliers ?? "Ateliers"), href: "/ateliers" },
            { label: t(COPY.navBlog ?? "Blog"), href: "/blog" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative rounded-xl px-5 py-2.5 transition ${
                isActive(item.href)
                  ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`pointer-events-none absolute left-4 right-4 -bottom-[3px] h-0.5 bg-gradient-to-r from-[rgb(var(--edu-primary))] to-[rgba(241,192,22,0.6)] transition-all duration-300 ${
                  isActive(item.href) ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop actions - simplified */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-1.5">
            <button onClick={() => onSetLang("fr")} className={`px-3 py-1.5 text-xs rounded-lg border transition ${lang==='fr' ? 'border-[rgb(var(--edu-primary))] bg-yellow-50 text-yellow-700 dark:border-[rgb(var(--edu-primary))] dark:bg-[rgba(241,192,22,0.10)] dark:text-[rgb(var(--edu-primary))]' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'}`}>FR</button>
            <button onClick={() => onSetLang("en")} className={`px-3 py-1.5 text-xs rounded-lg border transition ${lang==='en' ? 'border-[rgb(var(--edu-primary))] bg-yellow-50 text-yellow-700 dark:border-[rgb(var(--edu-primary))] dark:bg-[rgba(241,192,22,0.10)] dark:text-[rgb(var(--edu-primary))]' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'}`}>EN</button>
          </div>
          <a
            href="/#nousrejoindre"
            className="px-4 py-2 rounded-2xl bg-[rgb(var(--edu-primary))] hover:bg-[#f5cd43] text-slate-900 font-semibold transition flex items-center gap-2"
          >
            {t(COPY.ctaContacter)} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile actions (FR/EN restored) */}
        <div className="md:hidden flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSetLang("fr")}
              className={`px-2 py-1 text-[11px] rounded-lg border transition ${
                lang === 'fr'
                  ? 'border-[rgb(var(--edu-primary))] bg-yellow-50 text-yellow-700 dark:border-[rgb(var(--edu-primary))] dark:bg-[rgba(241,192,22,0.10)] dark:text-[rgb(var(--edu-primary))]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onSetLang("en")}
              className={`px-2 py-1 text-[11px] rounded-lg border transition ${
                lang === 'en'
                  ? 'border-[rgb(var(--edu-primary))] bg-yellow-50 text-yellow-700 dark:border-[rgb(var(--edu-primary))] dark:bg-[rgba(241,192,22,0.10)] dark:text-[rgb(var(--edu-primary))]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
              }`}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            className="h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 transition grid place-items-center flex-shrink-0"
            aria-label={t("Ouvrir le menu")}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu (portal to escape stacking contexts) */}
      {open && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] text-white bg-[rgb(var(--edu-accent))] overscroll-contain overflow-y-auto">
          <div role="dialog" aria-modal="true" className="min-h-screen flex flex-col">
          <div className="px-4 sm:px-6 lg:px-8 py-4 pt-[max(1rem,env(safe-area-inset-top))] flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 font-semibold" onClick={() => setOpen(false)}>
              <Image
                src="/media/img_tech_s.png"
                alt={t(COPY.brand)}
                width={36}
                height={36}
                priority
                className="h-9 w-9 rounded-2xl object-contain"
              />
              <span className="tracking-tight text-white">{t(COPY.brand)}</span>
            </a>
            <div className="flex items-center gap-2">
              {/* Overlay FR/EN toggle */}
              <div className="flex items-center gap-1.5">
                <button onClick={() => onSetLang('fr')} className={`px-2 py-1 text-[11px] rounded-lg border border-white/60 text-white transition ${lang==='fr' ? 'ring-1 ring-white' : 'hover:opacity-80'}`}>FR</button>
                <button onClick={() => onSetLang('en')} className={`px-2 py-1 text-[11px] rounded-lg border border-white/60 text-white transition ${lang==='en' ? 'ring-1 ring-white' : 'hover:opacity-80'}`}>EN</button>
              </div>
              <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-xl border border-white/60 text-white hover:opacity-80 grid place-items-center" aria-label={t("Fermer le menu")}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Full-screen single-color list */}
          <div className="px-3 sm:px-6 lg:px-8 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
            <nav className="mt-2 space-y-2">
              {[
                { label: t(COPY.navHome ?? "Accueil"), href: "/" },
                { label: t(COPY.navAteliers ?? "Ateliers"), href: "/ateliers" },
                { label: t(COPY.navBlog ?? "Blog"), href: "/blog" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block w-full px-5 py-4 text-base sm:text-lg text-white rounded-2xl border transition ${
                    isActive(item.href)
                      ? 'bg-[#269ca3] border-[#8edde1] font-semibold shadow'
                      : 'bg-[rgb(var(--edu-accent))] border-[#21969d] hover:bg-[#269ca3]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#nousrejoindre"
                onClick={() => setOpen(false)}
                className="block w-full px-5 py-4 text-base sm:text-lg text-white font-semibold rounded-2xl bg-[#269ca3] hover:bg-[#36bfc6] border border-[#8edde1]"
              >
                {t(COPY.ctaContacter)}
              </a>
            </nav>
          </div>
          </div>
        </div>, document.body
      )}
    </header>
  );
}
