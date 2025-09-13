import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { MapPin, Users } from "lucide-react";

export function Partenaires({ t }: { t: (s: string) => string }) {
  return (
  <section id="partenaires" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <SectionTitle title={t(COPY.partenairesTitle)} />
  <div className="mt-12 grid md:grid-cols-2 gap-7">
          <AnimatedReveal effect="slideRight">
            <div className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" /> {t("Établissements 2025")}
              </h3>
              <ul className="mt-3 space-y-2 text-base text-slate-700 dark:text-slate-300">
                {COPY.etabs2025.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[rgb(var(--edu-accent))]" /> {t(e)}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1} effect="slideLeft">
  <div className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" /> {t("Partenaires")}
              </h3>
              <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{t(COPY.partnersNote)}</p>
              <div className="mt-5 grid grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
  <div key={i} className="h-20 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm grid place-items-center text-sm text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                    Logo {i}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
