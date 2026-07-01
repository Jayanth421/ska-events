"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

// ── Static fallback ────────────────────────────────────────────────────────────
const STATIC_PACKAGES = [
  {
    key: "premiumWedding",
    title_en: "Premium Wedding",
    title_te: "ప్రీమియం వివాహం",
    description_en: "Everything you need for a perfect wedding celebration.",
    description_te: "పరిపూర్ణ వివాహ వేడుకకు కావలసినవన్నీ.",
    price_en: "₹2,50,000",
    price_te: "₹2,50,000",
    badge_en: "Most Popular",
    badge_te: "అత్యంత జనప్రియ",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    features_en: ["Full venue decoration", "Professional photography", "Catering for 500 guests", "Wedding coordination", "Bridal car arrangement", "Live music & entertainment"],
    features_te: ["పూర్తి వేదిక అలంకరణ", "వృత్తిపరమైన ఫోటోగ్రఫీ", "500 అతిథులకు కేటరింగ్", "వివాహ సమన్వయం", "పెళ్లి కారు ఏర్పాటు", "లైవ్ మ్యూజిక్ & వినోదం"],
  },
  {
    key: "royalCelebration",
    title_en: "Royal Celebration",
    title_te: "రాయల్ సెలెబ్రేషన్",
    description_en: "Elegant décor, premium services for your special day.",
    description_te: "మీ ప్రత్యేక రోజుకు అద్భుతమైన అలంకరణ.",
    price_en: "₹1,50,000",
    price_te: "₹1,50,000",
    badge_en: "Premium",
    badge_te: "ప్రీమియం",
    image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    features_en: ["Stage & floral decoration", "DJ & sound system", "Catering for 300 guests", "Event coordination", "Photography", "Lighting setup"],
    features_te: ["స్టేజ్ & పూల అలంకరణ", "DJ & సౌండ్ సిస్టమ్", "300 అతిథులకు కేటరింగ్", "ఈవెంట్ సమన్వయం", "ఫోటోగ్రఫీ", "లైటింగ్ సెటప్"],
  },
  {
    key: "birthdayBlast",
    title_en: "Birthday Blast",
    title_te: "బర్త్‌డే బ్లాస్ట్",
    description_en: "Make your birthday unforgettable with our amazing setups.",
    description_te: "మా అద్భుతమైన సెటప్‌లతో మీ పుట్టినరోజును అవిస్మరణీయంగా చేయండి.",
    price_en: "₹75,000",
    price_te: "₹75,000",
    badge_en: "Value",
    badge_te: "వేల్యూ",
    image_url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    features_en: ["Theme decoration", "Birthday cake", "DJ & music", "Catering for 100 guests", "Balloon setup", "Photography"],
    features_te: ["థీమ్ అలంకరణ", "పుట్టినరోజు కేక్", "DJ & మ్యూజిక్", "100 అతిథులకు కేటరింగ్", "బెలూన్ సెటప్", "ఫోటోగ్రఫీ"],
  },
  {
    key: "corporateElite",
    title_en: "Corporate Elite",
    title_te: "కార్పొరేట్ ఎలైట్",
    description_en: "Professional events that leave a lasting impression.",
    description_te: "శాశ్వత ముద్ర వేసే వృత్తిపరమైన ఈవెంట్లు.",
    price_en: "₹1,20,000",
    price_te: "₹1,20,000",
    badge_en: "Corporate",
    badge_te: "కార్పొరేట్",
    image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    features_en: ["Venue setup & branding", "AV & presentation systems", "Catering for 200 guests", "Event management team", "Photography & videography", "Post-event report"],
    features_te: ["వేదిక సెటప్ & బ్రాండింగ్", "AV & ప్రెజెంటేషన్ సిస్టమ్స్", "200 అతిథులకు కేటరింగ్", "ఈవెంట్ మేనేజ్‌మెంట్ టీమ్", "ఫోటోగ్రఫీ & వీడియోగ్రఫీ", "పోస్ట్-ఈవెంట్ నివేదిక"],
  },
] as const;

type PackageRow = {
  key: string;
  title_en: string;
  title_te: string | null;
  description_en: string;
  description_te: string | null;
  price_en: string;
  price_te: string | null;
  badge_en: string | null;
  badge_te: string | null;
  image_url: string | null;
  features_en: readonly string[];
  features_te: readonly string[];
};

export default function PackagesFullPage() {
  const locale = useLocale();
  const isTE = locale === "te";

  const [packages, setPackages] = useState<PackageRow[]>([...STATIC_PACKAGES]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("planning_packages")
      .select("key,title_en,title_te,description_en,description_te,price_en,price_te,badge_en,badge_te,image_url,features_en,features_te")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setPackages(data);
        setLoading(false);
      });
  }, []);

  const title  = isTE ? "ప్యాకేజీలు" : "Featured Packages";
  const onward = isTE ? "వరకు" : "onwards";

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h1>
          <p className="text-white/70 text-sm md:text-base">
            {isTE ? "మీ ప్రత్యేక రోజుకు సరైన ప్యాకేజీ ఎంచుకోండి" : "Choose the perfect package for your special occasion"}
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-3" />
            {isTE ? "లోడవుతోంది..." : "Loading packages..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg, idx) => {
              const pkgTitle  = isTE ? (pkg.title_te  || pkg.title_en)  : pkg.title_en;
              const pkgDesc   = isTE ? (pkg.description_te || pkg.description_en) : pkg.description_en;
              const pkgPrice  = isTE ? (pkg.price_te  || pkg.price_en)  : pkg.price_en;
              const pkgBadge  = pkg.badge_en ? (isTE ? (pkg.badge_te || pkg.badge_en) : pkg.badge_en) : null;
              const featureList = isTE && pkg.features_te?.length ? pkg.features_te : pkg.features_en;

              return (
                <motion.div
                  key={pkg.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                  style={{
                    border: "1px solid rgba(201,168,76,0.2)",
                    boxShadow: "0 4px 24px rgba(107,15,26,0.08)",
                  }}
                >
                  {/* Image */}
                  {pkg.image_url && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={pkg.image_url}
                        alt={pkgTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {pkgBadge && (
                        <div className="absolute top-3 right-3">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold text-[#3D0812]"
                            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
                          >
                            {pkgBadge}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <span
                          className="text-2xl font-serif font-bold"
                          style={{
                            background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {pkgPrice}
                        </span>
                        <span className="text-white/60 text-xs ml-2">{onward}</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="font-serif font-bold text-xl mb-1 uppercase tracking-wide"
                      style={{ color: "#6B0F1A" }}
                    >
                      {pkgTitle}
                    </h3>
                    <p className="text-gray-500 text-sm mb-5">{pkgDesc}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {featureList.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(107,15,26,0.08)" }}
                          >
                            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#6B0F1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/${locale}/booking`}
                        className="flex-1 py-3 rounded-xl font-semibold text-center text-sm text-white transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}
                      >
                        {isTE ? "ఇప్పుడు బుక్ చేయండి" : "Book Now"}
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        className="flex-1 py-3 rounded-xl font-semibold text-center text-sm border-2 transition-all hover:bg-[#6B0F1A]/5"
                        style={{ borderColor: "rgba(107,15,26,0.3)", color: "#6B0F1A" }}
                      >
                        {isTE ? "సంప్రదించండి" : "Enquire"}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Custom Package Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(107,15,26,0.05), rgba(201,168,76,0.1))",
            border: "1px dashed rgba(201,168,76,0.4)",
          }}
        >
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#C9A84C]" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2l1.8 5.4h5.7l-4.6 3.3 1.8 5.4-4.7-3.4-4.7 3.4 1.8-5.4-4.6-3.3h5.7L12 2z"/>
              <path d="M19 9l.9 2.7h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8L19 9zM5 9l.9 2.7H8.7l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8L5 9z"/>
            </svg>
          </div>
          <h3 className="font-serif font-bold text-xl text-[#6B0F1A] mb-2">
            {isTE ? "కస్టమ్ ప్యాకేజీ కావాలా?" : "Need a Custom Package?"}
          </h3>
          <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
            {isTE
              ? "మీ అవసరాలకు అనుగుణంగా వ్యక్తిగతీకరించిన ప్యాకేజీని రూపొందించడానికి మా నిపుణుల బృందంతో మాట్లాడండి."
              : "Talk to our expert team to design a personalised package tailored exactly to your requirements and budget."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-[#3D0812]"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
          >
            {isTE ? "ఉచిత సంప్రదింపు" : "Get Free Consultation"}
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
