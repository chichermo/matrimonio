import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  detectLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const headerStore = await headers();
  return detectLocale(headerStore.get("accept-language"));
}

export async function getDictionary(): Promise<{
  locale: Locale;
  dict: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, dict: dictionaries[locale] };
}
