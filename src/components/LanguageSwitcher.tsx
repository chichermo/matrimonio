"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  locales,
  localeLabels,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/config";
import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-cream/80 p-1 backdrop-blur ${className}`}
      role="group"
      aria-label={dict.lang.label}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            disabled={pending}
            onClick={() => setLocale(code)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition ${
              active
                ? "bg-gold text-white"
                : "text-foreground/60 hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
