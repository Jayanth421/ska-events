"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

// ── Static fallback (used when Supabase table is empty or unavailable) ────────
const STATIC_GALLERY = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", cat: "weddings",    title: "Royal Wedding Mandap",   title_te: "రాయల్ వెడ్డింగ్ మండపం" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80", cat: "weddings",    title: "Floral Stage Decor",      title_te: "పూల స్టేజ్ అలంకరణ" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", cat: "corporate",   title: "Corporate Gala",          title_te: "కార్పొరేట్ గాలా" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", cat: "birthdays",   title: "Birthday Celebration",    title_te: "పుట్టినరోజు వేడుక" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", cat: "engagements", title: "Engagement Ceremony",     title_te: "నిశ్చితార్థ వేడుక" },
  { src: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&q=80", cat: "weddings",    title: "Wedding Reception",       title_te: "వెడ్డింగ్ రిసెప్షన్" },
  { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80", cat: "corporate",   title: "Product Launch Event",    title_te: "ప్రొడక్ట్ లాంచ్ ఈవెంట్" },
  { src: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=600&q=80", cat: "weddings",    title: "Illuminated Arch",        title_te: "లైటింగ్ ఆర్చ్" },
  { src: "https://images.unsplash.com/photo-1478146059778-26d9c23b9d28?w=600&q=80", cat: "birthdays",   title: "Kids Birthday Bash",      title_te: "పిల్లల పుట్టినరోజు" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", cat: "engagements", title: "Ring Ceremony Decor",     title_te: "రింగ్ సెరెమొని అలంకరణ" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", cat: "corporate",   title: "Awards Ceremony",         title_te: "అవార్డ్స్ సెరెమొని" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80", cat: "weddings",    title: "Mehndi Night",            title_te: "మెహందీ నైట్" },
] as const;

type Category = "all" | "weddings" | "engagements" | "birthdays" | "corporate";

interface GalleryItem {
  src: string;
  cat: string;
  title: string;
  title_te?: string | null;
}

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const isTE = locale === "te";

  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([...STATIC_GALLERY]);

  // Load gallery items from Supabase, fall back to static if empty/error
  useEffect(() => {
    supabase
      .from("gallery_items")
      .select("src, title, title_te, category")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setGallery(data.map((d) => ({ src: d.src, cat: d.category, title: d.title, title_te: d.title_te })));
        }
      });
  }, []);

  const filters: { key: Category; label: string }[] = [
    { key: "all",         label: t("all") },
    { key: "weddings",    label: t("weddings") },
    { key: "engagements", label: t("engagements") },
    { key: "birthdays",   label: t("birthdays") },
    { key: "corporate",   label: t("corporate") },
  ];

  const filtered = activeFilter === "all"
    ? gallery
    : gallery.filter((g) => g.cat === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero Banner */}
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 600 600" className="w-[600px] h-[600px]" fill="none">
            {[280, 230, 180, 130].map((r, i) => (
              <circle key={i} cx="300" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.6" />
            ))}
          </svg>
        </div>
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-[#FDF8F0] border-b border-[#C9A84C]/10 py-4">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === key
                  ? "text-white"
                  : "text-[#6B0F1A] hover:bg-[#6B0F1A]/10"
              }`}
              style={
                activeFilter === key
                  ? { background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }
                  : { background: "white", border: "1px solid rgba(107,15,26,0.15)" }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(({ src, title, title_te }, i) => {
            const displayTitle = isTE && title_te ? title_te : title;
            return (
              <motion.div
                key={src + i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="aspect-square rounded-xl overflow-hidden cursor-zoom-in group relative"
                onClick={() => setLightbox({ src, title: displayTitle })}
              >
                <img
                  src={src}
                  alt={displayTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {displayTitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.title} className="w-full rounded-xl" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100"
              aria-label="Close lightbox"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8"/></svg>
            </button>
            <p className="text-white/80 text-sm text-center mt-3">{lightbox.title}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
