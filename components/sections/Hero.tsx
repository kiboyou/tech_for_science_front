"use client";
import { AtomOrbits } from "@/front/components/3d/AtomOrbits";
import { Molecule } from "@/front/components/3d/Molecule";
import { PhysicsLab } from "@/front/components/3d/PhysicsLab";
import { Saturn } from "@/front/components/3d/Saturn";
import { COPY } from "@/front/lib/copy";
import { Building2, CalendarDays, FlaskConical, Sparkles, TrendingUp, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const Environment = dynamic(() => import("@react-three/drei").then((m) => m.Environment), { ssr: false });
const OrbitControls = dynamic(() => import("@react-three/drei").then((m) => m.OrbitControls), { ssr: false });

export function Hero({ t, scene, setScene }: { t: (s: string) => string; scene: "atom" | "molecule" | "lab" | "saturn"; setScene: (s: "atom" | "molecule" | "lab" | "saturn") => void }) {
  // Show 3D only on md and up
  const [isMdUp, setIsMdUp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return (
    <section id="home" className="relative overflow-hidden">
  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* 3D à droite uniquement dès md */}
          {isMdUp && (
            <div className="order-2 lg:order-2">
              <div className="relative h-80 sm:h-[380px] lg:h-[520px] xl:h-[580px] rounded-2xl overflow-hidden">
                <Canvas camera={{ fov: 42, position: [0, 1.0, 4.6] }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[3, 4, 5]} intensity={0.9} />
                  <Environment preset="city" />
                  {scene === "atom" && <AtomOrbits />}
                  {scene === "molecule" && <Molecule />}
                  {scene === "lab" && <PhysicsLab />}
                  {scene === "saturn" && <Saturn />}
                  <OrbitControls enablePan={false} target={[0, 1.0, 0]} minDistance={4.6} maxDistance={22} zoomSpeed={1.4} />
                </Canvas>
              </div>
            </div>
          )}

          {/* Texte à gauche en desktop (et en second sur mobile) */}
          <div className="order-1 lg:order-1 lg:pr-4 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] sm:text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5" /> {t("Science • Technologie • Intelligence artificielle")}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mt-3 break-words hyphens-auto">
              {t(COPY.heroTitleA)}
              <span className="text-gradient">{t(COPY.heroTitleB)}</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-slate-700 max-w-xl dark:text-slate-200/90 text-sm sm:text-base break-words hyphens-auto">{t(COPY.heroDesc)}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
              {["IA", "3D interactive", "Robotique", "Clubs STEM"].map((b) => (
                <span key={b} className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-sm border border-slate-200 dark:bg-white/5 dark:border-white/10">{t(b)}</span>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a href="/ateliers" className="w-full sm:w-auto justify-center px-5 py-3 rounded-2xl bg-[rgb(var(--edu-primary))] text-slate-900 font-semibold hover:bg-[#f5cd43] transition inline-flex items-center gap-2 text-sm sm:text-base">
                {t(COPY.ctaVoirAteliers)} <CalendarDays className="h-4 w-4" />
              </a>
              <a href="#nousrejoindre" className="w-full sm:w-auto justify-center px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition inline-flex items-center text-sm sm:text-base dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10 dark:text-white">{t(COPY.ctaDevenirPartenaire)}</a>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              {[
                { label: COPY.heroStats[0], value: 2500, suffix: "+", duration: 2.5, href: "#impacts", Icon: Users },
                { label: COPY.heroStats[1], value: 4, suffix: "+", duration: 2.0, href: "#equipe", Icon: Building2 },
                { label: COPY.heroStats[2], value: 17, suffix: "%", duration: 2.2, href: "#impacts", Icon: TrendingUp },
              ].map((k) => (
                <a
                  key={k.label as any}
                  href={k.href}
                  role="button"
                  aria-label={`${t("Aller à")} ${t(k.label as any)}`}
                  className="group rounded-2xl border border-slate-200 bg-white/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 min-h-[100px] sm:min-h-[120px] min-w-0 flex flex-col items-center justify-center transition hover:bg-white/30 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--edu-primary))] dark:card-glass dark:gradient-border dark:border-white/10 dark:bg.white/5 dark:hover:bg-white/10"
                >
                  <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(241,192,22,0.15)] to-white/5 text-[rgb(var(--edu-primary))] ring-1 ring-white/10">
                    {k.Icon ? <k.Icon className="h-5 w-5" /> : null}
                  </div>
                  <div className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-active:scale-[0.98] transition-transform">
                    <StatsCounter to={k.value as number} suffix={k.suffix as string} duration={k.duration as number} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 dark:text-slate-300">{t(k.label as any)}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Panneau Choisir la scène 3D en bas (masqué sur mobile) */}
        {isMdUp && (
          <div className="mt-10">
            <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-4 sm:p-6 shadow-md md:shadow-lg dark:bg-slate-900/70">
              <p className="text-sm text-slate-600 mb-3 flex items-center gap-2 dark:text-slate-300">
                <FlaskConical className="h-4 w-4" /> {t("Choisir la scène 3D :")}
              </p>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: "lab", label: t("Physique") },
      { key: "saturn", label: t("Saturne") },
      { key: "atom", label: t("Atome") },
      { key: "molecule", label: t("Molécule") },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setScene(btn.key as any)}
                    className={`px-4 py-2 rounded-xl transition shadow-sm hover:shadow-md ${scene === btn.key ? "bg-yellow-50 text-yellow-700 dark:bg-[rgba(241,192,22,0.10)] dark:text-[rgb(var(--edu-primary))]" : "bg-white/20 hover:bg-white/30 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300"}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3 dark:text-slate-400">{t("Tournez/zoomez avec la souris. Le robot salue dans la scène ‘Robot’. Les particules réagissent dans ‘Physique’.")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatsCounter({ to, duration = 2, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const total = Math.max(0.5, duration) * 1000;
    let timeoutId: any;

    const animate = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(eased * to);
      setVal(current);
      if (p < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // Wait 60s, then restart from 0
        timeoutId = setTimeout(() => {
          start = null;
          setVal(0);
          raf = requestAnimationFrame(animate);
        }, 60000);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [to, duration]);
  return <span>{val.toLocaleString()} {suffix}</span>;
}
