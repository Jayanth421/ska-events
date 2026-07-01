"use client";

import { useState, useEffect } from "react";
import LanguageSelectionScreen from "@/components/language/LanguageSelectionScreen";
import {
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_COOKIE_KEY,
  isValidLocale,
  type Locale,
} from "@/lib/i18n/constants";

interface Props {
  children: React.ReactNode;
  locale: string;
}

function getCookieLocale(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`${LANGUAGE_COOKIE_KEY}=([^;]+)`)
  );
  return match ? match[1] : null;
}

export default function LanguageScreenGate({ children, locale }: Props) {
  const [showLanguageScreen, setShowLanguageScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const cookie = getCookieLocale();

    const hasPreference =
      (stored && isValidLocale(stored)) || (cookie && isValidLocale(cookie));

    if (!hasPreference) {
      setShowLanguageScreen(true);
    }
  }, []);

  const handleLanguageSelected = (selectedLocale: Locale) => {
    setShowLanguageScreen(false);
  };

  if (!mounted) {
    // SSR / hydration: show children immediately (no flash)
    return <>{children}</>;
  }

  return (
    <>
      {showLanguageScreen && (
        <LanguageSelectionScreen onLanguageSelected={handleLanguageSelected} />
      )}
      {children}
    </>
  );
}
