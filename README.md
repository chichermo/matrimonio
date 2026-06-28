# Transmisión en vivo — Boda en Bélgica

Página web para transmitir tu matrimonio del **10 de julio** a tu familia en Chile. Solo usa **YouTube** — sin Supabase, sin Deepgram, sin cuentas extra.

## Qué incluye

- **Enlace** (`/vivo`) para compartir por WhatsApp
- **Marco elegante** alrededor del video de YouTube
- **Chat en vivo** — el chat nativo de YouTube embebido en la página
- **Subtítulos en español** — vía subtítulos automáticos de YouTube + traducción del reproductor

## Configuración (5 minutos)

```bash
npm install
cp .env.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_COUPLE_NAMES=Tu Nombre & Nombre de tu pareja
NEXT_PUBLIC_WEDDING_DATE=10 de Julio de 2026
NEXT_PUBLIC_YOUTUBE_VIDEO_ID=   # lo pones el día del evento
```

```bash
npm run dev
```

- Familia: http://localhost:3000/vivo
- Guía: http://localhost:3000/guia

### Publicar en internet (Vercel, gratis)

1. Sube el proyecto a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Agrega las variables de `.env.local`
4. Tu enlace final: `https://tu-boda.vercel.app/vivo`

## El día de la boda

1. **YouTube app** → **+** → **Transmitir en vivo** → **No listado**
2. Copia el ID del video y actualiza `NEXT_PUBLIC_YOUTUBE_VIDEO_ID` en Vercel
3. Activa **subtítulos automáticos** en la configuración del live
4. Comparte `https://tu-sitio.vercel.app/vivo` con tu familia

Instrucciones detalladas en `/guia`.

## Subtítulos en español (para la familia)

En el reproductor: **CC** → Configuración → Subtítulos → **Traducir automáticamente** → **Español**

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con enlace a la transmisión |
| `/vivo` | Video + marco + chat de YouTube |
| `/guia` | Instrucciones para transmitir |

¡Felicitaciones por tu matrimonio!
