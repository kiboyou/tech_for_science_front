import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { Rocket } from "lucide-react";

export function Impacts({ t }: { t: (s: string) => string }) {
  return (
  <section id="impacts" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <SectionTitle title={t(COPY.impactsTitle)} />
  <div className="mt-12 grid md:grid-cols-4 gap-7">
          {COPY.impactsItems.map((it, i) => (
            <AnimatedReveal key={it} delay={i * 0.06} effect={i % 2 === 0 ? "fadeUp" : "rotateIn"}>
              <div className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-7 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
                <Rocket className="h-8 w-8 mx-auto" />
                <p className="mt-3 text-base text-slate-700 dark:text-slate-300">{t(it)}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
