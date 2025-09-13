"use client";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { Modal } from "@/front/components/ui/Modal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { useState } from "react";

export function Contact({ t }: { t: (s: string) => string }) {
  const [sent, setSent] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  return (
  <section id="contact" className="py-20 scroll-mt-24">
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(COPY.contactTitle)} subtitle={t(COPY.contactDesc)} />
        <AnimatedReveal delay={0.08}>
          {sent ? (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 text-green-800 p-6 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300">
              {t("Merci pour votre message ! Nous vous répondrons sous 24-48h.")}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-5">
              {/* Info card */}
              <div className="md:col-span-2 rounded-2xl border border-slate-300 bg-white/60 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="font-semibold text-edu-heading">{t("Coordonnées")}</h3>
                <p className="mt-2 text-sm text-edu-body">{t("Écrivez-nous pour toute question ou idée. Nous répondons sous 24-48h.")}</p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(241,192,22,0.2)]">📧</span> contact@techpourscience.org</div>
                  <div className="flex items-center gap-3"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(241,192,22,0.2)]">📞</span> +225 •••• •• ••</div>
                </div>
                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10"/>
                <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">{t("Vos informations ne sont utilisées que pour vous répondre.")}</p>
              </div>
              {/* Form card */}
              <form onSubmit={(e)=>{e.preventDefault(); setSent(true); setSuccessOpen(true);}} className="md:col-span-3 grid gap-4 rounded-2xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" placeholder={t("Nom & Prénom")} />
                  <input required type="email" className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" placeholder={t("Email")} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" placeholder={t("Téléphone (optionnel)")} />
                  <select className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" defaultValue="">
                    <option value="" disabled>{t("Sujet de la demande")}</option>
                    <option>{t("Question générale")}</option>
                    <option>{t("Partenariat")}</option>
                    <option>{t("Inscription")}</option>
                    <option>{t("Autre")}</option>
                  </select>
                </div>
                <textarea rows={6} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" placeholder={t("Votre message")} />
                <div className="flex items-center gap-3">
                  <button type="submit" className="px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition w-fit">{t("Envoyer")}</button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t("Temps de réponse moyen: 24h")}</span>
                </div>
              </form>
            </div>
          )}
        </AnimatedReveal>
      </div>
    <Modal open={successOpen} title={t("Succès")} onClose={()=>setSuccessOpen(false)} closeLabel={t("Fermer")}>
        <div className="flex flex-col items-start gap-3">
      <p className="text-green-700 dark:text-green-300 font-medium">{t("Votre message a été envoyé avec succès. Merci !")}</p>
      <button onClick={()=>setSuccessOpen(false)} className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">{t("Fermer")}</button>
        </div>
      </Modal>
    </section>
  );
}
