import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data-store";
import { extractYouTubeId, getYouTubeThumbnailUrl, fetchYouTubeMetadata } from "@/lib/youtube";
import { Episode } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");

  const data = getSiteData();
  let episodes = data.episodes;

  if (statusFilter === "published") {
    episodes = episodes.filter((ep) => ep.status === "published");
  }

  return NextResponse.json({
    success: true,
    episodes,
    heroFeaturedEpisodeId: data.settings.heroFeaturedEpisodeId,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = getSiteData();

    const {
      id,
      title,
      youtubeUrl,
      guestName,
      guestRole,
      category,
      description,
      duration,
      status = "published",
      isFeaturedHero = false,
      thumbnailUrl,
    } = body;

    if (!youtubeUrl) {
      return NextResponse.json(
        { success: false, error: "Le lien YouTube est obligatoire." },
        { status: 400 }
      );
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { success: false, error: "Lien YouTube invalide. Vérifiez l'adresse entrée." },
        { status: 400 }
      );
    }

    let finalTitle = title;
    let finalThumbnail = thumbnailUrl;
    let finalDescription = description;

    // Si le titre ou la miniature ne sont pas fournis, on tente de les récupérer via l'API YouTube
    if (!finalTitle || !finalThumbnail) {
      try {
        const meta = await fetchYouTubeMetadata(youtubeUrl);
        if (!finalTitle) finalTitle = meta.title;
        if (!finalThumbnail) finalThumbnail = meta.thumbnailUrl;
        if (!finalDescription) finalDescription = meta.description || "";
      } catch (e) {
        if (!finalThumbnail) finalThumbnail = getYouTubeThumbnailUrl(youtubeId);
        if (!finalTitle) finalTitle = `Épisode Bantu Brand (${youtubeId})`;
      }
    }

    const episodeId = id || `ep-${Date.now()}`;
    const slug = (finalTitle || "episode")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newEpisode: Episode = {
      id: episodeId,
      slug,
      title: finalTitle || "Nouvel Épisode Bantu Brand",
      youtubeUrl,
      youtubeId,
      thumbnailUrl: finalThumbnail || getYouTubeThumbnailUrl(youtubeId),
      duration: duration || "35:00",
      guestName: guestName || "Invité Créatif",
      guestRole: guestRole || "Créateur Africain",
      category: category || "Culture & Créativité",
      description: finalDescription || "Épisode officiel de Bantu Brand.",
      publishedAt: new Date().toISOString().split("T")[0],
      status: status === "draft" ? "draft" : "published",
      isFeaturedHero: Boolean(isFeaturedHero),
    };

    // Vérifie si on met à jour ou si on crée
    const existingIndex = data.episodes.findIndex((e) => e.id === episodeId);
    if (existingIndex >= 0) {
      data.episodes[existingIndex] = {
        ...data.episodes[existingIndex],
        ...newEpisode,
      };
    } else {
      data.episodes.unshift(newEpisode);
    }

    // Si défini comme vedette Hero
    if (isFeaturedHero) {
      data.settings.heroFeaturedEpisodeId = episodeId;
      data.episodes.forEach((ep) => {
        ep.isFeaturedHero = ep.id === episodeId;
      });
    }

    saveSiteData(data);

    return NextResponse.json({
      success: true,
      episode: newEpisode,
      message: "Épisode enregistré avec succès !",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de l'enregistrement de l'épisode." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de l'épisode manquant." },
        { status: 400 }
      );
    }

    const data = getSiteData();
    const prevCount = data.episodes.length;
    data.episodes = data.episodes.filter((e) => e.id !== id);

    if (data.episodes.length === prevCount) {
      return NextResponse.json(
        { success: false, error: "Épisode introuvable." },
        { status: 404 }
      );
    }

    // Si on a supprimé l'épisode en vedette Hero, on réassigne au premier disponible
    if (data.settings.heroFeaturedEpisodeId === id && data.episodes.length > 0) {
      data.settings.heroFeaturedEpisodeId = data.episodes[0].id;
      data.episodes[0].isFeaturedHero = true;
    }

    saveSiteData(data);

    return NextResponse.json({
      success: true,
      message: "Épisode supprimé avec succès.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de suppression." },
      { status: 500 }
    );
  }
}
