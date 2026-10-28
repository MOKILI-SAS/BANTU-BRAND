import fs from "fs";
import path from "path";
import { BantuBrandSiteData, Episode, CreativeProject, MessageInquiry, ServiceOffer } from "@/types";
import { initialSiteData } from "@/data/initial-data";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "bantu-store.json");

/**
 * Lit les données du site depuis le fichier JSON persistant.
 * Si le fichier n'existe pas encore, il est créé à partir des données initiales.
 */
export function getSiteData(): BantuBrandSiteData {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Création du répertoire si nécessaire
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialSiteData, null, 2), "utf-8");
      return initialSiteData;
    }

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);

    // Fusion de sécurité au cas où un champ est absent
    return {
      settings: { ...initialSiteData.settings, ...(parsed.settings || {}) },
      episodes: Array.isArray(parsed.episodes) ? parsed.episodes : initialSiteData.episodes,
      creatives: Array.isArray(parsed.creatives) ? parsed.creatives : initialSiteData.creatives,
      services: Array.isArray(parsed.services) ? parsed.services : initialSiteData.services,
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch (error) {
    console.error("Erreur lors de la lecture du store Bantu:", error);
    return initialSiteData;
  }
}

/**
 * Enregistre les données du site de manière atomique dans le fichier JSON
 */
export function saveSiteData(data: BantuBrandSiteData): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du store Bantu:", error);
    return false;
  }
}

/**
 * Retourne l'épisode sélectionné pour le Grand Lecteur Hero
 */
export function getHeroFeaturedEpisode(): Episode {
  const data = getSiteData();
  const featuredId = data.settings.heroFeaturedEpisodeId;
  const found = data.episodes.find((ep) => ep.id === featuredId && ep.status === "published");
  if (found) return found;

  const firstPublished = data.episodes.find((ep) => ep.status === "published");
  return firstPublished || data.episodes[0] || initialSiteData.episodes[0];
}
