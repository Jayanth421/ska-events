"use client";

import dynamic from "next/dynamic";

const TranslationsManager = dynamic(
  () => import("@/components/admin/TranslationsManager"),
  { ssr: false }
);

export default function AdminTranslationsPage() {
  return <TranslationsManager />;
}
