"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { Modal } from "@/front/components/ui/Modal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { BenevoleForm } from "./forms/BenevoleForm";
import { EtablissementForm } from "./forms/EtablissementForm";
import { SponsorForm } from "./forms/SponsorForm";

export function Rejoindre({ t }: { t: (s: string) => string }) {
  const [open, setOpen] = useState<null | "benevole" | "sponsor" | "etab">(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const handleSuccess = () => { setSuccessOpen(true); setOpen(null); };
  return (
  <section id="nousrejoindre" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <SectionTitle title={t("Nous rejoindre")} />
  <div className="mt-10 grid md:grid-cols-3 gap-6">
    {COPY.rejoindreCards.map((c, i) => (
            <AnimatedReveal key={c.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="font-semibold flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5" /> {t(c.title)}
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t(c.desc)}</p>
                <button
      onClick={() => setOpen(i === 0 ? "benevole" : i === 1 ? "sponsor" : "etab")}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition"
                >
                  {t(c.cta)} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
  <Modal open={open==="benevole"} title={t("Devenir bénévole")} onClose={()=>setOpen(null)} closeLabel={t("Fermer")}>
        <BenevoleForm onSuccess={handleSuccess} />
      </Modal>
  <Modal open={open==="sponsor"} title={t("Devenir sponsor")} onClose={()=>setOpen(null)} closeLabel={t("Fermer")}>
        <SponsorForm onSuccess={handleSuccess} />
      </Modal>
  <Modal open={open==="etab"} title={t("Établissements")} onClose={()=>setOpen(null)} closeLabel={t("Fermer")}>
        <EtablissementForm onSuccess={handleSuccess} />
      </Modal>
    <Modal open={successOpen} title={t("Succès") } onClose={()=>setSuccessOpen(false)} closeLabel={t("Fermer")}>
        <div className="flex flex-col items-start gap-3">
      <p className="text-green-700 dark:text-green-300 font-medium">{t("Votre formulaire a été envoyé avec succès. Merci !")}</p>
      <button onClick={()=>setSuccessOpen(false)} className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t("Fermer")}</button>
        </div>
      </Modal>
    </section>
  );
}
