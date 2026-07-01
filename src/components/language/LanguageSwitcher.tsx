"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGE_STORAGE_KEY, LANGUAGE_COOKIE_KEY, type Locale } from "@/lib/i18n/constants";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: "en" as Locale, label: "English", flag: "🇬🇧" },
    { code: "te" as Locale, label: "తెలుగు", flag: "🇮🇳" },
  ];

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  const handleSwitch = (newLocale: Locale) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale);
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C9A84C]/30 hover:border-[#C9A84C] transition-all duration-200 text-sm text-white hover:bg-[#C9A84C]/10 disabled:opacity-60"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="font-medium text-[#E8C97A]">{currentLang.label}</span>
        <svg
          className={`w-3 h-3 text-[#C9A84C] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-40 rounded-xl overflow-hidden z-50"
              role="listbox"
              style={{
                background: "rgba(61, 8, 18, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSwitch(lang.code)}
                  role="option"
                  aria-selected={lang.code === locale}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 ${
                    lang.code === locale
                      ? "bg-[#C9A84C]/20 text-[#E8C97A]"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                  {lang.code === locale && (
                    <svg className="ml-auto w-4 h-4 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
