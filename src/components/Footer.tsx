import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { BantuPattern } from "./BantuPattern";

export function Footer() {
  const mokiliUrl = process.env.MOKILI_URL || "https://mokili.io";

  return (
    <footer className="w-full bg-[#08080C] text-bantu-cream border-t border-white/10 relative overflow-hidden">
      {/* Bordure signature motif géométrique Bantu aux couleurs Rouge, Orange, Jaune */}
      <div className="w-full">
        <BantuPattern variant="divider" opacity={0.8} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Colonne 1 & 2 : Marque & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-bantu-yellow shadow-sm">
                <Image
                  src="/images/logo-bantu-brand.jpg"
                  alt="Bantu Brand"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-black text-xl tracking-wider text-bantu-cream">
                BANTU BRAND
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-bantu-cream/70 leading-relaxed font-light max-w-sm">
              Média podcast créatif africain et studio de conseil en communication de marque. Donner une voix, une visibilité et un espace aux créatifs africains pour redéfinir notre récit commun.
            </p>

            <div className="pt-2 text-xs font-bold text-bantu-yellow">
              Fondé par Doris Kabemba • Kinshasa, RDC
            </div>

            {/* Réseaux sociaux avec SVG nets et légers */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/bantubrand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-bantu-yellow hover:text-black flex items-center justify-center text-bantu-cream/80 transition-colors"
                aria-label="Instagram Bantu Brand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/bantubrand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-bantu-yellow hover:text-black flex items-center justify-center text-bantu-cream/80 transition-colors"
                aria-label="Facebook Bantu Brand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/bantu-brand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-bantu-yellow hover:text-black flex items-center justify-center text-bantu-cream/80 transition-colors"
                aria-label="LinkedIn Bantu Brand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@bantubrand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-bantu-red hover:text-white flex items-center justify-center text-bantu-cream/80 transition-colors"
                aria-label="YouTube Bantu Brand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 3 : Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bantu-yellow mb-4">
              Média & Podcast
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-bantu-cream/70 font-light">
              <li>
                <Link href="#podcast" className="hover:text-bantu-yellow transition-colors">
                  Derniers Épisodes
                </Link>
              </li>
              <li>
                <Link href="#creatifs" className="hover:text-bantu-yellow transition-colors">
                  Showcase Créatifs
                </Link>
              </li>
              <li>
                <Link href="#solution" className="hover:text-bantu-yellow transition-colors">
                  Solution & Impact
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-bantu-yellow transition-colors">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bantu-yellow mb-4">
              Bantu Studio
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-bantu-cream/70 font-light">
              <li>
                <Link href="#offres" className="hover:text-bantu-yellow transition-colors">
                  Consultance en communication
                </Link>
              </li>
              <li>
                <Link href="#offres" className="hover:text-bantu-yellow transition-colors">
                  Accompagnement opérationnel
                </Link>
              </li>
              <li>
                <Link href="#offres" className="hover:text-bantu-yellow transition-colors">
                  Positionnement de marque
                </Link>
              </li>
              <li>
                <Link href="#offres" className="hover:text-bantu-yellow transition-colors">
                  Production média & 4K
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-bantu-yellow transition-colors">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 5 : Coordonnées */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-bantu-yellow mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-bantu-cream/70 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bantu-yellow flex-shrink-0 mt-0.5" />
                <span>Kinshasa, RDC</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bantu-orange flex-shrink-0" />
                <a href="mailto:bantu.brand@gmail.com" className="hover:text-white transition-colors">
                  bantu.brand@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bantu-red flex-shrink-0" />
                <a href="tel:+243971245105" className="hover:text-white transition-colors">
                  +243 97 12 45 105
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MENTION OBLIGATOIRE MOKILI ET COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bantu-muted">
          <div>
            © {new Date().getFullYear()} Bantu Brand. Tous droits réservés. Kinshasa, RDC.
          </div>

          {/* MENTION OBLIGATOIRE : « Propulsé par MOKILI » avec lien cliquable */}
          <div className="flex items-center gap-1.5 font-medium text-bantu-cream/90 bg-white/[0.04] px-4 py-2 rounded-full border border-white/10">
            <span>Propulsé par</span>
            <a
              href={mokiliUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-bantu-yellow hover:text-white hover:underline transition-colors tracking-wide"
            >
              MOKILI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
