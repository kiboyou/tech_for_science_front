"use client";
import { API_BASE } from "@/front/lib/api";
import { useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";
import { useState } from "react";

export function SponsorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, [
    "Merci pour votre soutien ! Nous vous contacterons rapidement.",
    "Soutenez nos actions et aidez-nous à équiper, former et accompagner la jeunesse.",
    "Nom de l’organisation / Entreprise",
    "Nom & Prénom du soumettant",
    "Fonction (optionnel)",
    "Email",
    "Téléphone",
    "Type de soutien",
    "Institutionnel","Financier","Matériel","Logistique","Bourses","Autre",
    "Message complémentaire",
    "Devenir sponsor",
    "Une erreur est survenue. Réessayez."
  ]);
  if (sent) return <p className="text-green-700 dark:text-green-300 font-medium">{t("Merci pour votre soutien ! Nous vous contacterons rapidement.")}</p>;
  return (
    <form className="grid gap-3" onSubmit={async (e)=>{
      e.preventDefault(); setError(null); setLoading(true);
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const support = fd.getAll('soutien').map(String).join(',');
      const body = {
        org_name: String(fd.get('org')||''),
        contact_name: String(fd.get('nom')||''),
        role: String(fd.get('fonction')||''),
        email: String(fd.get('email')||''),
        phone: String(fd.get('tel')||''),
        support_types: support,
        message: String(fd.get('message')||''),
      };
      try {
        const res = await fetch(`${API_BASE}/api/main/forms/sponsors/`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        setSent(true);
        onSuccess?.();
      } catch(err:any){ setError(t('Une erreur est survenue. Réessayez.')); } finally { setLoading(false); }
    }}>
      <p className="text-sm text-slate-600 dark:text-slate-300">{t("Soutenez nos actions et aidez-nous à équiper, former et accompagner la jeunesse.")}</p>
      {error ? <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 px-3 py-2 text-sm dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">{error}</div> : null}
      <input required name="org" placeholder={t("Nom de l’organisation / Entreprise")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="nom" placeholder={t("Nom & Prénom du soumettant")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input name="fonction" placeholder={t("Fonction (optionnel)")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required type="email" name="email" placeholder={t("Email")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <input required name="tel" placeholder={t("Téléphone")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" />
      <fieldset className="grid gap-1">
        <legend className="text-sm">{t("Type de soutien")}</legend>
        {['Institutionnel','Financier','Matériel','Logistique','Bourses','Autre'].map(v=> (
          <label key={v} className="flex items-center gap-2"><input type="checkbox" name="soutien" value={v}/> {t(v)}</label>
        ))}
      </fieldset>
  <textarea name="message" placeholder={t("Message complémentaire")} className="bg-white/20 backdrop-blur-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[rgb(var(--edu-primary))] dark:bg-white/5 dark:border-white/10" rows={4} />
  <button disabled={loading} type="submit" className="mt-1 px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition w-fit disabled:opacity-60">{t("Devenir sponsor")}</button>
    </form>
  );
}
