import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data-store";
import { MessageInquiry } from "@/types";

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({
    success: true,
    messages: data.messages || [],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileType, fullName, email, phone, organization, projectType, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Le nom, l'email et votre message sont obligatoires." },
        { status: 400 }
      );
    }

    const newMessage: MessageInquiry = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      profileType: profileType || "marque",
      fullName,
      email,
      phone,
      organization,
      projectType,
      message,
      status: "unread",
    };

    const data = getSiteData();
    if (!data.messages) data.messages = [];
    data.messages.unshift(newMessage);
    saveSiteData(data);

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé à l'équipe Bantu Brand avec succès !",
      inquiry: newMessage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID et nouveau statut obligatoires." },
        { status: 400 }
      );
    }

    const data = getSiteData();
    const msg = data.messages.find((m) => m.id === id);
    if (msg) {
      msg.status = status;
      saveSiteData(data);
      return NextResponse.json({ success: true, message: "Statut mis à jour." });
    }

    return NextResponse.json({ success: false, error: "Message introuvable." }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
