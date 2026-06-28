"use client";

import { weddingConfig } from "@/lib/config";

interface StreamPlayerProps {
  className?: string;
}

export function StreamPlayer({ className }: StreamPlayerProps) {
  const { youtubeVideoId, offlineMessage } = weddingConfig;

  if (youtubeVideoId) {
    return (
      <div className={`relative w-full aspect-video bg-black ${className ?? ""}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&cc_load_policy=1&cc_lang_pref=es&hl=es&rel=0&modestbranding=1`}
          title="Transmisión en vivo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center ${className ?? ""}`}
    >
      <div className="text-center px-6 max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold/40 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-foreground/80">{offlineMessage}</p>
        <p className="text-sm text-foreground/50 mt-2">
          Actualiza esta página cuando comience la transmisión
        </p>
      </div>
    </div>
  );
}
