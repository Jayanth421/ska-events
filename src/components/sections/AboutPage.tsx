"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

const TEAM = [
  { name: "Suresh Kumar Agarwal", role: "Founder & CEO", roleTE: "వ్యవస్థాపకుడు & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
  { name: "Kavitha Reddy", role: "Creative Director", roleTE: "క్రియేటివ్ డైరెక్టర్", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80" },
  { name: "Arjun Sharma", role: "Event Manager", roleTE: "ఈవెంట్ మేనేజర్", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
  { name: "Priya Nair", role: "Decor Specialist", roleTE: "డెకోర్ స్పెషలిస్ట్", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80" },
] as const;

const MILESTONES = [
  { year: "2010", en: "SKA Events founded in Hyderabad", te: "హైదరాబాద్‌లో SKA ఈవెంట్స్ స్థాపన" },
  { year: "2013", en: "Completed 100th event — Royal Wedding", te: "100వ ఈవెంట్ పూర్తి — రాజసమైన వివాహం" },
  { year: "2016", en: "Expanded to corporate events & exhibitions", te: "కార్పొరేట్ ఈవెంట్లు & ఎగ్జిబిషన్‌లకు విస్తరణ" },
  { year: "2019", en: "500+ events milestone — Best Event Company Award", te: "500+ ఈవెంట్లు — బెస్ట్ ఈవెంట్ కంపెనీ అవార్డ్" },
  { year: "2023", en: "1000+ events & 25 expert team members", te: "1000+ ఈవెంట్లు & 25 నిపుణుల బృందం" },
  { year: "2025", en: "Launched premium digital booking platform", te: "ప్రీమియం డిజిటల్ బుకింగ్ ప్లాట్‌ఫారమ్ ప్రారంభం" },
] as const;

export default function AboutPage() {
  const locale = useLocale();
  const isTE = locale === "te";

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 600 600" className="w-[600px] h-[600px]" fill="none">
            {[280, 230, 180, 130].map((r, i) => (<circle key={i} cx="300" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.6" />))}
          </svg>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" /><div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {isTE ? "మా గురించి" : "About Us"}
          </h1>
          <p className="text-white/70 text-base">
            {isTE ? "2010 నుండి మాయావి క్షణాలు సృష్టిస్తున్నాము" : "Creating magical moments since 2010"}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#6B0F1A] mb-5">
              {isTE ? "మా కథ" : "Our Story"}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isTE
                ? "SKA ఈవెంట్స్ సాధారణ సందర్భాలను అసాధారణ వేడుకలుగా మార్చాలనే దృష్టితో 2010లో స్థాపించబడింది. హైదరాబాద్ హృదయంలో, మేము అత్యంత సన్నిహితమైన వివాహాల నుండి పెద్ద-స్థాయి కార్పొరేట్ సార్వాత్రికోత్సవాల వరకు ప్రతి ఈవెంట్‌ను పరిపూర్ణంగా నిర్వహిస్తాము."
                : "SKA Events was founded in 2010 with a vision to transform ordinary occasions into extraordinary celebrations. From the heart of Hyderabad, we handle every event — from the most intimate weddings to large-scale corporate galas — with absolute perfection."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {isTE
                ? "14+ సంవత్సరాల అనుభవంతో మరియు 1000+ ఈవెంట్లు విజయవంతంగా నిర్వహించిన తర్వాత, మేము హైదరాబాద్‌లో అత్యంత విశ్వసనీయ ఈవెంట్ మేనేజ్‌మెంట్ కంపెనీగా ఉన్నాము."
                : "With 14+ years of experience and 1000+ events successfully managed, we are Hyderabad's most trusted event management company, known for our creativity, precision, and passion."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" alt="" className="rounded-xl h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80" alt="" className="rounded-xl h-48 w-full object-cover mt-6" />
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80" alt="" className="rounded-xl h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80" alt="" className="rounded-xl h-48 w-full object-cover mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4" style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "1000+", l: isTE ? "ఈవెంట్లు" : "Events" },
            { v: "500+", l: isTE ? "సంతోషకర క్లయింట్లు" : "Happy Clients" },
            { v: "14+", l: isTE ? "సంవత్సరాలు" : "Years" },
            { v: "25+", l: isTE ? "నిపుణులు" : "Experts" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div className="text-3xl font-serif font-bold" style={{ color: "#E8C97A" }}>{v}</div>
              <div className="text-white/70 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#6B0F1A]">{isTE ? "మా ప్రయాణం" : "Our Journey"}</h2>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C9A84C] to-transparent" />
          <div className="space-y-8">
            {MILESTONES.map(({ year, en, te }, i) => (
              <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex gap-6 pl-2">
                <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C] bg-white flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="text-[10px] font-bold text-[#6B0F1A]">{year.slice(2)}</span>
                </div>
                <div className="flex-1 bg-white rounded-xl p-4" style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
                  <div className="text-[#C9A84C] text-xs font-bold mb-1">{year}</div>
                  <div className="text-gray-700 text-sm">{isTE ? te : en}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#6B0F1A]">{isTE ? "మా బృందం" : "Our Team"}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, roleTE, img }) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center group">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-[#C9A84C]/30 group-hover:ring-[#C9A84C] transition-all">
                <img src={img} alt={name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="font-semibold text-[#6B0F1A] text-sm">{name}</div>
              <div className="text-gray-500 text-xs mt-0.5">{isTE ? roleTE : role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-4 mb-16 rounded-2xl py-12 px-8 text-center" style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          {isTE ? "మీ ఈవెంట్ మాకు అప్పగించండి" : "Entrust your event to us"}
        </h2>
        <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
          {isTE ? "మీ కలల ఈవెంట్‌ను నిజం చేయడానికి మేము ఇక్కడ ఉన్నాము." : "We're here to bring your dream event to life."}
        </p>
        <Link href={`/${locale}/booking`} className="inline-block px-8 py-3 rounded-xl font-bold text-[#3D0812]"
          style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
          {isTE ? "ఇప్పుడు బుక్ చేయండి" : "Book Now"}<svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline ml-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </Link>
      </section>
    </div>
  );
}
