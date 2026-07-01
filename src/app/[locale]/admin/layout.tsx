"use client";

import dynamic from "next/dynamic";

const AdminAuthLayout = dynamic(
  () => import("@/components/admin/AdminAuthLayout"),
  { ssr: false }
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthLayout>{children}</AdminAuthLayout>;
}
