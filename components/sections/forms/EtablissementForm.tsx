"use client";
import { API_BASE } from "@/front/lib/api";
import { useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";
import { useState } from "react";

export function EtablissementForm({ onSuccess }: { onSuccess?: () => void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, [
    "Merci ! Nous vous contacterons prochainement.",
    "Invitez Tech Pour Science dans votre établissement et offrez une expérience scientifique unique à vos élèves.",
    "Nom de l’établissement",
    "Nom & Prénom du responsable",
    "Fonction",
    "Email",
    "Téléphone",
    "Type de partenariat souhaité",
    "Ateliers","Conférences","Expositions","Formation","Autre",
    "Nombre estimé de participants (optionnel)",
    "Message / Détails de la demande",
    "Proposer un partenariat",
    "Une erreur est survenue. Réessayez."
  ]);
  if (sent) return <p className="text-green-700 dark:text-green-300 font-medium">{t("Merci ! Nous vous contacterons prochainement.")}</p>;
  return (
    <form
      className="grid gap-3"
      onSubmit={async (e)=>{
        e.preventDefault();
        setError(null);
        setLoading(true);
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        const partenariats = fd.getAll('partenariat').map(String).join(',');
        const body = {
          establishment_name: String(fd.get('etab')||''),
          responsible_name: String(fd.get('nom')||''),
          role: String(fd.get('fonction')||''),
          email: String(fd.get('email')||''),
          phone: String(fd.get('tel')||''),
          partnership_types: partenariats,
          participants: fd.get('participants') ? Number(fd.get('participants')) : null,
          details: String(fd.get('details')||''),
        };
        try{
          const res = await fetch(`${API_BASE}/api/main/forms/etablissements/`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
          if(!res.ok) throw new Error(`HTTP ${res.status}`);
          setSent(true);
          onSuccess?.();
        }catch(err:any){
          setError(t('Une erreur est survenue. Réessayez.'));
        } finally {
          setLoading(false);
        }
      }}
    >
      <p className="text-sm text-slate-600 dark:text-slate-300">{t("Invitez Tech Pour Science dans votre établissement et offrez une expérience scientifique unique à vos élèves.")}</p>
      {error ? <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 px-3 py-2 text-sm dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">{error}</div> : null}
      <input required name="etab" placeholder={t("Nom de l’établissement")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="nom" placeholder={t("Nom & Prénom du responsable")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="fonction" placeholder={t("Fonction")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required type="email" name="email" placeholder={t("Email")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="tel" placeholder={t("Téléphone")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <fieldset className="grid gap-1">
        <legend className="text-sm">{t("Type de partenariat souhaité")}</legend>
        {['Ateliers','Conférences','Expositions','Formation','Autre'].map(v=> (
          <label key={v} className="flex items-center gap-2"><input type="checkbox" name="partenariat" value={v}/> {t(v)}</label>
        ))}
      </fieldset>
      <input name="participants" type="number" min={0} placeholder={t("Nombre estimé de participants (optionnel)")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
  <textarea name="details" placeholder={t("Message / Détails de la demande")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" rows={4} />
  <button disabled={loading} type="submit" className="mt-1 px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition w-fit disabled:opacity-60">{t("Proposer un partenariat")}</button>
    </form>
  );
}
