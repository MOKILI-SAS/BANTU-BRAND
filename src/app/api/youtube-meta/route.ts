import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeMetadata, extractYouTubeId } from "@/lib/youtube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { success: false, error: "Paramètre 'url' manquant." },
      { status: 400 }
    );
  }

  const youtubeId = extractYouTubeId(url);
  if (!youtubeId) {
    return NextResponse.json(
      { success: false, error: "Lien YouTube non reconnu ou invalide." },
      { status: 400 }
    );
  }

  try {
    const metadata = await fetchYouTubeMetadata(url);
    return NextResponse.json({ success: true, metadata });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Impossible de récupérer les informations YouTube." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body.url;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Le champ 'url' est obligatoire." },
        { status: 400 }
      );
    }

    const youtubeId = extractYouTubeId(url);
    if (!youtubeId) {
      return NextResponse.json(
        { success: false, error: "Lien YouTube non reconnu ou invalide." },
        { status: 400 }
      );
    }

    const metadata = await fetchYouTubeMetadata(url);
    return NextResponse.json({ success: true, metadata });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de traitement de la vidéo YouTube." },
      { status: 500 }
    );
  }
}
