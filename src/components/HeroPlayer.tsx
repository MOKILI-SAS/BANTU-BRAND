"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Share2,
  ExternalLink,
  Radio,
  Check,
  ThumbsUp,
  Bookmark,
  Bell,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ListVideo,
} from "lucide-react";
import { Episode } from "@/types";
import { getYouTubeEmbedUrl, extractYouTubeId } from "@/lib/youtube";
import { BantuPattern } from "./BantuPattern";

interface HeroPlayerProps {
  episode: Episode;
  playlist?: Episode[];
  onEpisodeChange?: (ep: Episode) => void;
}

export function HeroPlayer({ episode, playlist = [], onEpisodeChange }: HeroPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(3840);
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);

  const youtubeId = episode?.youtubeId || extractYouTubeId(episode?.youtubeUrl || "");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Synchroniser le like et la lecture lors d'un changement d'épisode
  useEffect(() => {
    setIsPlaying(false);
    setHasLiked(false);
  }, [episode?.id]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(episode?.youtubeUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const embedUrl = youtubeId
    ? getYouTubeEmbedUrl(youtubeId, {
        autoplay: true,
        controls: true,
      })
    : "";

  const otherEpisodes = playlist.filter((ep) => ep.id !== episode?.id);

  return (
    <section
      id="hero-player"
      className="relative w-full pt-4 pb-16 md:pt-8 md:pb-24 overflow-hidden bg-[#0A0A0E]"
    >
      {/* Halos d'ambiance Rouge, Orange, Jaune de la charte */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-bantu-red/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-bantu-orange/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-bantu-yellow/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Disposition Principale Style YouTube Watch Page (Lecteur + Playlist latérale) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Colonne Principale (Lecteur Vidéo & Infos YouTube) - 8 Colonnes */}
          <div className="lg:col-span-8 space-y-4">
            {/* L'Écran du Lecteur Vidéo */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
              {isPlaying && embedUrl ? (
                /* Iframe YouTube officiel en lecture */
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  title={episode?.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                /* Affiche cinéma avec bouton YouTube rouge officiel */
                <div className="relative w-full h-full cursor-pointer" onClick={handleTogglePlay}>
                  <Image
                    src={episode?.thumbnailUrl || "/images/creatifs-fashion-editorial.jpg"}
                    alt={episode?.title || "Bantu Brand"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Dégradé sombre style YouTube */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Badge Durée en bas à droite style YouTube */}
                  {episode?.duration && (
                    <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 border border-white/10">
                      <Clock className="w-3 h-3 text-bantu-yellow" />
                      <span>{episode.duration}</span>
                    </div>
                  )}

                  {/* Bouton de lecture central YouTube Rouge iconique */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-2xl bg-[#D9230F] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF0000] group-hover:shadow-[0_0_35px_rgba(217,35,15,0.7)]">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current ml-1" />
                    </div>
                    <span className="mt-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10">
                      Cliquer pour regarder l’épisode
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Titre de la Vidéo (Typographie YouTube épurée et percutante) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-bantu-cream tracking-tight leading-snug">
              {episode?.title}
            </h1>

            {/* Barre de Chaîne & Actions YouTube */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 pb-2 border-b border-white/10">
              {/* Informations Chaîne & Bouton S'abonner */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-bantu-yellow shadow-md flex-shrink-0">
                  <Image
                    src="/images/logo-bantu-brand.jpg"
                    alt="Bantu Brand"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-bantu-cream">
                      Bantu Brand
                    </span>
                    <span
                      className="w-4 h-4 rounded-full bg-bantu-yellow flex items-center justify-center text-black text-[10px] font-black"
                      title="Chaîne Officielle Vérifiée"
                    >
                      ✓
                    </span>
                  </div>
                  <span className="text-xs text-bantu-cream/60">48,5 k abonnés</span>
                </div>

                {/* Bouton S'abonner interactif YouTube */}
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSubscribed
                      ? "bg-white/10 text-bantu-cream hover:bg-white/20"
                      : "bg-bantu-red hover:bg-[#FF0000] text-white shadow-lg shadow-bantu-red/30"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Bell className="w-3.5 h-3.5 text-bantu-yellow fill-current" />
                      <span>Abonné</span>
                    </>
                  ) : (
                    <span>S’abonner</span>
                  )}
                </button>
              </div>

              {/* Pilules d'Actions YouTube (J'aime, Partager, YouTube) */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {/* J'aime */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                    hasLiked
                      ? "bg-bantu-yellow text-black"
                      : "bg-white/10 hover:bg-white/15 text-bantu-cream"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? "fill-current" : ""}`} />
                  <span>{likeCount.toLocaleString("fr-FR")}</span>
                </button>

                {/* Partager */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-bantu-cream text-xs font-semibold transition-colors"
                  title="Copier le lien"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copié</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Partager</span>
                    </>
                  )}
                </button>

                {/* Lien direct YouTube */}
                {episode?.youtubeUrl && (
                  <a
                    href={episode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-bantu-red hover:text-white text-bantu-cream/80 text-xs font-semibold border border-white/10 transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Boîte de Description Style YouTube (Dépliable) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#14141C] border border-white/10 text-xs sm:text-sm text-bantu-cream/80 space-y-3">
              <div className="flex flex-wrap items-center gap-3 font-semibold text-bantu-cream">
                <span>18 420 vues</span>
                <span>•</span>
                <span>Kinshasa, RDC</span>
                <div className="flex items-center gap-2 text-bantu-yellow">
                  <span>#BantuBrand</span>
                  <span>#PodcastAfricain</span>
                  <span>#KinshasaCréative</span>
                </div>
              </div>

              {/* Texte éditorial replacé ici élégamment comme dans la vraie description YouTube */}
              <p className="leading-relaxed">
                <strong className="text-bantu-cream block mb-1">
                  Invité : {episode?.guestName || "Doris Kabemba"} ({episode?.guestRole || "Fondateur Bantu Brand"})
                </strong>
                {episode?.description}
              </p>

              {/* Contenu étendu lors du clic sur Afficher plus */}
              {showFullDesc && (
                <div className="pt-3 border-t border-white/10 space-y-3 text-bantu-cream/70 text-xs leading-relaxed animate-fadeIn">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <div className="font-bold text-bantu-yellow uppercase tracking-wider text-[11px]">
                      Vision & Mission Bantu Brand
                    </div>
                    <p>
                      Bantu Brand est le média podcast créatif africain qui donne de la visibilité aux créatifs africains, à leur culture, leurs marques, leurs histoires et leurs visions.
                    </p>
                  </div>

                  {/* Chapitrage officiel style YouTube */}
                  <div className="space-y-1">
                    <span className="font-bold text-bantu-cream">Chapitres de l&apos;épisode :</span>
                    <ul className="space-y-1 text-bantu-cream/60">
                      <li><span className="text-bantu-yellow font-mono">00:00</span> - Introduction & Présentation du créateur</li>
                      <li><span className="text-bantu-yellow font-mono">04:30</span> - L&apos;héritage culturel et la source d&apos;inspiration</li>
                      <li><span className="text-bantu-yellow font-mono">15:10</span> - Stratégie de marque et conquête du marché</li>
                      <li><span className="text-bantu-yellow font-mono">28:45</span> - Conseils aux jeunes entrepreneurs africains</li>
                    </ul>
                  </div>

                  <div className="text-[11px] text-bantu-cream/50 pt-2">
                    Production exécutive : Bantu Brand Studios • Réalisation : Doris Kabemba
                  </div>
                </div>
              )}

              {/* Bouton Afficher plus / Moins */}
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="font-bold text-xs text-bantu-yellow hover:text-white transition-colors flex items-center gap-1 pt-1"
              >
                <span>{showFullDesc ? "Afficher moins" : "Afficher plus"}</span>
                {showFullDesc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Colonne Latérale YouTube : Playlist & Épisodes Suivants (4 Colonnes) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#14141C] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ListVideo className="w-4 h-4 text-bantu-yellow" />
                  <h3 className="font-bold text-sm text-bantu-cream uppercase tracking-wider">
                    À regarder ensuite
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-bantu-yellow/15 text-bantu-yellow font-semibold">
                  Playlist Officielle
                </span>
              </div>

              {/* Liste des autres épisodes cliquables façon YouTube */}
              <div className="space-y-3 overflow-y-auto max-h-[620px] pr-1">
                {otherEpisodes.length > 0 ? (
                  otherEpisodes.map((ep) => (
                    <div
                      key={ep.id}
                      onClick={() => onEpisodeChange && onEpisodeChange(ep)}
                      className="group flex gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-bantu-yellow/30 cursor-pointer transition-all"
                    >
                      {/* Miniature miniature YouTube avec badge durée */}
                      <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                        <Image
                          src={ep.thumbnailUrl || "/images/creatifs-fashion-editorial.jpg"}
                          alt={ep.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white">
                          {ep.duration || "45:00"}
                        </div>
                      </div>

                      {/* Infos de l'épisode */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-bantu-cream line-clamp-2 group-hover:text-bantu-yellow transition-colors leading-snug">
                          {ep.title}
                        </h4>
                        <p className="text-[11px] text-bantu-cream/60 mt-1 truncate">
                          {ep.guestName}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-bantu-muted">
                          <span>{ep.category}</span>
                          <span>•</span>
                          <span>YouTube</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-bantu-cream/50 py-4 text-center">
                    Tous les épisodes sont chargés dans la playlist.
                  </p>
                )}
              </div>
            </div>

            {/* Signature Visuelle Bantu Tricolore (Rouge, Orange, Jaune) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-bantu-red/20 via-bantu-orange/20 to-bantu-yellow/20 border border-bantu-yellow/30 text-center">
              <span className="text-xs font-bold text-bantu-cream">
                🔥 Nouvelle interview chaque semaine sur Bantu Brand
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
