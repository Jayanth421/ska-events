"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  { key: "priya", avatar: "P" },
  { key: "rohan", avatar: "R" },
  { key: "anjali", avatar: "A" },
] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "#FDF8F0" }}
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            <div className="h-px w-8 bg-[#C9A84C]" />
          </div>
          <h2
            id="testimonials-title"
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ key, avatar }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6"
              style={{
                border: "1px solid rgba(201, 168, 76, 0.15)",
                boxShadow: "0 4px 20px rgba(107, 15, 26, 0.06)",
              }}
            >
              {/* Quote mark */}
              <div
                className="text-5xl font-serif leading-none mb-4 opacity-20"
                style={{ color: "#6B0F1A" }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#C9A84C] text-lg">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                "{t(`${key}.text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#C9A84C]/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-bold text-sm flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #6B0F1A, #9B1B2A)",
                    border: "2px solid rgba(201, 168, 76, 0.3)",
                  }}
                >
                  {avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#6B0F1A] text-sm">
                    — {t(`${key}.name`)}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {t(`${key}.location`)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? "w-6 h-2.5 bg-[#6B0F1A]"
                  : "w-2.5 h-2.5 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
