import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingPageComponent from "@/components/sections/BookingPage";
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
    title: locale === "te" ? "ఈవెంట్ బుక్ చేయండి | SKA ఈవెంట్స్" : "Book Your Event | SKA Events",
    description: locale === "te"
      ? "SKA ఈవెంట్స్‌తో మీ స్వప్న ఈవెంట్‌ను బుక్ చేయండి"
      : "Book your dream event with SKA Events — Simple 4-step booking process.",
  };
}

export default async function BookingRoute({
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
        <BookingPageComponent />
      </main>
      <Footer />
    </>
  );
}
