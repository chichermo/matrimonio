"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/lib/config";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          host?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  loadModule: (name: string) => void;
  setOption: (module: string, option: string, value: unknown) => void;
  getOption: (module: string, option: string) => unknown;
  playVideo: () => void;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlayerState: () => number;
}

interface StreamPlayerProps {
  className?: string;
  fullscreen?: boolean;
}

function enableSpanishCaptions(player: YTPlayer) {
  try {
    player.loadModule("captions");
    player.setOption("captions", "track", { languageCode: "es" });
  } catch {
    try {
      player.setOption("captions", "track", {});
    } catch {
      // YouTube aún no tiene pista de subtítulos (común al inicio del live)
    }
  }
}

/** Salta al punto en vivo (no al inicio del buffer/grabación) */
function seekToLiveEdge(player: YTPlayer) {
  try {
    const duration = player.getDuration();
    if (duration > 0) {
      player.seekTo(duration, true);
      return;
    }
  } catch {
    // getDuration no disponible aún
  }
  try {
    player.seekTo(999999, true);
  } catch {
    // El live aún no expone posición
  }
}

function scheduleLiveEdge(player: YTPlayer) {
  seekToLiveEdge(player);
  [1000, 3000, 8000].forEach((ms) => {
    setTimeout(() => seekToLiveEdge(player), ms);
  });
}

function YouTubePlayer({ videoId }: { videoId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    if (window.YT?.Player) {
      setApiReady(true);
      return;
    }

    const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      setApiReady(true);
    };

    return () => {
      window.onYouTubeIframeAPIReady = previous;
    };
  }, []);

  useEffect(() => {
    if (!apiReady || !containerRef.current || playerRef.current) return;

    const elementId = `yt-player-${videoId}`;
    containerRef.current.id = elementId;

    playerRef.current = new window.YT!.Player(elementId, {
      videoId,
      host: "https://www.youtube.com",
      playerVars: {
        autoplay: 1,
        mute: 0,
        cc_load_policy: 1,
        cc_lang_pref: "es",
        hl: "es",
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: typeof window !== "undefined" ? window.location.origin : "",
      },
      events: {
        onReady: (event) => {
          scheduleLiveEdge(event.target);
          enableSpanishCaptions(event.target);
          setTimeout(() => enableSpanishCaptions(event.target), 3000);
          setTimeout(() => enableSpanishCaptions(event.target), 10000);
        },
        onStateChange: (event) => {
          const { PLAYING, BUFFERING } = window.YT!.PlayerState;
          if (event.data === PLAYING || event.data === BUFFERING) {
            seekToLiveEdge(event.target);
          }
          if (event.data === PLAYING) {
            enableSpanishCaptions(event.target);
          }
        },
      },
    });
  }, [apiReady, videoId]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}

function PresentationPoster({ message, submessage }: { message: string; submessage?: string }) {
  const thumb = weddingConfig.thumbnailUrl;

  return (
    <div className="absolute inset-0">
      <Image
        src={thumb}
        alt={`${weddingConfig.coupleNames} — portada`}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 900px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12 px-5 text-center">
        <p
          className="text-2xl sm:text-3xl font-display font-semibold text-cream mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </p>
        <p className="text-base sm:text-lg font-medium text-cream/95 max-w-md leading-relaxed">
          {message}
        </p>
        {submessage && (
          <p className="text-sm sm:text-base text-cream/75 mt-2 max-w-sm">{submessage}</p>
        )}
      </div>
    </div>
  );
}

export function StreamPlayer({ className, fullscreen = false }: StreamPlayerProps) {
  const { youtubeVideoId, offlineMessage } = weddingConfig;

  const containerClass = fullscreen
    ? `relative w-full h-full min-h-[40vh] bg-black overflow-hidden ${className ?? ""}`
    : `relative w-full aspect-video bg-black overflow-hidden ${className ?? ""}`;

  if (youtubeVideoId) {
    return (
      <div className={containerClass}>
        <YouTubePlayer videoId={youtubeVideoId} />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <PresentationPoster
        message={offlineMessage}
        submessage="Actualiza esta página cuando comience la transmisión"
      />
    </div>
  );
}
