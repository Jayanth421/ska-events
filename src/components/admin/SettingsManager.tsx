"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

export default function AdminSettingsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isTE = locale === "te";

  const [businessName, setBusinessName] = useState("SKA Events");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("hello@skaevents.com");
  const [address, setAddress] = useState("123, Event Street, Jubilee Hills, Hyderabad");
  const [defaultLang, setDefaultLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? "");
    });
  }, []);

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Save to localStorage as simple site settings
    localStorage.setItem("ska-settings", JSON.stringify({ businessName, phone, email, address, defaultLang }));
    await new Promise((r) => setTimeout(r, 600));
    setMsg({ type: "success", text: isTE ? "సెట్టింగ్‌లు సేవ్ అయ్యాయి!" : "Settings saved successfully!" });
    setSaving(false);
    setTimeout(() => setMsg(null), 3000);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPwMsg({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPwMsg({ type: "error", text: error.message });
    } else {
      setPwMsg({ type: "success", text: isTE ? "పాస్‌వర్డ్ మార్చబడింది!" : "Password changed successfully!" });
      setNewPassword("");
    }
    setPwSaving(false);
    setTimeout(() => setPwMsg(null), 4000);
  };

  useEffect(() => {
    const saved = localStorage.getItem("ska-settings");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setBusinessName(s.businessName ?? "SKA Events");
        setPhone(s.phone ?? "");
        setEmail(s.email ?? "");
        setAddress(s.address ?? "");
        setDefaultLang(s.defaultLang ?? "en");
      } catch {}
    }
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#6B0F1A]">{isTE ? "సెట్టింగ్‌లు" : "Settings"}</h1>
        <p className="text-gray-500 text-sm">{isTE ? "సిస్టమ్ కాన్ఫిగరేషన్ నిర్వహించండి" : "Manage system configuration"}</p>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-2xl p-6 mb-6"
        style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
        <h2 className="font-serif font-bold text-lg text-[#6B0F1A] mb-5">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 inline-block mr-1.5 -mt-0.5" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="16" height="13" rx="2"/><path d="M6 4V2M14 4V2M7 11h6M7 14h4"/></svg>
          {isTE ? "వ్యాపార సమాచారం" : "Business Information"}
        </h2>
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm border ${msg.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
            {msg.text}
          </div>
        )}
        <form onSubmit={saveSettings} className="space-y-4">
          {[
            { k: "businessName", label: isTE ? "వ్యాపార పేరు" : "Business Name", value: businessName, set: setBusinessName },
            { k: "phone", label: isTE ? "ఫోన్ నంబర్" : "Phone Number", value: phone, set: setPhone },
            { k: "email", label: isTE ? "ఇమెయిల్" : "Business Email", value: email, set: setEmail },
            { k: "address", label: isTE ? "చిరునామా" : "Address", value: address, set: setAddress },
          ].map(({ k, label, value, set }) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
              <input type="text" value={value} onChange={(e) => set(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              {isTE ? "డిఫాల్ట్ భాష" : "Default Language"}
            </label>
            <select value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] bg-white">
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
          <button type="submit" disabled={saving}
            className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            {saving ? (isTE ? "సేవ్ అవుతోంది..." : "Saving...") : (isTE ? "సెట్టింగ్‌లు సేవ్ చేయండి" : "Save Settings")}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl p-6 mb-6"
        style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
        <h2 className="font-serif font-bold text-lg text-[#6B0F1A] mb-1">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 inline-block mr-1.5 -mt-0.5" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="9" width="10" height="8" rx="1"/><path d="M7 9V6a3 3 0 016 0v3"/><circle cx="10" cy="13" r="1"/></svg>
          {isTE ? "పాస్‌వర్డ్ మార్చండి" : "Change Password"}
        </h2>
        <p className="text-gray-500 text-xs mb-5">{isTE ? "లాగిన్ అయిన: " : "Logged in as: "}<strong>{userEmail}</strong></p>
        {pwMsg && (
          <div className={`mb-4 p-3 rounded-lg text-sm border ${pwMsg.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
            {pwMsg.text}
          </div>
        )}
        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              {isTE ? "కొత్త పాస్‌వర్డ్" : "New Password"}
            </label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters" minLength={8}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors" />
          </div>
          <button type="submit" disabled={pwSaving}
            className="px-6 py-2.5 rounded-xl font-bold text-white text-sm disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#6B0F1A,#9B1B2A)" }}>
            {pwSaving ? "Updating..." : (isTE ? "పాస్‌వర్డ్ మార్చండి" : "Change Password")}
          </button>
        </form>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-2xl p-6"
        style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 10px rgba(107,15,26,0.04)" }}>
        <h2 className="font-serif font-bold text-lg text-[#6B0F1A] mb-4">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 inline-block mr-1.5 -mt-0.5" stroke="currentColor" strokeWidth="1.6"><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"/></svg>
          {isTE ? "సిస్టమ్ సమాచారం" : "System Information"}
        </h2>
        <div className="space-y-2.5">
          {[
            ["Platform", "Next.js 16 + next-intl v4 + Supabase"],
            ["Version", "1.0.0"],
            ["Languages", "English (en), Telugu (te)"],
            ["Supabase Project", "ijoyhkpfvypqljgmordu"],
            ["Deployment", "Vercel (bom1)"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-gray-50 text-sm last:border-0">
              <span className="text-gray-500">{k}</span>
              <span className="font-medium text-[#6B0F1A] text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
