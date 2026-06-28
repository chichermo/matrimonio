"use client";

import { useState } from "react";
import { YouTubeLiveChat } from "@/components/YouTubeLiveChat";

interface StreamChatPanelProps {
  youtubeVideoId: string;
  isLive: boolean;
}

export function StreamChatPanel({ youtubeVideoId, isLive }: StreamChatPanelProps) {
  const [showChat, setShowChat] = useState(false);

  const chatContent = isLive ? (
    <YouTubeLiveChat videoId={youtubeVideoId} />
  ) : (
    <div className="flex items-center justify-center h-full min-h-[280px] md:min-h-[360px] px-6 text-center text-sm text-foreground/40 italic">
      El chat estará disponible cuando comience la transmisión
    </div>
  );

  return (
    <>
      {/* Móvil / tablet: chat colapsable */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setShowChat((v) => !v)}
          className="touch-target w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-cream border border-gold/25 shadow-sm text-left"
          aria-expanded={showChat}
        >
          <div>
            <span className="font-display font-semibold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
              Mensajes en vivo
            </span>
            <p className="text-xs text-foreground/60 mt-0.5">Chat de YouTube</p>
          </div>
          <span className="text-gold text-xl font-light" aria-hidden>
            {showChat ? "−" : "+"}
          </span>
        </button>
        {showChat && (
          <div className="mt-3 rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden">
            <div className="h-[min(55vh,420px)] bg-white">{chatContent}</div>
          </div>
        )}
      </div>

      {/* Escritorio: panel fijo */}
      <div className="hidden lg:flex flex-col h-full min-h-[400px] rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gold/20 bg-gold-light/30 shrink-0">
          <h2
            className="text-lg font-display font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Mensajes en vivo
          </h2>
          <p className="text-xs text-foreground/60">Chat de YouTube — deja tus buenos deseos</p>
        </div>
        <div className="flex-1 bg-white min-h-0">{chatContent}</div>
      </div>
    </>
  );
}
