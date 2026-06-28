import { CaptionsHint } from "@/components/CaptionsHint";
import { VivoStreamSection } from "@/components/VivoStreamSection";
import { WatchOnTv } from "@/components/WatchOnTv";
import Link from "next/link";

export default function VivoPage() {
  return (
    <main className="flex-1 px-3 sm:px-4 py-4 sm:py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/15 via-background to-rose/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        <VivoStreamSection />

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
