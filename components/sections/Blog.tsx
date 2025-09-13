import { AnimatedReveal } from "@/front/components/ui/AnimatedReveal";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { slugify } from "@/front/lib/slugify";
import { useBlogPosts } from "@/front/lib/useApi";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Blog({ t }: { t: (s: string) => string }) {
  const { data } = useBlogPosts();
  const items = (data && data.length ? data.map(p => ({
    title: p.title,
    author: "", // could be extended in model later
    tag: "",
    excerpt: p.excerpt || "",
    cover: p.cover_image || undefined,
  })) : COPY.blogPosts);
  return (
  <section id="blog" className="py-20 scroll-mt-24">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
  <SectionTitle title={t(COPY.blogTitle)} subtitle={t(COPY.blogDesc)} />
  <div className="mt-2 flex justify-center sm:justify-end">
  <a href="/blog" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/20 backdrop-blur-sm px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-white/30 transition dark:border-white/10 dark:bg-white/5 dark:text-white">
      {t(COPY.blogVoirTout)}
    </a>
  </div>
  <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <AnimatedReveal key={p.title} delay={i * 0.08} effect={i % 2 ? "zoomIn" : "fadeUp"}>
  <article className="rounded-2xl border border-slate-300 bg-white/20 backdrop-blur-sm p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                {"cover" in p && p.cover && (
                  <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden rounded-xl">
                    <Image src={p.cover} alt={t(p.title)} fill className="object-cover" />
                  </div>
                )}
                {p.tag ? <div className="text-xs uppercase tracking-wide text-[rgb(var(--edu-accent))] dark:text-[rgba(45,171,178,0.9)]">{t(p.tag)}</div> : null}
                <h3 className="mt-2 font-semibold text-lg">{t(p.title)}</h3>
                {p.author ? <div className="text-sm text-slate-500 dark:text-slate-400">{t(p.author)}</div> : null}
                {p.excerpt ? <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{t(p.excerpt)}</p> : null}
                <a href={`/blog/${slugify(p.title)}`} className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-slate-400/80 bg-white/50 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 hover:bg-white/80 hover:border-slate-500 transition dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/30">
                  {t(COPY.blogRead)} <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
