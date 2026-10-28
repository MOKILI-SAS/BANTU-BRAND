"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Tag,
  ArrowUpRight,
  X,
} from "lucide-react";
import { CreativeProject } from "@/types";

interface CreativesSectionProps {
  creatives: CreativeProject[];
}

export function CreativesSection({ creatives }: CreativesSectionProps) {
  const [selectedProject, setSelectedProject] = useState<CreativeProject | null>(null);

  return (
    <section id="creatifs" className="py-20 lg:py-28 bg-[#0E0E13] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bantu-red/15 border border-bantu-red/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Palette className="w-3.5 h-3.5 text-bantu-red" />
              <span>Showcase Créatifs & Projets Africains</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bantu-cream tracking-tight leading-tight">
              L&apos;excellence des talents que nous{" "}
              <span className="bantu-gradient-text">propulsons</span>.
            </h2>

            <p className="mt-3 text-base text-bantu-cream/70 font-light">
              Mode contemporaine, artisanat d&apos;art, design graphique, streetwear et campagnes de marques : découvrez les initiatives et créateurs documentés par Bantu Brand.
            </p>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-bantu-yellow hover:text-white uppercase tracking-wider border border-white/10 transition-colors group"
          >
            <span>Proposer un projet créatif</span>
            <ArrowUpRight className="w-4 h-4 text-bantu-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grille des créatifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creatives.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-bantu-dark-card border border-white/10 hover:border-bantu-yellow/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl flex flex-col"
            >
              {/* Image de couverture */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bantu-dark-card via-black/20 to-transparent"></div>

                {/* Badge Catégorie */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md text-[11px] font-bold text-bantu-yellow uppercase tracking-wider border border-white/10">
                  {project.category}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-bantu-muted mb-1">
                    Porté par <span className="text-bantu-yellow">{project.creatorName}</span>
                  </div>

                  <h3 className="text-lg font-bold text-bantu-cream group-hover:text-bantu-yellow transition-colors mb-2 leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-bantu-cream/70 line-clamp-3 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tags et Découvrir */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-bantu-cream/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-bantu-yellow flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explorer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal d'exploration de projet */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-2xl bg-bantu-dark-card border border-bantu-yellow/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              {/* Bouton de fermeture */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-bantu-red transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image en tête de modale */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
                <Image
                  src={selectedProject.coverImage}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bantu-dark-card via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-6 px-3 py-1 rounded-md bg-bantu-red text-white text-xs font-bold uppercase tracking-wider">
                  {selectedProject.category}
                </span>
              </div>

              {/* Corps de la modale */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="text-xs font-bold text-bantu-yellow uppercase tracking-wider">
                  Créateur : {selectedProject.creatorName}
                </div>

                <h3 className="text-2xl font-black text-bantu-cream">
                  {selectedProject.name}
                </h3>

                <p className="text-sm sm:text-base text-bantu-cream/80 font-light leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-bantu-cream/70"
                    >
                      <Tag className="w-3 h-3 text-bantu-yellow" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Call to action dans la modale */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-bantu-muted">
                    Vous souhaitez collaborer avec ce projet ou être mis en relation ?
                  </span>
                  <Link
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-bantu-orange to-bantu-yellow text-black font-black text-xs uppercase tracking-wider transition-all text-center"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
