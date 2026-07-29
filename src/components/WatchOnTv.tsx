"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTvPageUrl,
  getVivoPageUrl,
  getYouTubeLiveUrl,
  getYouTubeWatchUrl,
} from "@/lib/config";
import { useI18n } from "@/components/I18nProvider";

export function WatchOnTv() {
  const { dict } = useI18n();
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
        className="mb-1 font-display text-lg font-semibold sm:text-xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {dict.watchTv.title}
      </h2>
      <p className="mb-4 text-sm text-foreground/75 sm:text-base">
        {dict.watchTv.subtitle}
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gold/15 bg-white p-3 sm:p-4">
          <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">
            {dict.watchTv.opt1Title}
          </p>
          <p className="mb-3 text-sm text-foreground/85 sm:text-base">
            {dict.watchTv.opt1Body}
          </p>
          {youtubeLive ? (
            <a
              href={youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex w-full items-center justify-center rounded-lg bg-gold px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#b8944a]"
            >
              {dict.watchTv.openYoutube}
            </a>
          ) : (
            <p className="text-xs text-foreground/50 italic">{dict.watchTv.notReady}</p>
          )}
        </div>

        <div className="rounded-lg border border-gold/15 bg-white p-3 sm:p-4">
          <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">
            {dict.watchTv.opt2Title}
          </p>
          <p className="text-sm text-foreground/80">{dict.watchTv.opt2Body}</p>
        </div>

        <div className="rounded-lg border border-gold/15 bg-white p-3 sm:p-4">
          <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">
            {dict.watchTv.opt3Title}
          </p>
          <p className="mb-3 text-sm text-foreground/85 sm:text-base">
            {dict.watchTv.opt3Body}
          </p>
          <Link
            href="/tv"
            className="touch-target inline-flex w-full items-center justify-center rounded-lg border border-gold px-3 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            {dict.watchTv.openTv}
          </Link>
        </div>
      </div>

      {qrUrl && (
        <div className="flex flex-col items-center gap-4 border-t border-gold/15 pt-3 sm:flex-row">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrUrl)}`}
            alt={dict.watchTv.scanTitle}
            width={120}
            height={120}
            className="shrink-0 rounded-lg border border-gold/20"
          />
          <div className="text-center text-sm text-foreground/70 sm:text-left">
            <p className="mb-1 font-medium text-foreground/90">
              {dict.watchTv.scanTitle}
            </p>
            <p>{dict.watchTv.scanBody}</p>
            <p className="mt-2 text-xs break-all text-foreground/45">{tvPage}</p>
          </div>
        </div>
      )}

      {youtubeWatch && (
        <p className="mt-3 text-center text-xs text-foreground/45 sm:text-left">
          {dict.watchTv.youtubeDirect}{" "}
          <a href={youtubeWatch} className="break-all text-gold hover:underline">
            {youtubeWatch}
          </a>
        </p>
      )}
    </div>
  );
}
