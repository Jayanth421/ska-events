"use client";

import dynamic from "next/dynamic";

const GalleryManager = dynamic(
  () => import("@/components/admin/GalleryManager"),
  { ssr: false }
);

export default function AdminGalleryPage() {
  return <GalleryManager />;
}
