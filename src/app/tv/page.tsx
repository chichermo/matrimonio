import { weddingConfig, getYouTubeLiveUrl } from "@/lib/config";
import { StreamPlayer } from "@/components/StreamPlayer";
import Link from "next/link";

export const metadata = {
  title: `${weddingConfig.coupleNames} — TV`,
  description: "Versión optimizada para Smart TV",
};

export default function TvPage() {
  const youtubeLive = getYouTubeLiveUrl();
  const isLive = Boolean(weddingConfig.youtubeVideoId);

  return (
    <main className="min-h-screen bg-[#1a1410] flex flex-col">
      <header className="shrink-0 px-4 py-4 sm:py-6 text-center">
        <p className="text-sm sm:text-base text-gold-light/80 tracking-[0.3em] uppercase mb-2">
          Transmisión en vivo
        </p>
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-cream"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>
        <p className="text-base sm:text-lg text-cream/60 mt-2">
          {weddingConfig.weddingDate} · {weddingConfig.location}
        </p>
        {isLive && (
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-red-900/40 border border-red-500/40">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-live" />
            <span className="text-sm font-medium uppercase tracking-wider text-red-300">
              En vivo
            </span>
          </div>
        )}
      </header>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-6 pb-4 min-h-0">
        <div className="w-full max-w-[1600px] flex-1 max-h-[75vh] rounded-lg overflow-hidden shadow-2xl ring-1 ring-gold/30">
          <StreamPlayer fullscreen />
        </div>
      </div>

      <footer className="shrink-0 px-4 py-4 sm:py-6 text-center space-y-3">
        {youtubeLive && (
          <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto">
            Si el video no carga, abre la app <strong className="text-cream">YouTube</strong> en tu
            TV y visita:
          </p>
        )}
        {youtubeLive && (
          <p className="text-gold text-lg sm:text-2xl font-mono break-all px-4">
            youtube.com/live/{weddingConfig.youtubeVideoId}
          </p>
        )}
        <p className="text-cream/40 text-xs sm:text-sm">
          <Link href="/vivo" className="text-gold-light hover:underline">
            Versión completa con chat
          </Link>
        </p>
      </footer>
    </main>
  );
}
