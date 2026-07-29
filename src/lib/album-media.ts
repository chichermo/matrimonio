export type MediaItem =
  | { type: "photo"; src: string }
  | { type: "video"; src: string; poster: string };

export const MEDIA: MediaItem[] = [
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
export const PHOTO_COUNT = MEDIA.filter((m) => m.type === "photo").length;

export type PhotoItem = Extract<MediaItem, { type: "photo" }>;
export type VideoItem = Extract<MediaItem, { type: "video" }>;

export const PHOTOS: PhotoItem[] = MEDIA.filter(
  (m): m is PhotoItem => m.type === "photo"
);

/** Videos locales convertidos desde el teléfono */
const LOCAL_VIDEOS: VideoItem[] = MEDIA.filter(
  (m): m is VideoItem => m.type === "video"
);

export type AlbumVideo =
  | {
      kind: "youtube";
      id: string;
      youtubeId: string;
      title: string;
      subtitle?: string;
    }
  | {
      kind: "file";
      id: string;
      src: string;
      poster: string;
      title: string;
      subtitle?: string;
    };

/** Sección de videos del álbum (YouTube + clips locales) */
export const ALBUM_VIDEOS: AlbumVideo[] = [
  {
    kind: "youtube",
    id: "ceremony-live",
    youtubeId: "izGrNpQGnhQ",
    title: "Ceremonia completa",
    subtitle: "Desde el auto hasta el final · Transmisión grabada",
  },
  ...LOCAL_VIDEOS.map((v, i) => ({
    kind: "file" as const,
    id: v.src,
    src: v.src,
    poster: v.poster,
    title: `Clip ${i + 1}`,
    subtitle: "Momento del día",
  })),
];

export const VIDEO_COUNT = ALBUM_VIDEOS.length;

export const VIDEOS = LOCAL_VIDEOS;

export function mediaThumb(item: MediaItem): string {
  return item.type === "video" ? item.poster : item.src;
}

export function youtubeThumb(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}
