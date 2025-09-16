"use client";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { useAutoI18n } from "@/front/lib/i18n";
import { useBlogPosts } from "@/front/lib/useApi";
import { useSharedLang } from "@/front/lib/useLang";
import Image from "next/image";
import { useEffect } from "react";

export default function BlogIndex() {
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, ["Blog scientifique", "Articles et actualités", "Lire"]);
  const { data } = useBlogPosts();
  useEffect(() => {}, [lang]);
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title={t("Blog scientifique")} subtitle={t("Articles et actualités")} />
        {!data || !data.length ? (
          <p className="mt-10 text-center text-slate-500">Aucun article disponible.</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
          {data.map((p, i) => (
            <AnimatedReveal key={p.title} delay={i * 0.06} effect={i % 3 === 0 ? "slideLeft" : i % 3 === 1 ? "zoomIn" : "slideRight"}>
              <article className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm overflow-hidden shadow-sm dark:border-white/10 dark:bg-white/5">
                {p.cover_image && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image src={p.cover_image} alt={p.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wide text-[rgb(var(--edu-accent))] dark:text-[rgba(45,171,178,0.9)]">{p.published_at ? new Date(p.published_at).toLocaleDateString() : ''}</div>
                  <h3 className="mt-2 font-semibold text-lg">{p.title}</h3>
                  {p.excerpt ? <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{p.excerpt}</p> : null}
                  <a href={`/blog/${p.slug}`} className="mt-4 inline-block rounded-2xl border border-slate-400/80 bg-white/50 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 hover:bg-white/80 hover:border-slate-500 transition dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30">{t("Lire")}</a>
                </div>
              </article>
            </AnimatedReveal>
          ))}
        </div>
        )}
      </main>
      <ClientFooter />
    </div>
  );
}
