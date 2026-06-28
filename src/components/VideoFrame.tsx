function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 4C4 4 8 20 20 20C20 8 4 4 4 4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M4 4C4 4 12 12 20 8"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

interface VideoFrameProps {
  coupleNames: string;
  weddingDate: string;
  location: string;
  children: React.ReactNode;
  isLive?: boolean;
  compact?: boolean;
}

export function VideoFrame({
  coupleNames,
  weddingDate,
  location,
  children,
  isLive = true,
  compact = false,
}: VideoFrameProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className={`relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-light via-gold to-[#b8944a] shadow-xl sm:shadow-2xl shadow-gold/20 ${
          compact ? "p-1.5 sm:p-3" : "p-2 sm:p-5"
        }`}
      >
        <div
          className={`relative rounded-lg sm:rounded-xl bg-cream border border-gold/30 ${
            compact ? "p-3 sm:p-4" : "p-3 sm:p-6"
          }`}
        >
          {!compact && (
            <>
              <CornerOrnament className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 text-gold rotate-0" />
              <CornerOrnament className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 text-gold -scale-x-100" />
              <CornerOrnament className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 text-gold -scale-y-100" />
              <CornerOrnament className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 text-gold -scale-x-100 -scale-y-100" />
            </>
          )}

          <div className={`text-center ${compact ? "mb-2 sm:mb-3" : "mb-3 sm:mb-6"} px-1 sm:px-4`}>
            {!compact && (
              <p className="text-sm sm:text-base font-semibold tracking-wide uppercase text-foreground/75 mb-2">
                Transmisión en vivo
              </p>
            )}
            <h1
              className={`font-display font-semibold text-foreground tracking-wide leading-tight ${
                compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {coupleNames}
            </h1>
            <p className="text-sm sm:text-base text-foreground/80 mt-1.5">
              {weddingDate} · {location}
            </p>
            {isLive && (
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-rose/20 border border-rose/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-live" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-red-800">
                  En vivo
                </span>
              </div>
            )}
          </div>

          <div className="relative rounded-md sm:rounded-lg overflow-hidden shadow-inner ring-1 ring-gold/20">
            {children}
          </div>

          {!compact && (
            <p className="text-center text-sm text-foreground/70 mt-4 tracking-wide px-2">
              Con amor desde Bélgica · Para nuestra familia en Chile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
