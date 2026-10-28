"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Building2,
  Palette,
  CheckCircle,
} from "lucide-react";
import { BantuPattern } from "./BantuPattern";

export function AboutSection() {
  return (
    <section
      id="solution"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#0D0D12] border-t border-b border-white/5 overflow-hidden scroll-mt-20"
    >
      {/* Anchor supplémentaire pour #offres */}
      <span id="offres" className="absolute -top-20"></span>

      {/* Halos d'ambiance Rouge, Orange, Jaune */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-bantu-red/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-bantu-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0">
        <BantuPattern variant="divider" opacity={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête de la section Solution */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-bantu-red/20 via-bantu-orange/20 to-bantu-yellow/20 border border-bantu-yellow/40 text-bantu-yellow text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-bantu-yellow" />
            <span>Solution & Impact</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-bantu-cream tracking-tight leading-tight mb-4">
            Vous avez un message fort ?{" "}
            <span className="bantu-gradient-text">
              Nous lui donnons la puissance, la légitimité et l&apos;audience
            </span>{" "}
            qu&apos;il mérite.
          </h2>

          <p className="text-sm sm:text-base text-bantu-cream/75 font-normal leading-relaxed max-w-2xl mx-auto">
            Bantu Brand réunit l&apos;influence médiatique et l&apos;accompagnement de marque pour faire rayonner les <strong className="text-white font-semibold">entreprises audacieuses</strong> et les <strong className="text-white font-semibold">créateurs visionnaires</strong>.
          </p>
        </div>

        {/* Grille d'offres compacte et épurée (2 colonnes responsives) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {/* Carte 1 : Pour les Marques & Entreprises */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#161620] to-[#101017] border border-bantu-yellow/30 hover:border-bantu-yellow transition-all duration-300 shadow-xl group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-bantu-yellow/10 border border-bantu-yellow/30 flex items-center justify-center text-bantu-yellow group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-bantu-yellow/15 border border-bantu-yellow/40 text-bantu-yellow text-[11px] font-bold uppercase tracking-wider">
                  Bantu Studio
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-bantu-cream mb-2">
                Marques & Entreprises
              </h3>

              <p className="text-xs sm:text-sm text-bantu-cream/70 mb-5 leading-relaxed">
                Connectez votre marque au consommateur digital africain grâce à des stratégies ciblées et une production média premium.
              </p>

              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-bantu-cream/85">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Consultance en communication</strong> : Stratégie & positionnement culturel</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Accompagnement opérationnel</strong> : Vidéo 4K, podcasts & activations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Sponsoring Média</strong> : Visibilité directe auprès de notre audience qualifiée</span>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-bantu-orange to-bantu-yellow text-black font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all"
            >
              <span>Obtenir une proposition marque</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Carte 2 : Pour les Créatifs & Designers */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#161620] to-[#101017] border border-bantu-red/30 hover:border-bantu-red transition-all duration-300 shadow-xl group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-bantu-red/10 border border-bantu-red/30 flex items-center justify-center text-bantu-red group-hover:scale-105 transition-transform">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-bantu-red/15 border border-bantu-red/40 text-bantu-red text-[11px] font-bold uppercase tracking-wider">
                  Bantu Média
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-bantu-cream mb-2">
                Créatifs & Designers
              </h3>

              <p className="text-xs sm:text-sm text-bantu-cream/70 mb-5 leading-relaxed">
                Votre talent mérite une tribune prestigieuse. Passez sur Bantu Brand et propulsez vos projets auprès de décideurs.
              </p>

              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-bantu-cream/85">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-red flex-shrink-0 mt-0.5" />
                  <span><strong>Interview Grand Format 4K</strong> : Épisode dédié sur la chaîne YouTube</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-red flex-shrink-0 mt-0.5" />
                  <span><strong>Showcase Bantu</strong> : Vos créations et visuels mis en lumière</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-bantu-red flex-shrink-0 mt-0.5" />
                  <span><strong>Opportunités & Réseau</strong> : Mises en relation avec marques et partenaires</span>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-bantu-red hover:bg-[#FF0000] text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all"
            >
              <span>Postuler pour passer sur Bantu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Métriques d'Impact Rapides (Compactes & Épurées) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black text-bantu-yellow mb-1 font-mono">
              +48 500
            </div>
            <div className="text-[11px] uppercase tracking-widest text-bantu-cream/60 font-semibold">
              Audience Qualifiée & Prescriptrice
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black text-bantu-orange mb-1 font-mono">
              100%
            </div>
            <div className="text-[11px] uppercase tracking-widest text-bantu-cream/60 font-semibold">
              Légitimité & Ancrage Culturel
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black text-bantu-red mb-1 font-mono">
              4K Studio
            </div>
            <div className="text-[11px] uppercase tracking-widest text-bantu-cream/60 font-semibold">
              Standards de Production d&apos;Élite
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
