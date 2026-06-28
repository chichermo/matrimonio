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
    <div className="flex flex-col items-center min-w-[4.5rem] sm:min-w-[5.5rem]">
      <span
        className="text-3xl sm:text-5xl font-display font-semibold tabular-nums text-foreground"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs sm:text-sm uppercase tracking-wider text-foreground/50 mt-1">
        {label}
      </span>
    </div>
  );
}

function CountdownDigits({ countdown }: { countdown: CountdownState }) {
  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      <CountdownUnit value={countdown.days} label="días" />
      <span className="text-2xl sm:text-4xl text-gold/60 self-start pt-1">:</span>
      <CountdownUnit value={countdown.hours} label="horas" />
      <span className="text-2xl sm:text-4xl text-gold/60 self-start pt-1">:</span>
      <CountdownUnit value={countdown.minutes} label="min" />
      <span className="text-2xl sm:text-4xl text-gold/60 self-start pt-1">:</span>
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
      <div className={`text-center ${compact ? "" : "rounded-xl border border-gold/25 bg-cream/80 px-6 py-8"}`}>
        <p className="text-lg sm:text-xl font-display text-gold" style={{ fontFamily: "var(--font-playfair)" }}>
          ¡Es el gran día!
        </p>
        {!compact && (
          <p className="text-sm text-foreground/60 mt-2">
            La ceremonia comenzó a las {belgium.time} en Bélgica · {chile.time} en Chile
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`text-center ${compact ? "" : "rounded-xl border border-gold/25 bg-cream/80 px-4 sm:px-6 py-6 sm:py-8"}`}>
      {!compact && (
        <>
          <p className="text-sm tracking-[0.25em] uppercase text-sage mb-4">
            Faltan para la ceremonia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 mb-6 text-sm text-foreground/70">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>🇧🇪</span>
              <span>
                <strong>Bélgica:</strong> {belgium.time}
              </span>
            </div>
            <div className="hidden sm:block text-gold/40">|</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>🇨🇱</span>
              <span>
                <strong>Chile:</strong> {chile.time}
              </span>
            </div>
          </div>
        </>
      )}

      <CountdownDigits countdown={countdown} />

      {!compact && (
        <p className="text-xs text-foreground/45 mt-5 capitalize">
          {belgium.full} · En Chile: {chile.time}
        </p>
      )}

      {countdown.isToday && !compact && (
        <p className="mt-3 text-sm font-medium text-gold animate-pulse-live">
          ¡Hoy es el día!
        </p>
      )}
    </div>
  );
}
