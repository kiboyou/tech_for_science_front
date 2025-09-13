import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { TiltCard } from "@/front/components/ui/TiltCard";
import { COPY } from "@/front/lib/copy";
import { slugify } from "@/front/lib/slugify";
import { useAteliers } from "@/front/lib/useApi";
import { CalendarDays, Images } from "lucide-react";
import Image from "next/image";

export function Ateliers({ t }: { t: (s: string) => string }) {
  const { data, loading } = useAteliers();
  const items = (data && data.length ? data.map(a => ({
    title: a.title,
    desc: a.summary || "",
    meta: [a.location, a.start_date ? new Date(a.start_date).toLocaleDateString() : ""].filter(Boolean).join(" — "),
    image: a.cover_image || undefined,
    images: a.images?.map(i => i.image_url) as readonly string[] | undefined,
  })) : COPY.ateliersItems);
  return (
  <section id="ateliers" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(COPY.ateliersTitle)} />
        <div className="mt-2 flex justify-center sm:justify-end">
          <a href="/ateliers" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm text-slate-700 hover:bg-white/90 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-white">
            {t(COPY.ateliersVoirTout)}
          </a>
        </div>
  {/* Removed 'Voir le calendrier complet' button per request */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((a, i) => (
            <AnimatedReveal key={a.title} delay={i * 0.08} effect={i % 3 === 0 ? "slideLeft" : i % 3 === 1 ? "zoomIn" : "slideRight"}>
              <TiltCard className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm p-0 shadow-sm dark:border-white/10 dark:bg-white/5">
                <article>
                  {"image" in a && a.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                      <Image src={a.image} alt={t(a.title)} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CalendarDays className="h-4 w-4" /> {t(a.meta)}
                  </div>
                  <h3 className="mt-3 font-semibold text-lg">{t(a.title)}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t(a.desc)}</p>
                  <div className="mt-4 flex gap-2">
                    <a href="#inscription" className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t(COPY.ateliersCtaInscrire)}</a>
                    <a href={`/ateliers/${slugify(a.title)}`} className="px-4 py-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 shadow-sm transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">{t(COPY.ateliersCtaDetails)}</a>
                    {"images" in a && a.images?.length ? (
                      <a href={`/ateliers/${slugify(a.title)}#media`} className="px-3 py-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 shadow-sm transition inline-flex items-center gap-2 text-sm dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">
                        <Images className="h-4 w-4" /> {t("Voir plus d’images")}
                      </a>
                    ) : null}
                  </div>
                  </div>
                </article>
              </TiltCard>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
