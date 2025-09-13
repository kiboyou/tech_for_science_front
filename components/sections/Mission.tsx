import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";

export function Mission({ t }: { t: (s: string) => string }) {
  return (
  <section id="mission" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(COPY.missionTitle)} subtitle={t(COPY.missionDesc)} />
  <div className="mt-12 grid lg:grid-cols-2 gap-7 items-start">
          <div className="grid sm:grid-cols-2 gap-4">
            {COPY.missionPoints.map((it, idx) => (
              <AnimatedReveal key={it} delay={idx * 0.05} effect={idx % 2 === 0 ? "zoomIn" : "fadeUp"}>
                <div className="rounded-2xl p-6 bg-white/20 backdrop-blur-sm border border-slate-300 shadow-sm dark:bg-white/5 dark:border-white/10">
                  <h3 className="text-lg sm:text-xl font-semibold text-edu-heading">{t(it)}</h3>
                  <p className="mt-2 text-base text-edu-body">{t("Initiatives concrètes et mesurables, pilotées avec nos partenaires éducatifs.")}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
          <AnimatedReveal effect="slideRight">
            <div className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-lg sm:text-xl text-edu-body">{t("Nous créons des expériences qui donnent envie d'apprendre : manipulations, simulations 3D et démonstrations." )}</p>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
