export const weddingConfig = {
  coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES ?? "Nuestra Boda",
  weddingDate: process.env.NEXT_PUBLIC_WEDDING_DATE ?? "10 de Julio de 2026",
  location: process.env.NEXT_PUBLIC_WEDDING_LOCATION ?? "Bélgica",
  youtubeVideoId: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID ?? "",
  offlineMessage:
    process.env.NEXT_PUBLIC_OFFLINE_MESSAGE ??
    "La transmisión comenzará pronto. ¡Gracias por acompañarnos desde Chile!",
};
