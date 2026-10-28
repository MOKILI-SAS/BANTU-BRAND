"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Headphones,
  Palette,
  Briefcase,
  Mail,
  Plus,
  Trash2,
  Edit2,
  Check,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Star,
  Eye,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  Radio,
  BarChart3,
  TrendingUp,
  Users,
  PlaySquare,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Episode, CreativeProject, ServiceOffer, MessageInquiry, BantuBrandSiteData } from "@/types";
import { BantuPattern } from "@/components/BantuPattern";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "episodes" | "creatifs" | "services" | "messages">("stats");
  const [data, setData] = useState<BantuBrandSiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Formulaire d'ajout / édition d'épisode
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [episodeForm, setEpisodeForm] = useState({
    id: "",
    title: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    duration: "40:00",
    guestName: "",
    guestRole: "",
    category: "Culture & Créativité",
    description: "",
    status: "published" as "published" | "draft",
    isFeaturedHero: false,
  });

  // Formulaire d'ajout / édition de projet créatif
  const [isAddingCreative, setIsAddingCreative] = useState(false);
  const [creativeForm, setCreativeForm] = useState({
    id: "",
    name: "",
    creatorName: "",
    category: "Mode & Design",
    description: "",
    coverImage: "/images/creatifs-fashion-editorial.jpg",
    tags: "Mode, Création, Kinshasa",
    status: "published" as "published" | "draft",
    featured: true,
  });

  // Services & Paramètres
  const [settingsForm, setSettingsForm] = useState({
    contactEmail: "",
    contactPhone: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });

  // Chargement des données
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const epRes = await fetch("/api/episodes");
      const crRes = await fetch("/api/creatives");
      const msgRes = await fetch("/api/messages");

      const srvData = await res.json();
      const episodesData = await epRes.json();
      const creativesData = await crRes.json();
      const messagesData = await msgRes.json();

      const combined: BantuBrandSiteData = {
        settings: srvData.settings || {
          heroFeaturedEpisodeId: episodesData.heroFeaturedEpisodeId || "ep-01",
          contactEmail: "bantu.brand@gmail.com",
          contactPhone: "+243 97 12 45 105",
          socials: {
            instagram: "https://instagram.com/bantubrand",
            facebook: "https://facebook.com/bantubrand",
            linkedin: "https://linkedin.com/company/bantu-brand",
            youtube: "https://youtube.com/@bantubrand",
          },
        },
        episodes: episodesData.episodes || [],
        creatives: creativesData.creatives || [],
        services: srvData.services || [],
        messages: messagesData.messages || [],
      };

      setData(combined);
      setSettingsForm({
        contactEmail: combined.settings.contactEmail,
        contactPhone: combined.settings.contactPhone,
        instagram: combined.settings.socials.instagram,
        facebook: combined.settings.socials.facebook,
        linkedin: combined.settings.socials.linkedin,
        youtube: combined.settings.socials.youtube,
      });
    } catch (err: any) {
      showNotify("error", "Impossible de charger les données du dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotify = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Récupération automatique des métadonnées YouTube
  const handleFetchYouTubeMeta = async () => {
    if (!episodeForm.youtubeUrl) {
      showNotify("error", "Renseignez d'abord un lien YouTube.");
      return;
    }

    try {
      setFetchingMeta(true);
      const res = await fetch(`/api/youtube-meta?url=${encodeURIComponent(episodeForm.youtubeUrl)}`);
      const resData = await res.json();

      if (resData.success && resData.metadata) {
        setEpisodeForm((prev) => ({
          ...prev,
          title: prev.title || resData.metadata.title,
          thumbnailUrl: resData.metadata.thumbnailUrl,
          description: prev.description || resData.metadata.description || "",
        }));
        showNotify("success", "Métadonnées et miniature YouTube récupérées avec succès !");
      } else {
        showNotify("error", resData.error || "Impossible d'extraire les infos de cette vidéo.");
      }
    } catch (err: any) {
      showNotify("error", "Erreur lors de la communication avec YouTube.");
    } finally {
      setFetchingMeta(false);
    }
  };

  // Enregistrement d'un épisode
  const handleSaveEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(episodeForm),
      });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", "Épisode enregistré !");
        setIsAddingEpisode(false);
        setEpisodeForm({
          id: "",
          title: "",
          youtubeUrl: "",
          thumbnailUrl: "",
          duration: "40:00",
          guestName: "",
          guestRole: "",
          category: "Culture & Créativité",
          description: "",
          status: "published",
          isFeaturedHero: false,
        });
        loadData();
      } else {
        showNotify("error", resData.error || "Erreur lors de l'enregistrement.");
      }
    } catch (err: any) {
      showNotify("error", "Erreur réseau.");
    }
  };

  // Supprimer un épisode
  const handleDeleteEpisode = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet épisode ?")) return;
    try {
      const res = await fetch(`/api/episodes?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", "Épisode supprimé.");
        loadData();
      } else {
        showNotify("error", resData.error || "Erreur de suppression.");
      }
    } catch (e) {
      showNotify("error", "Erreur de suppression.");
    }
  };

  // Mettre un épisode en vedette dans le Grand Lecteur Hero
  const handleSetHeroEpisode = async (episode: Episode) => {
    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...episode,
          isFeaturedHero: true,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", `« ${episode.title} » est maintenant affiché dans le Grand Lecteur Hero !`);
        loadData();
      }
    } catch (e) {
      showNotify("error", "Erreur lors de la mise à jour.");
    }
  };

  // Enregistrement d'un projet créatif
  const handleSaveCreative = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/creatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creativeForm),
      });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", "Projet créatif enregistré !");
        setIsAddingCreative(false);
        setCreativeForm({
          id: "",
          name: "",
          creatorName: "",
          category: "Mode & Design",
          description: "",
          coverImage: "/images/creatifs-fashion-editorial.jpg",
          tags: "Mode, Création, Kinshasa",
          status: "published",
          featured: true,
        });
        loadData();
      } else {
        showNotify("error", resData.error || "Erreur d'enregistrement.");
      }
    } catch (e) {
      showNotify("error", "Erreur réseau.");
    }
  };

  // Supprimer un projet créatif
  const handleDeleteCreative = async (id: string) => {
    if (!confirm("Voulez-vous supprimer ce projet créatif ?")) return;
    try {
      const res = await fetch(`/api/creatives?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", "Projet supprimé.");
        loadData();
      }
    } catch (e) {
      showNotify("error", "Erreur lors de la suppression.");
    }
  };

  // Mise à jour des réglages généraux
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            contactEmail: settingsForm.contactEmail,
            contactPhone: settingsForm.contactPhone,
            socials: {
              instagram: settingsForm.instagram,
              facebook: settingsForm.facebook,
              linkedin: settingsForm.linkedin,
              youtube: settingsForm.youtube,
            },
          },
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        showNotify("success", "Paramètres et coordonnées mis à jour avec succès !");
        loadData();
      }
    } catch (e) {
      showNotify("error", "Erreur d'enregistrement.");
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-bantu-dark flex items-center justify-center text-bantu-cream">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-bantu-gold animate-spin" />
          <span className="text-sm font-semibold tracking-wider uppercase">
            Chargement du Dashboard Bantu Brand...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bantu-dark text-bantu-cream flex flex-col">
      {/* Toast de notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 ${
            notification.type === "success"
              ? "bg-green-950/90 text-green-300 border-green-700/60"
              : "bg-red-950/90 text-red-300 border-red-700/60"
          }`}
        >
          {notification.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Barre supérieure du Dashboard */}
      <header className="sticky top-0 z-40 bg-bantu-dark-card border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-bantu-yellow/40">
              <Image
                src="/images/logo-bantu-brand.jpg"
                alt="Bantu Brand"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wider text-bantu-cream">
                  BANTU BRAND
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-bantu-yellow/20 text-bantu-yellow border border-bantu-yellow/30 font-bold uppercase">
                  Admin Dashboard
                </span>
              </div>
              <p className="text-[11px] text-bantu-muted">
                Pilotage Média, Épisodes & Offres Commerciales
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-bantu-cream border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voir le site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Corps du Dashboard */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* Résumé des Métriques Clés */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-bantu-dark-card border border-white/5">
            <div className="flex items-center justify-between text-bantu-muted mb-2 text-xs">
              <span>Épisodes Podcast</span>
              <Headphones className="w-4 h-4 text-bantu-yellow" />
            </div>
            <div className="text-2xl font-black text-bantu-cream">
              {data?.episodes.length || 0}
            </div>
            <div className="text-[11px] text-bantu-yellow mt-1">
              {data?.episodes.filter((e) => e.status === "published").length || 0} publiés
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-bantu-dark-card border border-white/5">
            <div className="flex items-center justify-between text-bantu-muted mb-2 text-xs">
              <span>Projets Créatifs</span>
              <Palette className="w-4 h-4 text-bantu-red" />
            </div>
            <div className="text-2xl font-black text-bantu-cream">
              {data?.creatives.length || 0}
            </div>
            <div className="text-[11px] text-bantu-red mt-1">
              Showcase vitrine
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-bantu-dark-card border border-white/5">
            <div className="flex items-center justify-between text-bantu-muted mb-2 text-xs">
              <span>Offres Bantu Studio</span>
              <Briefcase className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-bantu-cream">
              2
            </div>
            <div className="text-[11px] text-bantu-cream/70 mt-1">
              Consultance & Accompagnement
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-bantu-dark-card border border-white/5">
            <div className="flex items-center justify-between text-bantu-muted mb-2 text-xs">
              <span>Messages reçus</span>
              <Mail className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-black text-bantu-cream">
              {data?.messages.length || 0}
            </div>
            <div className="text-[11px] text-green-400 mt-1">
              {data?.messages.filter((m) => m.status === "unread").length || 0} non lus
            </div>
          </div>
        </div>

        {/* Onglets de navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "stats"
                ? "bg-gradient-to-r from-bantu-red via-bantu-orange to-bantu-yellow text-black font-black shadow-lg"
                : "bg-white/5 text-bantu-cream/70 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Statistiques & Performance</span>
          </button>

          <button
            onClick={() => setActiveTab("episodes")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "episodes"
                ? "bg-bantu-yellow text-black font-black shadow-lg"
                : "bg-white/5 text-bantu-cream/70 hover:text-white"
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Épisodes Podcast ({data?.episodes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("creatifs")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "creatifs"
                ? "bg-bantu-yellow text-black font-black shadow-lg"
                : "bg-white/5 text-bantu-cream/70 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Showcase Créatifs ({data?.creatives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "messages"
                ? "bg-bantu-yellow text-black font-black shadow-lg"
                : "bg-white/5 text-bantu-cream/70 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Boîte de Réception ({data?.messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "services"
                ? "bg-bantu-yellow text-black font-black shadow-lg"
                : "bg-white/5 text-bantu-cream/70 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Services & Paramètres</span>
          </button>
        </div>

        {/* CONTENU ONGLETS */}

        {/* 0. STATISTIQUES & PERFORMANCE */}
        {activeTab === "stats" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* En-tête des Statistiques */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#181824] via-[#14141C] to-[#181824] border border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bantu-yellow/15 border border-bantu-yellow/30 text-bantu-yellow text-xs font-bold uppercase tracking-wider mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Métriques d&apos;Impact Bantu Brand</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Tableau de Bord & Données d&apos;Audience
                </h2>
                <p className="text-xs sm:text-sm text-bantu-cream/70 mt-1">
                  Suivi en temps réel de la portée médiatique, de l&apos;audience YouTube et des conversions Bantu Studio.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-bantu-yellow">
                  Kinshasa & International
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/30 text-xs font-bold text-green-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Données Actives
                </span>
              </div>
            </div>

            {/* 4 KPIs Majeurs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10">
                <div className="flex items-center justify-between text-bantu-cream/60 mb-3 text-xs uppercase font-bold tracking-wider">
                  <span>Abonnés YouTube</span>
                  <div className="w-8 h-8 rounded-lg bg-bantu-red/10 flex items-center justify-center text-bantu-red">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  48 500
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400 mt-2 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+1 420 ce mois (+12%)</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10">
                <div className="flex items-center justify-between text-bantu-cream/60 mb-3 text-xs uppercase font-bold tracking-wider">
                  <span>Vues Vidéos 4K</span>
                  <div className="w-8 h-8 rounded-lg bg-bantu-orange/10 flex items-center justify-center text-bantu-orange">
                    <PlaySquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  184 250
                </div>
                <div className="flex items-center gap-2 text-xs text-bantu-cream/70 mt-2">
                  <span>Temps moyen : <strong>18m 42s</strong></span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10">
                <div className="flex items-center justify-between text-bantu-cream/60 mb-3 text-xs uppercase font-bold tracking-wider">
                  <span>Taux d&apos;Engagement</span>
                  <div className="w-8 h-8 rounded-lg bg-bantu-yellow/10 flex items-center justify-center text-bantu-yellow">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  8.9%
                </div>
                <div className="flex items-center gap-2 text-xs text-bantu-yellow mt-2 font-semibold">
                  <span>3x supérieur à la moyenne média</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10">
                <div className="flex items-center justify-between text-bantu-cream/60 mb-3 text-xs uppercase font-bold tracking-wider">
                  <span>Demandes & Devis</span>
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  34
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400 mt-2 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>72% taux de signature Studio</span>
                </div>
              </div>
            </div>

            {/* Répartition Géographique & Démographique */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Carte Géographique */}
              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bantu-cream">
                    Répartition Géographique de l&apos;Audience
                  </h3>
                  <span className="text-xs text-bantu-yellow font-mono">100% Total</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Kinshasa & RDC</span>
                      <span className="font-bold text-bantu-yellow">42%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-yellow" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Diaspora Europe (France, Belgique, UK)</span>
                      <span className="font-bold text-bantu-orange">28%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-orange" style={{ width: "28%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Afrique de l&apos;Ouest & Centrale (CI, Sénégal, Cameroun)</span>
                      <span className="font-bold text-bantu-red">18%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-red" style={{ width: "18%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Amérique du Nord (Canada, USA)</span>
                      <span className="font-bold text-white/70">12%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-white/40" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segmentation des Profils */}
              <div className="p-6 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bantu-cream">
                    Profils des Utilisateurs & Décideurs
                  </h3>
                  <span className="text-xs text-bantu-orange font-mono">Bantu Network</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Créatifs, Designers & Artistes</span>
                      <span className="font-bold text-bantu-red">35%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-red" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Directeurs Marketing & Responsables Com</span>
                      <span className="font-bold text-bantu-orange">30%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-orange" style={{ width: "30%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Fondateurs de Marques & Dirigeants de PME</span>
                      <span className="font-bold text-bantu-yellow">25%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-bantu-yellow" style={{ width: "25%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bantu-cream font-medium">Passionnés de Culture & Médias Urbains</span>
                      <span className="font-bold text-white/70">10%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-white/40" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance des Épisodes & Pipeline Commercial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Top Épisodes */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bantu-cream">
                    Top Épisodes les Plus Vus sur YouTube
                  </h3>
                  <span className="text-xs text-bantu-yellow">Taux d&apos;Avis Positifs</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-bantu-yellow text-black font-black text-xs flex items-center justify-center">1</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">L&apos;art du branding africain contemporain</div>
                        <div className="text-[11px] text-bantu-muted">Invité : Doris Kabemba • 42 min</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-mono font-bold text-bantu-yellow">24.8k vues</div>
                      <div className="text-[10px] text-green-400 font-semibold">98% Like</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-bantu-orange text-white font-black text-xs flex items-center justify-center">2</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Mode & Identité : Le renouveau textile kinois</div>
                        <div className="text-[11px] text-bantu-muted">Invité : Kiese Matondo • 38 min</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-mono font-bold text-bantu-orange">19.4k vues</div>
                      <div className="text-[10px] text-green-400 font-semibold">96% Like</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-bantu-red text-white font-black text-xs flex items-center justify-center">3</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Architecture & Design d&apos;espace à Kinshasa</div>
                        <div className="text-[11px] text-bantu-muted">Invité : Fally Lumumba • 45 min</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-mono font-bold text-bantu-red">16.2k vues</div>
                      <div className="text-[10px] text-green-400 font-semibold">94% Like</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline Bantu Studio */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-bantu-cream">
                    Pipeline Commercial Studio
                  </h3>
                  <span className="text-xs text-green-400 font-bold">Actif</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-bantu-yellow/10 to-transparent border border-bantu-yellow/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-bantu-yellow">Consultance en Stratégie</span>
                      <span className="text-xs font-mono font-black text-white">14 dossiers</span>
                    </div>
                    <p className="text-[11px] text-bantu-cream/60">Positionnement & identité culturelle de marque</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-bantu-orange/10 to-transparent border border-bantu-orange/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-bantu-orange">Accompagnement Opérationnel</span>
                      <span className="text-xs font-mono font-black text-white">12 dossiers</span>
                    </div>
                    <p className="text-[11px] text-bantu-cream/60">Suivi continu, vidéo 4K & activations digitales</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-bantu-red/10 to-transparent border border-bantu-red/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-bantu-red">Sponsoring & Podcast Dédié</span>
                      <span className="text-xs font-mono font-black text-white">8 dossiers</span>
                    </div>
                    <p className="text-[11px] text-bantu-cream/60">Visibilité sponsorisée et formats immersifs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. ÉPISODES PODCAST */}
        {activeTab === "episodes" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-bantu-cream">
                  Gestion des Épisodes & du Grand Lecteur Hero
                </h2>
                <p className="text-xs text-bantu-muted">
                  Collez un lien YouTube pour que le système récupère et diffuse automatiquement l'épisode sur le site.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddingEpisode(!isAddingEpisode);
                  setEpisodeForm({
                    id: "",
                    title: "",
                    youtubeUrl: "",
                    thumbnailUrl: "",
                    duration: "40:00",
                    guestName: "",
                    guestRole: "",
                    category: "Culture & Créativité",
                    description: "",
                    status: "published",
                    isFeaturedHero: false,
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bantu-red hover:bg-bantu-red-dark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-bantu-red/20"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingEpisode ? "Fermer le formulaire" : "Ajouter un épisode"}</span>
              </button>
            </div>

            {/* Formulaire d'ajout / modification */}
            {isAddingEpisode && (
              <form
                onSubmit={handleSaveEpisode}
                className="p-6 sm:p-8 rounded-2xl bg-bantu-dark-card border border-bantu-gold/40 shadow-2xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-bantu-gold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{episodeForm.id ? "Modifier l'épisode" : "Nouvel épisode via Lien YouTube"}</span>
                  </h3>
                  <p className="text-xs text-bantu-cream/70 mt-1">
                    Entrez le lien YouTube et cliquez sur « Récupérer les infos » pour renseigner instantanément la vidéo.
                  </p>
                </div>

                {/* Champ Lien YouTube + Bouton Magique */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bantu-gold mb-2">
                    Lien YouTube de la vidéo / podcast *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                      value={episodeForm.youtubeUrl}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, youtubeUrl: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bantu-gold transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleFetchYouTubeMeta}
                      disabled={fetchingMeta || !episodeForm.youtubeUrl}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-bantu-gold hover:bg-bantu-gold-dark text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40"
                    >
                      {fetchingMeta ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Récupération...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Récupérer les infos auto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Titre de l'épisode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Titre accrocheur..."
                      value={episodeForm.title}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Catégorie thématique
                    </label>
                    <select
                      value={episodeForm.category}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A22] border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                    >
                      <option value="Vision & Stratégie">Vision & Stratégie</option>
                      <option value="Mode & Design">Mode & Design</option>
                      <option value="Culture Urbaine">Culture Urbaine</option>
                      <option value="Publicité & Médias">Publicité & Médias</option>
                      <option value="Formation & Impact">Formation & Impact</option>
                      <option value="Artisanat d'Art">Artisanat d'Art</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Nom de l'invité(e)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Doris Kabemba"
                      value={episodeForm.guestName}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, guestName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Rôle / Titre de l'invité(e)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Designer Textile"
                      value={episodeForm.guestRole}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, guestRole: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                      Durée (ex: 45:10)
                    </label>
                    <input
                      type="text"
                      placeholder="35:00"
                      value={episodeForm.duration}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, duration: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                    Description ou résumé éditorial
                  </label>
                  <textarea
                    rows={3}
                    placeholder="De quoi parle cet épisode..."
                    value={episodeForm.description}
                    onChange={(e) => setEpisodeForm({ ...episodeForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-bantu-gold"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                      <input
                        type="checkbox"
                        checked={episodeForm.isFeaturedHero}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, isFeaturedHero: e.target.checked })}
                        className="rounded border-white/20 text-bantu-gold focus:ring-0 w-4 h-4"
                      />
                      <span className="text-bantu-gold">Mettre en vedette dans le Grand Lecteur Hero</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={episodeForm.status === "published"}
                        onChange={(e) =>
                          setEpisodeForm({
                            ...episodeForm,
                            status: e.target.checked ? "published" : "draft",
                          })
                        }
                        className="rounded border-white/20 text-bantu-red focus:ring-0 w-4 h-4"
                      />
                      <span>Publier immédiatement sur le site</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingEpisode(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-bantu-red to-bantu-gold text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                    >
                      Enregistrer l'épisode
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Liste des épisodes */}
            <div className="space-y-3">
              {data?.episodes.map((ep) => {
                const isHero = data.settings.heroFeaturedEpisodeId === ep.id || ep.isFeaturedHero;

                return (
                  <div
                    key={ep.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-bantu-dark-card border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isHero ? "border-bantu-gold shadow-lg shadow-bantu-gold/10" : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Vignette */}
                      <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-black flex-shrink-0">
                        <Image
                          src={ep.thumbnailUrl || "/images/consultance-strategy-meeting.jpg"}
                          alt={ep.title}
                          fill
                          className="object-cover"
                        />
                        {isHero && (
                          <div className="absolute top-1 left-1 bg-bantu-gold text-white p-1 rounded-md shadow">
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Infos */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-bantu-gold uppercase">
                            {ep.category}
                          </span>
                          {isHero && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-bantu-gold/20 text-bantu-gold border border-bantu-gold/40">
                              Grand Lecteur Hero
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              ep.status === "published"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {ep.status === "published" ? "Publié" : "Brouillon"}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                          {ep.title}
                        </h4>

                        <div className="text-xs text-bantu-muted flex items-center gap-2 mt-0.5">
                          <span>Invité : {ep.guestName}</span>
                          <span>• {ep.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!isHero && (
                        <button
                          onClick={() => handleSetHeroEpisode(ep)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-bantu-gold/15 text-bantu-gold hover:bg-bantu-gold hover:text-white transition-colors text-xs font-semibold"
                          title="Afficher dans le Grand Lecteur Hero"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Mettre en Hero</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setEpisodeForm({
                            id: ep.id,
                            title: ep.title,
                            youtubeUrl: ep.youtubeUrl,
                            thumbnailUrl: ep.thumbnailUrl,
                            duration: ep.duration || "40:00",
                            guestName: ep.guestName,
                            guestRole: ep.guestRole,
                            category: ep.category,
                            description: ep.description,
                            status: ep.status,
                            isFeaturedHero: Boolean(isHero),
                          });
                          setIsAddingEpisode(true);
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-bantu-cream/80 hover:text-white"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteEpisode(ep.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-bantu-cream/80 hover:text-red-400"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. CRÉATIFS & PROJETS */}
        {activeTab === "creatifs" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-bantu-cream">
                  Gestion des Créatifs & Projets Documentés
                </h2>
                <p className="text-xs text-bantu-muted">
                  Mettez en lumière les talents africains sur la section vitrine du site officiel.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddingCreative(!isAddingCreative);
                  setCreativeForm({
                    id: "",
                    name: "",
                    creatorName: "",
                    category: "Mode & Design",
                    description: "",
                    coverImage: "/images/creatifs-fashion-editorial.jpg",
                    tags: "Mode, Création, Kinshasa",
                    status: "published",
                    featured: true,
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bantu-red hover:bg-bantu-red-dark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingCreative ? "Fermer le formulaire" : "Ajouter un créatif / projet"}</span>
              </button>
            </div>

            {/* Formulaire Créatif */}
            {isAddingCreative && (
              <form
                onSubmit={handleSaveCreative}
                className="p-6 sm:p-8 rounded-2xl bg-bantu-dark-card border border-bantu-gold/40 shadow-2xl space-y-4"
              >
                <h3 className="text-base font-bold text-bantu-gold">
                  {creativeForm.id ? "Modifier le projet" : "Ajouter un nouveau créatif / projet"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Nom du projet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Haute Couture Bantu"
                      value={creativeForm.name}
                      onChange={(e) => setCreativeForm({ ...creativeForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Créateur / Artiste *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Doris Kabemba / Collectif KIN"
                      value={creativeForm.creatorName}
                      onChange={(e) => setCreativeForm({ ...creativeForm, creatorName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Catégorie</label>
                    <input
                      type="text"
                      value={creativeForm.category}
                      onChange={(e) => setCreativeForm({ ...creativeForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Image du projet</label>
                    <select
                      value={creativeForm.coverImage}
                      onChange={(e) => setCreativeForm({ ...creativeForm, coverImage: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A22] border border-white/10 text-white text-sm"
                    >
                      <option value="/images/creatifs-fashion-editorial.jpg">Haute Couture Wax (af674daa...)</option>
                      <option value="/images/creatifs-collective-streetwear.jpg">Streetwear You Matter (fcf0898e...)</option>
                      <option value="/images/creatifs-seamstress-textile.jpg">Atelier Confection (f39a85bc...)</option>
                      <option value="/images/commercial-campaign-culture.jpg">Campagne Marque (5b9966e5...)</option>
                      <option value="/images/accompagnement-training-mentoring.jpg">Mentoring Digital (d187ec29...)</option>
                      <option value="/images/creatifs-collective-youth.jpg">Collectif Jeunesse (979aa87a...)</option>
                      <option value="/images/consultance-strategy-meeting.jpg">Stratégie Agence (207228b9...)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={creativeForm.description}
                    onChange={(e) => setCreativeForm({ ...creativeForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Tags (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={creativeForm.tags}
                    onChange={(e) => setCreativeForm({ ...creativeForm, tags: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCreative(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold uppercase"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-bantu-gold text-white font-bold text-xs uppercase"
                  >
                    Enregistrer le projet
                  </button>
                </div>
              </form>
            )}

            {/* Grille des créatifs existants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.creatives.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl overflow-hidden bg-bantu-dark-card border border-white/10 p-4 flex flex-col justify-between"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black">
                    <Image
                      src={c.coverImage}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-bantu-gold uppercase">
                      {c.category}
                    </span>
                    <h4 className="text-base font-bold text-white mb-1">{c.name}</h4>
                    <p className="text-xs text-bantu-muted mb-2">Par {c.creatorName}</p>
                    <p className="text-xs text-bantu-cream/70 line-clamp-2">{c.description}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[10px] text-bantu-muted">
                      {c.tags?.join(", ")}
                    </div>
                    <button
                      onClick={() => handleDeleteCreative(c.id)}
                      className="p-1.5 rounded-md hover:bg-red-500/20 text-red-400"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. BOÎTE DE RÉCEPTION */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-bantu-cream">
                Boîte de Réception & Candidatures Reçues
              </h2>
              <p className="text-xs text-bantu-muted">
                Demandes de consultance, propositions de projets créatifs et messages des auditeurs reçus via le site.
              </p>
            </div>

            {(!data?.messages || data.messages.length === 0) ? (
              <div className="p-12 text-center rounded-2xl bg-bantu-dark-card border border-white/5">
                <Mail className="w-12 h-12 text-bantu-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-white mb-1">Aucun message pour le moment</h3>
                <p className="text-xs text-bantu-muted max-w-sm mx-auto">
                  Les formulaires soumis depuis la page d'accueil apparaîtront automatiquement ici.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            msg.profileType === "marque"
                              ? "bg-bantu-gold/20 text-bantu-gold"
                              : msg.profileType === "creatif"
                              ? "bg-bantu-red/20 text-bantu-red"
                              : "bg-amber-600/20 text-amber-400"
                          }`}
                        >
                          {msg.profileType === "marque"
                            ? "Marque / Entreprise"
                            : msg.profileType === "creatif"
                            ? "Créatif Africain"
                            : "Auditeur"}
                        </span>
                        <span className="text-sm font-bold text-white">{msg.fullName}</span>
                        {msg.organization && (
                          <span className="text-xs text-bantu-muted">({msg.organization})</span>
                        )}
                      </div>

                      <div className="text-xs text-bantu-muted">
                        {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="text-xs text-bantu-gold font-semibold">
                      Objet : {msg.projectType || "Demande de contact"}
                    </div>

                    <p className="text-xs sm:text-sm text-bantu-cream/80 bg-white/[0.02] p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <div className="flex items-center gap-4 text-bantu-cream/70">
                        <span>Email : <a href={`mailto:${msg.email}`} className="text-bantu-gold underline">{msg.email}</a></span>
                        {msg.phone && <span>Tél : <a href={`tel:${msg.phone}`} className="text-bantu-gold underline">{msg.phone}</a></span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. SERVICES & PARAMÈTRES */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-bantu-cream">
                Coordonnées & Paramètres Officiels
              </h2>
              <p className="text-xs text-bantu-muted">
                Mettez à jour les adresses de contact et les liens de réseaux sociaux affichés sur tout le site.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="p-6 sm:p-8 rounded-2xl bg-bantu-dark-card border border-white/10 space-y-6 max-w-3xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                    Email de contact officiel
                  </label>
                  <input
                    type="email"
                    required
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-bantu-cream/80 mb-1.5">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.contactPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-bantu-gold mb-3">
                  Réseaux Sociaux Bantu Brand (@bantubrand)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-bantu-cream/70 mb-1">Instagram</label>
                    <input
                      type="url"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-bantu-cream/70 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={settingsForm.linkedin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-bantu-cream/70 mb-1">Facebook</label>
                    <input
                      type="url"
                      value={settingsForm.facebook}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-bantu-cream/70 mb-1">Chaîne YouTube</label>
                    <input
                      type="url"
                      value={settingsForm.youtube}
                      onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-bantu-red to-bantu-gold text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Enregistrer les paramètres
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Petit footer du dashboard */}
      <footer className="py-6 px-8 border-t border-white/10 text-center text-xs text-bantu-muted bg-bantu-dark-card">
        Bantu Brand Dashboard • Framework MOKILI • Kinshasa, RDC
      </footer>
    </div>
  );
}
