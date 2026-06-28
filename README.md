# Transmisión en vivo — Boda en Bélgica

Página web para transmitir tu matrimonio del **10 de julio** a tu familia en Chile.

## Qué incluye

- **Enlace** (`/vivo`) para compartir por WhatsApp
- **Marco elegante** alrededor del video de YouTube
- **Chat propio** — nombre + mensaje, en tiempo real (Supabase gratis)
- **Subtítulos en español** — vía subtítulos automáticos de YouTube

## Configuración

```bash
npm install
cp .env.example .env.local
```

### 1. Variables básicas

```env
NEXT_PUBLIC_COUPLE_NAMES=Liesbeth & Guillermo
NEXT_PUBLIC_WEDDING_DATE=10 de Julio de 2026
NEXT_PUBLIC_YOUTUBE_VIDEO_ID=izGrNpQGnhQ
```

### 2. Chat (Supabase — 5 minutos, gratis)

1. Crea cuenta en [supabase.com](https://supabase.com)
2. Nuevo proyecto → **SQL Editor** → pega y ejecuta `supabase/schema.sql`
3. **Database → Replication** → activa la tabla `messages`
4. **Settings → API** → copia URL y `anon` key a Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### 3. Publicar en Vercel

1. Importa el repo en [vercel.com](https://vercel.com)
2. Agrega todas las variables de entorno
3. Enlace final: `https://matrimonio-coral.vercel.app/vivo`

## El día de la boda

1. YouTube app → transmitir en vivo (no listado)
2. Comparte `/vivo` por WhatsApp
3. La familia ve el video y deja mensajes en el chat del sitio

¡Felicitaciones! 💒
