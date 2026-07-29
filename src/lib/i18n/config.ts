export const locales = ["es", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "wedding-locale";

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Detecta idioma desde Accept-Language o navigator.language */
export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        q: qPart ? Number.parseFloat(qPart) : 1,
      };
    })
    .filter((c) => c.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const primary = tag.split("-")[0];
    if (primary === "es") return "es";
    if (primary === "en") return "en";
    if (primary === "fr") return "fr";
    // Neerlandés (Bélgica/Países Bajos) → inglés como puente
    if (primary === "nl") return "en";
  }

  return defaultLocale;
}

export function localeToBcp47(locale: Locale): string {
  if (locale === "es") return "es-CL";
  if (locale === "fr") return "fr-BE";
  return "en-GB";
}
