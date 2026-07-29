"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PHOTOS = [
  "06e7bb07-7e89-4c98-8f94-64e50b12a455.jpeg",
  "20260710_132608.jpeg",
  "20260710_132612.jpeg",
  "20260710_132623.jpeg",
  "20260710_135959.jpeg",
  "20260710_140003.jpeg",
  "20260710_140353.jpeg",
  "20260710_140411.jpg",
  "20260710_140522.jpg",
  "20260710_140528.jpg",
  "20260710_141457.jpeg",
  "20260710_141540.jpeg",
  "20260710_141853.jpeg",
  "20260710_141953.jpeg",
  "20260710_142054.jpeg",
  "20260710_142327.jpeg",
  "20260710_142337.jpeg",
  "20260710_142355.jpeg",
  "20260710_142408.jpeg",
  "20260710_142427.jpeg",
  "20260710_142441.jpeg",
  "20260710_142541.jpeg",
  "20260710_142557.jpeg",
  "20260710_142747.jpeg",
  "20260710_142857.jpg",
  "20260710_143054.jpg",
  "20260710_143112.jpeg",
  "20260710_143121.jpeg",
  "20260710_143139.jpeg",
  "20260710_143218.jpeg",
  "20260710_143243.jpeg",
  "20260710_143247.jpeg",
  "20260710_143303.jpeg",
  "20260710_143315.jpeg",
  "20260710_143326.jpeg",
  "20260710_195153.jpeg",
  "20260710_195215.jpeg",
  "29e75dc5-e089-4403-84bd-9fffcfebab6d.jpeg",
  "8ed3d47c-3310-481d-95b6-8c97ab17a601.jpeg",
  "981c2d43-bfe2-4908-8372-fb498528d002.jpeg",
  "IMG_2499.jpeg",
  "IMG_2500.jpeg",
  "IMG_2501.jpeg",
  "IMG_2512.jpeg",
  "IMG_2513.jpeg",
  "IMG_2514.jpeg",
  "IMG_2518.jpeg",
  "IMG_2519.jpeg",
  "IMG_2520.jpeg",
  "IMG_2521.jpeg",
  "IMG_2522.jpeg",
  "IMG_2546.jpeg",
  "IMG_2547.jpeg",
  "IMG_2548.jpeg",
  "IMG_2551.jpeg",
  "IMG_2552.jpeg",
  "IMG_2553.jpeg",
  "IMG_2554.jpeg",
  "IMG_2555.jpeg",
  "IMG_2556.jpeg",
  "IMG_2559.jpeg",
  "IMG_4190.jpeg",
  "IMG_4191.jpeg",
  "IMG_4192.jpeg",
  "IMG_4193.jpeg",
  "IMG_4194.jpeg",
  "IMG_4195.jpeg",
  "IMG_4196.jpeg",
  "IMG_4197.jpeg",
  "IMG_4198.jpeg",
  "IMG_4199.jpeg",
  "IMG_4200.jpeg",
  "IMG_4201.jpeg",
  "IMG_4202.jpeg",
  "IMG_4203.jpeg",
  "IMG_4204.jpeg",
  "IMG_4205.jpeg",
  "IMG_4209.jpeg",
  "IMG_4210.jpeg",
  "IMG_4211.jpeg",
  "IMG_4212.jpeg",
  "IMG_4213.jpeg",
  "IMG_4214.jpeg",
  "IMG_4218.jpeg",
  "IMG_4219.jpeg",
  "IMG_4220.jpeg",
  "IMG_4221.jpeg",
  "IMG_4222.jpeg",
  "IMG_4223.jpeg",
  "IMG_4224.jpeg",
  "IMG_4225.jpeg",
  "IMG_4226.jpeg",
  "IMG_4227.jpeg",
  "IMG_4228.jpeg",
  "IMG_4229.jpeg",
  "IMG_4230.jpeg",
  "IMG_4231.jpeg",
  "IMG_4232.jpeg",
  "IMG_4233.jpeg",
  "IMG_4234.jpeg",
  "IMG_4235.jpeg",
  "IMG_4236.jpeg",
  "IMG_4237.jpeg",
  "IMG_4238.jpeg",
  "IMG_4239.jpeg",
  "IMG_4240.jpeg",
  "IMG_4241.jpeg",
  "IMG_4242.jpeg",
  "IMG_4243.jpeg",
  "IMG_4244.jpeg",
  "IMG_4245.jpeg",
  "IMG_4246.jpeg",
  "IMG_4247.jpeg",
  "IMG_4249.jpeg",
  "IMG_4250.jpeg",
  "IMG_4254.jpeg",
  "IMG_4255.jpeg",
  "IMG_4256.jpeg",
  "IMG_4257.jpeg",
  "IMG_4258.jpeg",
  "IMG_7051.jpeg",
  "IMG_7052.jpeg",
  "IMG_7059.jpeg",
  "IMG_7060.jpeg",
  "IMG_7061.jpeg",
  "IMG_7062.jpeg",
  "IMG_7063.jpeg",
  "IMG_7064.jpeg",
  "IMG_7065.jpeg",
  "IMG_7066.jpeg",
  "IMG_7067.jpeg",
  "IMG_7075.jpeg",
  "IMG_7076.jpeg",
  "IMG_7077.jpeg",
  "IMG_7079.jpeg",
  "IMG_7080.jpeg",
  "IMG_7085.jpeg",
];

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
    setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length
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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0e6d3]">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <div className="mb-4 text-[#c9a962] text-sm tracking-[0.35em] uppercase font-light">
          10 · VII · MMXXVI
        </div>
        <h1
          className="font-cormorant text-5xl md:text-7xl font-light tracking-wide mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Álbum de Fotos
        </h1>
        <div className="w-16 h-px bg-[#c9a962] mx-auto mb-6" />
        <p className="text-[#a89070] text-base md:text-lg font-light max-w-md leading-relaxed">
          Momentos de nuestra boda en Bélgica · {PHOTOS.length} fotografías
        </p>
        <Link
          href="/"
          className="mt-8 text-[#c9a962] text-sm tracking-widest uppercase hover:text-[#f0e6d3] transition-colors duration-300"
        >
          ← Volver al inicio
        </Link>
      </section>

      {/* Gallery grid */}
      <section className="px-2 sm:px-4 pb-24 max-w-7xl mx-auto">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
          {PHOTOS.map((filename, index) => (
            <GalleryItem
              key={filename}
              filename={filename}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none z-10 transition-colors"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
            {lightboxIndex + 1} / {PHOTOS.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 text-white/60 hover:text-white text-5xl leading-none z-10 transition-colors select-none"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Anterior"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full flex items-center justify-center px-14 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/fotos/${PHOTOS[lightboxIndex]}`}
              alt={`Foto ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 text-white/60 hover:text-white text-5xl leading-none z-10 transition-colors select-none"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
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
  filename,
  index,
  onClick,
}: {
  filename: string;
  index: number;
  onClick: (index: number) => void;
}) {
  return (
    <div
      className="relative mb-2 sm:mb-3 overflow-hidden cursor-pointer group break-inside-avoid"
      onClick={() => onClick(index)}
    >
      <div className="relative w-full">
        <Image
          src={`/fotos/${filename}`}
          alt={`Foto ${index + 1}`}
          width={600}
          height={800}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/60 rounded-full w-10 h-10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
