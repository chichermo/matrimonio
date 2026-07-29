import Link from "next/link";
import { weddingConfig } from "@/lib/config";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function HomePage() {
  const { dict } = await getDictionary();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold-light/20 via-background to-rose/10" />

      <div className="relative w-full max-w-xl">
        <p className="mb-3 text-xs tracking-[0.3em] text-sage uppercase sm:mb-4 sm:text-sm sm:tracking-[0.4em]">
          {weddingConfig.weddingDate}
        </p>

        <h1
          className="mb-3 px-2 text-3xl leading-tight font-semibold text-foreground sm:mb-4 sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>

        <p className="mb-1 text-base text-foreground/70 sm:mb-2 sm:text-lg">
          {dict.home.marriedIn} {weddingConfig.location}
        </p>
        <p className="mb-6 px-2 text-sm text-foreground/60 sm:mb-8 sm:text-base">
          {dict.home.forFamily}
        </p>

        <div className="mb-8 sm:mb-10">
          <WeddingCountdown />
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 px-2 sm:flex-row sm:items-center">
          <Link
            href="/vivo"
            className="touch-target inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-gold/30 transition-all hover:bg-[#b8944a] active:scale-[0.98] sm:px-8 sm:py-4 sm:text-lg"
          >
            <span className="h-3 w-3 shrink-0 animate-pulse-live rounded-full bg-red-400" />
            {dict.home.watchLive}
          </Link>
          <Link
            href="/fotos"
            className="touch-target inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 sm:text-base"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {dict.home.viewAlbum}
          </Link>
          <Link
            href="/tv"
            className="touch-target inline-flex items-center justify-center rounded-full border border-gold/50 px-6 py-3.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 sm:text-base"
          >
            {dict.home.watchOnTv}
          </Link>
        </div>

        <p className="mt-6 text-sm text-foreground/50">
          <Link href="/guia" className="inline-block py-2 text-gold hover:underline">
            {dict.home.guideLink}
          </Link>
        </p>
      </div>
    </main>
  );
}
