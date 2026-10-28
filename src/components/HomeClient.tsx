"use client";

import React, { useState } from "react";
import { Episode, BantuBrandSiteData } from "@/types";
import { Navbar } from "@/components/Navbar";
import { HeroPlayer } from "@/components/HeroPlayer";
import { PodcastSection } from "@/components/PodcastSection";
import { CreativesSection } from "@/components/CreativesSection";
import { AboutSection } from "@/components/AboutSection";
import { ConversionSection } from "@/components/ConversionSection";
import { Footer } from "@/components/Footer";

interface HomeClientProps {
  initialData: BantuBrandSiteData;
  initialFeaturedEpisode: Episode;
}

export function HomeClient({ initialData, initialFeaturedEpisode }: HomeClientProps) {
  const [activeEpisode, setActiveEpisode] = useState<Episode>(initialFeaturedEpisode);

  const handleSelectEpisode = (ep: Episode) => {
    setActiveEpisode(ep);
    // Défilement doux vers le lecteur YouTube
    if (typeof window !== "undefined") {
      const playerElement = document.getElementById("hero-player");
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bantu-dark text-bantu-cream selection:bg-bantu-yellow selection:text-black">
      {/* Barre de navigation épurée */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-1">
        {/* 1. Grand Lecteur YouTube Watch Page */}
        <HeroPlayer
          episode={activeEpisode}
          playlist={initialData.episodes}
          onEpisodeChange={handleSelectEpisode}
        />

        {/* 2. Bibliothèque Podcasts & Épisodes */}
        <PodcastSection
          episodes={initialData.episodes}
          onSelectEpisode={handleSelectEpisode}
          activeEpisodeId={activeEpisode?.id}
        />

        {/* 3. Showcase Créatifs & Projets */}
        <CreativesSection creatives={initialData.creatives} />

        {/* 4. Solution & Offres (Avant-dernière section avant contact) */}
        <AboutSection />

        {/* 5. Conversion Tri-Profils & Contact */}
        <ConversionSection />
      </main>

      {/* Footer MOKILI obligatoire */}
      <Footer />
    </div>
  );
}
