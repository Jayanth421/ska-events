"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    key: "weddingPlanning",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    icon: "💍",
    color: "#6B0F1A",
  },
  {
    key: "corporateEvents",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    icon: "🏢",
    color: "#4A5568",
  },
  {
    key: "birthdayParties",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    icon: "🎂",
    color: "#7C3AED",
  },
  {
    key: "socialEvents",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    icon: "🎊",
    color: "#B45309",
  },
  {
    key: "decorDesign",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    icon: "🌸",
    color: "#BE185D",
  },
  {
    key: "catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
    icon: "🍽️",
    color: "#065F46",
  },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero Banner */}
      <section
        className="relative py-24 px-4 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        {/* Mandala bg */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 600 600" className="w-[600px] h-[600px]" fill="none">
            {[280, 230, 180, 130, 80].map((r, i) => (
              <circle key={i} cx="300" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.6" />
            ))}
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              return <line key={i} x1={300 + 80 * Math.cos(a)} y1={300 + 80 * Math.sin(a)} x2={300 + 280 * Math.cos(a)} y2={300 + 280 * Math.sin(a)} stroke="#C9A84C" strokeWidth="0.3" />;
            })}
          </svg>
        </div>
        <div className="relative text-center max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">{t("subtitle")}</p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(({ key, image, icon }, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                boxShadow: "0 4px 20px rgba(107,15,26,0.06)",
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={image}
                  alt={t(`${key}.title`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-serif font-bold text-lg mb-3 uppercase tracking-wide"
                  style={{ color: "#6B0F1A" }}
                >
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {t(`${key}.description`)}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
                  style={{ color: "#C9A84C" }}
                >
                  {tc("readMore")} <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="mx-4 mb-16 rounded-2xl px-8 py-14 text-center"
        style={{ background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)" }}
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
          {locale === "te" ? "మీ ఈవెంట్ ప్లాన్ చేయడానికి సిద్ధంగా ఉన్నారా?" : "Ready to plan your perfect event?"}
        </h2>
        <p className="text-white/70 mb-7 max-w-md mx-auto text-sm">
          {locale === "te"
            ? "నేడే ఉచిత సంప్రదింపు కోసం మమ్మల్ని సంప్రదించండి."
            : "Contact us today for a free consultation and personalised quote."}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/booking`}
            className="px-8 py-3 rounded-xl font-bold text-[#3D0812]"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
          >
            {locale === "te" ? "ఇప్పుడు బుక్ చేయండి" : "Book Now"}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="px-8 py-3 rounded-xl font-bold text-[#E8C97A] border-2 border-[#C9A84C]/60 hover:bg-[#C9A84C]/10 transition-colors"
          >
            {locale === "te" ? "సంప్రదించండి" : "Contact Us"}
          </Link>
        </div>
      </section>
    </div>
  );
}
