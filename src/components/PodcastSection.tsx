"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Headphones,
  Play,
  ExternalLink,
  Clock,
  Sparkles,
  Filter,
} from "lucide-react";
import { Episode } from "@/types";

interface PodcastSectionProps {
  episodes: Episode[];
  onSelectEpisode: (episode: Episode) => void;
  activeEpisodeId?: string;
}

export function PodcastSection({
  episodes,
  onSelectEpisode,
  activeEpisodeId,
}: PodcastSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  // Extraction unique des catégories
  const categories = [
    "Tous",
    ...Array.from(new Set(episodes.map((ep) => ep.category).filter(Boolean))),
  ];

  const filteredEpisodes =
    selectedCategory === "Tous"
      ? episodes
      : episodes.filter((ep) => ep.category === selectedCategory);

  const handlePlayEpisode = (episode: Episode) => {
    onSelectEpisode(episode);
    // Défilement doux vers le Grand Lecteur Hero
    if (typeof window !== "undefined") {
      const heroEl = document.getElementById("hero-player");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="podcast" className="py-20 lg:py-28 bg-[#0B0B0F] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre & Sous-titre */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bantu-yellow/15 border border-bantu-yellow/30 text-bantu-yellow text-xs font-bold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5 text-bantu-red" />
              <span>La Bibliothèque d’Épisodes Bantu Brand</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bantu-cream tracking-tight">
              Explorer les conversations avec nos{" "}
              <span className="bantu-gradient-text">visionnaires</span>.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-bantu-cream/70 font-light">
              Des immersions sans filtre avec les esprits créatifs, entrepreneurs et designers qui façonnent la culture africaine actuelle.
            </p>
          </div>

          {/* Badge informatif */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-bantu-muted">
            <Sparkles className="w-4 h-4 text-bantu-yellow" />
            <span>Mises à jour YouTube synchronisées</span>
          </div>
        </div>

        {/* Filtres par thématique */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <Filter className="w-4 h-4 text-bantu-yellow flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-bantu-orange to-bantu-yellow text-black shadow-md shadow-bantu-yellow/20"
                  : "bg-bantu-dark-card text-bantu-cream/70 hover:text-white border border-white/10 hover:border-bantu-yellow/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille des épisodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map((episode) => {
            const isActive = activeEpisodeId === episode.id;

            return (
              <div
                key={episode.id}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-bantu-dark-card border transition-all duration-300 hover:-translate-y-1.5 ${
                  isActive
                    ? "border-bantu-yellow shadow-xl shadow-bantu-yellow/20"
                    : "border-white/10 hover:border-bantu-yellow/40 hover:shadow-xl"
                }`}
              >
                {/* Vignette avec overlay et durée */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <Image
                    src={episode.thumbnailUrl || "/images/consultance-strategy-meeting.jpg"}
                    alt={episode.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bantu-dark-card via-transparent to-transparent opacity-80"></div>

                  {/* Badge Catégorie */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-bantu-yellow uppercase tracking-wider border border-white/10">
                    {episode.category}
                  </span>

                  {/* Durée */}
                  {episode.duration && (
                    <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[11px] font-semibold text-white/90">
                      <Clock className="w-3 h-3 text-bantu-yellow" />
                      {episode.duration}
                    </span>
                  )}

                  {/* Bouton de lecture rapide hover YouTube rouge */}
                  <button
                    onClick={() => handlePlayEpisode(episode)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Écouter ${episode.title}`}
                  >
                    <div className="w-14 h-10 rounded-xl bg-bantu-red text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </button>
                </div>

                {/* Contenu de la carte */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Invité */}
                    <div className="flex items-center justify-between text-xs text-bantu-muted mb-2">
                      <span className="font-bold text-bantu-yellow truncate">
                        {episode.guestName}
                      </span>
                      <span>{episode.publishedAt}</span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-lg font-bold text-bantu-cream group-hover:text-bantu-yellow transition-colors line-clamp-2 leading-snug mb-3">
                      {episode.title}
                    </h3>

                    {/* Extrait */}
                    <p className="text-xs sm:text-sm text-bantu-cream/65 line-clamp-3 leading-relaxed mb-6 font-light">
                      {episode.description}
                    </p>
                  </div>

                  {/* Actions du bas */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handlePlayEpisode(episode)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-bantu-red text-white"
                          : "bg-white/10 hover:bg-gradient-to-r hover:from-bantu-red hover:to-bantu-yellow text-bantu-cream hover:text-black"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isActive ? "En cours de lecture" : "Écouter dans le lecteur"}</span>
                    </button>

                    <a
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-bantu-red hover:text-white text-bantu-cream/70 border border-white/5 transition-colors"
                      title="Regarder sur YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
