"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface LiveChatProps {
  enabled: boolean;
}

export function LiveChat({ enabled }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("wedding-chat-author");
    if (saved) setAuthor(saved);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setMessages([]);
      return;
    }

    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.open) setMessages(data.messages ?? []);
        else setMessages([]);
      } catch {
        // reintenta en el próximo poll
      }
    }

    fetchMessages();
    const id = setInterval(fetchMessages, 3000);
    return () => clearInterval(id);
  }, [enabled]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor || !trimmedContent) {
      setError("Escribe tu nombre y un mensaje");
      return;
    }

    localStorage.setItem("wedding-chat-author", trimmedAuthor);
    setSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: trimmedAuthor, content: trimmedContent }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error al enviar");
      }

      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  if (!enabled) {
    return (
      <div className="flex items-center justify-center h-full px-4 text-center text-sm sm:text-base text-foreground/65">
        El chat estará disponible cuando comience la transmisión
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-0">
        {messages.length === 0 && (
          <p className="text-sm text-foreground/45 text-center py-6 italic">
            Sé el primero en enviar un mensaje de cariño 💕
          </p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in-up">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-semibold text-sm text-gold">{msg.author}</span>
              <span className="text-xs text-foreground/40">{formatTime(msg.created_at)}</span>
            </div>
            <p className="text-sm text-foreground/85 mt-0.5 break-words">{msg.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 p-3 border-t border-gold/20 bg-cream/50 space-y-2"
      >
        {error && <p className="text-xs text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={50}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tu mensaje..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
          <button
            type="submit"
            disabled={sending}
            className="touch-target px-4 py-2 text-sm font-medium rounded-lg bg-gold text-white hover:bg-[#b8944a] disabled:opacity-50 shrink-0"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
