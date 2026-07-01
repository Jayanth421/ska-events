"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("navigation");
  const locale = useLocale();

  const quickLinks = [
    { label: tn("home"), href: `/${locale}` },
    { label: tn("about"), href: `/${locale}/about` },
    { label: tn("services"), href: `/${locale}/services` },
    { label: tn("packages"), href: `/${locale}/packages` },
    { label: tn("venues"), href: `/${locale}/venues` },
    { label: tn("gallery"), href: `/${locale}/gallery` },
    { label: tn("contact"), href: `/${locale}/contact` },
  ];

  const services = [
    t("weddingPlanning"),
    t("engagements"),
    t("corporateEvents"),
    t("birthdayParties"),
    t("decorDesign"),
    t("cateringServices"),
    t("entertainment"),
  ];

  return (
    <footer
      className="pt-16 pb-0"
      style={{
        background: "linear-gradient(135deg, #3D0812 0%, #6B0F1A 100%)",
        borderTop: "2px solid rgba(201, 168, 76, 0.3)",
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div
                className="w-10 h-10 rounded-full border border-[#C9A84C]/60 flex items-center justify-center"
                style={{ background: "rgba(201, 168, 76, 0.1)" }}
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
                <div className="text-[#C9A84C] font-serif text-sm font-bold tracking-[0.2em]">SKA EVENTS</div>
                <div className="text-[#C9A84C]/40 text-[9px] tracking-wider">Your Vision, Our Creation</div>
              </div>
            </Link>
            <p className="text-white/50 text-xs leading-relaxed mb-5">
              {t("tagline")}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {["facebook", "instagram", "whatsapp", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-8 h-8 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]/70 hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-200"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-[#E8C97A] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40 group-hover:bg-[#C9A84C] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              {t("ourServices")}
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="text-white/50 hover:text-[#E8C97A] text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/40 group-hover:bg-[#C9A84C] transition-colors" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              {t("contactInfo")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><path d="M8 1a4 4 0 00-4 4c0 3.5 4 8.5 4 8.5S12 8.5 12 5a4 4 0 00-4-4z"/><circle cx="8" cy="5" r="1.5"/></svg>
                <p className="text-white/50 text-xs leading-relaxed">{t("address")}</p>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><path d="M2 3a1.5 1.5 0 011.5-1.5H5a1 1 0 01.97.757l.6 2.4a1 1 0 01-.29.99l-.87.87a9 9 0 004 4l.87-.87a1 1 0 01.99-.29l2.4.6A1 1 0 0114 11v1.5A1.5 1.5 0 0112.5 14C6.149 14 1 8.851 1 2.5z"/></svg>
                <a href="tel:+91 93924843070" className="text-white/50 hover:text-[#E8C97A] text-xs transition-colors">+91 9392484307</a>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 5l7 4 7-4"/></svg>
                <a href="mailto:hello@skaevents.com" className="text-white/50 hover:text-[#E8C97A] text-xs transition-colors">hello@skaevents.com</a>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 2a10 10 0 010 12M2 8h12"/></svg>
                <a href="https://www.skaevents.com" className="text-white/50 hover:text-[#E8C97A] text-xs transition-colors">www.skaevents.com</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              {t("newsletter")}
            </h3>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              {t("newsletterText")}
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder={t("enterEmail")}
                aria-label={t("enterEmail")}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/10 border border-[#C9A84C]/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/60"
              />
              <button
                className="w-full py-2.5 rounded-lg font-semibold text-[#3D0812] text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
              >
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-[#C9A84C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            {t("copyright")}
          </p>
          <div className="flex gap-4">
            {[
              { label: t("privacyPolicy"), href: "/privacy" },
              { label: t("termsConditions"), href: "/terms" },
              { label: t("refundPolicy"), href: "/refund" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-white/30 hover:text-[#C9A84C]/70 text-xs transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.12 1.529 5.848L.057 23.5l5.798-1.519A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.406 17.291A9.926 9.926 0 0 1 12 21.97c-1.788 0-3.461-.478-4.901-1.312L3.57 21.74l1.13-3.403A9.928 9.928 0 0 1 2.03 12C2.03 6.516 6.516 2.03 12 2.03c5.484 0 9.97 4.486 9.97 9.97 0 2.738-1.108 5.215-2.909 7.013-.437.437-.907.826-1.655 1.278z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}
