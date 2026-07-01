"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

const VENUES = [
  {
    name: "Grand Palace Banquet",
    nameTE: "గ్రాండ్ పేలెస్ బ్యాంక్వెట్",
    location: "Jubilee Hills, Hyderabad",
    locationTE: "జూబ్లీ హిల్స్, హైదరాబాద్",
    capacity: "50 – 1500",
    type: "Banquet Hall",
    typeTE: "బ్యాంక్వెట్ హాల్",
    price: "₹2,00,000",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    features: ["AC Halls", "Parking", "Catering", "Decor"],
    featuresTE: ["AC హాల్స్", "పార్కింగ్", "కేటరింగ్", "అలంకరణ"],
  },
  {
    name: "Royal Garden Resort",
    nameTE: "రాయల్ గార్డెన్ రిసార్ట్",
    location: "Shamshabad, Hyderabad",
    locationTE: "శంషాబాద్, హైదరాబాద్",
    capacity: "100 – 3000",
    type: "Resort & Lawn",
    typeTE: "రిసార్ట్ & లాన్",
    price: "₹3,50,000",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    features: ["Outdoor Lawn", "Swimming Pool", "Rooms", "Catering"],
    featuresTE: ["ఔట్‌డోర్ లాన్", "స్విమ్మింగ్ పూల్", "రూమ్స్", "కేటరింగ్"],
  },
  {
    name: "Skyline Convention Centre",
    nameTE: "స్కైలైన్ కన్వెన్షన్ సెంటర్",
    location: "HiTec City, Hyderabad",
    locationTE: "హైటెక్ సిటీ, హైదరాబాద్",
    capacity: "200 – 5000",
    type: "Convention Centre",
    typeTE: "కన్వెన్షన్ సెంటర్",
    price: "₹5,00,000",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    features: ["Multiple Halls", "AV Systems", "Parking", "Catering"],
    featuresTE: ["బహుళ హాల్స్", "AV సిస్టమ్స్", "పార్కింగ్", "కేటరింగ్"],
  },
  {
    name: "Heritage Haveli Grounds",
    nameTE: "హెరిటేజ్ హవేలీ గ్రౌండ్స్",
    location: "Golconda, Hyderabad",
    locationTE: "గోల్కొండ, హైదరాబాద్",
    capacity: "50 – 800",
    type: "Heritage Venue",
    typeTE: "హెరిటేజ్ వేదిక",
    price: "₹1,50,000",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    features: ["Historic Ambiance", "Garden", "Parking", "Catering"],
    featuresTE: ["చారిత్రక వాతావరణం", "గార్డెన్", "పార్కింగ్", "కేటరింగ్"],
  },
  {
    name: "Pearl Continental Hall",
    nameTE: "పెర్ల్ కాంటినెంటల్ హాల్",
    location: "Banjara Hills, Hyderabad",
    locationTE: "బంజారా హిల్స్, హైదరాబాద్",
    capacity: "100 – 2000",
    type: "5-Star Hotel",
    typeTE: "5 స్టార్ హోటల్",
    price: "₹4,00,000",
    img: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&q=80",
    features: ["5-Star Amenities", "Rooms", "Catering", "Valet"],
    featuresTE: ["5 స్టార్ సదుపాయాలు", "రూమ్స్", "కేటరింగ్", "వాలెట్"],
  },
  {
    name: "Green Valley Farmhouse",
    nameTE: "గ్రీన్ వ్యాలీ ఫార్మ్‌హౌస్",
    location: "Chevella, Hyderabad",
    locationTE: "చేవెళ్ళ, హైదరాబాద్",
    capacity: "50 – 600",
    type: "Farmhouse",
    typeTE: "ఫార్మ్‌హౌస్",
    price: "₹80,000",
    img: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=600&q=80",
    features: ["Open Air", "Natural Setting", "Parking", "Basic Catering"],
    featuresTE: ["ఓపెన్ ఎయిర్", "నేచురల్ సెట్టింగ్", "పార్కింగ్", "బేసిక్ కేటరింగ్"],
  },
] as const;

export default function VenuesPage() {
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
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" /><div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /><div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {isTE ? "మా వేదికలు" : "Our Venues"}
          </h1>
          <p className="text-white/70">
            {isTE ? "హైదరాబాద్‌లో ప్రతి సందర్భానికీ ప్రీమియం వేదికలు" : "Premium venues across Hyderabad for every occasion"}
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VENUES.map(({ name, nameTE, location, locationTE, capacity, type, typeTE, price, img, features, featuresTE }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 4px 20px rgba(107,15,26,0.06)" }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={img} alt={isTE ? nameTE : name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold text-[#3D0812]"
                    style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
                    {isTE ? typeTE : type}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-lg font-serif font-bold" style={{ color: "#E8C97A" }}>{price}</span>
                  <span className="text-white/60 text-xs ml-1">{isTE ? "నుండి" : "from"}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif font-bold text-base text-[#6B0F1A] mb-1">{isTE ? nameTE : name}</h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><path d="M8 1a4 4 0 00-4 4c0 3.5 4 8.5 4 8.5S12 8.5 12 5a4 4 0 00-4-4z"/><circle cx="8" cy="5" r="1.5"/></svg>
                  <span>{isTE ? locationTE : location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="5" r="2.5"/><path d="M1 14c0-3 2.686-5.5 6-5.5s6 2.5 6 5.5"/><path d="M13 5a2.5 2.5 0 010 5M15 14c0-1.9-1.2-3.5-3-4.3"/></svg>
                  <span>{isTE ? `${capacity} అతిథులు` : `${capacity} Guests`}</span>
                </div>
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(isTE ? featuresTE : features).map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full text-xs text-[#6B0F1A]"
                      style={{ background: "rgba(107,15,26,0.07)" }}>{f}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/${locale}/booking`}
                    className="flex-1 py-2.5 rounded-lg text-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
                    {isTE ? "బుక్ చేయండి" : "Book Venue"}
                  </Link>
                  <Link href={`/${locale}/contact`}
                    className="flex-1 py-2.5 rounded-lg text-center text-xs font-semibold text-[#6B0F1A] border border-[#C9A84C]/30 hover:bg-[#6B0F1A]/5 transition-colors">
                    {isTE ? "విచారించండి" : "Enquire"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
