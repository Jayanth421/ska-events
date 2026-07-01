"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isTE = locale === "te";
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", eventType: "", date: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero */}
      <section
        className="relative py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">{t("title")}</h1>
        <p className="text-white/70">{t("subtitle")}</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-5 gap-10">

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M3 4a1.5 1.5 0 011.5-1.5h1.4a1 1 0 01.97.757l.8 3.2a1 1 0 01-.29.99L6.5 8.5A11 11 0 0011.5 13.5l1.053-1.38a1 1 0 01.99-.29l3.2.8A1 1 0 0117.5 13.6v1.4A1.5 1.5 0 0116 16.5C8.544 16.5 3.5 11.456 3.5 4H3z"/></svg>, label: t("callUs"), value: "+91 7995494307", href: "tel:+917995494307" },
              { icon: <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="16" height="13" rx="2"/><path d="M2 6l8 5 8-5"/></svg>, label: t("emailUs"), value: "skaevents.in@gmail.com", href: "mailto:skaevents.in@gmail.com" },
              { icon: <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M10 2a6 6 0 00-6 6c0 5 6 10 6 10s6-5 6-10a6 6 0 00-6-6z"/><circle cx="10" cy="8" r="2"/></svg>, label: t("visitUs"), value: "123, Event Street, Jubilee Hills, Hyderabad, Telangana – 500033", href: "#" },
              { icon: <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M3 4a1.5 1.5 0 011.5-1.5h1.4a1 1 0 01.97.757l.8 3.2a1 1 0 01-.29.99L6.5 8.5A11 11 0 0011.5 13.5l1.053-1.38a1 1 0 01.99-.29l3.2.8A1 1 0 0117.5 13.6v1.4A1.5 1.5 0 0116 16.5C8.544 16.5 3.5 11.456 3.5 4H3z"/><circle cx="14" cy="5" r="2.5" className="fill-current opacity-30"/><path d="M14 3v4M12 5h4" strokeLinecap="round"/></svg>, label: "WhatsApp", value: "+91 7995494307", href: "https://wa.me/917995494307" },
            ].map(({ icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl group hover:-translate-y-0.5 transition-transform"
                style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(107,15,26,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[#6B0F1A]"
                  style={{ background: "rgba(107,15,26,0.07)" }}
                >
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-[#6B0F1A] text-sm">{label}</div>
                  <div className="text-gray-600 text-sm mt-0.5 group-hover:text-[#C9A84C] transition-colors">{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Business Hours */}
            <div
              className="p-4 bg-white rounded-xl"
              style={{ border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <h3 className="font-semibold text-[#6B0F1A] text-sm mb-3">
                {isTE ? "వ్యాపార సమయాలు" : "Business Hours"}
              </h3>
              {[
                { day: isTE ? "సోమ – శని" : "Mon – Sat", hours: "9:00 AM – 7:00 PM" },
                { day: isTE ? "ఆదివారం" : "Sunday", hours: isTE ? "10:00 AM – 5:00 PM" : "10:00 AM – 5:00 PM" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-xs text-gray-600 py-1.5 border-b border-gray-50 last:border-0">
                  <span>{day}</span>
                  <span className="font-medium text-[#6B0F1A]">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 bg-white rounded-2xl p-8"
            style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 4px 24px rgba(107,15,26,0.08)" }}
          >
            <h2 className="font-serif font-bold text-xl text-[#6B0F1A] mb-6">
              {isTE ? "మాకు సందేశం పంపండి" : "Send Us a Message"}
            </h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-600" stroke="currentColor" strokeWidth="2"><path d="M4 12l5 5 11-10"/></svg>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#6B0F1A] mb-2">{t("successMessage")}</h3>
                <p className="text-gray-500 text-sm mb-6">
                  {isTE ? "మేము 24 గంటల్లో మీతో సంప్రదిస్తాము." : "We'll get back to you within 24 hours."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}
                >
                  {isTE ? "మరొక సందేశం పంపు" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("name")} *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={isTE ? "మీ పేరు" : "Your full name"}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("phone")} *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("email")}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={isTE ? "మీ ఇమెయిల్" : "your@email.com"}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("eventType")}</label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors bg-white"
                    >
                      <option value="">{isTE ? "ఈవెంట్ ఎంచుకోండి" : "Select event type"}</option>
                      {[
                        { v: "wedding", l: isTE ? "వివాహం" : "Wedding" },
                        { v: "engagement", l: isTE ? "నిశ్చితార్థం" : "Engagement" },
                        { v: "birthday", l: isTE ? "పుట్టినరోజు" : "Birthday" },
                        { v: "corporate", l: isTE ? "కార్పొరేట్" : "Corporate" },
                        { v: "other", l: isTE ? "ఇతర" : "Other" },
                      ].map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("date")}</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{t("message")}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={isTE ? "మీ ఈవెంట్ గురించి చెప్పండి..." : "Tell us about your event..."}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm disabled:opacity-70 transition-all hover:scale-[1.01]"
                  style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}
                >
                  {status === "sending"
                    ? (isTE ? "పంపుతోంది..." : "Sending...")
                    : t("send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
