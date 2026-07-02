"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { key: "home" | "services" | "packages" | "venues" | "gallery" | "about" | "contact"; href: "/" | "/services" | "/packages" | "/venues" | "/gallery" | "/about" | "/contact" }[] = [
    { key: "home", href: "/" },
    { key: "services", href: "/services" },
    { key: "packages", href: "/packages" },
    { key: "venues", href: "/venues" },
    { key: "gallery", href: "/gallery" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "shadow-lg"
        : ""
        }`}
      style={{
        background: isScrolled
          ? "rgba(61, 8, 18, 0.98)"
          : "rgba(93, 17, 31, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isScrolled ? "1px solid rgba(201, 168, 76, 0.2)" : "none",
      }}
    >
      {/* Top bar */}
      <div className="hidden md:block py-1.5 border-b border-[#C9A84C]/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-end gap-4">
          <a
            href="+91 7995494307"
            className="flex items-center gap-1.5 text-[#C9A84C]/80 text-xs hover:text-[#C9A84C] transition-colors"
          >
            <Phone className="w-3 h-3" />
            {t("phone")}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div

          >
            <svg
              viewBox="0 0 250 250"
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href="https://i.ibb.co/M53N94sJ/640456935-18020611619650208-6330034363367840394-n.png"
                width="250"
                height="250"
              />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#C9A84C] font-serif tracking-[0.2em] text-sm font-bold">
              SKA EVENTS
            </span>
            <span className="text-[#C9A84C]/50 text-[9px] tracking-[0.15em] mt-0.5 hidden sm:block">
              -Rewind memories-
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden xl:flex items-center gap-1" role="list">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="px-3 py-1.5 text-white/80 hover:text-[#E8C97A] text-sm font-medium transition-all duration-200 rounded-md hover:bg-white/5 relative group"
              >
                {t(key)}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#C9A84C] group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-[#3D0812] transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
              boxShadow: "0 2px 12px rgba(201, 168, 76, 0.3)",
            }}
          >
            {t("bookNow")}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="xl:hidden p-2 text-white hover:text-[#C9A84C] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden overflow-hidden border-t border-[#C9A84C]/10"
            style={{ background: "rgba(61, 8, 18, 0.99)" }}
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2.5 text-white/80 hover:text-[#E8C97A] hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#C9A84C]/10 space-y-2">
                <a
                  href="tel:+917995494307"
                  className="flex items-center justify-center gap-2 text-[#C9A84C]/80 text-sm hover:text-[#C9A84C] transition-colors py-2"
                >
                  <Phone className="w-4 h-4" />
                  +9179954 94307
                </a>
                <Link
                  href="/booking"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center py-3 rounded-xl font-semibold text-[#3D0812]"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
                >
                  {t("bookNow")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
