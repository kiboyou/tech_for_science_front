import { COPY } from "@/front/lib/copy";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer({ t }: { t: (s: string) => string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[rgb(var(--edu-accent))] text-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image src="/media/img_tech_s.png" alt={t(COPY.brand)} width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
            <span className="text-lg sm:text-xl font-semibold tracking-tight">{t(COPY.brand)}</span>
          </a>
          <div className="flex items-center gap-2 flex-nowrap overflow-x-auto whitespace-nowrap">
            <a aria-label="Facebook" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftechpourscience.org" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost whitespace-nowrap">
              <Facebook className="btn-icon" /> Facebook
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/company/tech-pour-science/" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost whitespace-nowrap">
              <Linkedin className="btn-icon" /> LinkedIn
            </a>
            <a aria-label="TikTok" href="https://www.tiktok.com/@techpourscience" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost whitespace-nowrap">
              <svg viewBox="0 0 256 256" width="16" height="16" aria-hidden="true" className="fill-current btn-icon"><path d="M168 24v26c0 25 20 45 45 45h19v31c-24 0-45-8-64-23v62a67 67 0 1 1-67-67h10v33h-10a34 34 0 1 0 34 34V24h33z" /></svg>
              TikTok
            </a>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">{t("À propos")}</h3>
            <p className="mt-2 text-sm sm:text-base text-white/90">
              {t("Favoriser l’éducation scientifique avec des ateliers scientifiques, IA, 3D et robotique.")}
            </p>
          </div>

          <nav aria-label={t("Navigation pied de page")}>
            <h4 className="text-sm font-semibold text-white/90">{t("Navigation")}</h4>
            <ul className="mt-3 space-y-2 text-sm sm:text-base">
              <li><a className="text-white/90 hover:underline" href="/">{t("Accueil")}</a></li>
              <li><a className="text-white/90 hover:underline" href="/ateliers">{t("Ateliers")}</a></li>
              {/* <li><a className="text-white/90 hover:underline" href="/galerie">{t("Galerie")}</a></li> */}
              <li><a className="text-white/90 hover:underline" href="/#equipe">{t("Équipe")}</a></li>
              <li><a className="text-white/90 hover:underline" href="/#nousrejoindre">{t("Nous rejoindre")}</a></li>
              <li><a className="text-white/90 hover:underline" href="/#contact">{t("Contact")}</a></li>
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold text-white/90">{t("Contact")}</h4>
            <div className="mt-3 space-y-2">
              <a href="mailto:techpourscience@gmail.com" className="btn-pill btn-ghost inline-flex">
                <Mail className="btn-icon" /> techpourscience@gmail.com
              </a>
              <div className="text-sm sm:text-base text-white/90 flex items-center gap-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <a href="tel:+2250759569709" className="hover:underline">+225 0759569709</a>
                <span className="opacity-60">/</span>
                <a href="tel:+2250788830633" className="hover:underline">+225 0788830633</a>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <a href="/#nousrejoindre" className="btn-pill inline-flex bg-black text-white hover:opacity-90">
                  {t("Devenir partenaire")}
                </a>
                <a href="/#contact" className="btn-pill btn-ghost inline-flex">
                  {t("Nous contacter")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/80">© {year} {t(COPY.brand)}. {t(COPY.footerRights)}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/70">
              <a className="hover:underline" href="#">{t("Mentions légales")}</a>
              <span className="opacity-60">•</span>
              <a className="hover:underline" href="#">{t("Politique de confidentialité")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
