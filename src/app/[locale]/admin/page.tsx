"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface Stats {
  bookings: number;
  pending: number;
  clients: number;
  events: number;
}

/* ── SVG icons for module cards — clean geometric Heroicons-style ── */
const ModuleIcon = ({ name }: { name: string }) => {
  const cls = "w-6 h-6";
  const sw  = "1.7";
  const lc  = "round";
  switch (name) {
    case "translations": return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><circle cx="12" cy="12" r="9"/><path d="M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18M3 12h18M3.8 7.5h16.4M3.8 16.5h16.4"/></svg>;
    case "bookings":     return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 16h2M14 16h2"/></svg>;
    case "clients":      return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><circle cx="9" cy="7" r="4"/><path d="M2 21c0-4.418 3.134-8 7-8s7 3.582 7 8"/><path d="M17 5a4 4 0 010 8M22 21c0-3.084-1.877-5.732-4.5-6.837"/></svg>;
    case "events":       return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17.5l-6 4.5 2.5-7.5L2 9.5h7.5L12 2z"/></svg>;
    case "planning":     return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>;
    case "gallery":      return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><rect x="2" y="5" width="20" height="16" rx="2"/><path d="M2 15l6-6 5 5 3-3 6 5"/><circle cx="17" cy="10" r="1.8" fill="currentColor" stroke="none"/></svg>;
    case "vendors":      return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><path d="M3 11l2-7h14l2 7"/><rect x="2" y="11" width="20" height="10" rx="2"/><path d="M9 21v-5h6v5"/></svg>;
    case "settings":     return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.22 5.22l2.12 2.12M16.66 16.66l2.12 2.12M5.22 18.78l2.12-2.12M16.66 7.34l2.12-2.12"/></svg>;
    default:             return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;
  }
};

/* ── Stats card icons — clean geometric ── */
const StatIcon = ({ name }: { name: string }) => {
  const cls = "w-5 h-5";
  const sw  = "1.7";
  const lc  = "round";
  switch (name) {
    case "bookings": return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 16h2M14 16h2"/></svg>;
    case "pending":  return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 3.5"/></svg>;
    case "clients":  return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><circle cx="9" cy="7" r="4"/><path d="M2 21c0-4.418 3.134-8 7-8s7 3.582 7 8"/><path d="M17 5a4 4 0 010 8M22 21c0-3.084-1.877-5.732-4.5-6.837"/></svg>;
    case "events":   return <svg viewBox="0 0 24 24" fill="none" className={cls} stroke="currentColor" strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lc}><path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17.5l-6 4.5 2.5-7.5L2 9.5h7.5L12 2z"/></svg>;
    default:         return null;
  }
};

const MODULES = [
  { key: "translations", color: "#3B5998", bg: "#EBF0FF" },
  { key: "bookings",     color: "#166534", bg: "#F0FDF4" },
  { key: "clients",      color: "#1D4ED8", bg: "#EFF6FF" },
  { key: "events",       color: "#9333EA", bg: "#FAF5FF" },
  { key: "planning",     color: "#0E7490", bg: "#ECFEFF" },
  { key: "gallery",      color: "#BE185D", bg: "#FDF2F8" },
  { key: "vendors",      color: "#B45309", bg: "#FFFBEB" },
  { key: "settings",     color: "#374151", bg: "#F9FAFB" },
] as const;

const LABELS = {
  en: {
    translations: { title: "Translations",        desc: "Manage all language translations"         },
    bookings:     { title: "Bookings",             desc: "View & manage all event bookings"         },
    clients:      { title: "Clients",              desc: "Browse registered client database"        },
    events:       { title: "Events",               desc: "Create & manage upcoming events"          },
    planning:     { title: "Planning & Packages",  desc: "Manage packages shown on the website"     },
    gallery:      { title: "Gallery",              desc: "Add & manage gallery photos"              },
    vendors:      { title: "Vendors",              desc: "Manage your vendor network"               },
    settings:     { title: "Settings",             desc: "Business info & system config"            },
  },
  te: {
    translations: { title: "అనువాదాలు",              desc: "అన్ని భాషా అనువాదాలను నిర్వహించండి"           },
    bookings:     { title: "బుకింగ్‌లు",              desc: "అన్ని ఈవెంట్ బుకింగ్‌లు చూడండి"              },
    clients:      { title: "క్లయింట్లు",             desc: "క్లయింట్ డేటాబేస్ నిర్వహించండి"              },
    events:       { title: "ఈవెంట్లు",               desc: "ఈవెంట్లు సృష్టించండి & నిర్వహించండి"         },
    planning:     { title: "ప్లానింగ్ & ప్యాకేజీలు", desc: "వెబ్‌సైట్‌లో చూపించే ప్యాకేజీలు నిర్వహించండి" },
    gallery:      { title: "గ్యాలరీ",               desc: "గ్యాలరీ ఫోటోలు జోడించండి & నిర్వహించండి"      },
    vendors:      { title: "విక్రేతలు",              desc: "మీ విక్రేత నెట్‌వర్క్ నిర్వహించండి"           },
    settings:     { title: "సెట్టింగ్‌లు",           desc: "వ్యాపార సమాచారం & సిస్టమ్ కాన్ఫిగ్"          },
  },
} as const;

export default function AdminDashboardPage() {
  const params = useParams() ?? {};
  const locale = ((params?.locale as string) || "en") as "en" | "te";
  const isTE   = locale === "te";
  const labels = LABELS[locale];

  const [stats,      setStats]      = useState<Stats>({ bookings: 0, pending: 0, clients: 0, events: 0 });
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("bookings").select("id, status", { count: "exact", head: false }),
      supabase.from("profiles").select("id",          { count: "exact", head: false }),
      supabase.from("events").select("id",            { count: "exact", head: false }),
      supabase.auth.getUser(),
    ]).then(([bRes, cRes, eRes, userRes]) => {
      const rows = bRes.data ?? [];
      setStats({
        bookings: rows.length,
        pending:  rows.filter((b: { status: string }) => b.status === "pending").length,
        clients:  cRes.data?.length ?? 0,
        events:   eRes.data?.length  ?? 0,
      });
      setAdminEmail(userRes.data.user?.email ?? "");
    });
  }, []);

  const STAT_CARDS = [
    { key: "bookings", label: isTE ? "మొత్తం బుకింగ్‌లు" : "Total Bookings", value: stats.bookings },
    { key: "pending",  label: isTE ? "పెండింగ్"           : "Pending",        value: stats.pending  },
    { key: "clients",  label: isTE ? "క్లయింట్లు"         : "Clients",        value: stats.clients  },
    { key: "events",   label: isTE ? "ఈవెంట్లు"           : "Events",         value: stats.events   },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div
        className="px-6 py-8"
        style={{ background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 60%, #9B1B2A 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[#C9A84C]/60 text-sm mb-1 flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.6">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zM7 9l3 3 3-3"/>
                </svg>
                {isTE ? "స్వాగతం" : "Welcome back"}
              </p>
              <h1 className="text-[#E8C97A] font-serif text-2xl font-bold">
                {isTE ? "అడ్మిన్ డాష్‌బోర్డ్" : "Admin Dashboard"}
              </h1>
              {adminEmail && <p className="text-white/40 text-xs mt-1">{adminEmail}</p>}
            </div>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
                <circle cx="10" cy="10" r="8"/><path d="M10 2a14.5 14.5 0 010 16M2 10h16"/>
              </svg>
              {isTE ? "వెబ్‌సైట్ చూడండి" : "View Website"}
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {STAT_CARDS.map(({ key, label, value }) => (
              <div
                key={key}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <span className="text-white/50 flex-shrink-0"><StatIcon name={key} /></span>
                <div>
                  <div className="text-xl font-bold font-serif" style={{ color: "#E8C97A" }}>{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
          {isTE ? "మాడ్యూల్స్" : "Modules"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map(({ key, color, bg }) => {
            const { title, desc } = labels[key];
            return (
              <Link
                key={key}
                href={`/${locale}/admin/${key}`}
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(107,15,26,0.05)" }}
              >
                {/* Icon badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: bg, color }}
                >
                  <ModuleIcon name={key} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-serif font-bold text-base mb-0.5 group-hover:text-[#9B1B2A] transition-colors"
                    style={{ color }}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
                {/* Arrow */}
                <svg viewBox="0 0 20 20" fill="currentColor"
                  className="w-4 h-4 text-gray-300 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
