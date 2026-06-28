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
}

export function VideoFrame({
  coupleNames,
  weddingDate,
  location,
  children,
  isLive = true,
}: VideoFrameProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Marco exterior */}
      <div className="relative p-3 sm:p-5 rounded-2xl bg-gradient-to-br from-gold-light via-gold to-[#b8944a] shadow-2xl shadow-gold/20">
        <div className="relative p-4 sm:p-6 rounded-xl bg-cream border border-gold/30">
          {/* Ornamentos en esquinas */}
          <CornerOrnament className="absolute top-2 left-2 w-8 h-8 text-gold rotate-0" />
          <CornerOrnament className="absolute top-2 right-2 w-8 h-8 text-gold -scale-x-100" />
          <CornerOrnament className="absolute bottom-2 left-2 w-8 h-8 text-gold -scale-y-100" />
          <CornerOrnament className="absolute bottom-2 right-2 w-8 h-8 text-gold -scale-x-100 -scale-y-100" />

          {/* Encabezado */}
          <div className="text-center mb-4 sm:mb-6 px-4">
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-sage mb-1">
              Transmisión en vivo
            </p>
            <h1
              className="text-2xl sm:text-4xl font-display font-semibold text-foreground tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {coupleNames}
            </h1>
            <p className="text-sm sm:text-base text-foreground/70 mt-1">
              {weddingDate} · {location}
            </p>
            {isLive && (
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-rose/20 border border-rose/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
                <span className="text-xs font-medium uppercase tracking-wider text-red-700">
                  En vivo
                </span>
              </div>
            )}
          </div>

          {/* Área del video */}
          <div className="relative rounded-lg overflow-hidden shadow-inner ring-1 ring-gold/20">
            {children}
          </div>

          {/* Pie del marco */}
          <p className="text-center text-xs text-foreground/50 mt-4 tracking-widest">
            Con amor desde Bélgica · Para nuestra familia en Chile
          </p>
        </div>
      </div>
    </div>
  );
}
