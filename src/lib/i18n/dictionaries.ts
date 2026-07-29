import type { Locale } from "./config";

const es = {
  home: {
    marriedIn: "Nos casamos en",
    forFamily: "Transmisión en vivo para nuestra familia en Chile",
    watchLive: "Ver transmisión",
    viewAlbum: "Ver álbum de fotos",
    watchOnTv: "Ver en Smart TV",
    guideLink: "Guía para transmitir con YouTube",
  },
  countdown: {
    days: "días",
    hours: "horas",
    minutes: "min",
    seconds: "seg",
    untilCeremony: "Faltan para la ceremonia",
    belgium: "Bélgica",
    chile: "Chile",
    inChile: "En Chile",
    grandDay: "¡Es el gran día!",
    startedAt: "La ceremonia comenzó a las",
    today: "¡Hoy es el día!",
  },
  vivo: {
    backHome: "← Inicio",
    tvVersion: "Versión TV",
    guide: "Guía",
  },
  chat: {
    titleCouple: "Mensajes para Liesbeth & Guillermo",
    titleShort: "Mensajes para la pareja",
    wishes: "Deja tus buenos deseos",
    writeName: "Escribe tu nombre y deja un mensaje",
    availableDuring: "Disponible durante la transmisión",
    closed: "El chat estará disponible cuando comience la transmisión",
    firstMessage: "Sé el primero en enviar un mensaje de cariño 💕",
    namePlaceholder: "Tu nombre",
    messagePlaceholder: "Tu mensaje...",
    send: "Enviar",
    needBoth: "Escribe tu nombre y un mensaje",
    sendError: "Error al enviar",
    sendFailed: "No se pudo enviar. Intenta de nuevo.",
  },
  captions: {
    title: "Subtítulos",
    intro:
      "Los subtítulos se activan solos si YouTube los tiene disponibles. Si no aparecen:",
    step1Before: "Toca",
    step1After: "en el reproductor",
    step2: "Configuración (engranaje) → Subtítulos",
    step3: "Traducir automáticamente → elige tu idioma",
    openYoutube: "Abrir en YouTube con subtítulos",
    hostTip:
      "Para que funcionen en vivo: en YouTube Studio → tu transmisión → Subtítulos → activa Subtítulos automáticos y elige el idioma de la ceremonia. Pueden tardar ~30 s en aparecer.",
  },
  watchTv: {
    title: "¿Ver en Smart TV?",
    subtitle: "Tres formas fáciles para ver en televisor",
    opt1Title: "Opción 1 · La más fácil",
    opt1Body:
      "Abre la app YouTube en tu TV y busca la transmisión, o usa este enlace:",
    openYoutube: "Abrir en YouTube",
    notReady: "Disponible cuando configures el video",
    opt2Title: "Opción 2 · Chromecast",
    opt2Body:
      "Desde el celular, abre esta página en Chrome y toca el ícono de Transmitir en el reproductor de YouTube.",
    opt3Title: "Opción 3 · Navegador de TV",
    opt3Body:
      "En Samsung, LG o Android TV, abre el navegador y visita la versión para TV:",
    openTv: "Abrir versión TV",
    qrHint: "También puedes escanear el código QR desde el celular:",
    scanTitle: "Escanea con el celular",
    scanBody:
      "Abre la cámara, escanea el QR y luego transmite a tu TV con Chromecast o AirPlay.",
    youtubeDirect: "Enlace directo YouTube:",
  },
  player: {
    watchLive: "Ver en vivo",
    refreshHint: "Actualiza esta página cuando comience la transmisión",
    autoConnect: "La transmisión se conectará automáticamente el día de la boda",
    startedCta: "La transmisión ya comenzó — ver en vivo",
  },
  tv: {
    liveStream: "Transmisión en vivo",
    live: "En vivo",
    fallback:
      "Si el video no carga, abre la app YouTube en tu TV y visita:",
    fullVersion: "Versión completa con chat",
  },
  album: {
    coverKicker: "Álbum de nuestro día",
    coverBody:
      "Un recorrido por los momentos de nuestra boda. Elige cómo quieres ver las fotos, o mira los videos por separado.",
    enter: "Entrar al álbum",
    photosVideos: "{photos} fotografías · {videos} videos",
    backHome: "← Volver al inicio",
    backCover: "← Portada",
    backMenu: "← Menú",
    howToWatch: "¿Cómo quieres mirar?",
    chooseExperience: "Elige tu experiencia",
    menuIntro:
      "Las fotos y los videos están separados para que puedas disfrutarlos a tu ritmo.",
    photos: "Fotos",
    videos: "Videos",
    gridTitle: "Galería",
    gridDesc:
      "Explora todas las fotos en un mural elegante. Ideal para mirar con calma.",
    carouselTitle: "Carrusel",
    carouselDesc:
      "Una foto a la vez, con miniaturas abajo. Desliza o usa las flechas.",
    storyTitle: "Presentación",
    storyDesc:
      "Pantalla completa con avance automático. Perfecta para compartir en familia.",
    viewVideos: "Ver videos",
    videosDesc:
      "Ceremonia completa en YouTube y clips cortos del día, en su propia sección.",
    open: "Abrir →",
    grid: "Galería",
    carousel: "Carrusel",
    story: "Presentación",
    swipeHint: "Desliza o usa ← →",
    exit: "Salir",
    pause: "Pausa",
    play: "Play",
    storyHint: "Toca lados · Espacio pausa · Esc salir",
    clipsKicker: "Clips del día",
    videosCount: "{count} videos · toca uno para reproducir",
    ceremonyTitle: "Ceremonia completa",
    ceremonySubtitle: "Desde el auto hasta el final · Transmisión grabada",
    clipTitle: "Clip {n}",
    clipSubtitle: "Momento del día",
  },
  lang: {
    label: "Idioma",
    auto: "Según tu dispositivo",
  },
} as const;

type DictShape = {
  -readonly [K in keyof typeof es]: {
    -readonly [P in keyof (typeof es)[K]]: string;
  };
};

const en: DictShape = {
  home: {
    marriedIn: "We're getting married in",
    forFamily: "Live stream for our family in Chile",
    watchLive: "Watch live",
    viewAlbum: "View photo album",
    watchOnTv: "Watch on Smart TV",
    guideLink: "Guide to stream with YouTube",
  },
  countdown: {
    days: "days",
    hours: "hours",
    minutes: "min",
    seconds: "sec",
    untilCeremony: "Countdown to the ceremony",
    belgium: "Belgium",
    chile: "Chile",
    inChile: "In Chile",
    grandDay: "It's the big day!",
    startedAt: "The ceremony started at",
    today: "Today is the day!",
  },
  vivo: {
    backHome: "← Home",
    tvVersion: "TV version",
    guide: "Guide",
  },
  chat: {
    titleCouple: "Messages for Liesbeth & Guillermo",
    titleShort: "Messages for the couple",
    wishes: "Leave your best wishes",
    writeName: "Enter your name and leave a message",
    availableDuring: "Available during the stream",
    closed: "Chat will be available when the stream starts",
    firstMessage: "Be the first to send a loving message 💕",
    namePlaceholder: "Your name",
    messagePlaceholder: "Your message...",
    send: "Send",
    needBoth: "Please enter your name and a message",
    sendError: "Error sending",
    sendFailed: "Couldn't send. Please try again.",
  },
  captions: {
    title: "Captions",
    intro:
      "Captions turn on automatically if YouTube has them. If they don't appear:",
    step1Before: "Tap",
    step1After: "on the player",
    step2: "Settings (gear) → Captions",
    step3: "Auto-translate → choose your language",
    openYoutube: "Open on YouTube with captions",
    hostTip:
      "For live captions: in YouTube Studio → your stream → Captions → turn on automatic captions and set the ceremony language. They may take ~30 s to appear.",
  },
  watchTv: {
    title: "Watch on Smart TV?",
    subtitle: "Three easy ways to watch on TV",
    opt1Title: "Option 1 · Easiest",
    opt1Body:
      "Open the YouTube app on your TV and find the stream, or use this link:",
    openYoutube: "Open on YouTube",
    notReady: "Available once the video is set up",
    opt2Title: "Option 2 · Chromecast",
    opt2Body:
      "From your phone, open this page in Chrome and tap Cast on the YouTube player.",
    opt3Title: "Option 3 · TV browser",
    opt3Body:
      "On Samsung, LG or Android TV, open the browser and visit the TV version:",
    openTv: "Open TV version",
    qrHint: "You can also scan the QR code from your phone:",
    scanTitle: "Scan with your phone",
    scanBody:
      "Open the camera, scan the QR, then cast to your TV with Chromecast or AirPlay.",
    youtubeDirect: "Direct YouTube link:",
  },
  player: {
    watchLive: "Watch live",
    refreshHint: "Refresh this page when the stream starts",
    autoConnect: "The stream will connect automatically on the wedding day",
    startedCta: "The stream has started — watch live",
  },
  tv: {
    liveStream: "Live stream",
    live: "Live",
    fallback: "If the video won't load, open the YouTube app on your TV and visit:",
    fullVersion: "Full version with chat",
  },
  album: {
    coverKicker: "Album of our day",
    coverBody:
      "A walk through the moments of our wedding. Choose how you want to see the photos, or watch the videos separately.",
    enter: "Enter the album",
    photosVideos: "{photos} photos · {videos} videos",
    backHome: "← Back home",
    backCover: "← Cover",
    backMenu: "← Menu",
    howToWatch: "How do you want to watch?",
    chooseExperience: "Choose your experience",
    menuIntro:
      "Photos and videos are separate so you can enjoy them at your own pace.",
    photos: "Photos",
    videos: "Videos",
    gridTitle: "Gallery",
    gridDesc: "Browse every photo in an elegant mural. Perfect for a calm look.",
    carouselTitle: "Carousel",
    carouselDesc: "One photo at a time, with thumbnails below. Swipe or use arrows.",
    storyTitle: "Slideshow",
    storyDesc:
      "Full screen with automatic advance. Great for sharing with family.",
    viewVideos: "Watch videos",
    videosDesc:
      "Full ceremony on YouTube and short clips from the day, in their own section.",
    open: "Open →",
    grid: "Gallery",
    carousel: "Carousel",
    story: "Slideshow",
    swipeHint: "Swipe or use ← →",
    exit: "Exit",
    pause: "Pause",
    play: "Play",
    storyHint: "Tap sides · Space to pause · Esc to exit",
    clipsKicker: "Clips from the day",
    videosCount: "{count} videos · tap one to play",
    ceremonyTitle: "Full ceremony",
    ceremonySubtitle: "From the car to the end · Recorded livestream",
    clipTitle: "Clip {n}",
    clipSubtitle: "A moment from the day",
  },
  lang: {
    label: "Language",
    auto: "Based on your device",
  },
};

const fr: DictShape = {
  home: {
    marriedIn: "Nous nous marions en",
    forFamily: "Diffusion en direct pour notre famille au Chili",
    watchLive: "Voir en direct",
    viewAlbum: "Voir l'album photo",
    watchOnTv: "Voir sur Smart TV",
    guideLink: "Guide pour diffuser avec YouTube",
  },
  countdown: {
    days: "jours",
    hours: "heures",
    minutes: "min",
    seconds: "sec",
    untilCeremony: "Compte à rebours jusqu'à la cérémonie",
    belgium: "Belgique",
    chile: "Chili",
    inChile: "Au Chili",
    grandDay: "C'est le grand jour !",
    startedAt: "La cérémonie a commencé à",
    today: "C'est aujourd'hui !",
  },
  vivo: {
    backHome: "← Accueil",
    tvVersion: "Version TV",
    guide: "Guide",
  },
  chat: {
    titleCouple: "Messages pour Liesbeth & Guillermo",
    titleShort: "Messages pour les mariés",
    wishes: "Laissez vos vœux",
    writeName: "Entrez votre nom et laissez un message",
    availableDuring: "Disponible pendant la diffusion",
    closed: "Le chat sera disponible au début de la diffusion",
    firstMessage: "Soyez le premier à envoyer un message d'amour 💕",
    namePlaceholder: "Votre nom",
    messagePlaceholder: "Votre message...",
    send: "Envoyer",
    needBoth: "Entrez votre nom et un message",
    sendError: "Erreur d'envoi",
    sendFailed: "Impossible d'envoyer. Réessayez.",
  },
  captions: {
    title: "Sous-titres",
    intro:
      "Les sous-titres s'activent seuls si YouTube les propose. S'ils n'apparaissent pas :",
    step1Before: "Touchez",
    step1After: "sur le lecteur",
    step2: "Paramètres (engrenage) → Sous-titres",
    step3: "Traduire automatiquement → choisissez votre langue",
    openYoutube: "Ouvrir sur YouTube avec sous-titres",
    hostTip:
      "Pour le direct : dans YouTube Studio → votre diffusion → Sous-titres → activez les sous-titres automatiques et choisissez la langue de la cérémonie. Ils peuvent mettre ~30 s à apparaître.",
  },
  watchTv: {
    title: "Voir sur Smart TV ?",
    subtitle: "Trois façons simples de regarder à la télé",
    opt1Title: "Option 1 · La plus simple",
    opt1Body:
      "Ouvrez l'appli YouTube sur votre TV et cherchez la diffusion, ou utilisez ce lien :",
    openYoutube: "Ouvrir sur YouTube",
    notReady: "Disponible une fois la vidéo configurée",
    opt2Title: "Option 2 · Chromecast",
    opt2Body:
      "Depuis le téléphone, ouvrez cette page dans Chrome et touchez Diffuser sur le lecteur YouTube.",
    opt3Title: "Option 3 · Navigateur TV",
    opt3Body:
      "Sur Samsung, LG ou Android TV, ouvrez le navigateur et visitez la version TV :",
    openTv: "Ouvrir version TV",
    qrHint: "Vous pouvez aussi scanner le QR code depuis le téléphone :",
    scanTitle: "Scannez avec le téléphone",
    scanBody:
      "Ouvrez l'appareil photo, scannez le QR, puis diffusez vers la TV avec Chromecast ou AirPlay.",
    youtubeDirect: "Lien YouTube direct :",
  },
  player: {
    watchLive: "Voir en direct",
    refreshHint: "Actualisez cette page quand la diffusion commence",
    autoConnect:
      "La diffusion se connectera automatiquement le jour du mariage",
    startedCta: "La diffusion a commencé — voir en direct",
  },
  tv: {
    liveStream: "Diffusion en direct",
    live: "En direct",
    fallback:
      "Si la vidéo ne charge pas, ouvrez l'appli YouTube sur votre TV et visitez :",
    fullVersion: "Version complète avec chat",
  },
  album: {
    coverKicker: "Album de notre journée",
    coverBody:
      "Un parcours à travers les moments de notre mariage. Choisissez comment voir les photos, ou regardez les vidéos à part.",
    enter: "Entrer dans l'album",
    photosVideos: "{photos} photos · {videos} vidéos",
    backHome: "← Retour à l'accueil",
    backCover: "← Couverture",
    backMenu: "← Menu",
    howToWatch: "Comment voulez-vous regarder ?",
    chooseExperience: "Choisissez votre expérience",
    menuIntro:
      "Les photos et les vidéos sont séparées pour que vous puissiez en profiter à votre rythme.",
    photos: "Photos",
    videos: "Vidéos",
    gridTitle: "Galerie",
    gridDesc:
      "Parcourez toutes les photos dans une mosaïque élégante. Idéal pour regarder tranquillement.",
    carouselTitle: "Carrousel",
    carouselDesc:
      "Une photo à la fois, avec miniatures en bas. Glissez ou utilisez les flèches.",
    storyTitle: "Diaporama",
    storyDesc:
      "Plein écran avec avance automatique. Parfait à partager en famille.",
    viewVideos: "Voir les vidéos",
    videosDesc:
      "Cérémonie complète sur YouTube et courts clips de la journée, dans leur propre section.",
    open: "Ouvrir →",
    grid: "Galerie",
    carousel: "Carrousel",
    story: "Diaporama",
    swipeHint: "Glissez ou utilisez ← →",
    exit: "Quitter",
    pause: "Pause",
    play: "Lecture",
    storyHint: "Touchez les côtés · Espace pause · Échap quitter",
    clipsKicker: "Clips de la journée",
    videosCount: "{count} vidéos · touchez-en une pour lire",
    ceremonyTitle: "Cérémonie complète",
    ceremonySubtitle: "De la voiture jusqu'à la fin · Direct enregistré",
    clipTitle: "Clip {n}",
    clipSubtitle: "Un moment de la journée",
  },
  lang: {
    label: "Langue",
    auto: "Selon votre appareil",
  },
};

export type Dictionary = DictShape;

export const dictionaries: Record<Locale, Dictionary> = {
  es: es as DictShape,
  en,
  fr,
};

export function t(
  template: string,
  vars: Record<string, string | number>
): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template
  );
}
