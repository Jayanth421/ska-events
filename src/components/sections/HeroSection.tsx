"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const CATEGORIES = [
  { key: "weddings" },
  { key: "engagements" },
  { key: "birthdays" },
  { key: "corporate" },
  { key: "housewarming" },
  { key: "babyShower" },
  { key: "festivals" },
  { key: "more" },
] as const;

export default function HeroSection() {
  const t = useTranslations("hero");
  const tc = useTranslations("categories");
  const ts = useTranslations("search");

  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Hero">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #43111a 0%, #6B0F1A 40%, #8B1A2A 70%, #3D0812 100%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1745573673583-a51f665ae48e?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Wedding"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #300808eb 0%, rgba(48,8,8,.75) 35%, rgba(48,8,8,.15) 75%, rgba(48,8,8,.05) 100%)",
            }}
          />

          {/* Golden Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0808]/40 via-transparent to-transparent" />

          {/* Decorative Left Corner */}
          <img
            src="/decorations/left-gold.png"
            className="absolute left-0 top-16 w-40 opacity-70"
            alt=""
          />

          {/* Decorative Right Corner */}
          <img
            src="/decorations/left-gold.png"
            className="absolute right-0 top-16 w-40 opacity-70"
            alt=""
          />
        </div>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
                <circle cx="20" cy="20" r="1.5" fill="#ffbb00" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative flex-1 flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-[0.25em] uppercase">
              {t("tagline")}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-none mb-2 text-white">
            {t("title")}
          </h1>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-none mb-6"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("titleHighlight")}
          </h1>

          {/* Subtitle */}
          <p className="text-white/70  text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[#3D0812] transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c9a84c, #E8C97A, #C9A84C)",
                boxShadow: "0 4px 20px rgba(201, 168, 76, 0.4)",
              }}
            >
              {t("bookNow")}
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
            <Link
              href="/packages"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[#C9A84C] transition-all duration-300 hover:bg-[#C9A84C]/10"
              style={{
                background: "linear-gradient(135deg, #300808eb, #350909eb, #300808eb)",
                boxShadow: "0 4px 20px rgba(201, 168, 76, 0.4)",
              }}
            >
              {t("explorePackages")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative max-w-6xl mx-auto w-full px-4 sm:px-3 mb-0 pb-0"
      >
        <div
          className="rounded-2xl p-4 sm:p-6"
          style={{
            background: "#d5ab36",
            boxShadow: "0 10px 40px rgba(107,15,26,0.2)",
            border: "2px solid rgb(81, 30, 11)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Event Type */}
            <SearchField label={ts(" eventType")} type="select">
              <option value="">{ts("selectEvent")}</option>
              <option value="wedding">{ts("wedding")}</option>
              <option value="engagement">{ts("engagement")}</option>
              <option value="birthday">{ts("birthday")}</option>
              <option value="corporate">{ts("corporate")}</option>
              <option value="housewarming">{ts("housewarming")}</option>
              <option value="festival">{ts("festival")}</option>
            </SearchField>

            {/* Location */}
            <SearchField label={ts("location")} type="select">
              <option value="">Hyderabad</option>
              <option value="secunderabad">Secunderabad</option>
              <option value="hitec">HiTec City</option>
            </SearchField>

            {/* Guests */}
            <SearchField label={ts("guests")} type="select">
              <option value="100-500">100-500</option>
              <option value="500-1000">500-1000</option>
              <option value="1000-2000">1000-2000</option>
              <option value="2500+">2500+</option>
            </SearchField>

            {/* Budget */}
            <SearchField label={ts("budget")} type="select">
              <option value="50k-5l">₹50,000 - ₹5,00,000</option>
              <option value="5l-10l">₹5L - ₹10L</option>
              <option value="10l+">₹10L+</option>
            </SearchField>

            {/* Date */}
            <SearchField label={ts("date")} type="date" />

            {/* Search Button */}
            <div className="flex items-end">
              <button
                className="w-full py-2.5 rounded-lg font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)",
                  boxShadow: "0 2px 10px rgba(107,15,26,0.3)",
                }}
              >
                {ts("search")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative bg-white py-6 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {CATEGORIES.map(({ key }) => (
              <Link
                key={key}
                href={`/services`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-[#FDF5E8] transition-all duration-200 group cursor-pointer"
              >
                <span className="text-[#6B0F1A] text-xs font-semibold text-center group-hover:text-[#C9A84C] transition-colors leading-tight">
                  {tc(key)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SearchField({
  label,
  type,
  children,
}: {
  label: string;
  type: "select" | "date";
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#6B0F1A] text-[10px] font-bold uppercase tracking-wider">
        {label}
      </label>
      {type === "select" ? (
        <select className="text-gray-700 text-sm bg-transparent border-b border-[#C9A84C]/30 pb-1 focus:outline-none focus:border-[#C9A84C] cursor-pointer">
          {children}
        </select>
      ) : (
        <input
          type="date"
          className="text-gray-700 text-sm bg-transparent border-b border-[#C9A84C]/30 pb-1 focus:outline-none focus:border-[#C9A84C]"
        />
      )}
    </div>
  );
}

function MandalaLeft() {
  return (
    <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C9A84C">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="200" rx={30 + i * 25} ry={30 + i * 25} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const r = 180;
          return (
            <line key={i} x1="0" y1="200" x2={r * Math.cos(angle)} y2={200 + r * Math.sin(angle)} strokeWidth="0.3" />
          );
        })}
      </g>
    </svg>
  );
}

function MandalaRight() {
  return (
    <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C9A84C">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={30 + i * 25} ry={30 + i * 25} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const r = 180;
          return (
            <line key={i} x1="200" y1="200" x2={200 + r * Math.cos(angle)} y2={200 + r * Math.sin(angle)} strokeWidth="0.3" />
          );
        })}
      </g>
    </svg>
  );
}
