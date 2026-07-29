"use client";

import { useState } from "react";
import { LiveChat } from "@/components/LiveChat";
import { useI18n } from "@/components/I18nProvider";

interface StreamChatPanelProps {
  chatEnabled: boolean;
}

export function StreamChatPanel({ chatEnabled }: StreamChatPanelProps) {
  const { dict } = useI18n();
  const [showChat, setShowChat] = useState(true);

  const chatPanel = (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <LiveChat enabled={chatEnabled} />
    </div>
  );

  return (
    <>
      <div className="w-full lg:hidden">
        <button
          type="button"
          onClick={() => setShowChat((v) => !v)}
          className="touch-target flex w-full items-center justify-between rounded-xl border border-gold/25 bg-cream px-4 py-3.5 text-left shadow-sm"
          aria-expanded={showChat}
        >
          <div>
            <span
              className="font-display text-lg font-semibold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {dict.chat.titleCouple}
            </span>
            <p className="mt-0.5 text-sm text-foreground/75">
              {chatEnabled ? dict.chat.wishes : dict.chat.availableDuring}
            </p>
          </div>
          <span className="text-xl font-light text-gold" aria-hidden>
            {showChat ? "−" : "+"}
          </span>
        </button>
        {showChat && (
          <div className="mt-3 h-[50vw] max-h-[360px] min-h-[240px] overflow-hidden rounded-xl border border-gold/25 bg-cream shadow-sm">
            {chatPanel}
          </div>
        )}
      </div>

      <div className="hidden h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gold/25 bg-cream shadow-sm lg:flex">
        <div className="shrink-0 border-b border-gold/20 bg-gold-light/30 px-4 py-2.5">
          <h2
            className="font-display text-lg leading-tight font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {dict.chat.titleShort}
          </h2>
          <p className="text-xs text-foreground/75">
            {chatEnabled ? dict.chat.writeName : dict.chat.availableDuring}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{chatPanel}</div>
      </div>
    </>
  );
}
