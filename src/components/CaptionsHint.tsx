export function CaptionsHint() {
  return (
    <div className="rounded-lg bg-foreground/5 border border-gold/20 px-4 py-4 sm:px-5 sm:py-4 text-sm sm:text-base text-foreground/85">
      <p className="font-semibold text-foreground mb-2">Subtítulos en español</p>
      <p className="leading-relaxed">
        Toca{" "}
        <span className="inline-flex items-center justify-center w-7 h-5 rounded bg-foreground/15 text-xs font-bold align-middle">
          CC
        </span>{" "}
        en el video → <strong>Configuración</strong> → <strong>Subtítulos</strong> →{" "}
        <strong>Traducir automáticamente</strong> → <strong>Español</strong>.
      </p>
      <p className="text-sm text-foreground/65 mt-2">
        Requiere subtítulos automáticos activados en YouTube.
      </p>
    </div>
  );
}
