"use client";
import { Reveal } from "@/front/components/ui/Reveal";

export function SectionTitle({ title, subtitle, eyebrow, className = "" }: { title: string; subtitle?: string; eyebrow?: string; className?: string }) {
  return (
  <Reveal effect="fadeUp">
      <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 ${className}`}>
  {eyebrow && <div className="text-xs uppercase tracking-wider text-edu-accent mb-2">{eyebrow}</div>}
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-edu-heading">
          <span className="text-gradient">{title}</span>
        </h2>
    {subtitle && <p className="mt-4 text-lg sm:text-xl text-edu-body">{subtitle}</p>}
  <div className="mx-auto mt-6 h-1.5 w-32 sm:w-36 rounded-full bg-gradient-to-r from-edu-primary via-edu-accent to-edu-primary" />
      </div>
  </Reveal>
  );
}
