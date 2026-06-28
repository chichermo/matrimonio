"use client";

import { useState } from "react";
import { LiveChat } from "@/components/LiveChat";

interface StreamChatPanelProps {
  chatEnabled: boolean;
}

export function StreamChatPanel({ chatEnabled }: StreamChatPanelProps) {
  const [showChat, setShowChat] = useState(true);

  const chatPanel = (
    <div className="flex flex-col h-full min-h-0 bg-white">
      <LiveChat enabled={chatEnabled} />
    </div>
  );

  return (
    <>
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
              Mensajes para Liesbeth & Guillermo
            </span>
            <p className="text-sm text-foreground/75 mt-0.5">
              {chatEnabled ? "Deja tus buenos deseos" : "Disponible durante la transmisión"}
            </p>
          </div>
          <span className="text-gold text-xl font-light" aria-hidden>
            {showChat ? "−" : "+"}
          </span>
        </button>
        {showChat && (
          <div className="mt-3 rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden h-[50vw] max-h-[360px] min-h-[240px]">
            {chatPanel}
          </div>
        )}
      </div>

      <div className="hidden lg:flex flex-col flex-1 min-h-0 h-full rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gold/20 bg-gold-light/30 shrink-0">
          <h2
            className="text-lg font-display font-semibold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Mensajes para la pareja
          </h2>
          <p className="text-xs text-foreground/75">
            {chatEnabled ? "Escribe tu nombre y deja un mensaje" : "Disponible durante la transmisión"}
          </p>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">{chatPanel}</div>
      </div>
    </>
  );
}
