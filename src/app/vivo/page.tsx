import { weddingConfig } from "@/lib/config";
import { VideoFrame } from "@/components/VideoFrame";
import { StreamPlayer } from "@/components/StreamPlayer";
import { YouTubeLiveChat } from "@/components/YouTubeLiveChat";
import { CaptionsHint } from "@/components/CaptionsHint";
import Link from "next/link";

export default function VivoPage() {
  const isLive = Boolean(weddingConfig.youtubeVideoId);

  return (
    <main className="flex-1 px-4 py-6 sm:py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/15 via-background to-rose/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VideoFrame
              coupleNames={weddingConfig.coupleNames}
              weddingDate={weddingConfig.weddingDate}
              location={weddingConfig.location}
              isLive={isLive}
            >
              <StreamPlayer />
            </VideoFrame>

            <CaptionsHint />
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col h-full min-h-[320px] sm:min-h-[400px] rounded-xl bg-cream border border-gold/25 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gold/20 bg-gold-light/30">
                <h2
                  className="text-lg font-display font-semibold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Mensajes en vivo
                </h2>
                <p className="text-xs text-foreground/60">
                  Chat de YouTube — deja tus buenos deseos
                </p>
              </div>
              <div className="flex-1 bg-white">
                {isLive ? (
                  <YouTubeLiveChat videoId={weddingConfig.youtubeVideoId} />
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[320px] px-6 text-center text-sm text-foreground/40 italic">
                    El chat estará disponible cuando comience la transmisión
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-foreground/40 mt-8">
          <Link href="/" className="hover:text-gold transition-colors">
            ← Volver al inicio
          </Link>
          {" · "}
          <Link href="/guia" className="hover:text-gold transition-colors">
            Guía para transmitir
          </Link>
        </p>
      </div>
    </main>
  );
}
