import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data-store";
import { CreativeProject } from "@/types";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({
    success: true,
    creatives: data.creatives,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = getSiteData();

    const {
      id,
      name,
      creatorName,
      category,
      description,
      details,
      coverImage,
      externalLink,
      tags = [],
      status = "published",
      featured = false,
    } = body;

    if (!name || !creatorName) {
      return NextResponse.json(
        { success: false, error: "Le nom du projet et le créateur sont requis." },
        { status: 400 }
      );
    }

    const creativeId = id || `cr-${Date.now()}`;
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newCreative: CreativeProject = {
      id: creativeId,
      slug,
      name,
      creatorName,
      category: category || "Création Contemporaine",
      description: description || "Projet créatif mis en avant par Bantu Brand.",
      details,
      coverImage: coverImage || "/images/creatifs-fashion-editorial.jpg",
      externalLink,
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [],
      status: status === "draft" ? "draft" : "published",
      featured: Boolean(featured),
    };

    const existingIndex = data.creatives.findIndex((c) => c.id === creativeId);
    if (existingIndex >= 0) {
      data.creatives[existingIndex] = {
        ...data.creatives[existingIndex],
        ...newCreative,
      };
    } else {
      data.creatives.unshift(newCreative);
    }

    saveSiteData(data);

    return NextResponse.json({
      success: true,
      creative: newCreative,
      message: "Projet créatif enregistré avec succès.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de l'enregistrement." },
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
        { success: false, error: "ID du projet manquant." },
        { status: 400 }
      );
    }

    const data = getSiteData();
    data.creatives = data.creatives.filter((c) => c.id !== id);
    saveSiteData(data);

    return NextResponse.json({
      success: true,
      message: "Projet supprimé.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de la suppression." },
      { status: 500 }
    );
  }
}
