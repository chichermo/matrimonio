import { CaptionsHint } from "@/components/CaptionsHint";
import { VivoStreamSection } from "@/components/VivoStreamSection";
import { WatchOnTv } from "@/components/WatchOnTv";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function VivoPage() {
  const { dict } = await getDictionary();

  return (
    <main className="flex-1 px-3 py-4 sm:px-4 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold-light/15 via-background to-rose/5" />

      <div className="relative mx-auto w-full max-w-6xl">
        <VivoStreamSection />

        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          <CaptionsHint />
          <WatchOnTv />
        </div>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-foreground/40 sm:mt-8">
          <Link href="/" className="touch-target py-2 transition-colors hover:text-gold">
            {dict.vivo.backHome}
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/tv" className="touch-target py-2 transition-colors hover:text-gold">
            {dict.vivo.tvVersion}
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/guia" className="touch-target py-2 transition-colors hover:text-gold">
            {dict.vivo.guide}
          </Link>
        </nav>
      </div>
    </main>
  );
}
