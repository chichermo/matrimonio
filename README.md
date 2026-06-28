# Transmisión en vivo — Boda en Bélgica

Página web para transmitir tu matrimonio del **10 de julio** a tu familia en Chile.

## Qué incluye

- **Video en vivo** vía YouTube (desde el teléfono)
- **Marco elegante** en `/vivo`
- **Chat propio** — nombre + mensaje, solo durante la transmisión (sin Supabase)
- **Subtítulos** vía YouTube (CC → Traducir → Español)

## Configuración en Vercel

```env
NEXT_PUBLIC_COUPLE_NAMES=Liesbeth & Guillermo
NEXT_PUBLIC_WEDDING_DATE=10 de Julio de 2026
NEXT_PUBLIC_WEDDING_DATETIME=2026-07-10T14:00:00+02:00
NEXT_PUBLIC_YOUTUBE_VIDEO_ID=izGrNpQGnhQ
NEXT_PUBLIC_SITE_URL=https://matrimonio-coral.vercel.app
```

Enlace para la familia: **https://matrimonio-coral.vercel.app/vivo**

## Chat

- Sin base de datos ni cuentas extra
- Abierto desde **13:45** (15 min antes) hasta **2 h** después de la ceremonia
- Los mensajes se borran solos al cerrarse la ventana

Para probar el chat antes del día: `CHAT_FORCE_OPEN=true` en Vercel.

¡Felicitaciones! 💒
