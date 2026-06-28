export function CaptionsHint() {
  return (
    <div className="rounded-lg bg-foreground/5 border border-gold/20 px-3 py-3 sm:px-4 sm:py-3 text-xs sm:text-sm text-foreground/70">
      <p className="font-medium text-foreground/90 mb-1.5">Subtítulos en español</p>
      <p className="leading-relaxed">
        Toca{" "}
        <span className="inline-flex items-center justify-center w-6 h-4 rounded bg-foreground/10 text-[10px] font-bold align-middle">
          CC
        </span>{" "}
        en el video → <strong>Configuración</strong> → <strong>Subtítulos</strong> →{" "}
        <strong>Traducir automáticamente</strong> → <strong>Español</strong>.
      </p>
      <p className="text-[11px] sm:text-xs text-foreground/50 mt-2">
        Requiere subtítulos automáticos activados en YouTube.
      </p>
    </div>
  );
}
