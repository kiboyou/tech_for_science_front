"use client";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionContainer } from "@/front/components/ui/SectionContainer";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";

export function FeaturedPerson({ t }: { t: (s: string) => string }) {
	const p = COPY.featuredPerson;
	if (!p) return null;
	return (
		<SectionContainer id="biographie">
			<SectionTitle title={t("Biographie") + " — " + t(p.name)} subtitle={t(p.role)} />
			<Reveal effect="fadeUp">
				<article className="mt-6 grid gap-6 md:grid-cols-12 items-start">
					<div className="md:col-span-5">
						<div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={p.image}
								alt={t(p.name)}
								className="block w-full h-full object-cover aspect-[4/5]"
								onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
							/>
						</div>
					</div>
					<div className="md:col-span-7">
						<h3 className="text-2xl md:text-3xl font-extrabold leading-tight">{t(p.name)}</h3>
						<p className="mt-1 text-sm italic text-slate-700 dark:text-slate-300">{t(p.role)}</p>
						<p className="mt-4 text-base leading-relaxed text-edu-body text-justify">{t(p.bio)}</p>
					</div>
				</article>
			</Reveal>
		</SectionContainer>
	);
}

