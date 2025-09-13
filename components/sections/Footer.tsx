import { COPY } from "@/front/lib/copy";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";

export function Footer({ t }: { t: (s: string) => string }) {
  return (
  <footer className="relative overflow-hidden bg-[rgb(var(--edu-accent))] text-white">
      {/* Decorative top hairline */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.35), transparent 60%)" }} />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Brand and rights */}
          <div className="min-w-0 lg:w-1/3">
            <p className="text-sm/6 text-white/90">© {new Date().getFullYear()} {t(COPY.brand)}. {t(COPY.footerRights)}</p>
            <p className="mt-2 text-xs text-white/70">{t("Favoriser l’éducation scientifique avec des ateliers IA, 3D et robotique.")}</p>
          </div>

          {/* Contacts */}
          <div className="flex-1 grid sm:grid-cols-2 gap-4 lg:gap-6">
            <a href="mailto:techpourscience@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-white/95 hover:bg-white/10 transition">
              <Mail className="h-4 w-4" /> techpourscience@gmail.com
            </a>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-white/95">
              <Phone className="h-4 w-4" />
              <a href="tel:+2250759569709" className="hover:underline">+225 0759569709</a>
              <span className="text-white/60">/</span>
              <a href="tel:+2250788830633" className="hover:underline">+225 0788830633</a>
            </span>

            {/* Socials */}
            <a href="https://www.facebook.com/TechPourScience" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-white/95 hover:bg-white/10 transition">
              <Facebook className="h-4 w-4" /> Tech Pour Science
            </a>
            <a href="https://www.linkedin.com/company/tech-pour-science" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-white/95 hover:bg-white/10 transition">
              <Linkedin className="h-4 w-4" /> Tech Pour Science
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
