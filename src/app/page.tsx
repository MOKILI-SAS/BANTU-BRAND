import { getSiteData, getHeroFeaturedEpisode } from "@/lib/data-store";
import { HomeClient } from "@/components/HomeClient";

// Revalidation dynamique pour que les modifications du Dashboard apparaissent immédiatement
export const revalidate = 0;

export default function HomePage() {
  const data = getSiteData();
  const featuredEpisode = getHeroFeaturedEpisode();

  return (
    <HomeClient
      initialData={data}
      initialFeaturedEpisode={featuredEpisode}
    />
  );
}
