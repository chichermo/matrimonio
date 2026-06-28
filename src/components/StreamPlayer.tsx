"use client";

import { weddingConfig } from "@/lib/config";

interface StreamPlayerProps {
  className?: string;
  /** Pantalla completa para Smart TV */
  fullscreen?: boolean;
}

export function StreamPlayer({ className, fullscreen = false }: StreamPlayerProps) {
  const { youtubeVideoId, offlineMessage } = weddingConfig;

  const containerClass = fullscreen
    ? `relative w-full h-full min-h-[40vh] bg-black ${className ?? ""}`
    : `relative w-full aspect-video bg-black ${className ?? ""}`;

  if (youtubeVideoId) {
    return (
      <div className={containerClass}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&cc_load_policy=1&cc_lang_pref=es&hl=es&rel=0&modestbranding=1&playsinline=1`}
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
      className={`${containerClass} bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center`}
    >
      <div className="text-center px-4 sm:px-6 max-w-md">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full border-2 border-gold/40 flex items-center justify-center">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-gold"
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
        <p className="text-base sm:text-lg font-medium text-foreground/80">{offlineMessage}</p>
        <p className="text-xs sm:text-sm text-foreground/50 mt-2">
          Actualiza esta página cuando comience la transmisión
        </p>
      </div>
    </div>
  );
}
