"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type MediaItem =
  | { type: "photo"; src: string }
  | { type: "video"; src: string; poster: string };

const MEDIA: MediaItem[] = [
  { type: "photo", src: "06e7bb07-7e89-4c98-8f94-64e50b12a455.jpeg" },
  { type: "photo", src: "20260710_132608.jpeg" },
  { type: "photo", src: "20260710_132612.jpeg" },
  { type: "photo", src: "20260710_132623.jpeg" },
  { type: "photo", src: "20260710_135959.jpeg" },
  { type: "photo", src: "20260710_140003.jpeg" },
  { type: "photo", src: "20260710_140353.jpeg" },
  { type: "photo", src: "20260710_140411.jpg" },
  { type: "photo", src: "20260710_140522.jpg" },
  { type: "photo", src: "20260710_140528.jpg" },
  { type: "photo", src: "20260710_141457.jpeg" },
  { type: "photo", src: "20260710_141540.jpeg" },
  { type: "photo", src: "20260710_141853.jpeg" },
  { type: "photo", src: "20260710_141953.jpeg" },
  { type: "photo", src: "20260710_142054.jpeg" },
  { type: "photo", src: "20260710_142327.jpeg" },
  { type: "photo", src: "20260710_142337.jpeg" },
  { type: "photo", src: "20260710_142355.jpeg" },
  { type: "photo", src: "20260710_142408.jpeg" },
  { type: "photo", src: "20260710_142427.jpeg" },
  { type: "photo", src: "20260710_142441.jpeg" },
  { type: "photo", src: "20260710_142541.jpeg" },
  { type: "photo", src: "20260710_142557.jpeg" },
  { type: "photo", src: "20260710_142747.jpeg" },
  { type: "photo", src: "20260710_142857.jpg" },
  { type: "photo", src: "20260710_143054.jpg" },
  { type: "photo", src: "20260710_143112.jpeg" },
  { type: "photo", src: "20260710_143121.jpeg" },
  { type: "photo", src: "20260710_143139.jpeg" },
  { type: "photo", src: "20260710_143218.jpeg" },
  { type: "photo", src: "20260710_143243.jpeg" },
  { type: "photo", src: "20260710_143247.jpeg" },
  { type: "photo", src: "20260710_143303.jpeg" },
  { type: "photo", src: "20260710_143315.jpeg" },
  { type: "photo", src: "20260710_143326.jpeg" },
  { type: "photo", src: "20260710_195153.jpeg" },
  { type: "photo", src: "20260710_195215.jpeg" },
  { type: "photo", src: "29e75dc5-e089-4403-84bd-9fffcfebab6d.jpeg" },
  { type: "photo", src: "8ed3d47c-3310-481d-95b6-8c97ab17a601.jpeg" },
  { type: "photo", src: "981c2d43-bfe2-4908-8372-fb498528d002.jpeg" },
  { type: "photo", src: "IMG_2499.jpeg" },
  { type: "photo", src: "IMG_2500.jpeg" },
  { type: "photo", src: "IMG_2501.jpeg" },
  { type: "photo", src: "IMG_2512.jpeg" },
  { type: "photo", src: "IMG_2513.jpeg" },
  { type: "photo", src: "IMG_2514.jpeg" },
  {
    type: "video",
    src: "IMG_2517.mp4",
    poster: "IMG_2517-poster.jpg",
  },
  { type: "photo", src: "IMG_2518.jpeg" },
  { type: "photo", src: "IMG_2519.jpeg" },
  { type: "photo", src: "IMG_2520.jpeg" },
  { type: "photo", src: "IMG_2521.jpeg" },
  { type: "photo", src: "IMG_2522.jpeg" },
  {
    type: "video",
    src: "IMG_2523.mp4",
    poster: "IMG_2523-poster.jpg",
  },
  { type: "photo", src: "IMG_2546.jpeg" },
  { type: "photo", src: "IMG_2547.jpeg" },
  { type: "photo", src: "IMG_2548.jpeg" },
  { type: "photo", src: "IMG_2551.jpeg" },
  { type: "photo", src: "IMG_2552.jpeg" },
  { type: "photo", src: "IMG_2553.jpeg" },
  { type: "photo", src: "IMG_2554.jpeg" },
  { type: "photo", src: "IMG_2555.jpeg" },
  { type: "photo", src: "IMG_2556.jpeg" },
  { type: "photo", src: "IMG_2559.jpeg" },
  { type: "photo", src: "IMG_4190.jpeg" },
  { type: "photo", src: "IMG_4191.jpeg" },
  { type: "photo", src: "IMG_4192.jpeg" },
  { type: "photo", src: "IMG_4193.jpeg" },
  { type: "photo", src: "IMG_4194.jpeg" },
  { type: "photo", src: "IMG_4195.jpeg" },
  { type: "photo", src: "IMG_4196.jpeg" },
  { type: "photo", src: "IMG_4197.jpeg" },
  { type: "photo", src: "IMG_4198.jpeg" },
  { type: "photo", src: "IMG_4199.jpeg" },
  { type: "photo", src: "IMG_4200.jpeg" },
  { type: "photo", src: "IMG_4201.jpeg" },
  { type: "photo", src: "IMG_4202.jpeg" },
  { type: "photo", src: "IMG_4203.jpeg" },
  { type: "photo", src: "IMG_4204.jpeg" },
  { type: "photo", src: "IMG_4205.jpeg" },
  { type: "photo", src: "IMG_4209.jpeg" },
  { type: "photo", src: "IMG_4210.jpeg" },
  { type: "photo", src: "IMG_4211.jpeg" },
  { type: "photo", src: "IMG_4212.jpeg" },
  { type: "photo", src: "IMG_4213.jpeg" },
  { type: "photo", src: "IMG_4214.jpeg" },
  { type: "photo", src: "IMG_4218.jpeg" },
  { type: "photo", src: "IMG_4219.jpeg" },
  { type: "photo", src: "IMG_4220.jpeg" },
  { type: "photo", src: "IMG_4221.jpeg" },
  { type: "photo", src: "IMG_4222.jpeg" },
  { type: "photo", src: "IMG_4223.jpeg" },
  { type: "photo", src: "IMG_4224.jpeg" },
  { type: "photo", src: "IMG_4225.jpeg" },
  { type: "photo", src: "IMG_4226.jpeg" },
  { type: "photo", src: "IMG_4227.jpeg" },
  { type: "photo", src: "IMG_4228.jpeg" },
  { type: "photo", src: "IMG_4229.jpeg" },
  { type: "photo", src: "IMG_4230.jpeg" },
  { type: "photo", src: "IMG_4231.jpeg" },
  { type: "photo", src: "IMG_4232.jpeg" },
  { type: "photo", src: "IMG_4233.jpeg" },
  { type: "photo", src: "IMG_4234.jpeg" },
  { type: "photo", src: "IMG_4235.jpeg" },
  { type: "photo", src: "IMG_4236.jpeg" },
  { type: "photo", src: "IMG_4237.jpeg" },
  { type: "photo", src: "IMG_4238.jpeg" },
  { type: "photo", src: "IMG_4239.jpeg" },
  { type: "photo", src: "IMG_4240.jpeg" },
  { type: "photo", src: "IMG_4241.jpeg" },
  { type: "photo", src: "IMG_4242.jpeg" },
  { type: "photo", src: "IMG_4243.jpeg" },
  { type: "photo", src: "IMG_4244.jpeg" },
  { type: "photo", src: "IMG_4245.jpeg" },
  { type: "photo", src: "IMG_4246.jpeg" },
  { type: "photo", src: "IMG_4247.jpeg" },
  {
    type: "video",
    src: "IMG_4248.mp4",
    poster: "IMG_4248-poster.jpg",
  },
  { type: "photo", src: "IMG_4249.jpeg" },
  { type: "photo", src: "IMG_4250.jpeg" },
  { type: "photo", src: "IMG_4254.jpeg" },
  { type: "photo", src: "IMG_4255.jpeg" },
  { type: "photo", src: "IMG_4256.jpeg" },
  { type: "photo", src: "IMG_4257.jpeg" },
  { type: "photo", src: "IMG_4258.jpeg" },
  { type: "photo", src: "IMG_7051.jpeg" },
  { type: "photo", src: "IMG_7052.jpeg" },
  { type: "photo", src: "IMG_7059.jpeg" },
  { type: "photo", src: "IMG_7060.jpeg" },
  { type: "photo", src: "IMG_7061.jpeg" },
  { type: "photo", src: "IMG_7062.jpeg" },
  { type: "photo", src: "IMG_7063.jpeg" },
  { type: "photo", src: "IMG_7064.jpeg" },
  { type: "photo", src: "IMG_7065.jpeg" },
  { type: "photo", src: "IMG_7066.jpeg" },
  { type: "photo", src: "IMG_7067.jpeg" },
  { type: "photo", src: "IMG_7075.jpeg" },
  { type: "photo", src: "IMG_7076.jpeg" },
  { type: "photo", src: "IMG_7077.jpeg" },
  { type: "photo", src: "IMG_7079.jpeg" },
  { type: "photo", src: "IMG_7080.jpeg" },
  { type: "photo", src: "IMG_7085.jpeg" },
  {
    type: "video",
    src: "VID-20260713-WA0008.mp4",
    poster: "VID-20260713-WA0008-poster.jpg",
  },
];

const PHOTO_COUNT = MEDIA.filter((m) => m.type === "photo").length;
const VIDEO_COUNT = MEDIA.filter((m) => m.type === "video").length;

export default function FotosPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % MEDIA.length));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + MEDIA.length) % MEDIA.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const current = lightboxIndex !== null ? MEDIA[lightboxIndex] : null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6d3]">
      <section className="relative flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <div className="mb-4 text-[#c9a962] text-sm tracking-[0.35em] uppercase font-light">
          10 · VII · MMXXVI
        </div>
        <h1
          className="text-5xl md:text-7xl font-light tracking-wide mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Álbum
        </h1>
        <div className="w-16 h-px bg-[#c9a962] mx-auto mb-6" />
        <p className="text-[#a89070] text-base md:text-lg font-light max-w-md leading-relaxed">
          Momentos de nuestra boda en Bélgica · {PHOTO_COUNT} fotos
          {VIDEO_COUNT > 0 ? ` · ${VIDEO_COUNT} videos` : ""}
        </p>
        <Link
          href="/"
          className="mt-8 text-[#c9a962] text-sm tracking-widest uppercase hover:text-[#f0e6d3] transition-colors duration-300"
        >
          ← Volver al inicio
        </Link>
      </section>

      <section className="px-2 sm:px-4 pb-24 max-w-7xl mx-auto">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
          {MEDIA.map((item, index) => (
            <GalleryItem
              key={item.src}
              item={item}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </div>
      </section>

      {lightboxIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none z-10 transition-colors"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            ×
          </button>

          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
            {lightboxIndex + 1} / {MEDIA.length}
            {current.type === "video" ? " · Video" : ""}
          </div>

          <button
            className="absolute left-3 sm:left-6 text-white/60 hover:text-white text-5xl leading-none z-10 transition-colors select-none"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center px-14 py-10"
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
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <Image
                src={`/fotos/${current.src}`}
                alt={`Foto ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}
          </div>

          <button
            className="absolute right-3 sm:right-6 text-white/60 hover:text-white text-5xl leading-none z-10 transition-colors select-none"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}

function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: MediaItem;
  index: number;
  onClick: (index: number) => void;
}) {
  const thumb = item.type === "video" ? item.poster : item.src;

  return (
    <div
      className="relative mb-2 sm:mb-3 overflow-hidden cursor-pointer group break-inside-avoid"
      onClick={() => onClick(index)}
    >
      <div className="relative w-full">
        <Image
          src={`/fotos/${thumb}`}
          alt={item.type === "video" ? `Video ${index + 1}` : `Foto ${index + 1}`}
          width={600}
          height={800}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          {item.type === "video" ? (
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/60 rounded-full w-10 h-10 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
