"use client";

import { useEffect, useState } from "react";
import { getWeddingDate } from "@/lib/config";
import {
  formatWeddingInBelgium,
  formatWeddingInChile,
  getCountdown,
  type CountdownState,
} from "@/lib/datetime";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tabular-nums text-foreground"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs sm:text-sm uppercase tracking-wide font-medium text-foreground/75 mt-1">
        {label}
      </span>
    </div>
  );
}

function CountdownDigits({ countdown }: { countdown: CountdownState }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm sm:max-w-none mx-auto sm:flex sm:justify-center sm:gap-8">
      <CountdownUnit value={countdown.days} label="días" />
      <CountdownUnit value={countdown.hours} label="horas" />
      <CountdownUnit value={countdown.minutes} label="min" />
      <CountdownUnit value={countdown.seconds} label="seg" />
    </div>
  );
}

interface WeddingCountdownProps {
  compact?: boolean;
}

export function WeddingCountdown({ compact = false }: WeddingCountdownProps) {
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
          compact ? "" : "rounded-xl border border-gold/25 bg-cream/80 px-4 sm:px-6 py-6 sm:py-8"
        }`}
      >
        <p
          className="text-xl sm:text-2xl font-display text-gold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          ¡Es el gran día!
        </p>
        {!compact && (
          <p className="text-sm sm:text-base text-foreground/80 mt-3 px-2">
            La ceremonia comenzó a las {belgium.time} en Bélgica · {chile.time} en Chile
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`text-center ${
        compact ? "" : "rounded-xl border border-gold/25 bg-cream/80 px-4 sm:px-6 py-6 sm:py-8"
      }`}
    >
      {!compact && (
        <>
          <p className="text-sm sm:text-base font-semibold tracking-wide uppercase text-foreground/80 mb-4">
            Faltan para la ceremonia
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-10 mb-5 sm:mb-6 text-sm sm:text-base text-foreground/85 px-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>
                🇧🇪
              </span>
              <span>
                <strong>Bélgica:</strong> {belgium.time}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>
                🇨🇱
              </span>
              <span>
                <strong>Chile:</strong> {chile.time}
              </span>
            </div>
          </div>
        </>
      )}

      <CountdownDigits countdown={countdown} />

      {!compact && (
        <p className="text-sm sm:text-base text-foreground/70 mt-5 sm:mt-6 capitalize px-2 leading-relaxed">
          {belgium.full} · En Chile: {chile.time}
        </p>
      )}

      {countdown.isToday && !compact && (
        <p className="mt-3 text-base sm:text-lg font-semibold text-gold animate-pulse-live">
          ¡Hoy es el día!
        </p>
      )}
    </div>
  );
}
