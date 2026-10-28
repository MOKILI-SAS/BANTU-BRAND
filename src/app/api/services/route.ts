import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data-store";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({
    success: true,
    services: data.services,
    settings: data.settings,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = getSiteData();

    if (body.services && Array.isArray(body.services)) {
      data.services = body.services;
    }

    if (body.settings) {
      data.settings = {
        ...data.settings,
        ...body.settings,
      };
    }

    saveSiteData(data);

    return NextResponse.json({
      success: true,
      services: data.services,
      settings: data.settings,
      message: "Services et paramètres mis à jour.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de mise à jour des services." },
      { status: 500 }
    );
  }
}
