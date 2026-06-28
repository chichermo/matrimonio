import Link from "next/link";
import { weddingConfig } from "@/lib/config";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/20 via-background to-rose/10 pointer-events-none" />

      <div className="relative max-w-lg">
        <p className="text-sm tracking-[0.4em] uppercase text-sage mb-4">
          {weddingConfig.weddingDate}
        </p>

        <h1
          className="text-4xl sm:text-6xl font-display font-semibold text-foreground mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>

        <p className="text-lg text-foreground/70 mb-2">
          Nos casamos en {weddingConfig.location}
        </p>
        <p className="text-base text-foreground/60 mb-10">
          Transmisión en vivo para nuestra familia en Chile
        </p>

        <Link
          href="/vivo"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-white text-lg font-medium shadow-lg shadow-gold/30 hover:bg-[#b8944a] transition-all hover:scale-105"
        >
          <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse-live" />
          Ver transmisión en vivo
        </Link>

        <p className="mt-6 text-sm text-foreground/50">
          <Link href="/guia" className="text-gold hover:underline">
            Ver guía para transmitir con YouTube
          </Link>
        </p>
      </div>
    </main>
  );
}
