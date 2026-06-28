"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTvPageUrl,
  getVivoPageUrl,
  getYouTubeLiveUrl,
  getYouTubeWatchUrl,
} from "@/lib/config";

export function WatchOnTv() {
  const [qrUrl, setQrUrl] = useState("");
  const youtubeWatch = getYouTubeWatchUrl();
  const youtubeLive = getYouTubeLiveUrl();
  const tvPage = getTvPageUrl();

  useEffect(() => {
    setQrUrl(getVivoPageUrl());
  }, []);

  return (
    <div className="rounded-xl border border-gold/25 bg-cream/90 px-4 py-4 sm:px-5 sm:py-5">
      <h2
        className="text-base sm:text-lg font-display font-semibold mb-1"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        ¿Ver en Smart TV?
      </h2>
      <p className="text-xs sm:text-sm text-foreground/60 mb-4">
        Tres formas fáciles para ver en televisor
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-white border border-gold/15 p-3 sm:p-4">
          <p className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
            Opción 1 · La más fácil
          </p>
          <p className="text-sm text-foreground/80 mb-3">
            Abre la app <strong>YouTube</strong> en tu TV y busca la transmisión, o usa este enlace:
          </p>
          {youtubeLive ? (
            <a
              href={youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center justify-center w-full px-3 py-2.5 rounded-lg bg-gold text-white text-sm font-medium hover:bg-[#b8944a] transition-colors"
            >
              Abrir en YouTube
            </a>
          ) : (
            <p className="text-xs text-foreground/50 italic">Disponible cuando configures el video</p>
          )}
        </div>

        <div className="rounded-lg bg-white border border-gold/15 p-3 sm:p-4">
          <p className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
            Opción 2 · Chromecast
          </p>
          <p className="text-sm text-foreground/80">
            Desde el <strong>celular</strong>, abre esta página en Chrome y toca el ícono de{" "}
            <strong>Transmitir</strong> en el reproductor de YouTube (esquina del video).
          </p>
        </div>

        <div className="rounded-lg bg-white border border-gold/15 p-3 sm:p-4">
          <p className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
            Opción 3 · Navegador de TV
          </p>
          <p className="text-sm text-foreground/80 mb-3">
            En Samsung, LG o Android TV, abre el navegador y visita la versión para TV:
          </p>
          <Link
            href="/tv"
            className="touch-target inline-flex items-center justify-center w-full px-3 py-2.5 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
          >
            Abrir versión TV
          </Link>
        </div>
      </div>

      {qrUrl && (
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 border-t border-gold/15">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrUrl)}`}
            alt={`Código QR para ${qrUrl}`}
            width={120}
            height={120}
            className="rounded-lg border border-gold/20 shrink-0"
          />
          <div className="text-center sm:text-left text-sm text-foreground/70">
            <p className="font-medium text-foreground/90 mb-1">Escanea con el celular</p>
            <p>
              Abre la cámara, escanea el QR y luego transmite a tu TV con Chromecast o AirPlay.
            </p>
            <p className="text-xs text-foreground/45 mt-2 break-all">{tvPage}</p>
          </div>
        </div>
      )}

      {youtubeWatch && (
        <p className="text-xs text-foreground/45 mt-3 text-center sm:text-left">
          Enlace directo YouTube:{" "}
          <a href={youtubeWatch} className="text-gold hover:underline break-all">
            {youtubeWatch}
          </a>
        </p>
      )}
    </div>
  );
}
