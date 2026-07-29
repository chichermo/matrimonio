"use client";

import { useEffect, useState } from "react";
import { getWeddingDate } from "@/lib/config";
import {
  formatWeddingInBelgium,
  formatWeddingInChile,
  getCountdown,
  type CountdownState,
} from "@/lib/datetime";
import { useI18n } from "@/components/I18nProvider";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display text-3xl font-semibold tabular-nums text-foreground sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs font-medium tracking-wide text-foreground/75 uppercase sm:text-sm">
        {label}
      </span>
    </div>
  );
}

interface WeddingCountdownProps {
  compact?: boolean;
}

export function WeddingCountdown({ compact = false }: WeddingCountdownProps) {
  const { dict } = useI18n();
  const weddingDate = getWeddingDate();
  const belgium = formatWeddingInBelgium(weddingDate);
  const chile = formatWeddingInChile(weddingDate);
  const [countdown, setCountdown] = useState<CountdownState | null>(null);

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(weddingDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  if (!countdown) return null;

  if (countdown.isPast) {
    return (
      <div
        className={`text-center ${
          compact
            ? ""
            : "rounded-xl border border-gold/25 bg-cream/80 px-4 py-6 sm:px-6 sm:py-8"
        }`}
      >
        <p
          className="font-display text-xl text-gold sm:text-2xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {dict.countdown.grandDay}
        </p>
        {!compact && (
          <p className="mt-3 px-2 text-sm text-foreground/80 sm:text-base">
            {dict.countdown.startedAt} {belgium.time} {dict.countdown.belgium} ·{" "}
            {chile.time} {dict.countdown.chile}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`text-center ${
        compact
          ? ""
          : "rounded-xl border border-gold/25 bg-cream/80 px-4 py-6 sm:px-6 sm:py-8"
      }`}
    >
      {!compact && (
        <>
          <p className="mb-4 text-sm font-semibold tracking-wide text-foreground/80 uppercase sm:text-base">
            {dict.countdown.untilCeremony}
          </p>
          <div className="mb-5 flex flex-col gap-2 px-2 text-sm text-foreground/85 sm:mb-6 sm:flex-row sm:justify-center sm:gap-10 sm:text-base">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>
                🇧🇪
              </span>
              <span>
                <strong>{dict.countdown.belgium}:</strong> {belgium.time}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>
                🇨🇱
              </span>
              <span>
                <strong>{dict.countdown.chile}:</strong> {chile.time}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 sm:flex sm:max-w-none sm:justify-center sm:gap-8 sm:gap-3">
        <CountdownUnit value={countdown.days} label={dict.countdown.days} />
        <CountdownUnit value={countdown.hours} label={dict.countdown.hours} />
        <CountdownUnit value={countdown.minutes} label={dict.countdown.minutes} />
        <CountdownUnit value={countdown.seconds} label={dict.countdown.seconds} />
      </div>

      {!compact && (
        <p className="mt-5 px-2 text-sm leading-relaxed text-foreground/70 capitalize sm:mt-6 sm:text-base">
          {belgium.full} · {dict.countdown.inChile}: {chile.time}
        </p>
      )}

      {countdown.isToday && !compact && (
        <p className="mt-3 animate-pulse-live text-base font-semibold text-gold sm:text-lg">
          {dict.countdown.today}
        </p>
      )}
    </div>
  );
}
