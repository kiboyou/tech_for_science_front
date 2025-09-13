"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import Image from "next/image";

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt?: string; loop?: boolean; muted?: boolean; autoPlay?: boolean };

export function MediaGrid({ items, t, title }: { items: Media[]; t: (s: string) => string; title?: string }) {
  return (
    <div>
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <div className="grid gap-5 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((m, idx) => (
            <AnimatedReveal key={idx} delay={idx * 0.05} effect={idx % 4 === 0 ? "zoomIn" : idx % 4 === 1 ? "fadeUp" : idx % 4 === 2 ? "slideLeft" : "slideRight"}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white aspect-video group dark:border-white/10 dark:bg-white/5">
                {m.type === "image" ? (
                  <Image src={m.src} alt={m.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    src={m.src}
                    poster={m.poster}
                    loop={m.loop ?? true}
                    muted={m.muted ?? true}
                    autoPlay={m.autoPlay ?? true}
                    playsInline
                  />
                )}
                <a
                  href={`/galerie/${idx}`}
                  className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition flex items-end"
                  aria-label={`${t('Voir')}`}
                >
                  <span className="m-3 px-3 py-1.5 text-xs rounded-lg bg-white text-slate-900 shadow-sm dark:bg-white/90">{t('Voir')}</span>
                </a>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
