"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LANGUAGE_STORAGE_KEY, LANGUAGE_COOKIE_KEY, DEFAULT_LOCALE, isValidLocale, type Locale } from "@/lib/i18n/constants";

interface LanguageContextType {
  locale: Locale;
  hasSelectedLanguage: boolean;
  isLanguageScreenVisible: boolean;
  setLocale: (locale: Locale, remember?: boolean) => void;
  hideLanguageScreen: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [isLanguageScreenVisible, setIsLanguageScreenVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already selected a language
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const cookieLocale = getCookieLocale();
    
    if (stored && isValidLocale(stored)) {
      setHasSelectedLanguage(true);
      setIsLanguageScreenVisible(false);
    } else if (cookieLocale && isValidLocale(cookieLocale)) {
      setHasSelectedLanguage(true);
      setIsLanguageScreenVisible(false);
    } else {
      // First visit – show language screen
      setHasSelectedLanguage(false);
      setIsLanguageScreenVisible(true);
    }
  }, []);

  const setLocale = (newLocale: Locale, remember = true) => {
    setLocaleState(newLocale);
    if (remember) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale);
      document.cookie = `${LANGUAGE_COOKIE_KEY}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
    setHasSelectedLanguage(true);
    setIsLanguageScreenVisible(false);
  };

  const hideLanguageScreen = () => {
    setIsLanguageScreenVisible(false);
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ locale, hasSelectedLanguage, isLanguageScreenVisible, setLocale, hideLanguageScreen }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

function getCookieLocale(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${LANGUAGE_COOKIE_KEY}=([^;]+)`));
  return match ? match[1] : null;
}
