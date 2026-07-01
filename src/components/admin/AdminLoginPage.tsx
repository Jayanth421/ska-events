"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check Supabase env vars are present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseKey.length < 10) {
      setError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local and restart the dev server."
      );
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      // Show the real Supabase error message for easier debugging
      const msg = authError.message;
      if (msg.toLowerCase().includes("invalid login")) {
        setError(isTE ? "తప్పు ఇమెయిల్ లేదా పాస్‌వర్డ్." : "Wrong email or password.");
      } else if (msg.toLowerCase().includes("email not confirmed")) {
        setError("Email not confirmed. Please verify your email in Supabase.");
      } else if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch")) {
        setError("Cannot reach Supabase. Check your NEXT_PUBLIC_SUPABASE_URL in .env.local.");
      } else {
        setError(`Supabase error: ${msg}`);
      }
      setLoading(false);
      return;
    }

    // Check admin role from user_metadata
    const userMeta = data.user?.user_metadata;
    const isAdmin = userMeta?.role === "admin" || userMeta?.is_admin === true;

    if (!isAdmin) {
      await supabase.auth.signOut();
      setError(
        isTE
          ? "మీకు అడ్మిన్ అనుమతులు లేవు. Supabase లో is_admin:true సెట్ చేయండి."
          : "No admin permissions. Run the SQL grant command in Supabase → SQL Editor."
      );
      setLoading(false);
      return;
    }

    router.push(`/${locale}/admin`);
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 50%, #9B1B2A 100%)" }}
    >
      {/* Background Mandala */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-[600px] h-[600px]" fill="none">
          {[280, 230, 180, 130, 80].map((r, i) => (
            <circle key={i} cx="300" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            return (
              <line key={i}
                x1={300 + 80 * Math.cos(a)} y1={300 + 80 * Math.sin(a)}
                x2={300 + 280 * Math.cos(a)} y2={300 + 280 * Math.sin(a)}
                stroke="#C9A84C" strokeWidth="0.3"
              />
            );
          })}
        </svg>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Gold top bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-16 h-16 rounded-full border-2 border-[#C9A84C]/60 flex items-center justify-center mb-3"
                style={{ background: "rgba(201,168,76,0.1)" }}
              >
                <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                  <text x="20" y="28" textAnchor="middle" fill="#C9A84C" fontSize="22" fontFamily="Georgia, serif" fontWeight="700">S</text>
                </svg>
              </div>
              <div className="text-[#C9A84C] font-serif font-bold tracking-[0.2em] text-sm">SKA EVENTS</div>
              <div className="text-[#C9A84C]/50 text-[10px] tracking-wider mt-0.5">
                {isTE ? "అడ్మిన్ పానెల్" : "Admin Panel"}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px flex-1 bg-[#C9A84C]/20" />
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#C9A84C]/40" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="8" rx="1"/><path d="M5 7V5a3 3 0 016 0v2"/><circle cx="8" cy="11" r="1"/></svg>
              <div className="h-px flex-1 bg-[#C9A84C]/20" />
            </div>

            <h2 className="text-white text-xl font-serif font-semibold text-center mb-1">
              {isTE ? "అడ్మిన్ లాగిన్" : "Admin Login"}
            </h2>
            <p className="text-white/40 text-xs text-center mb-7">
              {isTE
                ? "కొనసాగించడానికి మీ అడ్మిన్ వివరాలను నమోదు చేయండి"
                : "Enter your admin credentials to continue"}
            </p>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3 rounded-xl text-sm text-red-200 text-center"
                style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 inline mr-1" stroke="currentColor" strokeWidth="1.6"><path d="M8 3L14 13H2L8 3z"/><path d="M8 7v3M8 11.5v.5"/></svg>{error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  {isTE ? "ఇమెయిల్" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skaevents.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  {isTE ? "పాస్‌వర్డ్" : "Password"}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all pr-10"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors text-sm"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass
                      ? <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><line x1="3" y1="3" x2="17" y2="17"/></svg>
                      : <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="10" cy="10" r="2"/></svg>}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-[#3D0812] text-sm disabled:opacity-60 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                }}
              >
                {loading
                  ? (isTE ? "లాగిన్ అవుతోంది..." : "Signing in...")
                  : (isTE ? "లాగిన్" : "Sign In")}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href={`/${locale}`}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 inline mr-1" stroke="currentColor" strokeWidth="1.8"><path d="M10 3L4 8l6 5"/></svg>{isTE ? "వెబ్‌సైట్‌కి తిరిగి వెళ్ళండి" : "Back to website"}
              </a>
            </div>
          </div>

          {/* Gold bottom bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        </div>

        {/* Security notice */}
        <p className="text-center text-white/20 text-xs mt-5">
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 inline mr-1" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="8" rx="1"/><path d="M5 7V5a3 3 0 016 0v2"/></svg>{isTE ? "సురక్షిత అడ్మిన్ యాక్సెస్ మాత్రమే" : "Secure admin access only"}
        </p>
      </motion.div>
    </div>
  );
}
