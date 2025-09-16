"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { API_BASE, InfoDTO } from "@/front/lib/api";
import { CalendarClock, ExternalLink, Link as LinkIcon, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InfoDetail() {
	const params = useParams();
	const slug = String(params?.slug || "");
	const [data, setData] = useState<InfoDTO | null>(null);
	const [loading, setLoading] = useState(true);
	const [coverOk, setCoverOk] = useState(true);

	useEffect(() => {
		fetch(`${API_BASE}/api/main/infos/${encodeURIComponent(slug)}/`).then(r=>r.json()).then(setData).finally(()=>setLoading(false));
	}, [slug]);

	return (
		<div className="min-h-screen flex flex-col">
			<ClientHeader />
			<main className="flex-1">
				{loading ? (
					<div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-16">
						<p>Chargement…</p>
					</div>
				) : !data ? (
					<div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-16">
						<p>Introuvable</p>
					</div>
				) : (
					<>
						{/* Hero header with background cover & overlay */}
						<section className="relative">
							<div className="absolute inset-0 -z-10">
								{data.cover_image && coverOk ? (
									<div className="relative h-[280px] w-full">
										<Image
											src={data.cover_image}
											alt={data.title}
											fill
											sizes="100vw"
											priority
											className="object-cover"
											onError={() => setCoverOk(false)}
										/>
									</div>
								) : (
									<div className="h-[280px] w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800" />
								)}
								{/* Stronger scrim + soft gradient to reduce background bleed */}
								<div className="absolute inset-0 bg-white/80 dark:bg-slate-950/70" />
								<div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/85 to-white/50 dark:from-slate-950/95 dark:via-slate-950/85 dark:to-slate-950/50" />
							</div>
							<div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 pt-20 pb-8">
								<div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
									<Tag className="h-3.5 w-3.5" /> {data.info_type}
									{data.deadline ? (
										<span className="ml-2 inline-flex items-center gap-1 text-slate-600 dark:text-slate-300"><CalendarClock className="h-3.5 w-3.5" /> {new Date(data.deadline).toLocaleDateString()}</span>
									) : null}
								</div>
								<h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-edu-heading">
									<span className="text-gradient">{data.title}</span>
								</h1>
								{data.excerpt ? (
									<p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">{data.excerpt}</p>
								) : null}
								<div className="mt-4 flex flex-wrap gap-2">
									{data.link_url ? (
										<a href={data.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition">
											<ExternalLink className="h-4 w-4" /> Accéder au site
										</a>
									) : null}
									<a href="#procedure" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur text-slate-700 hover:bg-white transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">
										<LinkIcon className="h-4 w-4" /> Voir la procédure
									</a>
									<button onClick={() => navigator.share?.({ title: data.title, url: typeof window !== 'undefined' ? window.location.href : '' }).catch(()=>{})}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur text-slate-700 hover:bg-white transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">
										<Share2 className="h-4 w-4" /> Partager
									</button>
								</div>
							</div>
						</section>

						{/* Main content with sticky sidebar */}
						<section className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-10">
							<div className="grid lg:grid-cols-12 gap-8">
								<div className="lg:col-span-8 min-w-0 space-y-6">
									{data.content ? (
										<div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
											<div className="prose prose-slate dark:prose-invert prose-img:rounded-xl prose-a:text-[rgb(var(--edu-accent))]" dangerouslySetInnerHTML={{ __html: toHtml(data.content) }} />
										</div>
									) : (
										<p className="text-slate-500 dark:text-slate-400">Aucun contenu détaillé.</p>
									)}
									{data.procedure ? (
										<div id="procedure" className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
											<div className="prose prose-slate dark:prose-invert prose-img:rounded-xl prose-a:text-[rgb(var(--edu-accent))]">
												<h2 className="scroll-mt-24">Procédure</h2>
												<div dangerouslySetInnerHTML={{ __html: toHtml(data.procedure) }} />
											</div>
										</div>
									) : null}
								</div>
								<aside className="lg:col-span-4">
									<div className="lg:sticky lg:top-24 space-y-4">
										<div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
											<div className="text-xs uppercase tracking-wide text-slate-500">Informations</div>
											<div className="mt-3 grid grid-cols-1 gap-3 text-sm">
												<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Tag className="h-4 w-4" /> Type: <span className="ml-1 font-medium capitalize">{data.info_type}</span></div>
												{data.deadline ? <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><CalendarClock className="h-4 w-4" /> Deadline: <span className="ml-1 font-medium">{new Date(data.deadline).toLocaleDateString()}</span></div> : null}
											</div>
											<div className="mt-4 flex flex-col gap-2">
												{data.link_url ? <a href={data.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition"><ExternalLink className="h-4 w-4" /> Accéder au site</a> : null}
												<Link href="/infos" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white/70 backdrop-blur hover:bg-white text-slate-700 transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">Retour aux infos</Link>
											</div>
										</div>
									</div>
								</aside>
							</div>
						</section>
					</>
				)}
			</main>
			<ClientFooter />
		</div>
	);
}

function toHtml(text: string) {
	const esc = (s: string) => s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	const safe = esc(text);
	// Replace media URLs with embeds first, then linkify the rest, then line breaks
	const withMedia = safe
		.replace(/(https?:\/\/[^\s<]+\.(?:jpg|jpeg|png|webp|gif))(\?[^\s<]*)?/gi, (_m, p1, p2='') => {
			const url = `${p1}${p2}`;
			return `<img src="${url}" alt="media" class="rounded-xl border border-slate-200 dark:border-white/10"/>`;
		})
		.replace(/(https?:\/\/[^\s<]+\.(?:mp4|webm|ogg))(\?[^\s<]*)?/gi, (_m, p1, p2='') => {
			const url = `${p1}${p2}`;
			return `<video src="${url}" controls playsinline class="w-full h-auto rounded-xl border border-slate-200 dark:border-white/10"></video>`;
		});
	const linked = withMedia.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1<\/a>');
	return linked.replace(/\n/g, "<br/>");
}
