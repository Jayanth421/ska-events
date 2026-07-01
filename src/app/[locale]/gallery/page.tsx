import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryPageComponent from "@/components/sections/GalleryPage";
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
    title: locale === "te" ? "గ్యాలరీ | SKA ఈవెంట్స్" : "Gallery | SKA Events",
    description: locale === "te"
      ? "మేము సృష్టించిన మాయావి క్షణాల గ్యాలరీ"
      : "A visual gallery of magical moments created by SKA Events",
  };
}

export default async function GalleryRoute({
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
        <GalleryPageComponent />
      </main>
      <Footer />
    </>
  );
}
