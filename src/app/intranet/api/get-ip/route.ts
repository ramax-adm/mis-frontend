import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Pega o IP do cliente no header (fallback para "::1" se localhost)
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();

  return NextResponse.json({ ip: data.ip });
}
