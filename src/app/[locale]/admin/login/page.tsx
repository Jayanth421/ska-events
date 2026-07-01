"use client";

import dynamic from "next/dynamic";

const AdminLoginPage = dynamic(
  () => import("@/components/admin/AdminLoginPage"),
  { ssr: false }
);

export default function AdminLoginRoute() {
  return <AdminLoginPage />;
}
