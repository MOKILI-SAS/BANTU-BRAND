/**
 * Utilitaires YouTube pour Bantu Brand
 * Permet d'extraire l'ID vidéo, de générer l'URL d'intégration et
 * d'extraire automatiquement les métadonnées (titre, miniature, auteur)
 * sans modifier le code, directement depuis le dashboard.
 */

export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Si c'est déjà un ID direct de 11 caractères (ex: dQw4w9WgXcQ)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex complète pour tous les formats d'URL YouTube
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    const candidate = match && (match[1]?.length === 11 ? match[1] : match[7]?.length === 11 ? match[7] : null);
    if (candidate) return candidate;
  }

  return null;
}

export function getYouTubeThumbnailUrl(
  youtubeId: string,
  quality: "maxres" | "hq" | "mq" = "maxres"
): string {
  if (!youtubeId) return "/images/logo-bantu-brand.jpg";
  if (quality === "maxres") {
    return `https://images.weserv.nl/?url=img.youtube.com/vi/${youtubeId}/maxresdefault.jpg&default=https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${youtubeId}/${quality}default.jpg`;
}

export function getYouTubeEmbedUrl(
  youtubeId: string,
  options: {
    autoplay?: boolean;
    controls?: boolean;
    modestbranding?: boolean;
    rel?: boolean;
  } = {}
): string {
  const {
    autoplay = false,
    controls = true,
    modestbranding = true,
    rel = false,
  } = options;

  const params = new URLSearchParams({
    enablejsapi: "1",
    autoplay: autoplay ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: modestbranding ? "1" : "0",
    rel: rel ? "1" : "0",
    origin: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  });

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

export interface YouTubeMetadata {
  title: string;
  authorName: string;
  thumbnailUrl: string;
  youtubeId: string;
  duration?: string;
  description?: string;
}

/**
 * Récupère automatiquement les métadonnées officielles d'une vidéo YouTube
 * Utilise l'API oEmbed officielle (aucun quota, aucune clé requise).
 */
export async function fetchYouTubeMetadata(
  urlOrId: string
): Promise<YouTubeMetadata> {
  const youtubeId = extractYouTubeId(urlOrId);
  if (!youtubeId) {
    throw new Error("Lien ou identifiant YouTube invalide.");
  }

  const standardUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const oEmbedEndpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    standardUrl
  )}&format=json`;

  try {
    const res = await fetch(oEmbedEndpoint, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Fallback avec les infos connues
      return {
        youtubeId,
        title: `Épisode Bantu Brand #${youtubeId.slice(0, 4)}`,
        authorName: "Bantu Brand Média",
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        description: "Contenu média et podcast officiel Bantu Brand.",
      };
    }

    const data = await res.json();

    return {
      youtubeId,
      title: data.title || "Épisode Bantu Brand",
      authorName: data.author_name || "Bantu Brand",
      thumbnailUrl:
        data.thumbnail_url ||
        `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      description: `Épisode produit et diffusé par ${data.author_name || "Bantu Brand"}.`,
    };
  } catch (error) {
    // Si la requête réseau échoue (mode hors ligne ou sandbox), on retourne un objet valide
    return {
      youtubeId,
      title: `Épisode Bantu Brand`,
      authorName: "Bantu Brand Média",
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      description: "Contenu média et podcast officiel Bantu Brand.",
    };
  }
}
