export function CaptionsHint() {
  return (
    <div className="rounded-lg bg-foreground/5 border border-gold/20 px-4 py-3 text-sm text-foreground/70">
      <p className="font-medium text-foreground/90 mb-1">Subtítulos en español</p>
      <p>
        En el reproductor, toca el ícono{" "}
        <span className="inline-flex items-center justify-center w-6 h-4 rounded bg-foreground/10 text-xs font-bold align-middle">
          CC
        </span>{" "}
        → <strong>Configuración</strong> → <strong>Subtítulos</strong> →{" "}
        <strong>Traducir automáticamente</strong> → elige <strong>Español</strong>.
      </p>
      <p className="text-xs text-foreground/50 mt-2">
        Funciona cuando la transmisión tiene subtítulos automáticos activados en YouTube.
      </p>
    </div>
  );
}
