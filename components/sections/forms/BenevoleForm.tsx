"use client";
import { API_BASE } from "@/front/lib/api";
import { useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";
import { useState } from "react";

export function BenevoleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [autre, setAutre] = useState("");
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, [
    "Merci ! Nous revenons vite vers vous.",
    "Rejoignez notre équipe et contribuez à la diffusion de la science auprès des jeunes.",
    "Nom & Prénom","Email","Téléphone","Ville / Localisation",
    "Domaine de compétences","Choisir…","Science","Animation 3D","Logistique","Communication","Administration","Autre",
    "Si 'Autre', précisez","Disponibilités","Semaine","Week-end","Vacances scolaires",
    "Pourquoi souhaitez-vous devenir bénévole ?","Devenir bénévole",
    "Une erreur est survenue. Réessayez."
  ]);
  if (sent) return <p className="text-green-700 dark:text-green-300 font-medium">{t("Merci ! Nous revenons vite vers vous.")}</p>;
  return (
    <form
      className="grid gap-3"
      onSubmit={async (e)=>{
        e.preventDefault();
        setError(null); setLoading(true);
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        const domainCode = String(fd.get("domaine") || "autre");
        const dispos = fd.getAll("dispos").map(String).join(",");
        const body = {
          name: String(fd.get("nom")||""),
          email: String(fd.get("email")||""),
          phone: String(fd.get("tel")||""),
          city: String(fd.get("ville")||""),
          domain: domainCode,
          domain_other: autre,
          availability: dispos,
          motivation: String(fd.get("motivation")||""),
        };
        try{
          const res = await fetch(`${API_BASE}/api/main/forms/benevoles/`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
          if(!res.ok) throw new Error(`HTTP ${res.status}`);
          setSent(true);
          onSuccess?.();
        }catch(err:any){ setError(t("Une erreur est survenue. Réessayez.")); }
        finally{ setLoading(false); }
      }}
    >
      <p className="text-sm text-slate-600 dark:text-slate-300">{t("Rejoignez notre équipe et contribuez à la diffusion de la science auprès des jeunes.")}</p>
      {error ? <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 px-3 py-2 text-sm dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">{error}</div> : null}
      <input required name="nom" placeholder={t("Nom & Prénom")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required type="email" name="email" placeholder={t("Email")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="tel" placeholder={t("Téléphone")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="ville" placeholder={t("Ville / Localisation")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <div>
        <label className="block text-sm mb-1">{t("Domaine de compétences")}</label>
        <select name="domaine" className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" defaultValue="">
          <option value="" disabled>{t("Choisir…")}</option>
          <option value="science">{t("Science")}</option>
          <option value="animation3d">{t("Animation 3D")}</option>
          <option value="logistique">{t("Logistique")}</option>
          <option value="communication">{t("Communication")}</option>
          <option value="administration">{t("Administration")}</option>
          <option value="autre">{t("Autre")}</option>
        </select>
        <input placeholder={t("Si 'Autre', précisez")} className="mt-2 bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" value={autre} onChange={e=>setAutre(e.target.value)} />
      </div>
      <fieldset className="grid gap-1">
        <legend className="text-sm">{t("Disponibilités")}</legend>
        <label className="flex items-center gap-2"><input type="checkbox" name="dispos" value="Semaine"/> {t("Semaine")}</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="dispos" value="Week-end"/> {t("Week-end")}</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="dispos" value="Vacances"/> {t("Vacances scolaires")}</label>
      </fieldset>
  <textarea name="motivation" placeholder={t("Pourquoi souhaitez-vous devenir bénévole ?")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" rows={4} />
  <button disabled={loading} type="submit" className="mt-1 px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition w-fit disabled:opacity-60">{t("Devenir bénévole")}</button>
    </form>
  );
}
