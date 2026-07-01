"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

const STEPS = [
  { en: "Event Details", te: "ఈవెంట్ వివరాలు" },
  { en: "Personal Info", te: "వ్యక్తిగత సమాచారం" },
  { en: "Package", te: "ప్యాకేజీ" },
  { en: "Confirm", te: "నిర్ధారణ" },
] as const;

const PACKAGES_LIST = [
  { key: "premium_wedding", price: "₹2,50,000", en: "Premium Wedding", te: "ప్రీమియం వివాహం" },
  { key: "royal_celebration", price: "₹1,50,000", en: "Royal Celebration", te: "రాజసమైన వేడుక" },
  { key: "birthday_blast", price: "₹75,000", en: "Birthday Blast", te: "బర్త్‌డే బ్లాస్ట్" },
  { key: "corporate_elite", price: "₹1,20,000", en: "Corporate Elite", te: "కార్పొరేట్ ఎలైట్" },
  { key: "custom", price: "Custom", en: "Custom Package", te: "కస్టమ్ ప్యాకేజీ" },
] as const;

export default function BookingPage() {
  const locale = useLocale();
  const isTE = locale === "te";
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    eventType: "", eventDate: "", guests: "", venue: "",
    name: "", phone: "", email: "", city: "",
    package: "", specialRequests: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleConfirm = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setConfirmed(true);
  };

  if (confirmed) {
    const bookingId = `SKA${Date.now().toString().slice(-6)}`;
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-10 text-center max-w-md w-full"
          style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 8px 40px rgba(107,15,26,0.1)" }}>
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7 12l4 4 6-6"/></svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#6B0F1A] mb-2">
            {isTE ? "బుకింగ్ నిర్ధారించబడింది!" : "Booking Confirmed!"}
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            {isTE ? "బుకింగ్ ID" : "Booking ID"}
          </p>
          <p className="font-mono font-bold text-xl text-[#6B0F1A] mb-6">{bookingId}</p>
          <p className="text-gray-500 text-sm mb-8">
            {isTE
              ? "మేము త్వరలో మీతో సంప్రదిస్తాము మరియు ఈవెంట్ వివరాలను ధృవీకరిస్తాము."
              : "We'll contact you shortly to confirm all event details and finalize arrangements."}
          </p>
          <a href={`/${locale}`}
            className="inline-block w-full py-3 rounded-xl font-bold text-[#3D0812] text-center"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
            {isTE ? "హోమ్‌కి వెళ్ళండి" : "Back to Home"}
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      {/* Hero */}
      <section className="py-20 px-4 text-center" style={{ background: "linear-gradient(135deg,#3D0812,#6B0F1A,#9B1B2A)" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" /><span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" /><div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
          {isTE ? "మీ ఈవెంట్ బుక్ చేయండి" : "Book Your Event"}
        </h1>
        <p className="text-white/70 text-sm">
          {isTE ? "కేవలం 4 సులభమైన దశలలో మీ ఈవెంట్ బుక్ చేయండి" : "Book your dream event in just 4 simple steps"}
        </p>
      </section>

      {/* Steps Progress */}
      <div className="max-w-2xl mx-auto px-4 pt-10">
        <div className="flex items-center mb-10">
          {STEPS.map(({ en, te }, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {i < STEPS.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5" style={{ background: i < step ? "#C9A84C" : "#E5E7EB" }} />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${i <= step ? "text-[#3D0812]" : "text-gray-400 bg-white border border-gray-200"}`}
                style={i <= step ? { background: "linear-gradient(135deg,#C9A84C,#E8C97A)" } : {}}>
                {i < step ? <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg> : i + 1}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${i === step ? "text-[#6B0F1A]" : "text-gray-400"}`}>{isTE ? te : en}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 mb-6"
          style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 4px 20px rgba(107,15,26,0.06)" }}>

          {/* Step 0 – Event Details */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#6B0F1A]">{isTE ? "ఈవెంట్ వివరాలు" : "Event Details"}</h2>
              <div>
                <label className="label-style">{isTE ? "ఈవెంట్ రకం *" : "Event Type *"}</label>
                <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className="input-style">
                  <option value="">{isTE ? "ఎంచుకోండి" : "Select"}</option>
                  {[["wedding", "వివాహం"], ["engagement", "నిశ్చితార్థం"], ["birthday", "పుట్టినరోజు"], ["corporate", "కార్పొరేట్"], ["other", "ఇతర"]].map(([v, l]) => <option key={v} value={v}>{isTE ? l : v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">{isTE ? "తేదీ *" : "Event Date *"}</label>
                  <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} className="input-style" />
                </div>
                <div>
                  <label className="label-style">{isTE ? "అతిథులు *" : "No. of Guests *"}</label>
                  <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className="input-style">
                    <option value="">{isTE ? "ఎంచుకోండి" : "Select"}</option>
                    {["50-100", "100-300", "300-500", "500-1000", "1000+"].map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label-style">{isTE ? "నగరం *" : "City *"}</label>
                <select value={form.venue} onChange={(e) => update("venue", e.target.value)} className="input-style">
                  <option value="">{isTE ? "ఎంచుకోండి" : "Select"}</option>
                  {["Hyderabad", "Secunderabad", "Warangal", "Vijayawada", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 1 – Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#6B0F1A]">{isTE ? "వ్యక్తిగత సమాచారం" : "Personal Information"}</h2>
              <div>
                <label className="label-style">{isTE ? "పూర్తి పేరు *" : "Full Name *"}</label>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={isTE ? "మీ పూర్తి పేరు" : "Your full name"} className="input-style" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">{isTE ? "ఫోన్ *" : "Phone *"}</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="input-style" />
                </div>
                <div>
                  <label className="label-style">{isTE ? "ఇమెయిల్" : "Email"}</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className="input-style" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 – Package */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#6B0F1A]">{isTE ? "ప్యాకేజీ ఎంచుకోండి" : "Choose Package"}</h2>
              <div className="space-y-3">
                {PACKAGES_LIST.map(({ key, price, en, te }) => (
                  <label key={key} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${form.package === key ? "ring-2 ring-[#C9A84C]" : "ring-1 ring-gray-100 hover:ring-[#C9A84C]/40"}`}
                    style={{ background: form.package === key ? "rgba(201,168,76,0.08)" : "white" }}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="pkg" value={key} checked={form.package === key} onChange={() => update("package", key)} className="accent-[#6B0F1A]" />
                      <span className="font-semibold text-sm text-[#6B0F1A]">{isTE ? te : en}</span>
                    </div>
                    <span className="text-[#C9A84C] font-bold text-sm">{price}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="label-style">{isTE ? "ప్రత్యేక అభ్యర్థనలు" : "Special Requests"}</label>
                <textarea rows={3} value={form.specialRequests} onChange={(e) => update("specialRequests", e.target.value)}
                  placeholder={isTE ? "ఏదైనా ప్రత్యేక అవసరాలు..." : "Any special requirements..."} className="input-style resize-none" />
              </div>
            </div>
          )}

          {/* Step 3 – Confirm */}
          {step === 3 && (
            <div>
              <h2 className="font-serif font-bold text-xl text-[#6B0F1A] mb-5">{isTE ? "బుకింగ్ సారాంశం" : "Booking Summary"}</h2>
              <div className="space-y-3 divide-y divide-gray-50">
                {[
                  [isTE ? "ఈవెంట్ రకం" : "Event Type", form.eventType],
                  [isTE ? "తేదీ" : "Date", form.eventDate],
                  [isTE ? "అతిథులు" : "Guests", form.guests],
                  [isTE ? "పేరు" : "Name", form.name],
                  [isTE ? "ఫోన్" : "Phone", form.phone],
                  [isTE ? "ప్యాకేజీ" : "Package", PACKAGES_LIST.find((p) => p.key === form.package)?.[isTE ? "te" : "en"] ?? "—"],
                ].map(([k, v]) => v && (
                  <div key={k as string} className="flex justify-between py-2.5 text-sm">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-[#6B0F1A] capitalize">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-xl bg-[#FDF8F0] text-xs text-gray-500 text-center">
                {isTE
                  ? "బుకింగ్ నిర్ధారణ తర్వాత మా బృందం 4 గంటల్లో మీతో సంప్రదిస్తుంది."
                  : "After confirmation our team will contact you within 4 hours to discuss details."}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 pb-12">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)}
              className="flex-1 py-3 rounded-xl font-semibold text-[#6B0F1A] border-2 border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-colors">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3l-5 5 5 5"/></svg>{isTE ? "వెనక్కి" : "Previous"}
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-3 rounded-xl font-bold text-[#3D0812]"
              style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}>
              {isTE ? "తదుపరి" : "Next"}<svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline ml-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
            </button>
          ) : (
            <button onClick={handleConfirm}
              className="flex-1 py-3 rounded-xl font-bold text-white"
              style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8l4 4 8-8"/></svg>{isTE ? "బుకింగ్ నిర్ధారించండి" : "Confirm Booking"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .label-style { display: block; font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
        .input-style { width: 100%; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px 12px; font-size: 14px; outline: none; transition: border-color 0.2s; background: white; }
        .input-style:focus { border-color: #C9A84C; }
      `}</style>
    </div>
  );
}
