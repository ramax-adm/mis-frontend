import { NextResponse } from "next/server";

// Proxy para PDFs com signedUrl
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const signedUrl = searchParams.get("url");

    if (!signedUrl) {
      return NextResponse.json(
        { error: "Missing signedUrl param" },
        { status: 400 }
      );
    }

    // O servidor Next.js pode buscar o arquivo mesmo com CORS
    const res = await fetch(signedUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch PDF" },
        { status: res.status }
      );
    }

    return new NextResponse(res.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline", // 👈 força abrir em vez de baixar
      },
    });
  } catch (err) {
    console.error("Erro no proxy:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
