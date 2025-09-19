"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { api } from "@/front/lib/api";
import { useAutoI18n } from "@/front/lib/i18n";
import { useInfos } from "@/front/lib/useApi";
import { useSharedLang } from "@/front/lib/useLang";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const DEFAULT_IMG = 'https://res.cloudinary.com/djhpmgfha/image/upload/v1757529651/WhatsApp_Image_2025-09-10_at_19.29.04_vxld0c.jpg';

const TABS = [
	{ key: "", label: "Tout" },
	{ key: "concours", label: "Concours" },
	{ key: "bourse", label: "Bourses" },
	{ key: "challenge", label: "Challenges" },
];

// Separate inner component that uses useSearchParams so we can wrap it in <Suspense />
function InfosIndexInner() {
	const [lang] = useSharedLang();
	const t = useAutoI18n(lang, TABS.map(t=>t.label).concat(["Toutes les informations", "Aucune information disponible.", "Voir la procédure", "Voir le détail"])) as (s:string)=>string;
	const sp = useSearchParams();
	const tab = (sp.get("type") || "") as "" | "concours" | "bourse" | "challenge";
	const { data, loading } = useInfos(tab || undefined);
		const [promoted, setPromoted] = useState<any[] | null>(null);
		useEffect(() => { api.getInfosPromoted().then(setPromoted).catch(()=>setPromoted([])); }, []);

	return (
		<div className="min-h-screen flex flex-col">
			<ClientHeader />
			<main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
				<SectionTitle title={t("Toutes les informations")} />
				<div className="mt-6 flex flex-wrap justify-center gap-2">
					{TABS.map((tb) => (
						<a key={tb.key || "all"} href={tb.key ? `/infos?type=${tb.key}` : "/infos"} className={`px-4 py-2 rounded-xl border text-sm ${tab===tb.key?"bg-[rgb(var(--edu-primary))] text-slate-900 border-transparent":"border-slate-300 bg-white/20 dark:bg-white/10 dark:border-white/10"}`}>
							{t(tb.label)}
						</a>
					))}
				</div>

						{promoted && promoted.length ? (
							<div className="mt-8">
								{promoted.slice(0,1).map(p => (
									<article key={p.slug} className="rounded-2xl border border-amber-300 bg-amber-100/40 dark:bg-amber-200/10 dark:border-amber-200/30 overflow-hidden shadow-sm">
										<div className="grid md:grid-cols-2">
											<div className="relative overflow-hidden min-h-[220px] md:min-h-[320px] bg-slate-100/60 dark:bg-slate-800">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={p.cover_image || DEFAULT_IMG}
													alt={p.title}
													className="absolute inset-0 w-full h-full object-cover"
													onError={(e)=>{ const d = DEFAULT_IMG; if ((e.currentTarget as HTMLImageElement).src !== d) { (e.currentTarget as HTMLImageElement).src = d; } }}
												/>
											</div>
											<div className="p-5 md:p-6 flex flex-col justify-center">
												<div className="text-xs uppercase tracking-wide text-amber-700">Info à la une</div>
												<h3 className="font-semibold text-xl md:text-2xl mt-1 leading-tight">{p.title}</h3>
												{p.excerpt ? <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{p.excerpt}</p> : null}
												<div className="mt-3 flex gap-2 items-center">
													<a href={`/infos/${p.slug}`} className="px-3 py-1.5 rounded-lg bg-[rgb(var(--edu-primary))] text-slate-900 text-sm font-semibold">Voir le détail</a>
													{p.procedure ? <a href={`/infos/${p.slug}#procedure`} className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white/20 text-sm dark:bg-white/10 dark:border-amber-200/30 text-amber-800">Voir la procédure</a> : null}
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						) : null}
						<Reveal>
					{loading ? (
						<p className="mt-10 text-center text-slate-500">Chargement…</p>
					) : !data || !data.length ? (
						<p className="mt-10 text-center text-slate-500">{t("Aucune information disponible.")}</p>
					) : (
						<div className="mt-10 grid gap-6 md:grid-cols-3">
							{data.map((info, i) => (
								<article
									key={info.slug || i}
									className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-0 shadow-sm dark:border-white/10 dark:bg-white/5 overflow-hidden cursor-pointer"
									onClick={() => { if (info.slug) window.location.href = `/infos/${info.slug}`; }}
									role="button"
									aria-label={`Voir le détail: ${info.title}`}
								>
									<div className="relative w-full aspect-[3/2] overflow-hidden min-h-[200px] md:min-h-[260px] bg-slate-100/60 dark:bg-slate-800">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={info.cover_image || DEFAULT_IMG} alt={info.title} className="absolute inset-0 w-full h-full object-cover" onError={(e)=>{ const d = DEFAULT_IMG; if ((e.currentTarget as HTMLImageElement).src !== d) { (e.currentTarget as HTMLImageElement).src = d; } }} />
									</div>
									<div className="p-5">
										<div className="text-xs uppercase tracking-wide text-slate-500">{info.info_type}</div>
										<h3 className="font-semibold text-lg mt-1">{info.title}</h3>
										{info.excerpt ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{info.excerpt}</p> : null}
										<div className="mt-3 flex gap-2">
											{info.slug ? <a href={`/infos/${info.slug}`} className="px-3 py-1.5 rounded-lg bg-[rgb(var(--edu-primary))] text-slate-900 text-sm font-semibold">{t("Voir le détail")}</a> : null}
											{info.procedure && info.slug ? <a href={`/infos/${info.slug}#procedure`} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white/20 text-sm dark:bg-white/10 dark:border-white/10">{t("Voir la procédure")}</a> : null}
										</div>
									</div>
								</article>
							))}
						</div>
					)}
				</Reveal>
			</main>
			<ClientFooter />
				</div>
	);
}

function InfosLoadingFallback() {
	return (
		<div className="min-h-screen flex flex-col">
			<ClientHeader />
			<main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
				<section className="animate-pulse space-y-6">
					<div className="h-8 w-64 rounded bg-slate-200 dark:bg-slate-700" />
					<div className="flex gap-2 flex-wrap">
						{Array.from({ length: 4 }).map((_,i)=>(<div key={i} className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-700" />))}
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{Array.from({ length: 6 }).map((_,i)=>(
							<div key={i} className="h-56 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800" />
						))}
					</div>
				</section>
			</main>
			<ClientFooter />
		</div>
	);
}

export default function InfosPage() {
	return (
		<Suspense fallback={<InfosLoadingFallback />}> 
			<InfosIndexInner />
		</Suspense>
	);
}
