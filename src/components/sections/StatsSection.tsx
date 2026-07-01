"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const StatIcon = ({ name }: { name: string }) => {
  const cls = "w-6 h-6";
  const sw = "1.5";
  switch (name) {
    case "eventsCompleted": return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw}><path d="M12 2l3 6.5L22 9.3l-5 4.87 1.18 6.87L12 17.77l-6.18 3.33L7 14.17 2 9.3l7-.8L12 2z"/></svg>;
    case "happyClients":    return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw}><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5M9 10h.01M15 10h.01"/></svg>;
    case "venuesPartnered": return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw}><path d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-5h6v5"/></svg>;
    case "teamMembers":     return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw}><circle cx="9" cy="7" r="3"/><path d="M2 20c0-3.866 3.134-7 7-7s7 3.134 7 7"/><path d="M17 5a3 3 0 010 6M22 20c0-2.577-1.564-4.773-3.75-5.7"/></svg>;
    default: return null;
  }
};

const STATS = [
  { key: "eventsCompleted", value: "1000+" },
  { key: "happyClients",    value: "500+"  },
  { key: "venuesPartnered", value: "150+"  },
  { key: "teamMembers",     value: "25+"   },
] as const;

const WHY_ITEMS = ["experienced", "personalized", "premium", "support"] as const;

export default function StatsSection() {
  const t  = useTranslations("stats");
  const tw = useTranslations("whyUs");

  return (
    <>
      {/* Stats Banner */}
      <section
        className="py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #6B0F1A 0%, #9B1B2A 50%, #6B0F1A 100%)" }}
        aria-label="Company statistics"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ key, value }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-white/50 mb-2"><StatIcon name={key} /></div>
                <div
                  className="text-3xl md:text-4xl font-serif font-bold mb-1"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </div>
                <div className="text-white/70 text-sm font-medium">{t(key)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white" aria-labelledby="why-us-title">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                <div className="h-px w-8 bg-[#C9A84C]" />
              </div>
              <h2 id="why-us-title" className="text-3xl md:text-4xl font-serif font-bold text-[#6B0F1A] mb-8">
                {tw("title")}
              </h2>
              <div className="space-y-4">
                {WHY_ITEMS.map((key) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)" }}
                    >
                      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                        <path d="M3 8l3.5 3.5 6.5-7" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">{tw(key)}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)" }}
                >
                  {tw("knowMore")}
                </a>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden h-56 col-span-1 row-span-2">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" alt="SKA Events Wedding" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden h-28">
                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80" alt="SKA Events Celebration" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden h-28">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80" alt="SKA Events Corporate" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
