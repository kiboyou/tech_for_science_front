"use client";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { COPY } from "@/front/lib/copy";
import { useAutoI18n } from "@/front/lib/i18n";
import { useSharedLang } from "@/front/lib/useLang";
import Image from "next/image";
import { useEffect } from "react";

export interface BlogItem {
  title: string;
  author: string;
  tag: string;
  excerpt: string;
  cover?: string;
  images?: readonly string[];
}

export function BlogDetailClient({ item }: { item: BlogItem }) {
  const [lang] = useSharedLang();
  const t = useAutoI18n(lang, [item.title, item.author, item.tag, item.excerpt, COPY.blogRead]);
  useEffect(() => {}, [lang]);
  return (
    <div>
      <SectionTitle title={t(item.title)} subtitle={t(item.author)} eyebrow={t(item.tag)} />
      {item.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
          <Image src={item.cover} alt={t(item.title)} fill className="object-cover" />
        </div>
      )}
      <p className="mt-4 text-slate-700 dark:text-slate-300">{t(item.excerpt)}</p>
      {item.images?.length ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {item.images.map((src) => (
            <div key={src} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
              <Image src={src} alt={t(item.title)} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
