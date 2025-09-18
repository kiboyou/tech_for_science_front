"use client";
import { Reveal } from "@/front/components/ui/Reveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { useInfos } from "@/front/lib/useApi";
import { ArrowRight, CalendarClock } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";

function formatDate(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return "";
  }
}

export function Infos({ t }: { t: (s: string) => string }) {
  const { data, loading } = useInfos();
  const items = (data || []).map((i) => ({
    title: i.title,
    type: i.info_type,
    excerpt: i.excerpt || "",
    cover: i.cover_image || undefined,
    slug: i.slug,
    deadline: i.deadline || null,
  promoted: Boolean((i as any).is_promoted),
    link: (i as any).link_url || null,
  }));

  const title = "Infos & opportunités";
  const subtitle = "Concours, bourses, challenges en cours";

  return (
    <section id="infos" className="py-20 scroll-mt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t(title)} subtitle={t(subtitle)} />
        <div className="mt-2 flex justify-center sm:justify-end">
          <a
            href="/infos"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm text-slate-700 hover:bg-white/90 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {t("Voir tout")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {!loading && items.length === 0 ? (
          <p className="mt-8 text-center text-slate-500">{t("Aucune information publiée pour le moment.")}</p>
        ) : (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {items.slice(0, 3).map((info, i) => (
              <Reveal key={info.slug || info.title} delay={i * 0.08} effect={i % 3 === 0 ? "slideLeft" : i % 3 === 1 ? "zoomIn" : "slideRight"}>
                <article
                  className="group rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5 cursor-pointer"
                  onClick={() => { if (info.slug) window.location.href = `/infos/${info.slug}`; }}
                  role="button"
                  aria-label={t(`Voir plus sur ${info.title}`)}
                >
                  {info.cover ? (
                    <div className="relative aspect-[16/9] w-full">
                      <Image src={info.cover} alt={t(info.title)} fill className="object-cover" />
                      {info.promoted ? (
                        <div className="absolute left-3 top-3 rounded-full bg-[rgb(var(--edu-primary))] text-slate-900 px-2 py-1 text-xs font-semibold shadow-sm">
                          {t("Mis en avant")}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full border border-slate-300/80 px-2 py-0.5 text-slate-600 dark:border-white/10 dark:text-slate-300">
                        {t(info.type)}
                      </span>
                      {info.deadline ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 dark:bg-white/10 px-2 py-0.5 text-slate-700 dark:text-slate-200">
                          <CalendarClock className="h-3.5 w-3.5" /> {formatDate(info.deadline)}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-semibold text-lg leading-snug">{t(info.title)}</h3>
                    {info.excerpt ? (
                      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{t(info.excerpt)}</p>
                    ) : null}
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`/infos/${info.slug}`}
                        className="px-4 py-2 rounded-xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition"
                      >
                        {t("Voir plus")}
                      </a>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 shadow-sm transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white"
                        >
                          {t("Lien")} ↗
                        </a>
                      ) : (
                        <a
                          href={`/infos/${info.slug}`}
                          className="px-4 py-2 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 shadow-sm transition dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white"
                        >
                          {t("Détails")}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
