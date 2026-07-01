import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPageComponent from "@/components/sections/AboutPage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "te" ? "మా గురించి | SKA ఈవెంట్స్" : "About Us | SKA Events",
    description: locale === "te"
      ? "SKA ఈవెంట్స్ గురించి తెలుసుకోండి — 2010 నుండి మాయావి క్షణాలు సృష్టిస్తున్నాము"
      : "Learn about SKA Events — Creating magical moments since 2010, Hyderabad's premier event management company.",
  };
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <AboutPageComponent />
      </main>
      <Footer />
    </>
  );
}
