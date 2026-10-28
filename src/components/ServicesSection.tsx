import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Compass,
  Layers,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ServiceOffer } from "@/types";
import { BantuPattern } from "./BantuPattern";

interface ServicesSectionProps {
  services: ServiceOffer[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0B0B0F] relative border-b border-white/5">
      {/* Séparateur Bantu au sommet */}
      <div className="absolute top-0 inset-x-0">
        <BantuPattern variant="divider" opacity={0.6} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bantu-yellow/15 border border-bantu-yellow/30 text-bantu-yellow text-xs font-bold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 text-bantu-red" />
            <span>Offres Commerciales & Conseil de Marque</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bantu-cream tracking-tight mb-6">
            Deux expertises pour donner une{" "}
            <span className="bantu-gradient-text">force singulière</span> à votre marque.
          </h2>

          <p className="text-base sm:text-lg text-bantu-cream/70 font-light leading-relaxed">
            Au-delà de notre média, le studio Bantu Brand conçoit des stratégies narratives sur-mesure et pilote leur déploiement opérationnel pour connecter durablement les marques et leur public.
          </p>
        </div>

        {/* Grille des 2 Offres */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {services.map((service, index) => {
            const isConsultance = service.key === "consultance";

            return (
              <div
                key={service.id}
                className={`relative rounded-3xl overflow-hidden bg-bantu-dark-card border-2 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl ${
                  isConsultance
                    ? "border-bantu-yellow/40 hover:border-bantu-yellow"
                    : "border-bantu-red/40 hover:border-bantu-red"
                }`}
              >
                {/* Badge & Numéro */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold ${
                        isConsultance ? "bg-bantu-orange" : "bg-bantu-red"
                      }`}
                    >
                      {isConsultance ? <Compass className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${
                        isConsultance ? "text-bantu-yellow" : "text-bantu-red"
                      }`}
                    >
                      Offre {index === 0 ? "01 — Stratégie" : "02 — Opérationnel"}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-bantu-cream/80 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                    Bantu Studio
                  </span>
                </div>

                {/* Titre & Accroche */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-bantu-cream mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <div className="text-sm font-bold text-bantu-yellow mb-4">
                    {service.subtitle}
                  </div>
                  <p className="text-sm sm:text-base text-bantu-cream/80 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Piliers d'intervention */}
                <div className="mb-8 space-y-3.5">
                  <h4 className="text-xs font-bold text-bantu-cream uppercase tracking-wider mb-2 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-bantu-yellow" />
                    <span>Domaines d&apos;intervention clés</span>
                  </h4>
                  {service.pillars.map((pillar, pIdx) => (
                    <div key={pIdx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs sm:text-sm font-bold text-bantu-cream mb-1">
                        {pillar.title}
                      </div>
                      <p className="text-xs text-bantu-cream/65 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Livrables concrets */}
                <div className="mb-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-bold text-bantu-yellow uppercase tracking-wider mb-3">
                    Ce que nous vous livrons :
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-bantu-cream/75">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isConsultance ? "text-bantu-yellow" : "text-bantu-red"
                          }`}
                        />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action */}
                <div className="pt-6 border-t border-white/10">
                  <Link
                    href="#contact"
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg ${
                      isConsultance
                        ? "bg-gradient-to-r from-bantu-orange to-bantu-yellow text-black hover:scale-[1.02] shadow-bantu-yellow/20"
                        : "bg-bantu-red hover:bg-[#FF0000] text-white hover:scale-[1.02] shadow-bantu-red/20"
                    }`}
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Cibles & Synergies */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-bantu-dark-card via-black to-bantu-dark-card border border-white/10 text-center max-w-4xl mx-auto">
          <Sparkles className="w-8 h-8 text-bantu-yellow mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-bold text-bantu-cream mb-2">
            À qui s&apos;adressent nos solutions ?
          </h3>
          <p className="text-sm text-bantu-cream/70 max-w-2xl mx-auto mb-6">
            Startups & PME africaines en quête de notoriété, marques internationales cherchant une résonance culturelle légitime, ONG et institutions culturelles, ainsi qu&apos;artistes et créateurs voulant structurer leur marque.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {["Startups & PME", "Grandes Marques Panafricaines", "ONG & Projets Culturels", "Mode & Cosmétique", "Artistes & Créateurs"].map((item, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-bantu-cream/90 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
