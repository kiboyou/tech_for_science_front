import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";

export function Objectifs({ t }: { t: (s: string) => string }) {
  return (
  <section id="objectifs" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
    <SectionTitle title={t(COPY.objectifsTitle)} />
  <div className="mt-12 grid lg:grid-cols-3 gap-7">
          {[
            { title: "Éducatifs", points: COPY.educatifs },
            { title: "Sociaux", points: COPY.sociaux },
            { title: "ODD", points: COPY.odd },
          ].map(({ title, points }, i) => (
            <AnimatedReveal key={title} delay={i * 0.08} effect={i === 1 ? "slideLeft" : i === 2 ? "slideRight" : "zoomIn"}>
              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-300 p-7 shadow-sm dark:bg-white/5 dark:border-white/10">
                <h3 className="text-lg sm:text-xl font-semibold">{t(title)}</h3>
                <ul className="mt-3 space-y-2 text-base text-slate-700 dark:text-slate-300">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[rgb(var(--edu-accent))]" /> {t(p)}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
