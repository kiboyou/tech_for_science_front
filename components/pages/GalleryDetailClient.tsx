"use client";
import { SectionTitle } from "@/front/components/ui/SectionTitle";
import { DEFAULT_LANG, Lang, useAutoI18n } from "@/front/lib/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface GalleryItemProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
}

export function GalleryDetailClient({ item }: { item: GalleryItemProps }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = useAutoI18n(lang, [item.alt ?? 'Media']);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tps:lang") as Lang | null;
      if (stored === "fr" || stored === "en") setLang(stored);
    } catch {}
  }, []);
  return (
    <div>
      <SectionTitle title={t(item.alt ?? 'Media')} />
      <div className="mt-6">
        {item.type === 'image' ? (
          <Image src={item.src} width={1280} height={720} alt={item.alt ?? 'Media'} className="w-full h-auto rounded-2xl border border-slate-200 dark:border-white/10" />
        ) : (
          <video className="w-full rounded-2xl border border-slate-200 dark:border-white/10" src={item.src} poster={item.poster} controls />
        )}
      </div>
    </div>
  );
}
