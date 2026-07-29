import { weddingConfig, getYouTubeLiveUrl } from "@/lib/config";
import { StreamPlayer } from "@/components/StreamPlayer";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata() {
  const { dict } = await getDictionary();
  return {
    title: `${weddingConfig.coupleNames} — TV`,
    description: dict.tv.liveStream,
  };
}

export default async function TvPage() {
  const { dict } = await getDictionary();
  const youtubeLive = getYouTubeLiveUrl();
  const isLive = Boolean(weddingConfig.youtubeVideoId);

  return (
    <main className="flex min-h-screen flex-col bg-[#1a1410]">
      <header className="shrink-0 px-4 py-4 text-center sm:py-6">
        <p className="mb-2 text-sm tracking-[0.3em] text-gold-light/80 uppercase sm:text-base">
          {dict.tv.liveStream}
        </p>
        <h1
          className="font-display text-2xl font-semibold text-cream sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>
        <p className="mt-2 text-base text-cream/60 sm:text-lg">
          {weddingConfig.weddingDate} · {weddingConfig.location}
        </p>
        {isLive && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-900/40 px-4 py-1.5">
            <span className="h-2.5 w-2.5 animate-pulse-live rounded-full bg-red-500" />
            <span className="text-sm font-medium tracking-wider text-red-300 uppercase">
              {dict.tv.live}
            </span>
          </div>
        )}
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-6">
        <div className="max-h-[75vh] w-full max-w-[1600px] flex-1 overflow-hidden rounded-lg shadow-2xl ring-1 ring-gold/30">
          <StreamPlayer fullscreen />
        </div>
      </div>

      <footer className="shrink-0 space-y-3 px-4 py-4 text-center sm:py-6">
        {youtubeLive && (
          <p className="mx-auto max-w-xl text-sm text-cream/70 sm:text-base">
            {dict.tv.fallback}
          </p>
        )}
        {youtubeLive && (
          <p className="break-all px-4 font-mono text-lg text-gold sm:text-2xl">
            youtube.com/live/{weddingConfig.youtubeVideoId}
          </p>
        )}
        <p className="text-xs text-cream/40 sm:text-sm">
          <Link href="/vivo" className="text-gold-light hover:underline">
            {dict.tv.fullVersion}
          </Link>
        </p>
      </footer>
    </main>
  );
}
