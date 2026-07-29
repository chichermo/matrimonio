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
  PHOTOS,
  ALBUM_VIDEOS,
  PHOTO_COUNT,
  VIDEO_COUNT,
  youtubeThumb,
  youtubeEmbedUrl,
  type PhotoItem,
  type AlbumVideo,
} from "@/lib/album-media";
import { weddingConfig } from "@/lib/config";
import { useI18n } from "@/components/I18nProvider";
import { t } from "@/lib/i18n/dictionaries";

type Screen = "cover" | "menu" | "photos" | "videos";
type ViewMode = "grid" | "carousel" | "story";

const SLIDE_MS = 4500;
const COVER_PHOTO = PHOTOS[Math.min(40, PHOTOS.length - 1)]?.src ?? PHOTOS[0]?.src;

export default function FotosPage() {
  const [screen, setScreen] = useState<Screen>("cover");
  const [mode, setMode] = useState<ViewMode>("grid");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(true);
  const [storyProgress, setStoryProgress] = useState(0);
  const [videoLightbox, setVideoLightbox] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (videoLightbox === null) document.body.style.overflow = "";
  }, [videoLightbox]);

  const goLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) =>
      i === null ? null : (i + delta + PHOTOS.length) % PHOTOS.length
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
    if (mode === "story" && screen === "photos") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mode, screen]);

  const enterPhotos = (nextMode: ViewMode) => {
    setMode(nextMode);
    setCarouselIndex(0);
    setStoryIndex(0);
    setStoryPlaying(true);
    setStoryProgress(0);
    setScreen("photos");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6d3]">
      {screen === "cover" && (
        <CoverScreen onEnter={() => setScreen("menu")} />
      )}

      {screen === "menu" && (
        <MenuScreen
          onSelectPhotosMode={enterPhotos}
          onSelectVideos={() => setScreen("videos")}
          onBack={() => setScreen("cover")}
        />
      )}

      {screen === "photos" && (
        <>
          {mode !== "story" && (
            <PhotosHeader
              mode={mode}
              onChangeMode={enterPhotos}
              onBack={() => setScreen("menu")}
            />
          )}
          {mode === "grid" && <GridView onOpen={openLightbox} />}
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
              onExit={() => setScreen("menu")}
            />
          )}
          {lightboxIndex !== null && (
            <PhotoLightbox
              index={lightboxIndex}
              onClose={closeLightbox}
              onPrev={() => goLightbox(-1)}
              onNext={() => goLightbox(1)}
            />
          )}
        </>
      )}

      {screen === "videos" && (
        <VideosScreen
          onBack={() => setScreen("menu")}
          activeIndex={videoLightbox}
          setActiveIndex={(i) => {
            setVideoLightbox(i);
            document.body.style.overflow = i === null ? "" : "hidden";
          }}
        />
      )}
    </main>
  );
}

function CoverScreen({ onEnter }: { onEnter: () => void }) {
  const { dict } = useI18n();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {COVER_PHOTO && (
        <Image
          src={`/fotos/${COVER_PHOTO}`}
          alt=""
          fill
          priority
          className="object-cover opacity-40 album-kenburns-zoom-slow"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0a0a0a]" />

      <div className="relative z-10 max-w-2xl animate-[fade-in-up_0.8s_ease-out]">
        <p className="mb-5 text-xs tracking-[0.4em] text-[#c9a962] uppercase sm:text-sm">
          10 · VII · MMXXVI · {weddingConfig.location}
        </p>
        <h1
          className="mb-4 text-5xl font-light tracking-wide sm:text-7xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {weddingConfig.coupleNames}
        </h1>
        <div className="mx-auto mb-6 h-px w-20 bg-[#c9a962]" />
        <p
          className="mb-3 text-2xl font-light tracking-wide text-[#f0e6d3] sm:text-3xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {dict.album.coverKicker}
        </p>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-[#a89070] sm:text-lg">
          {dict.album.coverBody}
        </p>

        <button
          type="button"
          onClick={onEnter}
          className="inline-flex items-center gap-3 rounded-full bg-[#c9a962] px-8 py-4 text-sm tracking-[0.2em] text-[#0a0a0a] uppercase transition hover:bg-[#d4b978] active:scale-[0.98]"
        >
          {dict.album.enter}
          <span aria-hidden>→</span>
        </button>

        <p className="mt-8 text-sm text-[#a89070]/80">
          {t(dict.album.photosVideos, {
            photos: PHOTO_COUNT,
            videos: VIDEO_COUNT,
          })}
        </p>

        <Link
          href="/"
          className="mt-6 inline-block text-xs tracking-widest text-[#c9a962]/80 uppercase transition hover:text-[#f0e6d3]"
        >
          {dict.album.backHome}
        </Link>
      </div>
    </section>
  );
}

function MenuScreen({
  onSelectPhotosMode,
  onSelectVideos,
  onBack,
}: {
  onSelectPhotosMode: (mode: ViewMode) => void;
  onSelectVideos: () => void;
  onBack: () => void;
}) {
  const { dict } = useI18n();

  const photoModes: {
    id: ViewMode;
    title: string;
    desc: string;
    icon: ReactNode;
  }[] = [
    {
      id: "grid",
      title: dict.album.gridTitle,
      desc: dict.album.gridDesc,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
      ),
    },
    {
      id: "carousel",
      title: dict.album.carouselTitle,
      desc: dict.album.carouselDesc,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 6V4M18 6V4M6 20v-2M18 20v-2" />
        </svg>
      ),
    },
    {
      id: "story",
      title: dict.album.storyTitle,
      desc: dict.album.storyDesc,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 text-center sm:mb-14">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-xs tracking-widest text-[#c9a962] uppercase transition hover:text-[#f0e6d3]"
        >
          {dict.album.backCover}
        </button>
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a962] uppercase">
          {dict.album.howToWatch}
        </p>
        <h2
          className="mb-3 text-4xl font-light tracking-wide sm:text-5xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {dict.album.chooseExperience}
        </h2>
        <p className="mx-auto max-w-lg text-[#a89070]">{dict.album.menuIntro}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-4 text-center text-xs tracking-[0.3em] text-[#c9a962]/90 uppercase">
          {dict.album.photos} · {PHOTO_COUNT}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {photoModes.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectPhotosMode(opt.id)}
              className="group album-reveal is-visible rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition duration-300 hover:border-[#c9a962]/50 hover:bg-[#c9a962]/10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a962]/40 text-[#c9a962] transition group-hover:bg-[#c9a962] group-hover:text-[#0a0a0a]">
                {opt.icon}
              </div>
              <p
                className="mb-2 text-2xl font-light tracking-wide"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {opt.title}
              </p>
              <p className="text-sm leading-relaxed text-[#a89070]">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 sm:mt-14">
        <h3 className="mb-4 text-center text-xs tracking-[0.3em] text-[#c9a962]/90 uppercase">
          {dict.album.videos} · {VIDEO_COUNT}
        </h3>
        <button
          type="button"
          onClick={onSelectVideos}
          className="group flex w-full flex-col items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 text-left transition hover:border-[#c9a962]/50 hover:from-[#c9a962]/15 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/40 text-[#c9a962] transition group-hover:bg-[#c9a962] group-hover:text-[#0a0a0a]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <p
                className="mb-1 text-2xl font-light tracking-wide sm:text-3xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {dict.album.viewVideos}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-[#a89070]">
                {dict.album.videosDesc}
              </p>
            </div>
          </div>
          <span className="text-sm tracking-widest text-[#c9a962] uppercase transition group-hover:translate-x-1">
            {dict.album.open}
          </span>
        </button>
      </div>
    </section>
  );
}

function PhotosHeader({
  mode,
  onChangeMode,
  onBack,
}: {
  mode: ViewMode;
  onChangeMode: (m: ViewMode) => void;
  onBack: () => void;
}) {
  const { dict } = useI18n();
  const options: { id: ViewMode; label: string }[] = [
    { id: "grid", label: dict.album.grid },
    { id: "carousel", label: dict.album.carousel },
    { id: "story", label: dict.album.story },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="self-start text-xs tracking-widest text-[#c9a962] uppercase transition hover:text-[#f0e6d3]"
        >
          {dict.album.backMenu}
        </button>

        <div
          className="flex w-full rounded-full border border-white/10 bg-white/5 p-1 sm:w-auto"
          role="tablist"
        >
          {options.map((opt) => {
            const active = mode === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                onClick={() => onChangeMode(opt.id)}
                className={`flex-1 rounded-full px-3 py-2.5 text-xs tracking-wide transition-all sm:flex-none sm:px-4 ${
                  active
                    ? "bg-[#c9a962] text-[#0a0a0a]"
                    : "text-[#a89070] hover:text-[#f0e6d3]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <p className="hidden text-sm text-[#a89070] sm:block">
          {PHOTO_COUNT} {dict.album.photos.toLowerCase()}
        </p>
      </div>
    </header>
  );
}

function GridView({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-24 pt-6 sm:px-4">
      <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
        {PHOTOS.map((item, index) => (
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
  item: PhotoItem;
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
          src={`/fotos/${item.src}`}
          alt={`Foto ${index + 1}`}
          width={600}
          height={800}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
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
  const item = PHOTOS[index];
  const { dict } = useI18n();

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + PHOTOS.length) % PHOTOS.length);
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

  if (!item) return null;

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
            {index + 1} / {PHOTOS.length}
          </span>
          <span className="text-xs tracking-wide uppercase opacity-70">
            {dict.album.swipeHint}
          </span>
        </div>
        <div
          ref={filmRef}
          className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1"
        >
          {PHOTOS.map((m, i) => (
            <button
              key={m.src}
              type="button"
              data-thumb={i}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-sm transition-all duration-300 sm:h-20 sm:w-14 ${
                i === index
                  ? "scale-105 opacity-100 ring-2 ring-[#c9a962]"
                  : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image
                src={`/fotos/${m.src}`}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
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
}) {
  const item = PHOTOS[index];
  const touchX = useRef<number | null>(null);
  const progressRef = useRef(progress);
  const { dict } = useI18n();

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const advance = useEffectEvent(() => {
    setIndex((i) => (i + 1) % PHOTOS.length);
    setProgress(0);
  });

  const goPrev = useEffectEvent(() => {
    setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    setProgress(0);
  });

  useEffect(() => {
    if (!playing) return;
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
  }, [playing, index, setProgress, advance]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying(!playing);
      }
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % PHOTOS.length);
        setProgress(0);
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
        setProgress(0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit, playing, setPlaying, setIndex, setProgress]);

  if (!item) return null;

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
            style={{ width: `${((index + 1) / PHOTOS.length) * 100}%` }}
          />
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#c9a962] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="absolute top-6 right-0 left-0 z-20 flex items-center justify-between px-4 pt-4 sm:px-8">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-widest text-white/80 uppercase backdrop-blur transition hover:bg-black/60"
        >
          {dict.album.exit}
        </button>
        <p className="text-sm text-white/60">
          {index + 1} / {PHOTOS.length}
        </p>
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-widest text-white/80 uppercase backdrop-blur transition hover:bg-black/60"
        >
          {playing ? dict.album.pause : dict.album.play}
        </button>
      </div>

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
          <Image
            src={`/fotos/${item.src}`}
            alt={`Foto ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-xs tracking-wide text-white/40 uppercase">
        {dict.album.storyHint}
      </p>
    </div>
  );
}

function PhotoLightbox({
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
  const current = PHOTOS[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
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
        {index + 1} / {PHOTOS.length}
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
        <Image
          src={`/fotos/${current.src}`}
          alt={`Foto ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
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

function VideosScreen({
  onBack,
  activeIndex,
  setActiveIndex,
}: {
  onBack: () => void;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}) {
  const { dict } = useI18n();
  const active = activeIndex !== null ? ALBUM_VIDEOS[activeIndex] : null;

  const videoTitle = (video: AlbumVideo, index: number) => {
    if (video.kind === "youtube") return dict.album.ceremonyTitle;
    return t(dict.album.clipTitle, { n: index });
  };

  const videoSubtitle = (video: AlbumVideo) => {
    if (video.kind === "youtube") return dict.album.ceremonySubtitle;
    return dict.album.clipSubtitle;
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex(((activeIndex ?? 0) + 1) % ALBUM_VIDEOS.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex(
          ((activeIndex ?? 0) - 1 + ALBUM_VIDEOS.length) % ALBUM_VIDEOS.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, setActiveIndex]);

  return (
    <section className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-xs tracking-widest text-[#c9a962] uppercase transition hover:text-[#f0e6d3]"
        >
          {dict.album.backMenu}
        </button>
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a962] uppercase">
          {dict.album.clipsKicker}
        </p>
        <h2
          className="mb-3 text-4xl font-light tracking-wide sm:text-5xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {dict.album.videos}
        </h2>
        <p className="text-[#a89070]">
          {t(dict.album.videosCount, { count: VIDEO_COUNT })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ALBUM_VIDEOS.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            title={videoTitle(video, index)}
            subtitle={videoSubtitle(video)}
            featured={index === 0 && video.kind === "youtube"}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          onClick={() => setActiveIndex(null)}
        >
          <button
            className="absolute top-4 right-5 z-10 text-4xl leading-none text-white/70 hover:text-white"
            onClick={() => setActiveIndex(null)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <div className="absolute top-5 left-1/2 max-w-[70%] -translate-x-1/2 truncate text-center text-sm tracking-wide text-white/50">
            {videoTitle(active, activeIndex)} · {activeIndex + 1} /{" "}
            {ALBUM_VIDEOS.length}
          </div>
          <button
            className="absolute left-3 z-10 text-5xl text-white/60 hover:text-white sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(
                (activeIndex - 1 + ALBUM_VIDEOS.length) % ALBUM_VIDEOS.length
              );
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <div
            className="relative flex h-full w-full items-center justify-center px-4 py-16 sm:px-14"
            onClick={(e) => e.stopPropagation()}
          >
            {active.kind === "youtube" ? (
              <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  key={active.youtubeId}
                  src={youtubeEmbedUrl(active.youtubeId)}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <video
                key={active.src}
                src={`/fotos/${active.src}`}
                poster={`/fotos/${active.poster}`}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>
          <button
            className="absolute right-3 z-10 text-5xl text-white/60 hover:text-white sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % ALBUM_VIDEOS.length);
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function VideoCard({
  video,
  title,
  subtitle,
  featured,
  onClick,
}: {
  video: AlbumVideo;
  title: string;
  subtitle: string;
  featured?: boolean;
  onClick: () => void;
}) {
  const thumb =
    video.kind === "youtube"
      ? youtubeThumb(video.youtubeId)
      : `/fotos/${video.poster}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-video overflow-hidden rounded-xl border border-white/10 text-left transition hover:border-[#c9a962]/50 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <Image
        src={thumb}
        alt={title}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes={featured ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a0a0a">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 p-4">
        {video.kind === "youtube" && (
          <span className="mb-2 inline-block rounded-full bg-[#c9a962]/90 px-2.5 py-0.5 text-[10px] tracking-widest text-[#0a0a0a] uppercase">
            YouTube
          </span>
        )}
        <p
          className="text-lg tracking-wide text-white sm:text-xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </p>
        <p className="mt-0.5 text-sm text-white/65">{subtitle}</p>
      </div>
    </button>
  );
}
