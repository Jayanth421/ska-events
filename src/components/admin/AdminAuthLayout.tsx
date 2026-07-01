"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";

/* ── Inline SVG icons — clean geometric Heroicons-style ── */
const Icons = {
  dashboard:    <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg>,
  bookings:     <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M13 2v4M7 2v4M3 9h14"/><path d="M7 13h2M11 13h2"/></svg>,
  clients:      <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="6" r="3"/><path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6"/><path d="M14 4a3 3 0 010 6M18 17c0-2.21-1.343-4.1-3.25-4.9"/></svg>,
  events:       <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.2l-4.33 2.3.83-4.82L3 7.27l4.91-.01L10 2z"/></svg>,
  planning:     <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="16" rx="2"/><path d="M7 3v16M13 3v16M2 8h16M2 13h16"/></svg>,
  gallery:      <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="16" height="13" rx="2"/><path d="M2 13l4-4 4 4 3-3 5 5"/><circle cx="14.5" cy="8.5" r="1.3" fill="currentColor" stroke="none"/></svg>,
  vendors:      <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l1.5-5.5h13L18 9"/><rect x="2" y="9" width="16" height="8" rx="1.5"/><path d="M8 17v-4h4v4"/></svg>,
  translations: <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2c-2.5 3-2.5 13 0 16M10 2c2.5 3 2.5 13 0 16M2 10h16M2.5 6.5h15M2.5 13.5h15"/></svg>,
  settings:     <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="2.5"/><path d="M10 1v2.5M10 16.5V19M1 10h2.5M16.5 10H19M3.64 3.64l1.77 1.77M14.6 14.6l1.77 1.77M3.64 16.36l1.77-1.77M14.6 5.4l1.77-1.77"/></svg>,
  globe:        <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2c-2.5 3-2.5 13 0 16M10 2c2.5 3 2.5 13 0 16M2 10h16"/></svg>,
  logout:       <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h4v12h-4M8 14l5-4-5-4M2 10h11"/></svg>,
};

const NAV_ITEMS = (locale: string, isTE: boolean) => [
  { href: `/${locale}/admin`,              label: isTE ? "హోమ్"         : "Dashboard",    icon: Icons.dashboard    },
  { href: `/${locale}/admin/bookings`,     label: isTE ? "బుకింగ్‌లు"   : "Bookings",     icon: Icons.bookings     },
  { href: `/${locale}/admin/clients`,      label: isTE ? "క్లయింట్లు"  : "Clients",      icon: Icons.clients      },
  { href: `/${locale}/admin/events`,       label: isTE ? "ఈవెంట్లు"    : "Events",       icon: Icons.events       },
  { href: `/${locale}/admin/planning`,     label: isTE ? "ప్లానింగ్"    : "Planning",     icon: Icons.planning     },
  { href: `/${locale}/admin/gallery`,      label: isTE ? "గ్యాలరీ"     : "Gallery",      icon: Icons.gallery      },
  { href: `/${locale}/admin/vendors`,      label: isTE ? "విక్రేతలు"   : "Vendors",      icon: Icons.vendors      },
  { href: `/${locale}/admin/translations`, label: isTE ? "అనువాదాలు"   : "Translations", icon: Icons.translations },
  { href: `/${locale}/admin/settings`,     label: isTE ? "సెట్టింగ్‌లు" : "Settings",     icon: Icons.settings     },
];

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const params   = useParams();
  const pathname = usePathname();
  const locale   = (params?.locale as string) || "en";
  const isTE     = locale === "te";

  const isLoginPage = pathname?.includes("/admin/login");

  const [checking,    setChecking]    = useState(!isLoginPage);
  const [adminEmail,  setAdminEmail]  = useState("");
  const [loggingOut,  setLoggingOut]  = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace(`/${locale}/admin/login`); return; }

      const meta    = session.user.user_metadata;
      const isAdmin = meta?.role === "admin" || meta?.is_admin === true;
      if (!isAdmin) {
        await supabase.auth.signOut();
        router.replace(`/${locale}/admin/login`);
        return;
      }
      setAdminEmail(session.user.email ?? "");
      setChecking(false);
    };

    check();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace(`/${locale}/admin/login`);
    });

    return () => listener.subscription.unsubscribe();
  }, [locale, router, isLoginPage]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#3D0812,#6B0F1A)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C]/30 border-t-[#C9A84C] animate-spin" />
          <p className="text-[#C9A84C]/60 text-sm">
            {isTE ? "ధృవీకరిస్తోంది..." : "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.replace(`/${locale}/admin/login`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Top Bar */}
      <div
        className="sticky top-0 z-50 px-6 py-3"
        style={{
          background: "linear-gradient(135deg,#3D0812,#6B0F1A)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href={`/${locale}/admin`} className="flex items-center gap-2.5 group">
              <div
                
              >
               <svg
              viewBox="0 0 250 250"
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href="https://i.ibb.co/M53N94sJ/640456935-18020611619650208-6330034363367840394-n.png"
                width="250"
                height="250"
              />
            </svg>
              </div>
              <div>
                <div className="text-[#C9A84C] font-serif text-xs font-bold tracking-[0.15em]">SKA EVENTS</div>
                <div className="text-[#C9A84C]/40 text-[9px] tracking-wide">
                  {isTE ? "అడ్మిన్ పానెల్" : "Admin Panel"}
                </div>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {NAV_ITEMS(locale, isTE).map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white/60 hover:text-[#E8C97A] hover:bg-white/5 text-xs font-medium transition-all"
                >
                  {icon}{label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* User badge */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.1)" }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-[#3D0812] flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
              >
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <span className="text-white/60 text-xs truncate max-w-[140px]">{adminEmail}</span>
            </div>

            {/* Back to site */}
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              {Icons.globe}
              {isTE ? "సైట్" : "Site"}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 hover:text-red-100 hover:bg-red-900/20 transition-all disabled:opacity-50"
              style={{ border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {Icons.logout}
              {loggingOut ? "..." : (isTE ? "లాగ్అవుట్" : "Logout")}
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
