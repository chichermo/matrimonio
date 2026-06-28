import { weddingConfig } from "./config";

type DateTimeParts = {
  weekday: string;
  day: string;
  month: string;
  year: string;
  time: string;
};

function formatParts(date: Date, timeZone: string): DateTimeParts {
  const formatter = new Intl.DateTimeFormat("es", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    day: get("day"),
    month: get("month"),
    year: get("year"),
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function formatWeddingInBelgium(date: Date) {
  const p = formatParts(date, weddingConfig.belgiumTimezone);
  return {
    label: "Bélgica",
    full: `${p.weekday} ${p.day} de ${p.month} de ${p.year}, ${p.time} h`,
    time: `${p.time} h`,
  };
}

export function formatWeddingInChile(date: Date) {
  const p = formatParts(date, weddingConfig.chileTimezone);
  return {
    label: "Chile",
    full: `${p.weekday} ${p.day} de ${p.month} de ${p.year}, ${p.time} h`,
    time: `${p.time} h`,
  };
}

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
};

export function getCountdown(target: Date, now = new Date()): CountdownState {
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isToday: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const belgiumNow = new Intl.DateTimeFormat("en-CA", {
    timeZone: weddingConfig.belgiumTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const belgiumTarget = new Intl.DateTimeFormat("en-CA", {
    timeZone: weddingConfig.belgiumTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(target);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    isToday: belgiumNow === belgiumTarget,
  };
}
