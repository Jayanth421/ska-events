"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

// ── Static fallback (used if Supabase is not yet configured) ──────────────────
const STATIC_PACKAGES = [
  {
    key: "premiumWedding",
    price_en: "₹2,50,000",
    price_te: "₹2,50,000",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    key: "royalCelebration",
    price_en: "₹1,50,000",
    price_te: "₹1,50,000",
    image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
  },
  {
    key: "birthdayBlast",
    price_en: "₹75,000",
    price_te: "₹75,000",
    image_url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  },
  {
    key: "corporateElite",
    price_en: "₹1,20,000",
    price_te: "₹1,20,000",
    image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
  },
] as const;

interface PkgCard {
  key: string;
  title_en: string;
  title_te: string | null;
  description_en: string;
  description_te: string | null;
  price_en: string;
  price_te: string | null;
  image_url: string | null;
}

export default function PackagesSection() {
  const t = useTranslations("packages");
  const locale = useLocale();
  const isTE = locale === "te";

  const [packages, setPackages] = useState<PkgCard[]>([]);

  useEffect(() => {
    supabase
      .from("planning_packages")
      .select("key,title_en,title_te,description_en,description_te,price_en,price_te,image_url")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .limit(4)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          // fall back to static — build cards from i18n messages
          setPackages(
            STATIC_PACKAGES.map((p) => ({
              key: p.key,
              title_en:       t(`${p.key}.title`),
              title_te:       null,
              description_en: t(`${p.key}.description`),
              description_te: null,
              price_en:       p.price_en,
              price_te:       p.price_te,
              image_url:      p.image_url,
            }))
          );
        }
      });
  }, []);

  return (
    <section
      className="py-16 md:py-20 px-4"
      style={{ background: "#FDF8F0" }}
      aria-labelledby="packages-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h2
            id="packages-title"
            className="text-3xl md:text-4xl font-serif font-bold text-[#6B0F1A] uppercase tracking-wider"
          >
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <PackageCard
                title={isTE ? (pkg.title_te || pkg.title_en) : pkg.title_en}
                description={isTE ? (pkg.description_te || pkg.description_en) : pkg.description_en}
                price={isTE ? (pkg.price_te || pkg.price_en) : pkg.price_en}
                image={pkg.image_url ?? "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"}
                viewDetailsText={t("viewDetails")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({
  title,
  description,
  price,
  image,
  viewDetailsText,
}: {
  title: string;
  description: string;
  price: string;
  image: string;
  viewDetailsText: string;
}) {
  return (
    <div
      className="group rounded-xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2"
      style={{
        border: "1px solid rgba(201, 168, 76, 0.15)",
        boxShadow: "0 2px 15px rgba(107, 15, 26, 0.06)",
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif font-bold text-[#6B0F1A] text-base uppercase tracking-wide mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span
            className="text-xl font-bold font-serif"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {price}
          </span>
        </div>

        {/* Button */}
        <Link
          href="/packages"
          className="block text-center py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)",
          }}
        >
          {viewDetailsText}
        </Link>
      </div>
    </div>
  );
}
