import { weddingConfig } from "@/lib/config";
import { VideoFrame } from "@/components/VideoFrame";
import { StreamPlayer } from "@/components/StreamPlayer";
import { StreamChatPanel } from "@/components/StreamChatPanel";
import { CaptionsHint } from "@/components/CaptionsHint";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { WatchOnTv } from "@/components/WatchOnTv";
import Link from "next/link";

export default function VivoPage() {
  const isLive = Boolean(weddingConfig.youtubeVideoId);

  return (
    <main className="flex-1 px-3 sm:px-4 py-4 sm:py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/15 via-background to-rose/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        {!isLive && (
          <div className="mb-4 sm:mb-6 max-w-2xl mx-auto">
            <WeddingCountdown />
          </div>
        )}

        {/* Video + chat a la misma altura */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-stretch">
          <div className="lg:col-span-2 min-w-0 flex">
            <div className="w-full">
              <VideoFrame
                coupleNames={weddingConfig.coupleNames}
                weddingDate={weddingConfig.weddingDate}
                location={weddingConfig.location}
                isLive={isLive}
              >
                <StreamPlayer />
              </VideoFrame>
            </div>
          </div>

          <div className="lg:col-span-1 min-w-0 flex flex-col">
            <StreamChatPanel
              youtubeVideoId={weddingConfig.youtubeVideoId}
              isLive={isLive}
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <CaptionsHint />
          <WatchOnTv />
        </div>

        <nav className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-foreground/40 mt-6 sm:mt-8">
          <Link href="/" className="touch-target py-2 hover:text-gold transition-colors">
            ← Inicio
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/tv" className="touch-target py-2 hover:text-gold transition-colors">
            Versión TV
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/guia" className="touch-target py-2 hover:text-gold transition-colors">
            Guía
          </Link>
        </nav>
      </div>
    </main>
  );
}
