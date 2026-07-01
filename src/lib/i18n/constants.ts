export const LOCALES = ["en", "te"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  te: "తెలుగు",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  te: "🇮🇳",
};

export const LANGUAGE_STORAGE_KEY = "ska-events-language";
export const LANGUAGE_COOKIE_KEY = "ska-events-locale";

export const isValidLocale = (locale: string): locale is Locale => {
  return LOCALES.includes(locale as Locale);
};
