"use client";

import { weddingConfig } from "@/lib/config";

interface StreamPlayerProps {
  className?: string;
  fullscreen?: boolean;
}

export function StreamPlayer({ className, fullscreen = false }: StreamPlayerProps) {
  const { youtubeVideoId, offlineMessage } = weddingConfig;

  const liveContainerClass = fullscreen
    ? `relative w-full h-full min-h-[40vh] bg-black ${className ?? ""}`
    : `relative w-full aspect-video bg-black ${className ?? ""}`;

  if (youtubeVideoId) {
    return (
      <div className={liveContainerClass}>
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

  const offlineContainerClass = fullscreen
    ? `relative w-full h-full min-h-[40vh] ${className ?? ""}`
    : `relative w-full aspect-video ${className ?? ""}`;

  return (
    <div
      className={`${offlineContainerClass} flex items-center justify-center bg-gradient-to-br from-[#3d3228] via-[#2a2219] to-[#1a1510]`}
    >
      <div className="text-center px-5 sm:px-8 max-w-md">
        <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full border-2 border-gold-light/70 bg-gold/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 sm:w-9 sm:h-9 text-gold-light"
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
        <p className="text-base sm:text-xl font-medium text-cream leading-relaxed">
          {offlineMessage}
        </p>
        <p className="text-sm sm:text-base text-cream/75 mt-3 leading-relaxed">
          Actualiza esta página cuando comience la transmisión
        </p>
      </div>
    </div>
  );
}
