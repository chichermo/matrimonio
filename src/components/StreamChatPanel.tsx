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
    <div className="flex items-center justify-center h-full px-4 text-center text-sm sm:text-base text-foreground/65">
      El chat estará disponible cuando comience la transmisión
    </div>
  );

  return (
    <>
      {/* Móvil / tablet: chat colapsable, altura ~16:9 como el video */}
      <div className="lg:hidden w-full">
        <button
          type="button"
          onClick={() => setShowChat((v) => !v)}
          className="touch-target w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-cream border border-gold/25 shadow-sm text-left"
          aria-expanded={showChat}
        >
          <div>
            <span
              className="font-display font-semibold text-lg"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mensajes en vivo
            </span>
            <p className="text-sm text-foreground/75 mt-0.5">Chat de YouTube</p>
          </div>
          <span className="text-gold text-xl font-light" aria-hidden>
            {showChat ? "−" : "+"}
          </span>
        </button>
        {showChat && (
          <div className="mt-3 rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden h-[50vw] max-h-[320px] min-h-[200px]">
            <div className="h-full bg-white">{chatContent}</div>
          </div>
        )}
      </div>

      {/* Escritorio: misma altura que el marco del video */}
      <div className="hidden lg:flex flex-col flex-1 min-h-0 h-full rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gold/20 bg-gold-light/30 shrink-0">
          <h2
            className="text-lg font-display font-semibold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Mensajes en vivo
          </h2>
          <p className="text-xs text-foreground/75">Chat de YouTube</p>
        </div>
        <div className="flex-1 min-h-0 bg-white overflow-hidden">{chatContent}</div>
      </div>
    </>
  );
}
