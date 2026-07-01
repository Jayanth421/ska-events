import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VenuesPageComponent from "@/components/sections/VenuesPage";
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
    title: locale === "te" ? "వేదికలు | SKA ఈవెంట్స్" : "Venues | SKA Events",
    description: locale === "te"
      ? "హైదరాబాద్‌లో ప్రతి సందర్భానికీ ప్రీమియం వేదికలు"
      : "Premium event venues across Hyderabad for weddings, corporates, birthdays and all celebrations.",
  };
}

export default async function VenuesRoute({
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
        <VenuesPageComponent />
      </main>
      <Footer />
    </>
  );
}
