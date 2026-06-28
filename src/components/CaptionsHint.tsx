import { getYouTubeWatchUrl } from "@/lib/config";

export function CaptionsHint() {
  const youtubeUrl = getYouTubeWatchUrl();
  const watchWithCc = youtubeUrl
    ? `${youtubeUrl}&cc_load_policy=1&cc_lang_pref=es&hl=es`
    : "";

  return (
    <div className="rounded-lg bg-foreground/5 border border-gold/20 px-4 py-4 sm:px-5 sm:py-4 text-sm sm:text-base text-foreground/85 space-y-3">
      <div>
        <p className="font-semibold text-foreground mb-2">Subtítulos en español</p>
        <p className="leading-relaxed">
          Los subtítulos se activan solos si YouTube los tiene disponibles. Si no aparecen:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1.5 leading-relaxed">
          <li>
            Toca{" "}
            <span className="inline-flex items-center justify-center w-7 h-5 rounded bg-foreground/15 text-xs font-bold align-middle">
              CC
            </span>{" "}
            en el reproductor
          </li>
          <li>
            <strong>Configuración</strong> (engranaje) → <strong>Subtítulos</strong>
          </li>
          <li>
            <strong>Traducir automáticamente</strong> → elige <strong>Español</strong>
          </li>
        </ol>
      </div>

      {watchWithCc && (
        <a
          href={watchWithCc}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
        >
          Abrir en YouTube con subtítulos
        </a>
      )}

      <p className="text-sm text-foreground/65 leading-relaxed">
        <strong>Para que funcionen en vivo:</strong> en YouTube Studio → tu transmisión →{" "}
        <strong>Subtítulos</strong> → activa <strong>Subtítulos automáticos</strong> y elige el
        idioma de la ceremonia (holandés, francés o inglés). Pueden tardar ~30 s en aparecer tras
        empezar a hablar.
      </p>
    </div>
  );
}
