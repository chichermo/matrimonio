export const weddingConfig = {
  coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES ?? "Nuestra Boda",
  weddingDate: process.env.NEXT_PUBLIC_WEDDING_DATE ?? "10 de Julio de 2026",
  location: process.env.NEXT_PUBLIC_WEDDING_LOCATION ?? "Bélgica",
  /** 14:00 hora de Bélgica (CEST, UTC+2) */
  weddingDateTime:
    process.env.NEXT_PUBLIC_WEDDING_DATETIME ?? "2026-07-10T14:00:00+02:00",
  belgiumTimezone: "Europe/Brussels",
  chileTimezone: "America/Santiago",
  youtubeVideoId: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID ?? "",
  offlineMessage:
    process.env.NEXT_PUBLIC_OFFLINE_MESSAGE ??
    "La transmisión comenzará pronto. ¡Gracias por acompañarnos desde Chile!",
};

export function getWeddingDate(): Date {
  return new Date(weddingConfig.weddingDateTime);
}
