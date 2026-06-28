import { NextResponse } from "next/server";
import { addMessage, getMessages, isChatOpen } from "@/lib/chat-store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isChatOpen()) {
    return NextResponse.json({ open: false, messages: [] });
  }

  return NextResponse.json({ open: true, messages: getMessages() });
}

export async function POST(request: Request) {
  if (!isChatOpen()) {
    return NextResponse.json({ error: "El chat no está disponible ahora" }, { status: 403 });
  }

  const body = await request.json();
  const author = String(body.author ?? "").trim();
  const content = String(body.content ?? "").trim();

  if (!author || author.length > 50 || !content || content.length > 500) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const message = addMessage(author, content);
  return NextResponse.json(message);
}
