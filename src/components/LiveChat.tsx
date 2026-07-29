"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { useI18n } from "@/components/I18nProvider";
import { localeToBcp47 } from "@/lib/i18n/config";

function formatTime(iso: string, locale: string) {
  return new Date(iso).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface LiveChatProps {
  enabled: boolean;
}

export function LiveChat({ enabled }: LiveChatProps) {
  const { dict, locale } = useI18n();
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
      setError(dict.chat.needBoth);
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
        throw new Error(data.error ?? dict.chat.sendError);
      }

      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.chat.sendFailed);
    } finally {
      setSending(false);
    }
  }

  if (!enabled) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-foreground/65 sm:text-base">
        {dict.chat.closed}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
        {messages.length === 0 && (
          <p className="py-6 text-center text-sm text-foreground/45 italic">
            {dict.chat.firstMessage}
          </p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in-up">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold text-gold">{msg.author}</span>
              <span className="text-xs text-foreground/40">
                {formatTime(msg.created_at, localeToBcp47(locale))}
              </span>
            </div>
            <p className="mt-0.5 text-sm break-words text-foreground/85">
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 space-y-2 border-t border-gold/20 bg-cream/50 p-3"
      >
        {error && <p className="text-xs text-red-600">{error}</p>}
        <input
          type="text"
          placeholder={dict.chat.namePlaceholder}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={50}
          className="w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-gold/40 focus:outline-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={dict.chat.messagePlaceholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            className="flex-1 rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-gold/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="touch-target shrink-0 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-[#b8944a] disabled:opacity-50"
          >
            {dict.chat.send}
          </button>
        </div>
      </form>
    </div>
  );
}
