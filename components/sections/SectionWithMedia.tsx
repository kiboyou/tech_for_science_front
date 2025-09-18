"use client";
import { Reveal } from "@/front/components/ui/Reveal";
import Image from "next/image";

interface SectionWithMediaProps {
  id: string;
  title: string;
  subtitle?: string;
  points?: string[]; // bullet points
  paragraphs?: string[]; // free text paragraphs
  mediaUrl: string; // image or video
  mediaAlt?: string;
  reverse?: boolean; // media on right
  t: (s: string) => string;
  eyebrow?: string;
}

export function SectionWithMedia({ id, title, subtitle, points = [], paragraphs = [], mediaUrl, mediaAlt = title, reverse = false, t, eyebrow }: SectionWithMediaProps) {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-12 gap-12 items-center ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}>
          <Reveal effect={reverse ? 'slideRight' : 'slideLeft'} className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[rgba(241,192,22,0.25)] to-[rgba(241,192,22,0.05)] blur-xl opacity-60 group-hover:opacity-80 transition" />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 shadow-xl shadow-edu-primary/10">
                {isVideo ? (
                  <video src={mediaUrl} autoPlay muted loop playsInline className="w-full h-full object-cover aspect-[4/3]" />
                ) : (
                  <Image src={mediaUrl} alt={mediaAlt} width={900} height={700} className="w-full h-full object-cover aspect-[4/3]" />
                )}
              </div>
            </div>
          </Reveal>
          <Reveal effect={reverse ? 'fadeUp' : 'fadeUp'} className="lg:col-span-7">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {eyebrow ? <div className="text-sm font-medium uppercase tracking-wide text-[rgb(var(--edu-accent))] mb-4">{t(eyebrow)}</div> : null}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-edu-heading">
                <span className="text-gradient">{t(title)}</span>
              </h2>
              {subtitle ? <p className="mt-4 text-lg text-edu-body leading-relaxed">{t(subtitle)}</p> : null}
              {paragraphs.length ? (
                <div className="mt-6 space-y-4 text-base text-edu-body leading-relaxed">
                  {paragraphs.map(p => <p key={p}>{t(p)}</p>)}
                </div>
              ) : null}
              {points.length ? (
                <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-base text-edu-body">
                  {points.map(pt => (
                    <li key={pt} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[rgb(var(--edu-accent))]" />
                      <span>{t(pt)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
