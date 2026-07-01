import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist } from "next/font/google";
import "../globals.css";
import LanguageScreenGate from "@/components/language/LanguageScreenGate";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? "en";

  const seoMeta: Record<string, Record<string, string>> = {
    en: {
      title: "Luxury Wedding & Event Planner in Hyderabad | SKA Events",
      description: "SKA Events – Hyderabad's premier wedding and event management company.",
      keywords: "wedding planner Hyderabad, event management, luxury weddings",
    },
    te: {
      title: "హైదరాబాద్‌లో ప్రముఖ వివాహ మరియు ఈవెంట్ ప్లానర్ | SKA Events",
      description: "SKA ఈవెంట్స్ – హైదరాబాద్ యొక్క అగ్రగామి వివాహ మరియు ఈవెంట్ మేనేజ్‌మెంట్ కంపెనీ.",
      keywords: "వివాహ ప్లానర్ హైదరాబాద్, ఈవెంట్ మేనేజ్‌మెంట్, SKA ఈవెంట్స్",
    },
  };
  const meta = seoMeta[locale] ?? seoMeta.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: locale === "te" ? "te_IN" : "en_IN",
      alternateLocale: locale === "te" ? "en_IN" : "te_IN",
      siteName: "SKA Events",
      url: `https://skaevents.com/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://skaevents.com/${locale}`,
      languages: {
        en: "https://skaevents.com/en",
        te: "https://skaevents.com/te",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? "en";

  if (!routing.locales.includes(locale as "en" | "te")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className={geist.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://skaevents.com/en"
        />
        <link
          rel="alternate"
          hrefLang="te"
          href="https://skaevents.com/te"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://skaevents.com/en"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <LanguageScreenGate locale={locale}>
            {children}
          </LanguageScreenGate>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
