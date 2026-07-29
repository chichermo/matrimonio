"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useEffectEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MEDIA,
  PHOTO_COUNT,
  VIDEO_COUNT,
  mediaThumb,
  type MediaItem,
} from "@/lib/album-media";

type ViewMode = "grid" | "carousel" | "story";

const SLIDE_MS = 4500;

export default function FotosPage() {
  const [mode, setMode] = useState<ViewMode>("grid");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(true);
  const [storyProgress, setStoryProgress] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) =>
      i === null ? null : (i + delta + MEDIA.length) % MEDIA.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goLightbox(1);
      if (e.key === "ArrowLeft") goLightbox(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goLightbox]);

  useEffect(() => {
    if (mode !== "story") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  const switchMode = (next: ViewMode) => {
    setMode(next);
    if (next === "carousel") setCarouselIndex(0);
    if (next === "story") {
      setStoryIndex(0);
      setStoryPlaying(true);
      setStoryProgress(0);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6d3]">
      {mode !== "story" && (
        <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center justify-between gap-4 sm:justify-start">
              <div>
                <p className="text-[11px] tracking-[0.3em] text-[#c9a962] uppercase">
                  10 · VII · MMXXVI
                </p>
                <h1
                  className="text-2xl font-light tracking-wide sm:text-3xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Álbum
                </h1>
              </div>
              <Link
                href="/"
                className="text-xs tracking-widest text-[#c9a962]/80 uppercase transition-colors hover:text-[#f0e6d3] sm:hidden"
              >
                Inicio
              </Link>
            </div>

            <ViewModeSwitcher mode={mode} onChange={switchMode} />

            <div className="hidden items-center gap-4 sm:flex">
              <p className="text-sm text-[#a89070]">
                {PHOTO_COUNT} fotos · {VIDEO_COUNT} videos
              </p>
              <Link
                href="/"
                className="text-xs tracking-widest text-[#c9a962] uppercase transition-colors hover:text-[#f0e6d3]"
              >
                ← Inicio
              </Link>
            </div>
          </div>
        </header>
      )}

      {mode === "grid" && (
        <GridView onOpen={openLightbox} />
      )}

      {mode === "carousel" && (
        <CarouselView
          index={carouselIndex}
          setIndex={setCarouselIndex}
          onOpenFullscreen={openLightbox}
        />
      )}

      {mode === "story" && (
        <StoryView
          index={storyIndex}
          setIndex={setStoryIndex}
          playing={storyPlaying}
          setPlaying={setStoryPlaying}
          progress={storyProgress}
          setProgress={setStoryProgress}
          onExit={() => switchMode("grid")}
          onOpenModes={() => switchMode("carousel")}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={() => goLightbox(-1)}
          onNext={() => goLightbox(1)}
        />
      )}
    </main>
  );
}

function ViewModeSwitcher({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  const options: { id: ViewMode; label: string; icon: ReactNode }[] = [
    {
      id: "grid",
      label: "Galería",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
      ),
    },
    {
      id: "carousel",
      label: "Carrusel",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 6V4M18 6V4M6 20v-2M18 20v-2" />
        </svg>
      ),
    },
    {
      id: "story",
      label: "Presentación",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex w-full rounded-full border border-white/10 bg-white/5 p-1 sm:w-auto"
      role="tablist"
      aria-label="Modo de visualización"
    >
      {options.map((opt) => {
        const active = mode === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-xs tracking-wide transition-all duration-300 sm:flex-none sm:px-4 ${
              active
                ? "bg-[#c9a962] text-[#0a0a0a] shadow-lg shadow-[#c9a962]/20"
                : "text-[#a89070] hover:text-[#f0e6d3]"
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function GridView({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-24 pt-6 sm:px-4">
      <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
        {MEDIA.map((item, index) => (
          <GridItem key={item.src} item={item} index={index} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function GridItem({
  item,
  index,
  onOpen,
}: {
  item: MediaItem;
  index: number;
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "80px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`album-reveal mb-2 break-inside-avoid sm:mb-3 ${
        visible ? "is-visible" : ""
      }`}
      style={{ transitionDelay: `${(index % 8) * 40}ms` }}
    >
      <button
        type="button"
        className="group relative w-full overflow-hidden text-left"
        onClick={() => onOpen(index)}
      >
        <Image
          src={`/fotos/${mediaThumb(item)}`}
          alt={item.type === "video" ? `Video ${index + 1}` : `Foto ${index + 1}`}
          width={600}
          height={800}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {item.type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

function CarouselView({
  index,
  setIndex,
  onOpenFullscreen,
}: {
  index: number;
  setIndex: (i: number | ((n: number) => number)) => void;
  onOpenFullscreen: (i: number) => void;
}) {
  const touchX = useRef<number | null>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const item = MEDIA[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + MEDIA.length) % MEDIA.length);
    },
    [setIndex]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Enter") onOpenFullscreen(index);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go, index, onOpenFullscreen]);

  useEffect(() => {
    const el = filmRef.current?.querySelector(`[data-thumb="${index}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <section className="flex min-h-[calc(100vh-5.5rem)] flex-col">
      <div
        className="relative flex flex-1 items-center justify-center px-4 py-6 sm:px-12"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => go(-1)}
          className="absolute left-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-3xl text-white/80 backdrop-blur transition hover:bg-black/60 hover:text-white sm:flex"
        >
          ‹
        </button>

        <div
          key={item.src}
          className="album-slide relative mx-auto flex h-[min(68vh,720px)] w-full max-w-5xl items-center justify-center"
        >
          {item.type === "video" ? (
            <video
              src={`/fotos/${item.src}`}
              poster={`/fotos/${item.poster}`}
              controls
              playsInline
              className="max-h-full max-w-full rounded-sm object-contain shadow-2xl shadow-black/50"
            />
          ) : (
            <button
              type="button"
              className="relative h-full w-full"
              onClick={() => onOpenFullscreen(index)}
            >
              <Image
                src={`/fotos/${item.src}`}
                alt={`Foto ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => go(1)}
          className="absolute right-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-3xl text-white/80 backdrop-blur transition hover:bg-black/60 hover:text-white sm:flex"
        >
          ›
        </button>
      </div>

      <div className="border-t border-white/5 bg-black/40 px-4 py-4 backdrop-blur">
        <div className="mx-auto mb-3 flex max-w-5xl items-center justify-between text-sm text-[#a89070]">
          <span>
            {index + 1} / {MEDIA.length}
            {item.type === "video" ? " · Video" : ""}
          </span>
          <span className="text-xs tracking-wide uppercase opacity-70">
            Desliza o usa ← →
          </span>
        </div>
        <div
          ref={filmRef}
          className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1 scrollbar-thin"
        >
          {MEDIA.map((m, i) => (
            <button
              key={m.src}
              type="button"
              data-thumb={i}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-sm transition-all duration-300 sm:h-20 sm:w-14 ${
                i === index
                  ? "ring-2 ring-[#c9a962] scale-105 opacity-100"
                  : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image
                src={`/fotos/${mediaThumb(m)}`}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
              {m.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryView({
  index,
  setIndex,
  playing,
  setPlaying,
  progress,
  setProgress,
  onExit,
}: {
  index: number;
  setIndex: (i: number | ((n: number) => number)) => void;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  progress: number;
  setProgress: (v: number | ((n: number) => number)) => void;
  onExit: () => void;
  onOpenModes: () => void;
}) {
  const item = MEDIA[index];
  const isVideo = item.type === "video";
  const touchX = useRef<number | null>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const advance = useEffectEvent(() => {
    setIndex((i) => (i + 1) % MEDIA.length);
    setProgress(0);
  });

  const goPrev = useEffectEvent(() => {
    setIndex((i) => (i - 1 + MEDIA.length) % MEDIA.length);
    setProgress(0);
  });

  useEffect(() => {
    if (!playing || isVideo) return;
    let raf = 0;
    const start = performance.now() - progressRef.current * SLIDE_MS;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / SLIDE_MS);
      setProgress(p);
      if (p >= 1) {
        advance();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index, isVideo, setProgress, advance]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying(!playing);
      }
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % MEDIA.length);
        setProgress(0);
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + MEDIA.length) % MEDIA.length);
        setProgress(0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit, playing, setPlaying, setIndex, setProgress]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 60) {
          if (dx < 0) advance();
          else goPrev();
        }
        touchX.current = null;
      }}
    >
      <div className="absolute top-0 right-0 left-0 z-20 space-y-1.5 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white/35"
            style={{
              width: `${((index + 1) / MEDIA.length) * 100}%`,
            }}
          />
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#c9a962] transition-[width] duration-100 ease-linear"
            style={{ width: `${(isVideo ? 0 : progress) * 100}%` }}
          />
        </div>
      </div>

      <div className="absolute top-6 right-0 left-0 z-20 flex items-center justify-between px-4 pt-4 sm:px-8">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-widest text-white/80 uppercase backdrop-blur transition hover:bg-black/60"
        >
          Salir
        </button>
        <p className="text-sm text-white/60">
          {index + 1} / {MEDIA.length}
        </p>
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-widest text-white/80 uppercase backdrop-blur transition hover:bg-black/60"
        >
          {playing ? "Pausa" : "Play"}
        </button>
      </div>

      {/* Tap zones */}
      <button
        type="button"
        aria-label="Anterior"
        className="absolute top-20 bottom-24 left-0 z-10 w-1/3"
        onClick={goPrev}
      />
      <button
        type="button"
        aria-label="Siguiente"
        className="absolute top-20 bottom-24 right-0 z-10 w-1/3"
        onClick={advance}
      />

      <div className="flex h-full items-center justify-center px-4 pb-16 pt-20">
        <div key={item.src} className="album-kenburns relative h-full w-full max-w-6xl">
          {isVideo ? (
            <video
              src={`/fotos/${item.src}`}
              poster={`/fotos/${item.poster}`}
              controls
              autoPlay
              playsInline
              className="mx-auto max-h-full max-w-full object-contain"
              onEnded={advance}
            />
          ) : (
            <Image
              src={`/fotos/${item.src}`}
              alt={`Foto ${index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-xs tracking-wide text-white/40 uppercase">
        Toca lados · Espacio pausa · Esc salir
      </p>
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = MEDIA[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-5 z-10 text-4xl leading-none text-white/70 transition-colors hover:text-white"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ×
      </button>
      <div className="absolute top-5 left-1/2 z-10 -translate-x-1/2 text-sm tracking-widest text-white/50">
        {index + 1} / {MEDIA.length}
        {current.type === "video" ? " · Video" : ""}
      </div>
      <button
        className="absolute left-3 z-10 select-none text-5xl leading-none text-white/60 transition-colors hover:text-white sm:left-6"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <div
        className="relative flex h-full w-full items-center justify-center px-14 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === "video" ? (
          <video
            key={current.src}
            src={`/fotos/${current.src}`}
            poster={`/fotos/${current.poster}`}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Image
            src={`/fotos/${current.src}`}
            alt={`Foto ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        )}
      </div>
      <button
        className="absolute right-3 z-10 select-none text-5xl leading-none text-white/60 transition-colors hover:text-white sm:right-6"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}
