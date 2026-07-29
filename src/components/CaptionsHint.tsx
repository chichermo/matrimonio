"use client";

import { getYouTubeWatchUrl } from "@/lib/config";
import { useI18n } from "@/components/I18nProvider";

export function CaptionsHint() {
  const { dict, locale } = useI18n();
  const youtubeUrl = getYouTubeWatchUrl();
  const watchWithCc = youtubeUrl
    ? `${youtubeUrl}&cc_load_policy=1&cc_lang_pref=${locale}&hl=${locale}`
    : "";

  return (
    <div className="space-y-3 rounded-lg border border-gold/20 bg-foreground/5 px-4 py-4 text-sm text-foreground/85 sm:px-5 sm:py-4 sm:text-base">
      <div>
        <p className="mb-2 font-semibold text-foreground">{dict.captions.title}</p>
        <p className="leading-relaxed">{dict.captions.intro}</p>
        <ol className="mt-2 list-inside list-decimal space-y-1.5 leading-relaxed">
          <li>
            {dict.captions.step1Before}{" "}
            <span className="inline-flex h-5 w-7 items-center justify-center rounded bg-foreground/15 align-middle text-xs font-bold">
              CC
            </span>{" "}
            {dict.captions.step1After}
          </li>
          <li>{dict.captions.step2}</li>
          <li>{dict.captions.step3}</li>
        </ol>
      </div>

      {watchWithCc && (
        <a
          href={watchWithCc}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target inline-flex w-full items-center justify-center rounded-lg border border-gold px-4 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 sm:w-auto"
        >
          {dict.captions.openYoutube}
        </a>
      )}

      <p className="text-sm leading-relaxed text-foreground/65">
        {dict.captions.hostTip}
      </p>
    </div>
  );
}
