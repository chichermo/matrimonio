import Link from "next/link";
import { weddingConfig } from "@/lib/config";

export default function GuiaPage() {
  return (
    <main className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
      <h1
        className="text-2xl font-display font-semibold mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Guía para transmitir
      </h1>
      <p className="text-sm text-foreground/60 mb-8">
        Todo con YouTube — sin servicios extra
      </p>

      <section className="space-y-6 text-sm text-foreground/80">
        <div className="rounded-xl border border-gold/30 bg-cream p-5">
          <h2 className="font-semibold text-gold mb-3">1. Transmitir desde el teléfono</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Abre la app de <strong>YouTube</strong></li>
            <li>Toca <strong>+</strong> → <strong>Transmitir en vivo</strong></li>
            <li>Visibilidad: <strong>No listado</strong> (solo quien tenga el enlace)</li>
            <li>Apunta la cámara a la ceremonia e inicia</li>
          </ol>
        </div>

        <div className="rounded-xl border border-gold/30 bg-cream p-5">
          <h2 className="font-semibold text-gold mb-3">2. Conectar con tu página web</h2>
          <p className="mb-2">
            Cuando empiece el live, copia el ID del video de la URL:
          </p>
          <code className="block p-3 rounded-lg bg-white text-xs break-all border border-gold/20 mb-3">
            youtube.com/watch?v=<strong>ESTE_ES_EL_ID</strong>
          </code>
          <p>
            Ponlo en tu archivo <code>.env.local</code> como{" "}
            <code>NEXT_PUBLIC_YOUTUBE_VIDEO_ID</code> y reinicia el servidor (o
            actualiza la variable en Vercel y redeploy).
          </p>
          {weddingConfig.youtubeVideoId && (
            <p className="mt-2 text-xs text-sage">
              ID actual configurado: {weddingConfig.youtubeVideoId}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-gold/30 bg-cream p-5">
          <h2 className="font-semibold text-gold mb-3">3. Activar subtítulos automáticos</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>En YouTube Studio → tu transmisión → <strong>Configuración</strong></li>
            <li>Activa <strong>Subtítulos automáticos</strong> (o CC en vivo)</li>
            <li>Tu familia en Chile: botón <strong>CC</strong> → Traducir → <strong>Español</strong></li>
          </ol>
        </div>

        <div className="rounded-xl border border-gold/30 bg-cream p-5">
          <h2 className="font-semibold text-gold mb-3">4. Compartir con Chile</h2>
          <p className="mb-2">Envía por WhatsApp el enlace de tu sitio:</p>
          <code className="block p-3 rounded-lg bg-white text-xs break-all border border-gold/20">
            https://tu-sitio.vercel.app/vivo
          </code>
          <p className="mt-2 text-foreground/60">
            Ahí verán el video con marco bonito, el chat de YouTube integrado e
            instrucciones para los subtítulos en español.
          </p>
        </div>
      </section>

      <p className="text-center text-xs text-foreground/40 mt-8">
        <Link href="/vivo" className="hover:text-gold transition-colors">
          ← Ir a la transmisión
        </Link>
      </p>
    </main>
  );
}
