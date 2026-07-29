import Link from "next/link";
import { weddingConfig } from "@/lib/config";
import { WeddingCountdown } from "@/components/WeddingCountdown";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/20 via-background to-rose/10 pointer-events-none" />

      <div className="relative max-w-xl w-full">
        <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-sage mb-3 sm:mb-4">
          {weddingConfig.weddingDate}
        </p>

        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-3 sm:mb-4 leading-tight px-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>

        <p className="text-base sm:text-lg text-foreground/70 mb-1 sm:mb-2">
          Nos casamos en {weddingConfig.location}
        </p>
        <p className="text-sm sm:text-base text-foreground/60 mb-6 sm:mb-8 px-2">
          Transmisión en vivo para nuestra familia en Chile
        </p>

        <div className="mb-8 sm:mb-10">
          <WeddingCountdown />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-2">
          <Link
            href="/vivo"
            className="touch-target inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-white text-base sm:text-lg font-medium shadow-lg shadow-gold/30 hover:bg-[#b8944a] transition-all active:scale-[0.98]"
          >
            <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse-live shrink-0" />
            Ver transmisión
          </Link>
          <Link
            href="/fotos"
            className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-gold/50 text-gold text-sm sm:text-base font-medium hover:bg-gold/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Ver álbum de fotos
          </Link>
          <Link
            href="/tv"
            className="touch-target inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-gold/50 text-gold text-sm sm:text-base font-medium hover:bg-gold/10 transition-colors"
          >
            Ver en Smart TV
          </Link>
        </div>

        <p className="mt-6 text-sm text-foreground/50">
          <Link href="/guia" className="text-gold hover:underline py-2 inline-block">
            Guía para transmitir con YouTube
          </Link>
        </p>
      </div>
    </main>
  );
}
