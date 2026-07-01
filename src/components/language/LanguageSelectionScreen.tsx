"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_COOKIE_KEY,
  type Locale,
} from "@/lib/i18n/constants";

interface LanguageSelectionScreenProps {
  onLanguageSelected: (locale: Locale) => void;
}

export default function LanguageSelectionScreen({
  onLanguageSelected,
}: LanguageSelectionScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>("en");
  const [rememberLanguage, setRememberLanguage] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleContinue = () => {
    if (rememberLanguage) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
      document.cookie = `${LANGUAGE_COOKIE_KEY}=${selectedLanguage}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
    setIsVisible(false);
    setTimeout(() => {
      onLanguageSelected(selectedLanguage);
      router.push(`/${selectedLanguage}`);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="language-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-select-title"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-maroon-deep overflow-hidden">
            {/* Mandala SVG Decorations */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
              <MandalaDecoration />
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-48 h-48 opacity-30">
              <CornerOrnament className="w-full h-full text-gold-DEFAULT" />
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 opacity-30 rotate-90">
              <CornerOrnament className="w-full h-full text-gold-DEFAULT" />
            </div>
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-30 -rotate-90">
              <CornerOrnament className="w-full h-full text-gold-DEFAULT" />
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-30 rotate-180">
              <CornerOrnament className="w-full h-full text-gold-DEFAULT" />
            </div>

            {/* Traditional lamps */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 hidden md:block">
              <DivaLamp />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hidden md:block">
              <DivaLamp />
            </div>

            {/* Gold pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="floral" patternUnits="userSpaceOnUse" width="80" height="80">
                    <circle cx="40" cy="40" r="1.5" fill="#C9A84C" />
                    <circle cx="0" cy="0" r="1.5" fill="#C9A84C" />
                    <circle cx="80" cy="0" r="1.5" fill="#C9A84C" />
                    <circle cx="0" cy="80" r="1.5" fill="#C9A84C" />
                    <circle cx="80" cy="80" r="1.5" fill="#C9A84C" />
                    <path d="M40,20 Q50,40 40,60 Q30,40 40,20Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                    <path d="M20,40 Q40,50 60,40 Q40,30 20,40Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#floral)" />
              </svg>
            </div>

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3D0812]/90 via-[#6B0F1A]/80 to-[#3D0812]/90" />
          </div>

          {/* Center Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            {/* Glassmorphism Card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(201, 168, 76, 0.2)",
              }}
            >
              {/* Gold top border accent */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

              <div className="px-8 py-10 text-center">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center mb-6"
                >
                  <div
                    
                  >
                    <img
                      src="https://i.ibb.co/M53N94sJ/640456935-18020611619650208-6330034363367840394-n.png"
                      alt="SKA Events Logo"
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  <div className="text-[#C9A84C] font-serif tracking-[0.3em] text-sm font-semibold">
                    SKA EVENTS
                  </div>

                  <div className="text-[#E8C97A]/60 text-xs tracking-[0.2em] mt-0.5">
                    Your Vision , Our Creation
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
                </div>

                {/* Welcome text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-2"
                >
                  <h2 className="text-white text-2xl font-serif font-semibold">
                    Welcome
                  </h2>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-1"
                >
                  <p className="text-[#E8C97A] text-sm">
                    Choose Your Preferred Language
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mb-7"
                >
                  <p className="text-[#C9A84C]/80 text-sm font-telugu">
                    మీకు ఇష్టమైన భాషను ఎంచుకోండి
                  </p>
                </motion.div>

                {/* Language Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  {/* Telugu Button */}
                  <button
                    onClick={() => setSelectedLanguage("te")}
                    aria-pressed={selectedLanguage === "te"}
                    className={`relative rounded-xl py-4 px-5 text-center transition-all duration-300 group ${selectedLanguage === "te"
                      ? "ring-2 ring-[#C9A84C]"
                      : "ring-1 ring-white/10 hover:ring-[#C9A84C]/50"
                      }`}
                    style={{
                      background:
                        selectedLanguage === "te"
                          ? "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {selectedLanguage === "te" && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke="#3D0812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className="text-2xl mb-1">🇮🇳</div>
                    <div className="text-white font-serif text-lg font-medium">తెలుగు</div>
                    <div className="text-[#E8C97A]/60 text-xs mt-0.5">Telugu</div>
                  </button>

                  {/* English Button */}
                  <button
                    onClick={() => setSelectedLanguage("en")}
                    aria-pressed={selectedLanguage === "en"}
                    className={`relative rounded-xl py-4 px-5 text-center transition-all duration-300 group ${selectedLanguage === "en"
                      ? "ring-2 ring-[#C9A84C]"
                      : "ring-1 ring-white/10 hover:ring-[#C9A84C]/50"
                      }`}
                    style={{
                      background:
                        selectedLanguage === "en"
                          ? "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.1))"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {selectedLanguage === "en" && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke="#3D0812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className="text-2xl mb-1">🇬🇧</div>
                    <div className="text-white font-serif text-lg font-medium">English</div>
                    <div className="text-[#E8C97A]/60 text-xs mt-0.5">English</div>
                  </button>
                </motion.div>

                {/* Remember checkbox */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-2 mb-7"
                >
                  <button
                    onClick={() => setRememberLanguage(!rememberLanguage)}
                    aria-checked={rememberLanguage}
                    role="checkbox"
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded border transition-all duration-200 flex items-center justify-center ${rememberLanguage
                        ? "bg-[#C9A84C] border-[#C9A84C]"
                        : "border-white/30 group-hover:border-[#C9A84C]/60"
                        }`}
                      style={{ width: "18px", height: "18px" }}
                    >
                      {rememberLanguage && (
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke="#3D0812" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/70 text-sm">
                      {selectedLanguage === "te" ? "నా భాష గుర్తుంచుకో" : "Remember my language"}
                    </span>
                  </button>
                </motion.div>

                {/* Continue Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  onClick={handleContinue}
                  className="w-full py-3.5 rounded-xl font-semibold text-[#3D0812] tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
                    boxShadow: "0 4px 20px rgba(201, 168, 76, 0.4), 0 0 0 1px rgba(201, 168, 76, 0.3)",
                  }}
                >
                  {selectedLanguage === "te" ? "కొనసాగించు" : "Continue"}
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 inline ml-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </motion.button>
              </div>

              {/* Gold bottom border accent */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
            </div>
          </motion.div >
        </motion.div >
      )
      }
    </AnimatePresence >
  );
}

// ─── Internal SVG Decorations ───────────────────────────────────────────────

function MandalaDecoration() {
  return (
    <svg viewBox="0 0 600 600" className="w-[90vmin] h-[90vmin] text-gold-DEFAULT" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x1 = 300 + 50 * Math.cos(rad);
          const y1 = 300 + 50 * Math.sin(rad);
          const x2 = 300 + 280 * Math.cos(rad);
          const y2 = 300 + 280 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.4" />;
        })}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const cx = 300 + 200 * Math.cos(rad);
          const cy = 300 + 200 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />;
        })}
      </g>
    </svg>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L160 0 L160 10 Q80 10 10 80 L0 80 Z" fill="currentColor" opacity="0.6" />
      <path d="M0 0 L0 160 L10 160 Q10 80 80 10 L80 0 Z" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="40" cy="20" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="40" r="3" fill="currentColor" opacity="0.5" />
      <path d="M30 10 Q50 30 30 50 Q10 30 30 10Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function DivaLamp() {
  return (
    <svg viewBox="0 0 60 160" className="w-12 h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <ellipse cx="30" cy="18" rx="6" ry="10" fill="#FFD700" opacity="0.9" />
      <ellipse cx="30" cy="22" rx="4" ry="7" fill="#FF6B00" opacity="0.8" />
      {/* Wick */}
      <rect x="29" y="28" width="2" height="6" fill="#C9A84C" />
      {/* Oil cup */}
      <path d="M15 34 Q30 28 45 34 L42 50 Q30 54 18 50Z" fill="#C9A84C" stroke="#E8C97A" strokeWidth="1" />
      {/* Stem */}
      <rect x="27" y="50" width="6" height="50" fill="#C9A84C" />
      {/* Base */}
      <ellipse cx="30" cy="105" rx="20" ry="8" fill="#C9A84C" stroke="#E8C97A" strokeWidth="1" />
      <ellipse cx="30" cy="112" rx="25" ry="10" fill="#9B7A2E" />
      {/* Decorative lines */}
      <path d="M18 38 Q14 44 16 50" stroke="#E8C97A" strokeWidth="0.8" />
      <path d="M42 38 Q46 44 44 50" stroke="#E8C97A" strokeWidth="0.8" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="35" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="28" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
      <text x="40" y="48" textAnchor="middle" fill="#C9A84C" fontSize="22" fontFamily="Georgia, serif" fontWeight="700">S</text>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const cx = 40 + 32 * Math.cos(rad);
        const cy = 40 + 32 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="2" fill="#C9A84C" opacity="0.6" />;
      })}
    </svg>
  );
}
