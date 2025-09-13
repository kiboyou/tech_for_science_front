import { Beaker, BookOpen, Calculator, Cpu, GraduationCap, Orbit, PenTool, Rocket } from "lucide-react";

export function EduBackground() {
  const icons = [
    { C: Orbit, className: "left-[6%] top-[14%] h-8 w-8 md:h-10 md:w-10", delay: "0s" },
    { C: Beaker, className: "left-[18%] top-[72%] h-7 w-7 md:h-9 md:w-9", delay: "1.2s" },
    { C: RulerLike, className: "left-[78%] top-[22%] h-7 w-7 md:h-9 md:w-9", delay: "0.6s" },
    { C: Calculator, className: "left-[65%] top-[38%] h-7 w-7 md:h-9 md:w-9", delay: "1.8s" },
    { C: BookOpen, className: "left-[42%] top-[18%] h-8 w-8 md:h-10 md:w-10", delay: "0.9s" },
    { C: GraduationCap, className: "left-[30%] top-[56%] h-8 w-8 md:h-10 md:w-10", delay: "2.1s" },
    { C: Cpu, className: "left-[54%] top-[76%] h-7 w-7 md:h-9 md:w-9", delay: "1.4s" },
    { C: PenTool, className: "left-[86%] top-[68%] h-7 w-7 md:h-9 md:w-9", delay: "2.7s" },
    { C: Rocket, className: "left-[8%] top-[88%] h-7 w-7 md:h-9 md:w-9", delay: "3.2s" },
    // extras for better coverage
    { C: Beaker, className: "left-[12%] top-[42%] h-6 w-6 md:h-8 md:w-8", delay: "0.3s" },
    { C: Calculator, className: "left-[32%] top-[28%] h-6 w-6 md:h-8 md:w-8", delay: "1.1s" },
    { C: Orbit, className: "left-[72%] top-[54%] h-6 w-6 md:h-8 md:w-8", delay: "1.6s" },
    { C: BookOpen, className: "left-[58%] top-[16%] h-6 w-6 md:h-8 md:w-8", delay: "2.4s" },
    { C: Cpu, className: "left-[24%] top-[84%] h-6 w-6 md:h-8 md:w-8", delay: "2.0s" },
    { C: PenTool, className: "left-[90%] top-[40%] h-6 w-6 md:h-8 md:w-8", delay: "2.8s" },
  ] as const;
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(140% 110% at 50% 40%, black 78%, transparent)",
          WebkitMaskImage: "radial-gradient(140% 110% at 50% 40%, black 78%, transparent)",
        }}
      >
    {icons.map(({ C, className, delay }, i) => (
          <C
            key={i}
            className={
              "absolute text-slate-900/25 dark:text-white/25 drop-shadow-[0_1px_0_rgba(255,255,255,0.25)] animate-float-slow " +
              className
            }
            style={{ animationDelay: delay as any }}
          />
        ))}
      </div>
    </div>
  );
}

// Simple ruler glyph using SVG to diversify shapes without relying on a dedicated lucide icon
function RulerLike(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="6" rx="1.5" />
      <path d="M7 6v6M11 6v6M15 6v6" />
    </svg>
  );
}
