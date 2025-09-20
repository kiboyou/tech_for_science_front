"use client";
import { Reveal } from "@/front/components/ui/Reveal";
import Image from "next/image";
// Local minimal className combiner to avoid external dependency
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface MediaSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // custom content (lists, etc.)
  mediaUrl: string;
  mediaAlt?: string;
  reverse?: boolean; // place media on right for large screens
  t: (s: string) => string;
  useSectionTitle?: boolean; // apply large SectionTitle sizing & underline bar
  eyebrow?: string;
}

// A minimal, clean two-column section with an image and textual content.
// Keeps typography consistent with existing SectionTitle usage but inline.
export function MediaSection({ id, title, subtitle, children, mediaUrl, mediaAlt = title, reverse = false, t, useSectionTitle = false, eyebrow }: MediaSectionProps) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className={cn("grid gap-20 lg:grid-cols-12 items-center", reverse && "lg:[&>div:first-child]:order-2")}>          
          <Reveal effect={reverse ? "slideRight" : "slideLeft"} className="lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[rgba(241,192,22,0.15)] blur-xl opacity-50" />
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/50 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                <Image src={mediaUrl} alt={mediaAlt} width={1000} height={800} className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </div>
          </Reveal>
          <Reveal effect="fadeUp" className="lg:col-span-7">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {useSectionTitle ? (
                <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
                  {eyebrow && <div className="text-xs uppercase tracking-wider text-edu-accent mb-2">{t(eyebrow)}</div>}
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-edu-heading">
                    <span className="text-gradient">{t(title)}</span>
                  </h2>
                  {subtitle && <p className="mt-4 text-lg sm:text-xl text-edu-body max-w-3xl mx-auto">{t(subtitle)}</p>}
                  <div className="mx-auto mt-6 h-1.5 w-32 sm:w-36 rounded-full bg-gradient-to-r from-edu-primary via-edu-accent to-edu-primary" />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-edu-heading">{t(title)}</h2>
                  {subtitle ? <p className="mt-4 text-lg text-edu-body leading-relaxed">{t(subtitle)}</p> : null}
                </>
              )}
              <div className={cn("text-base text-edu-body", useSectionTitle ? "mt-4 sm:mt-2 space-y-6" : "mt-8 space-y-6")}>{children}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
